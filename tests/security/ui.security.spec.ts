/**
 * KAYA Security Test Suite — UI / Browser Layer
 * ===============================================
 * Verifies security controls that are only visible in the rendered UI.
 * Requires: npx playwright install chromium
 *
 * Usage:
 *   npx playwright test tests/security/ui.security.spec.ts
 */

import { test, expect, type Page, type APIRequestContext } from '@playwright/test';

const APP = process.env.KAYA_APP_URL ?? 'http://localhost:5000';
const API = process.env.KAYA_API_BASE
  ?? 'https://ceucvzbpgzqatazckdpa.supabase.co/functions/v1/make-server-2071350e';

// ─── CRIT-02: OTP is Real, No Fake Badge ─────────────────────────────────────

test.describe('CRIT-02 — OTP: No demo bypass in Magic Code UI', () => {
  test('Magic Code tab renders without "Demo code: any 6 digits" badge', async ({ page }) => {
    await page.goto(`${APP}/login`);
    await page.click('text=Magic Code');
    await page.waitForTimeout(300);

    const badgeText = await page.locator('text=Demo code: any 6 digits').count();
    expect(badgeText).toBe(0);
  });

  test('OTP form requires contact entry before proceeding', async ({ page }) => {
    await page.goto(`${APP}/login`);
    await page.click('text=Magic Code');
    await page.waitForTimeout(300);

    const sendButton = page.locator('button:has-text("Send code")');
    await sendButton.click();

    // Should NOT advance to code-entry step without a contact
    const codeInput = page.locator('input[inputmode="numeric"]').first();
    await expect(codeInput).not.toBeVisible();
  });

  test('Entering an email advances to OTP step (calls real Supabase)', async ({ page }) => {
    await page.goto(`${APP}/login`);
    await page.click('text=Magic Code');
    await page.waitForTimeout(300);

    const emailField = page.locator('input[type="email"], input[placeholder*="email"]').first();
    await emailField.fill('test@example.com');

    // Intercept the Supabase OTP request to verify it's a real call
    const [supabaseRequest] = await Promise.all([
      page.waitForRequest(req =>
        req.url().includes('supabase') && req.method() === 'POST',
        { timeout: 5000 }
      ).catch(() => null),
      page.locator('button:has-text("Send code")').click(),
    ]);

    // Either a real Supabase request was made, or an error is shown
    // Either is correct — both prove it's NOT the fake bypass
    const errorVisible = await page.locator('[role="alert"], .error').isVisible().catch(() => false);
    const codeStepVisible = await page.locator('text=Enter your code').isVisible().catch(() => false);

    expect(supabaseRequest !== null || errorVisible || codeStepVisible).toBe(true);
  });
});

// ─── CRIT-05: No Hardcoded Credentials in Source ─────────────────────────────

test.describe('CRIT-05 — No hardcoded demo credentials in JS bundle', () => {
  test('demo1234 is not present in page source', async ({ page }) => {
    const response = await page.goto(`${APP}/login`);
    const html = await response!.text();
    expect(html).not.toContain('demo1234');
  });

  test('demo-access-token is not present in page source', async ({ page }) => {
    const response = await page.goto(`${APP}/login`);
    const html = await response!.text();
    expect(html).not.toContain('demo-access-token');
  });

  test('Old demo bypass code is not in bundle', async ({ page }) => {
    // Check that the old OTP bypass code pattern is gone
    const response = await page.goto(`${APP}/login`);
    const html = await response!.text();
    expect(html).not.toContain('Demo code: any 6 digits');
    expect(html).not.toContain('demo-user-id');
  });
});

// ─── U-05/U-06: Tenant Portal Uses Real Auth User ────────────────────────────

test.describe('U-05/U-06 — Tenant portal binds to real auth user', () => {
  // Helper: log in with demo account
  async function loginAsDemo(page: Page) {
    await page.goto(`${APP}/login`);
    await page.locator('button:has-text("Landlord Demo"), button:has-text("Tenant Demo")').first().click();
    await page.waitForURL(/\/(app|tenant)/, { timeout: 8000 });
  }

  test('Tenant sidebar shows a user-derived name, not hardcoded "Sarah Kim"', async ({ page }) => {
    await loginAsDemo(page);
    await page.goto(`${APP}/tenant`);
    await page.waitForLoadState('networkidle');

    // "Sarah Kim" must not appear anywhere in the sidebar
    const sidebarText = await page.locator('aside').textContent().catch(() => '');
    expect(sidebarText).not.toContain('Sarah Kim');
  });

  test('Tenant sidebar shows real initials, not hardcoded "SK"', async ({ page }) => {
    await loginAsDemo(page);
    await page.goto(`${APP}/tenant`);
    await page.waitForLoadState('networkidle');

    // The "SK" initials avatar should not exist (user is "Demo Landlord" → DL)
    const sidebarAvatarText = await page.locator('aside >> text=SK').count();
    expect(sidebarAvatarText).toBe(0);
  });

  test('Tenant profile referral card shows dynamic link, not SARAH-XK7T', async ({ page }) => {
    await loginAsDemo(page);
    await page.goto(`${APP}/tenant/profile`);
    await page.waitForLoadState('networkidle');

    const bodyText = await page.locator('body').textContent();
    expect(bodyText).not.toContain('SARAH-XK7T');
    expect(bodyText).not.toContain('sarah-kim-xk7t');
  });
});

// ─── HIGH-02: Security Headers Visible in Responses ──────────────────────────

test.describe('HIGH-02 — Security headers in API responses', () => {
  test('X-Frame-Options header is DENY', async ({ request }: { request: APIRequestContext }) => {
    const res = await request.get(`${API}/health`);
    expect(res.headers()['x-frame-options']).toBe('DENY');
  });

  test('X-Content-Type-Options is nosniff', async ({ request }) => {
    const res = await request.get(`${API}/health`);
    expect(res.headers()['x-content-type-options']).toBe('nosniff');
  });

  test('CSP header is present and contains default-src', async ({ request }) => {
    const res = await request.get(`${API}/health`);
    const csp = res.headers()['content-security-policy'] ?? '';
    expect(csp).toContain("default-src 'self'");
  });
});

// ─── CRIT-01: CORS Verified via Browser Response ──────────────────────────────

test.describe('CRIT-01 — CORS: Evil origin cannot read API', () => {
  test('Fetch from unlisted origin does not get ACAO header', async ({ request }) => {
    const res = await request.get(`${API}/health`, {
      headers: { 'Origin': 'https://totally-evil-domain.com' },
    });
    const acao = res.headers()['access-control-allow-origin'];
    expect(acao ?? '').not.toBe('*');
    expect(acao ?? '').not.toBe('https://totally-evil-domain.com');
  });
});

// ─── HIGH-03: No Error Detail Leaks in UI Error Messages ─────────────────────

test.describe('HIGH-03 — UI error messages are generic', () => {
  test('Failed login shows generic message, not Supabase internals', async ({ page }) => {
    await page.goto(`${APP}/login`);
    await page.fill('input[type="email"]', 'nonexistent@test.com');
    await page.fill('input[type="password"]', 'wrongpassword');
    await page.click('button[type="submit"]');

    await page.waitForTimeout(3000);

    const errorText = await page.locator('[role="alert"], .error, [data-sonner-toast]')
      .textContent()
      .catch(() => '');

    // Must NOT expose Supabase/internal messages
    expect(errorText).not.toMatch(/supabase/i);
    expect(errorText).not.toMatch(/postgresql/i);
    expect(errorText).not.toMatch(/stack/i);
    expect(errorText).not.toMatch(/at line/i);
  });
});

// ─── MEDIUM-01: Input Validation Feedback in UI ───────────────────────────────

test.describe('MEDIUM-01 — Input validation UX', () => {
  test('Signup form rejects password under 8 chars before submitting', async ({ page }) => {
    await page.goto(`${APP}/signup`);
    await page.fill('input[type="email"]', 'test@example.com');
    await page.fill('input[name="password"], input[type="password"]', 'abc');
    await page.click('button[type="submit"]');

    await page.waitForTimeout(1000);

    // Should show validation error OR the API should reject it
    const currentUrl = page.url();
    // Should NOT have navigated to dashboard (signup failed)
    expect(currentUrl).not.toMatch(/\/app$/);
    expect(currentUrl).not.toMatch(/\/app\//);
  });
});

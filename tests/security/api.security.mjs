/**
 * KAYA Security Test Suite — API Layer
 * =====================================
 * Tests every security control added during the security audit remediation.
 * Runs with plain Node.js 18+ (native fetch). No browser required.
 *
 * Usage:
 *   node tests/security/api.security.mjs
 *
 * Set env vars for full coverage:
 *   KAYA_API_BASE   — edge function URL (defaults to Supabase project URL)
 *   KAYA_APP_URL    — app URL for CORS origin tests (defaults to localhost:5000)
 */

// ─── Config ──────────────────────────────────────────────────────────────────

const API = process.env.KAYA_API_BASE
  ?? 'https://ceucvzbpgzqatazckdpa.supabase.co/functions/v1/make-server-2071350e';
const APP_ORIGIN = process.env.KAYA_APP_URL ?? 'http://localhost:5000';

// Supabase requires the anon key to invoke edge functions at the gateway level.
// For tests that need to reach our application code (not just the gateway),
// we include the anon key. This key is safe to use in tests — it is public.
const ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNldWN2emJwZ3pxYXRhemNrZHBhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM2OTk0MzQsImV4cCI6MjA4OTI3NTQzNH0.k9wy7AbcOljxZ5qb3GqT0AYSc4YRw4tbfe9rSG-j92A';

// Each test run gets a unique session IP so IP-based rate-limit counters
// from prior runs (stored in shared KV) never bleed into this run.
const SESSION_IP = `10.${Math.floor(Math.random() * 250) + 1}.${Math.floor(Math.random() * 250) + 1}.${Math.floor(Math.random() * 250) + 1}`;

// Helper: build headers that reach our function code (not just the gateway)
function anonHeaders(extra = {}) {
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${ANON_KEY}`,
    'X-Forwarded-For': SESSION_IP,
    ...extra,
  };
}

// Helper: fetch with a hard timeout to prevent hanging tests
async function fetchT(url, init = {}, timeoutMs = 12000) {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), timeoutMs);
  try {
    return await fetch(url, { ...init, signal: ctrl.signal });
  } finally {
    clearTimeout(timer);
  }
}

// ─── Tiny test runner ─────────────────────────────────────────────────────────

let passed = 0, failed = 0, skipped = 0;
const results = [];

async function test(name, fn) {
  try {
    await fn();
    console.log(`  \x1b[32m✓\x1b[0m ${name}`);
    passed++;
    results.push({ name, status: 'pass' });
  } catch (err) {
    console.log(`  \x1b[31m✗\x1b[0m ${name}`);
    console.log(`    \x1b[90m→ ${err.message}\x1b[0m`);
    failed++;
    results.push({ name, status: 'fail', reason: err.message });
  }
}

function skip(name, reason) {
  console.log(`  \x1b[33m–\x1b[0m ${name} \x1b[90m(skipped: ${reason})\x1b[0m`);
  skipped++;
  results.push({ name, status: 'skip', reason });
}

function section(title) {
  console.log(`\n\x1b[1m${title}\x1b[0m`);
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function assertHeader(headers, name, expected) {
  const val = headers.get(name);
  if (expected === null) {
    assert(!val || val === '', `Expected header "${name}" to be absent, got: "${val}"`);
    return;
  }
  if (expected instanceof RegExp) {
    assert(val && expected.test(val), `Header "${name}": expected /${expected.source}/, got: "${val}"`);
    return;
  }
  assert(val === expected, `Header "${name}": expected "${expected}", got: "${val}"`);
}

// ─── Pre-flight: Detect deployed version ─────────────────────────────────────

section('Pre-flight — Detecting deployed edge function version');

let isNewVersion = false;
await test('Edge function is the patched (post-audit) version', async () => {
  const res = await fetchT(`${API}/health`, {
    headers: { 'Origin': 'http://localhost:5000', ...anonHeaders() },
  });
  const acao = res.headers.get('access-control-allow-origin');
  const xfo = res.headers.get('x-frame-options');

  // New version: ACAO echoes the specific origin; X-Frame-Options is present
  // Old version: ACAO is "*"; X-Frame-Options is absent
  isNewVersion = (acao === 'http://localhost:5000' && xfo === 'DENY');

  if (!isNewVersion) {
    throw new Error(
      '⚠️  DEPLOYED edge function is the OLD version (ACAO="*", no XFO).\n' +
      '    Local source has the fixes — run: npx supabase functions deploy make-server-2071350e\n' +
      `    Current ACAO: "${acao}", XFO: "${xfo}"`
    );
  }
});

// ─── CRIT-01: CORS ───────────────────────────────────────────────────────────

section('CRIT-01 — CORS: Explicit origin allowlist');

await test('Rejects request from unlisted origin (ACAO never echoes the unlisted origin)', async () => {
  const origin = 'https://evil.com';
  // Include anon key so the request reaches our edge function code (not the Supabase
  // gateway which adds ACAO:* to direct unauthenticated responses).
  const res = await fetchT(`${API}/health`, {
    method: 'GET',
    headers: anonHeaders({ 'Origin': origin }),
  });
  const acao = res.headers.get('access-control-allow-origin');
  // Security property: ACAO must never be "*" (unrestricted) and must never
  // echo back the attacker's origin (which would grant browser cross-origin access).
  assert(
    acao !== '*' && acao !== origin,
    `CORS wildcard or origin echo for unlisted origin — ACAO: "${acao}"`
  );
});

await test('Rejects preflight from unlisted origin (no ACAO echo)', async () => {
  const origin = 'https://attacker.io';
  const res = await fetchT(`${API}/health`, {
    method: 'OPTIONS',
    headers: {
      'Origin': origin,
      'Access-Control-Request-Method': 'POST',
    },
  });
  const acao = res.headers.get('access-control-allow-origin');
  assert(
    acao !== '*' && acao !== origin,
    `Preflight from unlisted origin granted ACAO: "${acao}"`
  );
});

await test('Allows request from localhost (development origin)', async () => {
  const res = await fetchT(`${API}/health`, {
    method: 'GET',
    headers: anonHeaders({ 'Origin': 'http://localhost:5000' }),
  });
  const acao = res.headers.get('access-control-allow-origin');
  assert(
    acao === 'http://localhost:5000',
    `Expected localhost allowed, got ACAO: "${acao}"`
  );
});

await test('Does NOT echo back wildcard (*) for any origin', async () => {
  for (const origin of ['https://evil.com', 'https://attacker.io', 'http://malicious.net']) {
    const res = await fetchT(`${API}/health`, {
      headers: anonHeaders({ 'Origin': origin }),
    });
    const acao = res.headers.get('access-control-allow-origin');
    assert(acao !== '*', `Wildcard CORS returned for origin: ${origin}`);
  }
});

// ─── HIGH-02: Security Headers ────────────────────────────────────────────────

section('HIGH-02 — Security headers on all API responses');

await test('X-Frame-Options: DENY is set', async () => {
  // Include anon key so the request reaches our edge function (not just the gateway)
  const res = await fetchT(`${API}/health`, { headers: anonHeaders() });
  assertHeader(res.headers, 'x-frame-options', 'DENY');
});

await test('X-Content-Type-Options: nosniff is set', async () => {
  const res = await fetchT(`${API}/health`, { headers: anonHeaders() });
  assertHeader(res.headers, 'x-content-type-options', 'nosniff');
});

await test('Referrer-Policy: strict-origin-when-cross-origin is set', async () => {
  const res = await fetchT(`${API}/health`, { headers: anonHeaders() });
  assertHeader(res.headers, 'referrer-policy', 'strict-origin-when-cross-origin');
});

await test('Content-Security-Policy header is present', async () => {
  const res = await fetchT(`${API}/health`, { headers: anonHeaders() });
  const csp = res.headers.get('content-security-policy');
  assert(csp && csp.length > 0, 'CSP header is missing');
  assert(csp.includes("default-src 'self'"), `CSP missing default-src 'self': ${csp}`);
});

// ─── Auth Middleware ──────────────────────────────────────────────────────────

section('Auth Middleware — Unauthorized access rejection');

await test('Returns 401 when Authorization header is missing', async () => {
  const res = await fetchT(`${API}/properties`);
  assert(res.status === 401, `Expected 401, got ${res.status}`);
});

await test('Returns 401 for a fake/invalid Bearer token', async () => {
  const res = await fetchT(`${API}/properties`, {
    headers: { 'Authorization': 'Bearer fake-token-that-wont-validate' },
  });
  assert(res.status === 401, `Expected 401, got ${res.status}`);
});

await test('Returns 401 for the old demo-session-token', async () => {
  const res = await fetchT(`${API}/properties`, {
    headers: { 'Authorization': 'Bearer demo-session-token' },
  });
  assert(res.status === 401, `Expected 401 for demo token, got ${res.status}`);
});

await test('Returns 401 for the old demo-access-token', async () => {
  const res = await fetchT(`${API}/properties`, {
    headers: { 'Authorization': 'Bearer demo-access-token' },
  });
  assert(res.status === 401, `Expected 401 for old demo token, got ${res.status}`);
});

// ─── HIGH-03: Error Message Leaks ─────────────────────────────────────────────

section('HIGH-03 — No internal details in error responses');

await test('401 response does not expose internal error details', async () => {
  const res = await fetchT(`${API}/properties`, {
    headers: { 'Authorization': 'Bearer invalid' },
  });
  const body = await res.json();
  assert(!body.details, `Response leaked "details": ${JSON.stringify(body)}`);
  assert(!body.stack, `Response leaked "stack": ${JSON.stringify(body)}`);
});

await test('POST with malformed JSON does not expose internal details', async () => {
  const res = await fetchT(`${API}/auth/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: '{"invalid json',
  });
  const text = await res.text();
  let body;
  try { body = JSON.parse(text); } catch { body = { raw: text }; }
  assert(
    !body.details && !body.stack && !body.trace,
    `Malformed JSON response leaked internals: ${text.slice(0, 200)}`
  );
});

await test('AI endpoint error does not expose stack trace', async () => {
  const res = await fetchT(`${API}/ai/chat`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer invalid-but-passes-format-check',
    },
    body: JSON.stringify({ message: null }),
  });
  const body = await res.json().catch(() => ({}));
  assert(!body.details, `details leaked: ${JSON.stringify(body)}`);
  assert(!body.stack, `stack leaked: ${JSON.stringify(body)}`);
});

// ─── MEDIUM-01: Input Length Validation ───────────────────────────────────────

section('MEDIUM-01 — Input length limits on auth endpoints');

await test('Rejects signup with email longer than 254 chars → 400', async () => {
  const res = await fetchT(`${API}/auth/signup`, {
    method: 'POST',
    headers: anonHeaders(),
    body: JSON.stringify({
      email: 'a'.repeat(250) + '@b.com',
      password: 'ValidPass1!',
      name: 'Test User',
    }),
  });
  assert(res.status === 400, `Expected 400 for oversized email, got ${res.status}`);
  const body = await res.json();
  assert(!body.details, `details leaked in 400: ${JSON.stringify(body)}`);
});

await test('Rejects signup with password shorter than 8 chars → 400', async () => {
  const res = await fetchT(`${API}/auth/signup`, {
    method: 'POST',
    headers: anonHeaders(),
    body: JSON.stringify({ email: 'test@test.com', password: 'abc', name: 'Test User' }),
  });
  assert(res.status === 400, `Expected 400 for short password, got ${res.status}`);
});

await test('Rejects signup with password longer than 128 chars → 400', async () => {
  const res = await fetchT(`${API}/auth/signup`, {
    method: 'POST',
    headers: anonHeaders(),
    body: JSON.stringify({ email: 'test@test.com', password: 'P@ss'.repeat(40), name: 'Test User' }),
  });
  assert(res.status === 400, `Expected 400 for oversized password, got ${res.status}`);
});

await test('Rejects login with email longer than 254 chars → 400', async () => {
  const res = await fetchT(`${API}/auth/login`, {
    method: 'POST',
    headers: anonHeaders(),
    body: JSON.stringify({ email: 'a'.repeat(250) + '@b.com', password: 'whatever' }),
  });
  assert(res.status === 400, `Expected 400 for oversized login email, got ${res.status}`);
});

await test('Rejects login with password longer than 128 chars → 400', async () => {
  const res = await fetchT(`${API}/auth/login`, {
    method: 'POST',
    headers: anonHeaders(),
    body: JSON.stringify({ email: 'test@test.com', password: 'x'.repeat(200) }),
  });
  assert(res.status === 400, `Expected 400 for oversized login password, got ${res.status}`);
});

await test('Rejects signup with missing required fields → 400', async () => {
  const res = await fetchT(`${API}/auth/signup`, {
    method: 'POST',
    headers: anonHeaders(),
    body: JSON.stringify({ email: 'test@test.com' }),
  });
  assert(res.status === 400, `Expected 400 for missing fields, got ${res.status}`);
});

// ─── MEDIUM-03: Per-Email Account Lockout ─────────────────────────────────────
// Each lockout test uses its own fake IP via X-Forwarded-For so that the
// IP-based rate limiter (CRIT-04) cannot fire and mask the per-email lockout.

section('MEDIUM-03 — Per-email account lockout after failed attempts');

await test('5 consecutive bad-password attempts lock the account', async () => {
  const lockoutEmail = `lockout-test-${Date.now()}@kaya-sec-test.dev`;
  const lockoutIP = `10.0.1.${Math.floor(Math.random() * 200) + 1}`;
  let finalStatus = 0;

  for (let i = 0; i < 6; i++) {
    const res = await fetchT(`${API}/auth/login`, {
      method: 'POST',
      headers: anonHeaders({ 'X-Forwarded-For': lockoutIP }),
      body: JSON.stringify({ email: lockoutEmail, password: 'wrong-password-' + i }),
    });
    finalStatus = res.status;
    if (res.status === 429) break;
    await new Promise(r => setTimeout(r, 150));
  }

  assert(
    finalStatus === 429,
    `Expected 429 (lockout) after 5 bad attempts, last status was ${finalStatus}`
  );
});

await test('Lockout response includes Retry-After header', async () => {
  const lockoutEmail = `lockout-ra-${Date.now()}@kaya-sec-test.dev`;
  const lockoutIP = `10.0.2.${Math.floor(Math.random() * 200) + 1}`;
  let lockedRes = null;

  for (let i = 0; i < 6; i++) {
    const res = await fetchT(`${API}/auth/login`, {
      method: 'POST',
      headers: anonHeaders({ 'X-Forwarded-For': lockoutIP }),
      body: JSON.stringify({ email: lockoutEmail, password: 'wrong-' + i }),
    });
    if (res.status === 429) { lockedRes = res; break; }
    await new Promise(r => setTimeout(r, 150));
  }

  assert(lockedRes !== null, 'Account was never locked after 5 attempts');
  const retryAfter = lockedRes.headers.get('retry-after');
  assert(retryAfter && parseInt(retryAfter) > 0, `Retry-After header missing or 0: "${retryAfter}"`);
});

await test('Lockout response body has no internal details', async () => {
  const lockoutEmail = `lockout-details-${Date.now()}@kaya-sec-test.dev`;
  const lockoutIP = `10.0.3.${Math.floor(Math.random() * 200) + 1}`;

  for (let i = 0; i < 6; i++) {
    const res = await fetchT(`${API}/auth/login`, {
      method: 'POST',
      headers: anonHeaders({ 'X-Forwarded-For': lockoutIP }),
      body: JSON.stringify({ email: lockoutEmail, password: 'wrong-' + i }),
    });
    if (res.status === 429) {
      const body = await res.json();
      assert(!body.details, `Lockout response leaked details: ${JSON.stringify(body)}`);
      assert(!body.email, `Lockout response leaked email: ${JSON.stringify(body)}`);
      break;
    }
    await new Promise(r => setTimeout(r, 150));
  }
});

// ─── CRIT-04: Rate Limiter ───────────────────────────────────────────────────
// Requests are sent sequentially (not concurrent) so the KV counter reliably
// increments before the next read, avoiding the read-before-write race condition.

section('CRIT-04 — Rate limiter (IP-based, auth routes)');

await test('Returns 429 after exceeding auth rate limit (12 sequential requests)', async () => {
  // Fresh unique IP — isolates this test from all other test requests above
  const rateLimitIP = `10.99.${Math.floor(Math.random() * 200) + 1}.${Math.floor(Math.random() * 200) + 1}`;
  const uniqueEmail = `ratelimit-test-${Date.now()}@kaya-sec-test.dev`;
  const statuses = [];

  // Sequential requests so the KV counter increments atomically before the next read
  for (let i = 0; i < 12; i++) {
    const res = await fetchT(`${API}/auth/login`, {
      method: 'POST',
      headers: anonHeaders({ 'X-Forwarded-For': rateLimitIP }),
      body: JSON.stringify({ email: `${uniqueEmail}${i}`, password: 'p@ss' }),
    });
    statuses.push(res.status);
    if (res.status === 429) break;
  }

  const has429 = statuses.includes(429);
  assert(
    has429,
    `No 429 received after 12 sequential auth requests from same IP. Statuses: [${statuses.join(', ')}]`
  );
});

// ─── CRIT-02: OTP No Longer Fake ─────────────────────────────────────────────

section('CRIT-02 — OTP must go through real Supabase (source verification)');

await test('LoginPage source no longer contains fake handleVerifyOTP setTimeout', async () => {
  const res = await fetchT(`${APP_ORIGIN}/`);
  if (!res.ok) { skip('LoginPage source', 'app not reachable at ' + APP_ORIGIN); return; }
  const html = await res.text();
  assert(
    !html.includes('Demo code: any 6 digits'),
    'Found "Demo code: any 6 digits" badge still in the bundle'
  );
});

// ─── CRIT-05: No Hardcoded Credentials in Bundle ─────────────────────────────

section('CRIT-05 — Hardcoded credentials not present in built source');

await test('demo1234 password is not present in the app bundle', async () => {
  const res = await fetchT(`${APP_ORIGIN}/`);
  if (!res.ok) { skip('bundle check', 'app not reachable'); return; }
  const html = await res.text();
  assert(!html.includes('demo1234'), '"demo1234" found in HTML bundle');
});

await test('demo-access-token string is not present in app bundle', async () => {
  const res = await fetchT(`${APP_ORIGIN}/`);
  if (!res.ok) { skip('bundle check', 'app not reachable'); return; }
  const html = await res.text();
  assert(!html.includes('demo-access-token'), '"demo-access-token" found in HTML bundle');
});

// ─── Summary ──────────────────────────────────────────────────────────────────

const total = passed + failed + skipped;
console.log('\n' + '─'.repeat(60));
console.log(`\x1b[1mResults: ${total} tests\x1b[0m`);
console.log(`  \x1b[32m${passed} passed\x1b[0m`);
if (failed > 0)  console.log(`  \x1b[31m${failed} failed\x1b[0m`);
if (skipped > 0) console.log(`  \x1b[33m${skipped} skipped\x1b[0m`);
console.log('─'.repeat(60));

if (failed > 0) {
  // Classify failures: tests that depend on the deployed edge function
  // vs. tests that check local source/bundle
  const DEPLOYMENT_GATES = [
    'Edge function is the patched',
    'CORS', 'X-Frame', 'Referrer-Policy', 'Content-Security-Policy',
    'unlisted origin', 'wildcard', 'localhost', 'echo back',
    'Rejects signup with password shorter', 'Rejects login with email longer',
    'Rejects login with password longer',
    'consecutive bad-password', 'Lockout response',
    'Rate limiter', 'rate limit',
  ];

  const deploymentFailures = results.filter(r =>
    r.status === 'fail' && DEPLOYMENT_GATES.some(k => r.name.includes(k))
  );
  const codeFailures = results.filter(r =>
    r.status === 'fail' && !DEPLOYMENT_GATES.some(k => r.name.includes(k))
  );

  if (deploymentFailures.length > 0) {
    console.log('\n\x1b[33m⚠️  Failures that will resolve after deploying the edge function:\x1b[0m');
    console.log('\x1b[33m   Run: npx supabase functions deploy make-server-2071350e\x1b[0m');
    deploymentFailures.forEach(r =>
      console.log(`  \x1b[31m✗\x1b[0m ${r.name}\n    \x1b[90m${r.reason}\x1b[0m`)
    );
  }

  if (codeFailures.length > 0) {
    console.log('\n\x1b[31m❌  Failures that require code fixes:\x1b[0m');
    codeFailures.forEach(r =>
      console.log(`  \x1b[31m✗\x1b[0m ${r.name}\n    \x1b[90m${r.reason}\x1b[0m`)
    );
  }

  if (deploymentFailures.length > 0 && codeFailures.length === 0) {
    console.log('\n\x1b[32m✅  All code fixes are in place — deploy to get to 100%\x1b[0m');
  }

  process.exit(1);
}

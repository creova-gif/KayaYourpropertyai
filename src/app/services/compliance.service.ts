/**
 * KAYA Compliance Service
 * Frontend client for the PIPEDA + Ontario RTA compliance module.
 * Mirrors the endpoints added to supabase/functions/server/index.tsx.
 */

import { projectId } from '/utils/supabase/info';
import { getAccessToken } from './auth.service';

const API_BASE = `https://${projectId}.supabase.co/functions/v1/make-server-2071350e`;

async function apiFetch(endpoint: string, options: RequestInit = {}): Promise<any> {
  const token = getAccessToken();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const response = await fetch(`${API_BASE}${endpoint}`, { ...options, headers });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Network error' }));
    throw new Error(error.error || `API error: ${response.status}`);
  }
  return response.json();
}

// ============================================================================
// AUDIT LOG
// ============================================================================

export interface AuditLogEntry {
  id: string;
  userId: string;
  action: string;
  resource: string;
  resourceId?: string;
  ip?: string;
  details?: Record<string, any>;
  timestamp: string;
}

/** Fetch the audit trail for the current user. */
export async function getAuditLog(opts?: { limit?: number; resource?: string }): Promise<{ total: number; logs: AuditLogEntry[] }> {
  const params = new URLSearchParams();
  if (opts?.limit) params.set('limit', String(opts.limit));
  if (opts?.resource) params.set('resource', opts.resource);
  const qs = params.toString() ? `?${params}` : '';
  const res = await apiFetch(`/compliance/audit-log${qs}`);
  return { total: res.total, logs: res.logs };
}

/** Write an audit log entry (for client-side events like document views). */
export async function writeAuditLog(entry: {
  action: string;
  resource: string;
  resourceId?: string;
  details?: Record<string, any>;
}): Promise<void> {
  await apiFetch('/compliance/audit-log', {
    method: 'POST',
    body: JSON.stringify(entry),
  });
}

// ============================================================================
// CONSENT MANAGEMENT
// ============================================================================

export type ConsentType =
  | 'marketing_emails'
  | 'credit_check'
  | 'data_sharing_partners'
  | 'background_screening'
  | 'analytics_tracking';

export interface ConsentRecord {
  type: ConsentType;
  granted: boolean;
  grantedAt: string | null;
  revokedAt: string | null;
  ip: string;
  updatedAt: string;
}

/** Retrieve all consent records for the current user. */
export async function getConsents(): Promise<Record<ConsentType, ConsentRecord>> {
  const res = await apiFetch('/compliance/consent');
  return res.consents;
}

/** Grant or revoke a specific consent type. */
export async function setConsent(type: ConsentType, granted: boolean): Promise<ConsentRecord> {
  const res = await apiFetch('/compliance/consent', {
    method: 'POST',
    body: JSON.stringify({ type, granted }),
  });
  return res.consent;
}

/** Revoke a specific consent type. */
export async function revokeConsent(type: ConsentType): Promise<void> {
  await apiFetch(`/compliance/consent/${type}`, { method: 'DELETE' });
}

// ============================================================================
// RIGHT TO ERASURE
// ============================================================================

export interface ErasureResult {
  message: string;
  erasedAt: string;
}

/**
 * Anonymize all PII for a user (PIPEDA right to erasure).
 * Financial audit trail is retained for 7 years as required by CRA.
 * @param userId — must match the authenticated user, or caller must be admin.
 */
export async function requestErasure(userId: string): Promise<ErasureResult> {
  const res = await apiFetch(`/compliance/users/${userId}/data`, { method: 'DELETE' });
  return { message: res.message, erasedAt: res.erasedAt };
}

// ============================================================================
// RENT INCREASE VALIDATION
// ============================================================================

export interface RentIncreaseValidation {
  currentRent: number;
  proposedRent: number;
  effectiveYear: number;
  actualIncreasePercent: number;
  ontarioGuideline: number | null;
  maxAllowedRent: number | null;
  isCompliant: boolean | null;
  guidelineKnown: boolean;
}

export interface RentIncreaseResult {
  validation: RentIncreaseValidation;
  rtaRequirements: {
    requiredForm: string;
    minimumNoticeDays: number;
    earliestEffectiveDate: string;
    note: string;
  };
}

/**
 * Validate a proposed rent increase against the Ontario RTA guideline.
 * Returns compliance status, max allowed rent, and required notice form.
 */
export async function validateRentIncrease(opts: {
  currentRent: number;
  proposedRent: number;
  effectiveYear: number;
}): Promise<RentIncreaseResult> {
  const params = new URLSearchParams({
    currentRent: String(opts.currentRent),
    proposedRent: String(opts.proposedRent),
    effectiveYear: String(opts.effectiveYear),
  });
  const res = await apiFetch(`/compliance/rent-increase/validate?${params}`);
  return { validation: res.validation, rtaRequirements: res.rtaRequirements };
}

// ============================================================================
// NOTICE DELIVERY TRACKING
// ============================================================================

export interface NoticeDeliveryRecord {
  deliveryId: string;
  noticeType: string;
  noticeId: string | null;
  sentBy: string;
  recipientId: string;
  recipientEmail: string | null;
  method: 'email' | 'mail' | 'hand_delivered';
  propertyId: string | null;
  unitId: string | null;
  deliveredAt: string;
  status: string;
  notes: string | null;
}

export interface TrackNoticePayload {
  noticeType: string;
  noticeId?: string;
  recipientId: string;
  recipientEmail?: string;
  method: 'email' | 'mail' | 'hand_delivered';
  propertyId?: string;
  unitId?: string;
  notes?: string;
}

/** Record a notice delivery event (creates LTB-admissible receipt). */
export async function trackNoticeDelivery(payload: TrackNoticePayload): Promise<{ deliveryId: string; deliveredAt: string; message: string }> {
  const res = await apiFetch('/compliance/notices/track', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
  return { deliveryId: res.deliveryId, deliveredAt: res.deliveredAt, message: res.message };
}

/** Retrieve all delivery receipts for the authenticated landlord. */
export async function getNoticeDeliveries(opts?: { noticeType?: string; limit?: number }): Promise<{ total: number; deliveries: NoticeDeliveryRecord[] }> {
  const params = new URLSearchParams();
  if (opts?.noticeType) params.set('noticeType', opts.noticeType);
  if (opts?.limit) params.set('limit', String(opts.limit));
  const qs = params.toString() ? `?${params}` : '';
  const res = await apiFetch(`/compliance/notices/track${qs}`);
  return { total: res.total, deliveries: res.deliveries };
}

/** Retrieve the delivery receipt for a specific notice by ID. */
export async function getNoticeDelivery(noticeId: string): Promise<NoticeDeliveryRecord> {
  const res = await apiFetch(`/compliance/notices/track/${noticeId}`);
  return res.delivery;
}

// ============================================================================
// COMPLIANCE HEALTH
// ============================================================================

export interface ComplianceHealth {
  status: string;
  modules: string[];
  dataResidency: string;
  frameworks: string[];
  ontarioRentGuidelineYears: string[];
  timestamp: string;
}

/** Check that the compliance module is active (no auth required). */
export async function getComplianceHealth(): Promise<ComplianceHealth> {
  const res = await fetch(`${API_BASE}/compliance/health`);
  return res.json();
}

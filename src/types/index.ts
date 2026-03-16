// ─── KAYA PROPTECH MVP — TYPE DEFINITIONS ────────────────────────────────────

// ── Users ──────────────────────────────────────────────────────────────────
export type UserRole = 'landlord' | 'property_manager' | 'tenant' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  avatar_url?: string;
  created_at: string;
}

// ── Properties & Units ─────────────────────────────────────────────────────
export type PropertyType = 'condo' | 'house' | 'townhouse' | 'commercial' | 'apartment';
export type UnitStatus = 'available' | 'occupied' | 'maintenance' | 'pending';

export interface Property {
  id: string;
  owner_id: string;
  address: string;
  city: string;
  province: string;
  postal_code: string;
  property_type: PropertyType;
  created_at: string;
}

export interface Unit {
  id: string;
  property_id: string;
  unit_number: string;
  bedrooms: number;
  bathrooms: number;
  rent_amount: number;
  status: UnitStatus;
  sqft?: number;
  description?: string;
}

// ── Applications ───────────────────────────────────────────────────────────
export type ApplicationStatus =
  | 'draft'
  | 'submitted'
  | 'documents_pending'
  | 'ai_screening'
  | 'under_review'
  | 'approved'
  | 'rejected'
  | 'lease_sent'
  | 'lease_signed';

export interface Applicant {
  id: string;
  user_id: string;
  name: string;
  email: string;
  phone: string;
  date_of_birth: string;
  current_address: string;
  monthly_income: number;
  employment_status: 'employed' | 'self_employed' | 'student' | 'retired' | 'other';
  employer_name?: string;
  employment_duration_months?: number;
  credit_score?: number;
  has_cosigner: boolean;
  cosigner_id?: string;
}

export interface Application {
  id: string;
  unit_id: string;
  applicant_id: string;
  status: ApplicationStatus;
  ai_score?: number;
  ai_risk_level?: 'low' | 'medium' | 'high';
  ai_recommendation?: 'approve' | 'review' | 'decline';
  submitted_at?: string;
  decided_at?: string;
  created_at: string;
  // Relations
  unit?: Unit;
  applicant?: Applicant;
  documents?: Document[];
  screening?: AIScreening;
}

// ── Documents ──────────────────────────────────────────────────────────────
export type DocumentType =
  | 'government_id'
  | 'pay_stub'
  | 'bank_statement'
  | 'credit_report'
  | 'employer_letter'
  | 'landlord_reference'
  | 'other';

export type VerificationStatus = 'pending' | 'processing' | 'verified' | 'fraud_flagged' | 'rejected';

export interface Document {
  id: string;
  application_id: string;
  type: DocumentType;
  file_url: string;
  file_name: string;
  file_size: number;
  verification_status: VerificationStatus;
  extracted_data?: DocumentExtractedData;
  fraud_signals?: string[];
  verified_at?: string;
  created_at: string;
}

export interface DocumentExtractedData {
  // ID
  full_name?: string;
  date_of_birth?: string;
  id_number?: string;
  expiry_date?: string;
  // Pay Stub
  employer_name?: string;
  gross_income?: number;
  pay_period?: string;
  // Bank Statement
  average_balance?: number;
  nsf_count?: number;
  statement_months?: number;
  // Credit Report
  credit_score?: number;
  debt_ratio?: number;
  late_payments?: number;
  // Employer Letter
  employment_confirmed?: boolean;
  start_date?: string;
  // Landlord Reference
  tenancy_years?: number;
  on_time_payments?: boolean;
  would_rent_again?: boolean;
}

// ── AI Screening ────────────────────────────────────────────────────────────
export interface AIScreening {
  id: string;
  application_id: string;
  overall_score: number; // 0-100
  risk_level: 'low' | 'medium' | 'high';
  recommendation: 'approve' | 'review' | 'decline';
  // Score components
  income_ratio: number;        // rent / income
  income_ratio_score: number;  // 0-100
  credit_score: number;
  credit_score_normalized: number; // 0-100
  employment_stability_score: number; // 0-100
  rental_history_score: number; // 0-100
  fraud_risk_score: number;    // 0-100 (higher = more risk)
  // Flags
  fraud_signals: string[];
  missing_documents: DocumentType[];
  // AI summary
  ai_summary: string;
  ai_insights: string[];
  // Timestamps
  screening_duration_ms: number;
  created_at: string;
}

// ── Leases ────────────────────────────────────────────────────────────────
export type LeaseStatus = 'draft' | 'sent' | 'signed' | 'active' | 'expired' | 'terminated';

export interface Lease {
  id: string;
  application_id: string;
  tenant_id: string;
  unit_id: string;
  status: LeaseStatus;
  rent_amount: number;
  deposit_amount: number;
  start_date: string;
  end_date: string;
  term_months: number;
  // Utilities
  utilities_included: string[];
  tenant_pays: string[];
  // Rules
  pets_allowed: boolean;
  smoking_allowed: boolean;
  additional_terms?: string;
  // Ontario compliance
  ltb_compliant: boolean;
  generated_by_ai: boolean;
  // Signatures
  tenant_signed_at?: string;
  landlord_signed_at?: string;
  // Doc
  lease_document_url?: string;
  created_at: string;
}

// ── Payments ──────────────────────────────────────────────────────────────
export type PaymentStatus = 'pending' | 'paid' | 'overdue' | 'failed' | 'refunded';
export type PaymentMethod = 'stripe' | 'etransfer' | 'moneris' | 'cheque';

export interface Payment {
  id: string;
  lease_id: string;
  tenant_id: string;
  amount: number;
  due_date: string;
  paid_at?: string;
  status: PaymentStatus;
  method?: PaymentMethod;
  receipt_url?: string;
  late_fee?: number;
  stripe_payment_intent_id?: string;
  created_at: string;
}

// ── LTB Notices ───────────────────────────────────────────────────────────
export type NoticeType = 'N1' | 'N2' | 'N4' | 'N5' | 'N8' | 'N12' | 'N13';

export interface LTBNotice {
  id: string;
  lease_id: string;
  landlord_id: string;
  tenant_id: string;
  type: NoticeType;
  reason: string;
  notice_period_days: number;
  served_at?: string;
  effective_date: string;
  document_url?: string;
  generated_by_ai: boolean;
  created_at: string;
}

// ── Maintenance ───────────────────────────────────────────────────────────
export type MaintenancePriority = 'low' | 'medium' | 'high' | 'emergency';
export type MaintenanceStatus = 'open' | 'in_progress' | 'resolved' | 'closed';
export type MaintenanceCategory = 'plumbing' | 'electrical' | 'hvac' | 'appliance' | 'structural' | 'cosmetic' | 'other';

export interface MaintenanceRequest {
  id: string;
  unit_id: string;
  tenant_id: string;
  title: string;
  description: string;
  category: MaintenanceCategory;
  priority: MaintenancePriority;
  status: MaintenanceStatus;
  photo_urls: string[];
  ai_category?: MaintenanceCategory;
  ai_priority?: MaintenancePriority;
  ai_estimated_cost?: number;
  ai_suggested_action?: string;
  assigned_contractor?: string;
  resolved_at?: string;
  created_at: string;
}

// ── API Response wrappers ─────────────────────────────────────────────────
export interface ApiResponse<T> {
  data: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  per_page: number;
}

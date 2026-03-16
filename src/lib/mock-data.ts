// ─── MOCK DATA FOR KAYA PROPTECH ─────────────────────────────────────────────

import type { Application, Applicant, Document, Unit } from '../types';

export const mockUnits: Unit[] = [
  {
    id: 'unit-1',
    property_id: 'prop-1',
    unit_number: '4A',
    bedrooms: 2,
    bathrooms: 2,
    rent_amount: 2300,
    status: 'available',
    sqft: 950,
    description: 'Modern 2BR with updated kitchen, in-suite laundry'
  },
  {
    id: 'unit-2',
    property_id: 'prop-1',
    unit_number: '2B',
    bedrooms: 1,
    bathrooms: 1,
    rent_amount: 1950,
    status: 'occupied',
    sqft: 720
  },
  {
    id: 'unit-3',
    property_id: 'prop-2',
    unit_number: '7C',
    bedrooms: 2,
    bathrooms: 1,
    rent_amount: 2100,
    status: 'available',
    sqft: 880
  }
];

export const mockApplicants: Applicant[] = [
  {
    id: 'app-1',
    user_id: 'user-1',
    name: 'Sarah Kim',
    email: 'sarah.kim@email.com',
    phone: '+1 (647) 555-0192',
    date_of_birth: '1994-03-18',
    current_address: '88 Queen St E, Toronto ON M5C 1S2',
    monthly_income: 8500,
    employment_status: 'employed',
    employer_name: 'Deloitte Canada',
    employment_duration_months: 36,
    credit_score: 750,
    has_cosigner: false
  },
  {
    id: 'app-2',
    user_id: 'user-2',
    name: 'Michael Patel',
    email: 'michael.patel@email.com',
    phone: '+1 (416) 555-0340',
    date_of_birth: '1991-07-22',
    current_address: '45 Adelaide St, Toronto ON',
    monthly_income: 7200,
    employment_status: 'employed',
    employer_name: 'TD Bank',
    employment_duration_months: 24,
    credit_score: 720,
    has_cosigner: false
  },
  {
    id: 'app-3',
    user_id: 'user-3',
    name: 'Jason Lee',
    email: 'jason.lee@email.com',
    phone: '+1 (905) 555-0567',
    date_of_birth: '1996-11-05',
    current_address: '120 King St W, Toronto ON',
    monthly_income: 5200,
    employment_status: 'self_employed',
    employer_name: 'Freelance Graphic Designer',
    employment_duration_months: 18,
    credit_score: 660,
    has_cosigner: true
  }
];

export const mockDocuments: Document[] = [
  {
    id: 'doc-1',
    application_id: 'application-1',
    type: 'government_id',
    file_url: '/docs/sarah-id.pdf',
    file_name: 'drivers-license.pdf',
    file_size: 245000,
    verification_status: 'verified',
    extracted_data: {
      full_name: 'Sarah Kim',
      date_of_birth: '1994-03-18',
      id_number: 'K1234-56789-12345',
      expiry_date: '2028-03-18'
    },
    verified_at: '2026-03-10T10:30:00Z',
    created_at: '2026-03-10T10:15:00Z'
  },
  {
    id: 'doc-2',
    application_id: 'application-1',
    type: 'pay_stub',
    file_url: '/docs/sarah-paystub.pdf',
    file_name: 'paystub-march-2026.pdf',
    file_size: 180000,
    verification_status: 'verified',
    extracted_data: {
      employer_name: 'Deloitte Canada',
      gross_income: 8500,
      pay_period: 'monthly'
    },
    verified_at: '2026-03-10T10:32:00Z',
    created_at: '2026-03-10T10:16:00Z'
  },
  {
    id: 'doc-3',
    application_id: 'application-1',
    type: 'bank_statement',
    file_url: '/docs/sarah-bank.pdf',
    file_name: 'td-statement-feb-2026.pdf',
    file_size: 320000,
    verification_status: 'verified',
    extracted_data: {
      average_balance: 12400,
      nsf_count: 0,
      statement_months: 3
    },
    verified_at: '2026-03-10T10:35:00Z',
    created_at: '2026-03-10T10:17:00Z'
  },
  {
    id: 'doc-4',
    application_id: 'application-1',
    type: 'credit_report',
    file_url: '/docs/sarah-credit.pdf',
    file_name: 'equifax-report.pdf',
    file_size: 410000,
    verification_status: 'verified',
    extracted_data: {
      credit_score: 750,
      debt_ratio: 0.28,
      late_payments: 0
    },
    verified_at: '2026-03-10T10:38:00Z',
    created_at: '2026-03-10T10:18:00Z'
  },
  {
    id: 'doc-5',
    application_id: 'application-1',
    type: 'employer_letter',
    file_url: '/docs/sarah-employer.pdf',
    file_name: 'deloitte-employment-letter.pdf',
    file_size: 156000,
    verification_status: 'verified',
    extracted_data: {
      employment_confirmed: true,
      start_date: '2023-03-01'
    },
    verified_at: '2026-03-10T10:40:00Z',
    created_at: '2026-03-10T10:19:00Z'
  },
  {
    id: 'doc-6',
    application_id: 'application-1',
    type: 'landlord_reference',
    file_url: '/docs/sarah-reference.pdf',
    file_name: 'previous-landlord-ref.pdf',
    file_size: 128000,
    verification_status: 'verified',
    extracted_data: {
      tenancy_years: 2,
      on_time_payments: true,
      would_rent_again: true
    },
    verified_at: '2026-03-10T10:42:00Z',
    created_at: '2026-03-10T10:20:00Z'
  }
];

export const mockApplications: Application[] = [
  {
    id: 'application-1',
    unit_id: 'unit-1',
    applicant_id: 'app-1',
    status: 'ai_screening',
    submitted_at: '2026-03-10T10:00:00Z',
    created_at: '2026-03-09T15:30:00Z',
    applicant: mockApplicants[0],
    unit: mockUnits[0],
    documents: mockDocuments
  },
  {
    id: 'application-2',
    unit_id: 'unit-1',
    applicant_id: 'app-2',
    status: 'submitted',
    ai_score: 87,
    ai_risk_level: 'low',
    ai_recommendation: 'approve',
    submitted_at: '2026-03-11T09:15:00Z',
    created_at: '2026-03-10T14:20:00Z',
    applicant: mockApplicants[1],
    unit: mockUnits[0]
  },
  {
    id: 'application-3',
    unit_id: 'unit-3',
    applicant_id: 'app-3',
    status: 'documents_pending',
    submitted_at: '2026-03-12T11:45:00Z',
    created_at: '2026-03-11T16:10:00Z',
    applicant: mockApplicants[2],
    unit: mockUnits[2]
  }
];

// Mock API delay
export const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Simulate API calls
export const mockApi = {
  async getApplications(): Promise<Application[]> {
    await delay(500);
    return mockApplications;
  },

  async getApplication(id: string): Promise<Application | null> {
    await delay(300);
    return mockApplications.find(app => app.id === id) || null;
  },

  async approveApplication(id: string): Promise<Application> {
    await delay(800);
    const app = mockApplications.find(a => a.id === id);
    if (app) {
      app.status = 'approved';
      app.decided_at = new Date().toISOString();
    }
    return app!;
  },

  async rejectApplication(id: string): Promise<Application> {
    await delay(800);
    const app = mockApplications.find(a => a.id === id);
    if (app) {
      app.status = 'rejected';
      app.decided_at = new Date().toISOString();
    }
    return app!;
  }
};

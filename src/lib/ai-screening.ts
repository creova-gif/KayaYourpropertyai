// ─── KAYA PROPTECH — AI Screening Engine ─────────────────────────────────────
// Calculates tenant risk score, runs fraud detection, generates recommendations

import type { AIScreening, Application, Document, DocumentType, DocumentExtractedData, Applicant } from '../types';

// ── Score weights (sum = 1.0) ──────────────────────────────────────────────
const WEIGHTS = {
  income_ratio:        0.30,
  credit_score:        0.25,
  employment_stability:0.20,
  rental_history:      0.15,
  fraud_risk:          0.10,
} as const;

// ── Risk thresholds ────────────────────────────────────────────────────────
export const RISK_THRESHOLDS = {
  approve: 75,   // score >= 75 → approve
  review:  55,   // score >= 55 → request more info
                 // score <  55 → decline
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// MAIN SCREENING ENGINE
// ─────────────────────────────────────────────────────────────────────────────
export async function runAIScreening(
  application: Application,
  rentAmount: number,
  startTime = Date.now()
): Promise<AIScreening> {

  const docs = application.documents ?? [];
  const applicant = application.applicant!;

  // 1. Extract data from documents
  const extracted = mergeExtractedData(docs);

  // 2. Score each component
  const incomeRatio       = calculateIncomeRatio(extracted.gross_income ?? applicant.monthly_income, rentAmount);
  const incomeRatioScore  = scoreIncomeRatio(incomeRatio);
  const creditScore       = extracted.credit_score ?? applicant.credit_score ?? 0;
  const creditNormalized  = normalizeCreditScore(creditScore);
  const employmentScore   = scoreEmployment(applicant, extracted);
  const rentalHistoryScore= scoreRentalHistory(extracted, docs);
  const fraudRisk         = await detectFraud(docs, extracted);
  const fraudScore        = fraudRisk.riskScore;

  // 3. Weighted overall score (fraud is penalty, not reward)
  const rawScore =
    incomeRatioScore        * WEIGHTS.income_ratio +
    creditNormalized        * WEIGHTS.credit_score +
    employmentScore         * WEIGHTS.employment_stability +
    rentalHistoryScore      * WEIGHTS.rental_history +
    (100 - fraudScore)      * WEIGHTS.fraud_risk;   // invert: higher fraud = lower overall

  const overallScore = Math.round(Math.max(0, Math.min(100, rawScore)));

  // 4. Risk level & recommendation
  const riskLevel = overallScore >= RISK_THRESHOLDS.approve ? 'low'
    : overallScore >= RISK_THRESHOLDS.review ? 'medium' : 'high';

  const recommendation = overallScore >= RISK_THRESHOLDS.approve ? 'approve'
    : overallScore >= RISK_THRESHOLDS.review ? 'review' : 'decline';

  // 5. AI summary
  const aiSummary = buildAISummary({
    name: applicant.name,
    incomeRatio, creditScore, overallScore,
    fraudSignals: fraudRisk.signals,
    recommendation, rentalHistoryScore,
  });

  return {
    id: `scr_${Date.now()}`,
    application_id: application.id,
    overall_score: overallScore,
    risk_level: riskLevel,
    recommendation,
    income_ratio: incomeRatio,
    income_ratio_score: incomeRatioScore,
    credit_score: creditScore,
    credit_score_normalized: creditNormalized,
    employment_stability_score: employmentScore,
    rental_history_score: rentalHistoryScore,
    fraud_risk_score: fraudScore,
    fraud_signals: fraudRisk.signals,
    missing_documents: getMissingDocuments(docs),
    ai_summary: aiSummary,
    ai_insights: buildInsights({ incomeRatio, creditScore, rentalHistoryScore, fraudScore }),
    screening_duration_ms: Date.now() - startTime,
    created_at: new Date().toISOString(),
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// COMPONENT SCORERS
// ─────────────────────────────────────────────────────────────────────────────

function calculateIncomeRatio(monthlyIncome: number, monthlyRent: number): number {
  if (!monthlyRent || monthlyRent === 0) return 0;
  return Number((monthlyIncome / monthlyRent).toFixed(2));
}

function scoreIncomeRatio(ratio: number): number {
  // 3x = 85 pts, 4x+ = 100 pts, 2x = 50 pts, <1.5x = 0 pts
  if (ratio >= 4.0) return 100;
  if (ratio >= 3.5) return 95;
  if (ratio >= 3.0) return 85;
  if (ratio >= 2.5) return 70;
  if (ratio >= 2.0) return 50;
  if (ratio >= 1.5) return 30;
  return 10;
}

function normalizeCreditScore(score: number): number {
  // Normalize 300–850 to 0–100
  if (score >= 800) return 100;
  if (score >= 750) return 90;
  if (score >= 700) return 78;
  if (score >= 660) return 65;
  if (score >= 620) return 50;
  if (score >= 600) return 35;
  return 10;
}

function scoreEmployment(
  applicant: Applicant,
  extracted: Partial<DocumentExtractedData>
): number {
  let score = 50;

  // Employment type bonus
  if (applicant.employment_status === 'employed') score += 25;
  else if (applicant.employment_status === 'self_employed') score += 10;
  else if (applicant.employment_status === 'retired') score += 20;
  else if (applicant.employment_status === 'student') score -= 10;

  // Duration bonus
  const months = applicant.employment_duration_months ?? 0;
  if (months >= 24) score += 20;
  else if (months >= 12) score += 10;
  else if (months >= 6) score += 5;
  else if (months < 3) score -= 15;

  // Employer letter confirms employment
  if (extracted.employment_confirmed) score += 5;

  return Math.max(0, Math.min(100, score));
}

function scoreRentalHistory(
  extracted: Partial<DocumentExtractedData>,
  docs: Document[]
): number {
  const hasReference = docs.some(d => d.type === 'landlord_reference' && d.verification_status === 'verified');
  if (!hasReference) return 40;

  let score = 60;
  if (extracted.on_time_payments) score += 25;
  if (extracted.would_rent_again) score += 15;
  if ((extracted.tenancy_years ?? 0) >= 1) score += 10;
  return Math.min(100, score);
}

// ─────────────────────────────────────────────────────────────────────────────
// FRAUD DETECTION
// ─────────────────────────────────────────────────────────────────────────────

interface FraudResult { riskScore: number; signals: string[] }

async function detectFraud(docs: Document[], extracted: Partial<DocumentExtractedData>): Promise<FraudResult> {
  const signals: string[] = [];
  let riskScore = 0;

  for (const doc of docs) {
    // Each doc can be pre-flagged by backend document AI
    if (doc.fraud_signals && doc.fraud_signals.length > 0) {
      signals.push(...doc.fraud_signals);
      riskScore += doc.fraud_signals.length * 20;
    }
  }

  // NSF frequency
  if ((extracted.nsf_count ?? 0) > 3) {
    signals.push('High NSF frequency in bank statements');
    riskScore += 15;
  }

  return {
    riskScore: Math.min(100, riskScore),
    signals,
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────────────────────

function mergeExtractedData(docs: Document[]): Partial<DocumentExtractedData> {
  return docs.reduce<Partial<DocumentExtractedData>>((acc, doc) => {
    return { ...acc, ...(doc.extracted_data ?? {}) };
  }, {});
}

function getMissingDocuments(docs: Document[]): DocumentType[] {
  const required: DocumentType[] = [
    'government_id', 'pay_stub', 'bank_statement',
    'credit_report', 'employer_letter', 'landlord_reference'
  ];
  const submitted = new Set(docs.map(d => d.type));
  return required.filter(r => !submitted.has(r));
}

function buildAISummary(params: {
  name: string; incomeRatio: number; creditScore: number;
  overallScore: number; fraudSignals: string[];
  recommendation: 'approve' | 'review' | 'decline';
  rentalHistoryScore: number;
}): string {
  const { name, incomeRatio, creditScore, fraudSignals, recommendation } = params;

  const incomeStr = incomeRatio >= 3
    ? `Income at ${incomeRatio}x rent exceeds the preferred 3x threshold.`
    : `Income at ${incomeRatio}x rent is below the preferred 3x threshold.`;

  const creditStr = creditScore >= 700
    ? `Credit score of ${creditScore} is healthy.`
    : creditScore >= 650
    ? `Credit score of ${creditScore} is acceptable with minor caution.`
    : `Credit score of ${creditScore} is below ideal range.`;

  const fraudStr = fraudSignals.length === 0
    ? 'All documents verified with no fraud signals detected.'
    : `${fraudSignals.length} fraud signal(s) detected: ${fraudSignals.join(', ')}.`;

  const recStr = recommendation === 'approve'
    ? 'Approved for lease generation.'
    : recommendation === 'review'
    ? 'Recommend requesting additional documentation before proceeding.'
    : 'Application does not meet minimum requirements. Decline recommended.';

  return `${name} presents a ${recommendation === 'approve' ? 'strong' : recommendation === 'review' ? 'moderate' : 'weak'} application. ${incomeStr} ${creditStr} ${fraudStr} ${recStr}`;
}

function buildInsights(params: {
  incomeRatio: number; creditScore: number;
  rentalHistoryScore: number; fraudScore: number;
}): string[] {
  const insights: string[] = [];
  if (params.incomeRatio >= 3) insights.push(`Income exceeds ${params.incomeRatio}x rent threshold ✓`);
  else insights.push(`Income below 3x rent (currently ${params.incomeRatio}x) ⚠`);
  if (params.creditScore >= 700) insights.push(`Strong credit score: ${params.creditScore} ✓`);
  if (params.rentalHistoryScore >= 80) insights.push('Clean rental history verified ✓');
  if (params.fraudScore === 0) insights.push('No fraud signals detected ✓');
  else insights.push(`${params.fraudScore}% fraud risk detected — review required ⚠`);
  return insights;
}

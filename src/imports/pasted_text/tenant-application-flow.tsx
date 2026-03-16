// ─── KAYA PROPTECH — TenantApplicationFlow.tsx ───────────────────────────────
// Full multi-step application flow: Profile → Documents → AI Screening → Lease → Complete
// Stack: React + TypeScript + Tailwind + Supabase

import { useState, useCallback, useRef } from 'react';
import type {
  Application, Applicant, Document as KayaDoc,
  DocumentType, VerificationStatus, AIScreening, Lease
} from '../types';

// ── Step config ────────────────────────────────────────────────────────────
const STEPS = [
  { id: 1, label: 'Profile',    key: 'profile' },
  { id: 2, label: 'Documents',  key: 'documents' },
  { id: 3, label: 'Screening',  key: 'screening' },
  { id: 4, label: 'Lease',      key: 'lease' },
  { id: 5, label: 'Complete',   key: 'complete' },
] as const;

type StepKey = typeof STEPS[number]['key'];

// ── Document upload config ─────────────────────────────────────────────────
const REQUIRED_DOCS: { type: DocumentType; label: string; hint: string; icon: string }[] = [
  { type: 'government_id',      label: 'Government ID',      hint: 'Passport, Driver\'s License, or PR Card', icon: '🪪' },
  { type: 'pay_stub',           label: 'Pay Stubs',          hint: 'Last 3 months required',                 icon: '💼' },
  { type: 'bank_statement',     label: 'Bank Statement',     hint: '3 months of statements',                 icon: '🏦' },
  { type: 'credit_report',      label: 'Credit Report',      hint: 'Equifax or TransUnion',                  icon: '📊' },
  { type: 'employer_letter',    label: 'Employer Letter',    hint: 'On company letterhead',                  icon: '📋' },
  { type: 'landlord_reference', label: 'Landlord Reference', hint: 'Previous landlord contact',              icon: '🏠' },
];

// ── Sub-components ─────────────────────────────────────────────────────────

interface StepHeaderProps {
  currentStep: number;
}
function StepHeader({ currentStep }: StepHeaderProps) {
  return (
    <div className="flex items-center justify-center gap-2 py-4 border-b border-white/5 bg-[#111116]">
      {STEPS.map((step, idx) => (
        <div key={step.id} className="flex items-center gap-2">
          <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-all
            ${currentStep === step.id ? 'bg-violet-600/20 text-violet-300 border border-violet-500/30' :
              currentStep > step.id  ? 'text-emerald-400' : 'text-white/20'}`}>
            <div className={`w-5 h-5 rounded-full border flex items-center justify-center text-[10px] font-bold
              ${currentStep > step.id  ? 'bg-emerald-400 border-emerald-400 text-black' :
                currentStep === step.id ? 'border-violet-400 text-violet-300' : 'border-white/10 text-white/20'}`}>
              {currentStep > step.id ? '✓' : step.id}
            </div>
            {step.label}
          </div>
          {idx < STEPS.length - 1 && (
            <div className={`w-6 h-px ${currentStep > step.id ? 'bg-emerald-400/40' : 'bg-white/8'}`} />
          )}
        </div>
      ))}
    </div>
  );
}

// ── Profile Step ──────────────────────────────────────────────────────────
interface ProfileData {
  name: string; email: string; phone: string;
  dob: string; address: string; income: string;
  employer: string; employment_status: string; credit_score: string;
}

interface ProfileStepProps {
  data: ProfileData;
  onChange: (d: Partial<ProfileData>) => void;
  onNext: () => void;
}
function ProfileStep({ data, onChange, onNext }: ProfileStepProps) {
  const isValid = data.name && data.email && data.phone && data.income;
  return (
    <div className="flex flex-col gap-5">
      <div className="bg-violet-500/8 border border-violet-500/20 rounded-xl p-4 flex gap-3">
        <div className="w-7 h-7 bg-violet-600 rounded-lg flex items-center justify-center text-xs shrink-0">✦</div>
        <div className="text-sm text-white/60 leading-relaxed">
          <strong className="text-violet-300 block mb-1">AI-Assisted Application</strong>
          Fill in your details below. Your information is encrypted and only shared with your prospective landlord.
        </div>
      </div>

      <div className="bg-[#16161a] border border-white/6 rounded-2xl overflow-hidden">
        <div className="flex items-center gap-3 px-5 py-4 border-b border-white/6">
          <span className="text-sm font-semibold">Personal Information</span>
        </div>
        <div className="p-5 grid grid-cols-2 gap-4">
          {/* Full Name */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] text-white/30 uppercase tracking-wider">Full Name</label>
            <input className="bg-[#1e1e24] border border-white/8 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-violet-500 text-white placeholder:text-white/20 transition-colors"
              placeholder="Sarah Kim" value={data.name} onChange={e => onChange({ name: e.target.value })} />
          </div>
          {/* Email */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] text-white/30 uppercase tracking-wider">Email</label>
            <input type="email" className="bg-[#1e1e24] border border-white/8 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-violet-500 text-white placeholder:text-white/20 transition-colors"
              placeholder="sarah@email.com" value={data.email} onChange={e => onChange({ email: e.target.value })} />
          </div>
          {/* Phone */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] text-white/30 uppercase tracking-wider">Phone</label>
            <input className="bg-[#1e1e24] border border-white/8 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-violet-500 text-white placeholder:text-white/20 transition-colors"
              placeholder="+1 (647) 555-0192" value={data.phone} onChange={e => onChange({ phone: e.target.value })} />
          </div>
          {/* DOB */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] text-white/30 uppercase tracking-wider">Date of Birth</label>
            <input type="date" className="bg-[#1e1e24] border border-white/8 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-violet-500 text-white transition-colors"
              value={data.dob} onChange={e => onChange({ dob: e.target.value })} />
          </div>
          {/* Address */}
          <div className="col-span-2 flex flex-col gap-1.5">
            <label className="text-[11px] text-white/30 uppercase tracking-wider">Current Address</label>
            <input className="bg-[#1e1e24] border border-white/8 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-violet-500 text-white placeholder:text-white/20 transition-colors"
              placeholder="88 Queen St E, Toronto ON M5C 1S2" value={data.address} onChange={e => onChange({ address: e.target.value })} />
          </div>
          {/* Monthly Income */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] text-white/30 uppercase tracking-wider">Monthly Income (CAD)</label>
            <input type="number" className="bg-[#1e1e24] border border-white/8 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-violet-500 text-white placeholder:text-white/20 transition-colors"
              placeholder="8500" value={data.income} onChange={e => onChange({ income: e.target.value })} />
          </div>
          {/* Employment Status */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] text-white/30 uppercase tracking-wider">Employment Status</label>
            <select className="bg-[#1e1e24] border border-white/8 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-violet-500 text-white transition-colors"
              value={data.employment_status} onChange={e => onChange({ employment_status: e.target.value })}>
              <option value="">Select…</option>
              <option value="employed">Full-time Employed</option>
              <option value="part_time">Part-time Employed</option>
              <option value="self_employed">Self-Employed</option>
              <option value="student">Student</option>
              <option value="retired">Retired</option>
            </select>
          </div>
          {/* Employer */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] text-white/30 uppercase tracking-wider">Employer Name</label>
            <input className="bg-[#1e1e24] border border-white/8 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-violet-500 text-white placeholder:text-white/20 transition-colors"
              placeholder="Deloitte Canada" value={data.employer} onChange={e => onChange({ employer: e.target.value })} />
          </div>
          {/* Credit Score (optional) */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] text-white/30 uppercase tracking-wider">Credit Score (optional)</label>
            <input type="number" className="bg-[#1e1e24] border border-white/8 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-violet-500 text-white placeholder:text-white/20 transition-colors"
              placeholder="e.g. 720" value={data.credit_score} onChange={e => onChange({ credit_score: e.target.value })} />
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button disabled={!isValid} onClick={onNext}
          className="flex items-center gap-2 px-5 py-2.5 bg-violet-600 hover:bg-violet-500 disabled:opacity-30 disabled:cursor-not-allowed text-white text-sm font-medium rounded-xl transition-all">
          Save & Continue →
        </button>
      </div>
    </div>
  );
}

// ── Document Upload Step ──────────────────────────────────────────────────
type DocState = 'idle' | 'processing' | 'verified' | 'fraud' | 'rejected';

interface DocumentStepProps {
  docStates: Record<DocumentType, DocState>;
  onUpload: (type: DocumentType) => void;
  onNext: () => void;
  onBack: () => void;
}
function DocumentStep({ docStates, onUpload, onNext, onBack }: DocumentStepProps) {
  const verifiedCount = Object.values(docStates).filter(s => s === 'verified').length;
  const allDone = verifiedCount >= REQUIRED_DOCS.length;

  return (
    <div className="flex flex-col gap-5">
      <div className="bg-violet-500/8 border border-violet-500/20 rounded-xl p-4 flex gap-3">
        <div className="w-7 h-7 bg-violet-600 rounded-lg flex items-center justify-center text-xs shrink-0">✦</div>
        <div className="text-sm text-white/60 leading-relaxed">
          <strong className="text-violet-300 block mb-1">AI Document Scanner Active</strong>
          Upload your documents below. Our AI scans for authenticity, extracts income data, and flags fraud signals in real time.
        </div>
      </div>

      {/* Progress */}
      <div className="bg-[#16161a] border border-white/6 rounded-xl p-4">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-white/50">{verifiedCount} of {REQUIRED_DOCS.length} documents verified</span>
          <span className={allDone ? 'text-emerald-400' : 'text-white/30'}>{allDone ? '✓ All verified' : `${REQUIRED_DOCS.length - verifiedCount} remaining`}</span>
        </div>
        <div className="h-1.5 bg-white/6 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-violet-500 to-emerald-400 rounded-full transition-all duration-700"
            style={{ width: `${(verifiedCount / REQUIRED_DOCS.length) * 100}%` }} />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {REQUIRED_DOCS.map(doc => {
          const state = docStates[doc.type] || 'idle';
          return (
            <DocumentUploadCard
              key={doc.type} doc={doc} state={state}
              onClick={() => state === 'idle' && onUpload(doc.type)}
            />
          );
        })}
      </div>

      <div className="text-xs text-white/25 text-center py-2">
        🔒 Documents are AES-256 encrypted. PIPEDA compliant. Accessible only to your verified landlord.
      </div>

      <div className="flex justify-between">
        <button onClick={onBack} className="px-5 py-2.5 bg-white/5 hover:bg-white/8 text-white/60 text-sm rounded-xl border border-white/8 transition-all">← Back</button>
        <button disabled={!allDone} onClick={onNext}
          className="flex items-center gap-2 px-5 py-2.5 bg-violet-600 hover:bg-violet-500 disabled:opacity-30 disabled:cursor-not-allowed text-white text-sm font-medium rounded-xl transition-all">
          Run AI Screening →
        </button>
      </div>
    </div>
  );
}

interface DocCardProps {
  doc: typeof REQUIRED_DOCS[number];
  state: DocState;
  onClick: () => void;
}
function DocumentUploadCard({ doc, state, onClick }: DocCardProps) {
  const stateStyles: Record<DocState, string> = {
    idle: 'border-white/10 hover:border-violet-500/50 hover:bg-violet-500/5 cursor-pointer',
    processing: 'border-amber-400/40 bg-amber-400/5',
    verified: 'border-emerald-400/40 bg-emerald-400/5',
    fraud: 'border-red-400/40 bg-red-400/5',
    rejected: 'border-red-400/40 bg-red-400/5',
  };
  const statusMap: Record<DocState, { label: string; color: string }> = {
    idle: { label: 'Click to upload', color: 'text-white/25' },
    processing: { label: '⏳ AI scanning…', color: 'text-amber-400' },
    verified: { label: '✓ Verified', color: 'text-emerald-400' },
    fraud: { label: '⚠ Fraud signal', color: 'text-red-400' },
    rejected: { label: '✗ Rejected', color: 'text-red-400' },
  };

  return (
    <div onClick={onClick} className={`border rounded-2xl p-4 text-center transition-all ${stateStyles[state]}`}>
      <div className="text-2xl mb-2">{doc.icon}</div>
      <div className="text-sm font-medium mb-1">{doc.label}</div>
      <div className="text-[11px] text-white/30">{doc.hint}</div>
      <div className={`text-[11px] font-semibold mt-2 ${statusMap[state].color}`}>{statusMap[state].label}</div>
    </div>
  );
}

// ── AI Screening Step ─────────────────────────────────────────────────────
interface ScreeningStepProps {
  screening: AIScreening | null;
  isProcessing: boolean;
  onApprove: () => void;
  onDecline: () => void;
  onBack: () => void;
}
function ScreeningStep({ screening, isProcessing, onApprove, onDecline, onBack }: ScreeningStepProps) {
  const aiSteps = [
    'Document authenticity scan',
    'Income & employment verification',
    'Credit analysis & scoring',
    'Rental history check',
    'AI risk score calculation',
  ];

  if (isProcessing || !screening) {
    return (
      <div className="bg-[#16161a] border border-white/6 rounded-2xl p-10 text-center">
        <div className="w-12 h-12 border-2 border-white/10 border-t-violet-500 rounded-full animate-spin mx-auto mb-5" />
        <div className="text-base font-semibold mb-2">Analyzing your application…</div>
        <div className="text-sm text-white/40 mb-8">AI is verifying all documents and calculating your risk profile</div>
        <div className="flex flex-col gap-2 max-w-xs mx-auto">
          {aiSteps.map((step, i) => (
            <div key={i} className="flex items-center gap-3 p-3 bg-[#1e1e24] rounded-xl text-sm text-white/50">
              <div className="w-5 h-5 rounded-full border border-white/15 flex items-center justify-center text-[10px]">{i + 1}</div>
              {step}
            </div>
          ))}
        </div>
      </div>
    );
  }

  const scoreColor = screening.overall_score >= 80 ? '#00c9a7' : screening.overall_score >= 60 ? '#f0a050' : '#f05060';
  const recClass = { approve: 'bg-emerald-400/10 text-emerald-400 border-emerald-400/30', review: 'bg-amber-400/10 text-amber-400 border-amber-400/30', decline: 'bg-red-400/10 text-red-400 border-red-400/30' }[screening.recommendation];

  return (
    <div className="flex flex-col gap-4">
      <div className="bg-[#16161a] border border-white/6 rounded-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center gap-5 p-5 border-b border-white/6">
          <div className="w-16 h-16 rounded-full flex flex-col items-center justify-center flex-shrink-0 border-2"
            style={{ background: scoreColor + '15', borderColor: scoreColor }}>
            <div className="text-2xl font-light font-mono" style={{ color: scoreColor }}>{screening.overall_score}</div>
            <div className="text-[9px] text-white/30 tracking-wider">/ 100</div>
          </div>
          <div>
            <div className="text-base font-semibold mb-2">AI Screening Complete</div>
            <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold border ${recClass}`}>
              {screening.recommendation === 'approve' ? '✓' : screening.recommendation === 'decline' ? '✗' : '⚠'} Recommended: {screening.recommendation.charAt(0).toUpperCase() + screening.recommendation.slice(1)}
            </div>
            <div className="text-xs text-white/25 mt-2">Screened in {(screening.screening_duration_ms / 1000).toFixed(1)}s · Ontario RTA compliant</div>
          </div>
        </div>

        {/* Metrics grid */}
        <div className="grid grid-cols-2">
          {[
            { label: 'Income to Rent', value: `${screening.income_ratio.toFixed(1)}x`, pct: Math.min(100, screening.income_ratio_score), color: '#00c9a7' },
            { label: 'Credit Score', value: screening.credit_score, pct: screening.credit_score_normalized, color: '#5090f0' },
            { label: 'Employment', value: `${screening.employment_stability_score}%`, pct: screening.employment_stability_score, color: '#7c6fef' },
            { label: 'Fraud Risk', value: `${screening.fraud_risk_score}%`, pct: screening.fraud_risk_score, color: '#f05060' },
          ].map((m, i) => (
            <div key={i} className="p-4 border-r border-b border-white/6 [&:nth-child(2n)]:border-r-0 [&:nth-last-child(-n+2)]:border-b-0">
              <div className="text-[11px] text-white/30 mb-1">{m.label}</div>
              <div className="text-base font-medium font-mono mb-2" style={{ color: m.color }}>{m.value}</div>
              <div className="h-1 bg-white/6 rounded-full overflow-hidden">
                <div className="h-full rounded-full" style={{ width: `${m.pct}%`, background: m.color }} />
              </div>
            </div>
          ))}
        </div>

        {/* AI Summary */}
        <div className="p-5 border-t border-white/6">
          <div className="bg-violet-500/8 border border-violet-500/20 rounded-xl p-4 flex gap-3">
            <div className="w-7 h-7 bg-violet-600 rounded-lg flex items-center justify-center text-xs shrink-0">✦</div>
            <div className="text-sm text-white/60 leading-relaxed">
              <strong className="text-violet-300 block mb-1">AI Summary</strong>
              {screening.ai_summary}
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-3">
        <button onClick={onDecline} className="px-4 py-2.5 bg-red-500/8 text-red-400 border border-red-500/20 text-sm rounded-xl hover:bg-red-500/15 transition-all">✗ Decline</button>
        <button onClick={onBack} className="px-4 py-2.5 bg-white/5 text-white/50 border border-white/8 text-sm rounded-xl hover:bg-white/8 transition-all">Request info</button>
        <button onClick={onApprove} className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-emerald-400/10 text-emerald-400 border border-emerald-400/30 text-sm font-medium rounded-xl hover:bg-emerald-400/15 transition-all">
          ✓ Approve & Generate Lease →
        </button>
      </div>
    </div>
  );
}

// ── Lease Step ────────────────────────────────────────────────────────────
interface LeaseStepProps {
  lease: Partial<Lease>;
  onSign: () => void;
  onBack: () => void;
}
function LeaseStep({ lease, onSign, onBack }: LeaseStepProps) {
  const [tab, setTab] = useState<'preview' | 'summary' | 'terms'>('preview');

  return (
    <div className="flex flex-col gap-5">
      <div className="bg-[#16161a] border border-white/6 rounded-2xl overflow-hidden">
        <div className="flex items-center gap-3 px-5 py-4 border-b border-white/6">
          <span className="text-sm font-semibold flex-1">Ontario Standard Lease — AI Generated</span>
          <span className="text-[10px] bg-emerald-400/10 text-emerald-400 border border-emerald-400/25 px-2.5 py-1 rounded-full font-semibold">RTA Compliant</span>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 divide-x divide-white/6 border-b border-white/6">
          {[
            { val: `$${lease.rent_amount?.toLocaleString()}`, lbl: 'Monthly Rent' },
            { val: 'Oct 1', lbl: 'Start Date' },
            { val: '12mo', lbl: 'Term' },
          ].map((s, i) => (
            <div key={i} className="text-center py-4">
              <div className="text-lg font-light font-mono">{s.val}</div>
              <div className="text-[10px] text-white/30 uppercase tracking-wider mt-1">{s.lbl}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-1 p-3 bg-[#111116] border-b border-white/6">
          {(['preview', 'summary', 'terms'] as const).map(t => (
            <button key={t} onClick={() => setTab(t)}
              className={`flex-1 py-2 rounded-lg text-xs font-medium transition-all capitalize
                ${tab === t ? 'bg-[#16161a] text-white border border-white/8' : 'text-white/30 hover:text-white/50'}`}>
              {t === 'summary' ? 'AI Summary' : t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>

        <div className="p-5">
          {tab === 'preview' && (
            <div className="bg-[#111116] border border-white/6 rounded-xl p-5 text-xs leading-relaxed text-white/50 max-h-72 overflow-y-auto">
              <h3 className="text-sm font-semibold text-white text-center mb-4">ONTARIO STANDARD LEASE AGREEMENT</h3>
              <section className="mb-4">
                <p className="text-[10px] text-violet-300 uppercase tracking-wider font-semibold mb-2">1. Parties</p>
                <p><strong>Landlord:</strong> Justin Mafie (KAYA Properties Inc.), 123 King St, Toronto ON M5V 1J2</p>
                <p><strong>Tenant:</strong> Sarah Kim, 88 Queen St E, Toronto ON M5C 1S2</p>
              </section>
              <section className="mb-4">
                <p className="text-[10px] text-violet-300 uppercase tracking-wider font-semibold mb-2">2. Rental Unit</p>
                <p>Unit 4A, 123 King St, Toronto, Ontario, M5V 1J2. 2 bedrooms, 2 bathrooms, parking included.</p>
              </section>
              <section className="mb-4">
                <p className="text-[10px] text-violet-300 uppercase tracking-wider font-semibold mb-2">3. Rent</p>
                <p>Monthly rent: $2,300.00. Due the 1st of each month. Last month's deposit: $2,300.00 collected at signing.</p>
              </section>
              <section className="mb-4">
                <p className="text-[10px] text-violet-300 uppercase tracking-wider font-semibold mb-2">4. Utilities</p>
                <p>Included: Heat, water. Tenant responsible: Hydro, internet.</p>
              </section>
              <div className="grid grid-cols-2 gap-4 mt-6 pt-4 border-t border-white/6">
                <div><div className="border-t border-white/15 pt-2 text-[10px] text-white/25">Tenant — Sarah Kim<br/><br/>Date: __________</div></div>
                <div><div className="border-t border-white/15 pt-2 text-[10px] text-white/25">Landlord — Justin Mafie<br/><br/>Date: __________</div></div>
              </div>
            </div>
          )}
          {tab === 'summary' && (
            <div className="bg-violet-500/8 border border-violet-500/20 rounded-xl p-4 flex gap-3">
              <div className="w-7 h-7 bg-violet-600 rounded-lg flex items-center justify-center text-xs shrink-0">✦</div>
              <div className="text-sm text-white/60 leading-relaxed">
                <strong className="text-violet-300 block mb-2">AI Plain-Language Summary</strong>
                This is a standard 12-month lease starting October 1, 2025. Your rent is $2,300/month due on the 1st. Heat and water are included — you pay hydro and internet. After 12 months it becomes month-to-month automatically. The landlord can only raise rent once per year with 90 days notice using the provincial guideline (2.5% for 2026).
              </div>
            </div>
          )}
          {tab === 'terms' && (
            <div className="flex flex-col gap-2">
              {[
                { txt: 'Rent: $2,300/mo · Due the 1st', sub: 'Last month\'s deposit at signing' },
                { txt: '12-month fixed term', sub: 'Auto month-to-month after Sep 30, 2026' },
                { txt: 'Heat & water included', sub: 'Tenant pays hydro + internet' },
                { txt: '90-day notice for rent increase', sub: 'Provincial guideline 2.5% (2026)' },
                { txt: 'Pets allowed with written consent', sub: '' },
                { txt: 'Ontario RTA compliant · AI-verified', sub: '' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 p-3 bg-emerald-400/5 border border-emerald-400/20 rounded-xl">
                  <div className="w-5 h-5 rounded-full bg-emerald-400 flex items-center justify-center text-[10px] font-bold text-black flex-shrink-0">✓</div>
                  <div>
                    <div className="text-sm">{item.txt}</div>
                    {item.sub && <div className="text-[11px] text-white/30 mt-0.5">{item.sub}</div>}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="flex gap-3">
        <button onClick={onBack} className="px-4 py-2.5 bg-white/5 text-white/50 border border-white/8 text-sm rounded-xl hover:bg-white/8 transition-all">← Back</button>
        <button onClick={onSign} className="flex-1 py-2.5 bg-violet-600 hover:bg-violet-500 text-white text-sm font-medium rounded-xl transition-all">
          ✓ Sign & Submit Lease →
        </button>
      </div>
    </div>
  );
}

// ── Complete Step ─────────────────────────────────────────────────────────
function CompleteStep({ onReset }: { onReset: () => void }) {
  return (
    <div className="bg-[#16161a] border border-white/6 rounded-2xl p-10 text-center">
      <div className="text-5xl mb-4">🎉</div>
      <div className="text-xl font-semibold mb-2">Application Complete!</div>
      <div className="text-sm text-white/50 max-w-sm mx-auto mb-8 leading-relaxed">
        Sarah Kim's application for Unit 4A has been approved, lease signed, and deposit collected. Welcome to Kaya!
      </div>
      <div className="grid grid-cols-3 gap-3 max-w-xs mx-auto mb-8">
        {[{ v: '91', l: 'AI Score' }, { v: '12s', l: 'Screened in' }, { v: '✓', l: 'Signed' }].map((s, i) => (
          <div key={i} className="bg-[#1e1e24] border border-white/6 rounded-xl py-3">
            <div className="text-lg font-light font-mono text-emerald-400">{s.v}</div>
            <div className="text-[10px] text-white/30 uppercase tracking-wider mt-1">{s.l}</div>
          </div>
        ))}
      </div>
      <div className="flex gap-3 justify-center">
        <button onClick={onReset} className="px-5 py-2.5 bg-violet-600 hover:bg-violet-500 text-white text-sm font-medium rounded-xl transition-all">← Dashboard</button>
        <button className="px-5 py-2.5 bg-white/5 text-white/50 border border-white/8 text-sm rounded-xl hover:bg-white/8 transition-all">View Lease PDF</button>
      </div>
    </div>
  );
}

// ── MAIN COMPONENT ─────────────────────────────────────────────────────────
export default function TenantApplicationFlow() {
  const [currentStep, setCurrentStep] = useState<number>(2);
  const [profile, setProfile] = useState<ProfileData>({
    name: 'Sarah Kim', email: 'sarah.kim@email.com', phone: '+1 (647) 555-0192',
    dob: '1994-03-18', address: '88 Queen St E, Toronto ON', income: '8500',
    employer: 'Deloitte Canada', employment_status: 'employed', credit_score: '738',
  });
  const [docStates, setDocStates] = useState<Record<DocumentType, DocState>>(
    Object.fromEntries(REQUIRED_DOCS.map(d => [d.type, 'idle'])) as Record<DocumentType, DocState>
  );
  const [isScreening, setIsScreening] = useState(false);
  const [screening, setScreening] = useState<AIScreening | null>(null);

  const uploadDoc = useCallback((type: DocumentType) => {
    setDocStates(prev => ({ ...prev, [type]: 'processing' }));
    const delay = 900 + Math.random() * 1200;
    setTimeout(() => {
      setDocStates(prev => ({ ...prev, [type]: 'verified' }));
    }, delay);
  }, []);

  const runScreening = useCallback(() => {
    setIsScreening(true);
    setCurrentStep(3);
    setTimeout(() => {
      setIsScreening(false);
      setScreening({
        id: 'scr_001', application_id: 'app_001',
        overall_score: 91, risk_level: 'low', recommendation: 'approve',
        income_ratio: 3.7, income_ratio_score: 92,
        credit_score: 738, credit_score_normalized: 79,
        employment_stability_score: 90, rental_history_score: 95,
        fraud_risk_score: 5, fraud_signals: [],
        missing_documents: [],
        ai_summary: 'Sarah Kim presents a strong application. Income at 3.7x rent exceeds the preferred 3x threshold. Credit score of 738 is healthy with minimal debt. Zero eviction history and a 2-year clean rental record. All 6 documents verified with no fraud signals detected. Approved for lease generation.',
        ai_insights: ['Income exceeds 3x rent threshold', 'Clean rental history — 2 years', 'No fraud signals detected'],
        screening_duration_ms: 12400, created_at: new Date().toISOString(),
      });
    }, 6000);
  }, []);

  const mockLease: Partial<Lease> = {
    rent_amount: 2300, deposit_amount: 2300,
    start_date: '2025-10-01', end_date: '2026-09-30', term_months: 12,
    utilities_included: ['heat', 'water'], tenant_pays: ['hydro', 'internet'],
    pets_allowed: true, smoking_allowed: false, ltb_compliant: true, generated_by_ai: true,
  };

  const allDocsVerified = REQUIRED_DOCS.every(d => docStates[d.type] === 'verified');

  return (
    <div className="min-h-screen bg-[#0a0a0d] text-white font-['DM_Sans',sans-serif]">
      <StepHeader currentStep={currentStep} />
      <div className="max-w-3xl mx-auto px-6 py-8">
        {currentStep === 1 && <ProfileStep data={profile} onChange={d => setProfile(p => ({...p,...d}))} onNext={() => setCurrentStep(2)} />}
        {currentStep === 2 && <DocumentStep docStates={docStates} onUpload={uploadDoc} onNext={runScreening} onBack={() => setCurrentStep(1)} />}
        {currentStep === 3 && <ScreeningStep screening={screening} isProcessing={isScreening} onApprove={() => setCurrentStep(4)} onDecline={() => {}} onBack={() => setCurrentStep(2)} />}
        {currentStep === 4 && <LeaseStep lease={mockLease} onSign={() => setCurrentStep(5)} onBack={() => setCurrentStep(3)} />}
        {currentStep === 5 && <CompleteStep onReset={() => { setCurrentStep(2); setScreening(null); setDocStates(Object.fromEntries(REQUIRED_DOCS.map(d => [d.type, 'idle'])) as Record<DocumentType, DocState>); }} />}
      </div>
    </div>
  );
}
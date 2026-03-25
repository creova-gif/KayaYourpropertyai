import { Scale, FileText, ArrowRight, CheckCircle2, AlertCircle, ExternalLink, Sparkles, Clock, Shield } from "lucide-react";
import { useState } from "react";
import { motion } from "motion/react";

const G = "#0A7A52";
const GL = "#E5F4EE";
const TX = "#0E0F0C";
const MU = "#767570";
const SANS = "'DM Sans', system-ui, sans-serif";
const SERIF = "'Instrument Serif', Georgia, serif";

interface LTBForm { code: string; title: string; when: string; urgency: "high" | "medium" | "low"; deadline?: string; }

const LTB_FORMS: LTBForm[] = [
  { code: "T1", title: "Application to Recover Money Paid as Rent Deposit", when: "Landlord refuses to return your last month's rent deposit", urgency: "medium", deadline: "1 year after move-out" },
  { code: "T2", title: "Application About Tenant Rights", when: "Landlord harasses you, enters without notice, or interferes with your enjoyment", urgency: "high", deadline: "1 year from incident" },
  { code: "T3", title: "Application to Transfer the Tenancy", when: "Landlord refuses to let you sublet or assign your lease", urgency: "medium" },
  { code: "T4", title: "Application to Have a Subletting Deemed Abandoned", when: "Sub-tenant isn't paying rent or has abandoned the unit", urgency: "low" },
  { code: "T5", title: "Application About Bad Faith Eviction", when: "Landlord evicted you using an N12 or N13 but didn't follow through", urgency: "high", deadline: "2 years from vacancy" },
  { code: "T6", title: "Application About Maintenance", when: "Landlord won't repair something affecting your health or safety", urgency: "high", deadline: "No strict deadline — file ASAP" },
  { code: "T7", title: "Application About Suite Meters", when: "Landlord installs a suite meter and didn't properly notify or adjust rent", urgency: "medium" },
];

const STEPS = [
  { num: 1, title: "Identify Your Issue", desc: "Describe what happened and we'll identify which form you need" },
  { num: 2, title: "Complete the Form", desc: "Kaya AI guides you through each field in plain language" },
  { num: 3, title: "Gather Evidence", desc: "Collect texts, photos, repair requests, and notice documents" },
  { num: 4, title: "File with LTB", desc: "Submit online at tribunalsontario.ca or in person" },
];

export function TenantDispute() {
  const [selectedForm, setSelectedForm] = useState<LTBForm | null>(null);
  const [step, setStep] = useState<"browse" | "detail" | "fill">("browse");
  const [issueText, setIssueText] = useState("");

  const urgencyConfig = {
    high:   { bg: "#FEF2F2", text: "#DC2626", border: "rgba(220,38,38,0.15)", label: "High Priority" },
    medium: { bg: "#FEF3C7", text: "#B45309", border: "rgba(180,83,9,0.15)", label: "Medium" },
    low:    { bg: "#F8F7F4", text: MU,        border: "rgba(0,0,0,0.08)",     label: "Low" },
  };

  return (
    <div style={{ fontFamily: SANS }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <p style={{ fontSize: 11, fontWeight: 700, color: MU, textTransform: "uppercase", letterSpacing: "0.7px", marginBottom: 4 }}>Rights</p>
          <h1 style={{ fontFamily: SERIF, fontSize: 36, fontWeight: 400, color: TX, letterSpacing: "-1px", lineHeight: 1 }}>Dispute Centre</h1>
        </motion.div>

        {/* Hero */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="rounded-2xl p-7 sm:p-8 mb-8" style={{ background: `linear-gradient(135deg, ${G} 0%, #065E3C 100%)`, boxShadow: `0 16px 48px ${G}35` }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 16 }}>
            <div style={{ width: 48, height: 48, borderRadius: 13, background: "rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Scale size={22} color="#fff" strokeWidth={2} />
            </div>
            <div>
              <h2 style={{ fontSize: 18, fontWeight: 600, color: "#fff", margin: 0 }}>LTB Form Assistant</h2>
              <p style={{ fontSize: 13, color: "rgba(255,255,255,0.65)", margin: "3px 0 0" }}>AI-guided landlord and tenant board filings</p>
            </div>
          </div>
          <p style={{ fontSize: 14, color: "rgba(255,255,255,0.8)", marginBottom: 20, lineHeight: 1.7 }}>
            LTB forms are intimidating — Kaya AI explains every field in plain language and helps you prepare your application. You still file with the LTB yourself, but we remove the guesswork.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {STEPS.map(s => (
              <div key={s.num} style={{ padding: "12px 14px", background: "rgba(255,255,255,0.1)", borderRadius: 11, backdropFilter: "blur(8px)" }}>
                <div style={{ width: 22, height: 22, borderRadius: "50%", background: "rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 8 }}>
                  <span style={{ fontSize: 10, fontWeight: 800, color: "#fff" }}>{s.num}</span>
                </div>
                <p style={{ fontSize: 12, fontWeight: 700, color: "#fff", margin: "0 0 3px" }}>{s.title}</p>
                <p style={{ fontSize: 10, color: "rgba(255,255,255,0.55)", margin: 0, lineHeight: 1.5 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* AI issue description */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} style={{ background: "#fff", borderRadius: 16, border: "1px solid rgba(0,0,0,0.07)", padding: "22px 24px", marginBottom: 24 }}>
          <h2 style={{ fontFamily: SERIF, fontSize: 20, fontWeight: 400, color: TX, marginBottom: 6 }}>Describe Your Situation</h2>
          <p style={{ fontSize: 13, color: MU, marginBottom: 16 }}>Tell us what's happening and Kaya AI will identify which LTB form applies.</p>
          <textarea
            value={issueText}
            onChange={e => setIssueText(e.target.value)}
            rows={4}
            placeholder="e.g., My landlord hasn't fixed the heating for 3 weeks despite multiple emails. It's affecting my health..."
            style={{ width: "100%", padding: "13px 16px", border: "1px solid rgba(0,0,0,0.08)", borderRadius: 12, fontSize: 14, fontFamily: SANS, outline: "none", resize: "vertical", boxSizing: "border-box", marginBottom: 12 }}
          />
          <button
            onClick={() => window.dispatchEvent(new CustomEvent("openAIWithQuery", { detail: { query: issueText || "What LTB form do I need for a maintenance dispute?" } }))}
            style={{ display: "flex", alignItems: "center", gap: 8, padding: "11px 20px", background: G, color: "#fff", borderRadius: 11, border: "none", fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: SANS, boxShadow: `0 4px 14px ${G}30` }}
          >
            <Sparkles size={15} strokeWidth={2.5} /> Ask Kaya AI to Identify My Form
          </button>
        </motion.div>

        {/* LTB Forms list */}
        <h2 style={{ fontFamily: SERIF, fontSize: 22, fontWeight: 400, color: TX, marginBottom: 16 }}>All Tenant Application Forms</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 24 }}>
          {LTB_FORMS.map((form, idx) => {
            const uc = urgencyConfig[form.urgency];
            const selected = selectedForm?.code === form.code;
            return (
              <motion.div key={form.code} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12 + idx * 0.04 }} onClick={() => setSelectedForm(selected ? null : form)} style={{ background: "#fff", borderRadius: 14, border: `2px solid ${selected ? G : "rgba(0,0,0,0.07)"}`, padding: "18px 20px", cursor: "pointer", transition: "all 0.2s", boxShadow: selected ? `0 8px 24px ${G}15` : "none" }}>
                <div style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
                  <div style={{ width: 44, height: 44, borderRadius: 11, background: selected ? GL : "#F8F7F4", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <span style={{ fontSize: 13, fontWeight: 800, color: selected ? G : MU, fontFamily: SERIF }}>{form.code}</span>
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 10, marginBottom: 4 }}>
                      <h3 style={{ fontSize: 14, fontWeight: 700, color: TX, margin: 0, flex: 1 }}>{form.title}</h3>
                      <span style={{ fontSize: 9, fontWeight: 700, color: uc.text, background: uc.bg, border: `1px solid ${uc.border}`, padding: "3px 9px", borderRadius: 99, flexShrink: 0, whiteSpace: "nowrap" }}>{uc.label}</span>
                    </div>
                    <p style={{ fontSize: 12, color: MU, margin: "0 0 6px" }}>Use when: {form.when}</p>
                    {form.deadline && <div style={{ display: "flex", alignItems: "center", gap: 5 }}><Clock size={11} color={MU} strokeWidth={2.5} /><span style={{ fontSize: 11, color: MU }}>Deadline: {form.deadline}</span></div>}
                  </div>
                </div>

                {selected && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} style={{ marginTop: 16, paddingTop: 16, borderTop: "1px solid rgba(0,0,0,0.06)" }}>
                    <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                      <button onClick={(e) => { e.stopPropagation(); window.dispatchEvent(new CustomEvent("openAIWithQuery", { detail: { query: `Help me fill out LTB form ${form.code}: ${form.title}` } })); }} style={{ display: "flex", alignItems: "center", gap: 7, padding: "10px 18px", background: G, color: "#fff", borderRadius: 10, border: "none", fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: SANS, boxShadow: `0 4px 12px ${G}30` }}>
                        <Sparkles size={14} strokeWidth={2.5} /> AI Guided Fill
                      </button>
                      <button onClick={(e) => e.stopPropagation()} style={{ display: "flex", alignItems: "center", gap: 7, padding: "10px 18px", background: "#fff", color: TX, borderRadius: 10, border: "1px solid rgba(0,0,0,0.08)", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: SANS }}>
                        <FileText size={14} strokeWidth={2.5} /> Download Blank Form
                      </button>
                      <a href="https://tribunalsontario.ca/ltb/" target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()} style={{ display: "flex", alignItems: "center", gap: 7, padding: "10px 18px", background: "#fff", color: "#1D4ED8", borderRadius: 10, border: "1px solid rgba(29,78,216,0.15)", fontSize: 13, fontWeight: 600, textDecoration: "none", fontFamily: SANS }}>
                        <ExternalLink size={14} strokeWidth={2.5} /> LTB Website
                      </a>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Disclaimer */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} style={{ background: "#F8F7F4", borderRadius: 14, padding: "18px 22px", border: "1px solid rgba(0,0,0,0.06)", marginBottom: 16 }}>
          <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
            <Shield size={16} color={MU} strokeWidth={2.5} style={{ flexShrink: 0, marginTop: 2 }} />
            <p style={{ fontSize: 12, color: MU, margin: 0, lineHeight: 1.7 }}>
              <strong style={{ color: TX }}>Important: </strong>Kaya's Dispute Centre is an informational tool and does not constitute legal advice. For complex situations, contact a licensed paralegal or Legal Aid Ontario at 1-800-668-8258.
            </p>
          </div>
        </motion.div>

        <div style={{ background: GL, borderRadius: 14, padding: "18px 22px", border: `1px solid ${G}20`, cursor: "pointer" }} onClick={() => window.dispatchEvent(new CustomEvent("openAIWithQuery", { detail: { query: "What are my rights as a tenant in Ontario?" } }))}>
          <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
            <div style={{ width: 34, height: 34, borderRadius: 9, background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <Sparkles size={16} color={G} strokeWidth={2.5} />
            </div>
            <div>
              <p style={{ fontSize: 13, fontWeight: 700, color: TX, margin: "0 0 4px" }}>Ask Kaya AI About Your Rights</p>
              <p style={{ fontSize: 13, color: "#3D6B55", margin: 0, lineHeight: 1.5 }}>Get plain-language explanations of the Ontario Residential Tenancies Act, your obligations, and your protections.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

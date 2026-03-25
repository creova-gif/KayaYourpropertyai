import { RefreshCw, CheckCircle2, Clock, FileText, DollarSign, Calendar, MessageSquare, Sparkles, AlertCircle, ArrowRight } from "lucide-react";
import { useState } from "react";
import { motion } from "motion/react";

const G = "#0A7A52";
const GL = "#E5F4EE";
const TX = "#0E0F0C";
const MU = "#767570";
const SANS = "'DM Sans', system-ui, sans-serif";
const SERIF = "'Instrument Serif', Georgia, serif";

export function TenantLeaseRenewal() {
  const [response, setResponse] = useState<"accept" | "negotiate" | "vacate" | null>(null);
  const [note, setNote] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const lease = { currentRent: 2300, proposedRent: 2368, increaseAmt: 68, increasePct: 2.95, currentEnd: "May 1, 2027", newStart: "May 1, 2027", newEnd: "May 1, 2028", daysToDecide: 63, ontarioGuideline: 2.5 };

  const handleSubmit = async () => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 1500));
    setLoading(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div style={{ fontFamily: SANS }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} style={{ background: "#fff", borderRadius: 20, padding: "48px 40px", textAlign: "center", border: "1px solid rgba(0,0,0,0.07)" }}>
            <div style={{ width: 72, height: 72, borderRadius: "50%", background: GL, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
              <CheckCircle2 size={36} color={G} strokeWidth={2} />
            </div>
            <h2 style={{ fontFamily: SERIF, fontSize: 30, fontWeight: 400, color: TX, marginBottom: 8 }}>Response Submitted</h2>
            <p style={{ fontSize: 14, color: MU, marginBottom: 24, lineHeight: 1.7 }}>
              Your landlord has been notified of your intent to{" "}
              <strong style={{ color: TX }}>{response === "accept" ? "accept renewal" : response === "negotiate" ? "negotiate terms" : "vacate"}</strong>.
              They have 30 days to respond.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 10, textAlign: "left", maxWidth: 320, margin: "0 auto 28px" }}>
              {["Your response saved and timestamped", "Landlord notified via email", "Renewal tracked in your portal", "You'll receive updates here"].map(item => (
                <div key={item} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <CheckCircle2 size={15} color={G} strokeWidth={2.5} />
                  <span style={{ fontSize: 13, color: TX }}>{item}</span>
                </div>
              ))}
            </div>
            <button onClick={() => setSubmitted(false)} style={{ padding: "12px 28px", background: G, color: "#fff", borderRadius: 12, border: "none", fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: SANS }}>
              Back to Renewal
            </button>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ fontFamily: SANS }}>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <p style={{ fontSize: 11, fontWeight: 700, color: MU, textTransform: "uppercase", letterSpacing: "0.7px", marginBottom: 4 }}>Lease</p>
          <h1 style={{ fontFamily: SERIF, fontSize: 36, fontWeight: 400, color: TX, letterSpacing: "-1px", lineHeight: 1 }}>Lease Renewal</h1>
        </motion.div>

        {/* Countdown hero */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="rounded-2xl p-7 sm:p-8 mb-7" style={{ background: `linear-gradient(135deg, ${G} 0%, #065E3C 100%)`, boxShadow: `0 16px 48px ${G}35` }}>
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: 12, marginBottom: 20 }}>
            <div>
              <p style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.5)", textTransform: "uppercase", letterSpacing: "0.8px", marginBottom: 8 }}>Respond Within</p>
              <p style={{ fontFamily: SERIF, fontSize: 52, fontWeight: 400, color: "#fff", lineHeight: 1, marginBottom: 4 }}>{lease.daysToDecide}</p>
              <p style={{ fontSize: 14, color: "rgba(255,255,255,0.7)" }}>days · Deadline Feb 1, 2027</p>
            </div>
            <div style={{ textAlign: "right" }}>
              <p style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", marginBottom: 4 }}>Current Lease Ends</p>
              <p style={{ fontSize: 15, fontWeight: 700, color: "#fff" }}>{lease.currentEnd}</p>
              <p style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", marginTop: 4 }}>Proposed renewal: {lease.newStart} – {lease.newEnd}</p>
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
            {[
              { label: "Current Rent", value: `$${lease.currentRent.toLocaleString()}/mo` },
              { label: "Proposed Rent", value: `$${lease.proposedRent.toLocaleString()}/mo` },
              { label: "Increase", value: `+${lease.increasePct}%` },
            ].map(s => (
              <div key={s.label} style={{ background: "rgba(255,255,255,0.1)", borderRadius: 12, padding: "12px 14px" }}>
                <p style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", margin: "0 0 4px" }}>{s.label}</p>
                <p style={{ fontFamily: SERIF, fontSize: 18, color: "#fff", margin: 0 }}>{s.value}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Ontario guideline check */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          {lease.increasePct <= lease.ontarioGuideline ? (
            <div style={{ display: "flex", alignItems: "flex-start", gap: 12, padding: "16px 20px", background: GL, border: `1px solid ${G}20`, borderRadius: 14, marginBottom: 24 }}>
              <CheckCircle2 size={20} color={G} strokeWidth={2.5} style={{ flexShrink: 0, marginTop: 1 }} />
              <div>
                <p style={{ fontSize: 14, fontWeight: 700, color: TX, margin: "0 0 4px" }}>Within Ontario Rent Guideline ({lease.ontarioGuideline}%)</p>
                <p style={{ fontSize: 13, color: "#3D6B55", margin: 0, lineHeight: 1.6 }}>The proposed increase of {lease.increasePct}% is at or below the {new Date().getFullYear()} Ontario rent increase guideline. Your landlord does not need LTB approval for this increase.</p>
              </div>
            </div>
          ) : (
            <div style={{ display: "flex", alignItems: "flex-start", gap: 12, padding: "16px 20px", background: "#FEF3C7", border: "1px solid rgba(180,83,9,0.15)", borderRadius: 14, marginBottom: 24 }}>
              <AlertCircle size={20} color="#B45309" strokeWidth={2.5} style={{ flexShrink: 0, marginTop: 1 }} />
              <div>
                <p style={{ fontSize: 14, fontWeight: 700, color: TX, margin: "0 0 4px" }}>Above Ontario Rent Guideline ({lease.ontarioGuideline}%)</p>
                <p style={{ fontSize: 13, color: "#92400E", margin: 0, lineHeight: 1.6 }}>The proposed increase of {lease.increasePct}% exceeds the guideline. Your landlord must apply to the LTB for an above-guideline increase. You may dispute this.</p>
              </div>
            </div>
          )}
        </motion.div>

        {/* Proposed terms */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} style={{ background: "#fff", borderRadius: 16, border: "1px solid rgba(0,0,0,0.07)", padding: "22px 24px", marginBottom: 24 }}>
          <h2 style={{ fontFamily: SERIF, fontSize: 20, fontWeight: 400, color: TX, marginBottom: 16 }}>Proposed Renewal Terms</h2>
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: "New Monthly Rent", value: `$${lease.proposedRent.toLocaleString()}`, icon: DollarSign },
              { label: "Increase Amount", value: `+$${lease.increaseAmt}/mo`, icon: ArrowRight },
              { label: "New Start Date", value: lease.newStart, icon: Calendar },
              { label: "New End Date", value: lease.newEnd, icon: Calendar },
            ].map(s => {
              const Icon = s.icon;
              return (
                <div key={s.label} style={{ padding: "14px 16px", background: "#F8F7F4", borderRadius: 12 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}>
                    <Icon size={12} color={MU} strokeWidth={2.5} />
                    <span style={{ fontSize: 11, color: MU, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.5px" }}>{s.label}</span>
                  </div>
                  <p style={{ fontSize: 16, fontWeight: 700, color: TX, margin: 0 }}>{s.value}</p>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Response options */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} style={{ background: "#fff", borderRadius: 16, border: "1px solid rgba(0,0,0,0.07)", padding: "22px 24px", marginBottom: 24 }}>
          <h2 style={{ fontFamily: SERIF, fontSize: 20, fontWeight: 400, color: TX, marginBottom: 6 }}>Your Response</h2>
          <p style={{ fontSize: 13, color: MU, marginBottom: 20 }}>Select how you'd like to respond to the renewal offer:</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 20 }}>
            {[
              { val: "accept", icon: CheckCircle2, title: "Accept Renewal", desc: `I agree to renew at $${lease.proposedRent}/mo for another 12 months`, color: G, bg: GL },
              { val: "negotiate", icon: MessageSquare, title: "Request Negotiation", desc: "I'd like to discuss different terms before committing", color: "#1D4ED8", bg: "#EFF6FF" },
              { val: "vacate", icon: Clock, title: "I Will Be Vacating", desc: "I won't be renewing — I'll vacate by the lease end date", color: "#DC2626", bg: "#FEF2F2" },
            ].map(opt => {
              const Icon = opt.icon;
              const selected = response === opt.val;
              return (
                <button key={opt.val} onClick={() => setResponse(opt.val as any)} style={{ display: "flex", alignItems: "flex-start", gap: 14, padding: "16px 18px", borderRadius: 12, border: `2px solid ${selected ? opt.color : "rgba(0,0,0,0.08)"}`, background: selected ? opt.bg : "#fff", cursor: "pointer", textAlign: "left", fontFamily: SANS, transition: "all 0.2s" }}>
                  <div style={{ width: 36, height: 36, borderRadius: 9, background: selected ? "#fff" : opt.bg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Icon size={17} color={opt.color} strokeWidth={2.5} />
                  </div>
                  <div>
                    <p style={{ fontSize: 14, fontWeight: 700, color: selected ? opt.color : TX, margin: "0 0 3px" }}>{opt.title}</p>
                    <p style={{ fontSize: 12, color: selected ? opt.color : MU, margin: 0, opacity: 0.85 }}>{opt.desc}</p>
                  </div>
                </button>
              );
            })}
          </div>

          {(response === "negotiate" || response === "vacate") && (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
              <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: TX, marginBottom: 8 }}>
                {response === "negotiate" ? "What terms would you like to discuss?" : "Additional notes (optional)"}
              </label>
              <textarea
                value={note}
                onChange={e => setNote(e.target.value)}
                rows={3}
                placeholder={response === "negotiate" ? "e.g., I'd like to discuss a smaller rent increase or a shorter term..." : "e.g., I'll need my deposit returned within 30 days..."}
                style={{ width: "100%", padding: "12px 14px", border: "1px solid rgba(0,0,0,0.08)", borderRadius: 11, fontSize: 14, fontFamily: SANS, outline: "none", resize: "vertical", boxSizing: "border-box" }}
              />
            </motion.div>
          )}
        </motion.div>

        <button
          onClick={handleSubmit}
          disabled={!response || loading}
          style={{ width: "100%", padding: "14px", background: response ? G : MU, color: "#fff", border: "none", borderRadius: 12, fontSize: 14, fontWeight: 700, cursor: response ? "pointer" : "not-allowed", fontFamily: SANS, display: "flex", alignItems: "center", justifyContent: "center", gap: 8, boxShadow: response ? `0 4px 16px ${G}40` : "none", marginBottom: 20 }}
        >
          {loading ? "Submitting..." : `Submit Response${response ? ` — ${response === "accept" ? "Accept" : response === "negotiate" ? "Negotiate" : "Vacate"}` : ""}`}
        </button>

        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} style={{ background: GL, borderRadius: 14, padding: "18px 22px", border: `1px solid ${G}20`, cursor: "pointer" }} onClick={() => window.dispatchEvent(new CustomEvent("openAIWithQuery", { detail: { query: "What are my rights during lease renewal in Ontario?" } }))}>
          <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
            <div style={{ width: 34, height: 34, borderRadius: 9, background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, boxShadow: "0 2px 6px rgba(0,0,0,0.06)" }}>
              <Sparkles size={16} color={G} strokeWidth={2.5} />
            </div>
            <div>
              <p style={{ fontSize: 13, fontWeight: 700, color: TX, margin: "0 0 4px" }}>Know Your Renewal Rights</p>
              <p style={{ fontSize: 13, color: "#3D6B55", margin: 0, lineHeight: 1.5 }}>Ontario tenants can't be forced out unless the landlord provides proper LTB-approved notice. Ask Kaya AI to explain your options.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

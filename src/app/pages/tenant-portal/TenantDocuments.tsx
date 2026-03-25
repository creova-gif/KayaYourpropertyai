import { FileText, Download, Eye, Shield, Receipt, Clipboard, Folder, Sparkles, Search, X } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { toast } from "sonner";

const G = "#0A7A52";
const GL = "#E5F4EE";
const TX = "#0E0F0C";
const MU = "#767570";
const SANS = "'DM Sans', system-ui, sans-serif";
const SERIF = "'Instrument Serif', Georgia, serif";

type LIcon = React.ComponentType<{ size?: number; color?: string; strokeWidth?: number }>;

const getDocStyle = (type: string): { color: string; bg: string; icon: LIcon } => {
  switch (type) {
    case "lease": return { color: G, bg: GL, icon: FileText };
    case "receipt": return { color: G, bg: GL, icon: Receipt };
    case "inspection": return { color: "#1D4ED8", bg: "#EFF6FF", icon: Clipboard };
    case "insurance": return { color: "#7C3AED", bg: "#F5F3FF", icon: Shield };
    default: return { color: MU, bg: "#F8F7F4", icon: Folder };
  }
};

const ALL_DOCS = [
  { id: 1, name: "Lease Agreement", type: "lease", date: "Jan 1, 2025", size: "245 KB", status: "signed", icon: "📋" },
  { id: 2, name: "March 2026 Receipt", type: "receipt", date: "Mar 1, 2026", size: "92 KB", status: "available", icon: "🧾" },
  { id: 3, name: "February 2026 Receipt", type: "receipt", date: "Feb 1, 2026", size: "92 KB", status: "available", icon: "🧾" },
  { id: 4, name: "Move-In Inspection", type: "inspection", date: "Jan 1, 2025", size: "1.8 MB", status: "signed", icon: "🏠" },
  { id: 5, name: "Insurance Certificate", type: "insurance", date: "Jan 1, 2026", size: "180 KB", status: "available", icon: "🛡" },
  { id: 6, name: "Welcome Package", type: "info", date: "Jan 1, 2025", size: "420 KB", status: "available", icon: "📦" },
  { id: 7, name: "Rules & Regulations", type: "info", date: "Jan 1, 2025", size: "310 KB", status: "available", icon: "📜" },
];

export function TenantDocuments() {
  const [search, setSearch] = useState("");
  const [leaseModal, setLeaseModal] = useState(false);
  const [passportModal, setPassportModal] = useState(false);

  const filtered = ALL_DOCS.filter(d =>
    !search || d.name.toLowerCase().includes(search.toLowerCase()) || d.type.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ fontFamily: SANS }}>

      {/* Header */}
      <div style={{ background: "#fff", borderBottom: "1px solid rgba(0,0,0,0.07)", padding: "18px 20px" }}>
        <p style={{ fontSize: 11, fontWeight: 700, color: MU, textTransform: "uppercase", letterSpacing: "0.7px", marginBottom: 4 }}>Documents</p>
        <h1 style={{ fontFamily: SERIF, fontSize: 30, fontWeight: 400, color: TX, marginBottom: 14 }}>Your Documents</h1>
        <div style={{ position: "relative" }}>
          <Search size={15} color={MU} strokeWidth={2.5} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)" }} />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search documents…"
            style={{ width: "100%", padding: "11px 13px 11px 36px", border: "1.5px solid rgba(0,0,0,0.07)", borderRadius: 10, fontFamily: SANS, fontSize: 13, color: TX, outline: "none", boxSizing: "border-box" }}
          />
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">

        {/* Lease highlight hero */}
        <motion.div
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          style={{ background: "linear-gradient(135deg,#0D5C3A,#0A7A52)", borderRadius: 16, padding: "16px 18px", marginBottom: 20, cursor: "pointer" }}
          onClick={() => setLeaseModal(true)}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div>
              <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 9, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.7px", marginBottom: 4 }}>Active Lease</p>
              <p style={{ fontFamily: SERIF, fontSize: 20, color: "#fff" }}>123 King Street, Unit 4A</p>
              <p style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", marginTop: 3 }}>Jan 1, 2025 — Dec 31, 2026</p>
            </div>
            <span style={{ background: "rgba(255,255,255,0.15)", color: "#fff", fontSize: 10, fontWeight: 700, padding: "4px 10px", borderRadius: 99 }}>✓ Active</span>
          </div>
          <div style={{ display: "flex", gap: 8, marginTop: 14 }}>
            <button onClick={e => { e.stopPropagation(); toast.info("Lease downloading…"); }} style={{ flex: 1, padding: 9, background: "#fff", color: "#085040", border: "none", borderRadius: 8, fontSize: 11, fontWeight: 700, cursor: "pointer" }}>Download PDF</button>
            <button onClick={e => { e.stopPropagation(); setLeaseModal(true); }} style={{ padding: "9px 14px", background: "rgba(255,255,255,0.1)", color: "#fff", border: "1px solid rgba(255,255,255,0.2)", borderRadius: 8, fontSize: 11, cursor: "pointer" }}>View Details</button>
          </div>
        </motion.div>

        {/* All documents */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} style={{ background: "#fff", borderRadius: 16, border: "1px solid rgba(0,0,0,0.07)", marginBottom: 20 }}>
          <div style={{ padding: "16px 20px 12px" }}>
            <p style={{ fontSize: 12, fontWeight: 700, color: MU, textTransform: "uppercase", letterSpacing: "0.6px" }}>All Documents</p>
          </div>
          {filtered.length === 0 ? (
            <div style={{ padding: "24px 20px", textAlign: "center" }}>
              <p style={{ fontSize: 14, color: MU }}>No documents matching "{search}"</p>
            </div>
          ) : filtered.map((doc, idx) => {
            const ds = getDocStyle(doc.type);
            const DocIcon = ds.icon;
            return (
              <div key={doc.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "13px 20px", borderBottom: idx < filtered.length - 1 ? "1px solid rgba(0,0,0,0.05)" : "none" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ width: 38, height: 38, borderRadius: 9, background: ds.bg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <DocIcon size={16} color={ds.color} strokeWidth={2.5} />
                  </div>
                  <div>
                    <p style={{ fontSize: 13, fontWeight: 600, color: TX, margin: 0 }}>{doc.name}</p>
                    <p style={{ fontSize: 11, color: MU }}>{doc.type.charAt(0).toUpperCase() + doc.type.slice(1)} · {doc.date}</p>
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                  {doc.status === "signed" && <span style={{ fontSize: 9, fontWeight: 700, color: G, background: GL, borderRadius: 99, padding: "3px 10px" }}>SIGNED</span>}
                  <button style={{ width: 30, height: 30, borderRadius: 8, background: "#F8F7F4", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }} onClick={() => toast.info(`${doc.name} downloading…`)}>
                    <Download size={13} color={MU} strokeWidth={2.5} />
                  </button>
                </div>
              </div>
            );
          })}
        </motion.div>

        {/* Tenant Passport section */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
          <p style={{ fontSize: 12, fontWeight: 700, color: MU, textTransform: "uppercase", letterSpacing: "0.6px", marginBottom: 12 }}>Tenant Passport</p>
          <div style={{ background: "#fff", border: "1px solid rgba(0,0,0,0.07)", borderRadius: 16, padding: 16, cursor: "pointer" }} onClick={() => setPassportModal(true)}>
            <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
              <div style={{ width: 64, height: 64, borderRadius: "50%", background: "linear-gradient(135deg,#7C3AED,#9F5AFF)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", flexShrink: 0, boxShadow: "0 0 0 0 rgba(124,58,237,0.4)", animation: "ringPulse 2s infinite" }}>
                <p style={{ fontFamily: SERIF, fontSize: 22, color: "#fff", lineHeight: 1, margin: 0 }}>87</p>
                <p style={{ fontSize: 8, color: "rgba(255,255,255,0.7)", fontWeight: 700, margin: 0 }}>SCORE</p>
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: 13, fontWeight: 700, color: TX, marginBottom: 3 }}>Your Tenant Passport</p>
                <p style={{ fontSize: 11, color: MU, marginBottom: 8 }}>Portable rental reputation — shared with landlords when you apply</p>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                  {["✓ Identity verified", "✓ 14 payments", "✓ 100% on-time"].map(b => (
                    <span key={b} style={{ fontSize: 10, fontWeight: 600, color: G, background: GL, border: "1px solid rgba(10,122,82,0.15)", borderRadius: 99, padding: "3px 9px" }}>{b}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* AI help */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} style={{ background: GL, borderRadius: 14, padding: "18px 22px", border: `1px solid ${G}20`, cursor: "pointer", marginTop: 16 }} onClick={() => window.dispatchEvent(new CustomEvent("openAIWithQuery", { detail: { query: "Explain my lease agreement" } }))}>
          <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
            <div style={{ width: 34, height: 34, borderRadius: 9, background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <Sparkles size={16} color={G} strokeWidth={2.5} />
            </div>
            <div>
              <p style={{ fontSize: 13, fontWeight: 700, color: TX, margin: "0 0 4px" }}>Need help understanding your lease?</p>
              <p style={{ fontSize: 13, color: "#3D6B55", margin: 0, lineHeight: 1.5 }}>Kaya AI can explain any clause in plain language — tap to ask.</p>
            </div>
          </div>
        </motion.div>

      </div>

      {/* ── Lease Detail Modal ── */}
      <AnimatePresence>
        {leaseModal && (
          <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.45)", backdropFilter: "blur(4px)", zIndex: 900, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }} onClick={() => setLeaseModal(false)}>
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} onClick={e => e.stopPropagation()} style={{ background: "#fff", borderRadius: 22, padding: 28, width: "100%", maxWidth: 440, maxHeight: "90vh", overflowY: "auto" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 22 }}>
                <h3 style={{ fontFamily: SERIF, fontSize: 26, color: TX, margin: 0 }}>Lease Agreement</h3>
                <button onClick={() => setLeaseModal(false)} style={{ background: "none", border: "none", cursor: "pointer", color: MU, display: "flex" }}><X size={18} /></button>
              </div>
              <div style={{ display: "flex", gap: 6, marginBottom: 16, flexWrap: "wrap" }}>
                {["✓ Active", "Ontario Standard Lease", "Digitally signed"].map(b => (
                  <span key={b} style={{ fontSize: 10, fontWeight: 700, color: b === "✓ Active" ? G : MU, background: b === "✓ Active" ? GL : "#F8F7F4", borderRadius: 99, padding: "3px 10px" }}>{b}</span>
                ))}
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 16 }}>
                {[["Unit", "4A"], ["Address", "123 King Street"], ["Start", "Jan 1, 2025"], ["End", "Dec 31, 2026"], ["Monthly Rent", "$2,300"], ["Deposit Paid", "$2,300"]].map(r => (
                  <div key={r[0]} style={{ background: "#F8F7F4", borderRadius: 9, padding: 10 }}>
                    <p style={{ fontSize: 9, fontWeight: 700, color: MU, textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 3 }}>{r[0]}</p>
                    <p style={{ fontSize: 13, fontWeight: 600, color: TX, margin: 0 }}>{r[1]}</p>
                  </div>
                ))}
              </div>
              <div style={{ background: GL, borderRadius: 11, padding: 13, marginBottom: 14 }}>
                <p style={{ fontSize: 11, fontWeight: 700, color: "#085040", marginBottom: 5 }}>Ontario Tenant Rights Summary</p>
                {[
                  "Landlord must give 24 hrs notice before entry",
                  "Rent increases capped at 2.5% in 2026 (Ontario guideline)",
                  "You have 60 days to respond to a rent increase notice",
                  "Maintenance must be addressed in a reasonable timeframe",
                ].map(r => <p key={r} style={{ fontSize: 11, color: "#085040", marginBottom: 3 }}>· {r}</p>)}
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                <button onClick={() => { setLeaseModal(false); toast.info("Lease downloading…"); }} style={{ padding: 12, background: "#F8F7F4", color: TX, border: "1.5px solid rgba(0,0,0,0.07)", borderRadius: 10, fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: SANS }}>Download PDF</button>
                <button onClick={() => { setLeaseModal(false); toast.success("Lease shared to your email"); }} style={{ padding: 12, background: G, color: "#fff", border: "none", borderRadius: 10, fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: SANS }}>Email Copy</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ── Passport Detail Modal ── */}
      <AnimatePresence>
        {passportModal && (
          <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.45)", backdropFilter: "blur(4px)", zIndex: 900, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }} onClick={() => setPassportModal(false)}>
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} onClick={e => e.stopPropagation()} style={{ background: "#fff", borderRadius: 22, padding: 28, width: "100%", maxWidth: 440, maxHeight: "90vh", overflowY: "auto" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 22 }}>
                <div>
                  <h3 style={{ fontFamily: SERIF, fontSize: 26, color: TX, margin: 0 }}>Tenant Passport</h3>
                  <p style={{ fontSize: 11, color: MU, marginTop: 3 }}>Your portable rental reputation score</p>
                </div>
                <button onClick={() => setPassportModal(false)} style={{ background: "none", border: "none", cursor: "pointer", color: MU, display: "flex" }}><X size={18} /></button>
              </div>
              <div style={{ textAlign: "center", marginBottom: 18 }}>
                <div style={{ width: 100, height: 100, borderRadius: "50%", background: "linear-gradient(135deg,#7C3AED,#9F5AFF)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", margin: "0 auto" }}>
                  <p style={{ fontFamily: SERIF, fontSize: 36, color: "#fff", lineHeight: 1, margin: 0 }}>87</p>
                  <p style={{ fontSize: 9, color: "rgba(255,255,255,0.7)", fontWeight: 700, margin: 0 }}>/ 100</p>
                </div>
                <p style={{ fontSize: 12, fontWeight: 600, color: "#7C3AED", marginTop: 10 }}>↑ +4 points this month</p>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 16 }}>
                {[
                  { label: "Payment history", score: 40, max: 40, desc: "14 consecutive on-time payments" },
                  { label: "Identity verification", score: 25, max: 25, desc: "Government ID verified" },
                  { label: "Tenancy duration", score: 14, max: 30, desc: "14 months in current unit" },
                  { label: "Maintenance cooperation", score: 8, max: 10, desc: "Quick access, good communication" },
                ].map(s => (
                  <div key={s.label}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                      <span style={{ fontSize: 12, fontWeight: 600, color: TX }}>{s.label}</span>
                      <span style={{ fontSize: 11, fontWeight: 700, color: "#7C3AED" }}>{s.score}/{s.max}</span>
                    </div>
                    <div style={{ height: 6, background: "#F3F0FF", borderRadius: 3, overflow: "hidden" }}>
                      <div style={{ width: `${Math.round(s.score / s.max * 100)}%`, height: "100%", background: "linear-gradient(90deg,#7C3AED,#9F5AFF)", borderRadius: 3 }} />
                    </div>
                    <p style={{ fontSize: 10, color: MU, marginTop: 2 }}>{s.desc}</p>
                  </div>
                ))}
              </div>
              <button onClick={() => setPassportModal(false)} style={{ width: "100%", padding: 13, background: "#7C3AED", color: "#fff", border: "none", borderRadius: 12, fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: SANS }}>Close</button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

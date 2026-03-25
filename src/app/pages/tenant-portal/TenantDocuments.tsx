import { FileText, Download, Eye, Calendar, Shield, Receipt, Clipboard, Pin, Folder, Sparkles } from "lucide-react";
import { motion } from "motion/react";

const G = "#0A7A52";
const GL = "#E5F4EE";
const TX = "#0E0F0C";
const MU = "#767570";
const SANS = "'DM Sans', system-ui, sans-serif";
const SERIF = "'Instrument Serif', Georgia, serif";

type LIcon = React.ComponentType<{ size?: number; color?: string; strokeWidth?: number; className?: string }>;

const getDocStyle = (type: string): { color: string; bg: string; icon: LIcon } => {
  switch (type) {
    case "lease": return { color: G, bg: GL, icon: FileText };
    case "receipt": return { color: "#0A7A52", bg: "#E5F4EE", icon: Receipt };
    case "inspection": return { color: "#1D4ED8", bg: "#EFF6FF", icon: Clipboard };
    case "info": return { color: "#B45309", bg: "#FEF3C7", icon: Pin };
    default: return { color: MU, bg: "#F8F7F4", icon: Folder };
  }
};

export function TenantDocuments() {
  const documents = [
    { id: 1, name: "Lease Agreement", type: "lease", date: "Jan 1, 2026", size: "245 KB", status: "signed", description: "Standard Ontario lease for Unit 4A" },
    { id: 2, name: "June 2026 Receipt", type: "receipt", date: "Jun 1, 2026", size: "92 KB", status: "available", description: "Payment receipt for June rent" },
    { id: 3, name: "May 2026 Receipt", type: "receipt", date: "May 1, 2026", size: "92 KB", status: "available", description: "Payment receipt for May rent" },
    { id: 4, name: "Move-In Inspection Report", type: "inspection", date: "Jan 1, 2026", size: "1.8 MB", status: "signed", description: "Property condition at move-in" },
    { id: 5, name: "Welcome Package", type: "info", date: "Jan 1, 2026", size: "420 KB", status: "available", description: "Building rules and landlord contact info" },
  ];

  const signedCount = documents.filter(d => d.status === "signed").length;

  return (
    <div style={{ fontFamily: SANS }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <p style={{ fontSize: 11, fontWeight: 700, color: MU, textTransform: "uppercase", letterSpacing: "0.7px", marginBottom: 4 }}>Documents</p>
          <h1 style={{ fontFamily: SERIF, fontSize: 36, fontWeight: 400, color: TX, letterSpacing: "-1px", lineHeight: 1 }}>Your Documents</h1>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { label: "Total Documents", value: String(documents.length), icon: FileText },
            { label: "Signed", value: String(signedCount), icon: Shield },
            { label: "Latest Update", value: "Jun 1", icon: Calendar },
          ].map(s => {
            const Icon = s.icon;
            return (
              <motion.div key={s.label} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                style={{ background: "#fff", borderRadius: 14, padding: "18px 20px", border: "1px solid rgba(0,0,0,0.07)" }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                  <div style={{ width: 30, height: 30, borderRadius: 8, background: GL, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Icon size={14} color={G} strokeWidth={2.5} />
                  </div>
                  <span style={{ fontSize: 11, color: MU, fontWeight: 500 }}>{s.label}</span>
                </div>
                <p style={{ fontFamily: SERIF, fontSize: 28, fontWeight: 400, color: TX, margin: 0 }}>{s.value}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Active Lease hero */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-2xl p-7 sm:p-8 mb-7"
          style={{ background: `linear-gradient(135deg, ${G} 0%, #065E3C 100%)`, boxShadow: `0 16px 48px ${G}35` }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20 }}>
            <div style={{ width: 46, height: 46, borderRadius: 12, background: "rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <FileText size={22} color="#fff" strokeWidth={2.5} />
            </div>
            <div>
              <h2 style={{ fontSize: 18, fontWeight: 600, color: "#fff", margin: 0 }}>Current Lease Agreement</h2>
              <p style={{ fontSize: 13, color: "rgba(255,255,255,0.65)", margin: "3px 0 0" }}>Unit 4A · 123 King Street, Toronto</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-6">
            {[
              ["Lease Period", "May 1, 2026 – May 1, 2027"],
              ["Monthly Rent", "$2,300"],
              ["Deposit Held", "$2,300"],
              ["Renewal Date", "Feb 1, 2027"],
            ].map(([label, val]) => (
              <div key={label}>
                <p style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 4 }}>{label}</p>
                <p style={{ fontSize: 14, fontWeight: 600, color: "#fff", margin: 0 }}>{val}</p>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <button style={{ display: "flex", alignItems: "center", gap: 7, padding: "10px 18px", background: "#fff", color: G, borderRadius: 10, border: "none", fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: SANS }}>
              <Eye size={14} strokeWidth={2.5} /> View Lease
            </button>
            <button style={{ display: "flex", alignItems: "center", gap: 7, padding: "10px 18px", background: "rgba(255,255,255,0.12)", color: "#fff", borderRadius: 10, border: "none", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: SANS }}>
              <Download size={14} strokeWidth={2.5} /> Download PDF
            </button>
          </div>
        </motion.div>

        {/* All Documents */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          style={{ background: "#fff", borderRadius: 16, padding: "22px 24px", marginBottom: 24, border: "1px solid rgba(0,0,0,0.07)" }}
        >
          <h2 style={{ fontFamily: SERIF, fontSize: 20, fontWeight: 400, color: TX, marginBottom: 16 }}>All Documents</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {documents.map((doc, idx) => {
              const ds = getDocStyle(doc.type);
              const DocIcon = ds.icon;
              return (
                <div
                  key={doc.id}
                  style={{
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                    padding: "14px 0",
                    borderBottom: idx < documents.length - 1 ? "1px solid rgba(0,0,0,0.05)" : "none",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                    <div style={{ width: 42, height: 42, borderRadius: 10, background: ds.bg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <DocIcon size={18} color={ds.color} strokeWidth={2.5} />
                    </div>
                    <div>
                      <p style={{ fontSize: 14, fontWeight: 600, color: TX, margin: 0 }}>{doc.name}</p>
                      <p style={{ fontSize: 12, color: MU, margin: "2px 0 0" }}>{doc.description}</p>
                      <div style={{ display: "flex", gap: 8, marginTop: 3 }}>
                        <span style={{ fontSize: 11, color: MU }}>{doc.date}</span>
                        <span style={{ fontSize: 11, color: "rgba(0,0,0,0.2)" }}>•</span>
                        <span style={{ fontSize: 11, color: MU }}>{doc.size}</span>
                      </div>
                    </div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    {doc.status === "signed" && (
                      <span style={{ fontSize: 9, fontWeight: 700, color: G, background: GL, padding: "3px 10px", borderRadius: 99 }}>SIGNED</span>
                    )}
                    <button style={{ width: 32, height: 32, borderRadius: 8, background: "#F8F7F4", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <Eye size={14} color={MU} strokeWidth={2.5} />
                    </button>
                    <button style={{ width: 32, height: 32, borderRadius: 8, background: "#F8F7F4", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <Download size={14} color={MU} strokeWidth={2.5} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* AI help */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          style={{ background: GL, borderRadius: 14, padding: "18px 22px", border: `1px solid ${G}20`, cursor: "pointer" }}
          onClick={() => window.dispatchEvent(new CustomEvent("openAIWithQuery", { detail: { query: "Explain my lease agreement" } }))}
        >
          <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
            <div style={{ width: 34, height: 34, borderRadius: 9, background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, boxShadow: "0 2px 6px rgba(0,0,0,0.06)" }}>
              <Sparkles size={16} color={G} strokeWidth={2.5} />
            </div>
            <div>
              <p style={{ fontSize: 13, fontWeight: 700, color: TX, margin: "0 0 4px" }}>Need help understanding your lease?</p>
              <p style={{ fontSize: 13, color: "#3D6B55", margin: 0, lineHeight: 1.5 }}>
                Kaya AI can explain any clause in plain language — tap to ask.
              </p>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
}

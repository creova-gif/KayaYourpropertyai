import { Download, Receipt, Calendar, Filter, FileText, Sparkles, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { motion } from "motion/react";
import { toast } from "sonner";

const G = "#0A7A52";
const GL = "#E5F4EE";
const TX = "#0E0F0C";
const MU = "#767570";
const SANS = "'DM Sans', system-ui, sans-serif";
const SERIF = "'Instrument Serif', Georgia, serif";

interface ReceiptItem { id: number; month: string; year: number; amount: number; date: string; method: string; receiptNo: string; }

export function TenantReceipts() {
  const [selectedYear, setSelectedYear] = useState(2026);

  const receipts: ReceiptItem[] = [
    { id: 1, month: "June", year: 2026, amount: 2300, date: "Jun 1, 2026", method: "Auto-pay (Visa ••4242)", receiptNo: "KY-2026-06-001" },
    { id: 2, month: "May", year: 2026, amount: 2300, date: "May 1, 2026", method: "Auto-pay (Visa ••4242)", receiptNo: "KY-2026-05-001" },
    { id: 3, month: "April", year: 2026, amount: 2300, date: "Apr 1, 2026", method: "Auto-pay (Visa ••4242)", receiptNo: "KY-2026-04-001" },
    { id: 4, month: "March", year: 2026, amount: 2300, date: "Mar 1, 2026", method: "Manual (e-Transfer)", receiptNo: "KY-2026-03-001" },
    { id: 5, month: "February", year: 2026, amount: 2300, date: "Feb 1, 2026", method: "Auto-pay (Visa ••4242)", receiptNo: "KY-2026-02-001" },
    { id: 6, month: "January", year: 2026, amount: 2300, date: "Jan 1, 2026", method: "Auto-pay (Visa ••4242)", receiptNo: "KY-2026-01-001" },
    { id: 7, month: "December", year: 2025, amount: 2300, date: "Dec 1, 2025", method: "Auto-pay (Visa ••4242)", receiptNo: "KY-2025-12-001" },
    { id: 8, month: "November", year: 2025, amount: 2300, date: "Nov 1, 2025", method: "Auto-pay (Visa ••4242)", receiptNo: "KY-2025-11-001" },
  ];

  const filtered = receipts.filter(r => r.year === selectedYear);
  const total = filtered.reduce((s, r) => s + r.amount, 0);

  return (
    <div style={{ fontFamily: SANS }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <p style={{ fontSize: 11, fontWeight: 700, color: MU, textTransform: "uppercase", letterSpacing: "0.7px", marginBottom: 4 }}>Receipts</p>
          <h1 style={{ fontFamily: SERIF, fontSize: 36, fontWeight: 400, color: TX, letterSpacing: "-1px", lineHeight: 1 }}>Rent Receipts</h1>
        </motion.div>

        {/* CRA tax badge */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="rounded-2xl p-6 mb-7" style={{ background: `linear-gradient(135deg, ${G} 0%, #065E3C 100%)`, boxShadow: `0 12px 40px ${G}30` }}>
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
            <div>
              <p style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.5)", textTransform: "uppercase", letterSpacing: "0.8px", marginBottom: 8 }}>Tax Year {selectedYear}</p>
              <p style={{ fontFamily: SERIF, fontSize: 44, fontWeight: 400, color: "#fff", lineHeight: 1, marginBottom: 4 }}>${total.toLocaleString()}</p>
              <p style={{ fontSize: 13, color: "rgba(255,255,255,0.65)" }}>Total rent paid · {filtered.length} receipts · CRA-compliant</p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: "flex-end" }}>
              <button onClick={() => toast.success(`Downloading all ${selectedYear} receipts as ZIP…`)} style={{ display: "flex", alignItems: "center", gap: 7, padding: "10px 18px", background: "#fff", color: G, borderRadius: 10, border: "none", fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: SANS }}>
                <Download size={14} strokeWidth={2.5} /> Download All ({selectedYear})
              </button>
              <p style={{ fontSize: 11, color: "rgba(255,255,255,0.45)" }}>One-click ZIP for CRA filing</p>
            </div>
          </div>
        </motion.div>

        {/* Year filter */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20 }}>
          <Filter size={14} color={MU} strokeWidth={2.5} />
          <p style={{ fontSize: 13, fontWeight: 600, color: MU, margin: 0, marginRight: 4 }}>Tax Year:</p>
          {[2026, 2025, 2024].map(y => (
            <button key={y} onClick={() => setSelectedYear(y)} style={{ padding: "6px 16px", borderRadius: 9, border: `1.5px solid ${selectedYear === y ? G : "rgba(0,0,0,0.08)"}`, background: selectedYear === y ? GL : "#fff", color: selectedYear === y ? G : MU, fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: SANS }}>
              {y}
            </button>
          ))}
        </div>

        {/* Receipts list */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} style={{ background: "#fff", borderRadius: 16, border: "1px solid rgba(0,0,0,0.07)", overflow: "hidden" }}>
          {filtered.length === 0 ? (
            <div style={{ padding: "48px 24px", textAlign: "center" }}>
              <FileText size={36} color="rgba(0,0,0,0.1)" style={{ margin: "0 auto 12px" }} />
              <p style={{ fontSize: 14, color: MU }}>No receipts for {selectedYear}</p>
            </div>
          ) : filtered.map((r, idx) => (
            <div key={r.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 22px", borderBottom: idx < filtered.length - 1 ? "1px solid rgba(0,0,0,0.05)" : "none" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <div style={{ width: 40, height: 40, borderRadius: "50%", background: GL, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Receipt size={17} color={G} strokeWidth={2.5} />
                </div>
                <div>
                  <p style={{ fontSize: 14, fontWeight: 700, color: TX, margin: "0 0 2px" }}>{r.month} {r.year} Rent Receipt</p>
                  <div style={{ display: "flex", gap: 8 }}>
                    <span style={{ fontSize: 11, color: MU }}>{r.receiptNo}</span>
                    <span style={{ fontSize: 10, color: "rgba(0,0,0,0.2)" }}>•</span>
                    <span style={{ fontSize: 11, color: MU }}>{r.method}</span>
                  </div>
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ textAlign: "right" }}>
                  <p style={{ fontFamily: SERIF, fontSize: 16, fontWeight: 400, color: TX, margin: "0 0 2px" }}>${r.amount.toLocaleString()}</p>
                  <p style={{ fontSize: 11, color: MU, margin: 0 }}>{r.date}</p>
                </div>
                <div style={{ display: "flex", gap: 6 }}>
                  <span style={{ fontSize: 9, fontWeight: 700, color: G, background: GL, padding: "3px 9px", borderRadius: 99 }}>PAID</span>
                  <button onClick={() => toast.info(`${r.month} ${r.year} receipt downloading…`)} style={{ width: 32, height: 32, borderRadius: 8, background: "#F8F7F4", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Download size={14} color={MU} strokeWidth={2.5} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* AI tip */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} style={{ background: GL, borderRadius: 14, padding: "18px 22px", border: `1px solid ${G}20`, cursor: "pointer", marginTop: 20 }} onClick={() => window.dispatchEvent(new CustomEvent("openAIWithQuery", { detail: { query: "Can I claim rent as a tax deduction in Ontario?" } }))}>
          <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
            <div style={{ width: 34, height: 34, borderRadius: 9, background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, boxShadow: "0 2px 6px rgba(0,0,0,0.06)" }}>
              <Sparkles size={16} color={G} strokeWidth={2.5} />
            </div>
            <div>
              <p style={{ fontSize: 13, fontWeight: 700, color: TX, margin: "0 0 4px" }}>Ontario Rent Credit — Tax Tip</p>
              <p style={{ fontSize: 13, color: "#3D6B55", margin: 0, lineHeight: 1.5 }}>Ontario residents may be eligible for the ON-BEN rent component. Ask Kaya AI to walk you through CRA form eligibility.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

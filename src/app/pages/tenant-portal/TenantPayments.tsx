import { DollarSign, Download, Calendar, CheckCircle2, CreditCard, Sparkles } from "lucide-react";
import { useState } from "react";
import { motion } from "motion/react";

const G = "#0A7A52";
const GL = "#E5F4EE";
const TX = "#0E0F0C";
const MU = "#767570";
const SANS = "'DM Sans', system-ui, sans-serif";
const SERIF = "'Instrument Serif', Georgia, serif";

export function TenantPayments() {
  const [showPayModal, setShowPayModal] = useState(false);

  const upcomingPayment = {
    amount: 2300,
    dueDate: "Jul 1, 2026",
    daysUntil: 7,
    autoPayEnabled: true
  };

  const paymentHistory = [
    { id: 1, date: "Jun 1, 2026", amount: 2300, status: "paid", method: "Auto-pay", receipt: true },
    { id: 2, date: "May 1, 2026", amount: 2300, status: "paid", method: "Auto-pay", receipt: true },
    { id: 3, date: "Apr 1, 2026", amount: 2300, status: "paid", method: "Auto-pay", receipt: true },
    { id: 4, date: "Mar 1, 2026", amount: 2300, status: "paid", method: "Manual", receipt: true },
    { id: 5, date: "Feb 1, 2026", amount: 2300, status: "paid", method: "Auto-pay", receipt: true },
    { id: 6, date: "Jan 1, 2026", amount: 2300, status: "paid", method: "Auto-pay", receipt: true },
  ];

  const totalPaid = paymentHistory.reduce((sum, p) => sum + p.amount, 0);

  return (
    <div style={{ fontFamily: SANS }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <p style={{ fontSize: 11, fontWeight: 700, color: MU, textTransform: "uppercase", letterSpacing: "0.7px", marginBottom: 4 }}>Payments</p>
          <h1 style={{ fontFamily: SERIF, fontSize: 36, fontWeight: 400, color: TX, letterSpacing: "-1px", lineHeight: 1 }}>Rent & Payments</h1>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {[
            { label: "Next Payment", value: `$${upcomingPayment.amount.toLocaleString()}`, sub: `Due in ${upcomingPayment.daysUntil} days`, icon: DollarSign, iconBg: GL, iconColor: G },
            { label: "Total Paid (2026)", value: `$${totalPaid.toLocaleString()}`, sub: "All payments current", icon: CheckCircle2, iconBg: GL, iconColor: G },
            { label: "Auto-Pay", value: upcomingPayment.autoPayEnabled ? "Enabled" : "Off", sub: "Active & scheduled", icon: CreditCard, iconBg: GL, iconColor: G },
          ].map(s => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ background: "#fff", borderRadius: 14, padding: "20px 22px", border: "1px solid rgba(0,0,0,0.07)", boxShadow: "0 2px 8px rgba(0,0,0,0.03)" }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                  <div style={{ width: 34, height: 34, borderRadius: 9, background: s.iconBg, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Icon size={16} color={s.iconColor} strokeWidth={2.5} />
                  </div>
                  <span style={{ fontSize: 12, color: MU, fontWeight: 500 }}>{s.label}</span>
                </div>
                <p style={{ fontFamily: SERIF, fontSize: 28, fontWeight: 400, color: TX, margin: "0 0 4px" }}>{s.value}</p>
                <p style={{ fontSize: 11, color: G, fontWeight: 600 }}>{s.sub}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Upcoming payment hero */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-2xl p-7 sm:p-8 mb-7 text-white"
          style={{ background: `linear-gradient(135deg, ${G} 0%, #065E3C 100%)`, boxShadow: `0 16px 48px ${G}35` }}
        >
          <div className="flex items-start justify-between mb-6">
            <div>
              <p style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.5)", textTransform: "uppercase", letterSpacing: "0.8px", marginBottom: 8 }}>Upcoming Payment</p>
              <p style={{ fontFamily: SERIF, fontSize: 48, fontWeight: 400, lineHeight: 1, color: "#fff", marginBottom: 4 }}>${upcomingPayment.amount.toLocaleString()}</p>
              <p style={{ fontSize: 14, color: "rgba(255,255,255,0.7)" }}>Due {upcomingPayment.dueDate} · {upcomingPayment.daysUntil} days remaining</p>
            </div>
            <Calendar size={48} color="rgba(255,255,255,0.15)" strokeWidth={1.5} />
          </div>

          {upcomingPayment.autoPayEnabled ? (
            <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 16px", background: "rgba(255,255,255,0.12)", borderRadius: 12, backdropFilter: "blur(8px)" }}>
              <CheckCircle2 size={16} color="#fff" strokeWidth={2.5} />
              <p style={{ fontSize: 13, color: "rgba(255,255,255,0.9)", margin: 0 }}>Auto-pay is enabled. Payment will be processed automatically on the due date.</p>
            </div>
          ) : (
            <button
              onClick={() => setShowPayModal(true)}
              style={{ padding: "12px 28px", background: "#fff", color: G, borderRadius: 12, border: "none", fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: SANS }}
            >
              Pay Now
            </button>
          )}
        </motion.div>

        {/* Payment method */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          style={{ background: "#fff", borderRadius: 16, padding: "22px 24px", marginBottom: 24, border: "1px solid rgba(0,0,0,0.07)" }}
        >
          <h2 style={{ fontFamily: SERIF, fontSize: 20, fontWeight: 400, color: TX, marginBottom: 16 }}>Payment Method</h2>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 16px", borderRadius: 12, border: `2px solid ${G}25`, background: GL }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <div style={{ width: 42, height: 42, borderRadius: 10, background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}>
                <CreditCard size={20} color={G} strokeWidth={2.5} />
              </div>
              <div>
                <p style={{ fontSize: 14, fontWeight: 700, color: TX, margin: 0 }}>•••• •••• •••• 4242</p>
                <p style={{ fontSize: 12, color: MU, margin: "2px 0 0" }}>Expires 12/27</p>
              </div>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <span style={{ fontSize: 10, fontWeight: 700, color: G, background: GL, border: `1px solid ${G}30`, padding: "3px 10px", borderRadius: 99 }}>PRIMARY</span>
              <span style={{ fontSize: 10, fontWeight: 700, color: G, background: GL, border: `1px solid ${G}30`, padding: "3px 10px", borderRadius: 99 }}>AUTO-PAY</span>
            </div>
          </div>
          <button style={{ marginTop: 12, fontSize: 13, color: G, fontWeight: 600, background: "none", border: "none", cursor: "pointer", padding: 0, fontFamily: SANS }}>
            + Add Payment Method
          </button>
        </motion.div>

        {/* Payment history */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          style={{ background: "#fff", borderRadius: 16, padding: "22px 24px", marginBottom: 24, border: "1px solid rgba(0,0,0,0.07)" }}
        >
          <h2 style={{ fontFamily: SERIF, fontSize: 20, fontWeight: 400, color: TX, marginBottom: 16 }}>Payment History</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {paymentHistory.map((payment, idx) => (
              <div
                key={payment.id}
                style={{
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  padding: "14px 0",
                  borderBottom: idx < paymentHistory.length - 1 ? "1px solid rgba(0,0,0,0.05)" : "none",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <div style={{ width: 40, height: 40, borderRadius: "50%", background: GL, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <CheckCircle2 size={18} color={G} strokeWidth={2.5} />
                  </div>
                  <div>
                    <p style={{ fontSize: 14, fontWeight: 600, color: TX, margin: 0 }}>${payment.amount.toLocaleString()}</p>
                    <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 2 }}>
                      <span style={{ fontSize: 12, color: MU }}>{payment.date}</span>
                      <span style={{ fontSize: 10, color: "rgba(0,0,0,0.2)" }}>•</span>
                      <span style={{ fontSize: 12, color: MU }}>{payment.method}</span>
                    </div>
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ fontSize: 10, fontWeight: 700, color: G, background: GL, padding: "3px 10px", borderRadius: 99 }}>PAID</span>
                  <button style={{ width: 32, height: 32, borderRadius: 8, background: "#F8F7F4", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Download size={14} color={MU} strokeWidth={2.5} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* AI insight */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          style={{ background: GL, borderRadius: 14, padding: "18px 22px", border: `1px solid ${G}20` }}
          onClick={() => window.dispatchEvent(new CustomEvent("openAIWithQuery", { detail: { query: "How is my payment record?" } }))}
        >
          <div style={{ display: "flex", alignItems: "flex-start", gap: 12, cursor: "pointer" }}>
            <div style={{ width: 34, height: 34, borderRadius: 9, background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, boxShadow: "0 2px 6px rgba(0,0,0,0.06)" }}>
              <Sparkles size={16} color={G} strokeWidth={2.5} />
            </div>
            <div>
              <p style={{ fontSize: 13, fontWeight: 700, color: TX, margin: "0 0 4px" }}>Excellent Payment Record!</p>
              <p style={{ fontSize: 13, color: "#3D6B55", margin: 0, lineHeight: 1.5 }}>
                You've made all {paymentHistory.length} payments on time. This builds a strong rental history. Ask Kaya AI for tips on rent credit reporting.
              </p>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
}

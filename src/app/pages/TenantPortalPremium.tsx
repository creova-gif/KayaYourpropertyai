import { motion } from "motion/react";
import { DollarSign, FileText, Calendar, Download, Receipt, CheckSquare, Bell, RefreshCw, Scale, User, Sparkles, TrendingUp, Shield, Clock, Wrench } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { PaymentForm, PaymentData } from "../components/PaymentForm";

const G = "#0A7A52";
const GL = "#E5F4EE";
const TX = "#0E0F0C";
const MU = "#767570";
const SANS = "'DM Sans', system-ui, sans-serif";
const SERIF = "'Instrument Serif', Georgia, serif";

export function TenantPortalPremium() {
  const navigate = useNavigate();
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showScheduleModal, setShowScheduleModal] = useState(false);

  const documents = [
    { name: "Lease Agreement", date: "Jan 1, 2026", type: "PDF" },
    { name: "March Receipt", date: "Mar 1, 2026", type: "PDF" },
    { name: "February Receipt", date: "Feb 1, 2026", type: "PDF" },
  ];

  const paymentHistory = [
    { month: "March 2026", amount: "$2,300", status: "Paid", date: "Mar 1" },
    { month: "February 2026", amount: "$2,300", status: "Paid", date: "Feb 1" },
    { month: "January 2026", amount: "$2,300", status: "Paid", date: "Jan 1" },
  ];

  const handlePaymentSubmit = (paymentData: PaymentData) => {
    console.log("Payment submitted:", paymentData);
    setTimeout(() => { setShowPaymentModal(false); }, 500);
  };

  return (
    <div style={{ fontFamily: SANS }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">

        {/* Tenant greeting */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <p style={{ fontSize: 11, fontWeight: 700, color: MU, textTransform: "uppercase", letterSpacing: "0.7px", marginBottom: 4 }}>Welcome back</p>
          <h1 style={{ fontFamily: SERIF, fontSize: 38, fontWeight: 400, color: TX, letterSpacing: "-1px", lineHeight: 1, marginBottom: 6 }}>Sarah Kim</h1>
          <p style={{ fontSize: 14, color: MU }}>Unit 4A · 123 King St, Toronto · Lease active until May 2027</p>
        </motion.div>

        {/* Hero rent card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8 rounded-2xl p-7 sm:p-9"
          style={{ background: `linear-gradient(135deg, ${G} 0%, #065E3C 100%)`, boxShadow: `0 20px 60px ${G}40` }}
        >
          <div className="flex items-start justify-between">
            <div>
              <p style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.5)", textTransform: "uppercase", letterSpacing: "0.8px", marginBottom: 8 }}>Next Payment Due</p>
              <h2 style={{ fontFamily: SERIF, fontSize: 52, fontWeight: 400, color: "#fff", lineHeight: 1, marginBottom: 4 }}>$2,300</h2>
              <p style={{ fontSize: 14, color: "rgba(255,255,255,0.7)" }}>Due July 1, 2026 · 7 days remaining</p>
            </div>
            <DollarSign className="size-12 text-white/20 hidden sm:block" strokeWidth={2} />
          </div>

          <div className="mt-7 flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => setShowPaymentModal(true)}
              className="flex-1 px-6 py-3.5 bg-white text-[#0A7A52] text-[14px] font-semibold rounded-xl hover:bg-white/95 transition-all shadow-md"
            >
              Pay Now
            </button>
            <button
              onClick={() => setShowScheduleModal(true)}
              className="flex-1 sm:flex-initial px-6 py-3.5 border-2 border-white/30 text-white text-[14px] font-semibold rounded-xl hover:bg-white/10 transition-all"
            >
              Schedule Payment
            </button>
          </div>
        </motion.div>

        {/* Quick stats */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="grid grid-cols-3 gap-4 mb-8"
        >
          {[
            { label: "On-time payments", value: "100%", color: G },
            { label: "Lease remaining", value: "14 mo", color: TX },
            { label: "Open requests", value: "1", color: "#B45309" },
          ].map(s => (
            <div key={s.label} style={{ background: "#fff", borderRadius: 14, padding: "16px 18px", border: "1px solid rgba(0,0,0,0.07)", textAlign: "center" }}>
              <p style={{ fontFamily: SERIF, fontSize: 26, fontWeight: 400, color: s.color, margin: "0 0 4px" }}>{s.value}</p>
              <p style={{ fontSize: 11, color: MU, fontWeight: 600 }}>{s.label}</p>
            </div>
          ))}
        </motion.div>

        {/* ── Enhanced Metrics ── */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} style={{ marginBottom: 28 }}>
          <h2 style={{ fontFamily: SERIF, fontSize: 22, fontWeight: 400, color: TX, marginBottom: 16, letterSpacing: "-0.5px" }}>Your Tenant Metrics</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">

            {/* Payment streak */}
            <div style={{ background: "#fff", borderRadius: 16, padding: "18px 20px", border: "1px solid rgba(0,0,0,0.07)", gridColumn: "span 2" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                <div style={{ width: 30, height: 30, borderRadius: 8, background: GL, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <TrendingUp size={14} color={G} strokeWidth={2.5} />
                </div>
                <span style={{ fontSize: 12, fontWeight: 700, color: MU }}>Payment Streak</span>
              </div>
              <p style={{ fontFamily: SERIF, fontSize: 36, fontWeight: 400, color: G, lineHeight: 1, marginBottom: 6 }}>6 months</p>
              <p style={{ fontSize: 12, color: MU, marginBottom: 14 }}>100% on-time payments since lease start</p>
              <div style={{ display: "flex", gap: 5 }}>
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} style={{ flex: 1 }}>
                    <div style={{ height: 28, background: G, borderRadius: 5, opacity: 0.15 + (i + 1) * 0.14 }} />
                    <p style={{ fontSize: 9, color: MU, textAlign: "center", marginTop: 4 }}>{["J","F","M","A","M","J"][i]}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Lease health */}
            <div style={{ background: "#fff", borderRadius: 16, padding: "18px 20px", border: "1px solid rgba(0,0,0,0.07)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                <div style={{ width: 30, height: 30, borderRadius: 8, background: "#EFF6FF", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Shield size={14} color="#1D4ED8" strokeWidth={2.5} />
                </div>
                <span style={{ fontSize: 12, fontWeight: 700, color: MU }}>Lease Health</span>
              </div>
              <p style={{ fontFamily: SERIF, fontSize: 36, fontWeight: 400, color: "#1D4ED8", lineHeight: 1, marginBottom: 6 }}>98/100</p>
              <p style={{ fontSize: 12, color: MU }}>Excellent standing</p>
              <div style={{ marginTop: 12, height: 6, background: "#EFF6FF", borderRadius: 3, overflow: "hidden" }}>
                <div style={{ width: "98%", height: "100%", background: "#1D4ED8", borderRadius: 3 }} />
              </div>
            </div>

            {/* Days to renewal */}
            <div style={{ background: "#fff", borderRadius: 16, padding: "18px 20px", border: "1px solid rgba(0,0,0,0.07)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                <div style={{ width: 30, height: 30, borderRadius: 8, background: "#FEF3C7", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Clock size={14} color="#B45309" strokeWidth={2.5} />
                </div>
                <span style={{ fontSize: 12, fontWeight: 700, color: MU }}>Renewal Window</span>
              </div>
              <p style={{ fontFamily: SERIF, fontSize: 36, fontWeight: 400, color: "#B45309", lineHeight: 1, marginBottom: 6 }}>63 days</p>
              <p style={{ fontSize: 12, color: MU }}>Deadline: Feb 1, 2027</p>
              <button onClick={() => navigate("/tenant/renewal")} style={{ marginTop: 12, display: "inline-flex", alignItems: "center", gap: 5, fontSize: 11, fontWeight: 700, color: "#B45309", background: "#FEF3C7", border: "none", borderRadius: 8, padding: "4px 10px", cursor: "pointer", fontFamily: SANS }}>
                View renewal →
              </button>
            </div>

          </div>
        </motion.div>

        {/* ── Quick Actions ── */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} style={{ marginBottom: 32 }}>
          <h2 style={{ fontFamily: SERIF, fontSize: 22, fontWeight: 400, color: TX, marginBottom: 16, letterSpacing: "-0.5px" }}>Quick Access</h2>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
            {[
              { label: "Receipts", icon: Receipt, href: "/tenant/receipts", color: G, bg: GL },
              { label: "Checklist", icon: CheckSquare, href: "/tenant/checklist", color: "#1D4ED8", bg: "#EFF6FF" },
              { label: "Notices", icon: Bell, href: "/tenant/notices", color: "#DC2626", bg: "#FEF2F2", badge: 2 },
              { label: "Renewal", icon: RefreshCw, href: "/tenant/renewal", color: "#B45309", bg: "#FEF3C7" },
              { label: "Dispute", icon: Scale, href: "/tenant/dispute", color: "#7C3AED", bg: "#F5F3FF" },
              { label: "Profile", icon: User, href: "/tenant/profile", color: TX, bg: "#F8F7F4" },
            ].map(item => {
              const Icon = item.icon;
              return (
                <button key={item.label} onClick={() => navigate(item.href)} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, padding: "16px 8px", background: "#fff", borderRadius: 14, border: "1px solid rgba(0,0,0,0.07)", cursor: "pointer", fontFamily: SANS, position: "relative" }}>
                  <div style={{ width: 38, height: 38, borderRadius: 10, background: item.bg, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Icon size={17} color={item.color} strokeWidth={2.5} />
                  </div>
                  {"badge" in item && item.badge && (
                    <div style={{ position: "absolute", top: 10, right: 18, width: 16, height: 16, borderRadius: "50%", background: "#DC2626", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <span style={{ fontSize: 9, fontWeight: 800, color: "#fff" }}>{item.badge}</span>
                    </div>
                  )}
                  <span style={{ fontSize: 11, fontWeight: 700, color: TX }}>{item.label}</span>
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* ── Maintenance snapshot ── */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.28 }} style={{ background: "#fff", borderRadius: 16, border: "1px solid rgba(0,0,0,0.07)", padding: "20px 22px", marginBottom: 28 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 34, height: 34, borderRadius: 9, background: "#FEF3C7", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Wrench size={16} color="#B45309" strokeWidth={2.5} />
              </div>
              <div>
                <h3 style={{ fontFamily: SERIF, fontSize: 17, fontWeight: 400, color: TX, margin: 0 }}>Maintenance</h3>
                <p style={{ fontSize: 11, color: MU, margin: 0 }}>1 open request · Avg. 1.2 day response</p>
              </div>
            </div>
            <button onClick={() => navigate("/tenant/maintenance")} style={{ fontSize: 12, fontWeight: 700, color: G, background: GL, border: "none", borderRadius: 9, padding: "6px 14px", cursor: "pointer", fontFamily: SANS }}>View all</button>
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 14px", background: "#FFFBEB", borderRadius: 12, border: "1px solid rgba(180,83,9,0.1)" }}>
            <div>
              <p style={{ fontSize: 13, fontWeight: 700, color: TX, margin: "0 0 2px" }}>Bathroom faucet dripping</p>
              <p style={{ fontSize: 11, color: MU, margin: 0 }}>Submitted Mar 20 · In Progress</p>
            </div>
            <span style={{ fontSize: 9, fontWeight: 800, color: "#B45309", background: "#FEF3C7", border: "1px solid rgba(180,83,9,0.15)", borderRadius: 99, padding: "3px 10px" }}>IN PROGRESS</span>
          </div>
        </motion.div>

        {/* ── AI Kaya nudge ── */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} style={{ background: GL, borderRadius: 16, padding: "20px 22px", border: `1px solid ${G}20`, cursor: "pointer", marginBottom: 28 }} onClick={() => window.dispatchEvent(new CustomEvent("openAIWithQuery", { detail: { query: "What should I know about my lease renewal coming up?" } }))}>
          <div style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
            <div style={{ width: 38, height: 38, borderRadius: 11, background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
              <Sparkles size={18} color={G} strokeWidth={2.5} />
            </div>
            <div>
              <p style={{ fontSize: 14, fontWeight: 700, color: TX, margin: "0 0 4px" }}>Your lease renews in 63 days</p>
              <p style={{ fontSize: 13, color: "#3D6B55", margin: "0 0 10px", lineHeight: 1.5 }}>Ontario allows a max 2.5% rent increase this year. Your landlord has proposed 2.95% — ask Kaya AI to explain your options before the deadline.</p>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "5px 12px", background: "#fff", borderRadius: 99, border: `1px solid ${G}20` }}>
                <Sparkles size={11} color={G} strokeWidth={2.5} />
                <span style={{ fontSize: 11, fontWeight: 700, color: G }}>Ask Kaya AI →</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Lease Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="bg-white border border-[rgba(0,0,0,0.07)] rounded-xl p-6 sm:p-8 mb-8 shadow-sm"
        >
          <h3 style={{ fontFamily: SERIF, fontSize: 20, fontWeight: 400, color: TX, marginBottom: 4 }}>Lease Agreement</h3>
          <p style={{ fontSize: 13, color: MU, marginBottom: 20 }}>Active until May 2027</p>

          <div className="grid grid-cols-2 gap-4 sm:gap-6 pt-5 border-t border-[rgba(0,0,0,0.05)]">
            {[
              ["Unit", "4A"], ["Address", "123 King St"],
              ["Start Date", "May 1, 2026"], ["End Date", "May 1, 2027"],
              ["Monthly Rent", "$2,300"], ["Deposit", "$2,300"],
            ].map(([label, val]) => (
              <div key={label}>
                <p style={{ fontSize: 10, color: MU, textTransform: "uppercase", letterSpacing: "0.7px", fontWeight: 700, marginBottom: 4 }}>{label}</p>
                <p style={{ fontSize: 15, fontWeight: 600, color: TX }}>{val}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Documents */}
        <div className="mb-8">
          <h2 style={{ fontFamily: SERIF, fontSize: 26, fontWeight: 400, color: TX, marginBottom: 16, letterSpacing: "-0.5px" }}>Recent Documents</h2>
          <div className="space-y-3">
            {documents.map((doc, idx) => (
              <motion.div
                key={doc.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + idx * 0.05 }}
                className="bg-white border border-[rgba(0,0,0,0.07)] rounded-xl p-4 sm:p-5 hover:shadow-lg transition-all duration-200 group cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className="size-10 sm:size-12 rounded-xl bg-[#F8F7F4] flex items-center justify-center group-hover:bg-[#0A7A52] transition-colors">
                      <FileText className="size-5 sm:size-6 text-[#767570] group-hover:text-white transition-colors" strokeWidth={2.5} />
                    </div>
                    <div>
                      <h3 className="text-[14px] sm:text-[15px] font-semibold text-[#0E0F0C]">{doc.name}</h3>
                      <p className="text-[11px] sm:text-[12px] text-[#767570] mt-1">{doc.date} · {doc.type}</p>
                    </div>
                  </div>
                  <Download className="size-4 sm:size-5 text-[#767570] group-hover:text-[#0A7A52] transition-colors" strokeWidth={2.5} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Payment History */}
        <div className="mb-12">
          <h2 style={{ fontFamily: SERIF, fontSize: 26, fontWeight: 400, color: TX, marginBottom: 16, letterSpacing: "-0.5px" }}>Payment History</h2>
          <div className="bg-white border border-[rgba(0,0,0,0.07)] rounded-xl overflow-hidden shadow-sm">
            {paymentHistory.map((payment, idx) => (
              <motion.div
                key={payment.month}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + idx * 0.05 }}
                className={`flex items-center justify-between p-5 sm:p-6 ${
                  idx !== paymentHistory.length - 1 ? "border-b border-[rgba(0,0,0,0.05)]" : ""
                } hover:bg-[#F8F7F4] transition-colors`}
              >
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="size-10 sm:size-12 rounded-full bg-[#E5F4EE] flex items-center justify-center">
                    <Calendar className="size-5 sm:size-6 text-[#0A7A52]" strokeWidth={2.5} />
                  </div>
                  <div>
                    <h3 className="text-[14px] sm:text-[15px] font-semibold text-[#0E0F0C]">{payment.month}</h3>
                    <p className="text-[11px] sm:text-[12px] text-[#767570] mt-1">Paid on {payment.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-[16px] sm:text-[18px] font-normal text-[#0E0F0C]" style={{ fontFamily: SERIF }}>{payment.amount}</p>
                  <div className="inline-flex items-center gap-2 mt-1.5 px-2.5 sm:px-3 py-1 bg-[#E5F4EE] rounded-full">
                    <div className="size-1.5 sm:size-2 rounded-full bg-[#0A7A52]" />
                    <span className="text-[10px] sm:text-[11px] font-semibold text-[#0A7A52] uppercase tracking-wide">{payment.status}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} onClick={(e) => e.stopPropagation()}>
            <PaymentForm
              tenantName="Sarah Kim" unitNumber="4A" amount={2300} dueDate="July 1, 2026"
              onSubmit={handlePaymentSubmit} onCancel={() => setShowPaymentModal(false)} mode="tenant"
            />
          </motion.div>
        </div>
      )}

      {/* Schedule Payment Modal */}
      {showScheduleModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowScheduleModal(false)}>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl p-6 sm:p-8 max-w-lg w-full"
          >
            <h3 style={{ fontFamily: SERIF, fontSize: 24, fontWeight: 400, color: TX, marginBottom: 12 }}>Schedule Automatic Payment</h3>
            <p style={{ fontSize: 14, color: MU, marginBottom: 24 }}>Set up automatic monthly rent payments to never miss a due date.</p>
            <div style={{ marginBottom: 24 }}>
              <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: TX, marginBottom: 8 }}>Payment Date</label>
              <select style={{ width: "100%", padding: "12px 16px", border: "1px solid rgba(0,0,0,0.08)", borderRadius: 12, fontSize: 14, fontFamily: SANS, outline: "none" }}>
                <option>1st of every month</option>
                <option>15th of every month</option>
                <option>Last day of month</option>
              </select>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <button onClick={() => setShowScheduleModal(false)} style={{ flex: 1, padding: "12px 24px", border: "1px solid rgba(0,0,0,0.08)", color: MU, fontSize: 14, fontWeight: 600, borderRadius: 12, cursor: "pointer", background: "#fff", fontFamily: SANS }}>Cancel</button>
              <button style={{ flex: 1, padding: "12px 24px", background: G, color: "#fff", fontSize: 14, fontWeight: 600, borderRadius: 12, cursor: "pointer", border: "none", fontFamily: SANS }}>Enable Auto-Pay</button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}

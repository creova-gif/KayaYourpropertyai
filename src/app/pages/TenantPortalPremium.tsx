import { motion } from "motion/react";
import { DollarSign, FileText, Calendar, Download } from "lucide-react";
import { useState } from "react";
import { PaymentForm, PaymentData } from "../components/PaymentForm";

const G = "#0A7A52";
const GL = "#E5F4EE";
const TX = "#0E0F0C";
const MU = "#767570";
const SANS = "'DM Sans', system-ui, sans-serif";
const SERIF = "'Instrument Serif', Georgia, serif";

export function TenantPortalPremium() {
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

        {/* Lease Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
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

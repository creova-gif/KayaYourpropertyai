import { motion } from "motion/react";
import { DollarSign, FileText, Home, Calendar, Download } from "lucide-react";
import { useState } from "react";
import { PaymentForm, PaymentData } from "../components/PaymentForm";

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
    // Handle payment submission
    setTimeout(() => {
      setShowPaymentModal(false);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12" style={{ background: '#F8F7F4', minHeight: '100vh', fontFamily: "'DM Sans', system-ui, sans-serif" }}>
        {/* Premium Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 sm:mb-12 lg:mb-16"
        >
          <p className="text-[10px] font-semibold text-[#767570] uppercase tracking-wider mb-2">Tenant Portal</p>
          <h1 className="text-[32px] sm:text-[42px] lg:text-[52px] font-normal text-[#0E0F0C] leading-tight tracking-tight mb-3" style={{ fontFamily: "'Instrument Serif', Georgia, serif", letterSpacing: '-1.5px' }}>
            Welcome, <em className="italic text-[#0A7A52]">Sarah</em>
          </h1>
          <p className="text-[13px] sm:text-[14px] text-[#767570]">
            Unit 4A · 123 King Street, Toronto
          </p>
        </motion.div>

        {/* Next Rent - Hero Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-[#0A7A52] to-[#085D3D] text-white rounded-2xl p-6 sm:p-8 mb-8 sm:mb-12 shadow-lg"
        >
          <div className="flex items-start justify-between mb-6 sm:mb-0">
            <div>
              <p className="text-[10px] sm:text-[11px] text-white/70 uppercase tracking-wider font-semibold mb-2 sm:mb-3">
                Next Rent Payment
              </p>
              <h2 className="text-[38px] sm:text-[46px] lg:text-[52px] font-normal leading-none mb-2" style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}>
                $2,300
              </h2>
              <p className="text-[13px] sm:text-[14px] text-white/90">
                Due July 1, 2026
              </p>
            </div>
            <DollarSign className="size-10 sm:size-12 text-white/20 hidden sm:block" strokeWidth={2} />
          </div>

          <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3">
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

        {/* Lease Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white border border-[rgba(0,0,0,0.07)] rounded-xl p-6 sm:p-8 mb-8 shadow-sm"
        >
          <div className="flex items-start justify-between mb-6">
            <div>
              <h3 className="text-[18px] sm:text-[20px] font-normal text-[#0E0F0C] mb-2" style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}>
                Lease Agreement
              </h3>
              <p className="text-[13px] sm:text-[14px] text-[#767570]">
                Active until May 2027
              </p>
            </div>
            <Home className="size-5 sm:size-6 text-[#767570]" strokeWidth={2.5} />
          </div>

          <div className="grid grid-cols-2 gap-4 sm:gap-6 pt-6 border-t border-[rgba(0,0,0,0.05)]">
            <div>
              <p className="text-[10px] sm:text-[11px] text-[#767570] uppercase tracking-wider font-semibold mb-2">Unit</p>
              <p className="text-[15px] sm:text-[16px] font-semibold text-[#0E0F0C]">4A</p>
            </div>
            <div>
              <p className="text-[10px] sm:text-[11px] text-[#767570] uppercase tracking-wider font-semibold mb-2">Address</p>
              <p className="text-[15px] sm:text-[16px] font-semibold text-[#0E0F0C]">123 King St</p>
            </div>
            <div>
              <p className="text-[10px] sm:text-[11px] text-[#767570] uppercase tracking-wider font-semibold mb-2">Start Date</p>
              <p className="text-[15px] sm:text-[16px] font-semibold text-[#0E0F0C]">May 1, 2026</p>
            </div>
            <div>
              <p className="text-[10px] sm:text-[11px] text-[#767570] uppercase tracking-wider font-semibold mb-2">End Date</p>
              <p className="text-[15px] sm:text-[16px] font-semibold text-[#0E0F0C]">May 1, 2027</p>
            </div>
          </div>
        </motion.div>

        {/* Documents */}
        <div className="mb-12">
          <h2 className="text-[24px] sm:text-[28px] font-normal text-[#0E0F0C] mb-6 tracking-tight" style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}>
            Documents
          </h2>
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
                      <h3 className="text-[14px] sm:text-[15px] font-semibold text-[#0E0F0C]">
                        {doc.name}
                      </h3>
                      <p className="text-[11px] sm:text-[12px] text-[#767570] mt-1">
                        {doc.date} • {doc.type}
                      </p>
                    </div>
                  </div>
                  <Download className="size-4 sm:size-5 text-[#767570] group-hover:text-[#0A7A52] transition-colors" strokeWidth={2.5} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Payment History */}
        <div>
          <h2 className="text-[24px] sm:text-[28px] font-normal text-[#0E0F0C] mb-6 tracking-tight" style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}>
            Payment History
          </h2>
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
                    <h3 className="text-[14px] sm:text-[15px] font-semibold text-[#0E0F0C]">
                      {payment.month}
                    </h3>
                    <p className="text-[11px] sm:text-[12px] text-[#767570] mt-1">
                      Paid on {payment.date}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-[16px] sm:text-[18px] font-normal text-[#0E0F0C]" style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}>
                    {payment.amount}
                  </p>
                  <div className="inline-flex items-center gap-2 mt-1.5 px-2.5 sm:px-3 py-1 bg-[#E5F4EE] rounded-full">
                    <div className="size-1.5 sm:size-2 rounded-full bg-[#0A7A52]" />
                    <span className="text-[10px] sm:text-[11px] font-semibold text-[#0A7A52] uppercase tracking-wide">
                      {payment.status}
                    </span>
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
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={(e) => e.stopPropagation()}
          >
            <PaymentForm
              tenantName="Sarah Kim"
              unitNumber="4A"
              amount={2300}
              dueDate="July 1, 2026"
              onSubmit={handlePaymentSubmit}
              onCancel={() => setShowPaymentModal(false)}
              mode="tenant"
            />
          </motion.div>
        </div>
      )}

      {/* Schedule Payment Modal */}
      {showScheduleModal && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setShowScheduleModal(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl p-6 sm:p-8 max-w-lg w-full"
          >
            <h3 className="text-[22px] sm:text-[24px] font-normal text-[#0E0F0C] mb-4" style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}>
              Schedule Automatic Payment
            </h3>
            <p className="text-[13px] sm:text-[14px] text-[#767570] mb-6">
              Set up automatic monthly rent payments to never miss a due date.
            </p>
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-[12px] sm:text-[13px] font-semibold text-[#0E0F0C] mb-2">
                  Payment Date
                </label>
                <select className="w-full px-4 py-3 border border-[rgba(0,0,0,0.08)] rounded-xl text-[13px] sm:text-[14px] focus:outline-none focus:ring-2 focus:ring-[#0A7A52]">
                  <option>1st of every month</option>
                  <option>15th of every month</option>
                  <option>Last day of month</option>
                </select>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => setShowScheduleModal(false)}
                className="flex-1 px-6 py-3 border border-[rgba(0,0,0,0.08)] text-[#767570] text-[14px] font-semibold rounded-xl hover:bg-[#F8F7F4] transition-all"
              >
                Cancel
              </button>
              <button className="flex-1 px-6 py-3 bg-[#0A7A52] text-white text-[14px] font-semibold rounded-xl hover:bg-[#085D3D] transition-all">
                Enable Auto-Pay
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
import { motion } from "motion/react";
import { DollarSign, FileText, Home, Calendar, Download } from "lucide-react";

export function TenantPortalPremium() {
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

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-8 py-12">
        {/* Premium Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <h1 className="text-[48px] font-semibold text-[#0A0A0A] leading-tight tracking-tight mb-3">
            Welcome Sarah
          </h1>
          <p className="text-[14px] text-[#9CA3AF]">
            Everything you need in one place
          </p>
        </motion.div>

        {/* Next Rent - Hero Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-[#0A0A0A] text-white rounded-2xl p-8 mb-12"
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[12px] text-white/60 uppercase tracking-wider mb-3">
                Next Rent Payment
              </p>
              <h2 className="text-[48px] font-semibold leading-none mb-2">
                $2,300
              </h2>
              <p className="text-[14px] text-white/80">
                Due July 1, 2026
              </p>
            </div>
            <DollarSign className="size-12 text-white/20" />
          </div>

          <div className="mt-8 flex gap-3">
            <button className="flex-1 px-6 py-3 bg-white text-[#0A0A0A] text-[14px] font-medium rounded-lg hover:bg-white/90 transition-colors">
              Pay Now
            </button>
            <button className="px-6 py-3 border border-white/20 text-white text-[14px] font-medium rounded-lg hover:bg-white/10 transition-colors">
              Schedule Payment
            </button>
          </div>
        </motion.div>

        {/* Lease Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white border border-black/[0.08] rounded-xl p-8 mb-8"
        >
          <div className="flex items-start justify-between mb-6">
            <div>
              <h3 className="text-[18px] font-semibold text-[#0A0A0A] mb-2">
                Lease
              </h3>
              <p className="text-[14px] text-[#9CA3AF]">
                Active until May 2027
              </p>
            </div>
            <Home className="size-6 text-[#9CA3AF]" />
          </div>

          <div className="grid grid-cols-2 gap-6 pt-6 border-t border-black/[0.04]">
            <div>
              <p className="text-[12px] text-[#9CA3AF] mb-1">Unit</p>
              <p className="text-[16px] font-semibold text-[#0A0A0A]">4A</p>
            </div>
            <div>
              <p className="text-[12px] text-[#9CA3AF] mb-1">Address</p>
              <p className="text-[16px] font-semibold text-[#0A0A0A]">123 King St</p>
            </div>
            <div>
              <p className="text-[12px] text-[#9CA3AF] mb-1">Start Date</p>
              <p className="text-[16px] font-semibold text-[#0A0A0A]">May 1, 2026</p>
            </div>
            <div>
              <p className="text-[12px] text-[#9CA3AF] mb-1">End Date</p>
              <p className="text-[16px] font-semibold text-[#0A0A0A]">May 1, 2027</p>
            </div>
          </div>
        </motion.div>

        {/* Documents */}
        <div className="mb-12">
          <h2 className="text-[28px] font-semibold text-[#0A0A0A] mb-6 tracking-tight">
            Documents
          </h2>
          <div className="space-y-3">
            {documents.map((doc, idx) => (
              <motion.div
                key={doc.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + idx * 0.05 }}
                className="bg-white border border-black/[0.08] rounded-xl p-4 hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)] transition-all duration-300 group cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="size-10 rounded-lg bg-[#F5F5F5] flex items-center justify-center group-hover:bg-[#0A0A0A] transition-colors">
                      <FileText className="size-5 text-[#9CA3AF] group-hover:text-white transition-colors" />
                    </div>
                    <div>
                      <h3 className="text-[14px] font-semibold text-[#0A0A0A]">
                        {doc.name}
                      </h3>
                      <p className="text-[12px] text-[#9CA3AF] mt-0.5">
                        {doc.date} • {doc.type}
                      </p>
                    </div>
                  </div>
                  <Download className="size-5 text-[#9CA3AF] group-hover:text-[#0A0A0A] transition-colors" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Payment History */}
        <div>
          <h2 className="text-[28px] font-semibold text-[#0A0A0A] mb-6 tracking-tight">
            Payment History
          </h2>
          <div className="bg-white border border-black/[0.08] rounded-xl overflow-hidden">
            {paymentHistory.map((payment, idx) => (
              <motion.div
                key={payment.month}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + idx * 0.05 }}
                className={`flex items-center justify-between p-6 ${
                  idx !== paymentHistory.length - 1 ? "border-b border-black/[0.04]" : ""
                } hover:bg-[#F5F5F5] transition-colors`}
              >
                <div className="flex items-center gap-4">
                  <div className="size-10 rounded-full bg-[#22C55E]/10 flex items-center justify-center">
                    <Calendar className="size-5 text-[#22C55E]" />
                  </div>
                  <div>
                    <h3 className="text-[14px] font-semibold text-[#0A0A0A]">
                      {payment.month}
                    </h3>
                    <p className="text-[12px] text-[#9CA3AF] mt-0.5">
                      Paid on {payment.date}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-[16px] font-semibold text-[#0A0A0A]">
                    {payment.amount}
                  </p>
                  <div className="inline-flex items-center gap-1.5 mt-1 px-2 py-0.5 bg-[#22C55E]/10 rounded-full">
                    <div className="size-1.5 rounded-full bg-[#22C55E]" />
                    <span className="text-[12px] font-medium text-[#22C55E]">
                      {payment.status}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

import { useState } from "react";
import { motion } from "motion/react";
import {
  DollarSign,
  CreditCard,
  Send,
  Check,
  Clock,
  AlertTriangle,
  Download,
  Mail,
  Copy,
  ExternalLink,
  TrendingUp,
  Calendar,
  Users,
  CheckCircle2,
} from "lucide-react";

interface Payment {
  id: string;
  tenantName: string;
  unit: string;
  amount: number;
  dueDate: string;
  status: "paid" | "pending" | "late" | "processing";
  method?: "interac" | "stripe" | "auto-pad";
  paidDate?: string;
}

export function RentCollection() {
  const [selectedMethod, setSelectedMethod] = useState<"interac" | "stripe" | "auto-pad">("interac");
  const [showInteracInstructions, setShowInteracInstructions] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const payments: Payment[] = [
    {
      id: "1",
      tenantName: "Sarah Kim",
      unit: "4A",
      amount: 2300,
      dueDate: "2026-03-01",
      status: "paid",
      method: "interac",
      paidDate: "2026-02-28",
    },
    {
      id: "2",
      tenantName: "John Doe",
      unit: "1B",
      amount: 2800,
      dueDate: "2026-03-01",
      status: "pending",
    },
    {
      id: "3",
      tenantName: "Alice Smith",
      unit: "2C",
      amount: 2100,
      dueDate: "2026-03-01",
      status: "late",
    },
    {
      id: "4",
      tenantName: "Bob Johnson",
      unit: "3A",
      amount: 2500,
      dueDate: "2026-03-01",
      status: "processing",
      method: "stripe",
    },
  ];

  const totalExpected = payments.reduce((sum, p) => sum + p.amount, 0);
  const totalCollected = payments
    .filter((p) => p.status === "paid")
    .reduce((sum, p) => sum + p.amount, 0);
  const totalPending = payments
    .filter((p) => p.status === "pending" || p.status === "processing")
    .reduce((sum, p) => sum + p.amount, 0);
  const totalLate = payments.filter((p) => p.status === "late").reduce((sum, p) => sum + p.amount, 0);

  const collectionRate = ((totalCollected / totalExpected) * 100).toFixed(0);

  const copyInteracEmail = () => {
    navigator.clipboard.writeText("rent@kaya.ca");
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-8 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-3">
            <DollarSign className="size-8 text-[#0A0A0A]" />
            <h1 className="text-[48px] font-semibold text-[#0A0A0A] leading-tight tracking-tight">
              Rent Collection
            </h1>
          </div>
          <p className="text-[14px] text-[#9CA3AF] font-normal">
            Collect rent via Interac e-Transfer, Stripe, or Pre-Authorized Debit
          </p>
        </motion.div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white border border-black/[0.08] rounded-xl p-6"
          >
            <p className="text-[12px] text-[#9CA3AF] uppercase tracking-wider mb-2">
              Expected This Month
            </p>
            <h2 className="text-[36px] font-semibold text-[#0A0A0A] leading-none">
              ${totalExpected.toLocaleString()}
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white border border-black/[0.08] rounded-xl p-6"
          >
            <p className="text-[12px] text-[#9CA3AF] uppercase tracking-wider mb-2">
              Collected
            </p>
            <h2 className="text-[36px] font-semibold text-[#22C55E] leading-none mb-2">
              ${totalCollected.toLocaleString()}
            </h2>
            <div className="flex items-center gap-2">
              <div className="h-2 flex-1 bg-[#F5F5F5] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#22C55E] rounded-full transition-all duration-500"
                  style={{ width: `${collectionRate}%` }}
                />
              </div>
              <span className="text-[12px] text-[#6B7280] font-medium">{collectionRate}%</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white border border-black/[0.08] rounded-xl p-6"
          >
            <p className="text-[12px] text-[#9CA3AF] uppercase tracking-wider mb-2">
              Pending
            </p>
            <h2 className="text-[36px] font-semibold text-[#F59E0B] leading-none">
              ${totalPending.toLocaleString()}
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white border border-black/[0.08] rounded-xl p-6"
          >
            <p className="text-[12px] text-[#9CA3AF] uppercase tracking-wider mb-2">
              Late Payments
            </p>
            <h2 className="text-[36px] font-semibold text-[#EF4444] leading-none">
              ${totalLate.toLocaleString()}
            </h2>
          </motion.div>
        </div>

        {/* Payment Methods - Canadian Focus */}
        <div className="bg-gradient-to-br from-[#6366F1]/5 to-[#8B5CF6]/5 border border-[#6366F1]/20 rounded-xl p-8 mb-12">
          <h3 className="text-[20px] font-semibold text-[#0A0A0A] mb-6">
            Choose Your Collection Method
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Interac e-Transfer */}
            <button
              onClick={() => {
                setSelectedMethod("interac");
                setShowInteracInstructions(true);
              }}
              className={`p-6 rounded-xl border-2 transition-all text-left ${
                selectedMethod === "interac"
                  ? "border-[#6366F1] bg-white shadow-lg"
                  : "border-black/[0.08] bg-white hover:border-[#6366F1]/50"
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="size-12 rounded-full bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] flex items-center justify-center">
                  <Send className="size-6 text-white" />
                </div>
                {selectedMethod === "interac" && (
                  <CheckCircle2 className="size-6 text-[#6366F1]" />
                )}
              </div>
              <h4 className="text-[16px] font-semibold text-[#0A0A0A] mb-2">
                Interac e-Transfer
              </h4>
              <p className="text-[13px] text-[#6B7280] mb-3">
                Most popular in Canada. Direct bank-to-bank transfers with no fees.
              </p>
              <div className="flex items-center gap-2 text-[11px] text-[#22C55E] font-medium">
                <CheckCircle2 className="size-4" />
                Recommended for Canada
              </div>
            </button>

            {/* Stripe */}
            <button
              onClick={() => setSelectedMethod("stripe")}
              className={`p-6 rounded-xl border-2 transition-all text-left ${
                selectedMethod === "stripe"
                  ? "border-[#6366F1] bg-white shadow-lg"
                  : "border-black/[0.08] bg-white hover:border-[#6366F1]/50"
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="size-12 rounded-full bg-gradient-to-br from-[#635BFF] to-[#0A2540] flex items-center justify-center">
                  <CreditCard className="size-6 text-white" />
                </div>
                {selectedMethod === "stripe" && (
                  <CheckCircle2 className="size-6 text-[#6366F1]" />
                )}
              </div>
              <h4 className="text-[16px] font-semibold text-[#0A0A0A] mb-2">
                Stripe Payments
              </h4>
              <p className="text-[13px] text-[#6B7280] mb-3">
                Credit/debit cards. Instant deposits. 2.9% + $0.30 CAD per transaction.
              </p>
              <div className="text-[11px] text-[#9CA3AF]">
                Supports Visa, Mastercard, Amex
              </div>
            </button>

            {/* PAD */}
            <button
              onClick={() => setSelectedMethod("auto-pad")}
              className={`p-6 rounded-xl border-2 transition-all text-left ${
                selectedMethod === "auto-pad"
                  ? "border-[#6366F1] bg-white shadow-lg"
                  : "border-black/[0.08] bg-white hover:border-[#6366F1]/50"
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="size-12 rounded-full bg-gradient-to-br from-[#22C55E] to-[#16A34A] flex items-center justify-center">
                  <TrendingUp className="size-6 text-white" />
                </div>
                {selectedMethod === "auto-pad" && (
                  <CheckCircle2 className="size-6 text-[#6366F1]" />
                )}
              </div>
              <h4 className="text-[16px] font-semibold text-[#0A0A0A] mb-2">
                Pre-Authorized Debit
              </h4>
              <p className="text-[13px] text-[#6B7280] mb-3">
                Automatic monthly withdrawals. Set it and forget it.
              </p>
              <div className="text-[11px] text-[#9CA3AF]">
                Requires tenant bank authorization
              </div>
            </button>
          </div>
        </div>

        {/* Interac Instructions */}
        {showInteracInstructions && selectedMethod === "interac" && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="bg-white border border-black/[0.08] rounded-xl p-8 mb-12"
          >
            <div className="flex items-start justify-between mb-6">
              <div>
                <h3 className="text-[20px] font-semibold text-[#0A0A0A] mb-2">
                  Interac e-Transfer Setup
                </h3>
                <p className="text-[14px] text-[#6B7280]">
                  Share these instructions with your tenants
                </p>
              </div>
              <button className="flex items-center gap-2 px-4 py-2 bg-[#0A0A0A] text-white text-[13px] font-medium rounded-lg hover:bg-[#1C1C1C] transition-colors">
                <Mail className="size-4" />
                Email to All Tenants
              </button>
            </div>

            <div className="bg-gradient-to-br from-[#F5F5F5] to-[#FAFAFA] rounded-xl p-6 border border-black/[0.04]">
              <h4 className="text-[14px] font-semibold text-[#0A0A0A] mb-4">
                How to Send Rent via Interac e-Transfer:
              </h4>

              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="size-8 rounded-full bg-[#6366F1] flex items-center justify-center text-white text-[14px] font-semibold flex-shrink-0">
                    1
                  </div>
                  <div>
                    <p className="text-[14px] text-[#0A0A0A] font-medium mb-1">
                      Log into your online banking
                    </p>
                    <p className="text-[13px] text-[#6B7280]">
                      RBC, TD, Scotiabank, BMO, CIBC, or any Canadian bank
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="size-8 rounded-full bg-[#6366F1] flex items-center justify-center text-white text-[14px] font-semibold flex-shrink-0">
                    2
                  </div>
                  <div className="flex-1">
                    <p className="text-[14px] text-[#0A0A0A] font-medium mb-2">
                      Send Interac e-Transfer to:
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="flex-1 px-4 py-3 bg-white border border-black/[0.08] rounded-lg">
                        <p className="text-[16px] font-mono text-[#0A0A0A]">rent@kaya.ca</p>
                      </div>
                      <button
                        onClick={copyInteracEmail}
                        className="px-4 py-3 bg-[#0A0A0A] text-white text-[13px] font-medium rounded-lg hover:bg-[#1C1C1C] transition-colors flex items-center gap-2"
                      >
                        {copiedEmail ? (
                          <>
                            <Check className="size-4" />
                            Copied!
                          </>
                        ) : (
                          <>
                            <Copy className="size-4" />
                            Copy Email
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="size-8 rounded-full bg-[#6366F1] flex items-center justify-center text-white text-[14px] font-semibold flex-shrink-0">
                    3
                  </div>
                  <div>
                    <p className="text-[14px] text-[#0A0A0A] font-medium mb-1">
                      Enter your Unit Number in the message
                    </p>
                    <p className="text-[13px] text-[#6B7280]">
                      Example: "Unit 4A - March 2026 Rent"
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="size-8 rounded-full bg-[#6366F1] flex items-center justify-center text-white text-[14px] font-semibold flex-shrink-0">
                    4
                  </div>
                  <div>
                    <p className="text-[14px] text-[#0A0A0A] font-medium mb-1">
                      Auto-deposit enabled (no security question)
                    </p>
                    <p className="text-[13px] text-[#6B7280]">
                      Funds deposited automatically within 30 minutes
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-[#22C55E]/10 border border-[#22C55E]/20 rounded-xl">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="size-5 text-[#22C55E] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-[13px] font-medium text-[#0A0A0A] mb-1">
                    No Transaction Fees
                  </p>
                  <p className="text-[12px] text-[#6B7280]">
                    Interac e-Transfer is free for both you and your tenants with most Canadian banks.
                    Funds arrive instantly with auto-deposit.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Payment List */}
        <div className="bg-white border border-black/[0.08] rounded-xl overflow-hidden">
          <div className="px-6 py-4 border-b border-black/[0.04]">
            <h3 className="text-[16px] font-semibold text-[#0A0A0A]">
              March 2026 Payments
            </h3>
          </div>

          <div className="divide-y divide-black/[0.04]">
            {payments.map((payment, idx) => (
              <motion.div
                key={payment.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="px-6 py-4 hover:bg-[#F5F5F5] transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 flex-1">
                    <div className="size-12 rounded-full bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] flex items-center justify-center">
                      <Users className="size-6 text-white" />
                    </div>
                    <div>
                      <p className="text-[15px] font-semibold text-[#0A0A0A]">
                        {payment.tenantName}
                      </p>
                      <p className="text-[13px] text-[#9CA3AF]">
                        Unit {payment.unit} • Due {payment.dueDate}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <p className="text-[18px] font-semibold text-[#0A0A0A]">
                        ${payment.amount.toLocaleString()}
                      </p>
                      {payment.method && (
                        <p className="text-[11px] text-[#9CA3AF] uppercase tracking-wider">
                          {payment.method === "interac" ? "Interac e-Transfer" : payment.method}
                        </p>
                      )}
                    </div>

                    <div
                      className={`px-4 py-2 rounded-full text-[12px] font-medium flex items-center gap-2 ${
                        payment.status === "paid"
                          ? "bg-[#22C55E]/10 text-[#22C55E]"
                          : payment.status === "processing"
                          ? "bg-[#3B82F6]/10 text-[#3B82F6]"
                          : payment.status === "late"
                          ? "bg-[#EF4444]/10 text-[#EF4444]"
                          : "bg-[#F59E0B]/10 text-[#F59E0B]"
                      }`}
                    >
                      {payment.status === "paid" && <CheckCircle2 className="size-4" />}
                      {payment.status === "processing" && <Clock className="size-4" />}
                      {payment.status === "late" && <AlertTriangle className="size-4" />}
                      {payment.status === "pending" && <Clock className="size-4" />}
                      <span className="capitalize">{payment.status}</span>
                    </div>

                    {payment.status === "pending" && (
                      <button className="px-4 py-2 bg-[#0A0A0A] text-white text-[13px] font-medium rounded-lg hover:bg-[#1C1C1C] transition-colors flex items-center gap-2">
                        <Send className="size-4" />
                        Send Reminder
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="p-4 bg-white border border-black/[0.08] rounded-xl hover:shadow-lg transition-all text-left group">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-[#6366F1]/10 group-hover:bg-[#6366F1]/20 transition-colors">
                <Download className="size-5 text-[#6366F1]" />
              </div>
              <h4 className="font-semibold text-[#0A0A0A]">Export Payments</h4>
            </div>
            <p className="text-[13px] text-[#6B7280]">Download CSV for accounting</p>
          </button>

          <button className="p-4 bg-white border border-black/[0.08] rounded-xl hover:shadow-lg transition-all text-left group">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-[#22C55E]/10 group-hover:bg-[#22C55E]/20 transition-colors">
                <Calendar className="size-5 text-[#22C55E]" />
              </div>
              <h4 className="font-semibold text-[#0A0A0A]">Payment Schedule</h4>
            </div>
            <p className="text-[13px] text-[#6B7280]">View upcoming payments</p>
          </button>

          <button className="p-4 bg-white border border-black/[0.08] rounded-xl hover:shadow-lg transition-all text-left group">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-[#F59E0B]/10 group-hover:bg-[#F59E0B]/20 transition-colors">
                <ExternalLink className="size-5 text-[#F59E0B]" />
              </div>
              <h4 className="font-semibold text-[#0A0A0A]">Payment Portal</h4>
            </div>
            <p className="text-[13px] text-[#6B7280]">Share tenant payment link</p>
          </button>
        </div>
      </div>
    </div>
  );
}

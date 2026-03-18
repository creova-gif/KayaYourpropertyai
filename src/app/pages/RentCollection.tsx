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
      <div className="max-w-7xl mx-auto px-8 py-12" style={{ background: '#F8F7F4', minHeight: '100vh', fontFamily: "'DM Sans', system-ui, sans-serif" }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <p className="text-[10px] font-semibold text-[#767570] uppercase tracking-wider mb-3">
            Financial Operations
          </p>
          <div className="flex items-center gap-4 mb-3">
            <DollarSign className="size-10 text-[#0A7A52]" strokeWidth={2} />
            <h1 className="text-[52px] font-normal text-[#0E0F0C] leading-tight tracking-tight" style={{ fontFamily: "'Instrument Serif', Georgia, serif", letterSpacing: '-1.5px' }}>
              Rent Collection
            </h1>
          </div>
          <p className="text-[14px] text-[#767570] font-normal">
            Collect rent via Interac e-Transfer, Stripe, or Pre-Authorized Debit
          </p>
        </motion.div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white border border-[rgba(0,0,0,0.07)] rounded-xl p-6 hover:shadow-lg transition-all"
          >
            <p className="text-[11px] text-[#767570] uppercase tracking-wider font-semibold mb-3">
              Expected This Month
            </p>
            <h2 className="text-[38px] font-normal text-[#0E0F0C] leading-none" style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}>
              ${totalExpected.toLocaleString()}
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white border border-[rgba(0,0,0,0.07)] rounded-xl p-6 hover:shadow-lg transition-all"
          >
            <p className="text-[11px] text-[#767570] uppercase tracking-wider font-semibold mb-3">
              Collected
            </p>
            <h2 className="text-[38px] font-normal text-[#0A7A52] leading-none mb-3" style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}>
              ${totalCollected.toLocaleString()}
            </h2>
            <div className="flex items-center gap-2">
              <div className="h-2 flex-1 bg-[#E5F4EE] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#0A7A52] rounded-full transition-all duration-500"
                  style={{ width: `${collectionRate}%` }}
                />
              </div>
              <span className="text-[12px] text-[#767570] font-medium">{collectionRate}%</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white border border-[rgba(0,0,0,0.07)] rounded-xl p-6 hover:shadow-lg transition-all"
          >
            <p className="text-[11px] text-[#767570] uppercase tracking-wider font-semibold mb-3">
              Pending
            </p>
            <h2 className="text-[38px] font-normal text-[#F59E0B] leading-none" style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}>
              ${totalPending.toLocaleString()}
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white border border-[rgba(0,0,0,0.07)] rounded-xl p-6 hover:shadow-lg transition-all"
          >
            <p className="text-[11px] text-[#767570] uppercase tracking-wider font-semibold mb-3">
              Late Payments
            </p>
            <h2 className="text-[38px] font-normal text-[#EF4444] leading-none" style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}>
              ${totalLate.toLocaleString()}
            </h2>
          </motion.div>
        </div>

        {/* Payment Methods - Canadian Focus */}
        <div className="bg-gradient-to-br from-[#E5F4EE] to-[#F8F7F4] border border-[rgba(10,122,82,0.15)] rounded-xl p-8 mb-12">
          <h3 className="text-[24px] font-normal text-[#0E0F0C] mb-6" style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}>
            Choose Your Collection Method
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Interac e-Transfer */}
            <button
              onClick={() => {
                setSelectedMethod("interac");
                setShowInteracInstructions(true);
              }}
              className={`p-6 rounded-xl border-2 transition-all duration-200 text-left ${
                selectedMethod === "interac"
                  ? "border-[#0A7A52] bg-white shadow-lg"
                  : "border-[rgba(0,0,0,0.07)] bg-white hover:border-[#0A7A52] hover:shadow-md"
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="size-12 rounded-full bg-gradient-to-br from-[#0A7A52] to-[#085D3D] flex items-center justify-center">
                  <Send className="size-6 text-white" strokeWidth={2.5} />
                </div>
                {selectedMethod === "interac" && (
                  <CheckCircle2 className="size-6 text-[#0A7A52]" strokeWidth={2.5} />
                )}
              </div>
              <h4 
                className="text-[16px] font-semibold text-[#0E0F0C] mb-2"
                style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}
              >
                Interac e-Transfer
              </h4>
              <p 
                className="text-[13px] text-[#767570] mb-3"
                style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}
              >
                Most popular in Canada. Direct bank-to-bank transfers with no fees.
              </p>
              <div 
                className="flex items-center gap-2 text-[11px] text-[#0A7A52] font-semibold uppercase tracking-wide"
                style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}
              >
                <CheckCircle2 className="size-4" strokeWidth={2.5} />
                Recommended for Canada
              </div>
            </button>

            {/* Stripe */}
            <button
              onClick={() => setSelectedMethod("stripe")}
              className={`p-6 rounded-xl border-2 transition-all duration-200 text-left ${
                selectedMethod === "stripe"
                  ? "border-[#0A7A52] bg-white shadow-lg"
                  : "border-[rgba(0,0,0,0.07)] bg-white hover:border-[#0A7A52] hover:shadow-md"
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="size-12 rounded-full bg-gradient-to-br from-[#635BFF] to-[#0A2540] flex items-center justify-center">
                  <CreditCard className="size-6 text-white" strokeWidth={2.5} />
                </div>
                {selectedMethod === "stripe" && (
                  <CheckCircle2 className="size-6 text-[#0A7A52]" strokeWidth={2.5} />
                )}
              </div>
              <h4 
                className="text-[16px] font-semibold text-[#0E0F0C] mb-2"
                style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}
              >
                Stripe Payments
              </h4>
              <p 
                className="text-[13px] text-[#767570] mb-3"
                style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}
              >
                Credit/debit cards. Instant deposits. 2.9% + $0.30 CAD per transaction.
              </p>
              <div 
                className="text-[11px] text-[#767570]"
                style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}
              >
                Supports Visa, Mastercard, Amex
              </div>
            </button>

            {/* PAD */}
            <button
              onClick={() => setSelectedMethod("auto-pad")}
              className={`p-6 rounded-xl border-2 transition-all duration-200 text-left ${
                selectedMethod === "auto-pad"
                  ? "border-[#0A7A52] bg-white shadow-lg"
                  : "border-[rgba(0,0,0,0.07)] bg-white hover:border-[#0A7A52] hover:shadow-md"
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="size-12 rounded-full bg-gradient-to-br from-[#0A7A52] to-[#085D3D] flex items-center justify-center">
                  <TrendingUp className="size-6 text-white" strokeWidth={2.5} />
                </div>
                {selectedMethod === "auto-pad" && (
                  <CheckCircle2 className="size-6 text-[#0A7A52]" strokeWidth={2.5} />
                )}
              </div>
              <h4 
                className="text-[16px] font-semibold text-[#0E0F0C] mb-2"
                style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}
              >
                Pre-Authorized Debit
              </h4>
              <p 
                className="text-[13px] text-[#767570] mb-3"
                style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}
              >
                Automatic monthly withdrawals. Set it and forget it.
              </p>
              <div 
                className="text-[11px] text-[#767570]"
                style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}
              >
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
            className="bg-white border border-[rgba(0,0,0,0.07)] rounded-xl p-8 mb-12 shadow-lg"
          >
            <div className="flex items-start justify-between mb-6">
              <div>
                <h3 className="text-[24px] font-normal text-[#0E0F0C] mb-2" style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}>
                  Interac e-Transfer Setup
                </h3>
                <p className="text-[14px] text-[#767570]">
                  Share these instructions with your tenants
                </p>
              </div>
              <button className="flex items-center gap-2 px-5 py-2.5 bg-[#0A7A52] text-white text-[13px] font-semibold rounded-lg hover:bg-[#085D3D] transition-colors">
                <Mail className="size-4" />
                Email to All Tenants
              </button>
            </div>

            <div className="bg-gradient-to-br from-[#F8F7F4] to-[#E5F4EE] rounded-xl p-6 border border-[rgba(0,0,0,0.05)]">
              <h4 className="text-[14px] font-semibold text-[#0E0F0C] mb-4">
                How to Send Rent via Interac e-Transfer:
              </h4>

              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="size-8 rounded-full bg-[#0A7A52] flex items-center justify-center text-white text-[14px] font-semibold flex-shrink-0">
                    1
                  </div>
                  <div>
                    <p className="text-[14px] text-[#0E0F0C] font-medium mb-1">
                      Log into your online banking
                    </p>
                    <p className="text-[13px] text-[#767570]">
                      RBC, TD, Scotiabank, BMO, CIBC, or any Canadian bank
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="size-8 rounded-full bg-[#0A7A52] flex items-center justify-center text-white text-[14px] font-semibold flex-shrink-0">
                    2
                  </div>
                  <div className="flex-1">
                    <p className="text-[14px] text-[#0E0F0C] font-medium mb-2">
                      Send Interac e-Transfer to:
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="flex-1 px-4 py-3 bg-white border border-[rgba(0,0,0,0.1)] rounded-lg">
                        <p className="text-[16px] font-mono text-[#0E0F0C]">rent@kaya.ca</p>
                      </div>
                      <button
                        onClick={copyInteracEmail}
                        className="px-4 py-3 bg-[#0A7A52] text-white text-[13px] font-semibold rounded-lg hover:bg-[#085D3D] transition-colors flex items-center gap-2"
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
                  <div className="size-8 rounded-full bg-[#0A7A52] flex items-center justify-center text-white text-[14px] font-semibold flex-shrink-0">
                    3
                  </div>
                  <div>
                    <p className="text-[14px] text-[#0E0F0C] font-medium mb-1">
                      Enter your Unit Number in the message
                    </p>
                    <p className="text-[13px] text-[#767570]">
                      Example: "Unit 4A - March 2026 Rent"
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="size-8 rounded-full bg-[#0A7A52] flex items-center justify-center text-white text-[14px] font-semibold flex-shrink-0">
                    4
                  </div>
                  <div>
                    <p className="text-[14px] text-[#0E0F0C] font-medium mb-1">
                      Auto-deposit enabled (no security question)
                    </p>
                    <p className="text-[13px] text-[#767570]">
                      Funds deposited automatically within 30 minutes
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-[#E5F4EE] border border-[rgba(10,122,82,0.2)] rounded-xl">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="size-5 text-[#0A7A52] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-[13px] font-semibold text-[#0E0F0C] mb-1">
                    No Transaction Fees
                  </p>
                  <p className="text-[12px] text-[#767570]">
                    Interac e-Transfer is free for both you and your tenants with most Canadian banks.
                    Funds arrive instantly with auto-deposit.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Payment List */}
        <div className="bg-white border border-[rgba(0,0,0,0.07)] rounded-xl overflow-hidden shadow-lg">
          <div className="px-6 py-5 border-b border-[rgba(0,0,0,0.05)]">
            <h3 className="text-[20px] font-normal text-[#0E0F0C]" style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}>
              March 2026 Payments
            </h3>
          </div>

          <div className="divide-y divide-[rgba(0,0,0,0.05)]">
            {payments.map((payment, idx) => (
              <motion.div
                key={payment.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="px-6 py-5 hover:bg-[#F8F7F4] transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 flex-1">
                    <div className="size-12 rounded-full bg-gradient-to-br from-[#0A7A52] to-[#085D3D] flex items-center justify-center">
                      <Users className="size-6 text-white" />
                    </div>
                    <div>
                      <p className="text-[15px] font-semibold text-[#0E0F0C]">
                        {payment.tenantName}
                      </p>
                      <p className="text-[13px] text-[#767570]">
                        Unit {payment.unit} • Due {payment.dueDate}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <p className="text-[20px] font-normal text-[#0E0F0C]" style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}>
                        ${payment.amount.toLocaleString()}
                      </p>
                      {payment.method && (
                        <p className="text-[11px] text-[#767570] uppercase tracking-wider font-medium">
                          {payment.method === "interac" ? "Interac e-Transfer" : payment.method}
                        </p>
                      )}
                    </div>

                    <div
                      className={`px-4 py-2 rounded-full text-[12px] font-semibold flex items-center gap-2 uppercase tracking-wide ${
                        payment.status === "paid"
                          ? "bg-[#E5F4EE] text-[#0A7A52]"
                          : payment.status === "processing"
                          ? "bg-[#DBEAFE] text-[#3B82F6]"
                          : payment.status === "late"
                          ? "bg-[#FEE2E2] text-[#EF4444]"
                          : "bg-[#FEF3C7] text-[#F59E0B]"
                      }`}
                    >
                      {payment.status === "paid" && <CheckCircle2 className="size-4" />}
                      {payment.status === "processing" && <Clock className="size-4" />}
                      {payment.status === "late" && <AlertTriangle className="size-4" />}
                      {payment.status === "pending" && <Clock className="size-4" />}
                      <span className="capitalize">{payment.status}</span>
                    </div>

                    {payment.status === "pending" && (
                      <button className="px-4 py-2 bg-[#0A7A52] text-white text-[13px] font-semibold rounded-lg hover:bg-[#085D3D] transition-colors flex items-center gap-2">
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
          <button className="p-5 bg-white border border-[rgba(0,0,0,0.07)] rounded-xl hover:shadow-lg transition-all text-left group">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-[#E5F4EE] group-hover:bg-[#0A7A52] transition-colors">
                <Download className="size-5 text-[#0A7A52] group-hover:text-white transition-colors" />
              </div>
              <h4 className="font-semibold text-[#0E0F0C]">Export Payments</h4>
            </div>
            <p className="text-[13px] text-[#767570]">Download CSV for accounting</p>
          </button>

          <button className="p-5 bg-white border border-[rgba(0,0,0,0.07)] rounded-xl hover:shadow-lg transition-all text-left group">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-[#E5F4EE] group-hover:bg-[#0A7A52] transition-colors">
                <Calendar className="size-5 text-[#0A7A52] group-hover:text-white transition-colors" />
              </div>
              <h4 className="font-semibold text-[#0E0F0C]">Payment Schedule</h4>
            </div>
            <p className="text-[13px] text-[#767570]">View upcoming payments</p>
          </button>

          <button className="p-5 bg-white border border-[rgba(0,0,0,0.07)] rounded-xl hover:shadow-lg transition-all text-left group">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-[#E5F4EE] group-hover:bg-[#0A7A52] transition-colors">
                <ExternalLink className="size-5 text-[#0A7A52] group-hover:text-white transition-colors" />
              </div>
              <h4 className="font-semibold text-[#0E0F0C]">Payment Portal</h4>
            </div>
            <p className="text-[13px] text-[#767570]">Share tenant payment link</p>
          </button>
        </div>
      </div>
    </div>
  );
}
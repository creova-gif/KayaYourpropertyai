import { useState } from "react";
import { motion } from "motion/react";
import { CreditCard, Send, Building2, CheckCircle2, ArrowRight } from "lucide-react";
import { PaymentForm, PaymentData } from "../components/PaymentForm";

export function PaymentDemo() {
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [demoMode, setDemoMode] = useState<"landlord" | "tenant">("tenant");

  const handlePaymentSubmit = (paymentData: PaymentData) => {
    console.log("Demo payment submitted:", paymentData);
    alert(`✅ Payment submitted successfully!\n\nMethod: ${paymentData.method}\nAmount: $${paymentData.amount}`);
    setShowPaymentModal(false);
  };

  const features = [
    {
      icon: CreditCard,
      title: "Stripe Payments",
      description: "Credit/debit cards with instant processing",
      color: "#635BFF",
    },
    {
      icon: Send,
      title: "Interac e-Transfer",
      description: "Free bank-to-bank transfers (Most popular in Canada)",
      color: "#0A7A52",
    },
    {
      icon: Building2,
      title: "Pre-Authorized Debit",
      description: "Automatic monthly withdrawals",
      color: "#0A7A52",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <div
        className="max-w-6xl mx-auto px-8 py-16"
        style={{ background: "#F8F7F4", minHeight: "100vh", fontFamily: "'DM Sans', system-ui, sans-serif" }}
      >
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <p className="text-[10px] font-semibold text-[#767570] uppercase tracking-wider mb-3">
            KAYA Payment System
          </p>
          <h1
            className="text-[64px] font-normal text-[#0E0F0C] leading-tight tracking-tight mb-4"
            style={{ fontFamily: "'Instrument Serif', Georgia, serif", letterSpacing: "-2px" }}
          >
            Payment Collection
            <br />
            <span className="text-[#0A7A52]">Made Simple</span>
          </h1>
          <p className="text-[16px] text-[#767570] max-w-2xl mx-auto">
            Professional payment collection forms for Canadian landlords. Accept rent via Stripe, Interac e-Transfer,
            or Pre-Authorized Debit.
          </p>
        </motion.div>

        {/* Mode Selector */}
        <div className="flex justify-center gap-4 mb-12">
          <button
            onClick={() => setDemoMode("tenant")}
            className={`px-6 py-3 rounded-xl text-[14px] font-semibold transition-all ${
              demoMode === "tenant"
                ? "bg-[#0A7A52] text-white shadow-lg"
                : "bg-white border border-[rgba(0,0,0,0.07)] text-[#767570] hover:border-[#0A7A52]"
            }`}
          >
            Tenant View
          </button>
          <button
            onClick={() => setDemoMode("landlord")}
            className={`px-6 py-3 rounded-xl text-[14px] font-semibold transition-all ${
              demoMode === "landlord"
                ? "bg-[#0A7A52] text-white shadow-lg"
                : "bg-white border border-[rgba(0,0,0,0.07)] text-[#767570] hover:border-[#0A7A52]"
            }`}
          >
            Landlord View
          </button>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white border border-[rgba(0,0,0,0.07)] rounded-xl p-8 hover:shadow-lg transition-all"
              >
                <div
                  className="size-14 rounded-xl flex items-center justify-center mb-6"
                  style={{ backgroundColor: `${feature.color}15` }}
                >
                  <Icon className="size-7" style={{ color: feature.color }} strokeWidth={2.5} />
                </div>
                <h3
                  className="text-[20px] font-normal text-[#0E0F0C] mb-3"
                  style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
                >
                  {feature.title}
                </h3>
                <p className="text-[14px] text-[#767570]">{feature.description}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Demo CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gradient-to-br from-[#0A7A52] to-[#085D3D] rounded-2xl p-12 text-center shadow-2xl"
        >
          <div className="size-20 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="size-10 text-white" strokeWidth={2.5} />
          </div>
          <h2
            className="text-[42px] font-normal text-white leading-tight mb-4"
            style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
          >
            Try the Payment Form
          </h2>
          <p className="text-[16px] text-white/90 mb-8 max-w-xl mx-auto">
            Experience our fully functional payment collection form with Stripe, Interac e-Transfer, and PAD options.
          </p>
          <button
            onClick={() => setShowPaymentModal(true)}
            className="px-8 py-4 bg-white text-[#0A7A52] text-[16px] font-semibold rounded-xl hover:bg-white/95 transition-all shadow-lg inline-flex items-center gap-3"
          >
            Open Payment Form
            <ArrowRight className="size-5" strokeWidth={2.5} />
          </button>
        </motion.div>

        {/* Features List */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white border border-[rgba(0,0,0,0.07)] rounded-xl p-8">
            <h3
              className="text-[24px] font-normal text-[#0E0F0C] mb-6"
              style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
            >
              Tenant Features
            </h3>
            <ul className="space-y-4">
              {[
                "Pay rent online 24/7",
                "Choose preferred payment method",
                "View payment history",
                "Download receipts",
                "Set up automatic payments",
                "Secure & encrypted",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3 text-[14px] text-[#0E0F0C]">
                  <CheckCircle2 className="size-5 text-[#0A7A52] flex-shrink-0" strokeWidth={2.5} />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white border border-[rgba(0,0,0,0.07)] rounded-xl p-8">
            <h3
              className="text-[24px] font-normal text-[#0E0F0C] mb-6"
              style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
            >
              Landlord Features
            </h3>
            <ul className="space-y-4">
              {[
                "Track all tenant payments",
                "Send payment reminders",
                "Export to CSV for accounting",
                "View collection rates",
                "Share payment instructions",
                "Canadian compliance ready",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3 text-[14px] text-[#0E0F0C]">
                  <CheckCircle2 className="size-5 text-[#0A7A52] flex-shrink-0" strokeWidth={2.5} />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-3 gap-6">
          <div className="bg-white border border-[rgba(0,0,0,0.07)] rounded-xl p-6 text-center">
            <p
              className="text-[42px] font-normal text-[#0A7A52] leading-none mb-2"
              style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
            >
              3
            </p>
            <p className="text-[13px] text-[#767570] uppercase tracking-wider font-semibold">Payment Methods</p>
          </div>
          <div className="bg-white border border-[rgba(0,0,0,0.07)] rounded-xl p-6 text-center">
            <p
              className="text-[42px] font-normal text-[#0A7A52] leading-none mb-2"
              style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
            >
              $0
            </p>
            <p className="text-[13px] text-[#767570] uppercase tracking-wider font-semibold">Interac Fees</p>
          </div>
          <div className="bg-white border border-[rgba(0,0,0,0.07)] rounded-xl p-6 text-center">
            <p
              className="text-[42px] font-normal text-[#0A7A52] leading-none mb-2"
              style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
            >
              100%
            </p>
            <p className="text-[13px] text-[#767570] uppercase tracking-wider font-semibold">Secure</p>
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
            <PaymentForm
              tenantName={demoMode === "tenant" ? undefined : "John Doe"}
              unitNumber="4A"
              amount={2300}
              dueDate="July 1, 2026"
              onSubmit={handlePaymentSubmit}
              onCancel={() => setShowPaymentModal(false)}
              mode={demoMode}
            />
          </motion.div>
        </div>
      )}
    </div>
  );
}

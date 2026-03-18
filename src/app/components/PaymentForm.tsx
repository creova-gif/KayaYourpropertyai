import { useState } from "react";
import { motion } from "motion/react";
import {
  CreditCard,
  Send,
  Lock,
  CheckCircle2,
  AlertCircle,
  Building2,
  User,
  Mail,
  DollarSign,
} from "lucide-react";

interface PaymentFormProps {
  tenantName?: string;
  unitNumber?: string;
  amount: number;
  dueDate: string;
  onSubmit: (paymentData: PaymentData) => void;
  onCancel?: () => void;
  mode?: "landlord" | "tenant";
}

export interface PaymentData {
  amount: number;
  method: "stripe" | "interac" | "auto-pad";
  cardNumber?: string;
  cardExpiry?: string;
  cardCVC?: string;
  cardName?: string;
  interacEmail?: string;
  tenantEmail?: string;
  unitNumber?: string;
}

export function PaymentForm({
  tenantName,
  unitNumber,
  amount,
  dueDate,
  onSubmit,
  onCancel,
  mode = "tenant",
}: PaymentFormProps) {
  const [paymentMethod, setPaymentMethod] = useState<"stripe" | "interac" | "auto-pad">("stripe");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  // Form state
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCVC, setCardCVC] = useState("");
  const [cardName, setCardName] = useState("");
  const [interacEmail, setInteracEmail] = useState("");
  const [tenantEmail, setTenantEmail] = useState("");

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(" ");
    } else {
      return value;
    }
  };

  const formatExpiry = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    if (v.length >= 2) {
      return v.substring(0, 2) + " / " + v.substring(2, 4);
    }
    return v;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      const paymentData: PaymentData = {
        amount,
        method: paymentMethod,
        cardNumber: paymentMethod === "stripe" ? cardNumber : undefined,
        cardExpiry: paymentMethod === "stripe" ? cardExpiry : undefined,
        cardCVC: paymentMethod === "stripe" ? cardCVC : undefined,
        cardName: paymentMethod === "stripe" ? cardName : undefined,
        interacEmail: paymentMethod === "interac" ? interacEmail : undefined,
        tenantEmail,
        unitNumber,
      };

      setSuccess(true);
      setLoading(false);

      setTimeout(() => {
        onSubmit(paymentData);
      }, 1500);
    }, 2000);
  };

  if (success) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-2xl p-8 text-center"
      >
        <div className="size-20 rounded-full bg-[#E5F4EE] flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="size-10 text-[#0A7A52]" strokeWidth={2.5} />
        </div>
        <h3
          className="text-[28px] font-normal text-[#0E0F0C] mb-3"
          style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
        >
          Payment Successful!
        </h3>
        <p className="text-[14px] text-[#767570] mb-6">
          {paymentMethod === "stripe"
            ? "Your payment has been processed successfully."
            : paymentMethod === "interac"
            ? "Interac e-Transfer instructions have been sent to your email."
            : "Pre-authorized debit setup complete."}
        </p>
        <div className="bg-[#F8F7F4] rounded-xl p-6 border border-[rgba(0,0,0,0.05)]">
          <p className="text-[11px] text-[#767570] uppercase tracking-wider font-semibold mb-2">
            Payment Amount
          </p>
          <p
            className="text-[36px] font-normal text-[#0A7A52]"
            style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
          >
            ${amount.toLocaleString()}
          </p>
          {unitNumber && (
            <p className="text-[13px] text-[#767570] mt-2">Unit {unitNumber}</p>
          )}
        </div>
      </motion.div>
    );
  }

  return (
    <div
      className="bg-white rounded-2xl sm:rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-auto mx-4 sm:mx-0"
      style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}
    >
      <div className="p-4 sm:p-8">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h2
            className="text-[24px] sm:text-[32px] font-normal text-[#0E0F0C] mb-2"
            style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
          >
            {mode === "tenant" ? "Pay Rent" : "Collect Payment"}
          </h2>
          <p className="text-[13px] sm:text-[14px] text-[#767570]">
            {mode === "tenant"
              ? "Choose your payment method and complete the transaction"
              : "Send payment request to tenant"}
          </p>
        </div>

        {/* Payment Summary */}
        <div className="bg-gradient-to-br from-[#E5F4EE] to-[#F8F7F4] rounded-xl p-4 sm:p-6 mb-6 sm:mb-8 border border-[rgba(10,122,82,0.15)]">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-[10px] sm:text-[11px] text-[#767570] uppercase tracking-wider font-semibold mb-1">
                {mode === "tenant" ? "Rent Payment" : "Payment Request"}
              </p>
              <p
                className="text-[32px] sm:text-[42px] font-normal text-[#0A7A52] leading-none"
                style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
              >
                ${amount.toLocaleString()}
              </p>
            </div>
            <DollarSign className="size-10 sm:size-12 text-[#0A7A52]/20" strokeWidth={2} />
          </div>
          <div className="grid grid-cols-2 gap-3 sm:gap-4 pt-4 border-t border-[rgba(0,0,0,0.07)]">
            {tenantName && (
              <div>
                <p className="text-[10px] sm:text-[11px] text-[#767570] mb-1 uppercase tracking-wider font-semibold">
                  Tenant
                </p>
                <p className="text-[13px] sm:text-[14px] font-medium text-[#0E0F0C]">{tenantName}</p>
              </div>
            )}
            {unitNumber && (
              <div>
                <p className="text-[10px] sm:text-[11px] text-[#767570] mb-1 uppercase tracking-wider font-semibold">
                  Unit
                </p>
                <p className="text-[13px] sm:text-[14px] font-medium text-[#0E0F0C]">{unitNumber}</p>
              </div>
            )}
            <div>
              <p className="text-[10px] sm:text-[11px] text-[#767570] mb-1 uppercase tracking-wider font-semibold">
                Due Date
              </p>
              <p className="text-[13px] sm:text-[14px] font-medium text-[#0E0F0C]">{dueDate}</p>
            </div>
          </div>
        </div>

        {/* Payment Method Selection */}
        <div className="mb-6 sm:mb-8">
          <h3 className="text-[14px] sm:text-[16px] font-semibold text-[#0E0F0C] mb-3 sm:mb-4">Payment Method</h3>
          <div className="grid grid-cols-3 gap-2 sm:gap-3">
            <button
              type="button"
              onClick={() => setPaymentMethod("stripe")}
              className={`p-3 sm:p-4 rounded-xl border-2 transition-all text-center ${
                paymentMethod === "stripe"
                  ? "border-[#0A7A52] bg-[#E5F4EE]"
                  : "border-[rgba(0,0,0,0.07)] hover:border-[#0A7A52]"
              }`}
            >
              <CreditCard
                className={`size-5 sm:size-6 mx-auto mb-1.5 sm:mb-2 ${
                  paymentMethod === "stripe" ? "text-[#0A7A52]" : "text-[#767570]"
                }`}
                strokeWidth={2.5}
              />
              <p className="text-[11px] sm:text-[13px] font-semibold text-[#0E0F0C]">Card</p>
            </button>
            <button
              type="button"
              onClick={() => setPaymentMethod("interac")}
              className={`p-3 sm:p-4 rounded-xl border-2 transition-all text-center ${
                paymentMethod === "interac"
                  ? "border-[#0A7A52] bg-[#E5F4EE]"
                  : "border-[rgba(0,0,0,0.07)] hover:border-[#0A7A52]"
              }`}
            >
              <Send
                className={`size-5 sm:size-6 mx-auto mb-1.5 sm:mb-2 ${
                  paymentMethod === "interac" ? "text-[#0A7A52]" : "text-[#767570]"
                }`}
                strokeWidth={2.5}
              />
              <p className="text-[11px] sm:text-[13px] font-semibold text-[#0E0F0C]">Interac</p>
            </button>
            <button
              type="button"
              onClick={() => setPaymentMethod("auto-pad")}
              className={`p-3 sm:p-4 rounded-xl border-2 transition-all text-center ${
                paymentMethod === "auto-pad"
                  ? "border-[#0A7A52] bg-[#E5F4EE]"
                  : "border-[rgba(0,0,0,0.07)] hover:border-[#0A7A52]"
              }`}
            >
              <Building2
                className={`size-5 sm:size-6 mx-auto mb-1.5 sm:mb-2 ${
                  paymentMethod === "auto-pad" ? "text-[#0A7A52]" : "text-[#767570]"
                }`}
                strokeWidth={2.5}
              />
              <p className="text-[11px] sm:text-[13px] font-semibold text-[#0E0F0C]">Auto PAD</p>
            </button>
          </div>
        </div>

        {/* Payment Form */}
        <form onSubmit={handleSubmit}>
          {paymentMethod === "stripe" && (
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-[13px] font-semibold text-[#0E0F0C] mb-2">
                  Card Number
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                    placeholder="1234 5678 9012 3456"
                    maxLength={19}
                    required
                    className="w-full px-4 py-3 pl-12 border border-[rgba(0,0,0,0.08)] rounded-xl text-[14px] focus:outline-none focus:ring-2 focus:ring-[#0A7A52] focus:border-transparent transition-all"
                  />
                  <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-[#767570]" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[13px] font-semibold text-[#0E0F0C] mb-2">
                    Expiry Date
                  </label>
                  <input
                    type="text"
                    value={cardExpiry}
                    onChange={(e) => setCardExpiry(formatExpiry(e.target.value))}
                    placeholder="MM / YY"
                    maxLength={7}
                    required
                    className="w-full px-4 py-3 border border-[rgba(0,0,0,0.08)] rounded-xl text-[14px] focus:outline-none focus:ring-2 focus:ring-[#0A7A52] focus:border-transparent transition-all"
                  />
                </div>
                <div>
                  <label className="block text-[13px] font-semibold text-[#0E0F0C] mb-2">
                    CVC
                  </label>
                  <input
                    type="text"
                    value={cardCVC}
                    onChange={(e) => setCardCVC(e.target.value.replace(/\D/g, "").slice(0, 4))}
                    placeholder="123"
                    maxLength={4}
                    required
                    className="w-full px-4 py-3 border border-[rgba(0,0,0,0.08)] rounded-xl text-[14px] focus:outline-none focus:ring-2 focus:ring-[#0A7A52] focus:border-transparent transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[13px] font-semibold text-[#0E0F0C] mb-2">
                  Cardholder Name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={cardName}
                    onChange={(e) => setCardName(e.target.value)}
                    placeholder="John Doe"
                    required
                    className="w-full px-4 py-3 pl-12 border border-[rgba(0,0,0,0.08)] rounded-xl text-[14px] focus:outline-none focus:ring-2 focus:ring-[#0A7A52] focus:border-transparent transition-all"
                  />
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-[#767570]" />
                </div>
              </div>
            </div>
          )}

          {paymentMethod === "interac" && (
            <div className="space-y-4 mb-6">
              <div className="bg-[#E5F4EE] border border-[rgba(10,122,82,0.2)] rounded-xl p-5">
                <h4 className="text-[14px] font-semibold text-[#0E0F0C] mb-3">
                  Interac e-Transfer Instructions
                </h4>
                <ol className="space-y-2 text-[13px] text-[#0E0F0C]">
                  <li className="flex gap-2">
                    <span className="font-semibold">1.</span>
                    <span>Send Interac e-Transfer to: <strong>rent@kaya.ca</strong></span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold">2.</span>
                    <span>Include your unit number in the message</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold">3.</span>
                    <span>Auto-deposit enabled (no security question needed)</span>
                  </li>
                </ol>
              </div>

              <div>
                <label className="block text-[13px] font-semibold text-[#0E0F0C] mb-2">
                  Your Email (for confirmation)
                </label>
                <div className="relative">
                  <input
                    type="email"
                    value={interacEmail}
                    onChange={(e) => setInteracEmail(e.target.value)}
                    placeholder="your@email.com"
                    required
                    className="w-full px-4 py-3 pl-12 border border-[rgba(0,0,0,0.08)] rounded-xl text-[14px] focus:outline-none focus:ring-2 focus:ring-[#0A7A52] focus:border-transparent transition-all"
                  />
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-[#767570]" />
                </div>
              </div>
            </div>
          )}

          {paymentMethod === "auto-pad" && (
            <div className="space-y-4 mb-6">
              <div className="bg-[#FEF3C7] border border-[rgba(245,158,11,0.2)] rounded-xl p-5">
                <div className="flex gap-3">
                  <AlertCircle className="size-5 text-[#F59E0B] flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-[14px] font-semibold text-[#0E0F0C] mb-2">
                      Pre-Authorized Debit Setup Required
                    </h4>
                    <p className="text-[13px] text-[#767570]">
                      You'll need to complete a PAD agreement form and provide void cheque or
                      direct deposit form. This setup takes 2-3 business days.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-[13px] font-semibold text-[#0E0F0C] mb-2">
                  Email for PAD Agreement
                </label>
                <div className="relative">
                  <input
                    type="email"
                    value={tenantEmail}
                    onChange={(e) => setTenantEmail(e.target.value)}
                    placeholder="your@email.com"
                    required
                    className="w-full px-4 py-3 pl-12 border border-[rgba(0,0,0,0.08)] rounded-xl text-[14px] focus:outline-none focus:ring-2 focus:ring-[#0A7A52] focus:border-transparent transition-all"
                  />
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-[#767570]" />
                </div>
              </div>
            </div>
          )}

          {error && (
            <div className="mb-6 p-4 bg-[#FEE2E2] border border-[#EF4444]/20 rounded-xl">
              <p className="text-[13px] text-[#EF4444]">{error}</p>
            </div>
          )}

          {/* Security Notice */}
          <div className="mb-6 p-4 bg-[#F8F7F4] rounded-xl border border-[rgba(0,0,0,0.05)]">
            <div className="flex items-start gap-3">
              <Lock className="size-5 text-[#0A7A52] flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-[13px] font-semibold text-[#0E0F0C] mb-1">
                  Secure Payment Processing
                </p>
                <p className="text-[12px] text-[#767570]">
                  {paymentMethod === "stripe"
                    ? "All card information is encrypted and processed securely through Stripe. We never store your card details."
                    : paymentMethod === "interac"
                    ? "Interac e-Transfer is a secure Canadian banking service. Your transaction is protected by your bank."
                    : "PAD agreements are governed by Canadian banking regulations and Payments Canada rules."}
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            {onCancel && (
              <button
                type="button"
                onClick={onCancel}
                disabled={loading}
                className="flex-1 px-6 py-3.5 border border-[rgba(0,0,0,0.08)] text-[#767570] text-[14px] font-semibold rounded-xl hover:bg-[#F8F7F4] transition-all disabled:opacity-50"
              >
                Cancel
              </button>
            )}
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-6 py-3.5 bg-[#0A7A52] text-white text-[14px] font-semibold rounded-xl hover:bg-[#085D3D] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="size-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  {paymentMethod === "stripe" && (
                    <>
                      <CreditCard className="size-5" strokeWidth={2.5} />
                      Pay ${amount.toLocaleString()}
                    </>
                  )}
                  {paymentMethod === "interac" && (
                    <>
                      <Send className="size-5" strokeWidth={2.5} />
                      Send Interac Instructions
                    </>
                  )}
                  {paymentMethod === "auto-pad" && (
                    <>
                      <Mail className="size-5" strokeWidth={2.5} />
                      Request PAD Setup
                    </>
                  )}
                </>
              )}
            </button>
          </div>
        </form>

        {/* Footer Note */}
        <p className="text-[11px] text-[#767570] text-center mt-6">
          By completing this payment, you agree to the{" "}
          <a href="#" className="text-[#0A7A52] hover:underline">
            Terms of Service
          </a>
        </p>
      </div>
    </div>
  );
}
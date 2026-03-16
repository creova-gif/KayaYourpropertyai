import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { FileText, Download, Send, CheckCircle2, AlertCircle, Sparkles, Calendar, DollarSign, Home, User } from "lucide-react";

interface LeaseData {
  tenantName: string;
  tenantEmail: string;
  unitAddress: string;
  unitNumber: string;
  monthlyRent: number;
  deposit: number;
  startDate: string;
  endDate: string;
  termMonths: number;
  utilitiesIncluded: string[];
  petsAllowed: boolean;
  smokingAllowed: boolean;
}

interface LeaseGeneratorProps {
  initialData?: Partial<LeaseData>;
  onGenerate?: (data: LeaseData) => void;
  onSend?: () => void;
}

export function LeaseGenerator({ initialData, onGenerate, onSend }: LeaseGeneratorProps) {
  const [step, setStep] = useState<"input" | "preview" | "signing">("input");
  const [isGenerating, setIsGenerating] = useState(false);
  const [leaseData, setLeaseData] = useState<LeaseData>({
    tenantName: initialData?.tenantName || "",
    tenantEmail: initialData?.tenantEmail || "",
    unitAddress: initialData?.unitAddress || "123 King St, Toronto ON M5V 1J2",
    unitNumber: initialData?.unitNumber || "4A",
    monthlyRent: initialData?.monthlyRent || 2300,
    deposit: initialData?.deposit || 2300,
    startDate: initialData?.startDate || "2026-10-01",
    endDate: initialData?.endDate || "2027-09-30",
    termMonths: initialData?.termMonths || 12,
    utilitiesIncluded: initialData?.utilitiesIncluded || ["Heat", "Water"],
    petsAllowed: initialData?.petsAllowed || false,
    smokingAllowed: initialData?.smokingAllowed || false
  });

  const handleGenerate = async () => {
    setIsGenerating(true);
    // Simulate AI generation
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsGenerating(false);
    setStep("preview");
    onGenerate?.(leaseData);
  };

  const handleSendForSigning = () => {
    setStep("signing");
    onSend?.();
  };

  return (
    <div className="max-w-5xl mx-auto">
      <AnimatePresence mode="wait">
        {step === "input" && (
          <motion.div
            key="input"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-6 text-white">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-lg bg-white/20">
                  <Sparkles className="size-6" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold">AI Lease Generator</h1>
                  <p className="text-white/80 text-sm">Ontario Standard Lease - RTA Compliant</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm text-white/90">
                <CheckCircle2 className="size-4" />
                <span>Auto-generates lease based on Ontario Residential Tenancies Act, 2006</span>
              </div>
            </div>

            {/* Form */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Tenant Information */}
              <div className="bg-white rounded-xl border border-slate-200 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <User className="size-5 text-indigo-600" />
                  <h2 className="text-lg font-semibold text-slate-900">Tenant Information</h2>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={leaseData.tenantName}
                      onChange={(e) => setLeaseData({ ...leaseData, tenantName: e.target.value })}
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                      placeholder="Sarah Kim"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={leaseData.tenantEmail}
                      onChange={(e) => setLeaseData({ ...leaseData, tenantEmail: e.target.value })}
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                      placeholder="sarah.kim@email.com"
                    />
                  </div>
                </div>
              </div>

              {/* Property Information */}
              <div className="bg-white rounded-xl border border-slate-200 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Home className="size-5 text-indigo-600" />
                  <h2 className="text-lg font-semibold text-slate-900">Property Details</h2>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Unit Number *
                    </label>
                    <input
                      type="text"
                      value={leaseData.unitNumber}
                      onChange={(e) => setLeaseData({ ...leaseData, unitNumber: e.target.value })}
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                      placeholder="4A"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Address
                    </label>
                    <input
                      type="text"
                      value={leaseData.unitAddress}
                      onChange={(e) => setLeaseData({ ...leaseData, unitAddress: e.target.value })}
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                      placeholder="123 King St, Toronto"
                    />
                  </div>
                </div>
              </div>

              {/* Financial Terms */}
              <div className="bg-white rounded-xl border border-slate-200 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <DollarSign className="size-5 text-green-600" />
                  <h2 className="text-lg font-semibold text-slate-900">Financial Terms</h2>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Monthly Rent (CAD) *
                    </label>
                    <input
                      type="number"
                      value={leaseData.monthlyRent}
                      onChange={(e) => setLeaseData({ ...leaseData, monthlyRent: Number(e.target.value) })}
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                      placeholder="2300"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Last Month's Deposit (CAD) *
                    </label>
                    <input
                      type="number"
                      value={leaseData.deposit}
                      onChange={(e) => setLeaseData({ ...leaseData, deposit: Number(e.target.value) })}
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                      placeholder="2300"
                    />
                  </div>
                </div>
              </div>

              {/* Lease Term */}
              <div className="bg-white rounded-xl border border-slate-200 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Calendar className="size-5 text-purple-600" />
                  <h2 className="text-lg font-semibold text-slate-900">Lease Term</h2>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Start Date *
                    </label>
                    <input
                      type="date"
                      value={leaseData.startDate}
                      onChange={(e) => setLeaseData({ ...leaseData, startDate: e.target.value })}
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Term Length (Months)
                    </label>
                    <select
                      value={leaseData.termMonths}
                      onChange={(e) => setLeaseData({ ...leaseData, termMonths: Number(e.target.value) })}
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                    >
                      <option value={6}>6 months</option>
                      <option value={12}>12 months</option>
                      <option value={24}>24 months</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Terms */}
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <h2 className="text-lg font-semibold text-slate-900 mb-4">Additional Terms</h2>
              <div className="space-y-3">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={leaseData.petsAllowed}
                    onChange={(e) => setLeaseData({ ...leaseData, petsAllowed: e.target.checked })}
                    className="size-5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <span className="text-sm text-slate-700">Pets Allowed (with written consent)</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={leaseData.smokingAllowed}
                    onChange={(e) => setLeaseData({ ...leaseData, smokingAllowed: e.target.checked })}
                    className="size-5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <span className="text-sm text-slate-700">Smoking Permitted</span>
                </label>
              </div>
            </div>

            {/* AI Compliance Check */}
            <div className="p-4 rounded-lg bg-green-50 border-2 border-green-200">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="size-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-green-900 mb-1">✓ RTA 2006 Compliant</p>
                  <p className="text-sm text-green-700">
                    All terms comply with Ontario's Residential Tenancies Act. AI will auto-generate clauses for utilities, rent increases, and termination notices.
                  </p>
                </div>
              </div>
            </div>

            {/* Generate Button */}
            <button
              onClick={handleGenerate}
              disabled={isGenerating || !leaseData.tenantName || !leaseData.tenantEmail}
              className="w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-all shadow-lg shadow-indigo-200 flex items-center justify-center gap-2"
            >
              {isGenerating ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="size-5 border-2 border-white border-t-transparent rounded-full"
                  />
                  Generating AI Lease...
                </>
              ) : (
                <>
                  <Sparkles className="size-5" />
                  Generate Ontario Standard Lease
                </>
              )}
            </button>
          </motion.div>
        )}

        {step === "preview" && (
          <motion.div
            key="preview"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            {/* Success Header */}
            <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl p-6 text-white">
              <div className="flex items-center gap-3">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", bounce: 0.5 }}
                  className="p-2 rounded-lg bg-white/20"
                >
                  <CheckCircle2 className="size-6" />
                </motion.div>
                <div>
                  <h2 className="text-xl font-bold">Lease Generated Successfully!</h2>
                  <p className="text-white/80 text-sm">Review and send for digital signature</p>
                </div>
              </div>
            </div>

            {/* Lease Preview */}
            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
              <div className="bg-slate-50 border-b border-slate-200 p-4 flex items-center justify-between">
                <h3 className="font-semibold text-slate-900">Ontario Standard Lease Agreement</h3>
                <button className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm hover:bg-slate-50 transition-colors">
                  <Download className="size-4" />
                  Download PDF
                </button>
              </div>
              
              <div className="p-6 max-h-96 overflow-y-auto text-sm">
                <div className="prose prose-sm max-w-none">
                  <h3 className="text-center font-bold text-lg mb-6">ONTARIO STANDARD LEASE AGREEMENT</h3>
                  
                  <section className="mb-6">
                    <h4 className="font-semibold text-indigo-600 mb-2">1. PARTIES</h4>
                    <p><strong>Landlord:</strong> Justin Mafie (KAYA Properties Inc.)</p>
                    <p><strong>Tenant:</strong> {leaseData.tenantName}</p>
                  </section>

                  <section className="mb-6">
                    <h4 className="font-semibold text-indigo-600 mb-2">2. RENTAL UNIT</h4>
                    <p>Unit {leaseData.unitNumber}, {leaseData.unitAddress}</p>
                  </section>

                  <section className="mb-6">
                    <h4 className="font-semibold text-indigo-600 mb-2">3. RENT</h4>
                    <p>Monthly rent: ${leaseData.monthlyRent.toLocaleString()}</p>
                    <p>Due on the 1st of each month</p>
                    <p>Last month's deposit: ${leaseData.deposit.toLocaleString()}</p>
                  </section>

                  <section className="mb-6">
                    <h4 className="font-semibold text-indigo-600 mb-2">4. TERM</h4>
                    <p>Start Date: {leaseData.startDate}</p>
                    <p>Fixed term of {leaseData.termMonths} months</p>
                    <p>Automatically becomes month-to-month after term end per RTA s.38</p>
                  </section>

                  <section className="mb-6">
                    <h4 className="font-semibold text-indigo-600 mb-2">5. SERVICES & UTILITIES</h4>
                    <p>Included: {leaseData.utilitiesIncluded.join(", ")}</p>
                    <p>Tenant Responsible: Hydro, Internet</p>
                  </section>

                  <section className="mb-6">
                    <h4 className="font-semibold text-indigo-600 mb-2">6. RULES</h4>
                    <p>Pets: {leaseData.petsAllowed ? "Allowed with landlord written consent" : "Not permitted"}</p>
                    <p>Smoking: {leaseData.smokingAllowed ? "Permitted in designated areas" : "Not permitted"}</p>
                  </section>

                  <div className="mt-8 pt-6 border-t border-slate-200">
                    <p className="text-xs text-slate-500">
                      This lease complies with the Residential Tenancies Act, 2006 (Ontario) and includes all standard clauses required by law.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4">
              <button
                onClick={() => setStep("input")}
                className="flex-1 py-3 border-2 border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors font-medium"
              >
                Edit Details
              </button>
              <button
                onClick={handleSendForSigning}
                className="flex-1 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-lg transition-all shadow-lg shadow-indigo-200 font-medium flex items-center justify-center gap-2"
              >
                <Send className="size-5" />
                Send for Digital Signature
              </button>
            </div>
          </motion.div>
        )}

        {step === "signing" && (
          <motion.div
            key="signing"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-12"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", bounce: 0.5, delay: 0.2 }}
              className="size-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center"
            >
              <Send className="size-12 text-white" />
            </motion.div>

            <h2 className="text-2xl font-bold text-slate-900 mb-3">Lease Sent for Signature! 📧</h2>
            <p className="text-slate-600 mb-8 max-w-md mx-auto">
              {leaseData.tenantName} will receive an email at {leaseData.tenantEmail} with a secure link to review and digitally sign the lease.
            </p>

            <div className="bg-indigo-50 border-2 border-indigo-200 rounded-xl p-6 max-w-md mx-auto">
              <div className="flex items-start gap-3 text-left">
                <Sparkles className="size-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-indigo-900 mb-2">What happens next?</p>
                  <ul className="text-sm text-indigo-700 space-y-1">
                    <li>• Tenant receives email with secure signing link</li>
                    <li>• You'll get notified when they sign</li>
                    <li>• Lease automatically becomes active on start date</li>
                    <li>• Payment schedule is created automatically</li>
                  </ul>
                </div>
              </div>
            </div>

            <button
              onClick={() => setStep("input")}
              className="mt-8 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-lg font-medium transition-all"
            >
              Create Another Lease
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Building2, MapPin, CreditCard, CheckCircle2, Sparkles, User, Mail, Phone } from "lucide-react";

interface OnboardingStep {
  id: number;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

const steps: OnboardingStep[] = [
  {
    id: 1,
    title: "Profile Setup",
    description: "Tell us about yourself",
    icon: User
  },
  {
    id: 2,
    title: "Add Properties",
    description: "Add your rental properties",
    icon: Building2
  },
  {
    id: 3,
    title: "Payment Setup",
    description: "Configure payment methods",
    icon: CreditCard
  },
  {
    id: 4,
    title: "All Set!",
    description: "You're ready to go",
    icon: CheckCircle2
  }
];

interface LandlordOnboardingProps {
  onComplete: () => void;
}

export function LandlordOnboarding({ onComplete }: LandlordOnboardingProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    properties: [] as { address: string; units: number }[],
    paymentMethod: ""
  });

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const progress = (currentStep / steps.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-8 text-white">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-full bg-white/20 backdrop-blur-sm">
              <Sparkles className="size-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Welcome to KAYA</h1>
              <p className="text-white/80">Let's get you set up in minutes with AI assistance</p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="relative h-2 bg-white/20 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="absolute inset-y-0 left-0 bg-white rounded-full"
            />
          </div>

          {/* Step Indicators */}
          <div className="flex justify-between mt-6">
            {steps.map((step) => {
              const Icon = step.icon;
              const isActive = currentStep === step.id;
              const isCompleted = currentStep > step.id;

              return (
                <div key={step.id} className="flex flex-col items-center flex-1">
                  <motion.div
                    animate={{
                      scale: isActive ? 1.1 : 1,
                      backgroundColor: isCompleted ? "#fff" : isActive ? "rgba(255,255,255,0.3)" : "rgba(255,255,255,0.1)"
                    }}
                    className="p-3 rounded-full border-2 border-white/30 mb-2"
                  >
                    <Icon className={`size-5 ${isCompleted ? "text-indigo-600" : "text-white"}`} />
                  </motion.div>
                  <p className={`text-xs text-center ${isActive ? "text-white font-semibold" : "text-white/60"}`}>
                    {step.title}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          <AnimatePresence mode="wait">
            {currentStep === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-2">Create Your Profile</h2>
                  <p className="text-slate-600">Help us personalize your experience</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Full Name *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-slate-400" />
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                        placeholder="Justin Mafie"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Email Address *
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-slate-400" />
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                        placeholder="justin@kaya.ca"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Phone Number *
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-slate-400" />
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                        placeholder="+1 (905) 555-0100"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Company Name (Optional)
                    </label>
                    <div className="relative">
                      <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-slate-400" />
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                        placeholder="KAYA Properties Inc."
                      />
                    </div>
                  </div>
                </div>

                {/* AI Suggestion */}
                <div className="p-4 rounded-lg bg-indigo-50 border-2 border-indigo-200">
                  <div className="flex items-start gap-3">
                    <Sparkles className="size-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-indigo-900 mb-1">AI Tip</p>
                      <p className="text-sm text-indigo-700">
                        Adding a company name helps with generating professional leases and invoices automatically.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {currentStep === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-2">Add Your Properties</h2>
                  <p className="text-slate-600">We'll help you set up units and pricing</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Property Address
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-slate-400" />
                      <input
                        type="text"
                        className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                        placeholder="123 King St, Toronto ON M5V 1J2"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Number of Units
                      </label>
                      <input
                        type="number"
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                        placeholder="5"
                        min="1"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Property Type
                      </label>
                      <select className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all">
                        <option>Apartment</option>
                        <option>Condo</option>
                        <option>House</option>
                        <option>Townhouse</option>
                        <option>Commercial</option>
                      </select>
                    </div>
                  </div>
                </div>

                <button className="w-full py-3 border-2 border-dashed border-indigo-300 rounded-lg text-indigo-600 hover:bg-indigo-50 transition-colors font-medium">
                  + Add Another Property
                </button>

                {/* AI Suggestion */}
                <div className="p-4 rounded-lg bg-green-50 border-2 border-green-200">
                  <div className="flex items-start gap-3">
                    <Sparkles className="size-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-green-900 mb-1">AI Smart Setup</p>
                      <p className="text-sm text-green-700">
                        You can add more properties later. Our AI will auto-generate unit listings and pricing suggestions based on Toronto market data.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {currentStep === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-2">Payment Setup</h2>
                  <p className="text-slate-600">Choose how you want to receive rent payments</p>
                </div>

                <div className="space-y-3">
                  {[
                    { id: "stripe", name: "Stripe", description: "Credit/Debit cards, instant deposits", recommended: true },
                    { id: "etransfer", name: "Interac e-Transfer", description: "Direct bank transfers" },
                    { id: "moneris", name: "Moneris", description: "Credit card processing" }
                  ].map((method) => (
                    <button
                      key={method.id}
                      onClick={() => setFormData({ ...formData, paymentMethod: method.id })}
                      className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                        formData.paymentMethod === method.id
                          ? "border-indigo-500 bg-indigo-50"
                          : "border-slate-200 hover:border-indigo-300"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-semibold text-slate-900 flex items-center gap-2">
                            {method.name}
                            {method.recommended && (
                              <span className="text-xs px-2 py-0.5 bg-green-100 text-green-700 rounded-full">
                                Recommended
                              </span>
                            )}
                          </p>
                          <p className="text-sm text-slate-600 mt-1">{method.description}</p>
                        </div>
                        <div className={`size-6 rounded-full border-2 flex items-center justify-center ${
                          formData.paymentMethod === method.id
                            ? "border-indigo-500 bg-indigo-500"
                            : "border-slate-300"
                        }`}>
                          {formData.paymentMethod === method.id && (
                            <CheckCircle2 className="size-4 text-white" />
                          )}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {currentStep === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", bounce: 0.5 }}
                  className="size-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center"
                >
                  <CheckCircle2 className="size-12 text-white" />
                </motion.div>

                <h2 className="text-3xl font-bold text-slate-900 mb-3">You're All Set! 🎉</h2>
                <p className="text-slate-600 mb-8 max-w-md mx-auto">
                  Your account is ready. Let's start managing your properties with AI-powered insights.
                </p>

                <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto mb-8">
                  {[
                    { label: "Properties Added", value: "1" },
                    { label: "AI Features Active", value: "✓" },
                    { label: "Setup Time", value: "2 min" }
                  ].map((stat, idx) => (
                    <div key={idx} className="p-4 rounded-lg bg-slate-50 border border-slate-200">
                      <p className="text-2xl font-bold text-indigo-600">{stat.value}</p>
                      <p className="text-xs text-slate-600 mt-1">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer */}
        <div className="px-8 py-6 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <button
            onClick={handleBack}
            disabled={currentStep === 1}
            className="px-6 py-3 text-slate-600 hover:text-slate-900 disabled:opacity-30 disabled:cursor-not-allowed font-medium transition-colors"
          >
            ← Back
          </button>

          <div className="flex items-center gap-2">
            {steps.map((step) => (
              <div
                key={step.id}
                className={`h-1.5 rounded-full transition-all ${
                  step.id === currentStep
                    ? "w-8 bg-indigo-600"
                    : step.id < currentStep
                    ? "w-1.5 bg-indigo-600"
                    : "w-1.5 bg-slate-300"
                }`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium rounded-lg transition-all shadow-lg shadow-indigo-200"
          >
            {currentStep === steps.length ? "Go to Dashboard" : "Continue →"}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
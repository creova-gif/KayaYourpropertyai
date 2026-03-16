import { motion } from "motion/react";
import { CheckCircle2, Circle, Clock, Upload, FileText, UserCheck, Home } from "lucide-react";

interface Step {
  id: string;
  title: string;
  description: string;
  status: "completed" | "current" | "upcoming";
  icon: React.ComponentType<{ className?: string }>;
}

export function TenantApplicationProgress() {
  const steps: Step[] = [
    {
      id: "1",
      title: "Create Account",
      description: "Set up your tenant profile",
      status: "completed",
      icon: UserCheck
    },
    {
      id: "2",
      title: "Upload Documents",
      description: "ID, pay stubs, references",
      status: "completed",
      icon: Upload
    },
    {
      id: "3",
      title: "AI Verification",
      description: "Documents being verified",
      status: "current",
      icon: FileText
    },
    {
      id: "4",
      title: "Landlord Review",
      description: "Application under review",
      status: "upcoming",
      icon: Clock
    },
    {
      id: "5",
      title: "Move In",
      description: "Sign lease and get keys",
      status: "upcoming",
      icon: Home
    }
  ];

  const currentStepIndex = steps.findIndex(s => s.status === "current");
  const progress = ((currentStepIndex + 1) / steps.length) * 100;

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold text-slate-900">Application Progress</h3>
          <span className="text-sm font-medium text-indigo-600">{Math.round(progress)}% Complete</span>
        </div>

        {/* Progress Bar */}
        <div className="relative w-full h-3 bg-slate-100 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="absolute inset-y-0 left-0 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full"
          />
          
          {/* Shimmer Effect */}
          <motion.div
            animate={{ x: ["0%", "200%"] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="absolute inset-y-0 w-20 bg-gradient-to-r from-transparent via-white/30 to-transparent"
          />
        </div>
      </div>

      {/* Steps */}
      <div className="space-y-4">
        {steps.map((step, idx) => {
          const Icon = step.icon;
          const isCompleted = step.status === "completed";
          const isCurrent = step.status === "current";

          return (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="relative"
            >
              <div className={`flex items-start gap-4 p-4 rounded-lg transition-all ${
                isCurrent 
                  ? "bg-indigo-50 border-2 border-indigo-200" 
                  : isCompleted 
                  ? "bg-green-50 border border-green-200" 
                  : "bg-slate-50 border border-slate-200"
              }`}>
                {/* Icon */}
                <div className={`p-3 rounded-full ${
                  isCompleted 
                    ? "bg-green-100" 
                    : isCurrent 
                    ? "bg-indigo-100" 
                    : "bg-slate-200"
                }`}>
                  {isCompleted ? (
                    <CheckCircle2 className="size-6 text-green-600" />
                  ) : isCurrent ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    >
                      <Icon className="size-6 text-indigo-600" />
                    </motion.div>
                  ) : (
                    <Circle className="size-6 text-slate-400" />
                  )}
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h4 className={`font-semibold mb-1 ${
                    isCurrent ? "text-indigo-900" : isCompleted ? "text-green-900" : "text-slate-500"
                  }`}>
                    {step.title}
                  </h4>
                  <p className={`text-sm ${
                    isCurrent ? "text-indigo-700" : isCompleted ? "text-green-700" : "text-slate-500"
                  }`}>
                    {step.description}
                  </p>

                  {/* Current Step Animation */}
                  {isCurrent && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-3"
                    >
                      <div className="flex items-center gap-2 text-sm text-indigo-600">
                        <div className="flex gap-1">
                          <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 1, repeat: Infinity, delay: 0 }}
                            className="size-2 rounded-full bg-indigo-600"
                          />
                          <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                            className="size-2 rounded-full bg-indigo-600"
                          />
                          <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                            className="size-2 rounded-full bg-indigo-600"
                          />
                        </div>
                        <span>AI is processing...</span>
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* Step Number */}
                <div className={`text-2xl font-bold ${
                  isCompleted ? "text-green-600" : isCurrent ? "text-indigo-600" : "text-slate-300"
                }`}>
                  {idx + 1}
                </div>
              </div>

              {/* Connector Line */}
              {idx < steps.length - 1 && (
                <div className="absolute left-9 top-[72px] w-0.5 h-4 bg-slate-200" />
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Next Action */}
      <div className="mt-6 pt-6 border-t border-slate-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-600 mb-1">Next Step</p>
            <p className="font-semibold text-slate-900">Wait for AI verification to complete</p>
          </div>
          <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium transition-colors">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}

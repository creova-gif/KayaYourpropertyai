import { CheckCircle, Circle, Clock, FileText, Sparkles, UserCheck, FileSignature } from "lucide-react";
import { motion } from "motion/react";

interface TimelineStep {
  id: string;
  label: string;
  status: "completed" | "current" | "pending";
  timestamp?: string;
  icon: any;
}

interface ApplicationTimelineProps {
  currentStep: number;
}

export function ApplicationTimeline({ currentStep }: ApplicationTimelineProps) {
  const steps: TimelineStep[] = [
    {
      id: "submitted",
      label: "Application Submitted",
      status: currentStep >= 0 ? "completed" : "pending",
      timestamp: "Mar 14, 2026 - 10:30 AM",
      icon: FileText,
    },
    {
      id: "documents",
      label: "Documents Verified",
      status: currentStep >= 1 ? "completed" : currentStep === 0 ? "current" : "pending",
      timestamp: currentStep >= 1 ? "Mar 14, 2026 - 11:15 AM" : undefined,
      icon: FileText,
    },
    {
      id: "ai-screening",
      label: "AI Risk Analysis",
      status: currentStep >= 2 ? "completed" : currentStep === 1 ? "current" : "pending",
      timestamp: currentStep >= 2 ? "Mar 14, 2026 - 11:20 AM" : undefined,
      icon: Sparkles,
    },
    {
      id: "landlord-review",
      label: "Landlord Review",
      status: currentStep >= 3 ? "completed" : currentStep === 2 ? "current" : "pending",
      timestamp: currentStep >= 3 ? "Mar 14, 2026 - 2:45 PM" : undefined,
      icon: UserCheck,
    },
    {
      id: "lease-signing",
      label: "Lease Signing",
      status: currentStep >= 4 ? "completed" : currentStep === 3 ? "current" : "pending",
      timestamp: currentStep >= 4 ? "Mar 15, 2026 - 9:00 AM" : undefined,
      icon: FileSignature,
    },
  ];

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6">
      <h3 className="font-semibold text-slate-900 mb-6">Application Timeline</h3>

      <div className="relative">
        {/* Vertical Line */}
        <div className="absolute left-[15px] top-8 bottom-8 w-0.5 bg-slate-200" />

        <div className="space-y-6">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            const isLast = idx === steps.length - 1;

            return (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="relative flex items-start gap-4"
              >
                {/* Icon Circle */}
                <div className="relative z-10">
                  {step.status === "completed" ? (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="size-8 rounded-full bg-green-600 flex items-center justify-center"
                    >
                      <CheckCircle className="size-5 text-white" />
                    </motion.div>
                  ) : step.status === "current" ? (
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                      className="size-8 rounded-full bg-indigo-600 flex items-center justify-center"
                    >
                      <Icon className="size-5 text-white" />
                    </motion.div>
                  ) : (
                    <div className="size-8 rounded-full border-2 border-slate-300 bg-white flex items-center justify-center">
                      <Circle className="size-5 text-slate-300" />
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 pt-1">
                  <h4
                    className={`font-medium ${
                      step.status === "completed" || step.status === "current"
                        ? "text-slate-900"
                        : "text-slate-400"
                    }`}
                  >
                    {step.label}
                  </h4>
                  {step.timestamp && (
                    <div className="flex items-center gap-2 mt-1 text-sm text-slate-500">
                      <Clock className="size-3" />
                      <span>{step.timestamp}</span>
                    </div>
                  )}

                  {/* Current Step Details */}
                  {step.status === "current" && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="mt-3 p-3 bg-indigo-50 rounded-lg border border-indigo-200"
                    >
                      <p className="text-sm text-indigo-900 font-medium">
                        {step.id === "documents" && "Verifying uploaded documents..."}
                        {step.id === "ai-screening" && "AI analyzing application..."}
                        {step.id === "landlord-review" && "Awaiting your decision"}
                        {step.id === "lease-signing" && "Waiting for tenant signature"}
                      </p>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";

interface TutorialStep {
  id: string;
  title: string;
  description: string;
  target?: string; // CSS selector for the element to highlight
  position: "top" | "bottom" | "left" | "right";
  action?: string;
}

interface InteractiveTutorialProps {
  steps: TutorialStep[];
  onComplete: () => void;
  onSkip: () => void;
  startAutomatically?: boolean;
}

export function InteractiveTutorial({ 
  steps, 
  onComplete, 
  onSkip,
  startAutomatically = true 
}: InteractiveTutorialProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isActive, setIsActive] = useState(startAutomatically);
  const [targetRect, setTargetRect] = useState<DOMRect | null>(null);

  useEffect(() => {
    if (isActive && steps[currentStep]?.target) {
      const element = document.querySelector(steps[currentStep].target!);
      if (element) {
        const rect = element.getBoundingClientRect();
        setTargetRect(rect);
        
        // Scroll element into view
        element.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  }, [currentStep, isActive, steps]);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  const handleComplete = () => {
    setIsActive(false);
    onComplete();
  };

  const handleSkip = () => {
    setIsActive(false);
    onSkip();
  };

  if (!isActive) return null;

  const step = steps[currentStep];
  const progress = ((currentStep + 1) / steps.length) * 100;

  return (
    <>
      {/* Overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
        onClick={handleSkip}
      />

      {/* Highlight Spotlight */}
      {targetRect && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed z-40 pointer-events-none"
          style={{
            top: targetRect.top - 8,
            left: targetRect.left - 8,
            width: targetRect.width + 16,
            height: targetRect.height + 16,
            boxShadow: "0 0 0 4px rgba(99, 102, 241, 0.5), 0 0 0 9999px rgba(0, 0, 0, 0.6)",
            borderRadius: "12px",
          }}
        />
      )}

      {/* Tutorial Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          className="fixed z-50 bg-white rounded-xl shadow-2xl max-w-md w-full"
          style={{
            top: targetRect 
              ? step.position === "bottom" 
                ? targetRect.bottom + 16
                : step.position === "top"
                ? targetRect.top - 240
                : targetRect.top
              : "50%",
            left: targetRect
              ? step.position === "right"
                ? targetRect.right + 16
                : step.position === "left"
                ? targetRect.left - 400
                : targetRect.left
              : "50%",
            transform: !targetRect ? "translate(-50%, -50%)" : undefined,
          }}
        >
          {/* Progress Bar */}
          <div className="h-1 bg-slate-200 rounded-t-xl overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              className="h-full bg-gradient-to-r from-indigo-500 to-purple-600"
            />
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-gradient-to-br from-indigo-100 to-purple-100">
                  <Sparkles className="size-5 text-indigo-600" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-slate-900">{step.title}</h3>
                    <span className="text-xs px-2 py-0.5 bg-indigo-100 text-indigo-700 rounded-full">
                      {currentStep + 1}/{steps.length}
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={handleSkip}
                className="p-1 rounded-lg hover:bg-slate-100 transition-colors"
              >
                <X className="size-4 text-slate-400" />
              </button>
            </div>

            <p className="text-slate-600 mb-6 leading-relaxed">
              {step.description}
            </p>

            {step.action && (
              <div className="mb-6 p-3 rounded-lg bg-indigo-50 border border-indigo-200">
                <p className="text-sm text-indigo-700">
                  <strong>Try it:</strong> {step.action}
                </p>
              </div>
            )}

            {/* Navigation */}
            <div className="flex items-center justify-between">
              <div className="flex gap-1">
                {steps.map((_, idx) => (
                  <div
                    key={idx}
                    className={`h-1.5 rounded-full transition-all ${
                      idx === currentStep
                        ? "w-6 bg-indigo-600"
                        : idx < currentStep
                        ? "w-1.5 bg-indigo-600"
                        : "w-1.5 bg-slate-300"
                    }`}
                  />
                ))}
              </div>

              <div className="flex gap-2">
                {currentStep > 0 && (
                  <button
                    onClick={() => setCurrentStep(currentStep - 1)}
                    className="px-4 py-2 text-sm text-slate-600 hover:text-slate-900 font-medium transition-colors"
                  >
                    Back
                  </button>
                )}
                <button
                  onClick={handleNext}
                  className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-lg text-sm font-medium transition-all shadow-lg shadow-indigo-200 flex items-center gap-2"
                >
                  {currentStep === steps.length - 1 ? (
                    <>
                      <CheckCircle2 className="size-4" />
                      Complete
                    </>
                  ) : (
                    <>
                      Next
                      <ArrowRight className="size-4" />
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </>
  );
}

// Tutorial presets for different sections
export const dashboardTutorial: TutorialStep[] = [
  {
    id: "welcome",
    title: "Welcome to KAYA! 🎉",
    description: "Let's take a quick tour of your AI-powered property management dashboard. This will only take 2 minutes.",
    position: "bottom"
  },
  {
    id: "stats",
    title: "Quick Stats Overview",
    description: "These cards show your key metrics at a glance: total units, occupancy rate, pending applications, and monthly revenue.",
    position: "bottom",
    action: "Click on any stat card to see detailed breakdowns"
  },
  {
    id: "ai-coach",
    title: "AI Coach Suggestions",
    description: "Your AI coach analyzes your properties and provides actionable recommendations to save you time and maximize revenue.",
    position: "bottom",
    action: "Try clicking on a suggestion to take action"
  },
  {
    id: "applications",
    title: "Recent Applications",
    description: "View tenant applications with AI risk scores. Green = low risk, Yellow = medium, Red = high risk. Our AI screens applications in seconds!",
    position: "top"
  },
  {
    id: "voice",
    title: "Voice AI Assistant",
    description: "Click the 'Voice AI' button in the sidebar to ask questions like 'Show me high-risk tenants' or 'What's my total revenue?'",
    position: "right"
  }
];

export const applicationsTutorial: TutorialStep[] = [
  {
    id: "swipe",
    title: "Swipe to Review Applications",
    description: "Swipe right to approve or left to reject applications. It's that simple! Our AI has already pre-screened every applicant.",
    position: "bottom",
    action: "Try swiping on an application card"
  },
  {
    id: "ai-score",
    title: "AI Risk Score",
    description: "Each application has an AI-calculated risk score based on income, credit, employment, and fraud detection. Higher is better!",
    position: "bottom"
  },
  {
    id: "details",
    title: "View Full Details",
    description: "Click 'View Details' to see the complete AI screening report, documents, and tenant information.",
    position: "bottom"
  }
];
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, X, ChevronRight, Lightbulb } from "lucide-react";
import { useState, useEffect } from "react";

interface AIContextualHelperProps {
  context: string;
  suggestions: string[];
  onSuggestionClick?: (suggestion: string) => void;
  position?: "top-right" | "bottom-right" | "bottom-left" | "top-left";
  sessionKey?: string;
}

export function AIContextualHelper({ 
  context, 
  suggestions, 
  onSuggestionClick,
  position = "top-right",
  sessionKey = "ai-helper-shown",
}: AIContextualHelperProps) {
  const alreadySeen = sessionStorage.getItem(sessionKey) === "1";
  const [isVisible, setIsVisible] = useState(!alreadySeen);
  const [isDismissed, setIsDismissed] = useState(alreadySeen);

  useEffect(() => {
    if (!alreadySeen) {
      sessionStorage.setItem(sessionKey, "1");
    }
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    setTimeout(() => setIsDismissed(true), 300);
  };

  const handleSuggestionClick = (suggestion: string) => {
    if (onSuggestionClick) {
      onSuggestionClick(suggestion);
    } else {
      const event = new CustomEvent('openAIWithQuery', { detail: { query: suggestion } });
      window.dispatchEvent(event);
    }
    handleDismiss();
  };

  if (isDismissed) return null;

  const positionClasses = {
    "top-right": "top-[72px] right-4",
    "bottom-right": "bottom-4 right-4",
    "bottom-left": "bottom-4 left-4",
    "top-left": "top-[72px] left-4"
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: -8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: -8 }}
          transition={{ duration: 0.18 }}
          className={`fixed ${positionClasses[position]} z-40 w-72 max-w-[calc(100vw-2rem)]`}
          style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}
        >
          <div className="bg-white rounded-2xl shadow-2xl border border-[rgba(0,0,0,0.08)] overflow-hidden">
            <div className="px-4 py-3 bg-gradient-to-r from-[#0A7A52] to-[#085D3D] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="size-4 text-white" strokeWidth={2.5} />
                <h3 className="text-sm font-semibold text-white">AI Suggestions</h3>
              </div>
              <button
                onClick={handleDismiss}
                className="p-1 rounded-lg hover:bg-white/10 transition-colors"
                aria-label="Dismiss"
              >
                <X className="size-4 text-white" strokeWidth={2.5} />
              </button>
            </div>

            <div className="p-4">
              <div className="flex items-start gap-2 mb-3">
                <div className="size-8 rounded-lg bg-[#E5F4EE] flex items-center justify-center flex-shrink-0">
                  <Lightbulb className="size-4 text-[#0A7A52]" strokeWidth={2.5} />
                </div>
                <div>
                  <p className="text-xs font-medium text-[#0A7A52] uppercase tracking-wide mb-1">
                    {context}
                  </p>
                  <p className="text-xs text-[#767570]">
                    Try these AI-powered actions:
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                {suggestions.map((suggestion, idx) => (
                  <motion.button
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="w-full flex items-center justify-between gap-2 px-3 py-2.5 bg-[#F8F7F4] hover:bg-[#E5F4EE] border border-[rgba(0,0,0,0.05)] rounded-lg transition-all duration-200 text-left group"
                  >
                    <span className="text-sm text-[#0E0F0C] flex-1">{suggestion}</span>
                    <ChevronRight className="size-4 text-[#0A7A52] opacity-0 group-hover:opacity-100 transition-opacity" strokeWidth={2.5} />
                  </motion.button>
                ))}
              </div>

              <div className="mt-3 pt-3 border-t border-[rgba(0,0,0,0.05)]">
                <p className="text-xs text-[#767570] text-center">
                  Press <kbd className="px-1.5 py-0.5 bg-white rounded border border-[rgba(0,0,0,0.08)] font-mono">⌘K</kbd> or <kbd className="px-1.5 py-0.5 bg-white rounded border border-[rgba(0,0,0,0.08)] font-mono">Ctrl+K</kbd> to open AI command palette
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

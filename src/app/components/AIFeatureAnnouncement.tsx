import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, X, Zap, Command } from "lucide-react";

export function AIFeatureAnnouncement() {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    // Check if user has already seen this announcement
    const hasSeenAnnouncement = localStorage.getItem('hasSeenAIAnnouncement');
    
    if (!hasSeenAnnouncement) {
      // Show after a short delay
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 2000);

      return () => clearTimeout(timer);
    } else {
      setIsDismissed(true);
    }
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem('hasSeenAIAnnouncement', 'true');
    setTimeout(() => setIsDismissed(true), 300);
  };

  if (isDismissed) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.9 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed bottom-6 left-6 z-50 max-w-md"
          style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}
        >
          <div className="bg-white rounded-2xl shadow-2xl border border-[rgba(0,0,0,0.08)] overflow-hidden">
            {/* Header */}
            <div className="px-6 py-4 bg-gradient-to-r from-[#0A7A52] to-[#085D3D] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="size-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <Sparkles className="size-5 text-white" strokeWidth={2.5} />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white">AI Features Enhanced!</h3>
                  <p className="text-xs text-white/80">Powered by Claude 3.5 Sonnet</p>
                </div>
              </div>
              <button
                onClick={handleDismiss}
                className="p-1.5 rounded-lg hover:bg-white/10 transition-colors"
                aria-label="Dismiss"
              >
                <X className="size-4 text-white" strokeWidth={2.5} />
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              <p className="text-sm text-[#0E0F0C] mb-4 leading-relaxed">
                Your KAYA platform now has <strong>deep AI integration</strong> across every page!
              </p>

              <div className="space-y-3 mb-4">
                <div className="flex items-start gap-3">
                  <div className="size-8 rounded-lg bg-[#E5F4EE] flex items-center justify-center flex-shrink-0">
                    <Sparkles className="size-4 text-[#0A7A52]" strokeWidth={2.5} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[#0E0F0C]">Global AI Assistant</p>
                    <p className="text-xs text-[#767570]">Click the floating button (bottom-right) on any page</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="size-8 rounded-lg bg-[#E5F4EE] flex items-center justify-center flex-shrink-0">
                    <Command className="size-4 text-[#0A7A52]" strokeWidth={2.5} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[#0E0F0C]">Command Palette</p>
                    <p className="text-xs text-[#767570]">Press <kbd className="px-1.5 py-0.5 bg-[#F8F7F4] rounded border border-[rgba(0,0,0,0.08)] font-mono text-[10px]">⌘K</kbd> or <kbd className="px-1.5 py-0.5 bg-[#F8F7F4] rounded border border-[rgba(0,0,0,0.08)] font-mono text-[10px]">Ctrl+K</kbd> anywhere</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="size-8 rounded-lg bg-[#E5F4EE] flex items-center justify-center flex-shrink-0">
                    <Zap className="size-4 text-[#0A7A52]" strokeWidth={2.5} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[#0E0F0C]">Smart Suggestions</p>
                    <p className="text-xs text-[#767570]">Context-aware AI help on Dashboard, Applications, and more</p>
                  </div>
                </div>
              </div>

              <button
                onClick={handleDismiss}
                className="w-full px-4 py-2.5 bg-[#0A7A52] hover:bg-[#085D3D] text-white rounded-lg text-sm font-medium transition-colors"
              >
                Got it, thanks!
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

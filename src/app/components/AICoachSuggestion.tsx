import { motion } from "motion/react";
import { Sparkles, ArrowRight, X } from "lucide-react";
import { useState } from "react";

interface AICoachSuggestionProps {
  suggestions: Array<{
    title: string;
    description: string;
    action: string;
    priority: "high" | "medium" | "low";
  }>;
}

export function AICoachSuggestion({ suggestions }: AICoachSuggestionProps) {
  const [dismissed, setDismissed] = useState<number[]>([]);

  const priorityColors = {
    high: { bg: "bg-red-50", border: "border-red-200", text: "text-red-700" },
    medium: { bg: "bg-amber-50", border: "border-amber-200", text: "text-amber-700" },
    low: { bg: "bg-blue-50", border: "border-blue-200", text: "text-blue-700" }
  };

  const activeSuggestions = suggestions.filter((_, idx) => !dismissed.includes(idx));

  if (activeSuggestions.length === 0) return null;

  return (
    <div className="space-y-3">
      {activeSuggestions.map((suggestion, idx) => {
        const actualIdx = suggestions.indexOf(suggestion);
        const colors = priorityColors[suggestion.priority];
        
        return (
          <motion.div
            key={actualIdx}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ delay: idx * 0.1 }}
            className={`${colors.bg} ${colors.border} border-2 rounded-xl p-4 relative group`}
          >
            <button
              onClick={() => setDismissed([...dismissed, actualIdx])}
              className="absolute top-3 right-3 p-1 rounded-lg hover:bg-white/50 transition-colors opacity-0 group-hover:opacity-100"
            >
              <X className="size-4 text-slate-600" />
            </button>

            <div className="flex items-start gap-3">
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="p-2 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex-shrink-0"
              >
                <Sparkles className="size-4 text-white" />
              </motion.div>

              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-semibold text-slate-900">{suggestion.title}</h4>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${colors.text} bg-white/50`}>
                    {suggestion.priority}
                  </span>
                </div>
                <p className="text-sm text-slate-600 mb-3">{suggestion.description}</p>
                
                <motion.button
                  whileHover={{ x: 5 }}
                  className="flex items-center gap-2 text-sm font-medium text-indigo-600 hover:text-indigo-700"
                >
                  {suggestion.action}
                  <ArrowRight className="size-4" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

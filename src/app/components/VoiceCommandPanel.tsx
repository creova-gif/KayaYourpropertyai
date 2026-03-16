import { motion, AnimatePresence } from "motion/react";
import { Mic, X, Sparkles, TrendingUp, Users, AlertTriangle } from "lucide-react";
import { useState, useEffect } from "react";

interface VoiceCommandPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export function VoiceCommandPanel({ isOpen, onClose }: VoiceCommandPanelProps) {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [response, setResponse] = useState<string | null>(null);
  const [suggestions, setSuggestions] = useState([
    "Show me high-risk tenants",
    "What's my total revenue this month?",
    "Show maintenance requests",
    "List pending applications"
  ]);

  useEffect(() => {
    if (isOpen) {
      setIsListening(false);
      setTranscript("");
      setResponse(null);
    }
  }, [isOpen]);

  const handleStartListening = () => {
    setIsListening(true);
    // Simulate voice recognition
    setTimeout(() => {
      const command = "Show me high-risk tenants across all properties";
      setTranscript(command);
      setIsListening(false);
      
      // Simulate AI processing
      setTimeout(() => {
        setResponse("Found 2 high-risk tenants: Bob Johnson (Unit 3A) with 78% risk score due to late payments, and Jason Lee (Unit 1C) with 65% risk score due to upcoming lease end.");
      }, 1000);
    }, 2500);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setTranscript(suggestion);
    setIsListening(false);
    
    // Simulate AI response
    setTimeout(() => {
      if (suggestion.includes("revenue")) {
        setResponse("Your total revenue this month is $27,600, which is 12% higher than last month. All 10 occupied units have paid on time.");
      } else if (suggestion.includes("maintenance")) {
        setResponse("You have 5 maintenance requests: 2 open, 2 in progress, and 1 completed. The highest priority is 'Heating issue' in Unit 1A.");
      } else if (suggestion.includes("applications")) {
        setResponse("You have 6 pending applications. AI recommends approving Sarah Kim (score: 92) and Michael Patel (score: 87) immediately.");
      } else {
        setResponse("Found 2 high-risk tenants based on payment history and lease status. Recommend reviewing their accounts.");
      }
    }, 1000);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-full bg-white/20 backdrop-blur-sm">
                  <Sparkles className="size-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">Voice AI Assistant</h2>
                  <p className="text-white/80 text-sm">Speak or type your command</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-white/10 transition-colors"
              >
                <X className="size-6 text-white" />
              </button>
            </div>

            {/* Voice Input Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleStartListening}
              disabled={isListening}
              className={`w-full py-6 rounded-xl font-semibold text-lg transition-all ${
                isListening
                  ? "bg-red-500 text-white"
                  : "bg-white text-indigo-600 hover:bg-white/90"
              }`}
            >
              <div className="flex items-center justify-center gap-3">
                <motion.div
                  animate={isListening ? { scale: [1, 1.2, 1] } : { scale: 1 }}
                  transition={{ repeat: isListening ? Infinity : 0, duration: 1 }}
                >
                  <Mic className="size-6" />
                </motion.div>
                <span>{isListening ? "Listening..." : "Tap to Speak"}</span>
              </div>
            </motion.button>
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Transcript */}
            {transcript && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 rounded-lg bg-indigo-50 border-2 border-indigo-200"
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-indigo-100">
                    <Users className="size-4 text-indigo-600" />
                  </div>
                  <div>
                    <p className="text-sm text-indigo-600 font-medium mb-1">You asked:</p>
                    <p className="text-slate-900">{transcript}</p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* AI Response */}
            {response && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 rounded-lg bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200"
              >
                <div className="flex items-start gap-3">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="p-2 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600"
                  >
                    <Sparkles className="size-4 text-white" />
                  </motion.div>
                  <div>
                    <p className="text-sm text-green-600 font-medium mb-1">AI Response:</p>
                    <p className="text-slate-900">{response}</p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Suggestions */}
            {!transcript && (
              <div>
                <p className="text-sm text-slate-600 mb-3 font-medium">Try asking:</p>
                <div className="grid grid-cols-1 gap-2">
                  {suggestions.map((suggestion, idx) => (
                    <motion.button
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      whileHover={{ scale: 1.02, x: 4 }}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="text-left p-4 rounded-lg border-2 border-slate-200 hover:border-indigo-300 hover:bg-indigo-50 transition-all"
                    >
                      <p className="text-slate-900 font-medium">{suggestion}</p>
                    </motion.button>
                  ))}
                </div>
              </div>
            )}

            {/* Quick Actions */}
            {response && (
              <div className="mt-6 pt-6 border-t border-slate-200">
                <p className="text-sm text-slate-600 mb-3 font-medium">Quick Actions:</p>
                <div className="flex flex-wrap gap-2">
                  <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium transition-colors">
                    View Details
                  </button>
                  <button className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-sm font-medium transition-colors">
                    Export Report
                  </button>
                  <button className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-sm font-medium transition-colors">
                    Ask Another Question
                  </button>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

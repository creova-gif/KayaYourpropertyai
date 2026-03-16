import { motion } from "motion/react";
import { Sparkles } from "lucide-react";

interface AIProcessingLoaderProps {
  message: string;
  progress: number;
}

export function AIProcessingLoader({ message, progress }: AIProcessingLoaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl border-2 border-indigo-200 p-6"
    >
      <div className="flex items-center gap-3 mb-4">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="p-2 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600"
        >
          <Sparkles className="size-5 text-white" />
        </motion.div>
        <div className="flex-1">
          <h3 className="font-semibold text-indigo-900">{message}</h3>
          <p className="text-sm text-indigo-700">AI is working its magic...</p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="relative w-full h-3 bg-indigo-100 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="absolute inset-y-0 left-0 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full"
        />
        
        {/* Shimmer Effect */}
        <motion.div
          animate={{ x: ["0%", "100%"] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          className="absolute inset-y-0 w-20 bg-gradient-to-r from-transparent via-white/30 to-transparent"
        />
      </div>

      <div className="mt-2 text-right">
        <span className="text-sm font-semibold text-indigo-900">{progress}% complete</span>
      </div>
    </motion.div>
  );
}

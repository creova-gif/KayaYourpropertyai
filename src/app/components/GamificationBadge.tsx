import { motion } from "motion/react";
import { Trophy, Zap, Clock, Star } from "lucide-react";

interface GamificationBadgeProps {
  type: "streak" | "time-saved" | "achievement" | "perfect";
  value: string | number;
  label: string;
}

export function GamificationBadge({ type, value, label }: GamificationBadgeProps) {
  const configs = {
    streak: {
      icon: Zap,
      gradient: "from-amber-400 to-orange-600",
      bg: "bg-amber-50",
      border: "border-amber-200"
    },
    "time-saved": {
      icon: Clock,
      gradient: "from-blue-400 to-cyan-600",
      bg: "bg-blue-50",
      border: "border-blue-200"
    },
    achievement: {
      icon: Trophy,
      gradient: "from-purple-400 to-pink-600",
      bg: "bg-purple-50",
      border: "border-purple-200"
    },
    perfect: {
      icon: Star,
      gradient: "from-green-400 to-emerald-600",
      bg: "bg-green-50",
      border: "border-green-200"
    }
  };

  const config = configs[type];
  const Icon = config.icon;

  return (
    <motion.div
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      whileHover={{ scale: 1.05, y: -2 }}
      className={`${config.bg} ${config.border} border-2 rounded-xl p-4 cursor-pointer`}
    >
      <div className="flex items-center gap-3">
        <div className={`p-3 rounded-lg bg-gradient-to-br ${config.gradient}`}>
          <Icon className="size-6 text-white" />
        </div>
        <div>
          <p className="text-2xl font-bold text-slate-900">{value}</p>
          <p className="text-sm text-slate-600">{label}</p>
        </div>
      </div>
    </motion.div>
  );
}

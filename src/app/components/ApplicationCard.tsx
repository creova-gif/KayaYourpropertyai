import { motion, useMotionValue, useTransform } from "motion/react";
import { Users, CheckCircle2, X, AlertTriangle } from "lucide-react";

interface Application {
  id: number;
  name: string;
  unit: string;
  score: number;
  risk: string;
  creditScore: number;
  income: number;
  incomeRatio: number;
}

interface ApplicationCardProps {
  application: Application;
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
  onClick: () => void;
}

export function ApplicationCard({ application, onSwipeLeft, onSwipeRight, onClick }: ApplicationCardProps) {
  const x = useMotionValue(0);
  const opacity = useTransform(x, [-200, 0, 200], [0.5, 1, 0.5]);
  const rotateZ = useTransform(x, [-200, 0, 200], [-10, 0, 10]);
  
  const backgroundColor = useTransform(
    x,
    [-200, -50, 0, 50, 200],
    ["rgb(254, 202, 202)", "rgb(255, 255, 255)", "rgb(255, 255, 255)", "rgb(255, 255, 255)", "rgb(187, 247, 208)"]
  );

  function handleDragEnd(_: any, info: any) {
    if (info.offset.x < -100) {
      onSwipeLeft();
    } else if (info.offset.x > 100) {
      onSwipeRight();
    }
  }

  return (
    <motion.div
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      style={{ x, opacity, rotateZ, backgroundColor }}
      onDragEnd={handleDragEnd}
      onClick={onClick}
      className="relative bg-white rounded-2xl border-2 border-slate-200 p-6 cursor-grab active:cursor-grabbing shadow-lg"
    >
      {/* Swipe Indicators */}
      <motion.div
        style={{ opacity: useTransform(x, [-200, -50, 0], [1, 0.3, 0]) }}
        className="absolute top-6 right-6 flex items-center gap-2 text-red-600"
      >
        <X className="size-8" />
        <span className="font-bold text-xl">Reject</span>
      </motion.div>
      
      <motion.div
        style={{ opacity: useTransform(x, [0, 50, 200], [0, 0.3, 1]) }}
        className="absolute top-6 left-6 flex items-center gap-2 text-green-600"
      >
        <CheckCircle2 className="size-8" />
        <span className="font-bold text-xl">Approve</span>
      </motion.div>

      {/* Card Content */}
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="size-16 rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center">
            <Users className="size-8 text-indigo-600" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-slate-900">{application.name}</h3>
            <p className="text-slate-500">{application.unit}</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-4xl font-bold text-slate-900 mb-1">{application.score}</div>
          <span className={`text-xs px-3 py-1.5 rounded-full font-medium ${
            application.risk === "low" ? "bg-green-100 text-green-700" :
            application.risk === "medium" ? "bg-amber-100 text-amber-700" :
            "bg-red-100 text-red-700"
          }`}>
            {application.risk} risk
          </span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 p-4 bg-slate-50 rounded-xl">
        <div>
          <p className="text-xs text-slate-500 mb-1">Credit Score</p>
          <p className="text-lg font-bold text-slate-900">{application.creditScore}</p>
        </div>
        <div>
          <p className="text-xs text-slate-500 mb-1">Income</p>
          <p className="text-lg font-bold text-slate-900">${application.income.toLocaleString()}</p>
        </div>
        <div>
          <p className="text-xs text-slate-500 mb-1">Ratio</p>
          <p className="text-lg font-bold text-slate-900">{application.incomeRatio}x</p>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-slate-200">
        <p className="text-sm text-slate-500 text-center">
          👈 Swipe left to reject • Swipe right to approve 👉
        </p>
      </div>
    </motion.div>
  );
}

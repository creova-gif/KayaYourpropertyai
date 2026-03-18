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
      className="relative bg-white rounded-2xl border-2 border-[rgba(0,0,0,0.07)] p-6 cursor-grab active:cursor-grabbing shadow-lg"
    >
      {/* Swipe Indicators */}
      <motion.div
        style={{ opacity: useTransform(x, [-200, -50, 0], [1, 0.3, 0]) }}
        className="absolute top-6 right-6 flex items-center gap-2 text-red-600"
      >
        <X className="size-8" strokeWidth={2.5} />
        <span 
          className="font-bold text-xl"
          style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}
        >
          Reject
        </span>
      </motion.div>
      
      <motion.div
        style={{ opacity: useTransform(x, [0, 50, 200], [0, 0.3, 1]) }}
        className="absolute top-6 left-6 flex items-center gap-2 text-[#0A7A52]"
      >
        <CheckCircle2 className="size-8" strokeWidth={2.5} />
        <span 
          className="font-bold text-xl"
          style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}
        >
          Approve
        </span>
      </motion.div>

      {/* Card Content */}
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="size-16 rounded-full bg-gradient-to-br from-[#E5F4EE] to-[#9FD8C0] flex items-center justify-center">
            <Users className="size-8 text-[#0A7A52]" strokeWidth={2.5} />
          </div>
          <div>
            <h3 
              className="text-xl font-semibold text-[#0E0F0C]"
              style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}
            >
              {application.name}
            </h3>
            <p 
              className="text-[#767570]"
              style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}
            >
              {application.unit}
            </p>
          </div>
        </div>
        <div className="text-right">
          <div 
            className="text-4xl font-bold text-[#0E0F0C] mb-1"
            style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
          >
            {application.score}
          </div>
          <span className={`text-xs px-3 py-1.5 rounded-full font-medium uppercase tracking-wide ${
            application.risk === "low" ? "bg-[#E5F4EE] text-[#0A7A52]" :
            application.risk === "medium" ? "bg-[#FEF3C7] text-[#F59E0B]" :
            "bg-[#FEE2E2] text-[#EF4444]"
          }`}>
            {application.risk} risk
          </span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 p-4 bg-[#F8F7F4] rounded-xl border border-[rgba(0,0,0,0.05)]">
        <div>
          <p 
            className="text-xs text-[#767570] mb-1 uppercase tracking-wide font-medium"
            style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}
          >
            Credit Score
          </p>
          <p 
            className="text-lg font-bold text-[#0E0F0C]"
            style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
          >
            {application.creditScore}
          </p>
        </div>
        <div>
          <p 
            className="text-xs text-[#767570] mb-1 uppercase tracking-wide font-medium"
            style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}
          >
            Income
          </p>
          <p 
            className="text-lg font-bold text-[#0E0F0C]"
            style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
          >
            ${application.income.toLocaleString()}
          </p>
        </div>
        <div>
          <p 
            className="text-xs text-[#767570] mb-1 uppercase tracking-wide font-medium"
            style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}
          >
            Ratio
          </p>
          <p 
            className="text-lg font-bold text-[#0E0F0C]"
            style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
          >
            {application.incomeRatio}x
          </p>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-[rgba(0,0,0,0.07)]">
        <p 
          className="text-sm text-[#767570] text-center"
          style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}
        >
          👈 Swipe left to reject • Swipe right to approve 👉
        </p>
      </div>
    </motion.div>
  );
}
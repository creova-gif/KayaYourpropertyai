import { motion } from "motion/react";
import { useEffect, useState } from "react";

interface SuccessConfettiProps {
  show: boolean;
  message?: string;
}

export function SuccessConfetti({ show, message = "Success!" }: SuccessConfettiProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (show) {
      setIsVisible(true);
      const timer = setTimeout(() => setIsVisible(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [show]);

  if (!isVisible) return null;

  const confettiPieces = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 0.5,
    duration: 2 + Math.random() * 1,
    rotation: Math.random() * 360,
    color: ['#6366f1', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981'][Math.floor(Math.random() * 5)]
  }));

  return (
    <div className="fixed inset-0 pointer-events-none z-[100] flex items-center justify-center">
      {/* Confetti */}
      {confettiPieces.map((piece) => (
        <motion.div
          key={piece.id}
          initial={{ y: -20, x: `${piece.left}vw`, opacity: 1, rotate: 0 }}
          animate={{ 
            y: "100vh", 
            rotate: piece.rotation,
            opacity: 0 
          }}
          transition={{ 
            duration: piece.duration, 
            delay: piece.delay,
            ease: "easeOut"
          }}
          className="absolute w-3 h-3 rounded-sm"
          style={{ backgroundColor: piece.color }}
        />
      ))}
      
      {/* Success Message */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0, opacity: 0 }}
        transition={{ duration: 0.3, type: "spring" }}
        className="bg-white rounded-2xl shadow-2xl border-2 border-green-200 p-8 pointer-events-auto"
      >
        <div className="flex flex-col items-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1, rotate: 360 }}
            transition={{ delay: 0.2, duration: 0.5, type: "spring" }}
            className="size-20 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center mb-4"
          >
            <span className="text-4xl">✓</span>
          </motion.div>
          <h3 className="text-2xl font-bold text-slate-900 mb-2">{message}</h3>
          <p className="text-slate-600">Your action was completed successfully</p>
        </div>
      </motion.div>
    </div>
  );
}

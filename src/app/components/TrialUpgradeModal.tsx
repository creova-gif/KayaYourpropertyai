import { X, Crown, Check, Zap } from 'lucide-react';
import { useTrial } from '../contexts/TrialContext';
import { motion, AnimatePresence } from 'motion/react';

export function TrialUpgradeModal() {
  const { showUpgradeModal, setShowUpgradeModal, trialStatus } = useTrial();

  const handleUpgradeClick = () => {
    setShowUpgradeModal(false);
    // Direct navigation without router dependency
    if (typeof window !== 'undefined') {
      window.location.href = '/pricing';
    }
  };

  if (!showUpgradeModal || !trialStatus?.trialExpired) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9999] flex items-center justify-center p-4"
        onClick={() => setShowUpgradeModal(false)}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="relative bg-gradient-to-br from-[#0A7A52] to-[#085D3D] px-8 py-12 text-center">
            <button
              onClick={() => setShowUpgradeModal(false)}
              className="absolute top-4 right-4 size-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
              aria-label="Close"
            >
              <X className="size-5 text-white" />
            </button>

            <div className="size-20 mx-auto rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center mb-4">
              <Crown className="size-10 text-white" strokeWidth={2} />
            </div>

            <h2 className="text-3xl font-bold text-white mb-2" style={{ fontFamily: "'Instrument Serif', serif" }}>
              Your Trial Has Ended
            </h2>
            <p className="text-white/80 text-lg">
              Upgrade to continue using KAYA's powerful features
            </p>
          </div>

          {/* Content */}
          <div className="px-8 py-8">
            <p className="text-center text-gray-600 mb-6">
              Thanks for trying KAYA! Your 7-day free trial has ended. Upgrade now to keep managing your properties with our AI-powered platform.
            </p>

            {/* Features Grid */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {[
                'Unlimited Properties',
                'AI Tenant Screening',
                'Automated Rent Collection',
                'LTB-Compliant Forms',
                'Financial Analytics',
                'Priority Support',
              ].map((feature, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="size-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                    <Check className="size-3 text-[#0A7A52]" strokeWidth={3} />
                  </div>
                  <span className="text-sm text-gray-700">{feature}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleUpgradeClick}
                className="flex-1 px-6 py-3.5 bg-gradient-to-r from-[#0A7A52] to-[#085D3D] text-white font-semibold rounded-xl hover:shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <Zap className="size-5" />
                Upgrade Now
              </button>
              <button
                onClick={() => setShowUpgradeModal(false)}
                className="px-6 py-3.5 border-2 border-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-colors"
              >
                Maybe Later
              </button>
            </div>

            <p className="text-center text-xs text-gray-500 mt-4">
              No credit card required to upgrade • Cancel anytime
            </p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

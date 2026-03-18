import { AlertCircle, Clock, Crown, X } from 'lucide-react';
import { useState } from 'react';
import { useTrial } from '../contexts/TrialContext';
import { motion, AnimatePresence } from 'motion/react';

const G = '#0A7A52';

export function TrialBanner() {
  const { trialStatus } = useTrial();
  const [dismissed, setDismissed] = useState(false);

  if (!trialStatus || dismissed) return null;

  // Don't show banner if user is on a paid plan
  if (trialStatus.subscriptionTier !== 'trial') return null;

  // Show expired banner
  if (trialStatus.trialExpired) {
    return (
      <AnimatePresence>
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="bg-gradient-to-r from-red-50 to-orange-50 border-b border-red-200"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3 flex-1">
                <div className="size-10 rounded-full bg-red-500 flex items-center justify-center flex-shrink-0">
                  <AlertCircle className="size-5 text-white" strokeWidth={2.5} />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-red-900">
                    Your 7-day free trial has expired
                  </p>
                  <p className="text-xs text-red-700 mt-0.5">
                    Upgrade to continue managing your properties with KAYA's AI-powered platform
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => window.location.href = '/pricing'}
                  className="px-4 py-2 bg-red-600 text-white text-sm font-semibold rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2"
                >
                  <Crown className="size-4" />
                  Upgrade Now
                </button>
                <button
                  onClick={() => setDismissed(true)}
                  className="size-8 rounded-lg hover:bg-red-100 flex items-center justify-center transition-colors"
                  aria-label="Dismiss"
                >
                  <X className="size-4 text-red-600" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    );
  }

  // Show trial active banner with countdown
  const daysText = trialStatus.daysRemaining === 1 ? 'day' : 'days';
  const urgencyColor = trialStatus.daysRemaining <= 2 ? 'orange' : 'green';

  return (
    <AnimatePresence>
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: 'auto', opacity: 1 }}
        exit={{ height: 0, opacity: 0 }}
        className={`bg-gradient-to-r ${
          urgencyColor === 'orange' 
            ? 'from-orange-50 to-yellow-50 border-orange-200' 
            : 'from-green-50 to-emerald-50 border-green-200'
        } border-b`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 flex-1">
              <div 
                className={`size-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                  urgencyColor === 'orange' ? 'bg-orange-500' : 'bg-[#0A7A52]'
                }`}
              >
                <Clock className="size-5 text-white" strokeWidth={2.5} />
              </div>
              <div className="flex-1">
                <p 
                  className={`text-sm font-semibold ${
                    urgencyColor === 'orange' ? 'text-orange-900' : 'text-green-900'
                  }`}
                >
                  Free Trial: {trialStatus.daysRemaining} {daysText} remaining
                </p>
                <p 
                  className={`text-xs mt-0.5 ${
                    urgencyColor === 'orange' ? 'text-orange-700' : 'text-green-700'
                  }`}
                >
                  Upgrade anytime to unlock unlimited properties and advanced features
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => window.location.href = '/pricing'}
                className={`px-4 py-2 text-white text-sm font-semibold rounded-lg transition-colors flex items-center gap-2 ${
                  urgencyColor === 'orange' 
                    ? 'bg-orange-600 hover:bg-orange-700' 
                    : 'bg-[#0A7A52] hover:bg-[#085D3D]'
                }`}
              >
                <Crown className="size-4" />
                View Plans
              </button>
              <button
                onClick={() => setDismissed(true)}
                className={`size-8 rounded-lg transition-colors flex items-center justify-center ${
                  urgencyColor === 'orange' 
                    ? 'hover:bg-orange-100 text-orange-600' 
                    : 'hover:bg-green-100 text-green-600'
                }`}
                aria-label="Dismiss"
              >
                <X className="size-4" />
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { projectId, publicAnonKey } from '/utils/supabase/info';

interface TrialStatus {
  isTrialActive: boolean;
  trialExpired: boolean;
  daysRemaining: number;
  trialStartDate: string | null;
  trialEndDate: string | null;
  subscriptionTier: string;
  subscriptionStatus: string;
}

interface TrialContextType {
  trialStatus: TrialStatus | null;
  loading: boolean;
  refreshTrialStatus: () => Promise<void>;
  showUpgradeModal: boolean;
  setShowUpgradeModal: (show: boolean) => void;
}

const TrialContext = createContext<TrialContextType | undefined>(undefined);

export function TrialProvider({ children }: { children: React.ReactNode }) {
  const { user, session } = useAuth();
  const [trialStatus, setTrialStatus] = useState<TrialStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);

  const fetchTrialStatus = async () => {
    if (!user || !session?.access_token) {
      setLoading(false);
      return;
    }

    // Demo account — use mock active subscription status
    if (session.access_token === 'demo-access-token') {
      setTrialStatus({
        isTrialActive: false,
        trialExpired: false,
        daysRemaining: 0,
        trialStartDate: null,
        trialEndDate: null,
        subscriptionTier: 'pro',
        subscriptionStatus: 'active',
      });
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-2071350e/auth/trial-status`,
        {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${session.access_token}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setTrialStatus(data);
        
        // Show upgrade modal if trial expired
        if (data.trialExpired && data.subscriptionTier === 'trial') {
          setShowUpgradeModal(true);
        }
      } else {
        console.error('Failed to fetch trial status');
      }
    } catch (error) {
      console.error('Error fetching trial status:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrialStatus();
  }, [user, session?.access_token]);

  const value: TrialContextType = {
    trialStatus,
    loading,
    refreshTrialStatus: fetchTrialStatus,
    showUpgradeModal,
    setShowUpgradeModal,
  };

  return (
    <TrialContext.Provider value={value}>
      {children}
    </TrialContext.Provider>
  );
}

export function useTrial() {
  const context = useContext(TrialContext);
  if (context === undefined) {
    throw new Error('useTrial must be used within a TrialProvider');
  }
  return context;
}

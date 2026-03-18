import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getUnreadNotificationCount, getUnreadMessageCount } from '../services/notification.service';
import { useAuth } from './AuthContext';

interface NotificationContextType {
  notificationCount: number;
  messageCount: number;
  refreshCounts: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [notificationCount, setNotificationCount] = useState(0);
  const [messageCount, setMessageCount] = useState(0);
  const { user, session } = useAuth();

  const refreshCounts = async () => {
    // Only fetch if user is authenticated
    if (!user || !session) {
      setNotificationCount(0);
      setMessageCount(0);
      return;
    }

    try {
      const [notifications, messages] = await Promise.all([
        getUnreadNotificationCount(user.id, session.access_token),
        getUnreadMessageCount(user.id, session.access_token),
      ]);
      
      setNotificationCount(notifications);
      setMessageCount(messages);
    } catch (error) {
      console.error('Error refreshing notification counts:', error);
      // Set to 0 on error to avoid showing incorrect counts
      setNotificationCount(0);
      setMessageCount(0);
    }
  };

  useEffect(() => {
    // Only start polling if user is authenticated
    if (user && session) {
      refreshCounts();
      
      // Poll for updates every 30 seconds
      const interval = setInterval(refreshCounts, 30000);
      
      return () => clearInterval(interval);
    } else {
      // Reset counts when user logs out
      setNotificationCount(0);
      setMessageCount(0);
    }
  }, [user, session]);

  return (
    <NotificationContext.Provider value={{ notificationCount, messageCount, refreshCounts }}>
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    // Return default values instead of throwing error
    console.warn('useNotifications must be used within a NotificationProvider. Using default values.');
    return {
      notificationCount: 0,
      messageCount: 0,
      refreshCounts: () => {},
    };
  }
  return context;
}
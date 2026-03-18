import { projectId, publicAnonKey } from '/utils/supabase/info';

const API_BASE_URL = `https://${projectId}.supabase.co/functions/v1/make-server-2071350e`;

export interface Notification {
  id: string;
  type: 'application' | 'payment' | 'maintenance' | 'tenant' | 'property' | 'system' | 'message';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  actionUrl?: string;
  metadata?: any;
  userId: string;
}

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  recipientId: string;
  text: string;
  timestamp: string;
  read: boolean;
  delivered: boolean;
  attachments?: { name: string; url: string; type: string }[];
}

export interface Conversation {
  id: string;
  participantId: string;
  participantName: string;
  participantRole: 'tenant' | 'landlord' | 'contractor' | 'admin';
  participantAvatar?: string;
  property?: string;
  unit?: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  pinned: boolean;
  starred: boolean;
}

/**
 * Fetch all notifications for the current user
 */
export async function getNotifications(userId: string): Promise<Notification[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/notifications/${userId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${publicAnonKey}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch notifications');
    }

    const data = await response.json();
    return data.notifications || [];
  } catch (error) {
    console.error('Error fetching notifications:', error);
    return [];
  }
}

/**
 * Mark a notification as read
 */
export async function markNotificationAsRead(notificationId: string): Promise<boolean> {
  try {
    const response = await fetch(`${API_BASE_URL}/notifications/${notificationId}/read`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${publicAnonKey}`,
        'Content-Type': 'application/json',
      },
    });

    return response.ok;
  } catch (error) {
    console.error('Error marking notification as read:', error);
    return false;
  }
}

/**
 * Mark all notifications as read
 */
export async function markAllNotificationsAsRead(userId: string): Promise<boolean> {
  try {
    const response = await fetch(`${API_BASE_URL}/notifications/${userId}/read-all`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${publicAnonKey}`,
        'Content-Type': 'application/json',
      },
    });

    return response.ok;
  } catch (error) {
    console.error('Error marking all notifications as read:', error);
    return false;
  }
}

/**
 * Delete a notification
 */
export async function deleteNotification(notificationId: string): Promise<boolean> {
  try {
    const response = await fetch(`${API_BASE_URL}/notifications/${notificationId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${publicAnonKey}`,
        'Content-Type': 'application/json',
      },
    });

    return response.ok;
  } catch (error) {
    console.error('Error deleting notification:', error);
    return false;
  }
}

/**
 * Create a new notification
 */
export async function createNotification(notification: Omit<Notification, 'id' | 'timestamp'>): Promise<boolean> {
  try {
    const response = await fetch(`${API_BASE_URL}/notifications`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${publicAnonKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(notification),
    });

    return response.ok;
  } catch (error) {
    console.error('Error creating notification:', error);
    return false;
  }
}

/**
 * Get unread notification count
 */
export async function getUnreadNotificationCount(userId: string, authToken?: string): Promise<number> {
  try {
    const response = await fetch(`${API_BASE_URL}/notifications/${userId}/unread-count`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${authToken || publicAnonKey}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      // Don't throw error, just return 0 for better UX
      console.warn('Failed to fetch unread notification count:', response.status);
      return 0;
    }

    const data = await response.json();
    return data.count || 0;
  } catch (error) {
    // Silently fail and return 0 instead of logging error
    // This prevents console spam for non-critical functionality
    return 0;
  }
}

// ===== MESSAGING FUNCTIONS =====

/**
 * Fetch all conversations for the current user
 */
export async function getConversations(userId: string): Promise<Conversation[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/messages/conversations/${userId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${publicAnonKey}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch conversations');
    }

    const data = await response.json();
    return data.conversations || [];
  } catch (error) {
    console.error('Error fetching conversations:', error);
    return [];
  }
}

/**
 * Fetch messages for a specific conversation
 */
export async function getMessages(conversationId: string): Promise<Message[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/messages/conversation/${conversationId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${publicAnonKey}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch messages');
    }

    const data = await response.json();
    return data.messages || [];
  } catch (error) {
    console.error('Error fetching messages:', error);
    return [];
  }
}

/**
 * Send a new message
 */
export async function sendMessage(message: Omit<Message, 'id' | 'timestamp' | 'delivered'>): Promise<boolean> {
  try {
    const response = await fetch(`${API_BASE_URL}/messages`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${publicAnonKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    });

    return response.ok;
  } catch (error) {
    console.error('Error sending message:', error);
    return false;
  }
}

/**
 * Mark message as read
 */
export async function markMessageAsRead(messageId: string): Promise<boolean> {
  try {
    const response = await fetch(`${API_BASE_URL}/messages/${messageId}/read`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${publicAnonKey}`,
        'Content-Type': 'application/json',
      },
    });

    return response.ok;
  } catch (error) {
    console.error('Error marking message as read:', error);
    return false;
  }
}

/**
 * Get unread message count
 */
export async function getUnreadMessageCount(userId: string, authToken?: string): Promise<number> {
  try {
    const response = await fetch(`${API_BASE_URL}/messages/unread-count`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${authToken || publicAnonKey}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      // Don't throw error, just return 0 for better UX
      console.warn('Failed to fetch unread message count:', response.status);
      return 0;
    }

    const data = await response.json();
    return data.count || 0;
  } catch (error) {
    // Silently fail and return 0 instead of logging error
    // This prevents console spam for non-critical functionality
    return 0;
  }
}
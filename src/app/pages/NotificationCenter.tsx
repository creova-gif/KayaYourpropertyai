import { useState, useEffect } from "react";
import { Bell, Check, Trash2, Filter, Mail, AlertCircle, CheckCircle, Info, DollarSign, FileText, Home, Users, Wrench, Calendar, X } from "lucide-react";

interface Notification {
  id: string;
  type: 'application' | 'payment' | 'maintenance' | 'tenant' | 'property' | 'system' | 'message';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  actionUrl?: string;
  metadata?: any;
}

export function NotificationCenter() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'application',
      title: 'New Application Received',
      message: 'Sarah Johnson applied for Unit 204 at Maple Tower',
      timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
      read: false,
      priority: 'high',
      actionUrl: '/applications',
    },
    {
      id: '2',
      type: 'payment',
      title: 'Payment Received',
      message: '$2,400 rent payment for Unit 305 - March 2026',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
      read: false,
      priority: 'medium',
      actionUrl: '/payments',
    },
    {
      id: '3',
      type: 'maintenance',
      title: 'Urgent Maintenance Request',
      message: 'Water leak reported in Unit 102 - Immediate attention required',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString(),
      read: false,
      priority: 'urgent',
      actionUrl: '/maintenance',
    },
    {
      id: '4',
      type: 'tenant',
      title: 'Lease Renewal Notice',
      message: 'Lease for Unit 201 expires in 60 days',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
      read: true,
      priority: 'medium',
      actionUrl: '/tenants',
    },
    {
      id: '5',
      type: 'system',
      title: 'Monthly Report Ready',
      message: 'Your February 2026 portfolio report is available',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
      read: true,
      priority: 'low',
      actionUrl: '/analytics',
    },
    {
      id: '6',
      type: 'payment',
      title: 'Payment Overdue',
      message: 'Unit 405 rent is 5 days overdue - $2,100',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(),
      read: false,
      priority: 'urgent',
      actionUrl: '/rent-collection',
    },
    {
      id: '7',
      type: 'message',
      title: 'New Message from Tenant',
      message: 'John Smith: "Question about parking permit renewal"',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
      read: false,
      priority: 'medium',
      actionUrl: '/messages',
    },
  ]);

  const [filter, setFilter] = useState<'all' | 'unread' | 'high-priority'>('all');

  const unreadCount = notifications.filter(n => !n.read).length;
  const urgentCount = notifications.filter(n => n.priority === 'urgent' && !n.read).length;

  const filteredNotifications = notifications.filter(n => {
    if (filter === 'unread') return !n.read;
    if (filter === 'high-priority') return n.priority === 'high' || n.priority === 'urgent';
    return true;
  });

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const getIcon = (type: Notification['type']) => {
    switch (type) {
      case 'application': return FileText;
      case 'payment': return DollarSign;
      case 'maintenance': return Wrench;
      case 'tenant': return Users;
      case 'property': return Home;
      case 'message': return Mail;
      case 'system': return Info;
      default: return Bell;
    }
  };

  const getPriorityColor = (priority: Notification['priority']) => {
    switch (priority) {
      case 'urgent': return 'bg-red-50 border-red-200';
      case 'high': return 'bg-[#FFF8EC] border-[rgba(245,158,11,0.3)]';
      case 'medium': return 'bg-[#E5F4EE] border-[rgba(10,122,82,0.2)]';
      case 'low': return 'bg-[#F8F7F4] border-[rgba(0,0,0,0.08)]';
    }
  };

  const getPriorityBadge = (priority: Notification['priority']) => {
    switch (priority) {
      case 'urgent': return 'bg-red-100 text-red-700 border-red-300';
      case 'high': return 'bg-[#FFF8EC] text-[#B45309] border-[rgba(245,158,11,0.4)]';
      case 'medium': return 'bg-[#E5F4EE] text-[#0A7A52] border-[rgba(10,122,82,0.3)]';
      case 'low': return 'bg-[#F8F7F4] text-[#767570] border-[rgba(0,0,0,0.1)]';
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="min-h-screen bg-[#F8F7F4] pb-12">
      {/* Header */}
      <div className="bg-white border-b border-[rgba(0,0,0,0.08)] sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 
                className="text-3xl text-[#0E0F0C] mb-2"
                style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
              >
                Notifications
              </h1>
              <p className="text-[#767570] text-sm">
                {unreadCount} unread {urgentCount > 0 && `• ${urgentCount} urgent`}
              </p>
            </div>

            <div className="flex items-center gap-3">
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-[#0A7A52] bg-[#E5F4EE] hover:bg-[#D1EDE0] transition-colors"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  <CheckCircle className="size-4" />
                  Mark all read
                </button>
              )}
            </div>
          </div>

          {/* Filters */}
          <div className="flex gap-2 mt-6">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                filter === 'all'
                  ? 'bg-[#0A7A52] text-white shadow-lg shadow-[#0A7A52]/20'
                  : 'bg-white text-[#767570] hover:bg-[#F8F7F4] border border-[rgba(0,0,0,0.08)]'
              }`}
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              All ({notifications.length})
            </button>
            <button
              onClick={() => setFilter('unread')}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                filter === 'unread'
                  ? 'bg-[#0A7A52] text-white shadow-lg shadow-[#0A7A52]/20'
                  : 'bg-white text-[#767570] hover:bg-[#F8F7F4] border border-[rgba(0,0,0,0.08)]'
              }`}
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Unread ({unreadCount})
            </button>
            <button
              onClick={() => setFilter('high-priority')}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                filter === 'high-priority'
                  ? 'bg-[#0A7A52] text-white shadow-lg shadow-[#0A7A52]/20'
                  : 'bg-white text-[#767570] hover:bg-[#F8F7F4] border border-[rgba(0,0,0,0.08)]'
              }`}
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              High Priority
            </button>
          </div>
        </div>
      </div>

      {/* Notifications List */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="space-y-3">
          {filteredNotifications.length === 0 ? (
            <div className="bg-white rounded-2xl border border-[rgba(0,0,0,0.08)] p-12 text-center">
              <Bell className="size-12 text-[#767570] mx-auto mb-4 opacity-40" />
              <h3 className="text-lg font-semibold text-[#0E0F0C] mb-2">
                No notifications
              </h3>
              <p className="text-[#767570] text-sm">
                You're all caught up!
              </p>
            </div>
          ) : (
            filteredNotifications.map((notification) => {
              const Icon = getIcon(notification.type);
              return (
                <div
                  key={notification.id}
                  className={`bg-white rounded-2xl border p-5 transition-all hover:shadow-md group relative ${
                    notification.read 
                      ? 'border-[rgba(0,0,0,0.08)] opacity-70' 
                      : getPriorityColor(notification.priority)
                  }`}
                >
                  {/* Unread indicator */}
                  {!notification.read && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-12 bg-[#0A7A52] rounded-r-full" />
                  )}

                  <div className="flex items-start gap-4 pl-3">
                    {/* Icon */}
                    <div className={`p-3 rounded-xl ${
                      notification.read ? 'bg-[#F8F7F4]' : 'bg-white'
                    }`}>
                      <Icon className={`size-5 ${
                        notification.priority === 'urgent' ? 'text-red-600' :
                        notification.priority === 'high' ? 'text-orange-600' :
                        'text-[#0A7A52]'
                      }`} strokeWidth={2.5} />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4 mb-1">
                        <h3 className="font-semibold text-[#0E0F0C] text-[15px]">
                          {notification.title}
                        </h3>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <span className="text-xs text-[#767570]">
                            {formatTimestamp(notification.timestamp)}
                          </span>
                          <span className={`text-[10px] font-bold uppercase tracking-wide px-2 py-1 rounded-md border ${
                            getPriorityBadge(notification.priority)
                          }`}>
                            {notification.priority}
                          </span>
                        </div>
                      </div>
                      <p className="text-sm text-[#767570] mb-3">
                        {notification.message}
                      </p>

                      {/* Actions */}
                      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        {notification.actionUrl && (
                          <a
                            href={notification.actionUrl}
                            className="text-xs font-semibold text-[#0A7A52] hover:text-[#085D3D] transition-colors"
                          >
                            View Details →
                          </a>
                        )}
                        {!notification.read && (
                          <button
                            onClick={() => markAsRead(notification.id)}
                            className="ml-auto text-xs font-medium text-[#767570] hover:text-[#0A7A52] transition-colors"
                          >
                            Mark read
                          </button>
                        )}
                        <button
                          onClick={() => deleteNotification(notification.id)}
                          className="text-xs font-medium text-[#767570] hover:text-red-600 transition-colors"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}

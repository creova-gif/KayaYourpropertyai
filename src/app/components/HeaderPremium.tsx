import { Bell, MessageSquare, Search, Settings, LogOut } from "lucide-react";
import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
import { useNotifications } from "../contexts/NotificationContext";
import { useAuth } from "../contexts/AuthContext";
import { UserMenu } from "./UserMenu";

export function HeaderPremium() {
  const navigate = useNavigate();
  const { notificationCount, messageCount } = useNotifications();
  const { user } = useAuth();

  return (
    <div className="bg-white border-b border-[rgba(0,0,0,0.08)] px-6 py-4 sticky top-0 z-40">
      <div className="flex items-center justify-between max-w-[1800px] mx-auto">
        {/* Search Bar */}
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-[#767570]" />
            <input
              type="text"
              placeholder="Search properties, tenants, or documents..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[rgba(0,0,0,0.08)] bg-[#F8F7F4] text-sm focus:outline-none focus:ring-2 focus:ring-[#0A7A52]/20 focus:border-[#0A7A52] transition-all"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-2 ml-6">
          {/* Notifications */}
          <button
            onClick={() => navigate('/notification-center')}
            className="relative p-2.5 rounded-xl hover:bg-[#F8F7F4] transition-colors group"
            aria-label="Notifications"
          >
            <Bell className="size-5 text-[#767570] group-hover:text-[#0A7A52] transition-colors" strokeWidth={2} />
            {notificationCount > 0 && (
              <span className="absolute -top-1 -right-1 size-5 rounded-full bg-[#0A7A52] text-white text-[10px] font-bold flex items-center justify-center shadow-lg">
                {notificationCount}
              </span>
            )}
          </button>

          {/* Messages */}
          <button
            onClick={() => navigate('/messaging-center')}
            className="relative p-2.5 rounded-xl hover:bg-[#F8F7F4] transition-colors group"
            aria-label="Messages"
          >
            <MessageSquare className="size-5 text-[#767570] group-hover:text-[#0A7A52] transition-colors" strokeWidth={2} />
            {messageCount > 0 && (
              <span className="absolute -top-1 -right-1 size-5 rounded-full bg-[#0A7A52] text-white text-[10px] font-bold flex items-center justify-center shadow-lg">
                {messageCount}
              </span>
            )}
          </button>

          {/* Settings */}
          <button
            onClick={() => navigate('/settings')}
            className="p-2.5 rounded-xl hover:bg-[#F8F7F4] transition-colors group"
            aria-label="Settings"
          >
            <Settings className="size-5 text-[#767570] group-hover:text-[#0A7A52] transition-colors" strokeWidth={2} />
          </button>

          {/* Divider */}
          <div className="w-px h-8 bg-[rgba(0,0,0,0.08)] mx-2" />

          {/* User Menu */}
          <UserMenu />
        </div>
      </div>
    </div>
  );
}

// Minimal header version (for pages that don't need search)
export function HeaderMinimal({ title, subtitle }: { title?: string; subtitle?: string }) {
  const navigate = useNavigate();
  const { notificationCount, messageCount } = useNotifications();

  return (
    <div className="bg-white border-b border-[rgba(0,0,0,0.08)] px-6 py-4 sticky top-0 z-40">
      <div className="flex items-center justify-between max-w-[1800px] mx-auto">
        {/* Title */}
        {title && (
          <div>
            <h1 
              className="text-2xl text-[#0E0F0C]"
              style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
            >
              {title}
            </h1>
            {subtitle && (
              <p className="text-sm text-[#767570] mt-1">{subtitle}</p>
            )}
          </div>
        )}

        {/* Right Section */}
        <div className="flex items-center gap-2 ml-auto">
          {/* Notifications */}
          <button
            onClick={() => navigate('/notification-center')}
            className="relative p-2.5 rounded-xl hover:bg-[#F8F7F4] transition-colors group"
            aria-label="Notifications"
          >
            <Bell className="size-5 text-[#767570] group-hover:text-[#0A7A52] transition-colors" strokeWidth={2} />
            {notificationCount > 0 && (
              <span className="absolute -top-1 -right-1 size-5 rounded-full bg-[#0A7A52] text-white text-[10px] font-bold flex items-center justify-center shadow-lg">
                {notificationCount}
              </span>
            )}
          </button>

          {/* Messages */}
          <button
            onClick={() => navigate('/messaging-center')}
            className="relative p-2.5 rounded-xl hover:bg-[#F8F7F4] transition-colors group"
            aria-label="Messages"
          >
            <MessageSquare className="size-5 text-[#767570] group-hover:text-[#0A7A52] transition-colors" strokeWidth={2} />
            {messageCount > 0 && (
              <span className="absolute -top-1 -right-1 size-5 rounded-full bg-[#0A7A52] text-white text-[10px] font-bold flex items-center justify-center shadow-lg">
                {messageCount}
              </span>
            )}
          </button>

          {/* Divider */}
          <div className="w-px h-8 bg-[rgba(0,0,0,0.08)] mx-2" />

          {/* User Menu */}
          <UserMenu />
        </div>
      </div>
    </div>
  );
}
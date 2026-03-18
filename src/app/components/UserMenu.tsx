import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { User, Settings, LogOut, CreditCard, HelpCircle, Shield } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { ErrorHandler } from '../utils/errorHandling';

export function UserMenu() {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Get user initials
  const getUserInitials = () => {
    if (!user?.name) return 'U';
    const names = user.name.split(' ');
    if (names.length >= 2) {
      return `${names[0][0]}${names[1][0]}`.toUpperCase();
    }
    return user.name.substring(0, 2).toUpperCase();
  };

  const handleLogout = async () => {
    setIsOpen(false);
    ErrorHandler.info('Signing out...', 'See you soon!');
    await signOut();
  };

  const menuItems = [
    {
      icon: User,
      label: 'Profile',
      action: () => {
        setIsOpen(false);
        navigate('/settings');
      },
    },
    {
      icon: Settings,
      label: 'Settings',
      action: () => {
        setIsOpen(false);
        navigate('/settings');
      },
    },
    {
      icon: CreditCard,
      label: 'Billing',
      action: () => {
        setIsOpen(false);
        navigate('/settings?tab=billing');
      },
    },
    {
      icon: HelpCircle,
      label: 'Help & Support',
      action: () => {
        setIsOpen(false);
        navigate('/contact');
      },
    },
  ];

  return (
    <div className="relative" ref={menuRef}>
      {/* User Avatar Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-[#F8F7F4] transition-colors"
      >
        <div className="size-9 rounded-full bg-gradient-to-br from-[#0A7A52] to-[#085D3D] flex items-center justify-center text-white font-semibold text-sm">
          {getUserInitials()}
        </div>
        <div className="hidden sm:block text-left">
          <p className="text-sm font-semibold text-[#0E0F0C]">{user?.name || 'User'}</p>
          <p className="text-xs text-[#767570] capitalize">{user?.role || 'Landlord'}</p>
        </div>
      </button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-[rgba(0,0,0,0.08)] overflow-hidden z-50"
          >
            {/* User Info Header */}
            <div className="px-4 py-4 border-b border-[rgba(0,0,0,0.08)] bg-[#F8F7F4]">
              <div className="flex items-center gap-3">
                <div className="size-12 rounded-full bg-gradient-to-br from-[#0A7A52] to-[#085D3D] flex items-center justify-center text-white font-semibold">
                  {getUserInitials()}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-[#0E0F0C] truncate">
                    {user?.name || 'User'}
                  </p>
                  <p className="text-xs text-[#767570] truncate">{user?.email}</p>
                  <div className="mt-1.5">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#E5F4EE] text-[#0A7A52] text-[10px] font-semibold uppercase tracking-wide">
                      <Shield size={10} />
                      {user?.role || 'Landlord'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Menu Items */}
            <div className="py-2">
              {menuItems.map((item, index) => (
                <button
                  key={index}
                  onClick={item.action}
                  className="w-full px-4 py-2.5 flex items-center gap-3 hover:bg-[#F8F7F4] transition-colors text-left group"
                >
                  <item.icon size={18} className="text-[#767570] group-hover:text-[#0A7A52] transition-colors" />
                  <span className="text-sm text-[#0E0F0C] group-hover:text-[#0A7A52] transition-colors">
                    {item.label}
                  </span>
                </button>
              ))}
            </div>

            {/* Divider */}
            <div className="h-px bg-[rgba(0,0,0,0.08)]" />

            {/* Logout Button */}
            <div className="py-2">
              <button
                onClick={handleLogout}
                className="w-full px-4 py-2.5 flex items-center gap-3 hover:bg-red-50 transition-colors text-left group"
              >
                <LogOut size={18} className="text-[#767570] group-hover:text-red-600 transition-colors" />
                <span className="text-sm text-[#0E0F0C] group-hover:text-red-600 font-medium transition-colors">
                  Sign out
                </span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

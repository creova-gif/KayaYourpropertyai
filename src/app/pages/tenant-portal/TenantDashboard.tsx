import { Home, CreditCard, FileText, Wrench, Calendar, Bell, Star, Zap } from "lucide-react";
import { Link } from "react-router";
import { TenantApplicationProgress } from "../../components/TenantApplicationProgress";
import { GamificationBadge } from "../../components/GamificationBadge";

export function TenantDashboard() {
  const leaseInfo = {
    unit: "Unit 4A",
    address: "123 King Street, Toronto",
    rent: 2300,
    leaseStart: "Jan 1, 2025",
    leaseEnd: "Dec 31, 2025",
    daysRemaining: 292
  };

  const upcomingPayment = {
    amount: 2300,
    dueDate: "Apr 1, 2026",
    daysUntil: 18,
    autoPayEnabled: true
  };

  const quickActions = [
    { name: "Make Payment", icon: CreditCard, href: "/tenant/payments", color: "indigo" },
    { name: "View Documents", icon: FileText, href: "/tenant/documents", color: "purple" },
    { name: "Maintenance", icon: Wrench, href: "/tenant/maintenance", color: "blue" },
  ];

  const tenantBadges = [
    { type: "perfect" as const, value: "5/5", label: "On-time payments" },
    { type: "streak" as const, value: "100%", label: "Payment streak" },
    { type: "achievement" as const, value: "⭐", label: "Model tenant" },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">Welcome back, John!</h1>
          <p className="mt-2 text-slate-600">Here's everything about your rental</p>
        </div>

        {/* Gamification Badges */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {tenantBadges.map((badge, idx) => (
            <GamificationBadge
              key={idx}
              type={badge.type}
              value={badge.value}
              label={badge.label}
            />
          ))}
        </div>

        {/* Lease Info Card */}
        <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl p-6 text-white mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-lg bg-white/20 backdrop-blur-sm">
              <Home className="size-6" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">Your Home</h2>
              <p className="text-white/80 text-sm">{leaseInfo.address}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <p className="text-white/70 text-sm mb-1">Monthly Rent</p>
              <p className="text-2xl font-bold">${leaseInfo.rent.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-white/70 text-sm mb-1">Lease Period</p>
              <p className="text-lg font-semibold">{leaseInfo.leaseStart} - {leaseInfo.leaseEnd}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 p-3 bg-white/10 rounded-lg backdrop-blur-sm">
            <Calendar className="size-5" />
            <span className="text-sm">{leaseInfo.daysRemaining} days remaining in lease</span>
          </div>
        </div>

        {/* Upcoming Payment Card */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-lg bg-indigo-50">
              <CreditCard className="size-5 text-indigo-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">Upcoming Payment</h2>
              <p className="text-slate-500 text-sm">Next payment due on {upcomingPayment.dueDate}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <p className="text-slate-500 text-sm mb-1">Amount Due</p>
              <p className="text-2xl font-bold">${upcomingPayment.amount.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-slate-500 text-sm mb-1">Days Until Due</p>
              <p className="text-lg font-semibold">{upcomingPayment.daysUntil} days</p>
            </div>
          </div>

          <div className="flex items-center gap-2 p-3 bg-white/10 rounded-lg backdrop-blur-sm">
            <Bell className="size-5" />
            <span className="text-sm">Auto-pay is {upcomingPayment.autoPayEnabled ? "enabled" : "disabled"}</span>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl p-6 text-white">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {quickActions.map((action, idx) => (
              <Link key={idx} to={action.href} className="flex items-center gap-3 p-4 bg-white/10 hover:bg-white/20 rounded-lg backdrop-blur-sm transition-colors">
                <action.icon className="size-5" />
                <span className="font-medium">{action.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
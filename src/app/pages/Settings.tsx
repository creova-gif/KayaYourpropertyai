import { User, Bell, CreditCard, Shield, FileText, Building2, Mail } from "lucide-react";

export function Settings() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">Settings</h1>
          <p className="mt-2 text-slate-600">Manage your account and platform preferences</p>
        </div>

        <div className="space-y-6">
          {/* Profile Settings */}
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            <div className="p-6 border-b border-slate-200">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-indigo-50">
                  <User className="size-5 text-indigo-600" />
                </div>
                <h2 className="text-lg font-semibold text-slate-900">Profile Information</h2>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Full Name</label>
                <input
                  type="text"
                  defaultValue="Justin Landlord"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Email Address</label>
                <input
                  type="email"
                  defaultValue="justin@landlordos.com"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Phone Number</label>
                <input
                  type="tel"
                  defaultValue="(416) 555-0100"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <button className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors">
                Save Changes
              </button>
            </div>
          </div>

          {/* Notification Settings */}
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            <div className="p-6 border-b border-slate-200">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-purple-50">
                  <Bell className="size-5 text-purple-600" />
                </div>
                <h2 className="text-lg font-semibold text-slate-900">Notifications</h2>
              </div>
            </div>
            <div className="p-6 space-y-4">
              {[
                { label: "New tenant applications", description: "Get notified when someone applies to your properties" },
                { label: "Payment reminders", description: "Receive alerts for late or upcoming rent payments" },
                { label: "AI risk alerts", description: "Get notified when AI detects high-risk applications" },
                { label: "Lease expiration warnings", description: "Reminders 90 days before lease ends" },
              ].map((item) => (
                <div key={item.label} className="flex items-start justify-between py-3">
                  <div className="flex-1">
                    <p className="font-medium text-slate-900">{item.label}</p>
                    <p className="text-sm text-slate-500 mt-1">{item.description}</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" defaultChecked className="sr-only peer" />
                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-indigo-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Compliance */}
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            <div className="p-6 border-b border-slate-200">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-green-50">
                  <Shield className="size-5 text-green-600" />
                </div>
                <h2 className="text-lg font-semibold text-slate-900">Ontario LTB Compliance</h2>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-3">
                <div className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center gap-3">
                    <FileText className="size-5 text-green-600" />
                    <div>
                      <p className="font-medium text-slate-900">Standard Lease Template</p>
                      <p className="text-sm text-slate-500">Ontario RTA Compliant (2026)</p>
                    </div>
                  </div>
                  <span className="text-green-700 text-sm font-medium">✓ Active</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Building2 className="size-5 text-green-600" />
                    <div>
                      <p className="font-medium text-slate-900">Property Registration</p>
                      <p className="text-sm text-slate-500">All properties registered</p>
                    </div>
                  </div>
                  <span className="text-green-700 text-sm font-medium">✓ Verified</span>
                </div>
              </div>
            </div>
          </div>

          {/* Billing */}
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            <div className="p-6 border-b border-slate-200">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-amber-50">
                  <CreditCard className="size-5 text-amber-600" />
                </div>
                <h2 className="text-lg font-semibold text-slate-900">Billing & Subscription</h2>
              </div>
            </div>
            <div className="p-6">
              <div className="bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-200 rounded-lg p-6 mb-4">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900">Property Manager Plan</h3>
                    <p className="text-sm text-slate-600 mt-1">Up to 50 units</p>
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-bold text-indigo-600">$79</p>
                    <p className="text-sm text-slate-600">/month</p>
                  </div>
                </div>
                <p className="text-sm text-slate-700 mb-4">Next billing date: April 1, 2026</p>
                <button className="px-4 py-2 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 rounded-lg font-medium transition-colors text-sm">
                  Manage Subscription
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

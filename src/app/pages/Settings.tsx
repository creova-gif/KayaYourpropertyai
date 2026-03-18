import { User, Bell, CreditCard, Shield, FileText, Building2, Mail } from "lucide-react";
import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useLanguage } from "../contexts/LanguageContext";
import { projectId, publicAnonKey } from "/utils/supabase/info";
import { toast } from "sonner";
import { ButtonSpinner } from "../components/LoadingSpinner";
import { Link } from "react-router";

export function Settings() {
  const { user, session } = useAuth();
  const { language } = useLanguage();
  const [loadingPortal, setLoadingPortal] = useState(false);
  const [subscription, setSubscription] = useState<any>(null);

  useEffect(() => {
    // Fetch user subscription status
    if (user && session) {
      fetchSubscription();
    }
  }, [user, session]);

  const fetchSubscription = async () => {
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-2071350e/users/${user?.id}`,
        {
          headers: {
            Authorization: `Bearer ${session?.access_token || publicAnonKey}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setSubscription(data.profile);
      }
    } catch (error) {
      console.error("Failed to fetch subscription:", error);
    }
  };

  const handleManageSubscription = async () => {
    setLoadingPortal(true);
    
    try {
      // If no subscription, redirect to pricing
      if (!subscription?.stripeCustomerId) {
        window.location.href = "/pricing";
        return;
      }

      // Create Stripe portal session
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-2071350e/stripe/create-portal-session`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.access_token || publicAnonKey}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create portal session");
      }

      const { url } = await response.json();
      window.location.href = url;
    } catch (error) {
      console.error("Portal error:", error);
      toast.error("Failed to open subscription management");
      setLoadingPortal(false);
    }
  };

  const getPlanDisplayName = (tier: string) => {
    const names: Record<string, string> = {
      free: "Free",
      starter: "Starter",
      pro: "Pro",
      enterprise: "Enterprise",
    };
    return names[tier?.toLowerCase()] || "Free";
  };

  const getPlanPrice = (tier: string) => {
    const prices: Record<string, string> = {
      free: "$0",
      starter: "$29",
      pro: "$79",
      enterprise: "$199",
    };
    return prices[tier?.toLowerCase()] || "$0";
  };

  return (
    <div className="min-h-screen" style={{ background: '#F8F7F4', minHeight: '100vh', fontFamily: "'DM Sans', system-ui, sans-serif" }}>
      <div className="px-8 py-8">
        <div className="mb-8">
          <p className="text-[10px] font-semibold text-[#767570] uppercase tracking-wider mb-2">Account</p>
          <h1 className="text-[48px] font-normal text-[#0E0F0C] tracking-tight" style={{ fontFamily: "'Instrument Serif', Georgia, serif", letterSpacing: '-1px' }}>Settings</h1>
          <p className="mt-2 text-[14px] text-[#767570]">Manage your account settings and preferences</p>
        </div>

        <div className="space-y-6 max-w-4xl">
          {/* Profile Settings */}
          <div className="bg-white rounded-xl border border-[rgba(0,0,0,0.07)] overflow-hidden">
            <div className="p-6 border-b border-[rgba(0,0,0,0.07)]">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-[#E5F4EE]">
                  <User className="size-5 text-[#0A7A52]" />
                </div>
                <h2 className="text-lg font-semibold text-[#0E0F0C]">Profile Information</h2>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#0E0F0C] mb-2">Full Name</label>
                <input
                  type="text"
                  defaultValue={user?.name || ""}
                  className="w-full px-4 py-2.5 bg-[#F8F7F4] border border-[rgba(0,0,0,0.07)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0A7A52]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#0E0F0C] mb-2">Email Address</label>
                <input
                  type="email"
                  defaultValue={user?.email || ""}
                  className="w-full px-4 py-2.5 bg-[#F8F7F4] border border-[rgba(0,0,0,0.07)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0A7A52]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#0E0F0C] mb-2">Phone Number</label>
                <input
                  type="tel"
                  defaultValue={user?.phone || ""}
                  className="w-full px-4 py-2.5 bg-[#F8F7F4] border border-[rgba(0,0,0,0.07)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0A7A52]"
                />
              </div>
              <button className="px-6 py-2.5 bg-[#0A7A52] hover:bg-[#0A7A52]/90 text-white rounded-lg font-medium transition-colors">
                Save Changes
              </button>
            </div>
          </div>

          {/* Notification Settings */}
          <div className="bg-white rounded-xl border border-[rgba(0,0,0,0.07)] overflow-hidden">
            <div className="p-6 border-b border-[rgba(0,0,0,0.07)]">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-[#F3E8FF]">
                  <Bell className="size-5 text-[#9333EA]" />
                </div>
                <h2 className="text-lg font-semibold text-[#0E0F0C]">Notifications</h2>
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
                    <p className="font-medium text-[#0E0F0C]">{item.label}</p>
                    <p className="text-sm text-[#767570] mt-1">{item.description}</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" defaultChecked className="sr-only peer" />
                    <div className="w-11 h-6 bg-[rgba(0,0,0,0.1)] peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[#0A7A52] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-[rgba(0,0,0,0.07)] after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#0A7A52]"></div>
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Compliance */}
          <div className="bg-white rounded-xl border border-[rgba(0,0,0,0.07)] overflow-hidden">
            <div className="p-6 border-b border-[rgba(0,0,0,0.07)]">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-[#E5F4EE]">
                  <Shield className="size-5 text-[#0A7A52]" />
                </div>
                <h2 className="text-lg font-semibold text-[#0E0F0C]">Ontario LTB Compliance</h2>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-3">
                <div className="flex items-center justify-between p-4 bg-[#E5F4EE] border border-[rgba(10,122,82,0.2)] rounded-lg">
                  <div className="flex items-center gap-3">
                    <FileText className="size-5 text-[#0A7A52]" />
                    <div>
                      <p className="font-medium text-[#0E0F0C]">Standard Lease Template</p>
                      <p className="text-sm text-[#767570]">Ontario RTA Compliant (2026)</p>
                    </div>
                  </div>
                  <span className="text-[#0A7A52] text-sm font-medium">✓ Active</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-[#E5F4EE] border border-[rgba(10,122,82,0.2)] rounded-lg">
                  <div className="flex items-center gap-3">
                    <Building2 className="size-5 text-[#0A7A52]" />
                    <div>
                      <p className="font-medium text-[#0E0F0C]">Property Registration</p>
                      <p className="text-sm text-[#767570]">All properties registered</p>
                    </div>
                  </div>
                  <span className="text-[#0A7A52] text-sm font-medium">✓ Verified</span>
                </div>
              </div>
            </div>
          </div>

          {/* Billing */}
          <div className="bg-white rounded-xl border border-[rgba(0,0,0,0.07)] overflow-hidden">
            <div className="p-6 border-b border-[rgba(0,0,0,0.07)]">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-[#FFF4E6]">
                  <CreditCard className="size-5 text-[#F59E0B]" />
                </div>
                <h2 className="text-lg font-semibold text-[#0E0F0C]">Billing & Subscription</h2>
              </div>
            </div>
            <div className="p-6">
              <div className="bg-gradient-to-br from-[#E5F4EE] to-[#F8F7F4] border border-[rgba(10,122,82,0.15)] rounded-lg p-6 mb-4">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-[#0E0F0C]">
                      {getPlanDisplayName(subscription?.subscriptionTier)} Plan
                    </h3>
                    <p className="text-sm text-[#767570] mt-1">
                      {subscription?.subscriptionStatus === "active" ? "Active" : "Inactive"} ·{" "}
                      {subscription?.subscriptionTier === "free" && "Up to 1 property, 5 tenants"}
                      {subscription?.subscriptionTier === "starter" && "Up to 5 properties, 25 tenants"}
                      {subscription?.subscriptionTier === "pro" && "Up to 20 properties, 100 tenants"}
                      {subscription?.subscriptionTier === "enterprise" && "Unlimited properties & tenants"}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-bold text-[#0A7A52]">
                      {getPlanPrice(subscription?.subscriptionTier)}
                    </p>
                    <p className="text-sm text-[#767570]">/month</p>
                  </div>
                </div>
                
                {subscription?.subscriptionTier !== "free" && (
                  <p className="text-sm text-[#767570] mb-4">
                    Next billing date: {new Date(new Date().setMonth(new Date().getMonth() + 1)).toLocaleDateString()}
                  </p>
                )}

                <div className="flex gap-3">
                  <button
                    onClick={handleManageSubscription}
                    disabled={loadingPortal}
                    className="px-4 py-2 bg-white hover:bg-[#F8F7F4] border border-[rgba(0,0,0,0.07)] text-[#0E0F0C] rounded-lg font-medium transition-colors text-sm flex items-center gap-2"
                  >
                    {loadingPortal ? <ButtonSpinner /> : "Manage Subscription"}
                  </button>
                  
                  {subscription?.subscriptionTier === "free" && (
                    <Link
                      to="/pricing"
                      className="px-4 py-2 bg-gradient-to-r from-[#0A7A52] to-[#085D3D] hover:shadow-lg text-white rounded-lg font-medium transition-all text-sm"
                    >
                      Upgrade Plan
                    </Link>
                  )}
                </div>
              </div>

              {/* Payment Method */}
              {subscription?.stripeCustomerId && (
                <div className="p-4 bg-[#F8F7F4] rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <CreditCard className="size-5 text-[#767570]" />
                      <div>
                        <p className="font-medium text-[#0E0F0C]">Payment Method</p>
                        <p className="text-sm text-[#767570]">Manage via Stripe portal</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
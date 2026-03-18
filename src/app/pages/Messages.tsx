import { MessagingCenter } from "../components/MessagingCenter";
import { MessageSquare, Users, CheckCircle, Clock } from "lucide-react";

export function Messages() {
  const stats = [
    {
      label: "Total Conversations",
      value: "12",
      icon: MessageSquare,
      color: "indigo",
    },
    {
      label: "Unread Messages",
      value: "3",
      icon: Clock,
      color: "amber",
    },
    {
      label: "Active Chats",
      value: "5",
      icon: Users,
      color: "green",
    },
    {
      label: "Resolved Today",
      value: "8",
      icon: CheckCircle,
      color: "purple",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" style={{ background: '#F8F7F4', minHeight: '100vh', fontFamily: "'DM Sans', system-ui, sans-serif" }}>
        <div className="mb-8">
          <p className="text-[10px] font-semibold text-[#767570] uppercase tracking-wider mb-2">Communication</p>
          <h1 className="text-[48px] font-normal text-[#0E0F0C] tracking-tight" style={{ fontFamily: "'Instrument Serif', Georgia, serif", letterSpacing: '-1px' }}>Messages</h1>
          <p className="mt-2 text-[14px] text-[#767570]">Communicate with tenants and property managers</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div key={idx} className="bg-white rounded-xl border border-[rgba(0,0,0,0.07)] p-4">
                <div className="flex items-center gap-3">
                  <div
                    className={`p-2 rounded-lg ${
                      stat.color === "indigo"
                        ? "bg-[#E5F4EE]"
                        : stat.color === "amber"
                        ? "bg-[#FFF4E6]"
                        : stat.color === "green"
                        ? "bg-[#E5F4EE]"
                        : "bg-[#F3E8FF]"
                    }`}
                  >
                    <Icon
                      className={`size-5 ${
                        stat.color === "indigo"
                          ? "text-[#0A7A52]"
                          : stat.color === "amber"
                          ? "text-[#F59E0B]"
                          : stat.color === "green"
                          ? "text-[#0A7A52]"
                          : "text-[#9333EA]"
                      }`}
                    />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-[#0E0F0C]">{stat.value}</p>
                    <p className="text-sm text-[#767570]">{stat.label}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Messaging Center */}
        <MessagingCenter />
      </div>
    </div>
  );
}
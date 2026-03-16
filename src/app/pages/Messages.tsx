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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">Messages</h1>
          <p className="mt-2 text-slate-600">
            Communicate with tenants and applicants in real-time
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div key={idx} className="bg-white rounded-xl border border-slate-200 p-4">
                <div className="flex items-center gap-3">
                  <div
                    className={`p-2 rounded-lg ${
                      stat.color === "indigo"
                        ? "bg-indigo-50"
                        : stat.color === "amber"
                        ? "bg-amber-50"
                        : stat.color === "green"
                        ? "bg-green-50"
                        : "bg-purple-50"
                    }`}
                  >
                    <Icon
                      className={`size-5 ${
                        stat.color === "indigo"
                          ? "text-indigo-600"
                          : stat.color === "amber"
                          ? "text-amber-600"
                          : stat.color === "green"
                          ? "text-green-600"
                          : "text-purple-600"
                      }`}
                    />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
                    <p className="text-sm text-slate-600">{stat.label}</p>
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

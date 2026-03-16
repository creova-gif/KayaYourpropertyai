import { useNavigate } from "react-router";
import { motion } from "motion/react";
import {
  Building2,
  Users,
  FileText,
  DollarSign,
  CheckCircle2,
  Clock,
  Wrench,
  ChevronRight,
  Sparkles,
  TrendingUp,
  AlertTriangle,
  Bell,
  Zap,
} from "lucide-react";

export function DashboardEnhanced() {
  const navigate = useNavigate();

  // Zero Thinking - Immediate Action Items
  const actionItems = [
    {
      id: 1,
      priority: "high",
      title: "3 Applications Awaiting Review",
      description: "Sarah Kim, Michael Patel, Jason Lee",
      icon: FileText,
      color: "indigo",
      action: "Review Applications",
      route: "/colorful/applications",
      stats: { total: 3, urgent: 2 },
    },
    {
      id: 2,
      priority: "high",
      title: "2 Rent Payments Due Today",
      description: "Unit 4A ($2,300) • Unit 2B ($2,100)",
      icon: DollarSign,
      color: "green",
      action: "View Payments",
      route: "/colorful/payments",
      stats: { total: 2, amount: "$4,400" },
    },
    {
      id: 3,
      priority: "medium",
      title: "1 Maintenance Request Pending",
      description: "Kitchen sink leak - Unit 3A",
      icon: Wrench,
      color: "amber",
      action: "Assign Contractor",
      route: "/colorful/maintenance",
      stats: { total: 1, urgent: 0 },
    },
  ];

  // AI Insights - Magic Moments
  const aiInsights = [
    {
      type: "opportunity",
      icon: TrendingUp,
      title: "Rent Optimization Detected",
      message: "Unit 302 rent could increase by $150 based on market demand",
      action: "View Analysis",
      color: "green",
    },
    {
      type: "success",
      icon: CheckCircle2,
      title: "Strong Applicant Pool",
      message: "3 high-quality applications with 90+ AI scores received today",
      action: "Review Now",
      color: "blue",
    },
    {
      type: "alert",
      icon: AlertTriangle,
      title: "Lease Renewal Alert",
      message: "2 leases expiring in 60 days - send renewal notices",
      action: "Send Notices",
      color: "amber",
    },
  ];

  // Command Center Metrics
  const metrics = [
    { label: "Properties", value: "3", subtext: "12 units total", icon: Building2, color: "indigo" },
    { label: "Occupancy Rate", value: "92%", subtext: "11 of 12 units", icon: Users, color: "green" },
    { label: "Monthly Revenue", value: "$27,600", subtext: "+12% this month", icon: DollarSign, color: "purple" },
    { label: "Avg Response", value: "2.3 hrs", subtext: "AI automation", icon: Zap, color: "amber" },
  ];

  // Timeline - Recent Activity
  const timeline = [
    { time: "2 min ago", event: "New application received", user: "Emma Rodriguez", type: "application" },
    { time: "1 hour ago", event: "Rent payment received", user: "John Doe - Unit 4A", type: "payment" },
    { time: "3 hours ago", event: "Maintenance completed", user: "HVAC repair - Unit 2B", type: "maintenance" },
    { time: "5 hours ago", event: "Lease signed", user: "Sarah Kim - Unit 5A", type: "lease" },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Welcome back, Justin</h1>
          <p className="text-lg text-slate-600">Here's what needs your attention</p>
        </motion.div>

        {/* Zero Thinking Action Cards */}
        <motion.div variants={container} initial="hidden" animate="show" className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {actionItems.map((item) => {
            const Icon = item.icon;
            const borderColor =
              item.priority === "high"
                ? "border-l-red-500"
                : item.priority === "medium"
                ? "border-l-amber-500"
                : "border-l-green-500";

            return (
              <motion.div
                key={item.id}
                variants={item}
                whileHover={{ scale: 1.02, boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1)" }}
                className={`bg-white rounded-xl border-l-4 ${borderColor} shadow-lg p-6 cursor-pointer group`}
                onClick={() => navigate(item.route)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div
                    className={`p-3 rounded-lg ${
                      item.color === "indigo"
                        ? "bg-indigo-50 group-hover:bg-indigo-100"
                        : item.color === "green"
                        ? "bg-green-50 group-hover:bg-green-100"
                        : "bg-amber-50 group-hover:bg-amber-100"
                    } transition-colors`}
                  >
                    <Icon
                      className={`size-6 ${
                        item.color === "indigo"
                          ? "text-indigo-600"
                          : item.color === "green"
                          ? "text-green-600"
                          : "text-amber-600"
                      }`}
                    />
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold ${
                      item.priority === "high"
                        ? "bg-red-100 text-red-700"
                        : "bg-amber-100 text-amber-700"
                    }`}
                  >
                    {item.stats.urgent || item.stats.total} URGENT
                  </span>
                </div>

                <h3 className="font-bold text-slate-900 text-lg mb-2">{item.title}</h3>
                <p className="text-sm text-slate-600 mb-4">{item.description}</p>

                <button className="w-full flex items-center justify-between px-4 py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-lg font-medium transition-colors group-hover:shadow-lg">
                  <span>{item.action}</span>
                  <ChevronRight className="size-5" />
                </button>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Command Center Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {metrics.map((metric, idx) => {
            const Icon = metric.icon;
            return (
              <div key={idx} className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`p-3 rounded-lg ${
                      metric.color === "indigo"
                        ? "bg-indigo-50"
                        : metric.color === "green"
                        ? "bg-green-50"
                        : metric.color === "purple"
                        ? "bg-purple-50"
                        : "bg-amber-50"
                    }`}
                  >
                    <Icon
                      className={`size-6 ${
                        metric.color === "indigo"
                          ? "text-indigo-600"
                          : metric.color === "green"
                          ? "text-green-600"
                          : metric.color === "purple"
                          ? "text-purple-600"
                          : "text-amber-600"
                      }`}
                    />
                  </div>
                </div>
                <p className="text-sm text-slate-600 mb-1">{metric.label}</p>
                <p className="text-3xl font-bold text-slate-900 mb-1">{metric.value}</p>
                <p className="text-xs text-slate-500">{metric.subtext}</p>
              </div>
            );
          })}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* AI Insights - Magic Moments */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-2 bg-gradient-to-br from-indigo-600 to-purple-700 rounded-2xl p-6 text-white shadow-2xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                <Sparkles className="size-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold">AI Property Intelligence</h3>
                <p className="text-sm opacity-90">Smart insights to maximize your returns</p>
              </div>
            </div>

            <div className="space-y-4">
              {aiInsights.map((insight, idx) => {
                const Icon = insight.icon;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + idx * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    className="bg-white/10 backdrop-blur-sm rounded-xl p-4 hover:bg-white/20 transition-all cursor-pointer"
                  >
                    <div className="flex items-start gap-4">
                      <div className="p-2 bg-white/20 rounded-lg">
                        <Icon className="size-5" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold mb-1">{insight.title}</h4>
                        <p className="text-sm opacity-90 mb-3">{insight.message}</p>
                        <button className="text-sm font-medium flex items-center gap-2 hover:gap-3 transition-all">
                          {insight.action} <ChevronRight className="size-4" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <button
              onClick={() => navigate("/colorful/ai-property-analyzer")}
              className="w-full mt-6 py-3 bg-white text-indigo-600 rounded-xl font-semibold hover:shadow-xl transition-all flex items-center justify-center gap-2"
            >
              <Sparkles className="size-5" />
              Run Full Property Analysis
            </button>
          </motion.div>

          {/* Timeline - Recent Activity */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-2xl border border-slate-200 p-6 shadow-lg"
          >
            <div className="flex items-center gap-3 mb-6">
              <Clock className="size-6 text-slate-600" />
              <h3 className="text-lg font-bold text-slate-900">Recent Activity</h3>
            </div>

            <div className="space-y-4">
              {timeline.map((event, idx) => (
                <div key={idx} className="relative pl-6 pb-4 border-l-2 border-slate-200 last:border-l-0 last:pb-0">
                  <div
                    className={`absolute left-[-9px] top-0 size-4 rounded-full ${
                      event.type === "application"
                        ? "bg-indigo-600"
                        : event.type === "payment"
                        ? "bg-green-600"
                        : event.type === "maintenance"
                        ? "bg-amber-600"
                        : "bg-purple-600"
                    }`}
                  />
                  <p className="text-xs text-slate-500 mb-1">{event.time}</p>
                  <p className="text-sm font-medium text-slate-900">{event.event}</p>
                  <p className="text-xs text-slate-600">{event.user}</p>
                </div>
              ))}
            </div>

            <button className="w-full mt-4 py-2 text-sm border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors font-medium text-slate-700">
              View All Activity
            </button>
          </motion.div>
        </div>

        {/* Anticipation Design - Smart Suggestions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl border border-amber-200 p-6"
        >
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-amber-600 rounded-xl">
                <Bell className="size-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">AI Suggestion</h3>
                <p className="text-slate-700 mb-4">
                  <strong>Rent payment reminders</strong> are due in 2 days for 3 tenants. Send automated
                  reminders now?
                </p>
                <div className="flex items-center gap-3">
                  <button className="px-6 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-medium transition-colors">
                    Send Reminders
                  </button>
                  <button className="px-6 py-2 border border-slate-300 rounded-lg font-medium text-slate-700 hover:bg-white transition-colors">
                    Skip
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

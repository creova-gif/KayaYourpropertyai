import { useNavigate, Link } from "react-router";
import { 
  Building2, 
  Users, 
  FileText, 
  AlertTriangle, 
  TrendingUp, 
  CheckCircle2,
  Clock,
  DollarSign
} from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from "recharts";
import { GamificationBadge } from "../components/GamificationBadge";
import { AICoachSuggestion } from "../components/AICoachSuggestion";
import { PropertyHeatmap } from "../components/PropertyHeatmap";
import "../utils/suppressRechartsWarnings";

export function Dashboard() {
  const stats = [
    { name: "Total Units", value: "12", change: "+2", icon: Building2, color: "indigo" },
    { name: "Occupied", value: "10", change: "83%", icon: CheckCircle2, color: "green" },
    { name: "Applications", value: "6", change: "+3", icon: FileText, color: "blue" },
    { name: "Monthly Revenue", value: "$27,600", change: "+12%", icon: DollarSign, color: "purple" },
  ];

  const recentApplications = [
    { name: "Sarah Kim", unit: "Unit 4A", score: 92, status: "pending", risk: "low" },
    { name: "Michael Patel", unit: "Unit 2B", score: 87, status: "pending", risk: "low" },
    { name: "Jason Lee", unit: "Unit 1C", score: 73, status: "reviewing", risk: "medium" },
  ];

  const aiInsights = [
    { type: "warning", message: "Tenant risk detected in Unit 4 - Payment history shows 2 late payments" },
    { type: "success", message: "3 high-quality applications received today" },
    { type: "info", message: "Rent increase reminder: Unit 2A eligible for increase on April 1st" },
  ];

  // Chart data
  const occupancyData = [
    { id: 'king-st', property: "King St", occupied: 4, vacant: 1, total: 5 },
    { id: 'queen-st', property: "Queen St", occupied: 3, vacant: 2, total: 5 },
    { id: 'bloor-st', property: "Bloor St", occupied: 2, vacant: 0, total: 2 },
  ];

  const revenueData = [
    { id: 'oct-2025', month: "Oct", revenue: 24500 },
    { id: 'nov-2025', month: "Nov", revenue: 25800 },
    { id: 'dec-2025', month: "Dec", revenue: 26200 },
    { id: 'jan-2026', month: "Jan", revenue: 27100 },
    { id: 'feb-2026', month: "Feb", revenue: 26900 },
    { id: 'mar-2026', month: "Mar", revenue: 27600 },
  ];

  const riskDistribution = [
    { id: 'low-risk', name: "Low Risk", value: 7, color: "#22c55e" },
    { id: 'medium-risk', name: "Medium Risk", value: 2, color: "#f59e0b" },
    { id: 'high-risk', name: "High Risk", value: 1, color: "#ef4444" },
  ];

  // Gamification data
  const gamificationData = [
    { type: "time-saved" as const, value: "12 hrs", label: "AI saved you this week" },
    { type: "streak" as const, value: "100%", label: "All units rented" },
    { type: "achievement" as const, value: "50", label: "Tenants approved" },
  ];

  // AI Coach suggestions
  const coachSuggestions = [
    {
      title: "5 Low-Risk Applicants Ready",
      description: "Sarah Kim, Michael Patel, and 3 others have excellent scores. Quick approval recommended.",
      action: "Review & Approve",
      priority: "high" as const
    },
    {
      title: "Maintenance Backlog",
      description: "2 high-priority maintenance requests need attention in Queen St property.",
      action: "View Maintenance",
      priority: "medium" as const
    },
    {
      title: "Rent Increase Opportunity",
      description: "Unit 2A lease expires in 60 days. Consider market-rate adjustment.",
      action: "Review Lease",
      priority: "low" as const
    }
  ];

  // Property heatmap data
  const heatmapProperties = [
    { id: "1", name: "123 King Street", risk: "low" as const, occupancy: 100, units: 5 },
    { id: "2", name: "456 Queen Street", risk: "medium" as const, occupancy: 80, units: 5 },
    { id: "3", name: "789 Bloor Street", risk: "low" as const, occupancy: 100, units: 2 },
  ];

  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">Good evening, Justin 👋</h1>
          <p className="mt-2 text-slate-600">Here's what's happening with your properties today.</p>
        </div>

        {/* Gamification Badges */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {gamificationData.map((badge, idx) => (
            <GamificationBadge
              key={idx}
              type={badge.type}
              value={badge.value}
              label={badge.label}
            />
          ))}
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.name} className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between">
                  <div className={`p-3 rounded-lg bg-${stat.color}-50`}>
                    <Icon className={`size-6 text-${stat.color}-600`} />
                  </div>
                  <span className="text-sm font-medium text-green-600">{stat.change}</span>
                </div>
                <h3 className="mt-4 text-2xl font-bold text-slate-900">{stat.value}</h3>
                <p className="text-sm text-slate-600">{stat.name}</p>
              </div>
            );
          })}
        </div>

        {/* AI Coach Suggestions */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <h2 className="text-xl font-semibold text-slate-900">AI Coach Suggestions</h2>
            <span className="px-2 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs font-medium">
              {coachSuggestions.length} actions
            </span>
          </div>
          <AICoachSuggestion suggestions={coachSuggestions} />
        </div>

        {/* Property Heatmap */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-slate-900 mb-4">Property Overview</h2>
          <PropertyHeatmap properties={heatmapProperties} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Revenue Trend Chart */}
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600">
                <TrendingUp className="size-5 text-white" />
              </div>
              <h2 className="text-lg font-semibold text-slate-900">Revenue Trend</h2>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={revenueData} id="revenue-chart">
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="month" stroke="#64748b" fontSize={12} />
                <YAxis stroke="#64748b" fontSize={12} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px' }}
                  formatter={(value: number) => [`$${value.toLocaleString()}`, 'Revenue']}
                />
                <Line type="monotone" dataKey="revenue" stroke="#6366f1" strokeWidth={3} dot={{ fill: '#6366f1', r: 4 }} key="revenue-line" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Occupancy by Property */}
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h2 className="text-lg font-semibold text-slate-900 mb-6">Occupancy by Property</h2>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={occupancyData} id="occupancy-chart" margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="property" stroke="#64748b" fontSize={12} />
                <YAxis stroke="#64748b" fontSize={12} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px' }}
                />
                <Bar dataKey="occupied" fill="#22c55e" radius={[8, 8, 0, 0]} name="Occupied Units" />
                <Bar dataKey="vacant" fill="#e2e8f0" radius={[8, 8, 0, 0]} name="Vacant Units" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* AI Insights */}
          <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-6">
            <div className="flex items-center mb-6">
              <div className="p-2 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600">
                <TrendingUp className="size-5 text-white" />
              </div>
              <h2 className="ml-3 text-lg font-semibold text-slate-900">AI Insights</h2>
            </div>
            <div className="space-y-4">
              {aiInsights.map((insight, idx) => (
                <div key={idx} className="flex gap-3 p-4 rounded-lg bg-slate-50 border border-slate-100">
                  {insight.type === "warning" && <AlertTriangle className="size-5 text-amber-500 flex-shrink-0 mt-0.5" />}
                  {insight.type === "success" && <CheckCircle2 className="size-5 text-green-500 flex-shrink-0 mt-0.5" />}
                  {insight.type === "info" && <Clock className="size-5 text-blue-500 flex-shrink-0 mt-0.5" />}
                  <p className="text-sm text-slate-700">{insight.message}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Tenant Risk Distribution */}
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h2 className="text-lg font-semibold text-slate-900 mb-6">Tenant Risk</h2>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={riskDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {riskDistribution.map((entry) => (
                    <Cell key={`cell-${entry.id}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              {riskDistribution.map((item) => (
                <div key={`legend-${item.id}`} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="size-3 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-slate-700">{item.name}</span>
                  </div>
                  <span className="font-semibold text-slate-900">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Applications */}
        <div className="mt-6 bg-white rounded-xl border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-slate-900">Recent Applications</h2>
            <Link to="/colorful/applications" className="text-sm text-indigo-600 hover:text-indigo-700 font-medium">
              View all →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {recentApplications.map((app) => (
              <div key={app.name} className="flex items-center justify-between p-4 rounded-lg border border-slate-200 hover:border-indigo-200 hover:bg-indigo-50/30 transition-all cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className="size-12 rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center">
                    <Users className="size-6 text-indigo-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-slate-900">{app.name}</h3>
                    <p className="text-sm text-slate-500">{app.unit}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-lg font-bold text-slate-900">{app.score}</span>
                    <span className="text-xs text-slate-500">/100</span>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    app.risk === "low" ? "bg-green-100 text-green-700" :
                    app.risk === "medium" ? "bg-amber-100 text-amber-700" :
                    "bg-red-100 text-red-700"
                  }`}>
                    {app.risk} risk
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Rent Status */}
        <div className="mt-6 bg-white rounded-xl border border-slate-200 p-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-6">Rent Payment Status</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="text-center p-6 rounded-lg bg-green-50 border border-green-200">
              <CheckCircle2 className="size-8 text-green-600 mx-auto mb-2" />
              <p className="text-3xl font-bold text-green-900">9</p>
              <p className="text-sm text-green-700">Paid on Time</p>
            </div>
            <div className="text-center p-6 rounded-lg bg-amber-50 border border-amber-200">
              <Clock className="size-8 text-amber-600 mx-auto mb-2" />
              <p className="text-3xl font-bold text-amber-900">1</p>
              <p className="text-sm text-amber-700">Overdue</p>
            </div>
            <div className="text-center p-6 rounded-lg bg-slate-50 border border-slate-200">
              <Building2 className="size-8 text-slate-600 mx-auto mb-2" />
              <p className="text-3xl font-bold text-slate-900">2</p>
              <p className="text-sm text-slate-700">Vacant</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
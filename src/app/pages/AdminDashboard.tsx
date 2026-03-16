import {
  Shield,
  Users,
  Building2,
  AlertTriangle,
  CheckCircle,
  TrendingUp,
  Activity,
  FileText,
  DollarSign,
  Clock,
  UserX,
  Flag,
  Eye,
  Download,
} from "lucide-react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export function AdminDashboard() {
  // Platform statistics
  const platformStats = {
    totalUsers: 1247,
    totalProperties: 342,
    totalUnits: 1856,
    activeLeases: 1624,
    monthlyRevenue: 285400,
    fraudDetections: 23,
    complianceIssues: 8,
    systemHealth: 99.7,
  };

  // User activity data
  const userActivity = [
    { day: "Mon", landlords: 145, tenants: 320, applications: 42 },
    { day: "Tue", landlords: 158, tenants: 342, applications: 38 },
    { day: "Wed", landlords: 172, tenants: 365, applications: 51 },
    { day: "Thu", landlords: 165, tenants: 358, applications: 47 },
    { day: "Fri", landlords: 189, tenants: 398, applications: 62 },
    { day: "Sat", landlords: 134, tenants: 287, applications: 28 },
    { day: "Sun", landlords: 121, tenants: 265, applications: 19 },
  ];

  // Fraud alerts
  const fraudAlerts = [
    {
      id: 1,
      type: "Duplicate Documents",
      severity: "high",
      user: "John Smith",
      property: "456 Queen St",
      timestamp: "2 hours ago",
      status: "under_review",
    },
    {
      id: 2,
      type: "Identity Mismatch",
      severity: "critical",
      user: "Sarah Chen",
      property: "123 King St",
      timestamp: "5 hours ago",
      status: "flagged",
    },
    {
      id: 3,
      type: "Suspicious Payment",
      severity: "medium",
      user: "Mike Johnson",
      property: "789 Bloor St",
      timestamp: "1 day ago",
      status: "resolved",
    },
  ];

  // Compliance issues
  const complianceIssues = [
    {
      id: 1,
      issue: "Missing LTB Clause",
      property: "456 Queen St W",
      landlord: "PropertyCo Inc",
      severity: "high",
      dueDate: "Mar 20, 2026",
    },
    {
      id: 2,
      issue: "Lease Expiration Notice",
      property: "123 King St",
      landlord: "John Mafie",
      severity: "medium",
      dueDate: "Mar 25, 2026",
    },
    {
      id: 3,
      issue: "Rent Increase Notice Required",
      property: "789 Bloor St",
      landlord: "Urban Properties",
      severity: "low",
      dueDate: "Apr 1, 2026",
    },
  ];

  // System metrics
  const systemMetrics = [
    {
      label: "Total Users",
      value: platformStats.totalUsers.toLocaleString(),
      change: "+12.5%",
      icon: Users,
      color: "indigo",
    },
    {
      label: "Active Properties",
      value: platformStats.totalProperties.toLocaleString(),
      change: "+8.3%",
      icon: Building2,
      color: "green",
    },
    {
      label: "Fraud Detections",
      value: platformStats.fraudDetections,
      change: "-15.2%",
      icon: Shield,
      color: "red",
    },
    {
      label: "System Health",
      value: `${platformStats.systemHealth}%`,
      change: "+0.2%",
      icon: Activity,
      color: "purple",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Admin Dashboard</h1>
            <p className="mt-2 text-slate-600">
              Platform monitoring, compliance, and fraud detection
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors">
              <Download className="size-5 text-slate-600" />
              <span className="font-medium text-slate-700">Export Report</span>
            </button>
          </div>
        </div>

        {/* System Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {systemMetrics.map((metric, idx) => {
            const Icon = metric.icon;
            return (
              <div key={idx} className="bg-white rounded-xl border border-slate-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`p-3 rounded-lg ${
                      metric.color === "indigo"
                        ? "bg-indigo-50"
                        : metric.color === "green"
                        ? "bg-green-50"
                        : metric.color === "red"
                        ? "bg-red-50"
                        : "bg-purple-50"
                    }`}
                  >
                    <Icon
                      className={`size-6 ${
                        metric.color === "indigo"
                          ? "text-indigo-600"
                          : metric.color === "green"
                          ? "text-green-600"
                          : metric.color === "red"
                          ? "text-red-600"
                          : "text-purple-600"
                      }`}
                    />
                  </div>
                  <span
                    className={`text-sm font-medium ${
                      metric.change.startsWith("+") ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {metric.change}
                  </span>
                </div>
                <p className="text-sm text-slate-600 mb-1">{metric.label}</p>
                <p className="text-2xl font-bold text-slate-900">{metric.value}</p>
              </div>
            );
          })}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* User Activity */}
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-slate-900">User Activity</h3>
              <p className="text-sm text-slate-600">Weekly active users by type</p>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={userActivity}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="day" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#ffffff",
                    border: "1px solid #e2e8f0",
                    borderRadius: "8px",
                  }}
                />
                <Bar dataKey="landlords" fill="#6366F1" radius={[4, 4, 0, 0]} />
                <Bar dataKey="tenants" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
                <Bar dataKey="applications" fill="#EC4899" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
            <div className="flex items-center gap-6 mt-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="size-3 rounded-full bg-indigo-600"></div>
                <span className="text-slate-600">Landlords</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="size-3 rounded-full bg-purple-600"></div>
                <span className="text-slate-600">Tenants</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="size-3 rounded-full bg-pink-600"></div>
                <span className="text-slate-600">Applications</span>
              </div>
            </div>
          </div>

          {/* Platform Revenue */}
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-slate-900">Platform Revenue</h3>
              <p className="text-sm text-slate-600">Monthly recurring revenue trend</p>
            </div>
            <div className="mb-4">
              <p className="text-3xl font-bold text-slate-900">
                ${platformStats.monthlyRevenue.toLocaleString()}
              </p>
              <p className="text-sm text-green-600 font-medium mt-1">+18.2% from last month</p>
            </div>
            <ResponsiveContainer width="100%" height={240}>
              <LineChart
                data={[
                  { month: "Jan", revenue: 185000 },
                  { month: "Feb", revenue: 205000 },
                  { month: "Mar", revenue: 225000 },
                  { month: "Apr", revenue: 238000 },
                  { month: "May", revenue: 252000 },
                  { month: "Jun", revenue: 268000 },
                  { month: "Jul", revenue: 285400 },
                ]}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="month" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#ffffff",
                    border: "1px solid #e2e8f0",
                    borderRadius: "8px",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#10B981"
                  strokeWidth={3}
                  dot={{ fill: "#10B981", r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Fraud Alerts */}
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden mb-8">
          <div className="p-6 border-b border-slate-200 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-slate-900">Fraud Detection Alerts</h3>
              <p className="text-sm text-slate-600">AI-powered suspicious activity monitoring</p>
            </div>
            <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-medium">
              {fraudAlerts.filter((a) => a.status !== "resolved").length} Active
            </span>
          </div>
          <div className="divide-y divide-slate-200">
            {fraudAlerts.map((alert) => (
              <div key={alert.id} className="p-6 hover:bg-slate-50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4 flex-1">
                    <div
                      className={`p-2 rounded-lg ${
                        alert.severity === "critical"
                          ? "bg-red-100"
                          : alert.severity === "high"
                          ? "bg-orange-100"
                          : "bg-yellow-100"
                      }`}
                    >
                      <AlertTriangle
                        className={`size-5 ${
                          alert.severity === "critical"
                            ? "text-red-600"
                            : alert.severity === "high"
                            ? "text-orange-600"
                            : "text-yellow-600"
                        }`}
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="font-semibold text-slate-900">{alert.type}</h4>
                        <span
                          className={`px-2 py-0.5 rounded text-xs font-medium ${
                            alert.severity === "critical"
                              ? "bg-red-100 text-red-700"
                              : alert.severity === "high"
                              ? "bg-orange-100 text-orange-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {alert.severity}
                        </span>
                        <span
                          className={`px-2 py-0.5 rounded text-xs font-medium ${
                            alert.status === "flagged"
                              ? "bg-red-100 text-red-700"
                              : alert.status === "under_review"
                              ? "bg-blue-100 text-blue-700"
                              : "bg-green-100 text-green-700"
                          }`}
                        >
                          {alert.status.replace("_", " ")}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-slate-600">
                        <span>User: {alert.user}</span>
                        <span>•</span>
                        <span>Property: {alert.property}</span>
                        <span>•</span>
                        <span>{alert.timestamp}</span>
                      </div>
                    </div>
                  </div>
                  <button className="flex items-center gap-2 px-3 py-1.5 text-sm bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-lg font-medium transition-colors">
                    <Eye className="size-4" />
                    Review
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Compliance Issues */}
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="p-6 border-b border-slate-200 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-slate-900">Compliance Monitoring</h3>
              <p className="text-sm text-slate-600">LTB and regulatory compliance tracking</p>
            </div>
            <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-sm font-medium">
              {complianceIssues.length} Issues
            </span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Issue
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Property
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Landlord
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Severity
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Due Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-200">
                {complianceIssues.map((issue) => (
                  <tr key={issue.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Flag
                          className={`size-4 ${
                            issue.severity === "high"
                              ? "text-red-600"
                              : issue.severity === "medium"
                              ? "text-amber-600"
                              : "text-yellow-600"
                          }`}
                        />
                        <span className="font-medium text-slate-900">{issue.issue}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-700">{issue.property}</td>
                    <td className="px-6 py-4 text-sm text-slate-700">{issue.landlord}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium ${
                          issue.severity === "high"
                            ? "bg-red-100 text-red-700"
                            : issue.severity === "medium"
                            ? "bg-amber-100 text-amber-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {issue.severity}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-700">
                      <div className="flex items-center gap-2">
                        <Clock className="size-4 text-slate-400" />
                        {issue.dueDate}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <button className="text-sm text-indigo-600 hover:text-indigo-700 font-medium">
                        Notify Landlord
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

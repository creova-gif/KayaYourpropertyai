import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  Download, 
  Calendar,
  Building2,
  Users,
  Receipt,
  FileText,
  ArrowUpRight,
  ArrowDownRight,
  CreditCard,
  Wallet
} from "lucide-react";
import { useState } from "react";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

export function FinancialDashboard() {
  const [timeRange, setTimeRange] = useState("12months");

  // Revenue data
  const monthlyRevenue = [
    { month: "Jan", revenue: 42000, expenses: 8200, profit: 33800 },
    { month: "Feb", revenue: 44500, expenses: 7800, profit: 36700 },
    { month: "Mar", revenue: 46200, expenses: 9100, profit: 37100 },
    { month: "Apr", revenue: 47800, expenses: 8400, profit: 39400 },
    { month: "May", revenue: 49200, expenses: 8900, profit: 40300 },
    { month: "Jun", revenue: 51000, expenses: 9500, profit: 41500 },
    { month: "Jul", revenue: 52500, expenses: 10200, profit: 42300 },
    { month: "Aug", revenue: 54000, expenses: 9800, profit: 44200 },
    { month: "Sep", revenue: 55500, expenses: 10100, profit: 45400 },
    { month: "Oct", revenue: 56800, expenses: 9600, profit: 47200 },
    { month: "Nov", revenue: 58200, expenses: 10400, profit: 47800 },
    { month: "Dec", revenue: 59500, expenses: 11200, profit: 48300 },
  ];

  // Expense breakdown
  const expenseBreakdown = [
    { name: "Maintenance", value: 42000, color: "#6366F1" },
    { name: "Utilities", value: 28000, color: "#8B5CF6" },
    { name: "Insurance", value: 18000, color: "#EC4899" },
    { name: "Property Tax", value: 35000, color: "#F59E0B" },
    { name: "Management", value: 15000, color: "#10B981" },
  ];

  // Property performance
  const propertyPerformance = [
    { 
      property: "123 King Street",
      units: 2,
      revenue: 4700,
      expenses: 890,
      profit: 3810,
      occupancy: 100,
      trend: "up"
    },
    {
      property: "456 Queen Street West",
      units: 3,
      revenue: 6950,
      expenses: 1240,
      profit: 5710,
      occupancy: 100,
      trend: "up"
    },
    {
      property: "789 Bloor Street",
      units: 2,
      revenue: 6400,
      expenses: 1180,
      profit: 5220,
      occupancy: 100,
      trend: "stable"
    },
  ];

  // Financial metrics
  const metrics = {
    totalRevenue: 59500,
    totalExpenses: 11200,
    netProfit: 48300,
    avgProfitMargin: 81.2,
    collectionRate: 98.5,
    revenueGrowth: 12.3,
  };

  const stats = [
    {
      label: "Total Revenue",
      value: `$${metrics.totalRevenue.toLocaleString()}`,
      change: "+12.3%",
      trend: "up",
      icon: DollarSign,
      color: "indigo",
    },
    {
      label: "Net Profit",
      value: `$${metrics.netProfit.toLocaleString()}`,
      change: "+14.8%",
      trend: "up",
      icon: TrendingUp,
      color: "green",
    },
    {
      label: "Total Expenses",
      value: `$${metrics.totalExpenses.toLocaleString()}`,
      change: "+5.2%",
      trend: "up",
      icon: Wallet,
      color: "amber",
    },
    {
      label: "Profit Margin",
      value: `${metrics.avgProfitMargin}%`,
      change: "+2.1%",
      trend: "up",
      icon: Receipt,
      color: "purple",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Financial Dashboard</h1>
            <p className="mt-2 text-slate-600">
              Comprehensive financial analytics and reporting
            </p>
          </div>
          <div className="flex items-center gap-3">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="px-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="30days">Last 30 Days</option>
              <option value="3months">Last 3 Months</option>
              <option value="6months">Last 6 Months</option>
              <option value="12months">Last 12 Months</option>
              <option value="ytd">Year to Date</option>
            </select>
            <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors">
              <Download className="size-5" />
              Export Report
            </button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div key={idx} className="bg-white rounded-xl border border-slate-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`p-3 rounded-lg ${
                      stat.color === "indigo"
                        ? "bg-indigo-50"
                        : stat.color === "green"
                        ? "bg-green-50"
                        : stat.color === "amber"
                        ? "bg-amber-50"
                        : "bg-purple-50"
                    }`}
                  >
                    <Icon
                      className={`size-6 ${
                        stat.color === "indigo"
                          ? "text-indigo-600"
                          : stat.color === "green"
                          ? "text-green-600"
                          : stat.color === "amber"
                          ? "text-amber-600"
                          : "text-purple-600"
                      }`}
                    />
                  </div>
                  <div className="flex items-center gap-1 text-sm">
                    {stat.trend === "up" ? (
                      <>
                        <ArrowUpRight className="size-4 text-green-600" />
                        <span className="text-green-600 font-medium">{stat.change}</span>
                      </>
                    ) : (
                      <>
                        <ArrowDownRight className="size-4 text-red-600" />
                        <span className="text-red-600 font-medium">{stat.change}</span>
                      </>
                    )}
                  </div>
                </div>
                <p className="text-sm text-slate-600 mb-1">{stat.label}</p>
                <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
              </div>
            );
          })}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Revenue vs Expenses */}
          <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-slate-900">Revenue vs Expenses</h3>
                <p className="text-sm text-slate-600">Monthly comparison</p>
              </div>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="size-3 rounded-full bg-indigo-600"></div>
                  <span className="text-slate-600">Revenue</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="size-3 rounded-full bg-amber-500"></div>
                  <span className="text-slate-600">Expenses</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="size-3 rounded-full bg-green-600"></div>
                  <span className="text-slate-600">Profit</span>
                </div>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyRevenue}>
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
                <Line type="monotone" dataKey="revenue" stroke="#6366F1" strokeWidth={2} dot={{ fill: "#6366F1" }} />
                <Line type="monotone" dataKey="expenses" stroke="#F59E0B" strokeWidth={2} dot={{ fill: "#F59E0B" }} />
                <Line type="monotone" dataKey="profit" stroke="#10B981" strokeWidth={2} dot={{ fill: "#10B981" }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Expense Breakdown */}
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-slate-900">Expense Breakdown</h3>
              <p className="text-sm text-slate-600">Total: $138,000</p>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={expenseBreakdown}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {expenseBreakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2 mt-4">
              {expenseBreakdown.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="size-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                    <span className="text-slate-700">{item.name}</span>
                  </div>
                  <span className="font-medium text-slate-900">${item.value.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Property Performance Table */}
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="p-6 border-b border-slate-200">
            <h3 className="text-lg font-semibold text-slate-900">Property Performance</h3>
            <p className="text-sm text-slate-600">Revenue, expenses, and profitability by property</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Property
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Units
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Revenue
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Expenses
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Net Profit
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Occupancy
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Trend
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-200">
                {propertyPerformance.map((property, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-indigo-50">
                          <Building2 className="size-5 text-indigo-600" />
                        </div>
                        <span className="font-medium text-slate-900">{property.property}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-700">
                      {property.units} units
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-medium text-slate-900">
                        ${property.revenue.toLocaleString()}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-slate-700">${property.expenses.toLocaleString()}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-bold text-green-600">
                        ${property.profit.toLocaleString()}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-slate-200 rounded-full h-2 max-w-[80px]">
                          <div
                            className="bg-green-600 h-2 rounded-full"
                            style={{ width: `${property.occupancy}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium text-slate-700">{property.occupancy}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {property.trend === "up" ? (
                        <div className="flex items-center gap-1 text-green-600">
                          <TrendingUp className="size-4" />
                          <span className="text-sm font-medium">Up</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1 text-slate-600">
                          <span className="text-sm font-medium">Stable</span>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          <button className="p-4 bg-white rounded-xl border border-slate-200 hover:border-indigo-300 hover:shadow-lg transition-all text-left group">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-indigo-50 group-hover:bg-indigo-100 transition-colors">
                <FileText className="size-5 text-indigo-600" />
              </div>
              <h4 className="font-semibold text-slate-900">Generate Invoice</h4>
            </div>
            <p className="text-sm text-slate-600">Create and send invoices to tenants</p>
          </button>

          <button className="p-4 bg-white rounded-xl border border-slate-200 hover:border-green-300 hover:shadow-lg transition-all text-left group">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-green-50 group-hover:bg-green-100 transition-colors">
                <Receipt className="size-5 text-green-600" />
              </div>
              <h4 className="font-semibold text-slate-900">Download Report</h4>
            </div>
            <p className="text-sm text-slate-600">Export financial statements</p>
          </button>

          <button className="p-4 bg-white rounded-xl border border-slate-200 hover:border-purple-300 hover:shadow-lg transition-all text-left group">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-purple-50 group-hover:bg-purple-100 transition-colors">
                <Calendar className="size-5 text-purple-600" />
              </div>
              <h4 className="font-semibold text-slate-900">Schedule Review</h4>
            </div>
            <p className="text-sm text-slate-600">Set up financial planning meeting</p>
          </button>
        </div>
      </div>
    </div>
  );
}

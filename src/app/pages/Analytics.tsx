import { TrendingUp, TrendingDown, DollarSign, Users, AlertTriangle, Building2 } from "lucide-react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts";

export function Analytics() {
  const revenueData = [
    { id: 'sep', month: "Sep", revenue: 23800, projected: 24000 },
    { id: 'oct', month: "Oct", revenue: 24500, projected: 24800 },
    { id: 'nov', month: "Nov", revenue: 25800, projected: 25500 },
    { id: 'dec', month: "Dec", revenue: 26200, projected: 26800 },
    { id: 'jan', month: "Jan", revenue: 27100, projected: 27200 },
    { id: 'feb', month: "Feb", revenue: 26900, projected: 27500 },
    { id: 'mar', month: "Mar", revenue: 27600, projected: 28000 },
    { id: 'apr', month: "Apr", revenue: null, projected: 28200 },
    { id: 'may', month: "May", revenue: null, projected: 28500 },
  ];

  const occupancyTrend = [
    { id: 'oct', month: "Oct", rate: 75 },
    { id: 'nov', month: "Nov", rate: 80 },
    { id: 'dec', month: "Dec", rate: 83 },
    { id: 'jan', month: "Jan", rate: 85 },
    { id: 'feb', month: "Feb", rate: 82 },
    { id: 'mar', month: "Mar", rate: 83 },
  ];

  const tenantChurnRisk = [
    { id: 'bob', tenant: "Bob Johnson", unit: "3A", risk: 78, reason: "Late payments" },
    { id: 'jason', tenant: "Jason Lee", unit: "1C", risk: 65, reason: "Lease ending soon" },
    { id: 'michael', tenant: "Michael Chen", unit: "2B", risk: 42, reason: "Maintenance issues" },
  ];

  const propertyPerformance = [
    { id: 'king', property: "123 King St", revenue: 11500, occupancy: 100, risk: 20 },
    { id: 'queen', property: "456 Queen St", revenue: 10200, occupancy: 80, risk: 45 },
    { id: 'bloor', property: "789 Bloor St", revenue: 6400, occupancy: 100, risk: 15 },
  ];

  const predictions = [
    {
      title: "Late Payment Probability",
      value: "23%",
      change: "+5%",
      trend: "up",
      description: "2 tenants likely to pay late next month",
      color: "amber"
    },
    {
      title: "Tenant Turnover Risk",
      value: "16%",
      change: "-3%",
      trend: "down",
      description: "Lower than industry average",
      color: "green"
    },
    {
      title: "Revenue Forecast",
      value: "$28,200",
      change: "+2.2%",
      trend: "up",
      description: "Expected revenue for April 2026",
      color: "indigo"
    },
    {
      title: "Maintenance Cost",
      value: "$1,240",
      change: "+18%",
      trend: "up",
      description: "Projected maintenance expenses",
      color: "red"
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">AI Analytics & Insights</h1>
          <p className="mt-2 text-slate-600">Predictive analytics powered by AI to help you make better decisions</p>
        </div>

        {/* AI Predictions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {predictions.map((pred) => (
            <div key={pred.title} className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <span className={`px-2 py-1 rounded-md text-xs font-medium bg-${pred.color}-100 text-${pred.color}-700`}>
                  AI Prediction
                </span>
                <div className={`flex items-center gap-1 text-sm ${pred.trend === "up" ? "text-red-600" : "text-green-600"}`}>
                  {pred.trend === "up" ? <TrendingUp className="size-4" /> : <TrendingDown className="size-4" />}
                  <span>{pred.change}</span>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">{pred.value}</h3>
              <p className="text-sm font-medium text-slate-900 mb-1">{pred.title}</p>
              <p className="text-xs text-slate-500">{pred.description}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Revenue Forecast */}
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-slate-900">Revenue Forecast</h2>
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <div className="flex items-center gap-1">
                  <div className="size-3 rounded-full bg-indigo-600" />
                  <span>Actual</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="size-3 rounded-full bg-purple-400" />
                  <span>Projected</span>
                </div>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="month" stroke="#64748b" fontSize={12} />
                <YAxis stroke="#64748b" fontSize={12} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px' }}
                  formatter={(value: number) => [`$${value?.toLocaleString()}`, '']}
                />
                <Area type="monotone" dataKey="revenue" stroke="#6366f1" fill="#6366f1" fillOpacity={0.2} />
                <Area type="monotone" dataKey="projected" stroke="#a78bfa" fill="#a78bfa" fillOpacity={0.1} strokeDasharray="5 5" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Occupancy Trend */}
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h2 className="text-lg font-semibold text-slate-900 mb-6">Occupancy Trend</h2>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={occupancyTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="month" stroke="#64748b" fontSize={12} />
                <YAxis stroke="#64748b" fontSize={12} domain={[0, 100]} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px' }}
                  formatter={(value: number) => [`${value}%`, 'Occupancy']}
                />
                <Line type="monotone" dataKey="rate" stroke="#22c55e" strokeWidth={3} dot={{ fill: '#22c55e', r: 5 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Tenant Churn Risk */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 mb-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-amber-50">
              <AlertTriangle className="size-5 text-amber-600" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-slate-900">AI Tenant Churn Risk Analysis</h2>
              <p className="text-sm text-slate-600">Tenants at risk of leaving or late payments</p>
            </div>
          </div>
          <div className="space-y-4">
            {tenantChurnRisk.map((tenant) => (
              <div key={tenant.tenant} className="flex items-center justify-between p-4 rounded-lg bg-slate-50 border border-slate-200">
                <div className="flex items-center gap-4">
                  <div className="size-12 rounded-full bg-gradient-to-br from-amber-100 to-red-100 flex items-center justify-center">
                    <Users className="size-6 text-amber-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900">{tenant.tenant}</h3>
                    <p className="text-sm text-slate-500">{tenant.unit} • {tenant.reason}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-slate-900 mb-1">{tenant.risk}%</div>
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                    tenant.risk > 70 ? "bg-red-100 text-red-700" :
                    tenant.risk > 50 ? "bg-amber-100 text-amber-700" :
                    "bg-green-100 text-green-700"
                  }`}>
                    {tenant.risk > 70 ? "High Risk" : tenant.risk > 50 ? "Medium Risk" : "Low Risk"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Property Performance */}
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-indigo-50">
              <Building2 className="size-5 text-indigo-600" />
            </div>
            <h2 className="text-lg font-semibold text-slate-900">Property Performance Comparison</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-slate-200">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900">Property</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900">Monthly Revenue</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900">Occupancy</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900">Risk Score</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900">Performance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {propertyPerformance.map((property) => (
                  <tr key={property.property} className="hover:bg-slate-50">
                    <td className="px-4 py-4 font-medium text-slate-900">{property.property}</td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-1">
                        <DollarSign className="size-4 text-slate-600" />
                        <span className="font-semibold text-slate-900">{property.revenue.toLocaleString()}</span>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-slate-200 rounded-full h-2 max-w-[100px]">
                          <div 
                            className="bg-green-500 h-2 rounded-full"
                            style={{ width: `${property.occupancy}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium text-slate-900">{property.occupancy}%</span>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        property.risk < 30 ? "bg-green-100 text-green-700" :
                        property.risk < 50 ? "bg-amber-100 text-amber-700" :
                        "bg-red-100 text-red-700"
                      }`}>
                        {property.risk < 30 ? "Low" : property.risk < 50 ? "Medium" : "High"}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        {property.occupancy === 100 && property.risk < 30 ? (
                          <>
                            <TrendingUp className="size-4 text-green-600" />
                            <span className="text-sm font-medium text-green-600">Excellent</span>
                          </>
                        ) : (
                          <>
                            <TrendingDown className="size-4 text-amber-600" />
                            <span className="text-sm font-medium text-amber-600">Needs Attention</span>
                          </>
                        )}
                      </div>
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
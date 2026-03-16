import { motion } from "motion/react";
import { Building2, TrendingUp, CheckCircle2, AlertTriangle } from "lucide-react";
import { useNavigate } from "react-router";

export function DashboardPremium() {
  const navigate = useNavigate();
  
  const metrics = [
    { label: "Properties", value: "12", sublabel: "+2 this month" },
    { label: "Occupancy", value: "87%", sublabel: "10 of 12 units" },
    { label: "Revenue", value: "$24,000", sublabel: "+12% vs last month" },
  ];

  const applications = [
    {
      id: "1",
      name: "Sarah Kim",
      score: 92,
      income: "$8,200",
      rent: "$2,300",
      ratio: "3.5x",
      status: "approved" as const
    },
    {
      id: "2",
      name: "Michael Patel",
      score: 87,
      income: "$7,800",
      rent: "$2,100",
      ratio: "3.7x",
      status: "pending" as const
    },
    {
      id: "3",
      name: "Jason Lee",
      score: 73,
      income: "$5,900",
      rent: "$2,000",
      ratio: "2.9x",
      status: "review" as const
    },
  ];

  const aiInsights = [
    { type: "alert" as const, message: "Tenant risk flagged in Unit 5" },
    { type: "warning" as const, message: "Rent payment overdue in Unit 2" },
    { type: "success" as const, message: "3 high-quality applications received today" },
  ];

  const properties = [
    { name: "123 King St", units: 12, occupied: 10, revenue: "$24,000" },
    { name: "456 Queen St", units: 8, occupied: 7, revenue: "$18,500" },
    { name: "789 Bloor St", units: 6, occupied: 6, revenue: "$15,200" },
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-8 py-12">
        {/* Premium Header with Large Typography */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <h1 className="text-[48px] font-semibold text-[#0A0A0A] leading-tight tracking-tight mb-3">
            Good evening, Justin
          </h1>
          <p className="text-[14px] text-[#9CA3AF] font-normal">
            Here is your property overview
          </p>
        </motion.div>

        {/* Metrics Row - Minimal and Clean */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {metrics.map((metric, idx) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="group"
            >
              <div className="bg-white border border-black/[0.08] rounded-xl p-8 hover:shadow-[0_8px_24px_rgba(0,0,0,0.12)] hover:-translate-y-1 transition-all duration-300">
                <p className="text-[12px] text-[#9CA3AF] uppercase tracking-wider mb-4">
                  {metric.label}
                </p>
                <h2 className="text-[48px] font-semibold text-[#0A0A0A] leading-none mb-2">
                  {metric.value}
                </h2>
                <p className="text-[12px] text-[#9CA3AF]">
                  {metric.sublabel}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {/* Applications - Larger Column */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-[28px] font-semibold text-[#0A0A0A] tracking-tight">
                Applications
              </h2>
              <button
                onClick={() => navigate("/applications")}
                className="text-[14px] font-medium text-[#0A0A0A] hover:underline"
              >
                View All →
              </button>
            </div>
            <div className="space-y-4">
              {applications.map((app, idx) => (
                <motion.div
                  key={app.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  onClick={() => navigate(`/applications/${app.id}`)}
                  className="bg-white border border-black/[0.08] rounded-xl p-6 hover:shadow-[0_8px_24px_rgba(0,0,0,0.12)] transition-all duration-300 group cursor-pointer"
                >
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h3 className="text-[18px] font-semibold text-[#0A0A0A] mb-1">
                        {app.name}
                      </h3>
                      <div className="flex items-center gap-3 mt-3">
                        <div className="flex items-baseline gap-1">
                          <span className="text-[24px] font-semibold text-[#0A0A0A]">
                            {app.score}
                          </span>
                          <span className="text-[12px] text-[#9CA3AF]">AI Score</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {app.status === "approved" && (
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-[#22C55E]/10 rounded-full">
                          <CheckCircle2 className="size-4 text-[#22C55E]" />
                          <span className="text-[12px] font-medium text-[#22C55E]">Approved</span>
                        </div>
                      )}
                      {app.status === "pending" && (
                        <div className="px-3 py-1.5 bg-black/[0.04] rounded-full">
                          <span className="text-[12px] font-medium text-[#9CA3AF]">Pending</span>
                        </div>
                      )}
                      {app.status === "review" && (
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-[#F59E0B]/10 rounded-full">
                          <AlertTriangle className="size-4 text-[#F59E0B]" />
                          <span className="text-[12px] font-medium text-[#F59E0B]">Review</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-6 pt-6 border-t border-black/[0.04]">
                    <div>
                      <p className="text-[12px] text-[#9CA3AF] mb-1">Income</p>
                      <p className="text-[16px] font-semibold text-[#0A0A0A]">{app.income}</p>
                    </div>
                    <div>
                      <p className="text-[12px] text-[#9CA3AF] mb-1">Rent</p>
                      <p className="text-[16px] font-semibold text-[#0A0A0A]">{app.rent}</p>
                    </div>
                    <div>
                      <p className="text-[12px] text-[#9CA3AF] mb-1">Rent Ratio</p>
                      <p className="text-[16px] font-semibold text-[#0A0A0A]">{app.ratio}</p>
                    </div>
                  </div>

                  <div className="flex gap-3 mt-6">
                    <button className="flex-1 px-4 py-2.5 bg-[#0A0A0A] text-white text-[14px] font-medium rounded-lg hover:bg-[#1C1C1C] transition-colors">
                      Approve
                    </button>
                    <button className="px-4 py-2.5 border border-black/[0.08] text-[#0A0A0A] text-[14px] font-medium rounded-lg hover:bg-[#F5F5F5] transition-colors">
                      Request Info
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* AI Insights Sidebar */}
          <div className="lg:col-span-1">
            <h2 className="text-[28px] font-semibold text-[#0A0A0A] mb-8 tracking-tight">
              AI Insights
            </h2>
            <div className="space-y-4">
              {aiInsights.map((insight, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className={`p-4 rounded-xl border ${
                    insight.type === "alert"
                      ? "bg-[#EF4444]/5 border-[#EF4444]/20"
                      : insight.type === "warning"
                      ? "bg-[#F59E0B]/5 border-[#F59E0B]/20"
                      : "bg-[#22C55E]/5 border-[#22C55E]/20"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    {insight.type === "alert" && (
                      <AlertTriangle className="size-5 text-[#EF4444] flex-shrink-0 mt-0.5" />
                    )}
                    {insight.type === "warning" && (
                      <AlertTriangle className="size-5 text-[#F59E0B] flex-shrink-0 mt-0.5" />
                    )}
                    {insight.type === "success" && (
                      <CheckCircle2 className="size-5 text-[#22C55E] flex-shrink-0 mt-0.5" />
                    )}
                    <p className="text-[14px] text-[#0A0A0A] leading-relaxed">
                      {insight.message}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Properties Grid */}
        <div>
          <h2 className="text-[28px] font-semibold text-[#0A0A0A] mb-8 tracking-tight">
            Properties
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {properties.map((property, idx) => (
              <motion.div
                key={property.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white border border-black/[0.08] rounded-xl p-6 hover:shadow-[0_8px_24px_rgba(0,0,0,0.12)] hover:-translate-y-1 transition-all duration-300 group cursor-pointer"
              >
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h3 className="text-[18px] font-semibold text-[#0A0A0A] mb-1">
                      {property.name}
                    </h3>
                  </div>
                  <Building2 className="size-5 text-[#9CA3AF] group-hover:text-[#0A0A0A] transition-colors" />
                </div>

                <div className="space-y-4">
                  <div className="flex items-baseline justify-between">
                    <span className="text-[12px] text-[#9CA3AF]">Units</span>
                    <span className="text-[18px] font-semibold text-[#0A0A0A]">{property.units}</span>
                  </div>
                  <div className="flex items-baseline justify-between">
                    <span className="text-[12px] text-[#9CA3AF]">Occupied</span>
                    <span className="text-[18px] font-semibold text-[#0A0A0A]">{property.occupied}</span>
                  </div>
                  <div className="flex items-baseline justify-between pt-4 border-t border-black/[0.04]">
                    <span className="text-[12px] text-[#9CA3AF]">Revenue</span>
                    <span className="text-[18px] font-semibold text-[#0A0A0A]">{property.revenue}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
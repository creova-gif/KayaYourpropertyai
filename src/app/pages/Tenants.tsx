import { Users, MapPin, Phone, Mail, Calendar, DollarSign, AlertTriangle, CheckCircle2, Search, Filter, Award, TrendingUp, Clock, Send, Shield, Star } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";

export function Tenants() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  
  const tenants = [
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@email.com",
      phone: "(416) 555-0123",
      unit: "4A",
      address: "123 King Street",
      rent: 2300,
      leaseStart: "Jan 1, 2025",
      leaseEnd: "Dec 31, 2025",
      paymentStatus: "current",
      creditScore: 720,
      risk: "low"
    },
    {
      id: 2,
      name: "Alice Smith",
      email: "alice.smith@email.com",
      phone: "(416) 555-0124",
      unit: "1C",
      address: "456 Queen Street West",
      rent: 2800,
      leaseStart: "Mar 1, 2024",
      leaseEnd: "Feb 28, 2027",
      paymentStatus: "current",
      creditScore: 755,
      risk: "low"
    },
    {
      id: 3,
      name: "Bob Johnson",
      email: "bob.johnson@email.com",
      phone: "(416) 555-0125",
      unit: "3A",
      address: "456 Queen Street West",
      rent: 2200,
      leaseStart: "Jun 1, 2025",
      leaseEnd: "May 31, 2026",
      paymentStatus: "late",
      creditScore: 680,
      risk: "medium"
    },
    {
      id: 4,
      name: "Emma Wilson",
      email: "emma.wilson@email.com",
      phone: "(416) 555-0126",
      unit: "Unit 1",
      address: "789 Bloor Street",
      rent: 3200,
      leaseStart: "Sep 1, 2024",
      leaseEnd: "Aug 31, 2026",
      paymentStatus: "current",
      creditScore: 790,
      risk: "low"
    },
    {
      id: 5,
      name: "David Lee",
      email: "david.lee@email.com",
      phone: "(416) 555-0127",
      unit: "Unit 2",
      address: "789 Bloor Street",
      rent: 3200,
      leaseStart: "Oct 1, 2025",
      leaseEnd: "Sep 30, 2026",
      paymentStatus: "current",
      creditScore: 735,
      risk: "low"
    },
  ];

  const filteredTenants = tenants.filter(tenant => {
    if (filterStatus === "all") {
      return tenant.name.toLowerCase().includes(searchQuery.toLowerCase());
    } else {
      return tenant.paymentStatus === filterStatus && tenant.name.toLowerCase().includes(searchQuery.toLowerCase());
    }
  });

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-8 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-3">
            <Users className="size-8 text-[#0A0A0A]" />
            <h1 className="text-[48px] font-semibold text-[#0A0A0A] leading-tight tracking-tight">
              Tenants
            </h1>
          </div>
          <p className="text-[14px] text-[#9CA3AF] font-normal">
            Manage your current tenants and view their profiles
          </p>
        </motion.div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white border border-black/[0.08] rounded-xl p-6"
          >
            <p className="text-[12px] text-[#9CA3AF] uppercase tracking-wider mb-2">
              Total Tenants
            </p>
            <h2 className="text-[36px] font-semibold text-[#0A0A0A] leading-none">
              {tenants.length}
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white border border-black/[0.08] rounded-xl p-6"
          >
            <p className="text-[12px] text-[#9CA3AF] uppercase tracking-wider mb-2">
              On-Time Payments
            </p>
            <h2 className="text-[36px] font-semibold text-[#22C55E] leading-none mb-2">
              {tenants.filter(t => t.paymentStatus === "current").length}
            </h2>
            <p className="text-[13px] text-[#6B7280]">
              {((tenants.filter(t => t.paymentStatus === "current").length / tenants.length) * 100).toFixed(0)}% success rate
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white border border-black/[0.08] rounded-xl p-6"
          >
            <p className="text-[12px] text-[#9CA3AF] uppercase tracking-wider mb-2">
              Late Payments
            </p>
            <h2 className="text-[36px] font-semibold text-[#F59E0B] leading-none">
              {tenants.filter(t => t.paymentStatus === "late").length}
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white border border-black/[0.08] rounded-xl p-6"
          >
            <p className="text-[12px] text-[#9CA3AF] uppercase tracking-wider mb-2">
              Avg Trust Score
            </p>
            <h2 className="text-[36px] font-semibold text-[#0A0A0A] leading-none">
              {Math.round(tenants.reduce((sum, t) => sum + t.creditScore, 0) / tenants.length / 10)}
            </h2>
          </motion.div>
        </div>

        {/* Search & Filter */}
        <div className="flex items-center justify-between gap-4 mb-8">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-[#9CA3AF]" />
            <input
              type="text"
              placeholder="Search tenants..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-black/[0.08] rounded-lg text-[14px] text-[#0A0A0A] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#0A0A0A]/10"
            />
          </div>

          <div className="flex items-center gap-2 px-3 py-3 border border-black/[0.08] rounded-lg">
            <Filter className="size-5 text-[#9CA3AF]" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="text-[14px] text-[#0A0A0A] bg-transparent focus:outline-none"
            >
              <option value="all">All Tenants</option>
              <option value="current">Current Only</option>
              <option value="late">Late Only</option>
            </select>
          </div>

          <p className="text-[14px] text-[#9CA3AF]">
            Showing {filteredTenants.length} of {tenants.length} tenants
          </p>
        </div>

        {/* Tenants Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredTenants.map((tenant, idx) => (
            <motion.div
              key={tenant.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              onClick={() => navigate("/tenant-passport")}
              className="bg-white border border-black/[0.08] rounded-xl p-6 hover:shadow-[0_8px_24px_rgba(0,0,0,0.12)] hover:-translate-y-1 transition-all duration-300 cursor-pointer group"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="size-16 rounded-full bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] flex items-center justify-center">
                    <Users className="size-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-[20px] font-semibold text-[#0A0A0A] mb-1">
                      {tenant.name}
                    </h3>
                    <div className="flex items-center gap-2 text-[13px] text-[#9CA3AF]">
                      <MapPin className="size-4" />
                      <span>{tenant.unit} • {tenant.address}</span>
                    </div>
                  </div>
                </div>

                <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full ${
                  tenant.paymentStatus === "current"
                    ? "bg-[#22C55E]/10"
                    : "bg-[#F59E0B]/10"
                }`}>
                  {tenant.paymentStatus === "current" ? (
                    <CheckCircle2 className="size-4 text-[#22C55E]" />
                  ) : (
                    <Clock className="size-4 text-[#F59E0B]" />
                  )}
                  <span className={`text-[12px] font-medium ${
                    tenant.paymentStatus === "current" ? "text-[#22C55E]" : "text-[#F59E0B]"
                  }`}>
                    {tenant.paymentStatus === "current" ? "Current" : "Late"}
                  </span>
                </div>
              </div>

              {/* Contact Info */}
              <div className="space-y-3 mb-6 pb-6 border-b border-black/[0.04]">
                <div className="flex items-center gap-3">
                  <Mail className="size-4 text-[#9CA3AF]" />
                  <a href={`mailto:${tenant.email}`} className="text-[14px] text-[#6B7280] hover:text-[#0A0A0A] transition-colors">
                    {tenant.email}
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="size-4 text-[#9CA3AF]" />
                  <a href={`tel:${tenant.phone}`} className="text-[14px] text-[#6B7280] hover:text-[#0A0A0A] transition-colors">
                    {tenant.phone}
                  </a>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-6 mb-6">
                <div>
                  <p className="text-[11px] text-[#9CA3AF] uppercase tracking-wider mb-1">Monthly Rent</p>
                  <div className="flex items-baseline gap-1">
                    <DollarSign className="size-4 text-[#0A0A0A] mt-1" />
                    <span className="text-[20px] font-semibold text-[#0A0A0A]">
                      {tenant.rent.toLocaleString()}
                    </span>
                  </div>
                </div>

                <div>
                  <p className="text-[11px] text-[#9CA3AF] uppercase tracking-wider mb-1">Credit Score</p>
                  <div className="flex items-center gap-2">
                    <span className={`text-[20px] font-semibold ${
                      tenant.creditScore >= 740 ? "text-[#22C55E]" : 
                      tenant.creditScore >= 670 ? "text-[#F59E0B]" : 
                      "text-[#EF4444]"
                    }`}>
                      {tenant.creditScore}
                    </span>
                    <span className="text-[12px] text-[#9CA3AF]">
                      {tenant.creditScore >= 740 ? "Excellent" : tenant.creditScore >= 670 ? "Good" : "Fair"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Lease Dates */}
              <div className="grid grid-cols-2 gap-6 mb-6 pb-6 border-b border-black/[0.04]">
                <div>
                  <p className="text-[11px] text-[#9CA3AF] uppercase tracking-wider mb-1">Lease Start</p>
                  <div className="flex items-center gap-2">
                    <Calendar className="size-4 text-[#9CA3AF]" />
                    <span className="text-[14px] text-[#0A0A0A] font-medium">{tenant.leaseStart}</span>
                  </div>
                </div>

                <div>
                  <p className="text-[11px] text-[#9CA3AF] uppercase tracking-wider mb-1">Lease End</p>
                  <div className="flex items-center gap-2">
                    <Calendar className="size-4 text-[#9CA3AF]" />
                    <span className="text-[14px] text-[#0A0A0A] font-medium">{tenant.leaseEnd}</span>
                  </div>
                </div>
              </div>

              {/* Risk Level & Trust Badge */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Shield className="size-4 text-[#9CA3AF]" />
                  <span className="text-[13px] text-[#9CA3AF]">Risk Level:</span>
                  <span className={`px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wider ${
                    tenant.risk === "low" ? "bg-[#22C55E]/10 text-[#22C55E]" :
                    tenant.risk === "medium" ? "bg-[#F59E0B]/10 text-[#F59E0B]" :
                    "bg-[#EF4444]/10 text-[#EF4444]"
                  }`}>
                    {tenant.risk}
                  </span>
                </div>

                {tenant.creditScore >= 720 && (
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-[#6366F1]/10 to-[#8B5CF6]/10 rounded-full">
                    <Award className="size-4 text-[#6366F1]" />
                    <span className="text-[11px] font-medium text-[#6366F1]">Verified</span>
                  </div>
                )}
              </div>

              {/* Quick Actions (visible on hover) */}
              <div className="mt-6 pt-6 border-t border-black/[0.04] opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="flex gap-2">
                  <button className="flex-1 px-4 py-2 bg-[#0A0A0A] text-white text-[13px] font-medium rounded-lg hover:bg-[#1C1C1C] transition-colors flex items-center justify-center gap-2">
                    <Award className="size-4" />
                    View Passport
                  </button>
                  <button className="px-4 py-2 border border-black/[0.08] text-[#0A0A0A] text-[13px] font-medium rounded-lg hover:bg-[#F5F5F5] transition-colors flex items-center justify-center gap-2">
                    <Send className="size-4" />
                    Message
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {filteredTenants.length === 0 && (
          <div className="text-center py-16">
            <div className="size-16 rounded-full bg-[#F5F5F5] flex items-center justify-center mx-auto mb-4">
              <Search className="size-8 text-[#9CA3AF]" />
            </div>
            <h3 className="text-[20px] font-semibold text-[#0A0A0A] mb-2">
              No tenants found
            </h3>
            <p className="text-[14px] text-[#9CA3AF]">
              Try adjusting your filters or search query
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
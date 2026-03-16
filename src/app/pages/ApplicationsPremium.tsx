import { useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import {
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Eye,
  Filter,
  Search,
  TrendingUp,
  DollarSign,
  Briefcase,
  Award,
  ChevronRight,
  Brain,
} from "lucide-react";

interface Application {
  id: string;
  name: string;
  unit: string;
  rent: number;
  aiScore: number;
  riskLevel: "low" | "medium" | "high";
  recommendation: "approve" | "review" | "reject";
  creditScore: number;
  income: number;
  rentToIncomeRatio: number;
  employmentYears: number;
  status: "pending" | "approved" | "rejected";
  appliedDate: string;
}

export function ApplicationsPremium() {
  const navigate = useNavigate();
  const [filterRisk, setFilterRisk] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const applications: Application[] = [
    {
      id: "1",
      name: "Sarah Kim",
      unit: "Unit 4A - 2 Bedroom",
      rent: 2300,
      aiScore: 92,
      riskLevel: "low",
      recommendation: "approve",
      creditScore: 745,
      income: 8500,
      rentToIncomeRatio: 27,
      employmentYears: 4.5,
      status: "pending",
      appliedDate: "2026-03-14",
    },
    {
      id: "2",
      name: "Michael Patel",
      unit: "Unit 2B - 1 Bedroom",
      rent: 1950,
      aiScore: 87,
      riskLevel: "low",
      recommendation: "approve",
      creditScore: 712,
      income: 6800,
      rentToIncomeRatio: 29,
      employmentYears: 3.2,
      status: "pending",
      appliedDate: "2026-03-15",
    },
    {
      id: "3",
      name: "Jason Lee",
      unit: "Unit 1C - 3 Bedroom",
      rent: 2800,
      aiScore: 68,
      riskLevel: "medium",
      recommendation: "review",
      creditScore: 658,
      income: 7200,
      rentToIncomeRatio: 39,
      employmentYears: 1.8,
      status: "pending",
      appliedDate: "2026-03-13",
    },
    {
      id: "4",
      name: "Emma Chen",
      unit: "Unit 3B - 1 Bedroom",
      rent: 1850,
      aiScore: 55,
      riskLevel: "high",
      recommendation: "reject",
      creditScore: 590,
      income: 4200,
      rentToIncomeRatio: 44,
      employmentYears: 0.8,
      status: "pending",
      appliedDate: "2026-03-12",
    },
    {
      id: "5",
      name: "David Martinez",
      unit: "Unit 5A - 2 Bedroom",
      rent: 2200,
      aiScore: 89,
      riskLevel: "low",
      recommendation: "approve",
      creditScore: 728,
      income: 8200,
      rentToIncomeRatio: 27,
      employmentYears: 5.2,
      status: "pending",
      appliedDate: "2026-03-15",
    },
  ];

  const filteredApplications = applications.filter((app) => {
    const matchesRisk = filterRisk === "all" || app.riskLevel === filterRisk;
    const matchesSearch =
      app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.unit.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesRisk && matchesSearch;
  });

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "low":
        return "text-[#22C55E]";
      case "medium":
        return "text-[#F59E0B]";
      case "high":
        return "text-[#EF4444]";
      default:
        return "text-[#9CA3AF]";
    }
  };

  const getRiskBgColor = (risk: string) => {
    switch (risk) {
      case "low":
        return "bg-[#22C55E]/10";
      case "medium":
        return "bg-[#F59E0B]/10";
      case "high":
        return "bg-[#EF4444]/10";
      default:
        return "bg-[#9CA3AF]/10";
    }
  };

  const getRiskIcon = (risk: string) => {
    switch (risk) {
      case "low":
        return <CheckCircle2 className="size-4" />;
      case "medium":
        return <AlertTriangle className="size-4" />;
      case "high":
        return <XCircle className="size-4" />;
      default:
        return null;
    }
  };

  const stats = {
    total: applications.length,
    pending: applications.filter((a) => a.status === "pending").length,
    highScore: applications.filter((a) => a.aiScore >= 85).length,
    needsReview: applications.filter((a) => a.recommendation === "review" || a.riskLevel === "high").length,
  };

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
            <Brain className="size-8 text-[#0A0A0A]" />
            <h1 className="text-[48px] font-semibold text-[#0A0A0A] leading-tight tracking-tight">
              Smart Screening
            </h1>
          </div>
          <p className="text-[14px] text-[#9CA3AF] font-normal">
            AI-powered tenant screening with automated risk analysis
          </p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white border border-black/[0.08] rounded-xl p-6"
          >
            <p className="text-[12px] text-[#9CA3AF] uppercase tracking-wider mb-2">
              Total Applications
            </p>
            <h2 className="text-[36px] font-semibold text-[#0A0A0A] leading-none">
              {stats.total}
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white border border-black/[0.08] rounded-xl p-6"
          >
            <p className="text-[12px] text-[#9CA3AF] uppercase tracking-wider mb-2">
              Pending Review
            </p>
            <h2 className="text-[36px] font-semibold text-[#0A0A0A] leading-none">
              {stats.pending}
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white border border-black/[0.08] rounded-xl p-6"
          >
            <p className="text-[12px] text-[#9CA3AF] uppercase tracking-wider mb-2">
              High AI Scores
            </p>
            <h2 className="text-[36px] font-semibold text-[#22C55E] leading-none">
              {stats.highScore}
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white border border-black/[0.08] rounded-xl p-6"
          >
            <p className="text-[12px] text-[#9CA3AF] uppercase tracking-wider mb-2">
              Needs Attention
            </p>
            <h2 className="text-[36px] font-semibold text-[#F59E0B] leading-none">
              {stats.needsReview}
            </h2>
          </motion.div>
        </div>

        {/* Filters & Search */}
        <div className="flex items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-[#9CA3AF]" />
              <input
                type="text"
                placeholder="Search applicants..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-3 border border-black/[0.08] rounded-lg text-[14px] text-[#0A0A0A] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#0A0A0A]/10 w-80"
              />
            </div>

            <div className="flex items-center gap-2 px-3 py-3 border border-black/[0.08] rounded-lg">
              <Filter className="size-5 text-[#9CA3AF]" />
              <select
                value={filterRisk}
                onChange={(e) => setFilterRisk(e.target.value)}
                className="text-[14px] text-[#0A0A0A] bg-transparent focus:outline-none"
              >
                <option value="all">All Risk Levels</option>
                <option value="low">Low Risk</option>
                <option value="medium">Medium Risk</option>
                <option value="high">High Risk</option>
              </select>
            </div>
          </div>

          <p className="text-[14px] text-[#9CA3AF]">
            Showing {filteredApplications.length} of {applications.length} applications
          </p>
        </div>

        {/* Applications List */}
        <div className="space-y-4">
          {filteredApplications.map((app, idx) => (
            <motion.div
              key={app.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              onClick={() => navigate(`/applications/${app.id}`)}
              className="bg-white border border-black/[0.08] rounded-xl p-6 hover:shadow-[0_8px_24px_rgba(0,0,0,0.12)] hover:-translate-y-1 transition-all duration-300 cursor-pointer group"
            >
              <div className="flex items-center justify-between">
                {/* Left Section - Applicant Info */}
                <div className="flex items-center gap-6 flex-1">
                  {/* AI Score Badge */}
                  <div className="flex flex-col items-center">
                    <div className={`size-16 rounded-full flex items-center justify-center font-bold text-[20px] ${getRiskBgColor(app.riskLevel)} ${getRiskColor(app.riskLevel)}`}>
                      {app.aiScore}
                    </div>
                    <p className="text-[10px] text-[#9CA3AF] uppercase tracking-wider mt-1">
                      AI Score
                    </p>
                  </div>

                  {/* Applicant Details */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-[20px] font-semibold text-[#0A0A0A]">
                        {app.name}
                      </h3>
                      <div className={`flex items-center gap-2 px-3 py-1 rounded-full ${getRiskBgColor(app.riskLevel)}`}>
                        {getRiskIcon(app.riskLevel)}
                        <span className={`text-[12px] font-medium capitalize ${getRiskColor(app.riskLevel)}`}>
                          {app.riskLevel} Risk
                        </span>
                      </div>
                    </div>
                    <p className="text-[14px] text-[#6B7280] mb-4">{app.unit}</p>

                    {/* Quick Stats */}
                    <div className="flex items-center gap-8">
                      <div className="flex items-center gap-2">
                        <DollarSign className="size-4 text-[#9CA3AF]" />
                        <div>
                          <p className="text-[11px] text-[#9CA3AF]">Income</p>
                          <p className="text-[14px] font-semibold text-[#0A0A0A]">
                            ${app.income.toLocaleString()}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <TrendingUp className="size-4 text-[#9CA3AF]" />
                        <div>
                          <p className="text-[11px] text-[#9CA3AF]">Rent Ratio</p>
                          <p className={`text-[14px] font-semibold ${app.rentToIncomeRatio > 35 ? 'text-[#F59E0B]' : 'text-[#22C55E]'}`}>
                            {app.rentToIncomeRatio}%
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Award className="size-4 text-[#9CA3AF]" />
                        <div>
                          <p className="text-[11px] text-[#9CA3AF]">Credit</p>
                          <p className={`text-[14px] font-semibold ${
                            app.creditScore >= 700 ? 'text-[#22C55E]' : 
                            app.creditScore >= 650 ? 'text-[#F59E0B]' : 
                            'text-[#EF4444]'
                          }`}>
                            {app.creditScore}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Briefcase className="size-4 text-[#9CA3AF]" />
                        <div>
                          <p className="text-[11px] text-[#9CA3AF]">Employment</p>
                          <p className="text-[14px] font-semibold text-[#0A0A0A]">
                            {app.employmentYears} yrs
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Section - AI Recommendation & Action */}
                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <p className="text-[11px] text-[#9CA3AF] uppercase tracking-wider mb-1">
                      AI Recommends
                    </p>
                    <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-[14px] ${
                      app.recommendation === 'approve' ? 'bg-[#22C55E]/10 text-[#22C55E]' :
                      app.recommendation === 'review' ? 'bg-[#F59E0B]/10 text-[#F59E0B]' :
                      'bg-[#EF4444]/10 text-[#EF4444]'
                    }`}>
                      {app.recommendation === 'approve' && <CheckCircle2 className="size-4" />}
                      {app.recommendation === 'review' && <AlertTriangle className="size-4" />}
                      {app.recommendation === 'reject' && <XCircle className="size-4" />}
                      <span className="capitalize">{app.recommendation}</span>
                    </div>
                  </div>

                  <ChevronRight className="size-6 text-[#9CA3AF] group-hover:text-[#0A0A0A] transition-colors" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {filteredApplications.length === 0 && (
          <div className="text-center py-16">
            <div className="size-16 rounded-full bg-[#F5F5F5] flex items-center justify-center mx-auto mb-4">
              <Search className="size-8 text-[#9CA3AF]" />
            </div>
            <h3 className="text-[20px] font-semibold text-[#0A0A0A] mb-2">
              No applications found
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

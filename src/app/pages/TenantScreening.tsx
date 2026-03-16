import { useState } from "react";
import { motion } from "motion/react";
import {
  UserCheck,
  Shield,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  DollarSign,
  Home,
  Building2,
  CreditCard,
  FileText,
  Download,
  Send,
  Info,
  Award,
  Search,
  Clock,
} from "lucide-react";

interface ScreeningReport {
  id: string;
  applicantName: string;
  property: string;
  requestDate: string;
  status: "completed" | "pending" | "failed";
  creditScore?: number;
  riskScore: number;
  monthlyIncome?: number;
  employmentStatus?: string;
  rentalHistory?: string;
  criminalRecord?: boolean;
  evictionHistory?: boolean;
  recommendation: "approve" | "conditional" | "deny";
}

const mockReports: ScreeningReport[] = [
  {
    id: "1",
    applicantName: "Sarah Kim",
    property: "123 King St - Unit 4A",
    requestDate: "2026-03-15",
    status: "completed",
    creditScore: 750,
    riskScore: 92,
    monthlyIncome: 6500,
    employmentStatus: "Full-time employed",
    rentalHistory: "Excellent - 8 years",
    criminalRecord: false,
    evictionHistory: false,
    recommendation: "approve",
  },
  {
    id: "2",
    applicantName: "Michael Chen",
    property: "123 King St - Unit 2C",
    requestDate: "2026-03-14",
    status: "completed",
    creditScore: 680,
    riskScore: 75,
    monthlyIncome: 4200,
    employmentStatus: "Contract worker",
    rentalHistory: "Good - 3 years",
    criminalRecord: false,
    evictionHistory: false,
    recommendation: "conditional",
  },
  {
    id: "3",
    applicantName: "David Martinez",
    property: "456 Queen St - Unit 1B",
    requestDate: "2026-03-12",
    status: "pending",
    riskScore: 0,
    recommendation: "conditional",
  },
];

export function TenantScreening() {
  const [selectedReport, setSelectedReport] = useState<ScreeningReport | null>(null);
  const [showNewScreening, setShowNewScreening] = useState(false);

  const getRiskColor = (score: number) => {
    if (score >= 80) return "text-[#22C55E]";
    if (score >= 60) return "text-[#F59E0B]";
    return "text-[#EF4444]";
  };

  const getRiskBgColor = (score: number) => {
    if (score >= 80) return "bg-[#22C55E]/10 border-[#22C55E]/20";
    if (score >= 60) return "bg-[#F59E0B]/10 border-[#F59E0B]/20";
    return "bg-[#EF4444]/10 border-[#EF4444]/20";
  };

  const getRecommendationColor = (rec: string) => {
    if (rec === "approve") return "bg-[#22C55E]/10 text-[#22C55E] border-[#22C55E]/20";
    if (rec === "conditional") return "bg-[#F59E0B]/10 text-[#F59E0B] border-[#F59E0B]/20";
    return "bg-[#EF4444]/10 text-[#EF4444] border-[#EF4444]/20";
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
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <UserCheck className="size-8 text-[#0A0A0A]" />
              <h1 className="text-[48px] font-semibold text-[#0A0A0A] leading-tight tracking-tight">
                Tenant Screening
              </h1>
            </div>
            <button
              onClick={() => setShowNewScreening(true)}
              className="flex items-center gap-2 px-5 py-2.5 bg-[#0A0A0A] text-white text-[14px] font-medium rounded-lg hover:bg-[#1C1C1C] transition-colors"
            >
              <Search className="size-4" />
              New Screening
            </button>
          </div>
          <p className="text-[14px] text-[#9CA3AF] font-normal mb-6">
            Comprehensive credit checks and background verification via Equifax Canada
          </p>

          {/* Equifax Partnership Banner */}
          <div className="bg-gradient-to-br from-[#EF4444]/10 to-[#DC2626]/10 border border-[#EF4444]/20 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <Shield className="size-5 text-[#EF4444] flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-[13px] font-medium text-[#0A0A0A] mb-1">
                  🇨🇦 Powered by Equifax Canada • FCRA Compliant • Instant Reports
                </p>
                <p className="text-[12px] text-[#6B7280]">
                  Credit scores, income verification, rental history, eviction records, and criminal background checks.
                  All screening requests require applicant consent per Canadian privacy laws.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white border border-black/[0.08] rounded-xl p-6">
            <p className="text-[12px] text-[#9CA3AF] uppercase tracking-wider mb-2">
              Total Screenings
            </p>
            <h2 className="text-[32px] font-semibold text-[#0A0A0A] leading-none mb-1">
              247
            </h2>
            <p className="text-[11px] text-[#22C55E]">+18 this month</p>
          </div>

          <div className="bg-white border border-black/[0.08] rounded-xl p-6">
            <p className="text-[12px] text-[#9CA3AF] uppercase tracking-wider mb-2">
              Avg Credit Score
            </p>
            <h2 className="text-[32px] font-semibold text-[#6366F1] leading-none mb-1">
              718
            </h2>
            <p className="text-[11px] text-[#6B7280]">National avg: 650</p>
          </div>

          <div className="bg-white border border-black/[0.08] rounded-xl p-6">
            <p className="text-[12px] text-[#9CA3AF] uppercase tracking-wider mb-2">
              Approval Rate
            </p>
            <h2 className="text-[32px] font-semibold text-[#22C55E] leading-none mb-1">
              76%
            </h2>
            <p className="text-[11px] text-[#6B7280]">Above average</p>
          </div>

          <div className="bg-white border border-black/[0.08] rounded-xl p-6">
            <p className="text-[12px] text-[#9CA3AF] uppercase tracking-wider mb-2">
              Avg Processing
            </p>
            <h2 className="text-[32px] font-semibold text-[#0A0A0A] leading-none mb-1">
              4.2m
            </h2>
            <p className="text-[11px] text-[#6B7280]">minutes</p>
          </div>
        </div>

        {/* Screening Reports */}
        <div className="bg-white border border-black/[0.08] rounded-xl overflow-hidden mb-8">
          <div className="px-6 py-4 border-b border-black/[0.04]">
            <h3 className="text-[16px] font-semibold text-[#0A0A0A]">
              Recent Screening Reports
            </h3>
          </div>

          <div className="divide-y divide-black/[0.04]">
            {mockReports.map((report, idx) => (
              <motion.div
                key={report.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="px-6 py-5 hover:bg-[#F5F5F5] transition-colors cursor-pointer"
                onClick={() => setSelectedReport(report)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 flex-1">
                    <div className="size-14 rounded-full bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] flex items-center justify-center">
                      <UserCheck className="size-7 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="text-[15px] font-semibold text-[#0A0A0A] mb-1">
                        {report.applicantName}
                      </p>
                      <div className="flex items-center gap-4 text-[13px] text-[#9CA3AF]">
                        <span>{report.property}</span>
                        <span>•</span>
                        <span>{report.requestDate}</span>
                        {report.status === "pending" && (
                          <>
                            <span>•</span>
                            <div className="flex items-center gap-1 text-[#F59E0B]">
                              <Clock className="size-3" />
                              <span>Processing...</span>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  {report.status === "completed" && (
                    <div className="flex items-center gap-6">
                      {/* Credit Score */}
                      {report.creditScore && (
                        <div className="text-center">
                          <p className="text-[11px] text-[#9CA3AF] mb-1">Credit Score</p>
                          <p className="text-[20px] font-bold text-[#6366F1]">
                            {report.creditScore}
                          </p>
                        </div>
                      )}

                      {/* Risk Score */}
                      <div className="text-center">
                        <p className="text-[11px] text-[#9CA3AF] mb-1">Risk Score</p>
                        <p className={`text-[20px] font-bold ${getRiskColor(report.riskScore)}`}>
                          {report.riskScore}%
                        </p>
                      </div>

                      {/* Recommendation */}
                      <div className={`px-4 py-2 rounded-full border ${getRecommendationColor(report.recommendation)}`}>
                        <p className="text-[12px] font-medium capitalize">
                          {report.recommendation}
                        </p>
                      </div>

                      {/* Actions */}
                      <button className="px-4 py-2 border border-black/[0.08] text-[#6B7280] text-[13px] font-medium rounded-lg hover:bg-white transition-colors">
                        <FileText className="size-4" />
                      </button>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Equifax Features */}
        <div className="bg-gradient-to-br from-[#6366F1]/5 to-[#8B5CF6]/5 border border-[#6366F1]/20 rounded-xl p-8">
          <h3 className="text-[20px] font-semibold text-[#0A0A0A] mb-6">
            What's Included in Equifax Screening
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6 border border-black/[0.04]">
              <div className="size-12 rounded-full bg-[#6366F1]/10 flex items-center justify-center mb-4">
                <CreditCard className="size-6 text-[#6366F1]" />
              </div>
              <h4 className="text-[16px] font-semibold text-[#0A0A0A] mb-2">
                Credit Report
              </h4>
              <p className="text-[13px] text-[#6B7280] mb-3">
                Full credit score, payment history, debt-to-income ratio, and credit utilization
              </p>
              <ul className="space-y-1 text-[12px] text-[#6B7280]">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="size-3 text-[#22C55E]" />
                  Equifax credit score (300-900)
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="size-3 text-[#22C55E]" />
                  Payment history (7 years)
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="size-3 text-[#22C55E]" />
                  Outstanding debts
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-xl p-6 border border-black/[0.04]">
              <div className="size-12 rounded-full bg-[#22C55E]/10 flex items-center justify-center mb-4">
                <DollarSign className="size-6 text-[#22C55E]" />
              </div>
              <h4 className="text-[16px] font-semibold text-[#0A0A0A] mb-2">
                Income Verification
              </h4>
              <p className="text-[13px] text-[#6B7280] mb-3">
                Employment verification, income stability, and rent-to-income ratio analysis
              </p>
              <ul className="space-y-1 text-[12px] text-[#6B7280]">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="size-3 text-[#22C55E]" />
                  Employment status
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="size-3 text-[#22C55E]" />
                  Monthly income
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="size-3 text-[#22C55E]" />
                  Rent affordability (30% rule)
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-xl p-6 border border-black/[0.04]">
              <div className="size-12 rounded-full bg-[#EF4444]/10 flex items-center justify-center mb-4">
                <Shield className="size-6 text-[#EF4444]" />
              </div>
              <h4 className="text-[16px] font-semibold text-[#0A0A0A] mb-2">
                Background Check
              </h4>
              <p className="text-[13px] text-[#6B7280] mb-3">
                Rental history, eviction records, and criminal background screening
              </p>
              <ul className="space-y-1 text-[12px] text-[#6B7280]">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="size-3 text-[#22C55E]" />
                  Eviction history (Canada-wide)
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="size-3 text-[#22C55E]" />
                  Previous landlord references
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="size-3 text-[#22C55E]" />
                  Criminal record check
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* New Screening Modal */}
        {showNewScreening && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-auto"
            >
              <div className="p-8">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h2 className="text-[24px] font-semibold text-[#0A0A0A] mb-2">
                      New Tenant Screening
                    </h2>
                    <p className="text-[14px] text-[#6B7280]">
                      Request comprehensive background check via Equifax Canada
                    </p>
                  </div>
                  <button
                    onClick={() => setShowNewScreening(false)}
                    className="text-[#6B7280] hover:text-[#0A0A0A]"
                  >
                    ✕
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-[13px] font-medium text-[#0A0A0A] mb-2">
                      Applicant Name
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-black/[0.08] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6366F1]"
                      placeholder="Sarah Kim"
                    />
                  </div>

                  <div>
                    <label className="block text-[13px] font-medium text-[#0A0A0A] mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      className="w-full px-4 py-3 border border-black/[0.08] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6366F1]"
                      placeholder="sarah@example.com"
                    />
                  </div>

                  <div>
                    <label className="block text-[13px] font-medium text-[#0A0A0A] mb-2">
                      Property
                    </label>
                    <select className="w-full px-4 py-3 border border-black/[0.08] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6366F1]">
                      <option value="">Select property...</option>
                      <option value="prop1">123 King St - Unit 4A</option>
                      <option value="prop2">123 King St - Unit 2C</option>
                      <option value="prop3">456 Queen St - Unit 1B</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[13px] font-medium text-[#0A0A0A] mb-2">
                      Screening Package
                    </label>
                    <div className="space-y-3">
                      <label className="flex items-start gap-3 p-4 border-2 border-black/[0.08] rounded-lg cursor-pointer hover:border-[#6366F1] transition-all">
                        <input type="radio" name="package" className="mt-1" defaultChecked />
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <p className="text-[14px] font-semibold text-[#0A0A0A]">
                              Complete Screening
                            </p>
                            <p className="text-[14px] font-bold text-[#6366F1]">$45 CAD</p>
                          </div>
                          <p className="text-[12px] text-[#6B7280]">
                            Credit report + Income verification + Background check
                          </p>
                        </div>
                      </label>

                      <label className="flex items-start gap-3 p-4 border-2 border-black/[0.08] rounded-lg cursor-pointer hover:border-[#6366F1] transition-all">
                        <input type="radio" name="package" className="mt-1" />
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <p className="text-[14px] font-semibold text-[#0A0A0A]">
                              Credit Only
                            </p>
                            <p className="text-[14px] font-bold text-[#6366F1]">$25 CAD</p>
                          </div>
                          <p className="text-[12px] text-[#6B7280]">
                            Equifax credit report only
                          </p>
                        </div>
                      </label>
                    </div>
                  </div>

                  <div className="bg-[#F59E0B]/10 border border-[#F59E0B]/20 rounded-xl p-4">
                    <div className="flex items-start gap-3">
                      <Info className="size-5 text-[#F59E0B] flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-[13px] font-medium text-[#0A0A0A] mb-1">
                          Applicant Consent Required
                        </p>
                        <p className="text-[12px] text-[#6B7280]">
                          An authorization request will be sent to the applicant. They must provide
                          consent before the screening can proceed (PIPEDA compliance).
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex gap-3">
                  <button
                    onClick={() => setShowNewScreening(false)}
                    className="flex-1 px-6 py-3 border border-black/[0.08] text-[#6B7280] text-[14px] font-medium rounded-lg hover:bg-[#F5F5F5] transition-colors"
                  >
                    Cancel
                  </button>
                  <button className="flex-1 px-6 py-3 bg-[#0A0A0A] text-white text-[14px] font-medium rounded-lg hover:bg-[#1C1C1C] transition-colors">
                    Send Authorization Request
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}

        {/* Report Detail Modal */}
        {selectedReport && selectedReport.status === "completed" && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-auto"
            >
              <div className="p-8">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h2 className="text-[24px] font-semibold text-[#0A0A0A] mb-2">
                      {selectedReport.applicantName}
                    </h2>
                    <p className="text-[14px] text-[#6B7280]">{selectedReport.property}</p>
                  </div>
                  <button
                    onClick={() => setSelectedReport(null)}
                    className="text-[#6B7280] hover:text-[#0A0A0A]"
                  >
                    ✕
                  </button>
                </div>

                {/* Risk Score Header */}
                <div className={`rounded-xl border p-6 mb-6 ${getRiskBgColor(selectedReport.riskScore)}`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[14px] text-[#6B7280] mb-1">Overall Risk Score</p>
                      <p className={`text-[48px] font-bold leading-none ${getRiskColor(selectedReport.riskScore)}`}>
                        {selectedReport.riskScore}%
                      </p>
                    </div>
                    <div className={`px-6 py-3 rounded-full border ${getRecommendationColor(selectedReport.recommendation)}`}>
                      <p className="text-[16px] font-semibold capitalize">
                        {selectedReport.recommendation === "approve" ? "✓ Recommend Approval" : 
                         selectedReport.recommendation === "conditional" ? "⚠ Conditional Approval" :
                         "✗ Not Recommended"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Report Details */}
                <div className="grid grid-cols-2 gap-6 mb-6">
                  <div className="p-4 bg-[#F5F5F5] rounded-lg">
                    <p className="text-[12px] text-[#9CA3AF] mb-2">Credit Score</p>
                    <p className="text-[32px] font-bold text-[#6366F1]">
                      {selectedReport.creditScore}
                    </p>
                    <p className="text-[11px] text-[#6B7280]">Excellent (720-900)</p>
                  </div>

                  <div className="p-4 bg-[#F5F5F5] rounded-lg">
                    <p className="text-[12px] text-[#9CA3AF] mb-2">Monthly Income</p>
                    <p className="text-[32px] font-bold text-[#22C55E]">
                      ${selectedReport.monthlyIncome?.toLocaleString()}
                    </p>
                    <p className="text-[11px] text-[#6B7280]">Verified employment</p>
                  </div>

                  <div className="p-4 bg-[#F5F5F5] rounded-lg">
                    <p className="text-[12px] text-[#9CA3AF] mb-2">Employment Status</p>
                    <p className="text-[16px] font-semibold text-[#0A0A0A]">
                      {selectedReport.employmentStatus}
                    </p>
                  </div>

                  <div className="p-4 bg-[#F5F5F5] rounded-lg">
                    <p className="text-[12px] text-[#9CA3AF] mb-2">Rental History</p>
                    <p className="text-[16px] font-semibold text-[#0A0A0A]">
                      {selectedReport.rentalHistory}
                    </p>
                  </div>
                </div>

                {/* Checks */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-between p-4 bg-[#22C55E]/10 rounded-lg">
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="size-5 text-[#22C55E]" />
                      <span className="text-[14px] font-medium text-[#0A0A0A]">
                        No Criminal Record
                      </span>
                    </div>
                    <span className="text-[12px] text-[#22C55E]">Clear</span>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-[#22C55E]/10 rounded-lg">
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="size-5 text-[#22C55E]" />
                      <span className="text-[14px] font-medium text-[#0A0A0A]">
                        No Eviction History
                      </span>
                    </div>
                    <span className="text-[12px] text-[#22C55E]">Clear</span>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setSelectedReport(null)}
                    className="flex-1 px-6 py-3 border border-black/[0.08] text-[#6B7280] text-[14px] font-medium rounded-lg hover:bg-[#F5F5F5] transition-colors"
                  >
                    Close
                  </button>
                  <button className="flex-1 px-6 py-3 bg-[#0A0A0A] text-white text-[14px] font-medium rounded-lg hover:bg-[#1C1C1C] transition-colors">
                    <Download className="size-4 inline mr-2" />
                    Download Report
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}

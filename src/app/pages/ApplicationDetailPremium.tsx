import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { motion } from "motion/react";
import {
  ArrowLeft,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Briefcase,
  FileText,
  User,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Shield,
  Award,
  Building2,
  Clock,
  Download,
  Send,
  Brain,
} from "lucide-react";

interface Application {
  id: string;
  name: string;
  email: string;
  phone: string;
  unit: string;
  requestedRent: number;
  moveInDate: string;
  aiScore: number;
  riskLevel: "low" | "medium" | "high";
  recommendation: "approve" | "review" | "reject";
  
  // Screening Inputs
  creditScore: number;
  monthlyIncome: number;
  employmentStatus: string;
  employmentYears: number;
  employerName: string;
  rentToIncomeRatio: number;
  previousRentalHistory: {
    address: string;
    landlord: string;
    duration: string;
    reference: "positive" | "neutral" | "negative";
  }[];
  references: {
    name: string;
    relationship: string;
    contact: string;
    verified: boolean;
  }[];
  
  // AI Analysis
  incomeStability: "stable" | "moderate" | "unstable";
  paymentProbability: number;
  redFlags: string[];
  strengths: string[];
}

// Mock data - in production this would come from API
const mockApplications: Record<string, Application> = {
  "1": {
    id: "1",
    name: "Sarah Kim",
    email: "sarah.kim@email.com",
    phone: "(416) 555-0123",
    unit: "Unit 4A - 2 Bedroom",
    requestedRent: 2300,
    moveInDate: "2026-04-01",
    aiScore: 92,
    riskLevel: "low",
    recommendation: "approve",
    creditScore: 745,
    monthlyIncome: 8500,
    employmentStatus: "Full-time Permanent",
    employmentYears: 4.5,
    employerName: "Tech Innovations Inc.",
    rentToIncomeRatio: 27,
    incomeStability: "stable",
    paymentProbability: 94,
    previousRentalHistory: [
      {
        address: "123 Queen St W, Toronto",
        landlord: "John Smith",
        duration: "2 years",
        reference: "positive",
      },
      {
        address: "456 King St E, Toronto",
        landlord: "Property Management Co.",
        duration: "1.5 years",
        reference: "positive",
      },
    ],
    references: [
      {
        name: "Michael Chen",
        relationship: "Previous Landlord",
        contact: "(416) 555-0199",
        verified: true,
      },
      {
        name: "Emma Wilson",
        relationship: "Employer",
        contact: "(416) 555-0177",
        verified: true,
      },
      {
        name: "David Park",
        relationship: "Personal Reference",
        contact: "(416) 555-0155",
        verified: true,
      },
    ],
    redFlags: [],
    strengths: [
      "Excellent credit score (745)",
      "Stable employment history (4.5 years)",
      "Low rent-to-income ratio (27%)",
      "Positive rental history",
      "All references verified",
    ],
  },
  "2": {
    id: "2",
    name: "Michael Patel",
    email: "m.patel@email.com",
    phone: "(416) 555-0456",
    unit: "Unit 2B - 1 Bedroom",
    requestedRent: 1950,
    moveInDate: "2026-04-15",
    aiScore: 87,
    riskLevel: "low",
    recommendation: "approve",
    creditScore: 712,
    monthlyIncome: 6800,
    employmentStatus: "Full-time Permanent",
    employmentYears: 3.2,
    employerName: "Marketing Solutions Ltd.",
    rentToIncomeRatio: 29,
    incomeStability: "stable",
    paymentProbability: 89,
    previousRentalHistory: [
      {
        address: "789 Bloor St, Toronto",
        landlord: "Sarah Thompson",
        duration: "3 years",
        reference: "positive",
      },
    ],
    references: [
      {
        name: "Sarah Thompson",
        relationship: "Previous Landlord",
        contact: "(416) 555-0288",
        verified: true,
      },
      {
        name: "James Wilson",
        relationship: "Employer",
        contact: "(416) 555-0266",
        verified: true,
      },
    ],
    redFlags: [],
    strengths: [
      "Good credit score (712)",
      "Stable employment (3.2 years)",
      "Healthy rent-to-income ratio (29%)",
      "Long-term previous rental (3 years)",
    ],
  },
  "3": {
    id: "3",
    name: "Jason Lee",
    email: "jason.lee@email.com",
    phone: "(647) 555-0789",
    unit: "Unit 1C - 3 Bedroom",
    requestedRent: 2800,
    moveInDate: "2026-05-01",
    aiScore: 68,
    riskLevel: "medium",
    recommendation: "review",
    creditScore: 658,
    monthlyIncome: 7200,
    employmentStatus: "Full-time Permanent",
    employmentYears: 1.8,
    employerName: "Retail Corp",
    rentToIncomeRatio: 39,
    incomeStability: "moderate",
    paymentProbability: 72,
    previousRentalHistory: [
      {
        address: "321 Yonge St, Toronto",
        landlord: "Property Co.",
        duration: "1 year",
        reference: "neutral",
      },
    ],
    references: [
      {
        name: "Property Co.",
        relationship: "Previous Landlord",
        contact: "(416) 555-0399",
        verified: true,
      },
      {
        name: "Pending",
        relationship: "Employer",
        contact: "Pending verification",
        verified: false,
      },
    ],
    redFlags: [
      "High rent-to-income ratio (39% - recommended max is 35%)",
      "Fair credit score (658)",
      "Shorter employment history (1.8 years)",
      "One employer reference not yet verified",
    ],
    strengths: [
      "Full-time permanent employment",
      "Previous rental reference verified",
      "Consistent payment history reported",
    ],
  },
};

export function ApplicationDetailPremium() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [showApproveModal, setShowApproveModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);

  const application = mockApplications[id || "1"];

  if (!application) {
    return <div>Application not found</div>;
  }

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

  const getRecommendationIcon = (rec: string) => {
    switch (rec) {
      case "approve":
        return <CheckCircle2 className="size-6" />;
      case "review":
        return <AlertTriangle className="size-6" />;
      case "reject":
        return <XCircle className="size-6" />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-black/[0.08] bg-white sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate("/applications")}
                className="size-10 rounded-lg border border-black/[0.08] flex items-center justify-center hover:bg-[#F5F5F5] transition-colors"
              >
                <ArrowLeft className="size-5 text-[#0A0A0A]" />
              </button>
              <div>
                <h1 className="text-[28px] font-semibold text-[#0A0A0A] tracking-tight">
                  {application.name}
                </h1>
                <p className="text-[14px] text-[#9CA3AF] mt-1">{application.unit}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button className="px-4 py-2.5 border border-black/[0.08] text-[#0A0A0A] text-[14px] font-medium rounded-lg hover:bg-[#F5F5F5] transition-colors flex items-center gap-2">
                <Download className="size-4" />
                Download
              </button>
              <button className="px-4 py-2.5 border border-black/[0.08] text-[#0A0A0A] text-[14px] font-medium rounded-lg hover:bg-[#F5F5F5] transition-colors flex items-center gap-2">
                <Send className="size-4" />
                Request Info
              </button>
              <button
                onClick={() => setShowRejectModal(true)}
                className="px-4 py-2.5 border border-[#EF4444]/20 text-[#EF4444] text-[14px] font-medium rounded-lg hover:bg-[#EF4444]/5 transition-colors"
              >
                Reject
              </button>
              <button
                onClick={() => setShowApproveModal(true)}
                className="px-6 py-2.5 bg-[#0A0A0A] text-white text-[14px] font-medium rounded-lg hover:bg-[#1C1C1C] transition-colors"
              >
                Approve Application
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content - Left 2 Columns */}
          <div className="lg:col-span-2 space-y-8">
            {/* AI Risk Engine - Hero Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-br from-[#0A0A0A] to-[#2A2A2A] rounded-2xl p-8 text-white relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
              <div className="relative">
                <div className="flex items-center gap-2 mb-6">
                  <Brain className="size-6" />
                  <h2 className="text-[24px] font-semibold">AI Risk Engine Analysis</h2>
                </div>

                <div className="grid grid-cols-3 gap-6 mb-8">
                  {/* AI Score */}
                  <div>
                    <p className="text-white/60 text-[12px] uppercase tracking-wider mb-2">
                      AI Score
                    </p>
                    <div className="flex items-baseline gap-2">
                      <h3 className="text-[48px] font-bold leading-none">
                        {application.aiScore}
                      </h3>
                      <span className="text-white/60 text-[18px]">/ 100</span>
                    </div>
                  </div>

                  {/* Risk Level */}
                  <div>
                    <p className="text-white/60 text-[12px] uppercase tracking-wider mb-2">
                      Risk Level
                    </p>
                    <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${getRiskBgColor(application.riskLevel)}`}>
                      {application.riskLevel === "low" && <CheckCircle2 className="size-5 text-[#22C55E]" />}
                      {application.riskLevel === "medium" && <AlertTriangle className="size-5 text-[#F59E0B]" />}
                      {application.riskLevel === "high" && <XCircle className="size-5 text-[#EF4444]" />}
                      <span className={`text-[14px] font-semibold capitalize ${getRiskColor(application.riskLevel)}`}>
                        {application.riskLevel}
                      </span>
                    </div>
                  </div>

                  {/* Payment Probability */}
                  <div>
                    <p className="text-white/60 text-[12px] uppercase tracking-wider mb-2">
                      Payment Probability
                    </p>
                    <div className="flex items-baseline gap-2">
                      <h3 className="text-[36px] font-bold leading-none">
                        {application.paymentProbability}%
                      </h3>
                    </div>
                  </div>
                </div>

                {/* AI Recommendation */}
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                  <div className="flex items-start gap-4">
                    <div className={`${getRiskColor(application.riskLevel)}`}>
                      {getRecommendationIcon(application.recommendation)}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-[16px] font-semibold mb-2">AI Recommendation</h4>
                      <p className="text-white/80 text-[14px] leading-relaxed">
                        {application.recommendation === "approve" && (
                          <>
                            <span className="font-semibold text-[#22C55E]">Approve:</span> This applicant demonstrates strong financial stability, excellent rental history, and low risk indicators. All screening criteria have been met or exceeded.
                          </>
                        )}
                        {application.recommendation === "review" && (
                          <>
                            <span className="font-semibold text-[#F59E0B]">Manual Review Required:</span> This applicant shows some concerns that require landlord evaluation. Review the red flags section and consider requesting additional documentation.
                          </>
                        )}
                        {application.recommendation === "reject" && (
                          <>
                            <span className="font-semibold text-[#EF4444]">Reject:</span> This applicant presents significant risk factors that do not meet minimum screening requirements. Consider declining or requesting substantial improvements.
                          </>
                        )}
                      </p>
                      <p className="text-white/50 text-[12px] mt-4 italic">
                        Note: This is an AI recommendation. Final decision rests with the landlord.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Financial Analysis */}
            <div className="bg-white border border-black/[0.08] rounded-xl p-8">
              <h3 className="text-[20px] font-semibold text-[#0A0A0A] mb-6">Financial Analysis</h3>
              
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div>
                  <div className="flex items-center gap-2 text-[#9CA3AF] text-[12px] uppercase tracking-wider mb-2">
                    <DollarSign className="size-4" />
                    Monthly Income
                  </div>
                  <p className="text-[32px] font-semibold text-[#0A0A0A]">
                    ${application.monthlyIncome.toLocaleString()}
                  </p>
                </div>

                <div>
                  <div className="flex items-center gap-2 text-[#9CA3AF] text-[12px] uppercase tracking-wider mb-2">
                    <Building2 className="size-4" />
                    Requested Rent
                  </div>
                  <p className="text-[32px] font-semibold text-[#0A0A0A]">
                    ${application.requestedRent.toLocaleString()}
                  </p>
                </div>

                <div>
                  <div className="flex items-center gap-2 text-[#9CA3AF] text-[12px] uppercase tracking-wider mb-2">
                    <TrendingUp className="size-4" />
                    Rent-to-Income Ratio
                  </div>
                  <div className="flex items-baseline gap-2">
                    <p className={`text-[32px] font-semibold ${application.rentToIncomeRatio > 35 ? 'text-[#F59E0B]' : 'text-[#22C55E]'}`}>
                      {application.rentToIncomeRatio}%
                    </p>
                    <span className="text-[14px] text-[#9CA3AF]">
                      {application.rentToIncomeRatio <= 30 ? 'Excellent' : application.rentToIncomeRatio <= 35 ? 'Good' : 'High'}
                    </span>
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-2 text-[#9CA3AF] text-[12px] uppercase tracking-wider mb-2">
                    <Award className="size-4" />
                    Credit Score
                  </div>
                  <div className="flex items-baseline gap-2">
                    <p className={`text-[32px] font-semibold ${
                      application.creditScore >= 700 ? 'text-[#22C55E]' : 
                      application.creditScore >= 650 ? 'text-[#F59E0B]' : 
                      'text-[#EF4444]'
                    }`}>
                      {application.creditScore}
                    </p>
                    <span className="text-[14px] text-[#9CA3AF]">
                      {application.creditScore >= 700 ? 'Good' : application.creditScore >= 650 ? 'Fair' : 'Poor'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Income Stability Indicator */}
              <div className={`p-4 rounded-xl border ${
                application.incomeStability === 'stable' ? 'bg-[#22C55E]/5 border-[#22C55E]/20' :
                application.incomeStability === 'moderate' ? 'bg-[#F59E0B]/5 border-[#F59E0B]/20' :
                'bg-[#EF4444]/5 border-[#EF4444]/20'
              }`}>
                <div className="flex items-start gap-3">
                  {application.incomeStability === 'stable' ? (
                    <TrendingUp className="size-5 text-[#22C55E] flex-shrink-0 mt-0.5" />
                  ) : (
                    <TrendingDown className="size-5 text-[#F59E0B] flex-shrink-0 mt-0.5" />
                  )}
                  <div>
                    <p className="font-semibold text-[14px] text-[#0A0A0A] mb-1">
                      Income Stability: <span className="capitalize">{application.incomeStability}</span>
                    </p>
                    <p className="text-[13px] text-[#6B7280] leading-relaxed">
                      {application.incomeStability === 'stable' && 'Applicant shows consistent employment history with strong income stability indicators.'}
                      {application.incomeStability === 'moderate' && 'Employment history shows moderate stability. Consider requesting additional income verification.'}
                      {application.incomeStability === 'unstable' && 'Income stability concerns detected. Recommend requesting co-signer or additional security deposit.'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Employment Verification */}
            <div className="bg-white border border-black/[0.08] rounded-xl p-8">
              <h3 className="text-[20px] font-semibold text-[#0A0A0A] mb-6">Employment Verification</h3>
              
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-[12px] text-[#9CA3AF] uppercase tracking-wider mb-1">Employer</p>
                    <p className="text-[16px] font-semibold text-[#0A0A0A]">{application.employerName}</p>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-[#22C55E]/10 rounded-full">
                    <CheckCircle2 className="size-4 text-[#22C55E]" />
                    <span className="text-[12px] font-medium text-[#22C55E]">Verified</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6 pt-4 border-t border-black/[0.04]">
                  <div>
                    <p className="text-[12px] text-[#9CA3AF] mb-1">Position</p>
                    <p className="text-[16px] font-semibold text-[#0A0A0A]">{application.employmentStatus}</p>
                  </div>
                  <div>
                    <p className="text-[12px] text-[#9CA3AF] mb-1">Years Employed</p>
                    <p className="text-[16px] font-semibold text-[#0A0A0A]">{application.employmentYears} years</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Rental History */}
            <div className="bg-white border border-black/[0.08] rounded-xl p-8">
              <h3 className="text-[20px] font-semibold text-[#0A0A0A] mb-6">Previous Rental History</h3>
              
              <div className="space-y-4">
                {application.previousRentalHistory.map((rental, idx) => (
                  <div key={idx} className="p-4 bg-[#F9FAFB] rounded-lg">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <p className="font-semibold text-[#0A0A0A] text-[14px]">{rental.address}</p>
                        <p className="text-[13px] text-[#9CA3AF] mt-1">Landlord: {rental.landlord}</p>
                      </div>
                      <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full ${
                        rental.reference === 'positive' ? 'bg-[#22C55E]/10' :
                        rental.reference === 'neutral' ? 'bg-[#9CA3AF]/10' :
                        'bg-[#EF4444]/10'
                      }`}>
                        {rental.reference === 'positive' && <CheckCircle2 className="size-4 text-[#22C55E]" />}
                        {rental.reference === 'neutral' && <AlertTriangle className="size-4 text-[#9CA3AF]" />}
                        {rental.reference === 'negative' && <XCircle className="size-4 text-[#EF4444]" />}
                        <span className={`text-[12px] font-medium capitalize ${
                          rental.reference === 'positive' ? 'text-[#22C55E]' :
                          rental.reference === 'neutral' ? 'text-[#9CA3AF]' :
                          'text-[#EF4444]'
                        }`}>
                          {rental.reference}
                        </span>
                      </div>
                    </div>
                    <p className="text-[13px] text-[#6B7280]">Duration: {rental.duration}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* References */}
            <div className="bg-white border border-black/[0.08] rounded-xl p-8">
              <h3 className="text-[20px] font-semibold text-[#0A0A0A] mb-6">References</h3>
              
              <div className="space-y-4">
                {application.references.map((ref, idx) => (
                  <div key={idx} className="flex items-center justify-between p-4 bg-[#F9FAFB] rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="size-10 rounded-full bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] flex items-center justify-center">
                        <User className="size-5 text-white" />
                      </div>
                      <div>
                        <p className="font-semibold text-[14px] text-[#0A0A0A]">{ref.name}</p>
                        <p className="text-[13px] text-[#9CA3AF]">{ref.relationship}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <p className="text-[13px] text-[#6B7280]">{ref.contact}</p>
                      {ref.verified ? (
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-[#22C55E]/10 rounded-full">
                          <CheckCircle2 className="size-4 text-[#22C55E]" />
                          <span className="text-[12px] font-medium text-[#22C55E]">Verified</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-[#F59E0B]/10 rounded-full">
                          <Clock className="size-4 text-[#F59E0B]" />
                          <span className="text-[12px] font-medium text-[#F59E0B]">Pending</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Applicant Info */}
            <div className="bg-white border border-black/[0.08] rounded-xl p-6 sticky top-24">
              <h3 className="text-[16px] font-semibold text-[#0A0A0A] mb-6">Applicant Information</h3>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <User className="size-5 text-[#9CA3AF] flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[12px] text-[#9CA3AF] mb-1">Full Name</p>
                    <p className="text-[14px] font-medium text-[#0A0A0A]">{application.name}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="size-5 text-[#9CA3AF] flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[12px] text-[#9CA3AF] mb-1">Email</p>
                    <p className="text-[14px] font-medium text-[#0A0A0A]">{application.email}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="size-5 text-[#9CA3AF] flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[12px] text-[#9CA3AF] mb-1">Phone</p>
                    <p className="text-[14px] font-medium text-[#0A0A0A]">{application.phone}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Calendar className="size-5 text-[#9CA3AF] flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[12px] text-[#9CA3AF] mb-1">Move-in Date</p>
                    <p className="text-[14px] font-medium text-[#0A0A0A]">
                      {new Date(application.moveInDate).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Strengths */}
            {application.strengths.length > 0 && (
              <div className="bg-[#22C55E]/5 border border-[#22C55E]/20 rounded-xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <CheckCircle2 className="size-5 text-[#22C55E]" />
                  <h3 className="text-[16px] font-semibold text-[#0A0A0A]">Strengths</h3>
                </div>
                <ul className="space-y-2">
                  {application.strengths.map((strength, idx) => (
                    <li key={idx} className="text-[13px] text-[#0A0A0A] leading-relaxed flex items-start gap-2">
                      <span className="text-[#22C55E] mt-1">•</span>
                      <span>{strength}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Red Flags */}
            {application.redFlags.length > 0 && (
              <div className="bg-[#EF4444]/5 border border-[#EF4444]/20 rounded-xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <AlertTriangle className="size-5 text-[#EF4444]" />
                  <h3 className="text-[16px] font-semibold text-[#0A0A0A]">Red Flags</h3>
                </div>
                <ul className="space-y-2">
                  {application.redFlags.map((flag, idx) => (
                    <li key={idx} className="text-[13px] text-[#0A0A0A] leading-relaxed flex items-start gap-2">
                      <span className="text-[#EF4444] mt-1">•</span>
                      <span>{flag}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Approve Modal */}
      {showApproveModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl max-w-md w-full p-8"
          >
            <div className="flex items-center justify-center size-16 rounded-full bg-[#22C55E]/10 mx-auto mb-6">
              <CheckCircle2 className="size-8 text-[#22C55E]" />
            </div>
            <h2 className="text-[24px] font-semibold text-[#0A0A0A] text-center mb-3">
              Approve Application?
            </h2>
            <p className="text-[14px] text-[#6B7280] text-center mb-8 leading-relaxed">
              You're about to approve <span className="font-semibold text-[#0A0A0A]">{application.name}</span> for {application.unit}. This will generate the lease agreement and send a notification to the tenant.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowApproveModal(false)}
                className="flex-1 px-4 py-3 border border-black/[0.08] text-[#0A0A0A] text-[14px] font-medium rounded-lg hover:bg-[#F5F5F5] transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowApproveModal(false);
                  // Handle approval logic
                  navigate("/applications");
                }}
                className="flex-1 px-4 py-3 bg-[#22C55E] text-white text-[14px] font-medium rounded-lg hover:bg-[#16A34A] transition-colors"
              >
                Confirm Approval
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Reject Modal */}
      {showRejectModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl max-w-md w-full p-8"
          >
            <div className="flex items-center justify-center size-16 rounded-full bg-[#EF4444]/10 mx-auto mb-6">
              <XCircle className="size-8 text-[#EF4444]" />
            </div>
            <h2 className="text-[24px] font-semibold text-[#0A0A0A] text-center mb-3">
              Reject Application?
            </h2>
            <p className="text-[14px] text-[#6B7280] text-center mb-8 leading-relaxed">
              You're about to reject <span className="font-semibold text-[#0A0A0A]">{application.name}</span>'s application. This action can be reversed later if needed.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowRejectModal(false)}
                className="flex-1 px-4 py-3 border border-black/[0.08] text-[#0A0A0A] text-[14px] font-medium rounded-lg hover:bg-[#F5F5F5] transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowRejectModal(false);
                  // Handle rejection logic
                  navigate("/applications");
                }}
                className="flex-1 px-4 py-3 bg-[#EF4444] text-white text-[14px] font-medium rounded-lg hover:bg-[#DC2626] transition-colors"
              >
                Confirm Rejection
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}

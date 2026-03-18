import { useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import {
  Shield,
  CheckCircle2,
  Award,
  TrendingUp,
  User,
  MapPin,
  Calendar,
  DollarSign,
  FileText,
  Download,
  Share2,
  Star,
  Building2,
  Clock,
  Phone,
  Mail,
  Briefcase,
  Home,
  XCircle,
  AlertTriangle,
} from "lucide-react";

interface TenantProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  trustScore: number;
  verified: boolean;
  memberSince: string;
  totalRentals: number;
  yearsRenting: number;
  onTimePayments: number;
  totalPayments: number;
  
  // Payment History
  paymentHistory: {
    month: string;
    status: "paid" | "late" | "missed";
    amount: number;
    daysLate?: number;
  }[];
  
  // Rental History
  rentalHistory: {
    address: string;
    landlord: string;
    duration: string;
    rent: number;
    startDate: string;
    endDate: string;
    reference: "positive" | "neutral" | "negative";
    referenceNote: string;
  }[];
  
  // References
  references: {
    name: string;
    relationship: string;
    contact: string;
    verified: boolean;
    rating: number;
    comment: string;
  }[];
  
  // Identity Verification
  identityVerified: boolean;
  incomeVerified: boolean;
  employmentVerified: boolean;
  creditCheckCompleted: boolean;
  
  // Maintenance Behavior
  maintenanceRequests: number;
  averageResponseTime: string;
  issueCompliance: number;
}

// Mock data
const mockTenantProfile: TenantProfile = {
  id: "T-2024-001",
  name: "Sarah Kim",
  email: "sarah.kim@email.com",
  phone: "(416) 555-0123",
  trustScore: 92,
  verified: true,
  memberSince: "2019-03-15",
  totalRentals: 3,
  yearsRenting: 7,
  onTimePayments: 82,
  totalPayments: 84,
  
  paymentHistory: [
    { month: "Mar 2026", status: "paid", amount: 2300 },
    { month: "Feb 2026", status: "paid", amount: 2300 },
    { month: "Jan 2026", status: "paid", amount: 2300 },
    { month: "Dec 2025", status: "paid", amount: 2300 },
    { month: "Nov 2025", status: "late", amount: 2300, daysLate: 3 },
    { month: "Oct 2025", status: "paid", amount: 2300 },
    { month: "Sep 2025", status: "paid", amount: 2300 },
    { month: "Aug 2025", status: "paid", amount: 2300 },
    { month: "Jul 2025", status: "late", amount: 2300, daysLate: 2 },
    { month: "Jun 2025", status: "paid", amount: 2300 },
    { month: "May 2025", status: "paid", amount: 2300 },
    { month: "Apr 2025", status: "paid", amount: 2300 },
  ],
  
  rentalHistory: [
    {
      address: "456 King St E, Unit 4A, Toronto, ON",
      landlord: "Michael Chen Property Management",
      duration: "2 years 3 months",
      rent: 2300,
      startDate: "2024-01-01",
      endDate: "Present",
      reference: "positive",
      referenceNote: "Excellent tenant. Always pays on time, respectful of property, and communicates well. Would rent to again without hesitation.",
    },
    {
      address: "123 Queen St W, Unit 12B, Toronto, ON",
      landlord: "Property Innovations Inc.",
      duration: "2 years",
      rent: 2100,
      startDate: "2022-01-01",
      endDate: "2023-12-31",
      reference: "positive",
      referenceNote: "Very responsible tenant. Maintained property well and gave proper notice before moving out.",
    },
    {
      address: "789 Bloor St, Unit 3C, Toronto, ON",
      landlord: "Toronto Rentals Co.",
      duration: "1 year 6 months",
      rent: 1850,
      startDate: "2020-06-01",
      endDate: "2021-12-31",
      reference: "positive",
      referenceNote: "Good tenant with no issues during tenancy.",
    },
  ],
  
  references: [
    {
      name: "Michael Chen",
      relationship: "Current Landlord",
      contact: "(416) 555-0199",
      verified: true,
      rating: 5,
      comment: "Sarah has been an exceptional tenant for over 2 years. Always pays rent on the 1st, keeps the unit immaculate, and is very communicative.",
    },
    {
      name: "Emma Wilson",
      relationship: "Previous Landlord",
      contact: "(416) 555-0177",
      verified: true,
      rating: 5,
      comment: "No issues whatsoever. Professional and respectful. Would definitely recommend.",
    },
    {
      name: "David Martinez",
      relationship: "Employer - Tech Innovations Inc.",
      contact: "(416) 555-0155",
      verified: true,
      rating: 5,
      comment: "Sarah has been with our company for 4.5 years as a Software Engineer. Stable employment and excellent performance.",
    },
  ],
  
  identityVerified: true,
  incomeVerified: true,
  employmentVerified: true,
  creditCheckCompleted: true,
  
  maintenanceRequests: 8,
  averageResponseTime: "< 24 hours",
  issueCompliance: 100,
};

export function TenantPassportPremium() {
  const navigate = useNavigate();
  const [profile] = useState<TenantProfile>(mockTenantProfile);

  const getTrustScoreColor = (score: number) => {
    if (score >= 85) return "text-[#22C55E]";
    if (score >= 70) return "text-[#F59E0B]";
    return "text-[#EF4444]";
  };

  const getTrustScoreBg = (score: number) => {
    if (score >= 85) return "bg-[#22C55E]/10";
    if (score >= 70) return "bg-[#F59E0B]/10";
    return "bg-[#EF4444]/10";
  };

  const getTrustScoreLabel = (score: number) => {
    if (score >= 85) return "Highly Reliable";
    if (score >= 70) return "Reliable";
    return "Needs Review";
  };

  const paymentSuccessRate = ((profile.onTimePayments / profile.totalPayments) * 100).toFixed(1);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-[rgba(0,0,0,0.07)] bg-white">
        <div className="max-w-7xl mx-auto px-8 py-8">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Shield className="size-8 text-[#0A7A52]" />
                <h1 className="text-[48px] font-normal text-[#0E0F0C] tracking-tight" style={{ fontFamily: "'Instrument Serif', Georgia, serif", letterSpacing: '-1px' }}>
                  Tenant Passport
                </h1>
                {profile.verified && (
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-[#E5F4EE] border border-[#0A7A52]/20 rounded-full">
                    <CheckCircle2 className="size-4 text-[#0A7A52]" />
                    <span className="text-[11px] font-semibold text-[#0A7A52] uppercase tracking-wider">Verified</span>
                  </div>
                )}
              </div>
              <p className="text-[14px] text-[#767570]">
                Portable rental profile • Trusted by landlords across Ontario
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button className="px-4 py-2.5 border border-[rgba(0,0,0,0.07)] text-[#0E0F0C] text-[13px] font-medium rounded-lg hover:bg-[#F8F7F4] transition-colors flex items-center gap-2">
                <Share2 className="size-4" />
                Share Profile
              </button>
              <button className="px-4 py-2.5 bg-[#0A7A52] text-white text-[13px] font-medium rounded-lg hover:bg-[#0A7A52]/90 transition-colors flex items-center gap-2">
                <Download className="size-4" />
                Download PDF
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content - Left 2 Columns */}
          <div className="lg:col-span-2 space-y-8">
            {/* Trust Score Hero */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-br from-[#0A7A52] to-[#085D3D] rounded-2xl p-8 text-white relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
              <div className="relative">
                <div className="flex items-center gap-2 mb-6">
                  <Award className="size-6" />
                  <h2 className="text-[24px] font-normal text-[#ffeded]" style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}>Tenant Trust Score</h2>
                </div>

                <div className="grid grid-cols-2 gap-8">
                  <div>
                    <p className="text-white/70 text-[11px] uppercase tracking-wider mb-2 font-semibold">
                      Overall Score
                    </p>
                    <div className="flex items-baseline gap-2 mb-4">
                      <h3 className="text-[64px] font-normal leading-none text-[#ffffff]" style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}>
                        {profile.trustScore}
                      </h3>
                      <span className="text-white/70 text-[24px] font-normal" style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}>/ 100</span>
                    </div>
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 border border-white/30">
                      <CheckCircle2 className="size-5 text-white" />
                      <span className="text-[13px] font-semibold text-white uppercase tracking-wider">
                        {getTrustScoreLabel(profile.trustScore)}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <p className="text-white/70 text-[11px] uppercase tracking-wider mb-2 font-semibold">
                        Payment Success Rate
                      </p>
                      <p className="text-[36px] font-normal text-[#fffefe]" style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}>{paymentSuccessRate}%</p>
                      <p className="text-white/70 text-[13px]">
                        {profile.onTimePayments} of {profile.totalPayments} on-time
                      </p>
                    </div>

                    <div>
                      <p className="text-white/70 text-[11px] uppercase tracking-wider mb-2 font-semibold">
                        Years Renting
                      </p>
                      <p className="text-[36px] font-normal text-[#ffffff]" style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}>{profile.yearsRenting}</p>
                      <p className="text-white/70 text-[13px]">
                        {profile.totalRentals} previous rentals
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Verification Status */}
            <div className="bg-white border border-[rgba(0,0,0,0.07)] rounded-xl p-8">
              <h3 className="text-[22px] font-normal text-[#0E0F0C] mb-6" style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}>Verification Status</h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div className={`p-4 rounded-xl border ${profile.identityVerified ? 'bg-[#E5F4EE] border-[#0A7A52]/20' : 'bg-[#F8F7F4] border-[rgba(0,0,0,0.07)]'}`}>
                  <div className="flex items-center gap-3">
                    {profile.identityVerified ? (
                      <CheckCircle2 className="size-5 text-[#0A7A52]" />
                    ) : (
                      <XCircle className="size-5 text-[#767570]" />
                    )}
                    <div>
                      <p className="font-semibold text-[14px] text-[#0E0F0C]">Identity Verified</p>
                      <p className="text-[12px] text-[#767570]">Government ID confirmed</p>
                    </div>
                  </div>
                </div>

                <div className={`p-4 rounded-xl border ${profile.incomeVerified ? 'bg-[#E5F4EE] border-[#0A7A52]/20' : 'bg-[#F8F7F4] border-[rgba(0,0,0,0.07)]'}`}>
                  <div className="flex items-center gap-3">
                    {profile.incomeVerified ? (
                      <CheckCircle2 className="size-5 text-[#0A7A52]" />
                    ) : (
                      <XCircle className="size-5 text-[#767570]" />
                    )}
                    <div>
                      <p className="font-semibold text-[14px] text-[#0E0F0C]">Income Verified</p>
                      <p className="text-[12px] text-[#767570]">Pay stubs confirmed</p>
                    </div>
                  </div>
                </div>

                <div className={`p-4 rounded-xl border ${profile.employmentVerified ? 'bg-[#E5F4EE] border-[#0A7A52]/20' : 'bg-[#F8F7F4] border-[rgba(0,0,0,0.07)]'}`}>
                  <div className="flex items-center gap-3">
                    {profile.employmentVerified ? (
                      <CheckCircle2 className="size-5 text-[#0A7A52]" />
                    ) : (
                      <XCircle className="size-5 text-[#767570]" />
                    )}
                    <div>
                      <p className="font-semibold text-[14px] text-[#0E0F0C]">Employment Verified</p>
                      <p className="text-[12px] text-[#767570]">Employer confirmed</p>
                    </div>
                  </div>
                </div>

                <div className={`p-4 rounded-xl border ${profile.creditCheckCompleted ? 'bg-[#E5F4EE] border-[#0A7A52]/20' : 'bg-[#F8F7F4] border-[rgba(0,0,0,0.07)]'}`}>
                  <div className="flex items-center gap-3">
                    {profile.creditCheckCompleted ? (
                      <CheckCircle2 className="size-5 text-[#0A7A52]" />
                    ) : (
                      <XCircle className="size-5 text-[#767570]" />
                    )}
                    <div>
                      <p className="font-semibold text-[14px] text-[#0E0F0C]">Credit Check</p>
                      <p className="text-[12px] text-[#767570]">Completed</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment History */}
            <div className="bg-white border border-black/[0.08] rounded-xl p-8">
              <h3 className="text-[22px] font-normal text-[#0E0F0C] mb-6" style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}>Payment History (Last 12 Months)</h3>
              
              <div className="grid grid-cols-6 gap-3">
                {profile.paymentHistory.map((payment, idx) => (
                  <div key={idx} className="text-center">
                    <div className={`h-24 rounded-lg mb-2 flex items-end justify-center pb-2 ${
                      payment.status === 'paid' ? 'bg-[#E5F4EE]' :
                      payment.status === 'late' ? 'bg-[#F59E0B]/10' :
                      'bg-[#EF4444]/10'
                    }`}>
                      {payment.status === 'paid' && <CheckCircle2 className="size-5 text-[#0A7A52]" />}
                      {payment.status === 'late' && <Clock className="size-5 text-[#F59E0B]" />}
                      {payment.status === 'missed' && <XCircle className="size-5 text-[#EF4444]" />}
                    </div>
                    <p className="text-[11px] text-[#767570]">{payment.month}</p>
                    {payment.daysLate && (
                      <p className="text-[10px] text-[#F59E0B]">{payment.daysLate}d late</p>
                    )}
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-6 mt-6 pt-6 border-t border-[rgba(0,0,0,0.04)]">
                <div className="flex items-center gap-2">
                  <div className="size-3 rounded-full bg-[#0A7A52]"></div>
                  <span className="text-[13px] text-[#767570]">On Time</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="size-3 rounded-full bg-[#F59E0B]"></div>
                  <span className="text-[13px] text-[#767570]">Late</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="size-3 rounded-full bg-[#EF4444]"></div>
                  <span className="text-[13px] text-[#767570]">Missed</span>
                </div>
              </div>
            </div>

            {/* Rental History */}
            <div className="bg-white border border-black/[0.08] rounded-xl p-8">
              <h3 className="text-[22px] font-normal text-[#0E0F0C] mb-6" style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}>Rental History</h3>
              
              <div className="space-y-6">
                {profile.rentalHistory.map((rental, idx) => (
                  <div key={idx} className="p-6 bg-[#F8F7F4] rounded-xl">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start gap-4">
                        <div className="size-12 rounded-lg bg-white border border-[rgba(0,0,0,0.07)] flex items-center justify-center">
                          <Home className="size-6 text-[#0A7A52]" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-[16px] text-[#0E0F0C] mb-1">
                            {rental.address}
                          </h4>
                          <p className="text-[13px] text-[#767570]">Landlord: {rental.landlord}</p>
                        </div>
                      </div>
                      <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full ${
                        rental.reference === 'positive' ? 'bg-[#E5F4EE] border border-[#0A7A52]/20' :
                        rental.reference === 'neutral' ? 'bg-white border border-[rgba(0,0,0,0.07)]' :
                        'bg-[#EF4444]/10'
                      }`}>
                        {rental.reference === 'positive' && <CheckCircle2 className="size-4 text-[#0A7A52]" />}
                        {rental.reference === 'neutral' && <AlertTriangle className="size-4 text-[#767570]" />}
                        {rental.reference === 'negative' && <XCircle className="size-4 text-[#EF4444]" />}
                        <span className={`text-[12px] font-medium capitalize ${
                          rental.reference === 'positive' ? 'text-[#0A7A52]' :
                          rental.reference === 'neutral' ? 'text-[#767570]' :
                          'text-[#EF4444]'
                        }`}>
                          {rental.reference}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <div>
                        <p className="text-[11px] text-[#767570] uppercase tracking-wider mb-1">Duration</p>
                        <p className="text-[14px] font-semibold text-[#0E0F0C]">{rental.duration}</p>
                      </div>
                      <div>
                        <p className="text-[11px] text-[#767570] uppercase tracking-wider mb-1">Monthly Rent</p>
                        <p className="text-[14px] font-semibold text-[#0E0F0C]">${rental.rent.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-[11px] text-[#767570] uppercase tracking-wider mb-1">Period</p>
                        <p className="text-[14px] font-semibold text-[#0E0F0C]">
                          {new Date(rental.startDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })} - {rental.endDate === 'Present' ? 'Present' : new Date(rental.endDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                        </p>
                      </div>
                    </div>

                    <div className="p-4 bg-white rounded-lg border border-[rgba(0,0,0,0.04)]">
                      <p className="text-[12px] text-[#767570] uppercase tracking-wider mb-2">Landlord Reference</p>
                      <p className="text-[14px] text-[#0E0F0C] leading-relaxed italic">
                        "{rental.referenceNote}"
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* References */}
            <div className="bg-white border border-black/[0.08] rounded-xl p-8">
              <h3 className="text-[22px] font-normal text-[#0E0F0C] mb-6" style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}>Professional References</h3>
              
              <div className="space-y-4">
                {profile.references.map((ref, idx) => (
                  <div key={idx} className="p-6 bg-[#F8F7F4] rounded-xl">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <div className="size-12 rounded-full bg-gradient-to-br from-[#0A7A52] to-[#085D3D] flex items-center justify-center">
                          <User className="size-6 text-white" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-[16px] text-[#0E0F0C]">{ref.name}</h4>
                          <p className="text-[13px] text-[#767570]">{ref.relationship}</p>
                          <p className="text-[13px] text-[#767570] mt-1">{ref.contact}</p>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        {ref.verified && (
                          <div className="flex items-center gap-2 px-3 py-1.5 bg-[#E5F4EE] border border-[#0A7A52]/20 rounded-full">
                            <CheckCircle2 className="size-4 text-[#0A7A52]" />
                            <span className="text-[12px] font-medium text-[#0A7A52]">Verified</span>
                          </div>
                        )}
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`size-4 ${i < ref.rating ? 'fill-[#F59E0B] text-[#F59E0B]' : 'text-[#E5E7EB]'}`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                    <p className="text-[14px] text-[#767570] leading-relaxed italic">
                      "{ref.comment}"
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Maintenance Behavior */}
            <div className="bg-white border border-black/[0.08] rounded-xl p-8">
              <h3 className="text-[22px] font-normal text-[#0E0F0C] mb-6" style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}>Maintenance Behavior</h3>
              
              <div className="grid grid-cols-3 gap-6">
                <div>
                  <p className="text-[12px] text-[#767570] uppercase tracking-wider mb-2">Total Requests</p>
                  <p className="text-[32px] font-semibold text-[#0E0F0C]">{profile.maintenanceRequests}</p>
                  <p className="text-[13px] text-[#767570] mt-1">Over {profile.yearsRenting} years</p>
                </div>
                <div>
                  <p className="text-[12px] text-[#767570] uppercase tracking-wider mb-2">Response Time</p>
                  <p className="text-[32px] font-semibold text-[#0A7A52]">{profile.averageResponseTime}</p>
                  <p className="text-[13px] text-[#767570] mt-1">Average response</p>
                </div>
                <div>
                  <p className="text-[12px] text-[#767570] uppercase tracking-wider mb-2">Issue Compliance</p>
                  <p className="text-[32px] font-semibold text-[#0A7A52]">{profile.issueCompliance}%</p>
                  <p className="text-[13px] text-[#767570] mt-1">Follows instructions</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Contact Info */}
            <div className="bg-white border border-black/[0.08] rounded-xl p-6 sticky top-24">
              <h3 className="text-[18px] font-normal text-[#0E0F0C] mb-6" style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}>Contact Information</h3>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <User className="size-5 text-[#767570] flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[12px] text-[#767570] mb-1">Full Name</p>
                    <p className="text-[14px] font-medium text-[#0E0F0C]">{profile.name}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="size-5 text-[#767570] flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[12px] text-[#767570] mb-1">Email</p>
                    <p className="text-[14px] font-medium text-[#0E0F0C]">{profile.email}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="size-5 text-[#767570] flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[12px] text-[#767570] mb-1">Phone</p>
                    <p className="text-[14px] font-medium text-[#0E0F0C]">{profile.phone}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Calendar className="size-5 text-[#767570] flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[12px] text-[#767570] mb-1">Member Since</p>
                    <p className="text-[14px] font-medium text-[#0E0F0C]">
                      {new Date(profile.memberSince).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-[rgba(0,0,0,0.04)]">
                <p className="text-[11px] text-[#767570] uppercase tracking-wider mb-2">Passport ID</p>
                <p className="text-[14px] font-mono font-semibold text-[#0E0F0C]">{profile.id}</p>
              </div>
            </div>

            {/* Trust Badge */}
            <div className="bg-gradient-to-br from-[#0A7A52] to-[#085D3D] rounded-xl p-6 text-white">
              <div className="flex items-center gap-2 mb-4">
                <Shield className="size-6" />
                <h3 className="text-[18px] font-normal text-[#fffafa]" style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}>Verified Tenant</h3>
              </div>
              <p className="text-white/90 text-[13px] leading-relaxed">
                This tenant passport has been verified by YourPropertyAI and is trusted by landlords across Ontario.
              </p>
              <div className="mt-4 pt-4 border-t border-white/20">
                <p className="text-white/70 text-[11px]">
                  Share this profile with landlords to speed up your application process
                </p>
              </div>
            </div>

            {/* Network Effects */}
            <div className="bg-[#F8F7F4] border border-[rgba(0,0,0,0.07)] rounded-xl p-6">
              <h3 className="text-[18px] font-normal text-[#0E0F0C] mb-4" style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}>Platform Benefits</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="size-5 text-[#0A7A52] flex-shrink-0 mt-0.5" />
                  <span className="text-[13px] text-[#767570]">Portable credit across properties</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="size-5 text-[#0A7A52] flex-shrink-0 mt-0.5" />
                  <span className="text-[13px] text-[#767570]">Faster application approvals</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="size-5 text-[#0A7A52] flex-shrink-0 mt-0.5" />
                  <span className="text-[13px] text-[#767570]">Trusted reputation system</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="size-5 text-[#0A7A52] flex-shrink-0 mt-0.5" />
                  <span className="text-[13px] text-[#767570]">Priority access to listings</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
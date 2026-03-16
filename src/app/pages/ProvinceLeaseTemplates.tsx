import { useState } from "react";
import { motion } from "motion/react";
import {
  FileText,
  Download,
  CheckCircle2,
  MapPin,
  Calendar,
  Shield,
  Info,
  ExternalLink,
  Eye,
  Edit,
} from "lucide-react";

interface Province {
  id: string;
  name: string;
  abbr: string;
  rentIncreaseGuideline2026: string;
  noticeRequired: string;
  uniqueRules: string[];
  templateAvailable: boolean;
}

const provinces: Province[] = [
  {
    id: "on",
    name: "Ontario",
    abbr: "ON",
    rentIncreaseGuideline2026: "2.5%",
    noticeRequired: "90 days",
    uniqueRules: [
      "Must use Ontario Standard Lease (OSL) for most residential tenancies",
      "Rent control applies to units first occupied before Nov 15, 2018",
      "Landlord and Tenant Board (LTB) governs disputes",
      "N-forms required for all notices",
    ],
    templateAvailable: true,
  },
  {
    id: "bc",
    name: "British Columbia",
    abbr: "BC",
    rentIncreaseGuideline2026: "3.5%",
    noticeRequired: "90 days (3 full months)",
    uniqueRules: [
      "Fixed-term leases must include continuation or ending clause",
      "Security deposit limited to 50% of first month's rent",
      "RTB (Residential Tenancy Branch) handles disputes",
      "Pet deposits allowed (max 50% of one month's rent)",
    ],
    templateAvailable: true,
  },
  {
    id: "ab",
    name: "Alberta",
    abbr: "AB",
    rentIncreaseGuideline2026: "No limit",
    noticeRequired: "90 days (3 months)",
    uniqueRules: [
      "No rent control - landlords can increase by any amount",
      "Security deposits limited to 1 month's rent",
      "RTDRS (Residential Tenancy Dispute Resolution Service)",
      "Move-in/move-out inspections are mandatory",
    ],
    templateAvailable: true,
  },
  {
    id: "qc",
    name: "Quebec",
    abbr: "QC",
    rentIncreaseGuideline2026: "2.3%",
    noticeRequired: "90 days (3 months before lease ends)",
    uniqueRules: [
      "Lease must be on Tribunal administratif du logement (TAL) form",
      "Tenant can contest rent increases at TAL",
      "Leases automatically renew unless notice given",
      "French language required for all official documents",
    ],
    templateAvailable: true,
  },
  {
    id: "mb",
    name: "Manitoba",
    abbr: "MB",
    rentIncreaseGuideline2026: "3.0%",
    noticeRequired: "90 days",
    uniqueRules: [
      "Rent increases regulated by guidelines",
      "Security deposits limited to 50% of first month's rent",
      "Residential Tenancies Branch (RTB) oversight",
    ],
    templateAvailable: true,
  },
  {
    id: "sk",
    name: "Saskatchewan",
    abbr: "SK",
    rentIncreaseGuideline2026: "No limit",
    noticeRequired: "12 months from last increase",
    uniqueRules: [
      "No rent control",
      "Pet deposits allowed",
      "Office of Residential Tenancies",
    ],
    templateAvailable: true,
  },
  {
    id: "ns",
    name: "Nova Scotia",
    abbr: "NS",
    rentIncreaseGuideline2026: "2.0%",
    noticeRequired: "4 months",
    uniqueRules: [
      "Temporary rent control in effect",
      "Fixed-term leases convert to month-to-month",
    ],
    templateAvailable: true,
  },
  {
    id: "nb",
    name: "New Brunswick",
    abbr: "NB",
    rentIncreaseGuideline2026: "3.5%",
    noticeRequired: "3 months",
    uniqueRules: [
      "Rent increases capped at 3.5% (2026)",
      "Security deposits limited to 1 month's rent",
    ],
    templateAvailable: true,
  },
  {
    id: "pe",
    name: "Prince Edward Island",
    abbr: "PE",
    rentIncreaseGuideline2026: "3.0%",
    noticeRequired: "3 months",
    uniqueRules: [
      "Temporary rent control measures",
      "Island Regulatory and Appeals Commission (IRAC)",
    ],
    templateAvailable: true,
  },
  {
    id: "nl",
    name: "Newfoundland & Labrador",
    abbr: "NL",
    rentIncreaseGuideline2026: "No limit",
    noticeRequired: "3 months",
    uniqueRules: [
      "No rent control",
      "Residential Tenancies Act 2018",
    ],
    templateAvailable: true,
  },
];

export function ProvinceLeaseTemplates() {
  const [selectedProvince, setSelectedProvince] = useState<Province>(provinces[0]);
  const [showPreview, setShowPreview] = useState(false);

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
            <MapPin className="size-8 text-[#0A0A0A]" />
            <h1 className="text-[48px] font-semibold text-[#0A0A0A] leading-tight tracking-tight">
              Province Lease Templates
            </h1>
          </div>
          <p className="text-[14px] text-[#9CA3AF] font-normal mb-6">
            Legally compliant lease templates for all 10 Canadian provinces
          </p>

          {/* Canadian Compliance Banner */}
          <div className="bg-gradient-to-br from-[#EF4444]/10 to-[#DC2626]/10 border border-[#EF4444]/20 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <Shield className="size-5 text-[#EF4444] flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-[13px] font-medium text-[#0A0A0A] mb-1">
                  🇨🇦 Canadian-First Lease Templates
                </p>
                <p className="text-[12px] text-[#6B7280]">
                  Each province has unique landlord-tenant laws. Our templates are updated with
                  2026 rent increase guidelines and provincial regulations. Always compliant.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Province Selector Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-12">
          {provinces.map((prov, idx) => (
            <motion.button
              key={prov.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.03 }}
              onClick={() => setSelectedProvince(prov)}
              className={`p-4 rounded-xl border-2 transition-all text-left ${
                selectedProvince.id === prov.id
                  ? "border-[#0A0A0A] bg-[#0A0A0A] text-white shadow-lg"
                  : "border-black/[0.08] bg-white text-[#0A0A0A] hover:border-[#0A0A0A]/30"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[16px] font-bold">{prov.abbr}</span>
                {prov.templateAvailable && (
                  <CheckCircle2
                    className={`size-4 ${
                      selectedProvince.id === prov.id ? "text-white" : "text-[#22C55E]"
                    }`}
                  />
                )}
              </div>
              <p className="text-[11px] opacity-70">{prov.name}</p>
            </motion.button>
          ))}
        </div>

        {/* Selected Province Details */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Province Info */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white border border-black/[0.08] rounded-xl p-8">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-[32px] font-semibold text-[#0A0A0A] mb-2">
                    {selectedProvince.name}
                  </h2>
                  <p className="text-[14px] text-[#6B7280]">
                    Residential Tenancy Lease Agreement
                  </p>
                </div>
                <div className="px-4 py-2 bg-[#22C55E]/10 text-[#22C55E] text-[12px] font-medium rounded-full flex items-center gap-2">
                  <CheckCircle2 className="size-4" />
                  2026 Compliant
                </div>
              </div>

              {/* Key Statistics */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="p-4 bg-[#F5F5F5] rounded-lg">
                  <p className="text-[11px] text-[#9CA3AF] uppercase tracking-wider mb-1">
                    2026 Rent Increase Guideline
                  </p>
                  <p className="text-[24px] font-semibold text-[#6366F1]">
                    {selectedProvince.rentIncreaseGuideline2026}
                  </p>
                </div>

                <div className="p-4 bg-[#F5F5F5] rounded-lg">
                  <p className="text-[11px] text-[#9CA3AF] uppercase tracking-wider mb-1">
                    Notice Required
                  </p>
                  <p className="text-[24px] font-semibold text-[#0A0A0A]">
                    {selectedProvince.noticeRequired}
                  </p>
                </div>
              </div>

              {/* Unique Provincial Rules */}
              <div>
                <h3 className="text-[16px] font-semibold text-[#0A0A0A] mb-4">
                  Provincial Requirements
                </h3>
                <div className="space-y-3">
                  {selectedProvince.uniqueRules.map((rule, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 p-3 bg-[#F5F5F5] rounded-lg"
                    >
                      <Info className="size-5 text-[#6366F1] flex-shrink-0 mt-0.5" />
                      <p className="text-[13px] text-[#0A0A0A]">{rule}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Template Features */}
            <div className="bg-gradient-to-br from-[#6366F1]/5 to-[#8B5CF6]/5 border border-[#6366F1]/20 rounded-xl p-8">
              <h3 className="text-[18px] font-semibold text-[#0A0A0A] mb-4">
                What's Included in This Template
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  "Province-specific clauses",
                  "Rent increase guidelines",
                  "Security deposit limits",
                  "Notice period requirements",
                  "Maintenance responsibilities",
                  "Pet policies (where allowed)",
                  "Utilities & services",
                  "Landlord entry rules",
                  "Subletting provisions",
                  "Lease termination terms",
                  "Dispute resolution process",
                  "Provincial tribunal info",
                ].map((feature, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 text-[13px] text-[#0A0A0A]"
                  >
                    <CheckCircle2 className="size-4 text-[#22C55E]" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Actions */}
          <div className="space-y-4">
            <div className="bg-white border border-black/[0.08] rounded-xl p-6 sticky top-8">
              <h3 className="text-[16px] font-semibold text-[#0A0A0A] mb-4">
                Generate Lease
              </h3>

              <div className="space-y-3 mb-6">
                <div>
                  <label className="block text-[12px] font-medium text-[#6B7280] mb-2">
                    Tenant Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-black/[0.08] rounded-lg text-[13px] focus:outline-none focus:ring-2 focus:ring-[#6366F1]"
                    placeholder="Sarah Kim"
                  />
                </div>

                <div>
                  <label className="block text-[12px] font-medium text-[#6B7280] mb-2">
                    Property Address
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-black/[0.08] rounded-lg text-[13px] focus:outline-none focus:ring-2 focus:ring-[#6366F1]"
                    placeholder="123 King St, Toronto"
                  />
                </div>

                <div>
                  <label className="block text-[12px] font-medium text-[#6B7280] mb-2">
                    Monthly Rent (CAD)
                  </label>
                  <input
                    type="number"
                    className="w-full px-3 py-2 border border-black/[0.08] rounded-lg text-[13px] focus:outline-none focus:ring-2 focus:ring-[#6366F1]"
                    placeholder="2300"
                  />
                </div>

                <div>
                  <label className="block text-[12px] font-medium text-[#6B7280] mb-2">
                    Lease Start Date
                  </label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-black/[0.08] rounded-lg text-[13px] focus:outline-none focus:ring-2 focus:ring-[#6366F1]"
                  />
                </div>

                <div>
                  <label className="block text-[12px] font-medium text-[#6B7280] mb-2">
                    Lease Term
                  </label>
                  <select className="w-full px-3 py-2 border border-black/[0.08] rounded-lg text-[13px] focus:outline-none focus:ring-2 focus:ring-[#6366F1]">
                    <option value="12">12 months (1 year)</option>
                    <option value="24">24 months (2 years)</option>
                    <option value="month-to-month">Month-to-month</option>
                  </select>
                </div>
              </div>

              <div className="space-y-3">
                <button
                  onClick={() => setShowPreview(true)}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 border border-black/[0.08] text-[#0A0A0A] text-[13px] font-medium rounded-lg hover:bg-[#F5F5F5] transition-colors"
                >
                  <Eye className="size-4" />
                  Preview Lease
                </button>

                <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-[#0A0A0A] text-white text-[13px] font-medium rounded-lg hover:bg-[#1C1C1C] transition-colors">
                  <Download className="size-4" />
                  Download PDF
                </button>

                <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-[#6366F1] text-white text-[13px] font-medium rounded-lg hover:bg-[#5558E3] transition-colors">
                  <Edit className="size-4" />
                  Customize & Sign
                </button>
              </div>

              <div className="mt-6 pt-6 border-t border-black/[0.04]">
                <p className="text-[11px] text-[#9CA3AF] text-center">
                  AI-verified for {selectedProvince.name} compliance
                </p>
              </div>
            </div>

            {/* Provincial Resources */}
            <div className="bg-white border border-black/[0.08] rounded-xl p-6">
              <h3 className="text-[14px] font-semibold text-[#0A0A0A] mb-4">
                Official Resources
              </h3>

              <div className="space-y-2">
                <a
                  href="#"
                  className="flex items-center justify-between p-3 bg-[#F5F5F5] rounded-lg hover:bg-[#E5E5E5] transition-colors group"
                >
                  <div className="flex items-center gap-2">
                    <FileText className="size-4 text-[#6B7280]" />
                    <span className="text-[12px] text-[#0A0A0A]">Official Forms</span>
                  </div>
                  <ExternalLink className="size-4 text-[#9CA3AF] group-hover:text-[#0A0A0A]" />
                </a>

                <a
                  href="#"
                  className="flex items-center justify-between p-3 bg-[#F5F5F5] rounded-lg hover:bg-[#E5E5E5] transition-colors group"
                >
                  <div className="flex items-center gap-2">
                    <Shield className="size-4 text-[#6B7280]" />
                    <span className="text-[12px] text-[#0A0A0A]">Tenancy Act</span>
                  </div>
                  <ExternalLink className="size-4 text-[#9CA3AF] group-hover:text-[#0A0A0A]" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Preview Modal */}
        {showPreview && (
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
                      {selectedProvince.name} Residential Lease
                    </h2>
                    <p className="text-[14px] text-[#6B7280]">Preview - Draft</p>
                  </div>
                  <button
                    onClick={() => setShowPreview(false)}
                    className="text-[#6B7280] hover:text-[#0A0A0A]"
                  >
                    ✕
                  </button>
                </div>

                <div className="bg-[#F5F5F5] rounded-xl p-8 mb-6 max-h-96 overflow-y-auto">
                  <h3 className="text-center text-[18px] font-bold text-[#0A0A0A] mb-6">
                    RESIDENTIAL TENANCY AGREEMENT
                  </h3>

                  <div className="space-y-4 text-[13px] text-[#0A0A0A]">
                    <section>
                      <h4 className="font-semibold mb-2">1. PARTIES</h4>
                      <p>
                        <strong>Landlord:</strong> Justin Mafie (KAYA Properties Inc.)
                      </p>
                      <p>
                        <strong>Tenant:</strong> Sarah Kim
                      </p>
                    </section>

                    <section>
                      <h4 className="font-semibold mb-2">2. RENTAL UNIT</h4>
                      <p>123 King Street, Toronto, {selectedProvince.abbr}</p>
                      <p>Unit: 4A • Bedrooms: 2 • Bathrooms: 2</p>
                    </section>

                    <section>
                      <h4 className="font-semibold mb-2">3. RENT</h4>
                      <p>Monthly rent: $2,300.00 CAD</p>
                      <p>Due date: 1st of each month</p>
                      <p>Payment method: Interac e-Transfer to rent@kaya.ca</p>
                    </section>

                    <section>
                      <h4 className="font-semibold mb-2">
                        4. RENT INCREASES ({selectedProvince.abbr})
                      </h4>
                      <p>
                        Rent may be increased once every 12 months with{" "}
                        {selectedProvince.noticeRequired} written notice.
                      </p>
                      <p>
                        2026 guideline: {selectedProvince.rentIncreaseGuideline2026}
                      </p>
                    </section>

                    <section>
                      <h4 className="font-semibold mb-2">5. PROVINCIAL REQUIREMENTS</h4>
                      <ul className="list-disc list-inside space-y-1">
                        {selectedProvince.uniqueRules.map((rule, idx) => (
                          <li key={idx}>{rule}</li>
                        ))}
                      </ul>
                    </section>

                    <p className="text-[11px] text-[#9CA3AF] mt-8 pt-4 border-t">
                      This is a preview. The final lease will include all province-specific
                      clauses and legal requirements for {selectedProvince.name}.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setShowPreview(false)}
                    className="flex-1 px-6 py-3 border border-black/[0.08] text-[#6B7280] text-[14px] font-medium rounded-lg hover:bg-[#F5F5F5] transition-colors"
                  >
                    Close
                  </button>
                  <button className="flex-1 px-6 py-3 bg-[#0A0A0A] text-white text-[14px] font-medium rounded-lg hover:bg-[#1C1C1C] transition-colors">
                    Download Full Lease
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

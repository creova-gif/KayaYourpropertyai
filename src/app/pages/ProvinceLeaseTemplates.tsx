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
            <MapPin className="size-8 text-[#0A7A52]" />
            <h1 className="text-[48px] font-normal text-[#0E0F0C] leading-tight tracking-tight" style={{ fontFamily: "'Instrument Serif', Georgia, serif", letterSpacing: '-1px' }}>
              Province Lease Templates
            </h1>
          </div>
          <p className="text-[14px] text-[#767570] font-normal mb-6">
            Legally compliant lease templates for all 10 Canadian provinces
          </p>

          {/* Canadian Compliance Banner */}
          <div className="bg-gradient-to-br from-[#EF4444]/10 to-[#DC2626]/10 border border-[#EF4444]/20 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <Shield className="size-5 text-[#EF4444] flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-[13px] font-medium text-[#0E0F0C] mb-1">
                  🇨🇦 Canadian-First Lease Templates
                </p>
                <p className="text-[12px] text-[#767570]">
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
                  ? "border-[#0A7A52] bg-[#0A7A52] text-white shadow-lg"
                  : "border-[rgba(0,0,0,0.07)] bg-white text-[#0E0F0C] hover:border-[#0A7A52]/30"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[16px] font-bold">{prov.abbr}</span>
                {prov.templateAvailable && (
                  <CheckCircle2
                    className={`size-4 ${
                      selectedProvince.id === prov.id ? "text-white" : "text-[#0A7A52]"
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
            <div className="bg-white border border-[rgba(0,0,0,0.07)] rounded-xl p-8">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-[36px] font-normal text-[#0E0F0C] mb-2" style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}>
                    {selectedProvince.name}
                  </h2>
                  <p className="text-[14px] text-[#767570]">
                    Residential Tenancy Lease Agreement
                  </p>
                </div>
                <div className="px-4 py-2 bg-[#E5F4EE] text-[#0A7A52] text-[11px] font-semibold uppercase tracking-wider rounded-full flex items-center gap-2 border border-[#0A7A52]/20">
                  <CheckCircle2 className="size-4" />
                  2026 Compliant
                </div>
              </div>

              {/* Key Statistics */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="p-4 bg-[#F8F7F4] rounded-lg border border-[rgba(0,0,0,0.04)]">
                  <p className="text-[11px] text-[#767570] uppercase tracking-wider mb-1">
                    2026 Rent Increase Guideline
                  </p>
                  <p className="text-[28px] font-normal text-[#0A7A52]" style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}>
                    {selectedProvince.rentIncreaseGuideline2026}
                  </p>
                </div>

                <div className="p-4 bg-[#F8F7F4] rounded-lg border border-[rgba(0,0,0,0.04)]">
                  <p className="text-[11px] text-[#767570] uppercase tracking-wider mb-1">
                    Notice Required
                  </p>
                  <p className="text-[28px] font-normal text-[#0E0F0C]" style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}>
                    {selectedProvince.noticeRequired}
                  </p>
                </div>
              </div>

              {/* Unique Provincial Rules */}
              <div>
                <h3 className="text-[18px] font-normal text-[#0E0F0C] mb-4" style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}>
                  Provincial Requirements
                </h3>
                <div className="space-y-3">
                  {selectedProvince.uniqueRules.map((rule, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 p-3 bg-[#F8F7F4] rounded-lg border border-[rgba(0,0,0,0.04)]"
                    >
                      <Info className="size-5 text-[#0A7A52] flex-shrink-0 mt-0.5" />
                      <p className="text-[13px] text-[#0E0F0C]">{rule}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Template Features */}
            <div className="bg-gradient-to-br from-[#0A7A52]/5 to-[#0A7A52]/10 border border-[#0A7A52]/20 rounded-xl p-8">
              <h3 className="text-[20px] font-normal text-[#0E0F0C] mb-4" style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}>
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
                    className="flex items-center gap-2 text-[13px] text-[#0E0F0C]"
                  >
                    <CheckCircle2 className="size-4 text-[#0A7A52]" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Actions */}
          <div className="space-y-4">
            <div className="bg-white border border-[rgba(0,0,0,0.07)] rounded-xl p-6 sticky top-8">
              <h3 className="text-[18px] font-normal text-[#0E0F0C] mb-4" style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}>
                Generate Lease
              </h3>

              <div className="space-y-3 mb-6">
                <div>
                  <label className="block text-[12px] font-semibold text-[#767570] mb-2 uppercase tracking-wider">
                    Tenant Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-[rgba(0,0,0,0.07)] rounded-lg text-[13px] focus:outline-none focus:ring-2 focus:ring-[#0A7A52]/20 text-[#0E0F0C] bg-white"
                    placeholder="Sarah Kim"
                  />
                </div>

                <div>
                  <label className="block text-[12px] font-semibold text-[#767570] mb-2 uppercase tracking-wider">
                    Property Address
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-[rgba(0,0,0,0.07)] rounded-lg text-[13px] focus:outline-none focus:ring-2 focus:ring-[#0A7A52]/20 text-[#0E0F0C] bg-white"
                    placeholder="123 King St, Toronto"
                  />
                </div>

                <div>
                  <label className="block text-[12px] font-semibold text-[#767570] mb-2 uppercase tracking-wider">
                    Monthly Rent (CAD)
                  </label>
                  <input
                    type="number"
                    className="w-full px-3 py-2 border border-[rgba(0,0,0,0.07)] rounded-lg text-[13px] focus:outline-none focus:ring-2 focus:ring-[#0A7A52]/20 text-[#0E0F0C] bg-white"
                    placeholder="2300"
                  />
                </div>

                <div>
                  <label className="block text-[12px] font-semibold text-[#767570] mb-2 uppercase tracking-wider">
                    Lease Start Date
                  </label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-[rgba(0,0,0,0.07)] rounded-lg text-[13px] focus:outline-none focus:ring-2 focus:ring-[#0A7A52]/20 text-[#0E0F0C] bg-white"
                  />
                </div>

                <div>
                  <label className="block text-[12px] font-semibold text-[#767570] mb-2 uppercase tracking-wider">
                    Lease Term
                  </label>
                  <select className="w-full px-3 py-2 border border-[rgba(0,0,0,0.07)] rounded-lg text-[13px] focus:outline-none focus:ring-2 focus:ring-[#0A7A52]/20 text-[#0E0F0C] bg-white">
                    <option value="12">12 months (1 year)</option>
                    <option value="24">24 months (2 years)</option>
                    <option value="month-to-month">Month-to-month</option>
                  </select>
                </div>
              </div>

              <div className="space-y-3">
                <button
                  onClick={() => setShowPreview(true)}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 border border-[rgba(0,0,0,0.07)] text-[#0E0F0C] text-[13px] font-medium rounded-lg hover:bg-[#F8F7F4] transition-colors"
                >
                  <Eye className="size-4" />
                  Preview Lease
                </button>

                <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-[#0E0F0C] text-white text-[13px] font-medium rounded-lg hover:bg-[#0E0F0C]/90 transition-colors">
                  <Download className="size-4" />
                  Download PDF
                </button>

                <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-[#0A7A52] text-white text-[13px] font-medium rounded-lg hover:bg-[#0A7A52]/90 transition-colors">
                  <Edit className="size-4" />
                  Customize & Sign
                </button>
              </div>

              <div className="mt-6 pt-6 border-t border-[rgba(0,0,0,0.04)]">
                <p className="text-[11px] text-[#767570] text-center">
                  AI-verified for {selectedProvince.name} compliance
                </p>
              </div>
            </div>

            {/* Provincial Resources */}
            <div className="bg-white border border-[rgba(0,0,0,0.07)] rounded-xl p-6">
              <h3 className="text-[16px] font-normal text-[#0E0F0C] mb-4" style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}>
                Official Resources
              </h3>

              <div className="space-y-2">
                <a
                  href="#"
                  className="flex items-center justify-between p-3 bg-[#F8F7F4] rounded-lg hover:bg-[#F8F7F4]/70 transition-colors group border border-[rgba(0,0,0,0.04)]"
                >
                  <div className="flex items-center gap-2">
                    <FileText className="size-4 text-[#767570]" />
                    <span className="text-[12px] text-[#0E0F0C]">Official Forms</span>
                  </div>
                  <ExternalLink className="size-4 text-[#767570] group-hover:text-[#0E0F0C]" />
                </a>

                <a
                  href="#"
                  className="flex items-center justify-between p-3 bg-[#F8F7F4] rounded-lg hover:bg-[#F8F7F4]/70 transition-colors group border border-[rgba(0,0,0,0.04)]"
                >
                  <div className="flex items-center gap-2">
                    <Shield className="size-4 text-[#767570]" />
                    <span className="text-[12px] text-[#0E0F0C]">Tenancy Act</span>
                  </div>
                  <ExternalLink className="size-4 text-[#767570] group-hover:text-[#0E0F0C]" />
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
                    <h2 className="text-[28px] font-normal text-[#0E0F0C] mb-2" style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}>
                      {selectedProvince.name} Residential Lease
                    </h2>
                    <p className="text-[14px] text-[#767570]">Preview - Draft</p>
                  </div>
                  <button
                    onClick={() => setShowPreview(false)}
                    className="text-[#767570] hover:text-[#0E0F0C] text-[24px] leading-none"
                  >
                    ✕
                  </button>
                </div>

                <div className="bg-[#F8F7F4] rounded-xl p-8 mb-6 max-h-96 overflow-y-auto border border-[rgba(0,0,0,0.04)]">
                  <h3 className="text-center text-[20px] font-normal text-[#0E0F0C] mb-6" style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}>
                    RESIDENTIAL TENANCY AGREEMENT
                  </h3>

                  <div className="space-y-4 text-[13px] text-[#0E0F0C]">
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

                    <p className="text-[11px] text-[#767570] mt-8 pt-4 border-t border-[rgba(0,0,0,0.07)]">
                      This is a preview. The final lease will include all province-specific
                      clauses and legal requirements for {selectedProvince.name}.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setShowPreview(false)}
                    className="flex-1 px-6 py-3 border border-[rgba(0,0,0,0.07)] text-[#767570] text-[14px] font-medium rounded-lg hover:bg-[#F8F7F4] transition-colors"
                  >
                    Close
                  </button>
                  <button className="flex-1 px-6 py-3 bg-[#0A7A52] text-white text-[14px] font-medium rounded-lg hover:bg-[#0A7A52]/90 transition-colors">
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
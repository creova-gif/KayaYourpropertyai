import { useState } from "react";
import { motion } from "motion/react";
import {
  FileText,
  Download,
  Send,
  CheckCircle2,
  AlertCircle,
  Calendar,
  Home,
  DollarSign,
  Users,
  Clock,
  FileCheck,
  Info,
  ExternalLink,
  Scale,
} from "lucide-react";
import { toast } from "sonner";

interface LTBForm {
  id: string;
  formNumber: string;
  title: string;
  category: "eviction" | "rent-increase" | "maintenance" | "termination" | "other";
  description: string;
  requiredFields: string[];
  estimatedTime: string;
  legalDeadline?: string;
  commonUse: string;
}

const ltbForms: LTBForm[] = [
  {
    id: "n4",
    formNumber: "N4",
    title: "Notice to End a Tenancy Early for Non-payment of Rent",
    category: "eviction",
    description: "Use this form when a tenant has not paid rent. This is the first step in the eviction process for non-payment.",
    requiredFields: ["Tenant name", "Property address", "Amount owed", "Payment deadline"],
    estimatedTime: "5 minutes",
    legalDeadline: "Must give 14 days notice",
    commonUse: "Most common eviction notice in Ontario - used when tenant fails to pay rent",
  },
  {
    id: "n12",
    formNumber: "N12",
    title: "Notice to End Tenancy (Landlord or Purchaser Requires Unit)",
    category: "termination",
    description: "Use when you or a purchaser need the unit for personal use. Must provide compensation equal to one month's rent.",
    requiredFields: ["Tenant name", "Property address", "Termination date", "Reason for use", "Compensation details"],
    estimatedTime: "8 minutes",
    legalDeadline: "Must give 60 days notice",
    commonUse: "When landlord or family member needs to move into the unit",
  },
  {
    id: "n5",
    formNumber: "N5",
    title: "Notice to End Tenancy Early (Tenant Interfering with Others)",
    category: "eviction",
    description: "For tenants who damage property, disturb neighbors, or allow too many people to live in the unit.",
    requiredFields: ["Tenant name", "Property address", "Description of issue", "Deadline to fix"],
    estimatedTime: "10 minutes",
    legalDeadline: "7 or 20 days depending on severity",
    commonUse: "Noise complaints, property damage, overcrowding, illegal activity",
  },
  {
    id: "n8",
    formNumber: "N8",
    title: "Notice to End Tenancy (Tenant Has Not Met Obligations)",
    category: "eviction",
    description: "When tenant consistently pays late, has unauthorized occupants, or breaches lease terms.",
    requiredFields: ["Tenant name", "Property address", "Obligations not met", "Termination date"],
    estimatedTime: "7 minutes",
    legalDeadline: "Must give 60 days notice",
    commonUse: "Repeated late payments, lease violations, unauthorized pets",
  },
  {
    id: "n1",
    formNumber: "N1",
    title: "Notice of Rent Increase",
    category: "rent-increase",
    description: "Notify tenant of annual rent increase. Must follow Ontario's rent increase guideline (2.5% for 2026).",
    requiredFields: ["Tenant name", "Current rent", "New rent amount", "Effective date"],
    estimatedTime: "4 minutes",
    legalDeadline: "Must give 90 days notice",
    commonUse: "Annual rent increases - limited to provincial guideline unless approved by LTB",
  },
  {
    id: "n2",
    formNumber: "N2",
    title: "Notice of Rent Increase (Above Guideline)",
    category: "rent-increase",
    description: "Request rent increase above the guideline due to capital improvements or increased utilities.",
    requiredFields: ["Tenant name", "Current rent", "Requested increase", "Justification", "Supporting documents"],
    estimatedTime: "15 minutes",
    legalDeadline: "Must apply to LTB first",
    commonUse: "Major renovations, new amenities, significant utility cost increases",
  },
  {
    id: "n13",
    formNumber: "N13",
    title: "Notice to End Tenancy (Demolition or Major Renovation)",
    category: "termination",
    description: "When you need to vacate the unit for demolition, conversion, or extensive renovations requiring permits.",
    requiredFields: ["Tenant name", "Property address", "Reason", "Building permits", "Compensation"],
    estimatedTime: "12 minutes",
    legalDeadline: "Must give 120 days notice",
    commonUse: "Condo conversions, major structural work, building demolition",
  },
  {
    id: "n7",
    formNumber: "N7",
    title: "Notice to End Tenancy (Cause)",
    category: "eviction",
    description: "For serious issues: illegal activity, damage, impaired safety, or causing serious problems.",
    requiredFields: ["Tenant name", "Property address", "Serious issue details", "Termination date"],
    estimatedTime: "10 minutes",
    legalDeadline: "10 or 30 days depending on severity",
    commonUse: "Drug dealing, assault, serious property damage, safety violations",
  },
];

export function LTBForms() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedForm, setSelectedForm] = useState<LTBForm | null>(null);
  const [showGenerateModal, setShowGenerateModal] = useState(false);

  const categories = [
    { id: "all", label: "All Forms", icon: FileText },
    { id: "eviction", label: "Eviction Notices", icon: AlertCircle },
    { id: "rent-increase", label: "Rent Increases", icon: DollarSign },
    { id: "termination", label: "Termination", icon: Home },
    { id: "maintenance", label: "Maintenance", icon: Clock },
  ];

  const filteredForms = selectedCategory === "all"
    ? ltbForms
    : ltbForms.filter((form) => form.category === selectedCategory);

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-8 py-12" style={{ background: '#F8F7F4', minHeight: '100vh', fontFamily: "'DM Sans', system-ui, sans-serif" }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <p className="text-[10px] font-semibold text-[#767570] uppercase tracking-wider mb-2">Legal Compliance</p>
          <div className="flex items-center gap-4 mb-3">
            <Scale className="size-10 text-[#0A7A52]" strokeWidth={2} />
            <h1 className="text-[52px] font-normal text-[#0E0F0C] leading-tight tracking-tight" style={{ fontFamily: "'Instrument Serif', Georgia, serif", letterSpacing: '-1.5px' }}>
              LTB Forms
            </h1>
          </div>
          <p className="text-[14px] text-[#767570] font-normal">
            Landlord and Tenant Board forms for Ontario landlords
          </p>
        </motion.div>

        {/* Category Tabs */}
        <div className="flex gap-3 mb-8 overflow-x-auto pb-2">
          {categories.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <motion.button
                key={cat.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-2 px-5 py-3 rounded-xl border-2 transition-all whitespace-nowrap ${
                  selectedCategory === cat.id
                    ? "border-[#0A0A0A] bg-[#0A0A0A] text-white"
                    : "border-black/[0.08] bg-white text-[#6B7280] hover:border-[#0A0A0A]/30"
                }`}
              >
                <Icon className="size-4" />
                <span className="text-[13px] font-medium">{cat.label}</span>
              </motion.button>
            );
          })}
        </div>

        {/* Forms Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredForms.map((form, idx) => (
            <motion.div
              key={form.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="bg-white border border-black/[0.08] rounded-xl p-6 hover:shadow-lg transition-all group"
            >
              {/* Form Header */}
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="px-3 py-1.5 bg-[#0A0A0A] text-white text-[13px] font-bold rounded-lg">
                      {form.formNumber}
                    </div>
                    <span className={`px-3 py-1 rounded-full text-[11px] font-medium ${
                      form.category === "eviction" ? "bg-[#EF4444]/10 text-[#EF4444]" :
                      form.category === "rent-increase" ? "bg-[#3B82F6]/10 text-[#3B82F6]" :
                      form.category === "termination" ? "bg-[#F59E0B]/10 text-[#F59E0B]" :
                      "bg-[#6B7280]/10 text-[#6B7280]"
                    }`}>
                      {form.category.replace("-", " ")}
                    </span>
                  </div>
                  <h3 className="text-[16px] font-semibold text-[#0A0A0A] mb-2 leading-tight">
                    {form.title}
                  </h3>
                </div>
              </div>

              <p className="text-[13px] text-[#6B7280] mb-4 leading-relaxed">
                {form.description}
              </p>

              {/* Common Use */}
              <div className="bg-[#F5F5F5] rounded-lg p-3 mb-4">
                <p className="text-[11px] text-[#9CA3AF] uppercase tracking-wider mb-1">
                  Common Use
                </p>
                <p className="text-[12px] text-[#0A0A0A]">{form.commonUse}</p>
              </div>

              {/* Meta Info */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="flex items-center gap-2 text-[12px] text-[#6B7280]">
                  <Clock className="size-4" />
                  <span>{form.estimatedTime}</span>
                </div>
                {form.legalDeadline && (
                  <div className="flex items-center gap-2 text-[12px] text-[#EF4444]">
                    <Calendar className="size-4" />
                    <span>{form.legalDeadline}</span>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setSelectedForm(form);
                    setShowGenerateModal(true);
                  }}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-[#0A0A0A] text-white text-[13px] font-medium rounded-lg hover:bg-[#1C1C1C] transition-colors"
                >
                  <FileCheck className="size-4" />
                  Generate Form
                </button>
                <button onClick={() => toast.info("Form details and filing instructions")} className="px-4 py-2.5 border border-black/[0.08] text-[#6B7280] text-[13px] font-medium rounded-lg hover:bg-[#F5F5F5] transition-colors">
                  <Info className="size-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* LTB Resources */}
        <div className="mt-12 bg-gradient-to-br from-[#6366F1]/5 to-[#8B5CF6]/5 border border-[#6366F1]/20 rounded-xl p-8">
          <h3 className="text-[20px] font-semibold text-[#0A0A0A] mb-4">
            LTB Resources & Guidelines
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <a
              href="https://tribunalsontario.ca/ltb/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-4 bg-white rounded-lg border border-black/[0.04] hover:shadow-lg transition-all group"
            >
              <div>
                <p className="text-[14px] font-semibold text-[#0A0A0A] mb-1">
                  LTB Official Website
                </p>
                <p className="text-[12px] text-[#6B7280]">
                  tribunalsontario.ca/ltb
                </p>
              </div>
              <ExternalLink className="size-5 text-[#6B7280] group-hover:text-[#0A0A0A]" />
            </a>

            <div className="p-4 bg-white rounded-lg border border-black/[0.04]">
              <p className="text-[14px] font-semibold text-[#0A0A0A] mb-1">
                2026 Rent Increase Guideline
              </p>
              <p className="text-[24px] font-bold text-[#6366F1]">2.5%</p>
            </div>

            <div className="p-4 bg-white rounded-lg border border-black/[0.04]">
              <p className="text-[14px] font-semibold text-[#0A0A0A] mb-1">
                AI Forms Generated
              </p>
              <p className="text-[24px] font-bold text-[#22C55E]">1,247</p>
            </div>
          </div>
        </div>

        {/* Generate Modal */}
        {showGenerateModal && selectedForm && (
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
                      Generate {selectedForm.formNumber} Form
                    </h2>
                    <p className="text-[14px] text-[#6B7280]">
                      {selectedForm.title}
                    </p>
                  </div>
                  <button
                    onClick={() => setShowGenerateModal(false)}
                    className="text-[#6B7280] hover:text-[#0A0A0A]"
                  >
                    ✕
                  </button>
                </div>

                <div className="space-y-4">
                  {selectedForm.requiredFields.map((field, idx) => (
                    <div key={idx}>
                      <label className="block text-[13px] font-medium text-[#0A0A0A] mb-2">
                        {field}
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 border border-black/[0.08] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6366F1] focus:border-transparent"
                        placeholder={`Enter ${field.toLowerCase()}`}
                      />
                    </div>
                  ))}
                </div>

                {selectedForm.legalDeadline && (
                  <div className="mt-6 p-4 bg-[#EF4444]/10 border border-[#EF4444]/20 rounded-xl">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="size-5 text-[#EF4444] flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-[13px] font-medium text-[#0A0A0A] mb-1">
                          Legal Deadline: {selectedForm.legalDeadline}
                        </p>
                        <p className="text-[12px] text-[#6B7280]">
                          Ensure you follow RTA requirements for proper notice periods.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="mt-8 flex gap-3">
                  <button
                    onClick={() => setShowGenerateModal(false)}
                    className="flex-1 px-6 py-3 border border-black/[0.08] text-[#6B7280] text-[14px] font-medium rounded-lg hover:bg-[#F5F5F5] transition-colors"
                  >
                    Cancel
                  </button>
                  <button onClick={() => { toast.success("LTB form generated as PDF"); }} className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-[#0A0A0A] text-white text-[14px] font-medium rounded-lg hover:bg-[#1C1C1C] transition-colors">
                    <Download className="size-4" />
                    Generate PDF
                  </button>
                  <button onClick={() => toast.success("LTB form emailed to tenant")} className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-[#0A7A52] text-white text-[14px] font-medium rounded-lg hover:bg-[#085D3D] transition-colors">
                    <Send className="size-4" />
                    Email to Tenant
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
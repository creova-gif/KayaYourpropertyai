import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import {
  FileText,
  CheckCircle2,
  Download,
  Eye,
  Edit3,
  Calendar,
  DollarSign,
  MapPin,
  User,
  Shield,
  AlertCircle,
  Sparkles,
} from "lucide-react";

export function TenantLeaseSigning() {
  const navigate = useNavigate();
  const { applicationId } = useParams();
  const [currentSection, setCurrentSection] = useState(0);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [signature, setSignature] = useState("");
  const [initials, setInitials] = useState("");
  const [signing, setSigning] = useState(false);
  const [signed, setSigned] = useState(false);

  // Mock lease data
  const lease = {
    propertyTitle: "Modern Downtown 2BR Condo",
    propertyAddress: "123 King Street West, Toronto, ON M5H 2N2",
    monthlyRent: 2300,
    securityDeposit: 2300,
    leaseStart: "April 1, 2026",
    leaseEnd: "March 31, 2027",
    leaseTerm: "12 months",
    landlordName: "Premium Properties Inc.",
    tenantName: "John Doe",
    generatedDate: "March 14, 2026",
  };

  const leaseSections = [
    {
      title: "Property Details & Parties",
      content: [
        `This Residential Tenancy Agreement is made on ${lease.generatedDate}.`,
        `LANDLORD: ${lease.landlordName}`,
        `TENANT: ${lease.tenantName}`,
        `PROPERTY: ${lease.propertyAddress}`,
        `The Landlord agrees to rent the property to the Tenant, and the Tenant agrees to rent the property from the Landlord.`,
      ],
    },
    {
      title: "Term & Rent",
      content: [
        `LEASE TERM: ${lease.leaseTerm}`,
        `START DATE: ${lease.leaseStart}`,
        `END DATE: ${lease.leaseEnd}`,
        `MONTHLY RENT: $${lease.monthlyRent.toLocaleString()} CAD`,
        `SECURITY DEPOSIT: $${lease.securityDeposit.toLocaleString()} CAD`,
        `Rent is due on the 1st day of each month. Late payments may incur fees as permitted by Ontario's Residential Tenancies Act.`,
        `The security deposit will be held in accordance with Ontario law and returned within the required timeframe after lease termination, less any lawful deductions.`,
      ],
    },
    {
      title: "Tenant Obligations",
      content: [
        `1. Pay rent in full and on time`,
        `2. Maintain the property in good condition`,
        `3. Not cause damage beyond normal wear and tear`,
        `4. Comply with all building rules and regulations`,
        `5. Not disturb other residents`,
        `6. Not sublet without written permission`,
        `7. Allow landlord access for inspections with proper notice`,
        `8. Report maintenance issues promptly`,
      ],
    },
    {
      title: "Landlord Obligations",
      content: [
        `1. Provide a habitable property meeting all safety standards`,
        `2. Make necessary repairs in a timely manner`,
        `3. Provide 24 hours notice before entering (except emergencies)`,
        `4. Comply with Ontario's Residential Tenancies Act`,
        `5. Maintain common areas and building systems`,
        `6. Provide working smoke detectors and carbon monoxide alarms`,
        `7. Not harass or interfere with tenant's reasonable enjoyment`,
      ],
    },
    {
      title: "Ontario LTB Compliance",
      content: [
        `This agreement complies with Ontario's Residential Tenancies Act, 2006.`,
        `All disputes shall be resolved through the Landlord and Tenant Board (LTB).`,
        `The tenant has the right to file applications with the LTB regarding:`,
        `- Rent increases above the guideline`,
        `- Maintenance and repair issues`,
        `- Harassment or interference with reasonable enjoyment`,
        `- Unlawful eviction`,
        `The landlord may only terminate this tenancy for reasons permitted under the RTA.`,
        `Proper notice periods must be followed for both parties as per the RTA.`,
      ],
    },
    {
      title: "Additional Terms",
      content: [
        `UTILITIES: Tenant is responsible for electricity, internet, and cable. Landlord covers water and heat.`,
        `PARKING: One parking spot included`,
        `PETS: No pets allowed without written consent`,
        `SMOKING: No smoking anywhere in the building`,
        `INSURANCE: Tenant strongly encouraged to obtain renter's insurance`,
        `NOTICE TO TERMINATE: Either party must provide 60 days written notice to terminate`,
      ],
    },
  ];

  const handleSign = () => {
    if (!signature || !initials || !agreedToTerms) return;

    setSigning(true);

    setTimeout(() => {
      setSigning(false);
      setSigned(true);

      setTimeout(() => {
        navigate("/tenant/applications");
      }, 2500);
    }, 2000);
  };

  if (signed) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 text-center">
          <div className="size-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="size-12 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Lease Signed Successfully!</h2>
          <p className="text-slate-600 mb-6">
            Your signed lease has been sent to the landlord. You'll receive a copy via email.
          </p>
          <div className="space-y-2 text-sm text-slate-700 text-left mb-6">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="size-4 text-green-600" />
              <span>Lease agreement executed</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="size-4 text-green-600" />
              <span>Copy sent to your email</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="size-4 text-green-600" />
              <span>Landlord notified</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="size-4 text-green-600" />
              <span>Move-in date confirmed</span>
            </div>
          </div>
          <button
            onClick={() => navigate("/tenant/applications")}
            className="w-full px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors"
          >
            Return to Applications
          </button>
        </div>
      </div>
    );
  }

  if (signing) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 text-center">
          <div className="size-20 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center mx-auto mb-4 animate-pulse">
            <Sparkles className="size-10 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Processing Signature</h2>
          <p className="text-slate-600">Finalizing your lease agreement...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-lg bg-indigo-50">
              <FileText className="size-6 text-indigo-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Lease Agreement</h1>
              <p className="text-slate-600">{lease.propertyTitle}</p>
            </div>
          </div>

          {/* Property Summary */}
          <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl p-6 text-white">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center gap-3">
                <MapPin className="size-5" />
                <div>
                  <p className="text-white/70 text-sm">Property</p>
                  <p className="font-semibold">{lease.propertyAddress}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <DollarSign className="size-5" />
                <div>
                  <p className="text-white/70 text-sm">Monthly Rent</p>
                  <p className="font-semibold text-xl">${lease.monthlyRent.toLocaleString()}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="size-5" />
                <div>
                  <p className="text-white/70 text-sm">Lease Term</p>
                  <p className="font-semibold">{lease.leaseTerm}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Progress */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 mb-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium text-slate-700">Review Progress</p>
            <p className="text-sm text-slate-500">
              Section {currentSection + 1} of {leaseSections.length}
            </p>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-2">
            <div
              className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentSection + 1) / leaseSections.length) * 100}%` }}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Table of Contents */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl border border-slate-200 p-6 lg:sticky lg:top-8">
              <h3 className="font-semibold text-slate-900 mb-4">Table of Contents</h3>
              <nav className="space-y-2">
                {leaseSections.map((section, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentSection(idx)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                      currentSection === idx
                        ? "bg-indigo-50 text-indigo-700 font-medium"
                        : "text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    {idx + 1}. {section.title}
                  </button>
                ))}
              </nav>

              <div className="mt-6 pt-6 border-t border-slate-200">
                <button className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-slate-300 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors mb-2">
                  <Download className="size-4" />
                  Download PDF
                </button>
                <button className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-slate-300 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors">
                  <Eye className="size-4" />
                  Full Preview
                </button>
              </div>
            </div>
          </div>

          {/* Lease Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl border border-slate-200 p-8 mb-6">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">
                {leaseSections[currentSection].title}
              </h2>

              <div className="space-y-4 text-slate-700 leading-relaxed">
                {leaseSections[currentSection].content.map((paragraph, idx) => (
                  <p key={idx} className="text-sm">
                    {paragraph}
                  </p>
                ))}
              </div>

              {currentSection === leaseSections.length - 1 && (
                <div className="mt-8 pt-8 border-t border-slate-200">
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200 mb-6">
                    <div className="flex items-start gap-2">
                      <Shield className="size-5 text-blue-600 mt-0.5" />
                      <div>
                        <h3 className="font-semibold text-blue-900 mb-1">
                          Ontario LTB Compliant
                        </h3>
                        <p className="text-sm text-blue-700">
                          This lease agreement has been generated to comply with Ontario's
                          Residential Tenancies Act, 2006. All clauses meet provincial
                          requirements.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Signature Section */}
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Full Name (Digital Signature) *
                      </label>
                      <input
                        type="text"
                        value={signature}
                        onChange={(e) => setSignature(e.target.value)}
                        placeholder="Type your full legal name"
                        className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-serif text-lg"
                      />
                      <p className="text-xs text-slate-500 mt-1">
                        Your typed name serves as your legal digital signature
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Initials *
                      </label>
                      <input
                        type="text"
                        value={initials}
                        onChange={(e) => setInitials(e.target.value)}
                        placeholder="e.g., JD"
                        maxLength={3}
                        className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-serif text-lg uppercase"
                      />
                    </div>

                    <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-lg">
                      <input
                        type="checkbox"
                        id="terms"
                        checked={agreedToTerms}
                        onChange={(e) => setAgreedToTerms(e.target.checked)}
                        className="mt-1 size-4 text-indigo-600 rounded focus:ring-indigo-500"
                      />
                      <label htmlFor="terms" className="text-sm text-slate-700">
                        I have read and agree to all terms and conditions of this lease agreement.
                        I understand that this is a legally binding contract governed by Ontario's
                        Residential Tenancies Act, 2006.
                      </label>
                    </div>

                    <button
                      onClick={handleSign}
                      disabled={!signature || !initials || !agreedToTerms}
                      className={`w-full flex items-center justify-center gap-2 px-6 py-4 rounded-lg font-medium text-lg transition-colors ${
                        signature && initials && agreedToTerms
                          ? "bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white"
                          : "bg-slate-200 text-slate-400 cursor-not-allowed"
                      }`}
                    >
                      <Edit3 className="size-5" />
                      Sign Lease Agreement
                    </button>

                    {(!signature || !initials || !agreedToTerms) && (
                      <div className="flex items-center gap-2 p-3 bg-amber-50 rounded-lg border border-amber-200">
                        <AlertCircle className="size-5 text-amber-600" />
                        <p className="text-sm text-amber-700">
                          Please complete all required fields to sign the lease
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Navigation */}
              <div className="flex items-center justify-between mt-8 pt-8 border-t border-slate-200">
                <button
                  onClick={() => setCurrentSection(Math.max(0, currentSection - 1))}
                  disabled={currentSection === 0}
                  className={`px-6 py-2.5 rounded-lg font-medium transition-colors ${
                    currentSection === 0
                      ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                      : "bg-white border border-slate-300 text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  Previous
                </button>

                {currentSection < leaseSections.length - 1 && (
                  <button
                    onClick={() =>
                      setCurrentSection(Math.min(leaseSections.length - 1, currentSection + 1))
                    }
                    className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors"
                  >
                    Next Section
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

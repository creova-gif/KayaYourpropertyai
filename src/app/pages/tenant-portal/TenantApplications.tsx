import { useState } from "react";
import { Link } from "react-router";
import {
  Building2,
  Clock,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  FileText,
  MessageSquare,
  Download,
  Eye,
  MapPin,
  Calendar,
  DollarSign,
  TrendingUp,
  Sparkles,
} from "lucide-react";

interface Application {
  id: number;
  propertyId: number;
  propertyTitle: string;
  propertyAddress: string;
  propertyRent: number;
  status: "pending" | "reviewing" | "approved" | "rejected" | "waitlist";
  submittedDate: string;
  lastUpdated: string;
  aiScore?: number;
  landlordMessage?: string;
  nextSteps?: string[];
}

export function TenantApplications() {
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);

  const applications: Application[] = [
    {
      id: 1,
      propertyId: 1,
      propertyTitle: "Modern Downtown 2BR Condo",
      propertyAddress: "123 King Street West, Toronto",
      propertyRent: 2300,
      status: "reviewing",
      submittedDate: "Mar 13, 2026",
      lastUpdated: "Mar 14, 2026 - 10:30 AM",
      aiScore: 92,
      nextSteps: [
        "AI screening complete - High score!",
        "Landlord is reviewing your application",
        "Estimated decision: 1-2 business days",
      ],
    },
    {
      id: 2,
      propertyId: 4,
      propertyTitle: "Luxury 3BR Penthouse",
      propertyAddress: "100 Harbour Street, Toronto",
      propertyRent: 4200,
      status: "waitlist",
      submittedDate: "Mar 10, 2026",
      lastUpdated: "Mar 12, 2026 - 3:45 PM",
      aiScore: 88,
      landlordMessage:
        "Thank you for your application! You're currently #2 on our waitlist. We'll notify you if the unit becomes available.",
      nextSteps: [
        "You are #2 on the waitlist",
        "First applicant has 48 hours to respond",
        "We'll notify you of any updates",
      ],
    },
    {
      id: 3,
      propertyId: 5,
      propertyTitle: "Cozy 1BR Near Subway",
      propertyAddress: "234 Yonge Street, Toronto",
      propertyRent: 1850,
      status: "approved",
      submittedDate: "Mar 8, 2026",
      lastUpdated: "Mar 9, 2026 - 2:15 PM",
      aiScore: 95,
      landlordMessage:
        "Congratulations! Your application has been approved. Please review and sign the lease agreement.",
      nextSteps: [
        "Review lease agreement",
        "Sign digitally within 48 hours",
        "Arrange first month's rent + deposit",
        "Schedule move-in inspection",
      ],
    },
    {
      id: 4,
      propertyId: 2,
      propertyTitle: "Spacious Student Housing",
      propertyAddress: "456 College Avenue, Toronto",
      propertyRent: 850,
      status: "rejected",
      submittedDate: "Mar 5, 2026",
      lastUpdated: "Mar 7, 2026 - 11:00 AM",
      landlordMessage:
        "Thank you for your interest. We've decided to move forward with another applicant whose availability better matched our timeline. We encourage you to apply for other listings.",
      nextSteps: ["Browse other available properties", "Update your profile if needed"],
    },
  ];

  const getStatusIcon = (status: Application["status"]) => {
    switch (status) {
      case "pending":
        return <Clock className="size-5 text-amber-600" />;
      case "reviewing":
        return <TrendingUp className="size-5 text-blue-600" />;
      case "approved":
        return <CheckCircle2 className="size-5 text-green-600" />;
      case "rejected":
        return <XCircle className="size-5 text-red-600" />;
      case "waitlist":
        return <AlertTriangle className="size-5 text-purple-600" />;
    }
  };

  const getStatusColor = (status: Application["status"]) => {
    switch (status) {
      case "pending":
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "reviewing":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "approved":
        return "bg-green-50 text-green-700 border-green-200";
      case "rejected":
        return "bg-red-50 text-red-700 border-red-200";
      case "waitlist":
        return "bg-purple-50 text-purple-700 border-purple-200";
    }
  };

  const getStatusText = (status: Application["status"]) => {
    switch (status) {
      case "pending":
        return "Pending Review";
      case "reviewing":
        return "Under Review";
      case "approved":
        return "Approved";
      case "rejected":
        return "Not Selected";
      case "waitlist":
        return "Waitlisted";
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">My Applications</h1>
          <p className="mt-2 text-slate-600">
            Track the status of your rental applications
          </p>
        </div>

        {/* Applications Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl border border-slate-200 p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-50">
                <TrendingUp className="size-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">
                  {applications.filter((a) => a.status === "reviewing" || a.status === "pending").length}
                </p>
                <p className="text-sm text-slate-600">Active</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-green-50">
                <CheckCircle2 className="size-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">
                  {applications.filter((a) => a.status === "approved").length}
                </p>
                <p className="text-sm text-slate-600">Approved</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-purple-50">
                <AlertTriangle className="size-5 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">
                  {applications.filter((a) => a.status === "waitlist").length}
                </p>
                <p className="text-sm text-slate-600">Waitlist</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-amber-50">
                <FileText className="size-5 text-amber-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">{applications.length}</p>
                <p className="text-sm text-slate-600">Total</p>
              </div>
            </div>
          </div>
        </div>

        {/* Applications List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            {applications.map((app) => (
              <div
                key={app.id}
                onClick={() => setSelectedApp(app)}
                className={`bg-white rounded-xl border-2 p-6 cursor-pointer transition-all ${
                  selectedApp?.id === app.id
                    ? "border-indigo-500 shadow-lg"
                    : "border-slate-200 hover:border-indigo-300 hover:shadow-md"
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="font-semibold text-slate-900 text-lg mb-1">
                      {app.propertyTitle}
                    </h3>
                    <div className="flex items-center gap-1 text-sm text-slate-600 mb-2">
                      <MapPin className="size-4" />
                      <span>{app.propertyAddress}</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-slate-600">
                      <DollarSign className="size-4" />
                      <span className="font-medium">${app.propertyRent.toLocaleString()}/mo</span>
                    </div>
                  </div>

                  <div className={`px-3 py-1.5 rounded-full text-sm font-medium border flex items-center gap-2 ${getStatusColor(app.status)}`}>
                    {getStatusIcon(app.status)}
                    <span>{getStatusText(app.status)}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-slate-200">
                  <div className="text-sm">
                    <p className="text-slate-500">Submitted</p>
                    <p className="font-medium text-slate-900">{app.submittedDate}</p>
                  </div>

                  {app.aiScore && (
                    <div className="text-right">
                      <p className="text-sm text-slate-500">AI Score</p>
                      <div className="flex items-center gap-1">
                        <Sparkles className="size-4 text-indigo-600" />
                        <p className="font-bold text-indigo-600 text-lg">{app.aiScore}/100</p>
                      </div>
                    </div>
                  )}
                </div>

                {app.status === "approved" && (
                  <div className="mt-4">
                    <Link
                      to={`/tenant/lease/${app.id}`}
                      className="block w-full px-4 py-2.5 bg-green-600 hover:bg-green-700 text-white text-center rounded-lg font-medium transition-colors"
                    >
                      View Lease Agreement →
                    </Link>
                  </div>
                )}
              </div>
            ))}

            {applications.length === 0 && (
              <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
                <FileText className="size-12 text-slate-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                  No Applications Yet
                </h3>
                <p className="text-slate-600 mb-6">
                  Start browsing properties and submit your first application
                </p>
                <Link
                  to="/listings"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors"
                >
                  <Building2 className="size-5" />
                  Browse Properties
                </Link>
              </div>
            )}
          </div>

          {/* Application Details Panel */}
          {selectedApp ? (
            <div className="bg-white rounded-xl border border-slate-200 p-6 lg:sticky lg:top-8 h-fit">
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-slate-900">Application Details</h2>
                  <div className={`px-3 py-1.5 rounded-full text-sm font-medium border flex items-center gap-2 ${getStatusColor(selectedApp.status)}`}>
                    {getStatusIcon(selectedApp.status)}
                    <span>{getStatusText(selectedApp.status)}</span>
                  </div>
                </div>

                <div className="p-4 bg-slate-50 rounded-lg">
                  <h3 className="font-semibold text-slate-900 mb-1">
                    {selectedApp.propertyTitle}
                  </h3>
                  <p className="text-sm text-slate-600 mb-3">{selectedApp.propertyAddress}</p>
                  <div className="flex items-center gap-4 text-sm">
                    <div>
                      <p className="text-slate-500">Monthly Rent</p>
                      <p className="font-bold text-slate-900 text-lg">
                        ${selectedApp.propertyRent.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* AI Score */}
              {selectedApp.aiScore && (
                <div className="mb-6 p-4 rounded-lg bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-200">
                  <div className="flex items-center gap-2 mb-3">
                    <Sparkles className="size-5 text-indigo-600" />
                    <h3 className="font-semibold text-indigo-900">AI Risk Score</h3>
                  </div>
                  <div className="text-4xl font-bold text-indigo-600 mb-2">
                    {selectedApp.aiScore}/100
                  </div>
                  <p className="text-sm text-indigo-700">
                    {selectedApp.aiScore >= 90
                      ? "Excellent! You're a top candidate for this property."
                      : selectedApp.aiScore >= 80
                      ? "Strong application with good approval chances."
                      : "Your application is being carefully reviewed."}
                  </p>
                </div>
              )}

              {/* Timeline */}
              <div className="mb-6">
                <h3 className="font-semibold text-slate-900 mb-3">Application Timeline</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-green-50 mt-0.5">
                      <CheckCircle2 className="size-4 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-slate-900">Application Submitted</p>
                      <p className="text-xs text-slate-500">{selectedApp.submittedDate}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-green-50 mt-0.5">
                      <CheckCircle2 className="size-4 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-slate-900">AI Screening Complete</p>
                      <p className="text-xs text-slate-500">{selectedApp.submittedDate}</p>
                    </div>
                  </div>

                  {selectedApp.status === "reviewing" && (
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-lg bg-blue-50 mt-0.5 animate-pulse">
                        <Clock className="size-4 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-slate-900">Landlord Review</p>
                        <p className="text-xs text-slate-500">In Progress</p>
                      </div>
                    </div>
                  )}

                  {selectedApp.status === "approved" && (
                    <>
                      <div className="flex items-start gap-3">
                        <div className="p-2 rounded-lg bg-green-50 mt-0.5">
                          <CheckCircle2 className="size-4 text-green-600" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-slate-900">
                            Application Approved
                          </p>
                          <p className="text-xs text-slate-500">{selectedApp.lastUpdated}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="p-2 rounded-lg bg-amber-50 mt-0.5">
                          <FileText className="size-4 text-amber-600" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-slate-900">
                            Lease Agreement Ready
                          </p>
                          <p className="text-xs text-slate-500">Action Required</p>
                        </div>
                      </div>
                    </>
                  )}

                  {selectedApp.status === "rejected" && (
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-lg bg-red-50 mt-0.5">
                        <XCircle className="size-4 text-red-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-slate-900">Application Closed</p>
                        <p className="text-xs text-slate-500">{selectedApp.lastUpdated}</p>
                      </div>
                    </div>
                  )}

                  {selectedApp.status === "waitlist" && (
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-lg bg-purple-50 mt-0.5">
                        <AlertTriangle className="size-4 text-purple-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-slate-900">Added to Waitlist</p>
                        <p className="text-xs text-slate-500">{selectedApp.lastUpdated}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Landlord Message */}
              {selectedApp.landlordMessage && (
                <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-center gap-2 mb-2">
                    <MessageSquare className="size-5 text-blue-600" />
                    <h3 className="font-semibold text-blue-900">Message from Landlord</h3>
                  </div>
                  <p className="text-sm text-blue-700">{selectedApp.landlordMessage}</p>
                </div>
              )}

              {/* Next Steps */}
              {selectedApp.nextSteps && selectedApp.nextSteps.length > 0 && (
                <div className="mb-6">
                  <h3 className="font-semibold text-slate-900 mb-3">Next Steps</h3>
                  <div className="space-y-2">
                    {selectedApp.nextSteps.map((step, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-sm text-slate-700">
                        <div className="size-5 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-xs font-bold mt-0.5">
                          {idx + 1}
                        </div>
                        <span>{step}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="space-y-3">
                {selectedApp.status === "approved" && (
                  <Link
                    to={`/tenant/lease/${selectedApp.id}`}
                    className="block w-full px-4 py-3 bg-green-600 hover:bg-green-700 text-white text-center rounded-lg font-medium transition-colors"
                  >
                    View & Sign Lease Agreement
                  </Link>
                )}

                <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 border border-slate-300 text-slate-700 rounded-lg font-medium hover:bg-slate-50 transition-colors">
                  <Eye className="size-4" />
                  View Full Application
                </button>

                <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 border border-slate-300 text-slate-700 rounded-lg font-medium hover:bg-slate-50 transition-colors">
                  <Download className="size-4" />
                  Download PDF
                </button>

                {(selectedApp.status === "reviewing" || selectedApp.status === "waitlist") && (
                  <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 border border-red-300 text-red-700 rounded-lg font-medium hover:bg-red-50 transition-colors">
                    <XCircle className="size-4" />
                    Withdraw Application
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-slate-200 p-12 flex items-center justify-center lg:sticky lg:top-8">
              <div className="text-center">
                <FileText className="size-12 text-slate-300 mx-auto mb-4" />
                <p className="text-slate-500">Select an application to view details</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

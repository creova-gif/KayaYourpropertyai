import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Sparkles,
  CheckCircle,
  XCircle,
  Eye,
  ChevronRight,
  Users,
  DollarSign,
  TrendingUp,
  AlertTriangle,
  FileText,
  X,
} from "lucide-react";
import { ApplicationTimeline } from "../components/ApplicationTimeline";
import { showFeedback } from "../components/InstantFeedback";

interface Application {
  id: number;
  name: string;
  unit: string;
  rent: number;
  score: number;
  risk: "low" | "medium" | "high";
  income: number;
  creditScore: number;
  employment: string;
  status: "pending" | "approved" | "rejected";
  currentStep: number;
}

export function ApplicationsEnhanced() {
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);
  const [showApproveModal, setShowApproveModal] = useState(false);

  const [applications, setApplications] = useState<Application[]>([
    {
      id: 1,
      name: "Sarah Kim",
      unit: "Unit 4A - 2 Bedroom",
      rent: 2300,
      score: 92,
      risk: "low",
      income: 8500,
      creditScore: 745,
      employment: "Software Engineer",
      status: "pending",
      currentStep: 2,
    },
    {
      id: 2,
      name: "Michael Patel",
      unit: "Unit 2B - 1 Bedroom",
      rent: 1950,
      score: 87,
      risk: "low",
      income: 6800,
      creditScore: 712,
      employment: "Account Manager",
      status: "pending",
      currentStep: 2,
    },
    {
      id: 3,
      name: "Jason Lee",
      unit: "Unit 1C - 3 Bedroom",
      rent: 2800,
      score: 73,
      risk: "medium",
      income: 7200,
      creditScore: 658,
      employment: "Sales Associate",
      status: "pending",
      currentStep: 1,
    },
  ]);

  const handleApprove = (app: Application) => {
    setSelectedApp(app);
    setShowApproveModal(true);
  };

  const confirmApprove = () => {
    if (selectedApp) {
      setApplications(
        applications.map((app) =>
          app.id === selectedApp.id ? { ...app, status: "approved", currentStep: 4 } : app
        )
      );

      showFeedback({
        type: "success",
        title: "✓ Tenant Approved",
        description: "Lease generated • Notification sent • Unit reserved",
      });

      setShowApproveModal(false);
      setSelectedApp(null);
    }
  };

  const handleReject = (app: Application) => {
    setApplications(
      applications.map((a) => (a.id === app.id ? { ...a, status: "rejected" } : a))
    );

    showFeedback({
      type: "warning",
      title: "Application Rejected",
      description: "Professional notice sent to applicant",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header with Stats */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Applications</h1>
          <p className="text-lg text-slate-600">Review and approve tenant applications</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="bg-white rounded-xl border border-slate-200 p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-indigo-50">
                  <Users className="size-5 text-indigo-600" />
                </div>
                <div>
                  <p className="text-sm text-slate-600">Pending Review</p>
                  <p className="text-2xl font-bold text-slate-900">
                    {applications.filter((a) => a.status === "pending").length}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-green-50">
                  <CheckCircle className="size-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-slate-600">High-Quality</p>
                  <p className="text-2xl font-bold text-slate-900">
                    {applications.filter((a) => a.score >= 85).length}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-purple-50">
                  <TrendingUp className="size-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-slate-600">Avg AI Score</p>
                  <p className="text-2xl font-bold text-slate-900">
                    {Math.round(applications.reduce((sum, a) => sum + a.score, 0) / applications.length)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Application Cards with Progressive Disclosure */}
        <div className="grid grid-cols-1 gap-4">
          {applications
            .filter((app) => app.status === "pending")
            .map((app, idx) => (
              <motion.div
                key={app.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-xl transition-all">
                  {/* Collapsed View */}
                  <div
                    onClick={() => setSelectedApp(selectedApp?.id === app.id ? null : app)}
                    className="p-6 cursor-pointer"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 flex-1">
                        {/* Avatar */}
                        <div className="size-16 rounded-full bg-gradient-to-br from-indigo-600 to-purple-700 flex items-center justify-center text-white font-bold text-xl">
                          {app.name.split(" ").map((n) => n[0]).join("")}
                        </div>

                        {/* Info */}
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-1">
                            <h3 className="text-xl font-bold text-slate-900">{app.name}</h3>
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-bold ${
                                app.risk === "low"
                                  ? "bg-green-100 text-green-700"
                                  : app.risk === "medium"
                                  ? "bg-amber-100 text-amber-700"
                                  : "bg-red-100 text-red-700"
                              }`}
                            >
                              {app.risk.toUpperCase()} RISK
                            </span>
                          </div>
                          <p className="text-slate-600">{app.unit}</p>
                          <div className="flex items-center gap-4 mt-2 text-sm text-slate-500">
                            <span>Rent: ${app.rent.toLocaleString()}</span>
                            <span>•</span>
                            <span>Income: ${app.income.toLocaleString()}</span>
                            <span>•</span>
                            <span>Credit: {app.creditScore}</span>
                          </div>
                        </div>

                        {/* AI Score */}
                        <div className="text-center px-6">
                          <div className="flex items-center gap-2 mb-2">
                            <Sparkles className="size-5 text-indigo-600" />
                            <span className="text-sm font-medium text-slate-600">AI Score</span>
                          </div>
                          <div
                            className={`text-4xl font-bold ${
                              app.score >= 85
                                ? "text-green-600"
                                : app.score >= 70
                                ? "text-amber-600"
                                : "text-red-600"
                            }`}
                          >
                            {app.score}
                          </div>
                        </div>

                        {/* Quick Actions */}
                        <div className="flex items-center gap-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleApprove(app);
                            }}
                            className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl font-semibold transition-colors flex items-center gap-2"
                          >
                            <CheckCircle className="size-5" />
                            Approve
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleReject(app);
                            }}
                            className="px-6 py-3 border-2 border-red-300 text-red-600 hover:bg-red-50 rounded-xl font-semibold transition-colors flex items-center gap-2"
                          >
                            <XCircle className="size-5" />
                            Reject
                          </button>
                        </div>
                      </div>

                      <ChevronRight
                        className={`size-6 text-slate-400 transition-transform ml-4 ${
                          selectedApp?.id === app.id ? "rotate-90" : ""
                        }`}
                      />
                    </div>
                  </div>

                  {/* Expanded View - Progressive Disclosure */}
                  <AnimatePresence>
                    {selectedApp?.id === app.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="border-t border-slate-200 overflow-hidden"
                      >
                        <div className="p-6 bg-slate-50">
                          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* Left Column - Details */}
                            <div className="space-y-4">
                              {/* AI Insights */}
                              <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-xl p-4 text-white">
                                <div className="flex items-center gap-2 mb-3">
                                  <Sparkles className="size-5" />
                                  <h4 className="font-semibold">AI Analysis</h4>
                                </div>
                                <ul className="space-y-2 text-sm">
                                  <li className="flex items-center gap-2">
                                    <CheckCircle className="size-4" />
                                    Strong financial profile
                                  </li>
                                  <li className="flex items-center gap-2">
                                    <CheckCircle className="size-4" />
                                    Rent-to-income ratio is safe (
                                    {((app.rent / app.income) * 100).toFixed(0)}%)
                                  </li>
                                  <li className="flex items-center gap-2">
                                    <CheckCircle className="size-4" />
                                    {app.score >= 85 ? "Approval recommended" : "Review recommended"}
                                  </li>
                                </ul>
                              </div>

                              {/* Financial Details */}
                              <div className="bg-white rounded-xl p-4 border border-slate-200">
                                <h4 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
                                  <DollarSign className="size-5 text-green-600" />
                                  Financial Details
                                </h4>
                                <div className="space-y-2 text-sm">
                                  <div className="flex justify-between">
                                    <span className="text-slate-600">Monthly Income</span>
                                    <span className="font-semibold text-slate-900">
                                      ${app.income.toLocaleString()}
                                    </span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-slate-600">Monthly Rent</span>
                                    <span className="font-semibold text-slate-900">
                                      ${app.rent.toLocaleString()}
                                    </span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-slate-600">Income Ratio</span>
                                    <span
                                      className={`font-semibold ${
                                        app.income / app.rent >= 3 ? "text-green-600" : "text-amber-600"
                                      }`}
                                    >
                                      {(app.income / app.rent).toFixed(1)}x
                                    </span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-slate-600">Credit Score</span>
                                    <span className="font-semibold text-slate-900">{app.creditScore}</span>
                                  </div>
                                </div>
                              </div>

                              {/* Employment */}
                              <div className="bg-white rounded-xl p-4 border border-slate-200">
                                <h4 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
                                  <FileText className="size-5 text-blue-600" />
                                  Employment
                                </h4>
                                <p className="text-slate-900 font-medium">{app.employment}</p>
                                <p className="text-sm text-slate-600 mt-1">Verified employment status</p>
                              </div>
                            </div>

                            {/* Right Column - Timeline */}
                            <div>
                              <ApplicationTimeline currentStep={app.currentStep} />
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ))}
        </div>

        {/* Empty State */}
        {applications.filter((a) => a.status === "pending").length === 0 && (
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center size-20 rounded-full bg-slate-100 mb-4">
              <Users className="size-10 text-slate-400" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-2">No Pending Applications</h3>
            <p className="text-slate-600">You've reviewed all applications. Great work!</p>
          </div>
        )}
      </div>

      {/* Approve Modal with Instant Feedback */}
      <AnimatePresence>
        {showApproveModal && selectedApp && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
            onClick={() => setShowApproveModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl max-w-md w-full p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-bold text-slate-900">Approve Tenant</h3>
                <button
                  onClick={() => setShowApproveModal(false)}
                  className="p-2 hover:bg-slate-100 rounded-lg"
                >
                  <X className="size-5" />
                </button>
              </div>

              <div className="mb-6">
                <p className="text-slate-600 mb-4">
                  You're about to approve <strong>{selectedApp.name}</strong> for{" "}
                  <strong>{selectedApp.unit}</strong>.
                </p>

                <div className="bg-indigo-50 rounded-xl p-4 border border-indigo-200">
                  <h4 className="font-semibold text-indigo-900 mb-2">What happens next:</h4>
                  <ul className="space-y-2 text-sm text-indigo-800">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="size-4" />
                      Unit automatically reserved
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="size-4" />
                      AI generates Ontario LTB-compliant lease
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="size-4" />
                      Tenant receives notification & lease link
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="size-4" />
                      Other applications paused
                    </li>
                  </ul>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowApproveModal(false)}
                  className="flex-1 px-4 py-3 border border-slate-300 rounded-xl font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmApprove}
                  className="flex-1 px-4 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl font-semibold transition-colors"
                >
                  Confirm Approval
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

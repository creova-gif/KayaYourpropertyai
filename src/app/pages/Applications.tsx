import { 
  Users, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle,
  FileText,
  DollarSign,
  Briefcase,
  TrendingUp,
  Download,
  MessageSquare,
  Eye,
  Filter,
  SlidersHorizontal,
  Search,
  Building2,
  Sparkles,
  Send,
  X,
} from "lucide-react";
import { useState } from "react";
import { ApplicationCard } from "../components/ApplicationCard";
import { SuccessConfetti } from "../components/SuccessConfetti";
import { AIProcessingLoader } from "../components/AIProcessingLoader";

export function Applications() {
  const [selectedApp, setSelectedApp] = useState<number | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [processingProgress, setProcessingProgress] = useState(0);
  const [swipeMode, setSwipeMode] = useState(false);
  const [showApproveModal, setShowApproveModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [rejectReason, setRejectReason] = useState("");
  const [message, setMessage] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterProperty, setFilterProperty] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("date");
  const [searchQuery, setSearchQuery] = useState("");
  const [applications, setApplications] = useState([
    {
      id: 1,
      name: "Sarah Kim",
      unit: "Unit 4A - 2 Bedroom",
      rent: 2300,
      score: 92,
      risk: "low",
      creditScore: 745,
      income: 8500,
      incomeRatio: 3.7,
      employment: "Software Engineer",
      employmentStatus: "Verified",
      rentalHistory: "Excellent",
      documents: {
        id: true,
        payStub: true,
        creditReport: true,
        references: true,
      },
      appliedDate: "Mar 12, 2026",
      status: "pending"
    },
    {
      id: 2,
      name: "Michael Patel",
      unit: "Unit 2B - 1 Bedroom",
      rent: 1950,
      score: 87,
      risk: "low",
      creditScore: 712,
      income: 6800,
      incomeRatio: 3.5,
      employment: "Account Manager",
      employmentStatus: "Verified",
      rentalHistory: "Good",
      documents: {
        id: true,
        payStub: true,
        creditReport: true,
        references: true,
      },
      appliedDate: "Mar 13, 2026",
      status: "pending"
    },
    {
      id: 3,
      name: "Jason Lee",
      unit: "Unit 1C - 3 Bedroom",
      rent: 2800,
      score: 73,
      risk: "medium",
      creditScore: 658,
      income: 7200,
      incomeRatio: 2.6,
      employment: "Sales Associate",
      employmentStatus: "Pending",
      rentalHistory: "Fair - 1 late payment",
      documents: {
        id: true,
        payStub: true,
        creditReport: false,
        references: true,
      },
      appliedDate: "Mar 11, 2026",
      status: "reviewing"
    },
    {
      id: 4,
      name: "Emma Rodriguez",
      unit: "Unit 5A - 2 Bedroom",
      rent: 2400,
      score: 95,
      risk: "low",
      creditScore: 780,
      income: 9200,
      incomeRatio: 3.8,
      employment: "Senior Analyst",
      employmentStatus: "Verified",
      rentalHistory: "Excellent - 4 years same landlord",
      documents: {
        id: true,
        payStub: true,
        creditReport: true,
        references: true,
      },
      appliedDate: "Mar 14, 2026",
      status: "pending"
    },
  ]);

  const selected = applications.find(app => app.id === selectedApp);

  const handleApprove = () => {
    setShowApproveModal(true);
  };

  const confirmApprove = () => {
    setShowApproveModal(false);
    setProcessing(true);
    setProcessingProgress(0);

    const interval = setInterval(() => {
      setProcessingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 200);

    setTimeout(() => {
      clearInterval(interval);
      setProcessing(false);
      setProcessingProgress(0);
      setShowSuccess(true);
      
      // Update application status
      setApplications((prev) =>
        prev.map((app) =>
          app.id === selectedApp ? { ...app, status: "approved" as const } : app
        )
      );

      setTimeout(() => {
        setShowSuccess(false);
      }, 3000);
    }, 2500);
  };

  const handleReject = () => {
    setShowRejectModal(true);
  };

  const confirmReject = () => {
    if (!rejectReason) return;
    
    setShowRejectModal(false);
    setApplications((prev) =>
      prev.map((app) =>
        app.id === selectedApp ? { ...app, status: "rejected" as const } : app
      )
    );
    setRejectReason("");
  };

  const handleSendMessage = () => {
    if (!message) return;
    // Send message logic here
    setShowMessageModal(false);
    setMessage("");
  };

  const filteredApplications = applications
    .filter((app) => {
      const matchesStatus = filterStatus === "all" || app.status === filterStatus;
      const matchesProperty = filterProperty === "all" || app.unit.includes(filterProperty);
      const matchesSearch =
        app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.unit.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesStatus && matchesProperty && matchesSearch;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "score":
          return b.score - a.score;
        case "rent":
          return b.rent - a.rent;
        case "income":
          return b.income - a.income;
        case "date":
        default:
          return new Date(b.appliedDate).getTime() - new Date(a.appliedDate).getTime();
      }
    });

  return (
    <div className="min-h-screen bg-slate-50">
      {showSuccess && <SuccessConfetti />}
      {processing && (
        <AIProcessingLoader 
          progress={processingProgress}
          message="Generating lease agreement..."
        />
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">Tenant Applications</h1>
          <p className="mt-2 text-slate-600">Review and approve applicants with AI-powered screening</p>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="md:col-span-2 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search applicants..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="reviewing">Reviewing</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>

            <select
              value={filterProperty}
              onChange={(e) => setFilterProperty(e.target.value)}
              className="px-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="all">All Properties</option>
              <option value="4A">Unit 4A</option>
              <option value="2B">Unit 2B</option>
              <option value="1C">Unit 1C</option>
              <option value="5A">Unit 5A</option>
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="date">Sort: Recent</option>
              <option value="score">Sort: AI Score</option>
              <option value="rent">Sort: Rent</option>
              <option value="income">Sort: Income</option>
            </select>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <p className="text-sm text-slate-600">
              Showing <strong>{filteredApplications.length}</strong> of <strong>{applications.length}</strong> applications
            </p>
            <div className="flex gap-2">
              <button className="px-3 py-1.5 text-sm border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors">
                Export CSV
              </button>
              <button className="px-3 py-1.5 text-sm border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors">
                Compare Selected
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Applications List */}
          <div className="space-y-4">
            {filteredApplications.map((app) => (
              <div
                key={app.id}
                onClick={() => setSelectedApp(app.id)}
                className={`bg-white rounded-xl border-2 p-6 cursor-pointer transition-all ${
                  selectedApp === app.id
                    ? "border-indigo-500 shadow-lg"
                    : "border-slate-200 hover:border-indigo-300 hover:shadow-md"
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="size-14 rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center">
                      <Users className="size-7 text-indigo-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900 text-lg">{app.name}</h3>
                      <p className="text-sm text-slate-500">{app.unit}</p>
                      <p className="text-xs text-slate-400 mt-1">{app.appliedDate}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-slate-900 mb-1">{app.score}</div>
                    <span className={`text-xs px-3 py-1 rounded-full font-medium ${
                      app.risk === "low" ? "bg-green-100 text-green-700" :
                      app.risk === "medium" ? "bg-amber-100 text-amber-700" :
                      "bg-red-100 text-red-700"
                    }`}>
                      {app.risk} risk
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3 text-sm">
                  <div>
                    <p className="text-slate-500">Credit</p>
                    <p className="font-semibold text-slate-900">{app.creditScore}</p>
                  </div>
                  <div>
                    <p className="text-slate-500">Income</p>
                    <p className="font-semibold text-slate-900">${app.income.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-slate-500">Ratio</p>
                    <p className="font-semibold text-slate-900">{app.incomeRatio}x</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Application Detail Panel */}
          {selected ? (
            <div className="bg-white rounded-xl border border-slate-200 p-6 lg:sticky lg:top-8 h-fit">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-slate-900">{selected.name}</h2>
                <span className={`px-3 py-1.5 rounded-full text-sm font-medium ${
                  selected.risk === "low" ? "bg-green-100 text-green-700" :
                  selected.risk === "medium" ? "bg-amber-100 text-amber-700" :
                  "bg-red-100 text-red-700"
                }`}>
                  {selected.risk.toUpperCase()} RISK
                </span>
              </div>

              {/* AI Risk Analysis */}
              <div className="mb-6 p-4 rounded-lg bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-200">
                <div className="flex items-center gap-2 mb-3">
                  <TrendingUp className="size-5 text-indigo-600" />
                  <h3 className="font-semibold text-indigo-900">AI Risk Score</h3>
                </div>
                <div className="text-4xl font-bold text-indigo-600 mb-4">{selected.score}/100</div>
                
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-slate-700">Financial Stability</span>
                      <span className="font-medium text-slate-900">
                        {selected.incomeRatio >= 3.5 ? "95%" : selected.incomeRatio >= 3 ? "85%" : "70%"}
                      </span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-indigo-500 to-purple-600 h-2 rounded-full"
                        style={{ width: selected.incomeRatio >= 3.5 ? "95%" : selected.incomeRatio >= 3 ? "85%" : "70%" }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-slate-700">Creditworthiness</span>
                      <span className="font-medium text-slate-900">
                        {selected.creditScore >= 720 ? "92%" : selected.creditScore >= 680 ? "80%" : "65%"}
                      </span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-indigo-500 to-purple-600 h-2 rounded-full"
                        style={{ width: selected.creditScore >= 720 ? "92%" : selected.creditScore >= 680 ? "80%" : "65%" }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-slate-700">Rental History</span>
                      <span className="font-medium text-slate-900">
                        {selected.rentalHistory.includes("Excellent") ? "95%" : selected.rentalHistory.includes("Good") ? "88%" : "72%"}
                      </span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-indigo-500 to-purple-600 h-2 rounded-full"
                        style={{ width: selected.rentalHistory.includes("Excellent") ? "95%" : selected.rentalHistory.includes("Good") ? "88%" : "72%" }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Details */}
              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-50">
                  <DollarSign className="size-5 text-slate-600" />
                  <div className="flex-1">
                    <p className="text-sm text-slate-500">Monthly Income</p>
                    <p className="font-semibold text-slate-900">${selected.income.toLocaleString()}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-slate-500">Rent</p>
                    <p className="font-semibold text-slate-900">${selected.rent.toLocaleString()}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-50">
                  <Briefcase className="size-5 text-slate-600" />
                  <div>
                    <p className="text-sm text-slate-500">Employment</p>
                    <p className="font-semibold text-slate-900">{selected.employment}</p>
                    <p className="text-xs text-green-600 mt-1">✓ {selected.employmentStatus}</p>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-slate-50">
                  <p className="text-sm text-slate-500 mb-2">Rental History</p>
                  <p className="text-sm text-slate-900">{selected.rentalHistory}</p>
                </div>
              </div>

              {/* Documents */}
              <div className="mb-6">
                <h3 className="font-semibold text-slate-900 mb-3">Documents</h3>
                <div className="grid grid-cols-2 gap-2">
                  {Object.entries(selected.documents).map(([key, verified]) => (
                    <div
                      key={key}
                      className={`flex items-center gap-2 p-3 rounded-lg text-sm ${
                        verified ? "bg-green-50 text-green-700" : "bg-amber-50 text-amber-700"
                      }`}
                    >
                      {verified ? <CheckCircle2 className="size-4" /> : <AlertTriangle className="size-4" />}
                      <span className="capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* AI Recommendation */}
              <div className={`p-4 rounded-lg mb-6 ${
                selected.score >= 85 ? "bg-green-50 border border-green-200" :
                selected.score >= 70 ? "bg-amber-50 border border-amber-200" :
                "bg-red-50 border border-red-200"
              }`}>
                <div className="flex items-center gap-2 mb-2">
                  {selected.score >= 85 ? <CheckCircle2 className="size-5 text-green-600" /> :
                   selected.score >= 70 ? <AlertTriangle className="size-5 text-amber-600" /> :
                   <XCircle className="size-5 text-red-600" />}
                  <h3 className={`font-semibold ${
                    selected.score >= 85 ? "text-green-900" :
                    selected.score >= 70 ? "text-amber-900" :
                    "text-red-900"
                  }`}>
                    AI Recommendation
                  </h3>
                </div>
                <p className={`text-sm ${
                  selected.score >= 85 ? "text-green-700" :
                  selected.score >= 70 ? "text-amber-700" :
                  "text-red-700"
                }`}>
                  {selected.score >= 85 ? "✓ Strong Candidate - Approve" :
                   selected.score >= 70 ? "⚠ Review Required - Request additional information" :
                   "✗ High Risk - Consider rejection"}
                </p>
              </div>

              {/* Actions */}
              <div className="grid grid-cols-3 gap-3">
                <button 
                  onClick={handleApprove}
                  disabled={selected.status === "approved" || selected.status === "rejected"}
                  className={`px-4 py-3 rounded-lg font-medium transition-colors ${
                    selected.status === "approved" || selected.status === "rejected"
                      ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                      : "bg-green-600 hover:bg-green-700 text-white"
                  }`}
                >
                  Approve
                </button>
                <button 
                  onClick={() => setShowMessageModal(true)}
                  className="px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-medium transition-colors"
                >
                  Message
                </button>
                <button 
                  onClick={handleReject}
                  disabled={selected.status === "approved" || selected.status === "rejected"}
                  className={`px-4 py-3 rounded-lg font-medium transition-colors ${
                    selected.status === "approved" || selected.status === "rejected"
                      ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                      : "bg-red-100 hover:bg-red-200 text-red-700"
                  }`}
                >
                  Reject
                </button>
              </div>

              {selected.status === "approved" && (
                <div className="mt-4 p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle2 className="size-5 text-green-600" />
                    <span className="font-semibold text-green-900">Application Approved</span>
                  </div>
                  <p className="text-sm text-green-700 mb-3">
                    Lease agreement has been generated and sent to the tenant.
                  </p>
                  <button className="w-full px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors">
                    View Lease Agreement
                  </button>
                </div>
              )}

              {selected.status === "rejected" && (
                <div className="mt-4 p-4 bg-red-50 rounded-lg border border-red-200">
                  <div className="flex items-center gap-2 mb-2">
                    <XCircle className="size-5 text-red-600" />
                    <span className="font-semibold text-red-900">Application Rejected</span>
                  </div>
                  <p className="text-sm text-red-700">
                    Tenant has been notified. Application closed.
                  </p>
                </div>
              )}
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

      {/* Approve Confirmation Modal */}
      {showApproveModal && selected && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-full bg-green-50">
                <CheckCircle2 className="size-6 text-green-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-900">Approve Application</h2>
                <p className="text-sm text-slate-600">{selected.name}</p>
              </div>
            </div>

            <div className="mb-6 p-4 bg-slate-50 rounded-lg">
              <h3 className="font-semibold text-slate-900 mb-2">What happens next:</h3>
              <ul className="space-y-2 text-sm text-slate-700">
                <li className="flex items-start gap-2">
                  <Sparkles className="size-4 text-indigo-600 mt-0.5" />
                  <span>AI will generate a customized lease agreement</span>
                </li>
                <li className="flex items-start gap-2">
                  <Send className="size-4 text-indigo-600 mt-0.5" />
                  <span>Tenant will be notified immediately via email & SMS</span>
                </li>
                <li className="flex items-start gap-2">
                  <FileText className="size-4 text-indigo-600 mt-0.5" />
                  <span>Tenant can review and digitally sign the lease</span>
                </li>
                <li className="flex items-start gap-2">
                  <Building2 className="size-4 text-indigo-600 mt-0.5" />
                  <span>Property status will update to "Reserved"</span>
                </li>
              </ul>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowApproveModal(false)}
                className="flex-1 px-4 py-3 border border-slate-300 text-slate-700 rounded-lg font-medium hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmApprove}
                className="flex-1 px-4 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors"
              >
                Confirm Approval
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reject Confirmation Modal */}
      {showRejectModal && selected && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-full bg-red-50">
                <XCircle className="size-6 text-red-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-900">Reject Application</h2>
                <p className="text-sm text-slate-600">{selected.name}</p>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Reason for rejection (optional)
              </label>
              <textarea
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                placeholder="This helps improve our AI and provides feedback to the tenant..."
                className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-red-500 resize-none"
                rows={4}
              />
              <p className="text-xs text-slate-500 mt-2">
                The tenant will receive a professional notification. Personal messages won't be shared.
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowRejectModal(false)}
                className="flex-1 px-4 py-3 border border-slate-300 text-slate-700 rounded-lg font-medium hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmReject}
                className="flex-1 px-4 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors"
              >
                Confirm Rejection
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Message Modal */}
      {showMessageModal && selected && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-full bg-indigo-50">
                  <MessageSquare className="size-6 text-indigo-600" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-900">Message Applicant</h2>
                  <p className="text-sm text-slate-600">{selected.name}</p>
                </div>
              </div>
              <button
                onClick={() => setShowMessageModal(false)}
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <X className="size-5 text-slate-500" />
              </button>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Your message
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Request additional information or ask questions..."
                className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                rows={5}
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowMessageModal(false)}
                className="flex-1 px-4 py-3 border border-slate-300 text-slate-700 rounded-lg font-medium hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSendMessage}
                disabled={!message.trim()}
                className={`flex-1 px-4 py-3 rounded-lg font-medium transition-colors ${
                  message.trim()
                    ? "bg-indigo-600 hover:bg-indigo-700 text-white"
                    : "bg-slate-200 text-slate-400 cursor-not-allowed"
                }`}
              >
                Send Message
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
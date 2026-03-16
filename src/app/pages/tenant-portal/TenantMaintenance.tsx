import { Wrench, Plus, Image as ImageIcon, Clock, CheckCircle2, AlertCircle } from "lucide-react";

export function TenantMaintenance() {
  const requests = [
    {
      id: 1,
      issue: "Dishwasher making noise",
      category: "Appliance",
      status: "completed",
      priority: "Low",
      submittedDate: "Mar 8, 2026",
      completedDate: "Mar 10, 2026",
      description: "Dishwasher is making loud grinding noise during wash cycle.",
      response: "Issue resolved. Pump was replaced by our technician.",
      hasPhoto: false
    },
    {
      id: 2,
      issue: "Bathroom faucet dripping",
      category: "Plumbing",
      status: "in-progress",
      priority: "Medium",
      submittedDate: "Mar 12, 2026",
      description: "Bathroom sink faucet has a slow drip that won't stop.",
      response: "Plumber scheduled for March 15th between 2-4 PM.",
      hasPhoto: true
    },
  ];

  const statusColors = {
    "in-progress": { bg: "bg-blue-50", border: "border-blue-200", text: "text-blue-700", icon: Clock },
    completed: { bg: "bg-green-50", border: "border-green-200", text: "text-green-700", icon: CheckCircle2 },
    pending: { bg: "bg-amber-50", border: "border-amber-200", text: "text-amber-700", icon: AlertCircle }
  };

  const categoryEmoji = {
    "Plumbing": "💧",
    "Electrical": "⚡",
    "Appliance": "🔧",
    "HVAC": "🌡️",
    "Other": "🏠"
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Maintenance Requests</h1>
            <p className="mt-2 text-slate-600">Submit and track maintenance issues</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors shadow-lg shadow-indigo-200">
            <Plus className="size-5" />
            New Request
          </button>
        </div>

        {/* Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-lg bg-blue-50">
                <Clock className="size-5 text-blue-600" />
              </div>
              <span className="text-sm text-slate-600">In Progress</span>
            </div>
            <p className="text-3xl font-bold text-slate-900">
              {requests.filter(r => r.status === "in-progress").length}
            </p>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-lg bg-green-50">
                <CheckCircle2 className="size-5 text-green-600" />
              </div>
              <span className="text-sm text-slate-600">Completed</span>
            </div>
            <p className="text-3xl font-bold text-slate-900">
              {requests.filter(r => r.status === "completed").length}
            </p>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-lg bg-purple-50">
                <Wrench className="size-5 text-purple-600" />
              </div>
              <span className="text-sm text-slate-600">Total Requests</span>
            </div>
            <p className="text-3xl font-bold text-slate-900">{requests.length}</p>
          </div>
        </div>

        {/* Submit New Request Card */}
        <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl p-6 text-white mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-lg bg-white/20 backdrop-blur-sm">
              <Plus className="size-6" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">Submit a New Request</h2>
              <p className="text-white/80 text-sm">Report any issues with your unit</p>
            </div>
          </div>
          <p className="mb-4 text-white/90">
            Our AI will analyze your request and prioritize it automatically. You'll receive updates via email and in your portal.
          </p>
          <button className="px-6 py-3 bg-white text-indigo-600 rounded-lg font-medium hover:bg-white/90 transition-colors">
            Create Maintenance Request
          </button>
        </div>

        {/* Requests List */}
        <div className="space-y-4">
          {requests.map((request) => {
            const statusStyle = statusColors[request.status as keyof typeof statusColors];
            const StatusIcon = statusStyle.icon;
            
            return (
              <div key={request.id} className={`bg-white rounded-xl border-2 ${statusStyle.border} p-6`}>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="text-4xl">
                      {categoryEmoji[request.category as keyof typeof categoryEmoji]}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900">{request.issue}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-sm text-slate-500">{request.category}</span>
                        <span className="text-slate-300">•</span>
                        <span className="text-sm text-slate-500">Submitted {request.submittedDate}</span>
                      </div>
                    </div>
                  </div>
                  <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg ${statusStyle.bg} ${statusStyle.border} border`}>
                    <StatusIcon className={`size-4 ${statusStyle.text}`} />
                    <span className={`text-sm font-medium ${statusStyle.text} capitalize`}>
                      {request.status === "in-progress" ? "In Progress" : request.status}
                    </span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-slate-500 mb-1">Your Description</p>
                    <p className="text-slate-700">{request.description}</p>
                  </div>

                  {request.hasPhoto && (
                    <div className="flex items-center gap-2 text-sm text-indigo-600">
                      <ImageIcon className="size-4" />
                      <span>Photo attached</span>
                    </div>
                  )}

                  {request.response && (
                    <div className={`p-4 rounded-lg ${statusStyle.bg} ${statusStyle.border} border`}>
                      <p className="text-sm font-medium text-slate-900 mb-1">Landlord Response</p>
                      <p className={`text-sm ${statusStyle.text}`}>{request.response}</p>
                    </div>
                  )}

                  {request.completedDate && (
                    <div className="flex items-center gap-2 text-sm text-green-600">
                      <CheckCircle2 className="size-4" />
                      <span>Completed on {request.completedDate}</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* AI Tips */}
        <div className="mt-6 p-6 rounded-xl bg-amber-50 border border-amber-200">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-amber-100">
              <AlertCircle className="size-5 text-amber-600" />
            </div>
            <div>
              <h3 className="font-semibold text-amber-900 mb-2">💡 Tips for Faster Resolution</h3>
              <ul className="text-sm text-amber-800 space-y-1">
                <li>• Include photos whenever possible</li>
                <li>• Describe the issue in detail (when it started, how often it occurs)</li>
                <li>• Mention if it's an emergency or safety concern</li>
                <li>• Be available for follow-up questions</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

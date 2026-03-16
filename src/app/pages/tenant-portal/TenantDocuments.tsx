import { FileText, Download, Eye, Calendar, Shield } from "lucide-react";

export function TenantDocuments() {
  const documents = [
    {
      id: 1,
      name: "Lease Agreement",
      type: "lease",
      date: "Jan 1, 2025",
      size: "245 KB",
      status: "signed",
      description: "Standard Ontario lease for Unit 4A"
    },
    {
      id: 2,
      name: "March 2026 Receipt",
      type: "receipt",
      date: "Mar 1, 2026",
      size: "92 KB",
      status: "available",
      description: "Payment receipt for March rent"
    },
    {
      id: 3,
      name: "February 2026 Receipt",
      type: "receipt",
      date: "Feb 1, 2026",
      size: "92 KB",
      status: "available",
      description: "Payment receipt for February rent"
    },
    {
      id: 4,
      name: "Move-In Inspection Report",
      type: "inspection",
      date: "Jan 1, 2025",
      size: "1.8 MB",
      status: "signed",
      description: "Property condition at move-in"
    },
    {
      id: 5,
      name: "Welcome Package",
      type: "info",
      date: "Jan 1, 2025",
      size: "420 KB",
      status: "available",
      description: "Building rules and landlord contact info"
    },
  ];

  const getDocIcon = (type: string) => {
    switch (type) {
      case "lease": return { color: "indigo", icon: "📄" };
      case "receipt": return { color: "green", icon: "🧾" };
      case "inspection": return { color: "blue", icon: "📋" };
      case "info": return { color: "purple", icon: "📌" };
      default: return { color: "slate", icon: "📁" };
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">Documents</h1>
          <p className="mt-2 text-slate-600">Access your lease, receipts, and important documents</p>
        </div>

        {/* Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-lg bg-indigo-50">
                <FileText className="size-5 text-indigo-600" />
              </div>
              <span className="text-sm text-slate-600">Total Documents</span>
            </div>
            <p className="text-3xl font-bold text-slate-900">{documents.length}</p>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-lg bg-green-50">
                <Shield className="size-5 text-green-600" />
              </div>
              <span className="text-sm text-slate-600">Signed Documents</span>
            </div>
            <p className="text-3xl font-bold text-slate-900">
              {documents.filter(d => d.status === "signed").length}
            </p>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-lg bg-purple-50">
                <Calendar className="size-5 text-purple-600" />
              </div>
              <span className="text-sm text-slate-600">Latest Update</span>
            </div>
            <p className="text-lg font-bold text-slate-900">Mar 1</p>
            <p className="text-xs text-slate-500">2026</p>
          </div>
        </div>

        {/* Active Lease */}
        <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl p-6 text-white mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-lg bg-white/20 backdrop-blur-sm">
              <FileText className="size-6" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">Current Lease Agreement</h2>
              <p className="text-white/80 text-sm">Unit 4A - 123 King Street, Toronto</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <p className="text-white/70 text-sm mb-1">Lease Period</p>
              <p className="font-semibold">Jan 1, 2025 - Dec 31, 2025</p>
            </div>
            <div>
              <p className="text-white/70 text-sm mb-1">Monthly Rent</p>
              <p className="font-semibold">$2,300</p>
            </div>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-white text-indigo-600 rounded-lg font-medium hover:bg-white/90 transition-colors">
              <Eye className="size-4" />
              View Lease
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-lg font-medium transition-colors">
              <Download className="size-4" />
              Download PDF
            </button>
          </div>
        </div>

        {/* All Documents */}
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-6">All Documents</h2>
          <div className="space-y-3">
            {documents.map((doc) => {
              const docStyle = getDocIcon(doc.type);
              return (
                <div key={doc.id} className="flex items-center justify-between p-4 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="text-3xl">{docStyle.icon}</div>
                    <div>
                      <h3 className="font-semibold text-slate-900">{doc.name}</h3>
                      <p className="text-sm text-slate-500 mt-1">{doc.description}</p>
                      <div className="flex items-center gap-3 mt-2 text-xs text-slate-400">
                        <span>{doc.date}</span>
                        <span>•</span>
                        <span>{doc.size}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {doc.status === "signed" && (
                      <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                        Signed
                      </span>
                    )}
                    <div className="flex gap-2">
                      <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                        <Eye className="size-4 text-slate-600" />
                      </button>
                      <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                        <Download className="size-4 text-slate-600" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* AI Document Help */}
        <div className="mt-6 p-6 rounded-xl bg-blue-50 border border-blue-200">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-blue-100">
              <Shield className="size-5 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-blue-900 mb-2">Need Help Understanding Your Lease?</h3>
              <p className="text-sm text-blue-800 mb-3">
                Our AI assistant can explain any clause or term in simple language. Just ask!
              </p>
              <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors">
                Ask AI Assistant
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

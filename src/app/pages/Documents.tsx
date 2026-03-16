import { 
  FileText, 
  Download, 
  Eye, 
  Search,
  Filter,
  Calendar,
  Building2,
  Users,
  CreditCard,
  AlertCircle
} from "lucide-react";
import { useState } from "react";

export function Documents() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");

  const documents = [
    {
      id: 1,
      name: "Standard Lease Agreement - Unit 4A",
      type: "lease",
      property: "123 King Street",
      unit: "4A",
      tenant: "John Doe",
      date: "Jan 1, 2025",
      size: "245 KB",
      status: "signed"
    },
    {
      id: 2,
      name: "N4 Notice - Non-Payment",
      type: "notice",
      property: "456 Queen Street West",
      unit: "3A",
      tenant: "Bob Johnson",
      date: "Mar 10, 2026",
      size: "128 KB",
      status: "pending"
    },
    {
      id: 3,
      name: "Payment Receipt - March 2026",
      type: "receipt",
      property: "789 Bloor Street",
      unit: "Unit 1",
      tenant: "Emma Wilson",
      date: "Mar 1, 2026",
      size: "92 KB",
      status: "processed"
    },
    {
      id: 4,
      name: "Tenant Application - Sarah Kim",
      type: "application",
      property: "123 King Street",
      unit: "5A",
      tenant: "Sarah Kim",
      date: "Mar 14, 2026",
      size: "1.2 MB",
      status: "approved"
    },
    {
      id: 5,
      name: "Standard Lease Agreement - Unit 1C",
      type: "lease",
      property: "456 Queen Street West",
      unit: "1C",
      tenant: "Alice Smith",
      date: "Mar 1, 2024",
      size: "238 KB",
      status: "signed"
    },
    {
      id: 6,
      name: "Maintenance Report - Plumbing",
      type: "maintenance",
      property: "456 Queen Street West",
      unit: "3A",
      tenant: "Bob Johnson",
      date: "Mar 12, 2026",
      size: "456 KB",
      status: "completed"
    },
    {
      id: 7,
      name: "Insurance Policy - 2026",
      type: "insurance",
      property: "All Properties",
      unit: "-",
      tenant: "-",
      date: "Jan 1, 2026",
      size: "890 KB",
      status: "active"
    },
  ];

  const documentTypes = {
    lease: { icon: FileText, color: "indigo", label: "Lease" },
    notice: { icon: AlertCircle, color: "amber", label: "Notice" },
    receipt: { icon: CreditCard, color: "green", label: "Receipt" },
    application: { icon: Users, color: "purple", label: "Application" },
    maintenance: { icon: Building2, color: "blue", label: "Maintenance" },
    insurance: { icon: FileText, color: "slate", label: "Insurance" }
  };

  const filteredDocs = documents.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.tenant.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.property.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === "all" || doc.type === filterType;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">Documents</h1>
          <p className="mt-2 text-slate-600">Manage leases, notices, receipts, and all property documents</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <div className="flex items-center gap-3 mb-2">
              <FileText className="size-5 text-indigo-600" />
              <span className="text-sm text-slate-600">Total Documents</span>
            </div>
            <p className="text-3xl font-bold text-slate-900">{documents.length}</p>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <div className="flex items-center gap-3 mb-2">
              <FileText className="size-5 text-purple-600" />
              <span className="text-sm text-slate-600">Active Leases</span>
            </div>
            <p className="text-3xl font-bold text-slate-900">
              {documents.filter(d => d.type === "lease" && d.status === "signed").length}
            </p>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <div className="flex items-center gap-3 mb-2">
              <AlertCircle className="size-5 text-amber-600" />
              <span className="text-sm text-slate-600">Pending Notices</span>
            </div>
            <p className="text-3xl font-bold text-slate-900">
              {documents.filter(d => d.type === "notice" && d.status === "pending").length}
            </p>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <div className="flex items-center gap-3 mb-2">
              <CreditCard className="size-5 text-green-600" />
              <span className="text-sm text-slate-600">Receipts</span>
            </div>
            <p className="text-3xl font-bold text-slate-900">
              {documents.filter(d => d.type === "receipt").length}
            </p>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search documents, tenants, properties..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-slate-400" />
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="pl-10 pr-8 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 appearance-none cursor-pointer"
              >
                <option value="all">All Types</option>
                <option value="lease">Leases</option>
                <option value="notice">Notices</option>
                <option value="receipt">Receipts</option>
                <option value="application">Applications</option>
                <option value="maintenance">Maintenance</option>
                <option value="insurance">Insurance</option>
              </select>
            </div>
          </div>
        </div>

        {/* Documents List */}
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Document</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Type</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Property</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Tenant</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Date</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Status</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-slate-900">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {filteredDocs.map((doc) => {
                  const docType = documentTypes[doc.type as keyof typeof documentTypes];
                  const Icon = docType.icon;
                  
                  return (
                    <tr key={doc.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-lg bg-${docType.color}-50`}>
                            <Icon className={`size-5 text-${docType.color}-600`} />
                          </div>
                          <div>
                            <p className="font-medium text-slate-900">{doc.name}</p>
                            <p className="text-sm text-slate-500">{doc.size}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium bg-${docType.color}-100 text-${docType.color}-700`}>
                          {docType.label}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-slate-900">{doc.property}</p>
                        <p className="text-xs text-slate-500">{doc.unit}</p>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-900">{doc.tenant}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-sm text-slate-600">
                          <Calendar className="size-4" />
                          <span>{doc.date}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${
                          doc.status === "signed" || doc.status === "active" || doc.status === "approved" || doc.status === "completed" || doc.status === "processed"
                            ? "bg-green-100 text-green-700"
                            : "bg-amber-100 text-amber-700"
                        }`}>
                          {doc.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                            <Eye className="size-4 text-slate-600" />
                          </button>
                          <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                            <Download className="size-4 text-slate-600" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {filteredDocs.length === 0 && (
          <div className="text-center py-12">
            <FileText className="size-12 text-slate-300 mx-auto mb-4" />
            <p className="text-slate-500">No documents found</p>
          </div>
        )}
      </div>
    </div>
  );
}

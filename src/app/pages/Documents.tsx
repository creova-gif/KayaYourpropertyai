import { toast } from "sonner";
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" style={{ background: '#F8F7F4', minHeight: '100vh', fontFamily: "'DM Sans', system-ui, sans-serif" }}>
        <div className="mb-8">
          <p className="text-[10px] font-semibold text-[#767570] uppercase tracking-wider mb-2">Document Management</p>
          <h1 className="text-[48px] font-normal text-[#0E0F0C] tracking-tight" style={{ fontFamily: "'Instrument Serif', Georgia, serif", letterSpacing: '-1px' }}>Documents</h1>
          <p className="mt-2 text-[14px] text-[#767570]">Organize and access all property documents in one place</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl border border-[rgba(0,0,0,0.07)] p-6">
            <div className="flex items-center gap-3 mb-2">
              <FileText className="size-5 text-[#0A7A52]" />
              <span className="text-[12px] text-[#767570] uppercase tracking-wider">Total Documents</span>
            </div>
            <p className="text-[36px] font-normal text-[#0E0F0C]" style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}>{documents.length}</p>
          </div>
          <div className="bg-white rounded-xl border border-[rgba(0,0,0,0.07)] p-6">
            <div className="flex items-center gap-3 mb-2">
              <FileText className="size-5 text-[#9333EA]" />
              <span className="text-[12px] text-[#767570] uppercase tracking-wider">Active Leases</span>
            </div>
            <p className="text-[36px] font-normal text-[#0E0F0C]" style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}>
              {documents.filter(d => d.type === "lease" && d.status === "signed").length}
            </p>
          </div>
          <div className="bg-white rounded-xl border border-[rgba(0,0,0,0.07)] p-6">
            <div className="flex items-center gap-3 mb-2">
              <AlertCircle className="size-5 text-[#F59E0B]" />
              <span className="text-[12px] text-[#767570] uppercase tracking-wider">Pending Notices</span>
            </div>
            <p className="text-[36px] font-normal text-[#0E0F0C]" style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}>
              {documents.filter(d => d.type === "notice" && d.status === "pending").length}
            </p>
          </div>
          <div className="bg-white rounded-xl border border-[rgba(0,0,0,0.07)] p-6">
            <div className="flex items-center gap-3 mb-2">
              <CreditCard className="size-5 text-[#0A7A52]" />
              <span className="text-[12px] text-[#767570] uppercase tracking-wider">Receipts</span>
            </div>
            <p className="text-[36px] font-normal text-[#0E0F0C]" style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}>
              {documents.filter(d => d.type === "receipt").length}
            </p>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-xl border border-[rgba(0,0,0,0.07)] p-6 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-[#767570]" />
              <input
                type="text"
                placeholder="Search documents, tenants, properties..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-[#F8F7F4] border border-[rgba(0,0,0,0.07)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0A7A52]/20 text-[#0E0F0C] text-[14px]"
              />
            </div>
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-[#767570]" />
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="pl-10 pr-8 py-3 bg-[#F8F7F4] border border-[rgba(0,0,0,0.07)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0A7A52]/20 appearance-none cursor-pointer text-[#0E0F0C] text-[14px]"
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
        <div className="bg-white rounded-xl border border-[rgba(0,0,0,0.07)] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#F8F7F4] border-b border-[rgba(0,0,0,0.07)]">
                <tr>
                  <th className="px-6 py-4 text-left text-[12px] font-semibold text-[#767570] uppercase tracking-wider">Document</th>
                  <th className="px-6 py-4 text-left text-[12px] font-semibold text-[#767570] uppercase tracking-wider">Type</th>
                  <th className="px-6 py-4 text-left text-[12px] font-semibold text-[#767570] uppercase tracking-wider">Property</th>
                  <th className="px-6 py-4 text-left text-[12px] font-semibold text-[#767570] uppercase tracking-wider">Tenant</th>
                  <th className="px-6 py-4 text-left text-[12px] font-semibold text-[#767570] uppercase tracking-wider">Date</th>
                  <th className="px-6 py-4 text-left text-[12px] font-semibold text-[#767570] uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-right text-[12px] font-semibold text-[#767570] uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[rgba(0,0,0,0.04)]">
                {filteredDocs.map((doc) => {
                  const docType = documentTypes[doc.type as keyof typeof documentTypes];
                  const Icon = docType.icon;
                  
                  return (
                    <tr key={doc.id} className="hover:bg-[#F8F7F4] transition-colors">
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-4">
                          <div className={`p-3 rounded-xl bg-${docType.color}-50 border border-${docType.color}-100`}>
                            <Icon className={`size-5 text-${docType.color}-600`} />
                          </div>
                          <div>
                            <p className="font-semibold text-slate-900 text-sm">{doc.name}</p>
                            <p className="text-xs text-slate-600 mt-1">{doc.size}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <span className={`inline-flex px-3 py-1.5 rounded-xl text-[11px] font-semibold uppercase tracking-wider bg-${docType.color}-50 text-${docType.color}-600 border border-${docType.color}-100`}>
                          {docType.label}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-[14px] text-[#0E0F0C] font-medium">{doc.property}</p>
                        <p className="text-[12px] text-[#767570]">{doc.unit}</p>
                      </td>
                      <td className="px-6 py-4 text-[14px] text-[#0E0F0C]">{doc.tenant}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-[13px] text-[#767570]">
                          <Calendar className="size-4" />
                          <span>{doc.date}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wider capitalize ${
                          doc.status === "signed" || doc.status === "active" || doc.status === "approved" || doc.status === "completed" || doc.status === "processed"
                            ? "bg-[#E5F4EE] text-[#0A7A52] border border-[#0A7A52]/20"
                            : "bg-[#FEF3E2] text-[#F59E0B] border border-[#F59E0B]/20"
                        }`}>
                          {doc.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <button onClick={() => toast.info(`Previewing ${doc.name}`)} className="p-2 hover:bg-[#F8F7F4] rounded-lg transition-colors">
                            <Eye className="size-4 text-[#767570]" />
                          </button>
                          <button onClick={() => toast.success(`${doc.name} downloaded`)} className="p-2 hover:bg-[#F8F7F4] rounded-lg transition-colors">
                            <Download className="size-4 text-[#767570]" />
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
            <FileText className="size-12 text-[#767570] opacity-30 mx-auto mb-4" />
            <p className="text-[#767570] text-[14px]">No documents found</p>
          </div>
        )}
      </div>
    </div>
  );
}
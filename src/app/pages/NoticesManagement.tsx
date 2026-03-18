import { useState } from "react";
import {
  Bell,
  Plus,
  Send,
  FileText,
  Calendar,
  Users,
  Building2,
  AlertTriangle,
  Info,
  Clock,
  Check,
  Eye,
  Download,
  Filter,
} from "lucide-react";

interface Notice {
  id: number;
  type: "rent_increase" | "lease_expiry" | "maintenance" | "policy_change" | "violation" | "general";
  title: string;
  description: string;
  recipients: string[];
  property: string;
  unit?: string;
  sentDate: string;
  status: "draft" | "sent" | "scheduled";
  priority: "high" | "medium" | "low";
  dueDate?: string;
}

export function NoticesManagement() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterType, setFilterType] = useState<string>("all");

  const notices: Notice[] = [
    {
      id: 1,
      type: "rent_increase",
      title: "Rent Increase Notice - 90 Days",
      description: "Notice of rent increase effective June 1, 2026. New monthly rent: $2,450",
      recipients: ["John Doe", "Sarah Kim"],
      property: "123 King Street",
      unit: "4A",
      sentDate: "Mar 1, 2026",
      status: "sent",
      priority: "high",
      dueDate: "Jun 1, 2026",
    },
    {
      id: 2,
      type: "lease_expiry",
      title: "Lease Renewal Notice",
      description: "Your lease is expiring on May 31, 2026. Please contact us to discuss renewal options.",
      recipients: ["Emma Rodriguez"],
      property: "456 Queen Street West",
      unit: "2B",
      sentDate: "Mar 10, 2026",
      status: "sent",
      priority: "medium",
      dueDate: "May 31, 2026",
    },
    {
      id: 3,
      type: "maintenance",
      title: "Building Maintenance Notification",
      description: "Water will be shut off on March 20 from 9 AM to 2 PM for plumbing repairs.",
      recipients: ["All Tenants - 123 King Street"],
      property: "123 King Street",
      sentDate: "Mar 14, 2026",
      status: "scheduled",
      priority: "high",
      dueDate: "Mar 20, 2026",
    },
    {
      id: 4,
      type: "policy_change",
      title: "Updated Pet Policy",
      description: "New building pet policy effective April 1, 2026. Maximum 2 pets per unit.",
      recipients: ["All Tenants"],
      property: "All Properties",
      sentDate: "Feb 28, 2026",
      status: "sent",
      priority: "low",
    },
    {
      id: 5,
      type: "general",
      title: "Holiday Office Hours",
      description: "Management office will be closed March 17-18 for St. Patrick's Day weekend.",
      recipients: ["All Tenants"],
      property: "All Properties",
      sentDate: "",
      status: "draft",
      priority: "low",
    },
  ];

  const noticeTemplates = [
    { type: "rent_increase", name: "Rent Increase Notice (90 Days)", icon: AlertTriangle },
    { type: "lease_expiry", name: "Lease Expiry Reminder", icon: Calendar },
    { type: "maintenance", name: "Maintenance Notification", icon: Building2 },
    { type: "policy_change", name: "Policy Change Announcement", icon: Info },
    { type: "violation", name: "Lease Violation Notice", icon: AlertTriangle },
    { type: "general", name: "General Announcement", icon: Bell },
  ];

  const filteredNotices = notices.filter((notice) => {
    if (filterStatus !== "all" && notice.status !== filterStatus) return false;
    if (filterType !== "all" && notice.type !== filterType) return false;
    return true;
  });

  const getNoticeIcon = (type: string) => {
    switch (type) {
      case "rent_increase":
      case "violation":
        return AlertTriangle;
      case "lease_expiry":
        return Calendar;
      case "maintenance":
        return Building2;
      case "policy_change":
      case "general":
        return Info;
      default:
        return Bell;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "sent":
        return "bg-green-100 text-green-700";
      case "scheduled":
        return "bg-blue-100 text-blue-700";
      case "draft":
        return "bg-slate-100 text-slate-700";
      default:
        return "bg-slate-100 text-slate-700";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-700";
      case "medium":
        return "bg-amber-100 text-amber-700";
      case "low":
        return "bg-green-100 text-green-700";
      default:
        return "bg-slate-100 text-slate-700";
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" style={{ background: '#F8F7F4', minHeight: '100vh', fontFamily: "'DM Sans', system-ui, sans-serif" }}>
        {/* Header */}
        <div className="mb-8">
          <p className="text-[10px] font-semibold text-[#767570] uppercase tracking-wider mb-2">Tenant Communication</p>
          <h1 className="text-[48px] font-normal text-[#0E0F0C] tracking-tight" style={{ fontFamily: "'Instrument Serif', Georgia, serif", letterSpacing: '-1px' }}>Notices Management</h1>
          <p className="mt-2 text-[14px] text-[#767570]">Send compliant notices to tenants with AI-powered templates</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-[#F8F7F4] rounded-2xl border border-[#0A7A52]/10 p-6 hover:border-[#0A7A52]/20 transition-all">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2.5 rounded-xl bg-[#0A7A52]/5">
                <FileText className="size-5 text-[#0A7A52]" />
              </div>
              <span className="text-sm font-medium text-slate-600">Total Notices</span>
            </div>
            <p className="text-3xl font-serif font-semibold text-slate-900">{notices.length}</p>
          </div>

          <div className="bg-[#F8F7F4] rounded-2xl border border-[#0A7A52]/10 p-6 hover:border-[#0A7A52]/20 transition-all">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2.5 rounded-xl bg-emerald-50">
                <Check className="size-5 text-emerald-600" />
              </div>
              <span className="text-sm font-medium text-slate-600">Sent</span>
            </div>
            <p className="text-3xl font-serif font-semibold text-slate-900">
              {notices.filter((n) => n.status === "sent").length}
            </p>
          </div>

          <div className="bg-[#F8F7F4] rounded-2xl border border-[#0A7A52]/10 p-6 hover:border-[#0A7A52]/20 transition-all">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2.5 rounded-xl bg-amber-50">
                <Clock className="size-5 text-amber-600" />
              </div>
              <span className="text-sm font-medium text-slate-600">Scheduled</span>
            </div>
            <p className="text-3xl font-serif font-semibold text-slate-900">
              {notices.filter((n) => n.status === "scheduled").length}
            </p>
          </div>

          <div className="bg-[#F8F7F4] rounded-2xl border border-[#0A7A52]/10 p-6 hover:border-[#0A7A52]/20 transition-all">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2.5 rounded-xl bg-slate-100">
                <FileText className="size-5 text-slate-600" />
              </div>
              <span className="text-sm font-medium text-slate-600">Drafts</span>
            </div>
            <p className="text-3xl font-serif font-semibold text-slate-900">
              {notices.filter((n) => n.status === "draft").length}
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-[#F8F7F4] rounded-2xl border border-[#0A7A52]/10 p-5 mb-6">
          <div className="flex items-center gap-4">
            <Filter className="size-5 text-[#0A7A52]" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2.5 border border-[#0A7A52]/20 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-[#0A7A52] focus:border-[#0A7A52] hover:border-[#0A7A52]/40 transition-all text-sm font-medium text-slate-700"
            >
              <option value="all">All Status</option>
              <option value="sent">Sent</option>
              <option value="scheduled">Scheduled</option>
              <option value="draft">Draft</option>
            </select>

            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-4 py-2.5 border border-[#0A7A52]/20 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-[#0A7A52] focus:border-[#0A7A52] hover:border-[#0A7A52]/40 transition-all text-sm font-medium text-slate-700"
            >
              <option value="all">All Types</option>
              <option value="rent_increase">Rent Increase</option>
              <option value="lease_expiry">Lease Expiry</option>
              <option value="maintenance">Maintenance</option>
              <option value="policy_change">Policy Change</option>
              <option value="violation">Violation</option>
              <option value="general">General</option>
            </select>
          </div>
        </div>

        {/* Notices List */}
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="divide-y divide-slate-200">
            {filteredNotices.map((notice) => {
              const Icon = getNoticeIcon(notice.type);
              return (
                <div key={notice.id} className="p-6 hover:bg-slate-50 transition-colors">
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-lg ${
                      notice.priority === "high" ? "bg-red-50" :
                      notice.priority === "medium" ? "bg-amber-50" : "bg-blue-50"
                    }`}>
                      <Icon className={`size-6 ${
                        notice.priority === "high" ? "text-red-600" :
                        notice.priority === "medium" ? "text-amber-600" : "text-blue-600"
                      }`} />
                    </div>

                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="text-lg font-semibold text-slate-900 mb-1">{notice.title}</h3>
                          <p className="text-slate-600 text-sm mb-3">{notice.description}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(notice.status)}`}>
                            {notice.status}
                          </span>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getPriorityColor(notice.priority)}`}>
                            {notice.priority}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-6 text-sm text-slate-600 mb-4">
                        <div className="flex items-center gap-2">
                          <Building2 className="size-4" />
                          <span>{notice.property}</span>
                          {notice.unit && <span>• Unit {notice.unit}</span>}
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="size-4" />
                          <span>{notice.recipients.length} recipient{notice.recipients.length > 1 ? "s" : ""}</span>
                        </div>
                        {notice.sentDate && (
                          <div className="flex items-center gap-2">
                            <Calendar className="size-4" />
                            <span>{notice.sentDate}</span>
                          </div>
                        )}
                        {notice.dueDate && (
                          <div className="flex items-center gap-2">
                            <Clock className="size-4" />
                            <span>Due: {notice.dueDate}</span>
                          </div>
                        )}
                      </div>

                      <div className="flex items-center gap-3">
                        <button className="flex items-center gap-2 px-3 py-1.5 text-sm bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-lg font-medium transition-colors">
                          <Eye className="size-4" />
                          View
                        </button>
                        {notice.status === "draft" && (
                          <button className="flex items-center gap-2 px-3 py-1.5 text-sm bg-green-50 hover:bg-green-100 text-green-700 rounded-lg font-medium transition-colors">
                            <Send className="size-4" />
                            Send Now
                          </button>
                        )}
                        <button className="flex items-center gap-2 px-3 py-1.5 text-sm border border-slate-300 hover:bg-slate-50 text-slate-700 rounded-lg font-medium transition-colors">
                          <Download className="size-4" />
                          Download PDF
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Notice Templates */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-slate-900 mb-4">LTB-Compliant Templates</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {noticeTemplates.map((template, idx) => {
              const Icon = template.icon;
              return (
                <button
                  key={idx}
                  className="p-4 bg-white rounded-xl border border-slate-200 hover:border-indigo-300 hover:shadow-lg transition-all text-left group"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 rounded-lg bg-indigo-50 group-hover:bg-indigo-100 transition-colors">
                      <Icon className="size-5 text-indigo-600" />
                    </div>
                    <h4 className="font-semibold text-slate-900">{template.name}</h4>
                  </div>
                  <p className="text-sm text-slate-600">Use pre-approved template</p>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Create Notice Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-slate-900">Create New Notice</h2>
              <button
                onClick={() => setShowCreateModal(false)}
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <Plus className="size-5 text-slate-500 rotate-45" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Notice Type *</label>
                <select className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                  <option value="">Select notice type...</option>
                  <option value="rent_increase">Rent Increase Notice</option>
                  <option value="lease_expiry">Lease Expiry Reminder</option>
                  <option value="maintenance">Maintenance Notification</option>
                  <option value="policy_change">Policy Change</option>
                  <option value="violation">Lease Violation</option>
                  <option value="general">General Announcement</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Title *</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Notice title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Description *</label>
                <textarea
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Notice details..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Property *</label>
                  <select className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                    <option value="">Select property...</option>
                    <option value="all">All Properties</option>
                    <option value="1">123 King Street</option>
                    <option value="2">456 Queen Street West</option>
                    <option value="3">789 Bloor Street</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Priority *</label>
                  <select className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Recipients *</label>
                <select className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                  <option value="all">All Tenants</option>
                  <option value="property">All Tenants in Selected Property</option>
                  <option value="specific">Specific Tenants</option>
                </select>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowCreateModal(false)}
                className="flex-1 px-4 py-3 border border-slate-300 text-slate-700 rounded-lg font-medium hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
              <button className="flex-1 px-4 py-3 bg-slate-600 hover:bg-slate-700 text-white rounded-lg font-medium transition-colors">
                Save as Draft
              </button>
              <button className="flex-1 px-4 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors">
                Send Notice
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
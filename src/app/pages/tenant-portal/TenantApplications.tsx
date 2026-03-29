import { useState } from "react";
import { Link } from "react-router";
import {
  Building2, Clock, CheckCircle2, XCircle, AlertTriangle,
  FileText, MessageSquare, Download, Eye, MapPin, Calendar,
  DollarSign, TrendingUp, Sparkles,
} from "lucide-react";
import { motion } from "motion/react";

const G = "#0A7A52";
const GL = "#E5F4EE";
const TX = "#0E0F0C";
const MU = "#767570";
const SANS = "'DM Sans', system-ui, sans-serif";
const SERIF = "'Instrument Serif', Georgia, serif";

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

const STATUS_CONFIG = {
  pending:   { bg: "#FEF3C7", text: "#B45309", border: "rgba(180,83,9,0.15)",   label: "Pending Review",  Icon: Clock },
  reviewing: { bg: GL,        text: G,          border: `${G}22`,                label: "Under Review",    Icon: TrendingUp },
  approved:  { bg: GL,        text: G,          border: `${G}22`,                label: "Approved",        Icon: CheckCircle2 },
  rejected:  { bg: "#FEF2F2", text: "#DC2626",  border: "rgba(220,38,38,0.12)", label: "Not Selected",    Icon: XCircle },
  waitlist:  { bg: "#FEF3C7", text: "#B45309",  border: "rgba(180,83,9,0.15)",  label: "Waitlisted",      Icon: AlertTriangle },
};

export function TenantApplications() {
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);

  const applications: Application[] = [
    {
      id: 1, propertyId: 1,
      propertyTitle: "Modern Downtown 2BR Condo",
      propertyAddress: "123 King Street West, Toronto",
      propertyRent: 2300, status: "reviewing",
      submittedDate: "Mar 13, 2026", lastUpdated: "Mar 14, 2026 - 10:30 AM",
      aiScore: 92,
      nextSteps: ["AI screening complete - High score!", "Landlord is reviewing your application", "Estimated decision: 1-2 business days"],
    },
    {
      id: 2, propertyId: 4,
      propertyTitle: "Luxury 3BR Penthouse",
      propertyAddress: "100 Harbour Street, Toronto",
      propertyRent: 4200, status: "waitlist",
      submittedDate: "Mar 10, 2026", lastUpdated: "Mar 12, 2026 - 3:45 PM",
      aiScore: 88,
      landlordMessage: "Thank you for your application! You're currently #2 on our waitlist. We'll notify you if the unit becomes available.",
      nextSteps: ["You are #2 on the waitlist", "First applicant has 48 hours to respond", "We'll notify you of any updates"],
    },
    {
      id: 3, propertyId: 5,
      propertyTitle: "Cozy 1BR Near Subway",
      propertyAddress: "234 Yonge Street, Toronto",
      propertyRent: 1850, status: "approved",
      submittedDate: "Mar 8, 2026", lastUpdated: "Mar 9, 2026 - 2:15 PM",
      aiScore: 95,
      landlordMessage: "Congratulations! Your application has been approved. Please review and sign the lease agreement.",
      nextSteps: ["Review lease agreement", "Sign digitally within 48 hours", "Arrange first month's rent + deposit", "Schedule move-in inspection"],
    },
    {
      id: 4, propertyId: 2,
      propertyTitle: "Spacious Student Housing",
      propertyAddress: "456 College Avenue, Toronto",
      propertyRent: 850, status: "rejected",
      submittedDate: "Mar 5, 2026", lastUpdated: "Mar 7, 2026 - 11:00 AM",
      landlordMessage: "Thank you for your interest. We've decided to move forward with another applicant whose availability better matched our timeline.",
      nextSteps: ["Browse other available properties", "Update your profile if needed"],
    },
  ];

  return (
    <div style={{ fontFamily: SANS }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <p style={{ fontSize: 11, fontWeight: 700, color: MU, textTransform: "uppercase", letterSpacing: "0.7px", marginBottom: 4 }}>Applications</p>
          <h1 style={{ fontFamily: SERIF, fontSize: 36, fontWeight: 400, color: TX, letterSpacing: "-1px", lineHeight: 1 }}>My Applications</h1>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Active", count: applications.filter(a => a.status === "reviewing" || a.status === "pending").length, Icon: TrendingUp, color: G, bg: GL },
            { label: "Approved", count: applications.filter(a => a.status === "approved").length, Icon: CheckCircle2, color: G, bg: GL },
            { label: "Waitlist", count: applications.filter(a => a.status === "waitlist").length, Icon: AlertTriangle, color: "#B45309", bg: "#FEF3C7" },
            { label: "Total", count: applications.length, Icon: FileText, color: TX, bg: "#F8F7F4" },
          ].map(s => (
            <motion.div key={s.label} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
              style={{ background: "#fff", borderRadius: 14, padding: "18px 20px", border: "1px solid rgba(0,0,0,0.07)" }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                <div style={{ width: 30, height: 30, borderRadius: 8, background: s.bg, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <s.Icon size={14} color={s.color} strokeWidth={2.5} />
                </div>
                <span style={{ fontSize: 11, color: MU, fontWeight: 500 }}>{s.label}</span>
              </div>
              <p style={{ fontFamily: SERIF, fontSize: 32, fontWeight: 400, color: TX, margin: 0 }}>{s.count}</p>
            </motion.div>
          ))}
        </div>

        {/* Applications List + Detail Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* List */}
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {applications.map((app, idx) => {
              const sc = STATUS_CONFIG[app.status];
              const StatusIcon = sc.Icon;
              const isSelected = selectedApp?.id === app.id;
              return (
                <motion.div
                  key={app.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  onClick={() => setSelectedApp(app)}
                  style={{
                    background: "#fff", borderRadius: 16,
                    border: isSelected ? `2px solid ${G}` : "2px solid rgba(0,0,0,0.07)",
                    padding: "20px 22px", cursor: "pointer",
                    boxShadow: isSelected ? `0 8px 30px ${G}15` : "0 2px 8px rgba(0,0,0,0.03)",
                    transition: "all 0.2s",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 16, gap: 12 }}>
                    <div>
                      <h3 style={{ fontSize: 15, fontWeight: 700, color: TX, margin: "0 0 6px" }}>{app.propertyTitle}</h3>
                      <div style={{ display: "flex", alignItems: "center", gap: 4, marginBottom: 4 }}>
                        <MapPin size={13} color={MU} strokeWidth={2.5} />
                        <span style={{ fontSize: 12, color: MU }}>{app.propertyAddress}</span>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                        <DollarSign size={13} color={MU} strokeWidth={2.5} />
                        <span style={{ fontSize: 13, fontWeight: 600, color: TX }}>${app.propertyRent.toLocaleString()}/mo</span>
                      </div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "6px 12px", borderRadius: 9, background: sc.bg, border: `1px solid ${sc.border}`, flexShrink: 0 }}>
                      <StatusIcon size={13} color={sc.text} strokeWidth={2.5} />
                      <span style={{ fontSize: 11, fontWeight: 700, color: sc.text }}>{sc.label}</span>
                    </div>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: 14, borderTop: "1px solid rgba(0,0,0,0.05)" }}>
                    <div>
                      <p style={{ fontSize: 11, color: MU, margin: "0 0 2px" }}>Submitted</p>
                      <p style={{ fontSize: 13, fontWeight: 600, color: TX, margin: 0 }}>{app.submittedDate}</p>
                    </div>
                    {app.aiScore && (
                      <div style={{ textAlign: "right" }}>
                        <p style={{ fontSize: 11, color: MU, margin: "0 0 2px" }}>AI Score</p>
                        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                          <Sparkles size={13} color={G} strokeWidth={2.5} />
                          <span style={{ fontSize: 16, fontWeight: 700, color: G }}>{app.aiScore}/100</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {app.status === "approved" && (
                    <div style={{ marginTop: 14 }}>
                      <Link
                        to={`/tenant/lease-signing`}
                        style={{ display: "block", width: "100%", padding: "11px 16px", background: G, color: "#fff", borderRadius: 10, fontWeight: 700, fontSize: 14, textAlign: "center", textDecoration: "none", boxSizing: "border-box" }}
                      >
                        View & Sign Lease →
                      </Link>
                    </div>
                  )}
                </motion.div>
              );
            })}

            {applications.length === 0 && (
              <div style={{ background: "#fff", borderRadius: 16, border: "1px solid rgba(0,0,0,0.07)", padding: "48px 24px", textAlign: "center" }}>
                <FileText size={42} color="rgba(0,0,0,0.12)" strokeWidth={1.5} style={{ margin: "0 auto 16px" }} />
                <h3 style={{ fontSize: 16, fontWeight: 600, color: TX, marginBottom: 8 }}>No Applications Yet</h3>
                <p style={{ fontSize: 14, color: MU, marginBottom: 20 }}>Browse properties and submit your first application</p>
                <Link
                  to="/listings"
                  style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "11px 22px", background: G, color: "#fff", borderRadius: 10, fontWeight: 700, fontSize: 14, textDecoration: "none" }}
                >
                  <Building2 size={16} strokeWidth={2.5} />
                  Browse Properties
                </Link>
              </div>
            )}
          </div>

          {/* Detail Panel */}
          {selectedApp ? (
            <motion.div
              key={selectedApp.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              style={{ background: "#fff", borderRadius: 16, border: "1px solid rgba(0,0,0,0.07)", padding: "24px 26px", height: "fit-content", position: "sticky", top: 24 }}
            >
              {/* Title */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18, gap: 12 }}>
                <h2 style={{ fontFamily: SERIF, fontSize: 20, fontWeight: 400, color: TX, margin: 0 }}>Application Details</h2>
                {(() => {
                  const sc = STATUS_CONFIG[selectedApp.status];
                  const StatusIcon = sc.Icon;
                  return (
                    <div style={{ display: "flex", alignItems: "center", gap: 5, padding: "5px 11px", borderRadius: 8, background: sc.bg, border: `1px solid ${sc.border}` }}>
                      <StatusIcon size={12} color={sc.text} strokeWidth={2.5} />
                      <span style={{ fontSize: 10, fontWeight: 700, color: sc.text }}>{sc.label}</span>
                    </div>
                  );
                })()}
              </div>

              {/* Property */}
              <div style={{ padding: "14px 16px", background: "#F8F7F4", borderRadius: 12, marginBottom: 18 }}>
                <h3 style={{ fontSize: 14, fontWeight: 700, color: TX, margin: "0 0 4px" }}>{selectedApp.propertyTitle}</h3>
                <p style={{ fontSize: 12, color: MU, margin: "0 0 10px" }}>{selectedApp.propertyAddress}</p>
                <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                  <Calendar size={12} color={MU} strokeWidth={2.5} />
                  <span style={{ fontSize: 12, color: MU }}>Submitted {selectedApp.submittedDate}</span>
                </div>
              </div>

              {/* AI Score */}
              {selectedApp.aiScore && (
                <div style={{ padding: "14px 16px", borderRadius: 12, background: GL, border: `1px solid ${G}20`, marginBottom: 18 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                    <Sparkles size={15} color={G} strokeWidth={2.5} />
                    <h3 style={{ fontSize: 13, fontWeight: 700, color: TX, margin: 0 }}>AI Risk Score</h3>
                  </div>
                  <div style={{ fontFamily: SERIF, fontSize: 38, fontWeight: 400, color: G, marginBottom: 6 }}>{selectedApp.aiScore}/100</div>
                  <p style={{ fontSize: 12, color: "#3D6B55", margin: 0, lineHeight: 1.5 }}>
                    {selectedApp.aiScore >= 90
                      ? "Excellent! You're a top candidate for this property."
                      : selectedApp.aiScore >= 80
                      ? "Strong application with good approval chances."
                      : "Your application is being carefully reviewed."}
                  </p>
                </div>
              )}

              {/* Timeline */}
              <div style={{ marginBottom: 18 }}>
                <h3 style={{ fontSize: 12, fontWeight: 700, color: TX, margin: "0 0 12px", textTransform: "uppercase", letterSpacing: "0.5px" }}>Timeline</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {[
                    { label: "Application Submitted", time: selectedApp.submittedDate, done: true },
                    { label: "AI Screening Complete", time: selectedApp.submittedDate, done: true },
                    ...(selectedApp.status === "reviewing"
                      ? [{ label: "Landlord Review", time: "In Progress", done: false, pulse: true }]
                      : []),
                    ...(selectedApp.status === "approved"
                      ? [
                          { label: "Application Approved", time: selectedApp.lastUpdated, done: true },
                          { label: "Lease Agreement Ready", time: "Action Required", done: false, warn: true },
                        ]
                      : []),
                    ...(selectedApp.status === "rejected"
                      ? [{ label: "Application Closed", time: selectedApp.lastUpdated, done: false, err: true }]
                      : []),
                    ...(selectedApp.status === "waitlist"
                      ? [{ label: "Added to Waitlist", time: selectedApp.lastUpdated, done: false }]
                      : []),
                  ].map((step, idx) => (
                    <div key={idx} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                      <div style={{
                        width: 30, height: 30, borderRadius: 8, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center",
                        background: step.done ? GL : step.warn ? "#FEF3C7" : step.err ? "#FEF2F2" : GL,
                      }}>
                        {step.done
                          ? <CheckCircle2 size={14} color={G} strokeWidth={2.5} />
                          : step.warn
                          ? <FileText size={14} color="#B45309" strokeWidth={2.5} />
                          : step.err
                          ? <XCircle size={14} color="#DC2626" strokeWidth={2.5} />
                          : <Clock size={14} color={G} strokeWidth={2.5} />}
                      </div>
                      <div>
                        <p style={{ fontSize: 13, fontWeight: 600, color: TX, margin: "4px 0 2px" }}>{step.label}</p>
                        <p style={{ fontSize: 11, color: MU, margin: 0 }}>{step.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Landlord message */}
              {selectedApp.landlordMessage && (
                <div style={{ padding: "12px 14px", background: GL, borderRadius: 10, border: `1px solid ${G}22`, marginBottom: 18 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 6 }}>
                    <MessageSquare size={14} color={G} strokeWidth={2.5} />
                    <h3 style={{ fontSize: 12, fontWeight: 700, color: "#085040", margin: 0 }}>Message from Landlord</h3>
                  </div>
                  <p style={{ fontSize: 12, color: "#3D6B55", margin: 0, lineHeight: 1.6 }}>{selectedApp.landlordMessage}</p>
                </div>
              )}

              {/* Next Steps */}
              {selectedApp.nextSteps && selectedApp.nextSteps.length > 0 && (
                <div style={{ marginBottom: 18 }}>
                  <h3 style={{ fontSize: 12, fontWeight: 700, color: TX, margin: "0 0 10px", textTransform: "uppercase", letterSpacing: "0.5px" }}>Next Steps</h3>
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    {selectedApp.nextSteps.map((step, idx) => (
                      <div key={idx} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                        <div style={{ width: 22, height: 22, borderRadius: "50%", background: GL, border: `1px solid ${G}25`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                          <span style={{ fontSize: 10, fontWeight: 800, color: G }}>{idx + 1}</span>
                        </div>
                        <span style={{ fontSize: 13, color: TX, marginTop: 3, lineHeight: 1.5 }}>{step}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Actions */}
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {selectedApp.status === "approved" && (
                  <Link
                    to={`/tenant/lease-signing`}
                    style={{ display: "block", width: "100%", padding: "13px 16px", background: G, color: "#fff", borderRadius: 10, fontWeight: 700, fontSize: 14, textAlign: "center", textDecoration: "none", boxSizing: "border-box" }}
                  >
                    View & Sign Lease Agreement
                  </Link>
                )}
                <button style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 7, padding: "11px 16px", border: "1px solid rgba(0,0,0,0.08)", color: MU, borderRadius: 10, fontSize: 13, fontWeight: 600, cursor: "pointer", background: "#fff", fontFamily: SANS }}>
                  <Eye size={14} strokeWidth={2.5} /> View Full Application
                </button>
                <button style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 7, padding: "11px 16px", border: "1px solid rgba(0,0,0,0.08)", color: MU, borderRadius: 10, fontSize: 13, fontWeight: 600, cursor: "pointer", background: "#fff", fontFamily: SANS }}>
                  <Download size={14} strokeWidth={2.5} /> Download PDF
                </button>
                {(selectedApp.status === "reviewing" || selectedApp.status === "waitlist") && (
                  <button style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 7, padding: "11px 16px", border: "1px solid rgba(220,38,38,0.2)", color: "#DC2626", borderRadius: 10, fontSize: 13, fontWeight: 600, cursor: "pointer", background: "#FEF2F2", fontFamily: SANS }}>
                    <XCircle size={14} strokeWidth={2.5} /> Withdraw Application
                  </button>
                )}
              </div>
            </motion.div>
          ) : (
            <div style={{ background: "#fff", borderRadius: 16, border: "1px solid rgba(0,0,0,0.07)", padding: "48px 24px", display: "flex", alignItems: "center", justifyContent: "center", position: "sticky", top: 24, height: "fit-content" }}>
              <div style={{ textAlign: "center" }}>
                <FileText size={40} color="rgba(0,0,0,0.1)" strokeWidth={1.5} style={{ margin: "0 auto 12px" }} />
                <p style={{ fontSize: 14, color: MU }}>Select an application to view details</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

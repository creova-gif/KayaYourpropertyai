import { Wrench, Plus, Clock, CheckCircle2, AlertCircle, Droplets, Zap, Thermometer, Home, Sparkles, Camera } from "lucide-react";
import { useState } from "react";
import { motion } from "motion/react";

const G = "#0A7A52";
const GL = "#E5F4EE";
const TX = "#0E0F0C";
const MU = "#767570";
const SANS = "'DM Sans', system-ui, sans-serif";
const SERIF = "'Instrument Serif', Georgia, serif";

type LIcon = React.ComponentType<{ size?: number; color?: string; strokeWidth?: number }>;

const categoryIcon: Record<string, LIcon> = {
  Plumbing: Droplets,
  Electrical: Zap,
  Appliance: Wrench,
  HVAC: Thermometer,
  Other: Home,
};

export function TenantMaintenance() {
  const [showNewRequest, setShowNewRequest] = useState(false);
  const [newIssue, setNewIssue] = useState("");
  const [newCategory, setNewCategory] = useState("Plumbing");

  const requests = [
    {
      id: 1,
      issue: "Dishwasher making noise",
      category: "Appliance",
      status: "completed" as const,
      priority: "Low",
      submittedDate: "Mar 8, 2026",
      completedDate: "Mar 10, 2026",
      description: "Dishwasher is making loud grinding noise during wash cycle.",
      response: "Issue resolved. Pump was replaced by our technician.",
      hasPhoto: false,
    },
    {
      id: 2,
      issue: "Bathroom faucet dripping",
      category: "Plumbing",
      status: "in-progress" as const,
      priority: "Medium",
      submittedDate: "Mar 12, 2026",
      description: "Bathroom sink faucet has a slow drip that won't stop.",
      response: "Plumber scheduled for March 15th between 2–4 PM.",
      hasPhoto: true,
    },
  ];

  const statusStyle = {
    "in-progress": { bg: "#EFF6FF", border: "rgba(29,78,216,0.15)", text: "#1D4ED8", label: "In Progress", Icon: Clock },
    completed: { bg: GL, border: `rgba(10,122,82,0.15)`, text: G, label: "Completed", Icon: CheckCircle2 },
    pending: { bg: "#FEF3C7", border: "rgba(180,83,9,0.15)", text: "#B45309", label: "Pending", Icon: AlertCircle },
  };

  return (
    <div style={{ fontFamily: SANS }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
            <div>
              <p style={{ fontSize: 11, fontWeight: 700, color: MU, textTransform: "uppercase", letterSpacing: "0.7px", marginBottom: 4 }}>Maintenance</p>
              <h1 style={{ fontFamily: SERIF, fontSize: 36, fontWeight: 400, color: TX, letterSpacing: "-1px", lineHeight: 1 }}>Maintenance Requests</h1>
            </div>
            <button
              onClick={() => setShowNewRequest(true)}
              style={{ display: "flex", alignItems: "center", gap: 8, padding: "11px 20px", background: G, color: "#fff", borderRadius: 12, border: "none", fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: SANS, boxShadow: `0 4px 14px ${G}40` }}
            >
              <Plus size={16} strokeWidth={2.5} />
              New Request
            </button>
          </div>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { label: "In Progress", value: requests.filter(r => r.status === "in-progress").length, color: "#1D4ED8", bg: "#EFF6FF", Icon: Clock },
            { label: "Completed", value: requests.filter(r => r.status === "completed").length, color: G, bg: GL, Icon: CheckCircle2 },
            { label: "Total Requests", value: requests.length, color: TX, bg: "#F8F7F4", Icon: Wrench },
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
              <p style={{ fontFamily: SERIF, fontSize: 32, fontWeight: 400, color: TX, margin: 0 }}>{s.value}</p>
            </motion.div>
          ))}
        </div>

        {/* Submit card */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-2xl p-7 sm:p-8 mb-7"
          style={{ background: `linear-gradient(135deg, ${G} 0%, #065E3C 100%)`, boxShadow: `0 16px 48px ${G}35` }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 14 }}>
            <div style={{ width: 46, height: 46, borderRadius: 12, background: "rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Plus size={22} color="#fff" strokeWidth={2.5} />
            </div>
            <div>
              <h2 style={{ fontSize: 18, fontWeight: 600, color: "#fff", margin: 0 }}>Submit a New Request</h2>
              <p style={{ fontSize: 13, color: "rgba(255,255,255,0.65)", margin: "3px 0 0" }}>AI will prioritize and route automatically</p>
            </div>
          </div>
          <p style={{ fontSize: 14, color: "rgba(255,255,255,0.8)", marginBottom: 20, lineHeight: 1.6 }}>
            Describe your issue and our AI will analyze it, assign a priority, and notify your landlord. You'll receive updates via email and in the portal.
          </p>
          <button
            onClick={() => setShowNewRequest(true)}
            style={{ padding: "12px 24px", background: "#fff", color: G, borderRadius: 12, border: "none", fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: SANS }}
          >
            Create Maintenance Request
          </button>
        </motion.div>

        {/* Requests list */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 24 }}>
          {requests.map((request, idx) => {
            const ss = statusStyle[request.status];
            const StatusIcon = ss.Icon;
            const CatIcon = categoryIcon[request.category] || Home;
            return (
              <motion.div
                key={request.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + idx * 0.05 }}
                style={{ background: "#fff", borderRadius: 16, padding: "22px 24px", border: "1px solid rgba(0,0,0,0.07)", boxShadow: "0 2px 8px rgba(0,0,0,0.03)" }}
              >
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 16, gap: 12 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                    <div style={{ width: 46, height: 46, borderRadius: 12, background: "#F8F7F4", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <CatIcon size={20} color={MU} strokeWidth={2} />
                    </div>
                    <div>
                      <h3 style={{ fontSize: 16, fontWeight: 600, color: TX, margin: 0 }}>{request.issue}</h3>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 3 }}>
                        <span style={{ fontSize: 12, color: MU }}>{request.category}</span>
                        <span style={{ fontSize: 10, color: "rgba(0,0,0,0.2)" }}>•</span>
                        <span style={{ fontSize: 12, color: MU }}>Submitted {request.submittedDate}</span>
                      </div>
                    </div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "6px 12px", borderRadius: 9, background: ss.bg, border: `1px solid ${ss.border}`, flexShrink: 0 }}>
                    <StatusIcon size={13} color={ss.text} strokeWidth={2.5} />
                    <span style={{ fontSize: 12, fontWeight: 700, color: ss.text }}>{ss.label}</span>
                  </div>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  <div>
                    <p style={{ fontSize: 11, color: MU, fontWeight: 600, marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.5px" }}>Your Description</p>
                    <p style={{ fontSize: 14, color: TX, margin: 0, lineHeight: 1.6 }}>{request.description}</p>
                  </div>

                  {request.hasPhoto && (
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <Camera size={13} color={G} strokeWidth={2.5} />
                      <span style={{ fontSize: 12, color: G, fontWeight: 600 }}>Photo attached</span>
                    </div>
                  )}

                  {request.response && (
                    <div style={{ padding: "12px 16px", borderRadius: 10, background: ss.bg, border: `1px solid ${ss.border}` }}>
                      <p style={{ fontSize: 11, fontWeight: 700, color: TX, margin: "0 0 4px", textTransform: "uppercase", letterSpacing: "0.5px" }}>Landlord Response</p>
                      <p style={{ fontSize: 13, color: ss.text, margin: 0, lineHeight: 1.5 }}>{request.response}</p>
                    </div>
                  )}

                  {"completedDate" in request && request.completedDate && (
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <CheckCircle2 size={13} color={G} strokeWidth={2.5} />
                      <span style={{ fontSize: 12, color: G, fontWeight: 600 }}>Completed on {request.completedDate}</span>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* AI tips */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          style={{ background: GL, borderRadius: 14, padding: "18px 22px", border: `1px solid ${G}20`, cursor: "pointer" }}
          onClick={() => window.dispatchEvent(new CustomEvent("openAIWithQuery", { detail: { query: "What are tips for faster maintenance resolution?" } }))}
        >
          <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
            <div style={{ width: 34, height: 34, borderRadius: 9, background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, boxShadow: "0 2px 6px rgba(0,0,0,0.06)" }}>
              <Sparkles size={16} color={G} strokeWidth={2.5} />
            </div>
            <div>
              <p style={{ fontSize: 13, fontWeight: 700, color: TX, margin: "0 0 6px" }}>Tips for Faster Resolution</p>
              <ul style={{ fontSize: 13, color: "#3D6B55", margin: 0, paddingLeft: 16, lineHeight: 1.7 }}>
                <li>Include photos whenever possible</li>
                <li>Describe when it started and how often it occurs</li>
                <li>Mention if it's an emergency or safety concern</li>
              </ul>
            </div>
          </div>
        </motion.div>

      </div>

      {/* New Request Modal */}
      {showNewRequest && (
        <div
          style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)", zIndex: 50, display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}
          onClick={() => setShowNewRequest(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
            onClick={(e) => e.stopPropagation()}
            style={{ background: "#fff", borderRadius: 20, padding: "28px 32px", maxWidth: 520, width: "100%" }}
          >
            <h3 style={{ fontFamily: SERIF, fontSize: 24, fontWeight: 400, color: TX, marginBottom: 20 }}>New Maintenance Request</h3>

            <div style={{ marginBottom: 16 }}>
              <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: TX, marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.5px" }}>Category</label>
              <select
                value={newCategory}
                onChange={e => setNewCategory(e.target.value)}
                style={{ width: "100%", padding: "11px 14px", border: "1px solid rgba(0,0,0,0.08)", borderRadius: 10, fontSize: 14, fontFamily: SANS, outline: "none" }}
              >
                {Object.keys(categoryIcon).map(c => <option key={c}>{c}</option>)}
              </select>
            </div>

            <div style={{ marginBottom: 20 }}>
              <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: TX, marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.5px" }}>Describe the issue</label>
              <textarea
                value={newIssue}
                onChange={e => setNewIssue(e.target.value)}
                placeholder="What's the issue? The more detail you provide, the faster we can resolve it..."
                rows={4}
                style={{ width: "100%", padding: "11px 14px", border: "1px solid rgba(0,0,0,0.08)", borderRadius: 10, fontSize: 14, fontFamily: SANS, outline: "none", resize: "vertical", boxSizing: "border-box" }}
              />
            </div>

            <div style={{ display: "flex", gap: 10 }}>
              <button onClick={() => setShowNewRequest(false)} style={{ flex: 1, padding: "12px 0", border: "1px solid rgba(0,0,0,0.08)", color: MU, borderRadius: 12, cursor: "pointer", background: "#fff", fontSize: 14, fontWeight: 600, fontFamily: SANS }}>
                Cancel
              </button>
              <button onClick={() => setShowNewRequest(false)} style={{ flex: 2, padding: "12px 0", background: G, color: "#fff", borderRadius: 12, border: "none", cursor: "pointer", fontSize: 14, fontWeight: 700, fontFamily: SANS }}>
                Submit Request
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}

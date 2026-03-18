// ═══════════════════════════════════════════════════════════════
// KAYA — Admin Dashboard (redesigned)
// ═══════════════════════════════════════════════════════════════
import { useState } from "react";
import { motion } from "motion/react";
import {
  Shield, Users, Building2, AlertTriangle, Activity,
  DollarSign, Eye, Download, Clock, Flag, TrendingUp, TrendingDown,
  Sparkles, Send, FileText, CreditCard, AlertCircle, Calendar, Search, Filter,
} from "lucide-react";
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, AreaChart, Area,
} from "recharts";

// ── Tokens ────────────────────────────────────────────────────
const G = "#0A7A52", GL = "#E5F4EE";
const BG = "#F8F7F4", TEXT = "#0E0F0C", MUTED = "#767570";
const BORDER = "rgba(0,0,0,0.07)";

const styles = {
  page: { minHeight: "100vh", background: BG, fontFamily: "'DM Sans', system-ui, sans-serif" } as React.CSSProperties,
  wrap: { maxWidth: 1280, margin: "0 auto", padding: "48px 40px 80px" } as React.CSSProperties,
  card: { background: "#fff", border: `1px solid ${BORDER}`, borderRadius: 16 } as React.CSSProperties,
  sectionTitle: { fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 28, fontWeight: 400, color: TEXT, letterSpacing: "-0.4px" } as React.CSSProperties,
  label: { fontSize: 10, fontWeight: 600, color: MUTED, textTransform: "uppercase" as const, letterSpacing: "0.7px" },
  bigNum: { fontFamily: "'Instrument Serif', serif", fontSize: 38, fontWeight: 400, color: TEXT, lineHeight: 1 } as React.CSSProperties,
};

function Badge({ label, color = "green" }: { label: string; color?: "green" | "amber" | "red" | "blue" | "gray" }) {
  const c = { green: [GL, G], amber: ["#FEF3C7", "#B45309"], red: ["#FDECEA", "#C0392B"], blue: ["#EBF2FB", "#1E5FA8"], gray: [BG, MUTED] }[color];
  return <span style={{ background: c[0], color: c[1], fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 20 }}>{label}</span>;
}

function MetCard({ label, value, change, icon: Icon, delay = 0 }: { label: string; value: string; change: string; icon: any; delay?: number }) {
  const up = change.startsWith("+");
  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay }}
      style={{ ...styles.card, padding: "22px 24px" }} whileHover={{ boxShadow: "0 8px 24px rgba(0,0,0,0.07)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
        <div style={{ width: 36, height: 36, borderRadius: 10, background: BG, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Icon size={18} color={G} />
        </div>
        <span style={{ fontSize: 12, fontWeight: 600, color: up ? G : "#C0392B" }}>{change}</span>
      </div>
      <p style={styles.label}>{label}</p>
      <p style={{ ...styles.bigNum, fontSize: 32, marginTop: 6 }}>{value}</p>
    </motion.div>
  );
}

// ═══════════════════════════════════════════════════════════════
export function AdminDashboard() {
  const fraudAlerts = [
    { id: 1, type: "Duplicate Documents", severity: "high", user: "John Smith", property: "456 Queen St", time: "2h ago", status: "under_review" },
    { id: 2, type: "Identity Mismatch", severity: "critical", user: "Sarah Chen", property: "123 King St", time: "5h ago", status: "flagged" },
    { id: 3, type: "Suspicious Payment", severity: "medium", user: "Mike Johnson", property: "789 Bloor St", time: "1d ago", status: "resolved" },
  ];
  const compliance = [
    { id: 1, issue: "Missing LTB Clause", property: "456 Queen St W", landlord: "PropertyCo Inc", severity: "high", due: "Mar 20, 2026" },
    { id: 2, issue: "Lease Expiration Notice", property: "123 King St", landlord: "John Mafie", severity: "medium", due: "Mar 25, 2026" },
    { id: 3, issue: "Rent Increase Notice Required", property: "789 Bloor St", landlord: "Urban Properties", severity: "low", due: "Apr 1, 2026" },
  ];
  const activity = [
    { day: "Mon", landlords: 145, tenants: 320 }, { day: "Tue", landlords: 158, tenants: 342 },
    { day: "Wed", landlords: 172, tenants: 365 }, { day: "Thu", landlords: 165, tenants: 358 },
    { day: "Fri", landlords: 189, tenants: 398 }, { day: "Sat", landlords: 134, tenants: 287 },
    { day: "Sun", landlords: 121, tenants: 265 },
  ];
  const revData = [
    { month: "Jan", v: 185000 }, { month: "Feb", v: 205000 }, { month: "Mar", v: 225000 },
    { month: "Apr", v: 238000 }, { month: "May", v: 252000 }, { month: "Jun", v: 268000 }, { month: "Jul", v: 285400 },
  ];

  return (
    <div style={styles.page}>
      <div style={styles.wrap}>
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} style={{ marginBottom: 40 }}>
          <p style={styles.label}>Platform Operations</p>
          <h1 style={{ fontFamily: "'Instrument Serif', serif", fontSize: 48, fontWeight: 400, color: TEXT, marginTop: 8, letterSpacing: "-1px" }}>
            Admin<em style={{ fontStyle: "italic", color: G }}> Dashboard</em>
          </h1>
        </motion.div>

        {/* Metrics */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 32 }}>
          <MetCard label="Total Users" value="1,247" change="+12.5%" icon={Users} delay={0.05} />
          <MetCard label="Active Properties" value="342" change="+8.3%" icon={Building2} delay={0.1} />
          <MetCard label="Fraud Detections" value="23" change="-15.2%" icon={Shield} delay={0.15} />
          <MetCard label="System Health" value="99.7%" change="+0.2%" icon={Activity} delay={0.2} />
        </div>

        {/* Charts */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 32 }}>
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} style={{ ...styles.card, padding: "28px" }}>
            <p style={styles.sectionTitle}>User Activity</p>
            <p style={{ ...styles.label, marginTop: 4, marginBottom: 24 }}>Weekly active by type</p>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={activity} barGap={4}>
                <CartesianGrid strokeDasharray="3 3" stroke={BORDER} />
                <XAxis dataKey="day" stroke="none" tick={{ fill: MUTED, fontSize: 11 }} />
                <YAxis stroke="none" tick={{ fill: MUTED, fontSize: 11 }} />
                <Tooltip contentStyle={{ background: TEXT, border: "none", borderRadius: 8, color: "#fff", fontSize: 12 }} />
                <Bar dataKey="landlords" fill={G} radius={[4, 4, 0, 0]} name="Landlords" />
                <Bar dataKey="tenants" fill="#9FD8C0" radius={[4, 4, 0, 0]} name="Tenants" />
              </BarChart>
            </ResponsiveContainer>
            <div style={{ display: "flex", gap: 20, marginTop: 12 }}>
              {[{ c: G, l: "Landlords" }, { c: "#9FD8C0", l: "Tenants" }].map(x => (
                <div key={x.l} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: x.c }} />
                  <span style={{ fontSize: 11, color: MUTED }}>{x.l}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} style={{ ...styles.card, padding: "28px" }}>
            <p style={styles.sectionTitle}>Platform Revenue</p>
            <div style={{ display: "flex", alignItems: "baseline", gap: 10, margin: "8px 0 24px" }}>
              <span style={{ fontFamily: "'Instrument Serif', serif", fontSize: 36, color: TEXT }}>$285,400</span>
              <span style={{ fontSize: 13, color: G, fontWeight: 600 }}>+18.2%</span>
            </div>
            <ResponsiveContainer width="100%" height={180}>
              <AreaChart data={revData} margin={{ left: -20 }}>
                <defs>
                  <linearGradient id="importAdminRevGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={G} stopOpacity={0.15} />
                    <stop offset="100%" stopColor={G} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke={BORDER} />
                <XAxis dataKey="month" stroke="none" tick={{ fill: MUTED, fontSize: 11 }} />
                <YAxis stroke="none" tick={{ fill: MUTED, fontSize: 11 }} />
                <Tooltip contentStyle={{ background: TEXT, border: "none", borderRadius: 8, color: "#fff", fontSize: 12 }}
                  formatter={(v: number) => [`$${v.toLocaleString()}`, ""]} />
                <Area type="monotone" dataKey="v" stroke={G} strokeWidth={2} fill="url(#importAdminRevGrad)" dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* Fraud Alerts */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} style={{ ...styles.card, marginBottom: 24, overflow: "hidden" }}>
          <div style={{ padding: "20px 24px", borderBottom: `1px solid ${BORDER}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <p style={styles.sectionTitle}>Fraud Detection Alerts</p>
              <p style={{ ...styles.label, marginTop: 4 }}>AI-powered suspicious activity monitoring</p>
            </div>
            <Badge label={`${fraudAlerts.filter(a => a.status !== "resolved").length} Active`} color="red" />
          </div>
          {fraudAlerts.map((alert, i) => (
            <div key={alert.id} style={{ padding: "18px 24px", borderBottom: i < fraudAlerts.length - 1 ? `1px solid ${BORDER}` : "none", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <div style={{
                  width: 36, height: 36, borderRadius: 10,
                  background: alert.severity === "critical" ? "#FDECEA" : alert.severity === "high" ? "#FEF0E6" : "#FEF3C7",
                  display: "flex", alignItems: "center", justifyContent: "center"
                }}>
                  <AlertTriangle size={16} color={alert.severity === "critical" ? "#C0392B" : alert.severity === "high" ? "#D97706" : "#B45309"} />
                </div>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                    <span style={{ fontSize: 14, fontWeight: 600, color: TEXT }}>{alert.type}</span>
                    <Badge label={alert.severity} color={alert.severity === "critical" ? "red" : alert.severity === "high" ? "amber" : "amber"} />
                    <Badge label={alert.status.replace("_", " ")} color={alert.status === "resolved" ? "green" : alert.status === "flagged" ? "red" : "blue"} />
                  </div>
                  <p style={{ fontSize: 12, color: MUTED }}>{alert.user} · {alert.property} · {alert.time}</p>
                </div>
              </div>
              <button style={{ padding: "8px 16px", background: BG, border: `1px solid ${BORDER}`, borderRadius: 8, fontSize: 12, fontWeight: 600, color: TEXT, cursor: "pointer", fontFamily: "inherit", display: "flex", alignItems: "center", gap: 6 }}>
                <Eye size={13} />Review
              </button>
            </div>
          ))}
        </motion.div>

        {/* Compliance */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} style={{ ...styles.card, overflow: "hidden" }}>
          <div style={{ padding: "20px 24px", borderBottom: `1px solid ${BORDER}`, display: "flex", justifyContent: "space-between" }}>
            <p style={styles.sectionTitle}>Compliance Monitoring</p>
            <Badge label={`${compliance.length} Issues`} color="amber" />
          </div>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: BG }}>
                {["Issue", "Property", "Landlord", "Severity", "Due", "Action"].map(h => (
                  <th key={h} style={{ padding: "12px 20px", textAlign: "left", fontSize: 10, fontWeight: 600, color: MUTED, textTransform: "uppercase", letterSpacing: "0.5px" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {compliance.map((c, i) => (
                <tr key={c.id} style={{ borderTop: `1px solid ${BORDER}` }}>
                  <td style={{ padding: "16px 20px", fontSize: 13, fontWeight: 600, color: TEXT }}>{c.issue}</td>
                  <td style={{ padding: "16px 20px", fontSize: 13, color: MUTED }}>{c.property}</td>
                  <td style={{ padding: "16px 20px", fontSize: 13, color: MUTED }}>{c.landlord}</td>
                  <td style={{ padding: "16px 20px" }}><Badge label={c.severity} color={c.severity === "high" ? "red" : c.severity === "medium" ? "amber" : "gray"} /></td>
                  <td style={{ padding: "16px 20px", fontSize: 12, color: MUTED, display: "flex", alignItems: "center", gap: 6 }}><Clock size={12} />{c.due}</td>
                  <td style={{ padding: "16px 20px" }}>
                    <button style={{ fontSize: 12, color: G, fontWeight: 600, background: "none", border: "none", cursor: "pointer", fontFamily: "inherit" }}>Notify →</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// KAYA — Analytics (redesigned)
// ═══════════════════════════════════════════════════════════════
export function Analytics() {
  const revenueData = [
    { month: "Sep", actual: 23800, proj: 24000 }, { month: "Oct", actual: 24500, proj: 24800 },
    { month: "Nov", actual: 25800, proj: 25500 }, { month: "Dec", actual: 26200, proj: 26800 },
    { month: "Jan", actual: 27100, proj: 27200 }, { month: "Feb", actual: 26900, proj: 27500 },
    { month: "Mar", actual: 27600, proj: 28000 }, { month: "Apr", actual: null, proj: 28200 }, { month: "May", actual: null, proj: 28500 },
  ];
  const occupancy = [
    { month: "Oct", rate: 75 }, { month: "Nov", rate: 80 }, { month: "Dec", rate: 83 },
    { month: "Jan", rate: 85 }, { month: "Feb", rate: 82 }, { month: "Mar", rate: 83 },
  ];
  const churn = [
    { tenant: "Bob Johnson", unit: "3A", risk: 78, reason: "Late payments" },
    { tenant: "Jason Lee", unit: "1C", risk: 65, reason: "Lease ending soon" },
    { tenant: "Michael Chen", unit: "2B", risk: 42, reason: "Maintenance issues" },
  ];
  const predictions = [
    { title: "Late Payment Prob.", value: "23%", change: "+5%", up: true, desc: "2 tenants likely to pay late" },
    { title: "Tenant Turnover Risk", value: "16%", change: "-3%", up: false, desc: "Below industry average" },
    { title: "Revenue Forecast", value: "$28,200", change: "+2.2%", up: true, desc: "Expected for April 2026" },
    { title: "Maintenance Cost", value: "$1,240", change: "+18%", up: true, desc: "Projected this month" },
  ];

  return (
    <div style={styles.page}>
      <div style={styles.wrap}>
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} style={{ marginBottom: 40 }}>
          <p style={styles.label}>Insights</p>
          <h1 style={{ fontFamily: "'Instrument Serif', serif", fontSize: 48, fontWeight: 400, color: TEXT, marginTop: 8, letterSpacing: "-1px" }}>
            AI Analytics <em style={{ fontStyle: "italic", color: G }}>&amp; Forecasts</em>
          </h1>
        </motion.div>

        {/* Predictions */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 32 }}>
          {predictions.map((p, i) => (
            <motion.div key={p.title} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
              style={{ ...styles.card, padding: "22px 24px" }} whileHover={{ boxShadow: "0 8px 24px rgba(0,0,0,0.07)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                <Badge label="AI" color="green" />
                <span style={{ fontSize: 12, fontWeight: 600, display: "flex", alignItems: "center", gap: 4, color: p.up ? "#C0392B" : G }}>
                  {p.up ? <TrendingUp size={12} /> : <TrendingDown size={12} />}{p.change}
                </span>
              </div>
              <p style={{ fontFamily: "'Instrument Serif', serif", fontSize: 32, color: TEXT, marginBottom: 4 }}>{p.value}</p>
              <p style={{ fontSize: 12, fontWeight: 600, color: TEXT, marginBottom: 4 }}>{p.title}</p>
              <p style={{ fontSize: 11, color: MUTED }}>{p.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Revenue + Occupancy */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 32 }}>
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} style={{ ...styles.card, padding: "28px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 24 }}>
              <p style={styles.sectionTitle}>Revenue Forecast</p>
              <div style={{ display: "flex", gap: 14, fontSize: 11, color: MUTED, alignItems: "center" }}>
                <span style={{ display: "flex", alignItems: "center", gap: 5 }}><div style={{ width: 8, height: 8, borderRadius: "50%", background: G }} />Actual</span>
                <span style={{ display: "flex", alignItems: "center", gap: 5 }}><div style={{ width: 8, height: 8, borderRadius: "50%", background: "#9FD8C0" }} />Projected</span>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={revenueData} margin={{ left: -20 }}>
                <defs>
                  <linearGradient id="importAnalyticsActGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={G} stopOpacity={0.15} /><stop offset="100%" stopColor={G} stopOpacity={0} /></linearGradient>
                  <linearGradient id="importAnalyticsProjGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#9FD8C0" stopOpacity={0.1} /><stop offset="100%" stopColor="#9FD8C0" stopOpacity={0} /></linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke={BORDER} />
                <XAxis dataKey="month" stroke="none" tick={{ fill: MUTED, fontSize: 11 }} />
                <YAxis stroke="none" tick={{ fill: MUTED, fontSize: 11 }} />
                <Tooltip contentStyle={{ background: TEXT, border: "none", borderRadius: 8, color: "#fff", fontSize: 12 }} formatter={(v: number) => v ? [`$${v.toLocaleString()}`, ""] : ["-", ""]} />
                <Area type="monotone" dataKey="actual" stroke={G} strokeWidth={2} fill="url(#importAnalyticsActGrad)" dot={false} connectNulls={false} />
                <Area type="monotone" dataKey="proj" stroke="#9FD8C0" strokeWidth={2} strokeDasharray="5 4" fill="url(#importAnalyticsProjGrad)" dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} style={{ ...styles.card, padding: "28px" }}>
            <p style={{ ...styles.sectionTitle, marginBottom: 24 }}>Occupancy Trend</p>
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={occupancy} margin={{ left: -20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={BORDER} />
                <XAxis dataKey="month" stroke="none" tick={{ fill: MUTED, fontSize: 11 }} />
                <YAxis stroke="none" tick={{ fill: MUTED, fontSize: 11 }} domain={[60, 100]} />
                <Tooltip contentStyle={{ background: TEXT, border: "none", borderRadius: 8, color: "#fff", fontSize: 12 }} formatter={(v: number) => [`${v}%`, "Occupancy"]} />
                <Line type="monotone" dataKey="rate" stroke={G} strokeWidth={3} dot={{ fill: G, r: 5 }} activeDot={{ r: 7 }} />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* Churn risk */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} style={{ ...styles.card, padding: "28px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: "#FEF3C7", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <AlertTriangle size={17} color="#B45309" />
            </div>
            <div>
              <p style={styles.sectionTitle}>AI Tenant Churn Risk</p>
              <p style={{ ...styles.label, marginTop: 2 }}>Tenants at risk of leaving or late payment</p>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {churn.map(t => (
              <div key={t.tenant} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 20px", background: BG, borderRadius: 12, border: `1px solid ${BORDER}` }}>
                <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <div style={{ width: 40, height: 40, borderRadius: "50%", background: "#FEF3C7", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 700, color: "#B45309" }}>
                    {t.tenant.split(" ").map(n => n[0]).join("")}
                  </div>
                  <div>
                    <p style={{ fontSize: 14, fontWeight: 600, color: TEXT }}>{t.tenant}</p>
                    <p style={{ fontSize: 12, color: MUTED }}>Unit {t.unit} · {t.reason}</p>
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <div style={{ width: 100, height: 6, background: BORDER, borderRadius: 3 }}>
                    <div style={{ height: 6, borderRadius: 3, width: `${t.risk}%`, background: t.risk > 70 ? "#C0392B" : t.risk > 50 ? "#B45309" : G }} />
                  </div>
                  <span style={{ fontSize: 18, fontWeight: 700, color: TEXT, minWidth: 36 }}>{t.risk}%</span>
                  <Badge label={t.risk > 70 ? "High Risk" : t.risk > 50 ? "Med Risk" : "Low Risk"} color={t.risk > 70 ? "red" : t.risk > 50 ? "amber" : "green"} />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// KAYA — Documents (redesigned)
// ═══════════════════════════════════════════════════════════════
export function Documents() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const docs = [
    { id: 1, name: "Standard Lease — Unit 4A", type: "lease", property: "123 King Street", unit: "4A", tenant: "John Doe", date: "Jan 1, 2025", size: "245 KB", status: "signed" },
    { id: 2, name: "N4 Notice — Non-Payment", type: "notice", property: "456 Queen Street W", unit: "3A", tenant: "Bob Johnson", date: "Mar 10, 2026", size: "128 KB", status: "pending" },
    { id: 3, name: "Payment Receipt — March 2026", type: "receipt", property: "789 Bloor Street", unit: "Unit 1", tenant: "Emma Wilson", date: "Mar 1, 2026", size: "92 KB", status: "processed" },
    { id: 4, name: "Tenant Application — Sarah Kim", type: "application", property: "123 King Street", unit: "5A", tenant: "Sarah Kim", date: "Mar 14, 2026", size: "1.2 MB", status: "approved" },
    { id: 5, name: "Standard Lease — Unit 1C", type: "lease", property: "456 Queen Street W", unit: "1C", tenant: "Alice Smith", date: "Mar 1, 2024", size: "238 KB", status: "signed" },
    { id: 6, name: "Maintenance Report — Plumbing", type: "maintenance", property: "456 Queen Street W", unit: "3A", tenant: "Bob Johnson", date: "Mar 12, 2026", size: "456 KB", status: "completed" },
    { id: 7, name: "Insurance Policy 2026", type: "insurance", property: "All Properties", unit: "—", tenant: "—", date: "Jan 1, 2026", size: "890 KB", status: "active" },
  ];

  const typeConfig: Record<string, { color: "green" | "amber" | "red" | "blue" | "gray"; icon: any }> = {
    lease: { color: "blue", icon: FileText },
    notice: { color: "amber", icon: AlertCircle },
    receipt: { color: "green", icon: CreditCard },
    application: { color: "green", icon: Users },
    maintenance: { color: "gray", icon: Building2 },
    insurance: { color: "gray", icon: Shield },
  };

  const filtered = docs.filter(d =>
    (filter === "all" || d.type === filter) &&
    (d.name.toLowerCase().includes(search.toLowerCase()) || d.tenant.toLowerCase().includes(search.toLowerCase()))
  );

  const statOk = (s: string) => ["signed", "active", "approved", "completed", "processed"].includes(s);

  return (
    <div style={styles.page}>
      <div style={styles.wrap}>
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} style={{ marginBottom: 40 }}>
          <p style={styles.label}>Document Vault</p>
          <h1 style={{ fontFamily: "'Instrument Serif', serif", fontSize: 48, fontWeight: 400, color: TEXT, marginTop: 8, letterSpacing: "-1px" }}>
            <em style={{ fontStyle: "italic", color: G }}>All</em> Documents
          </h1>
        </motion.div>

        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14, marginBottom: 32 }}>
          {[
            { label: "Total", val: docs.length },
            { label: "Active Leases", val: docs.filter(d => d.type === "lease" && d.status === "signed").length },
            { label: "Pending Notices", val: docs.filter(d => d.type === "notice" && d.status === "pending").length },
            { label: "Receipts", val: docs.filter(d => d.type === "receipt").length },
          ].map((s, i) => (
            <motion.div key={s.label} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
              style={{ ...styles.card, padding: "20px 22px" }}>
              <p style={styles.label}>{s.label}</p>
              <p style={{ fontFamily: "'Instrument Serif', serif", fontSize: 36, color: TEXT, marginTop: 8, lineHeight: 1 }}>{s.val}</p>
            </motion.div>
          ))}
        </div>

        {/* Search + filter */}
        <div style={{ display: "flex", gap: 12, marginBottom: 20 }}>
          <div style={{ position: "relative", flex: 1, maxWidth: 380 }}>
            <Search size={14} color={MUTED} style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)" }} />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search documents or tenants..." style={{ width: "100%", padding: "11px 14px 11px 38px", border: `1px solid ${BORDER}`, borderRadius: 10, fontSize: 13, fontFamily: "inherit", background: "#fff", outline: "none", color: TEXT }} />
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            {["all", "lease", "notice", "receipt", "application"].map(f => (
              <button key={f} onClick={() => setFilter(f)} style={{ padding: "9px 16px", borderRadius: 20, fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", border: "1px solid", background: filter === f ? TEXT : "#fff", color: filter === f ? "#fff" : MUTED, borderColor: filter === f ? TEXT : BORDER, transition: "all 0.15s", textTransform: "capitalize" }}>
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} style={{ ...styles.card, overflow: "hidden" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: BG }}>
                {["Document", "Type", "Property", "Tenant", "Date", "Status", ""].map(h => (
                  <th key={h} style={{ padding: "12px 20px", textAlign: "left", fontSize: 10, fontWeight: 600, color: MUTED, textTransform: "uppercase", letterSpacing: "0.5px" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((doc, i) => {
                const tc = typeConfig[doc.type] || typeConfig.insurance;
                const Icon = tc.icon;
                return (
                  <tr key={doc.id} style={{ borderTop: `1px solid ${BORDER}`, transition: "background 0.15s", cursor: "pointer" }}
                    onMouseEnter={e => (e.currentTarget.style.background = BG)}
                    onMouseLeave={e => (e.currentTarget.style.background = "#fff")}>
                    <td style={{ padding: "16px 20px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        <div style={{ width: 34, height: 34, borderRadius: 9, background: BG, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                          <Icon size={15} color={G} />
                        </div>
                        <div>
                          <p style={{ fontSize: 13, fontWeight: 600, color: TEXT }}>{doc.name}</p>
                          <p style={{ fontSize: 11, color: MUTED }}>{doc.size}</p>
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: "16px 20px" }}><Badge label={doc.type.charAt(0).toUpperCase() + doc.type.slice(1)} color={tc.color} /></td>
                    <td style={{ padding: "16px 20px" }}><p style={{ fontSize: 13, color: TEXT }}>{doc.property}</p><p style={{ fontSize: 11, color: MUTED }}>{doc.unit}</p></td>
                    <td style={{ padding: "16px 20px", fontSize: 13, color: MUTED }}>{doc.tenant}</td>
                    <td style={{ padding: "16px 20px", fontSize: 12, color: MUTED, display: "flex", alignItems: "center", gap: 5 }}><Calendar size={12} />{doc.date}</td>
                    <td style={{ padding: "16px 20px" }}><Badge label={doc.status} color={statOk(doc.status) ? "green" : "amber"} /></td>
                    <td style={{ padding: "16px 20px" }}>
                      <div style={{ display: "flex", gap: 6 }}>
                        <button style={{ padding: "7px 12px", border: `1px solid ${BORDER}`, borderRadius: 8, background: "transparent", cursor: "pointer" }}><Eye size={13} color={MUTED} /></button>
                        <button style={{ padding: "7px 12px", border: `1px solid ${BORDER}`, borderRadius: 8, background: "transparent", cursor: "pointer" }}><Download size={13} color={MUTED} /></button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </motion.div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// KAYA — AI Assistant (redesigned)
// ═══════════════════════════════════════════════════════════════
const chatResponses: Record<string, string> = {
  "Show risky applicants": "Scanning your applicant pool... I've found 2 high-risk applicants: Emma Chen (score 55 — high rent-to-income ratio at 44%) and Jason Lee (score 68 — short employment history of 1.8 years). I'd recommend requesting additional income verification before proceeding.",
  "Generate lease for Unit 4A": "I can generate a standard Ontario lease for Unit 4A. I'll need to confirm a few details: tenant name (Sarah Kim?), start date, monthly rent ($2,300?), and any special clauses. Once confirmed I'll generate a fully RTA-compliant lease ready for e-signature.",
  "Give me a property overview": "Here's your current portfolio snapshot: 3 properties · 12 units · 92% occupancy (11/12). Monthly revenue: $27,600 (+12% vs last month). 1 overdue payment (Unit 3A). 3 applications pending your review with AI scores between 68–92. Your top performer is 123 King St with 100% occupancy and no risk flags.",
};

export function AIAssistantPremium() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    { role: "assistant" as const, content: "Hi Justin! I'm Kaya's AI property assistant. Ask me anything about your tenants, leases, payments, or portfolio performance." },
  ]);
  const [loading, setLoading] = useState(false);

  const suggestions = [
    { label: "Show risky applicants" },
    { label: "Generate lease for Unit 4A" },
    { label: "Give me a property overview" },
  ];

  const send = (text = message) => {
    if (!text.trim()) return;
    setMessages(m => [...m, { role: "user", content: text }]);
    setMessage("");
    setLoading(true);
    setTimeout(() => {
      const resp = chatResponses[text] || `I understand you're asking about "${text}". Based on your current portfolio data, let me pull up the relevant information and give you a detailed breakdown...`;
      setMessages(m => [...m, { role: "assistant", content: resp }]);
      setLoading(false);
    }, 1100);
  };

  return (
    <div style={styles.page}>
      <div style={{ maxWidth: 820, margin: "0 auto", padding: "48px 40px 80px" }}>

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} style={{ marginBottom: 36, textAlign: "center" }}>
          <div style={{ width: 52, height: 52, borderRadius: 16, background: TEXT, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
            <Sparkles size={22} color={GL} />
          </div>
          <h1 style={{ fontFamily: "'Instrument Serif', serif", fontSize: 42, fontWeight: 400, color: TEXT, letterSpacing: "-1px", marginBottom: 8 }}>
            Kaya <em style={{ fontStyle: "italic", color: G }}>AI</em>
          </h1>
          <p style={{ fontSize: 14, color: MUTED }}>Your intelligent property management co-pilot</p>
        </motion.div>

        {/* Quick actions */}
        <div style={{ display: "flex", gap: 10, justifyContent: "center", marginBottom: 36, flexWrap: "wrap" }}>
          {suggestions.map(s => (
            <button key={s.label} onClick={() => send(s.label)}
              style={{ padding: "9px 18px", border: `1px solid ${BORDER}`, borderRadius: 20, fontSize: 13, fontWeight: 500, cursor: "pointer", background: "#fff", color: TEXT, fontFamily: "inherit", transition: "all 0.15s" }}
              onMouseEnter={e => { (e.target as HTMLElement).style.background = GL; (e.target as HTMLElement).style.borderColor = G; (e.target as HTMLElement).style.color = G; }}
              onMouseLeave={e => { (e.target as HTMLElement).style.background = "#fff"; (e.target as HTMLElement).style.borderColor = BORDER; (e.target as HTMLElement).style.color = TEXT; }}
            >
              {s.label}
            </button>
          ))}
        </div>

        {/* Messages */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 24 }}>
          {messages.map((m, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              style={{ display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start" }}>
              {m.role === "assistant" && (
                <div style={{ display: "flex", gap: 12, maxWidth: "80%", alignItems: "flex-start" }}>
                  <div style={{ width: 32, height: 32, borderRadius: 10, background: TEXT, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 2 }}>
                    <Sparkles size={14} color={GL} />
                  </div>
                  <div style={{ background: "#fff", border: `1px solid ${BORDER}`, borderRadius: "16px 16px 16px 4px", padding: "14px 18px", fontSize: 14, color: TEXT, lineHeight: 1.65 }}>
                    {m.content}
                  </div>
                </div>
              )}
              {m.role === "user" && (
                <div style={{ background: TEXT, borderRadius: "16px 16px 4px 16px", padding: "14px 18px", fontSize: 14, color: "#fff", lineHeight: 1.65, maxWidth: "80%" }}>
                  {m.content}
                </div>
              )}
            </motion.div>
          ))}
          {loading && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
              <div style={{ width: 32, height: 32, borderRadius: 10, background: TEXT, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Sparkles size={14} color={GL} />
              </div>
              <div style={{ background: "#fff", border: `1px solid ${BORDER}`, borderRadius: "16px 16px 16px 4px", padding: "14px 18px" }}>
                <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                  {[0, 1, 2].map(n => (
                    <div key={n} style={{ width: 6, height: 6, borderRadius: "50%", background: MUTED, animation: `pulse 1.2s ${n * 0.2}s infinite` }} />
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Input */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          style={{ background: "#fff", border: `1px solid ${BORDER}`, borderRadius: 16, padding: "6px 6px 6px 18px", display: "flex", alignItems: "center", gap: 8, boxShadow: "0 4px 20px rgba(0,0,0,0.06)", position: "sticky", bottom: 24 }}>
          <input
            value={message}
            onChange={e => setMessage(e.target.value)}
            onKeyDown={e => e.key === "Enter" && send()}
            placeholder="Ask anything about your properties..."
            style={{ flex: 1, border: "none", outline: "none", fontSize: 14, fontFamily: "inherit", color: TEXT, background: "transparent", padding: "10px 0" }}
          />
          <button
            onClick={() => send()}
            disabled={!message.trim()}
            style={{ width: 40, height: 40, borderRadius: 12, background: message.trim() ? TEXT : BG, border: "none", display: "flex", alignItems: "center", justifyContent: "center", cursor: message.trim() ? "pointer" : "default", transition: "background 0.2s", flexShrink: 0 }}
          >
            <Send size={16} color={message.trim() ? "#fff" : MUTED} />
          </button>
        </motion.div>
        <p style={{ textAlign: "center", fontSize: 11, color: MUTED, marginTop: 10 }}>Kaya AI · Ontario RTA 2006 compliant</p>
        <style>{`@keyframes pulse { 0%,100%{opacity:.3;transform:scale(0.9)} 50%{opacity:1;transform:scale(1.1)} }`}</style>
      </div>
    </div>
  );
}
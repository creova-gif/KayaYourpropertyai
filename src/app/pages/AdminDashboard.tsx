import { motion } from "motion/react";
import {
  Shield, Users, Building2, AlertTriangle, Activity,
  Eye, Clock,
} from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
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
                <Bar dataKey="landlords" fill={G} radius={[4, 4, 0, 0]} name="Landlords" key="bar-landlords" />
                <Bar dataKey="tenants" fill="#9FD8C0" radius={[4, 4, 0, 0]} name="Tenants" key="bar-tenants" />
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
                  <linearGradient id="adminRevGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={G} stopOpacity={0.15} />
                    <stop offset="100%" stopColor={G} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke={BORDER} />
                <XAxis dataKey="month" stroke="none" tick={{ fill: MUTED, fontSize: 11 }} />
                <YAxis stroke="none" tick={{ fill: MUTED, fontSize: 11 }} />
                <Tooltip contentStyle={{ background: TEXT, border: "none", borderRadius: 8, color: "#fff", fontSize: 12 }}
                  formatter={(v: number) => [`$${v.toLocaleString()}`, ""]} />
                <Area key="revenue" type="monotone" dataKey="v" stroke={G} strokeWidth={2} fill="url(#adminRevGrad)" dot={false} />
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
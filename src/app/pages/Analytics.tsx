import { motion } from "motion/react";
import { AlertTriangle, TrendingUp, TrendingDown } from "lucide-react";
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const G = "#0A7A52", GL = "#E5F4EE";
const BG = "#F8F7F4", TEXT = "#0E0F0C", MUTED = "#767570";
const BORDER = "rgba(0,0,0,0.07)";

const styles = {
  page: { minHeight: "100vh", background: BG, fontFamily: "'DM Sans', system-ui, sans-serif" } as React.CSSProperties,
  wrap: { maxWidth: 1280, margin: "0 auto", padding: "48px 40px 80px" } as React.CSSProperties,
  card: { background: "#fff", border: `1px solid ${BORDER}`, borderRadius: 16 } as React.CSSProperties,
  sectionTitle: { fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 28, fontWeight: 400, color: TEXT, letterSpacing: "-0.4px" } as React.CSSProperties,
  label: { fontSize: 10, fontWeight: 600, color: MUTED, textTransform: "uppercase" as const, letterSpacing: "0.7px" },
};

function Badge({ label, color = "green" }: { label: string; color?: "green" | "amber" | "red" | "blue" | "gray" }) {
  const c = { green: [GL, G], amber: ["#FEF3C7", "#B45309"], red: ["#FDECEA", "#C0392B"], blue: ["#EBF2FB", "#1E5FA8"], gray: [BG, MUTED] }[color];
  return <span style={{ background: c[0], color: c[1], fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 20 }}>{label}</span>;
}

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
    <div style={{ minHeight: "100vh", background: "#F8F7F4" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" style={{ background: '#F8F7F4', minHeight: '100vh', fontFamily: "'DM Sans', system-ui, sans-serif" }}>
        <div className="mb-8">
          <p className="text-[10px] font-semibold text-[#767570] uppercase tracking-wider mb-2">Insights</p>
          <h1 className="text-[48px] font-normal text-[#0E0F0C] tracking-tight" style={{ fontFamily: "'Instrument Serif', Georgia, serif", letterSpacing: '-1px' }}>Analytics</h1>
          <p className="mt-2 text-[14px] text-[#767570]">Detailed insights and performance metrics for your properties</p>
        </div>

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
                  <linearGradient id="analyticsActGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={G} stopOpacity={0.15} /><stop offset="100%" stopColor={G} stopOpacity={0} /></linearGradient>
                  <linearGradient id="analyticsProjGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#9FD8C0" stopOpacity={0.1} /><stop offset="100%" stopColor="#9FD8C0" stopOpacity={0} /></linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke={BORDER} />
                <XAxis dataKey="month" stroke="none" tick={{ fill: MUTED, fontSize: 11 }} />
                <YAxis stroke="none" tick={{ fill: MUTED, fontSize: 11 }} />
                <Tooltip contentStyle={{ background: TEXT, border: "none", borderRadius: 8, color: "#fff", fontSize: 12 }} />
                <Area type="monotone" dataKey="actual" stroke={G} strokeWidth={2} fill="url(#analyticsActGrad)" name="Actual" />
                <Area type="monotone" dataKey="proj" stroke="#9FD8C0" strokeWidth={2} strokeDasharray="5 5" fill="url(#analyticsProjGrad)" name="Projected" />
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
                <Line key="occupancy" type="monotone" dataKey="rate" stroke={G} strokeWidth={3} dot={{ fill: G, r: 5 }} activeDot={{ r: 7 }} />
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
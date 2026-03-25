import { motion } from "motion/react";
import { DollarSign, FileText, Download, Receipt, CheckSquare, Bell, RefreshCw, Scale, User, Sparkles, TrendingUp, Shield, Clock, Wrench, MessageSquare, Star } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { PaymentForm, PaymentData } from "../components/PaymentForm";

const G = "#0A7A52";
const GL = "#E5F4EE";
const TX = "#0E0F0C";
const MU = "#767570";
const SANS = "'DM Sans', system-ui, sans-serif";
const SERIF = "'Instrument Serif', Georgia, serif";

function getGreeting() {
  const h = new Date().getHours();
  return h < 12 ? "morning" : h < 17 ? "afternoon" : "evening";
}

export function TenantPortalPremium() {
  const navigate = useNavigate();
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showScheduleModal, setShowScheduleModal] = useState(false);

  const daysToRenewal = 63;
  const passportScore = 87;
  const streakMonths = 14;

  const handlePaymentSubmit = (paymentData: PaymentData) => {
    console.log("Payment submitted:", paymentData);
    setTimeout(() => { setShowPaymentModal(false); }, 500);
  };

  return (
    <div style={{ fontFamily: SANS }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">

        {/* Greeting */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
          <p style={{ fontSize: 11, fontWeight: 700, color: MU, textTransform: "uppercase", letterSpacing: "0.7px", marginBottom: 4 }}>Good {getGreeting()}</p>
          <h1 style={{ fontFamily: SERIF, fontSize: 38, fontWeight: 400, color: TX, letterSpacing: "-1px", lineHeight: 1, marginBottom: 6 }}>Sarah Kim</h1>
          <p style={{ fontSize: 14, color: MU }}>Unit 4A · 123 King St, Toronto · Lease active until May 2027</p>
        </motion.div>

        {/* Hero rent card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6 rounded-2xl p-7 sm:p-9"
          style={{ background: `linear-gradient(135deg, #0D5C3A 0%, ${G} 60%, #12A06E 100%)`, boxShadow: `0 20px 60px ${G}40` }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
            <div>
              <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.7px", marginBottom: 4 }}>Next Rent Payment</p>
              <h2 style={{ fontFamily: SERIF, fontSize: 48, fontWeight: 400, color: "#fff", lineHeight: 1, marginBottom: 4 }}>$2,300</h2>
              <p style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", marginTop: 4 }}>Due July 1, 2026 · <span style={{ color: "#7AE8B8", fontWeight: 600 }}>7 days away</span></p>
            </div>
            <div style={{ textAlign: "right" }}>
              <p style={{ fontSize: 9, fontWeight: 700, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.6px", marginBottom: 3 }}>Passport Score</p>
              <p style={{ fontFamily: SERIF, fontSize: 32, color: "#fff", lineHeight: 1 }}>{passportScore}</p>
              <p style={{ fontSize: 9, color: "rgba(255,255,255,0.45)" }}>/ 100</p>
            </div>
          </div>
          <div style={{ background: "rgba(0,0,0,0.2)", borderRadius: 16, padding: "14px 18px" }}>
            <div style={{ display: "flex", gap: 8 }}>
              <button
                onClick={() => setShowPaymentModal(true)}
                style={{ flex: 1, padding: "11px", background: "#fff", color: "#085040", border: "none", borderRadius: 10, fontSize: 13, fontWeight: 700, cursor: "pointer" }}
              >
                Pay Now →
              </button>
              <button
                onClick={() => setShowScheduleModal(true)}
                style={{ padding: "11px 15px", background: "rgba(255,255,255,0.1)", color: "#fff", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 10, fontSize: 11, cursor: "pointer" }}
              >
                ✓ Auto-pay
              </button>
            </div>
          </div>
        </motion.div>

        {/* ── Story Cards — What would you like to do? ── */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} style={{ marginBottom: 28 }}>
          <h2 style={{ fontFamily: SERIF, fontSize: 22, fontWeight: 400, color: TX, marginBottom: 14, letterSpacing: "-0.5px" }}>What would you like to do?</h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 10 }}>
            <StoryCard
              gradient="linear-gradient(135deg,#0D5C3A,#12A06E)"
              tag="Services"
              title="Report an issue"
              desc="Leak, appliance, or anything that needs fixing"
              emoji="🔧"
              onClick={() => navigate("/tenant/maintenance")}
            />
            <StoryCard
              gradient="linear-gradient(135deg,#1E5FA8,#2E7DD4)"
              tag="Payments"
              title="View rent history"
              desc="All receipts and payment records"
              emoji="🧾"
              onClick={() => navigate("/tenant/payments")}
            />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 10 }}>
            <StoryCard
              gradient="linear-gradient(135deg,#7C3AED,#9F5AFF)"
              tag="Tenant Passport"
              title="Your rental score"
              desc="See what landlords see about you"
              emoji="⭐"
              onClick={() => navigate("/tenant/profile")}
            />
            <StoryCard
              gradient="linear-gradient(135deg,#B45309,#D97706)"
              tag="Documents"
              title="My lease & docs"
              desc="Download receipts, lease, inspection"
              emoji="📄"
              onClick={() => navigate("/tenant/documents")}
            />
          </div>
          <StoryCard
            gradient="linear-gradient(135deg,#0E0F0C,#2D2D2D)"
            tag="Communication"
            title="Message your landlord"
            desc="All conversations logged and timestamped"
            emoji="💬"
            wide
            onClick={() => window.dispatchEvent(new CustomEvent("openAIWithQuery", { detail: { query: "I need to send a message to my landlord about" } }))}
          />
        </motion.div>

        {/* ── Metrics Dashboard ── */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} style={{ marginBottom: 28 }}>
          <h2 style={{ fontFamily: SERIF, fontSize: 22, fontWeight: 400, color: TX, marginBottom: 16, letterSpacing: "-0.5px" }}>Your Dashboard</h2>

          {/* 3-metric row */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 11, marginBottom: 11 }}>
            <MetricCard label="On-time" value="100%" sub="All 14 payments" valueColor={G} sparkline>
              <svg viewBox="0 0 100 40" style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 40, opacity: 0.15 }} >
                <polyline points="0,30 15,28 30,25 45,26 60,20 75,18 90,10 100,8" fill="none" stroke={G} strokeWidth="2" />
              </svg>
            </MetricCard>
            <MetricCard label="Passport" value={String(passportScore)} sub="↑ +4 this month" valueColor="#7C3AED" sparkline>
              <svg viewBox="0 0 100 40" style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 40, opacity: 0.15 }}>
                <polyline points="0,35 20,30 40,28 60,22 80,16 100,12" fill="none" stroke="#7C3AED" strokeWidth="2" />
              </svg>
            </MetricCard>
            <MetricCard label="Streak" value={`🔥${streakMonths}`} sub="Months perfect" valueColor="#B45309" />
          </div>

          {/* 2-metric row */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 11, marginBottom: 11 }}>
            <div
              style={{ background: "#fff", border: "1px solid rgba(0,0,0,0.07)", borderRadius: 14, padding: "16px 18px", cursor: "pointer" }}
              onClick={() => navigate("/tenant/renewal")}
            >
              <p style={{ fontSize: 9, fontWeight: 700, color: MU, textTransform: "uppercase", letterSpacing: "0.7px", marginBottom: 6 }}>Lease Remaining</p>
              <p style={{ fontFamily: SERIF, fontSize: 26, color: TX, lineHeight: 1, marginBottom: 3 }}>{daysToRenewal}</p>
              <p style={{ fontSize: 11, color: MU, marginBottom: 8 }}>Days until renewal</p>
              <div style={{ height: 6, background: "rgba(0,0,0,0.06)", borderRadius: 3, overflow: "hidden" }}>
                <div style={{ width: "65%", height: "100%", background: G, borderRadius: 3 }} />
              </div>
            </div>
            <div style={{ background: "#fff", border: "1px solid rgba(0,0,0,0.07)", borderRadius: 14, padding: "16px 18px" }}>
              <p style={{ fontSize: 9, fontWeight: 700, color: MU, textTransform: "uppercase", letterSpacing: "0.7px", marginBottom: 6 }}>Credit Built</p>
              <p style={{ fontFamily: SERIF, fontSize: 26, color: "#1E5FA8", lineHeight: 1, marginBottom: 3 }}>+340</p>
              <p style={{ fontSize: 11, color: MU }}>Points via Kaya</p>
            </div>
          </div>
        </motion.div>

        {/* ── Payment Streak extended ── */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.22 }} style={{ background: "#fff", borderRadius: 16, border: "1px solid rgba(0,0,0,0.07)", padding: "20px 22px", marginBottom: 20 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
            <div style={{ width: 30, height: 30, borderRadius: 8, background: GL, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <TrendingUp size={14} color={G} strokeWidth={2.5} />
            </div>
            <span style={{ fontSize: 12, fontWeight: 700, color: MU }}>Payment Streak</span>
          </div>
          <p style={{ fontFamily: SERIF, fontSize: 36, fontWeight: 400, color: G, lineHeight: 1, marginBottom: 6 }}>{streakMonths} months</p>
          <p style={{ fontSize: 12, color: MU, marginBottom: 14 }}>100% on-time payments since lease start</p>
          <div style={{ display: "flex", gap: 5 }}>
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} style={{ flex: 1 }}>
                <div style={{ height: 28, background: G, borderRadius: 5, opacity: 0.15 + (i + 1) * 0.14 }} />
                <p style={{ fontSize: 9, color: MU, textAlign: "center", marginTop: 4 }}>{["J", "F", "M", "A", "M", "J"][i]}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── Quick Access ── */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} style={{ marginBottom: 28 }}>
          <h2 style={{ fontFamily: SERIF, fontSize: 22, fontWeight: 400, color: TX, marginBottom: 16, letterSpacing: "-0.5px" }}>Quick Access</h2>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
            {[
              { label: "Receipts", icon: Receipt, href: "/tenant/receipts", color: G, bg: GL },
              { label: "Checklist", icon: CheckSquare, href: "/tenant/checklist", color: "#1D4ED8", bg: "#EFF6FF" },
              { label: "Notices", icon: Bell, href: "/tenant/notices", color: "#DC2626", bg: "#FEF2F2", badge: 2 },
              { label: "Renewal", icon: RefreshCw, href: "/tenant/renewal", color: "#B45309", bg: "#FEF3C7" },
              { label: "Dispute", icon: Scale, href: "/tenant/dispute", color: "#7C3AED", bg: "#F5F3FF" },
              { label: "Profile", icon: User, href: "/tenant/profile", color: TX, bg: "#F8F7F4" },
            ].map(item => {
              const Icon = item.icon;
              return (
                <button key={item.label} onClick={() => navigate(item.href)} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, padding: "16px 8px", background: "#fff", borderRadius: 14, border: "1px solid rgba(0,0,0,0.07)", cursor: "pointer", fontFamily: SANS, position: "relative" }}>
                  <div style={{ width: 38, height: 38, borderRadius: 10, background: item.bg, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Icon size={17} color={item.color} strokeWidth={2.5} />
                  </div>
                  {"badge" in item && item.badge && (
                    <div style={{ position: "absolute", top: 10, right: 18, width: 16, height: 16, borderRadius: "50%", background: "#DC2626", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <span style={{ fontSize: 9, fontWeight: 800, color: "#fff" }}>{item.badge}</span>
                    </div>
                  )}
                  <span style={{ fontSize: 11, fontWeight: 700, color: TX }}>{item.label}</span>
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* ── Active Service Requests ── */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.28 }} style={{ background: "#fff", borderRadius: 16, border: "1px solid rgba(0,0,0,0.07)", padding: "20px 22px", marginBottom: 20 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 34, height: 34, borderRadius: 9, background: "#FEF3C7", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Wrench size={16} color="#B45309" strokeWidth={2.5} />
              </div>
              <p style={{ fontSize: 13, fontWeight: 600, color: TX }}>Active Service Requests</p>
            </div>
            <span onClick={() => navigate("/tenant/maintenance")} style={{ fontSize: 11, color: G, cursor: "pointer", fontWeight: 600 }}>View all →</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "9px 12px", background: "#EFF6FF", borderRadius: 9, cursor: "pointer" }} onClick={() => navigate("/tenant/maintenance")}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 14 }}>🚿</span>
              <div>
                <p style={{ fontSize: 12, fontWeight: 600, color: TX }}>Bathroom faucet dripping</p>
                <p style={{ fontSize: 10, color: MU }}>Submitted Mar 12 · Plumber scheduled Mar 15</p>
              </div>
            </div>
            <span style={{ fontSize: 9, fontWeight: 700, color: "#1D4ED8", background: "#DBEAFE", borderRadius: 99, padding: "3px 10px" }}>In Progress</span>
          </div>
        </motion.div>

        {/* ── Security status ── */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} style={{ background: "#fff", borderRadius: 16, border: `1px solid rgba(0,0,0,0.07)`, borderLeft: `3px solid ${G}`, padding: "16px 22px", marginBottom: 24 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 34, height: 34, borderRadius: 9, background: GL, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Shield size={16} color={G} strokeWidth={2.5} />
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: 12, fontWeight: 600, color: TX }}>Account Security</p>
              <p style={{ fontSize: 10, color: MU }}>OTP enabled · Last login today 9:02 AM</p>
            </div>
            <span style={{ fontSize: 9, fontWeight: 700, color: G, background: GL, borderRadius: 99, padding: "3px 10px" }}>Secured</span>
          </div>
        </motion.div>

        {/* ── AI Kaya nudge ── */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.32 }} style={{ background: GL, borderRadius: 16, padding: "20px 22px", border: `1px solid ${G}20`, cursor: "pointer", marginBottom: 28 }} onClick={() => window.dispatchEvent(new CustomEvent("openAIWithQuery", { detail: { query: "What should I know about my lease renewal coming up?" } }))}>
          <div style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
            <div style={{ width: 38, height: 38, borderRadius: 11, background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
              <Sparkles size={18} color={G} strokeWidth={2.5} />
            </div>
            <div>
              <p style={{ fontSize: 14, fontWeight: 700, color: TX, margin: "0 0 4px" }}>Your lease renews in {daysToRenewal} days</p>
              <p style={{ fontSize: 13, color: "#3D6B55", margin: "0 0 10px", lineHeight: 1.5 }}>Ontario allows a max 2.5% rent increase this year. Your landlord has proposed 2.95% — ask Kaya AI to explain your options before the deadline.</p>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "5px 12px", background: "#fff", borderRadius: 99, border: `1px solid ${G}20` }}>
                <Sparkles size={11} color={G} strokeWidth={2.5} />
                <span style={{ fontSize: 11, fontWeight: 700, color: G }}>Ask Kaya AI →</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Lease Info */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} className="bg-white border border-[rgba(0,0,0,0.07)] rounded-xl p-6 sm:p-8 mb-8 shadow-sm">
          <h3 style={{ fontFamily: SERIF, fontSize: 20, fontWeight: 400, color: TX, marginBottom: 4 }}>Lease Agreement</h3>
          <p style={{ fontSize: 13, color: MU, marginBottom: 20 }}>Active until May 2027</p>
          <div className="grid grid-cols-2 gap-4 sm:gap-6 pt-5 border-t border-[rgba(0,0,0,0.05)]">
            {[["Unit", "4A"], ["Address", "123 King St"], ["Start Date", "May 1, 2026"], ["End Date", "May 1, 2027"], ["Monthly Rent", "$2,300"], ["Deposit", "$2,300"]].map(([label, val]) => (
              <div key={label}>
                <p style={{ fontSize: 10, color: MU, textTransform: "uppercase", letterSpacing: "0.7px", fontWeight: 700, marginBottom: 4 }}>{label}</p>
                <p style={{ fontSize: 15, fontWeight: 600, color: TX }}>{val}</p>
              </div>
            ))}
          </div>
        </motion.div>

      </div>

      {/* Payment Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} onClick={(e) => e.stopPropagation()}>
            <PaymentForm
              tenantName="Sarah Kim" unitNumber="4A" amount={2300} dueDate="July 1, 2026"
              onSubmit={handlePaymentSubmit} onCancel={() => setShowPaymentModal(false)} mode="tenant"
            />
          </motion.div>
        </div>
      )}

      {/* Schedule Payment Modal */}
      {showScheduleModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowScheduleModal(false)}>
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} onClick={(e) => e.stopPropagation()} className="bg-white rounded-2xl p-6 sm:p-8 max-w-lg w-full">
            <h3 style={{ fontFamily: SERIF, fontSize: 24, fontWeight: 400, color: TX, marginBottom: 12 }}>Auto-Pay Settings</h3>
            <div style={{ background: GL, borderRadius: 12, padding: 14, marginBottom: 16 }}>
              <p style={{ fontSize: 13, fontWeight: 600, color: "#085040", marginBottom: 3 }}>✓ Auto-Pay is Active</p>
              <p style={{ fontSize: 11, color: G }}>Rent is automatically charged on the 1st of each month</p>
            </div>
            {[["Payment card", "Visa ending 4242"], ["Charge date", "1st of every month"], ["Next charge", "July 1, 2026 · $2,300"], ["Notification", "24 hrs before charge"]].map(r => (
              <div key={r[0]} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid rgba(0,0,0,0.05)" }}>
                <span style={{ fontSize: 12, color: MU }}>{r[0]}</span>
                <span style={{ fontSize: 12, fontWeight: 600, color: TX }}>{r[1]}</span>
              </div>
            ))}
            <div className="flex gap-3 mt-4">
              <button onClick={() => setShowScheduleModal(false)} style={{ flex: 1, padding: "12px 0", border: "1px solid rgba(0,0,0,0.08)", color: MU, borderRadius: 12, cursor: "pointer", background: "#fff", fontSize: 14, fontFamily: SANS }}>Close</button>
              <button onClick={() => setShowScheduleModal(false)} style={{ flex: 1, padding: "12px 0", background: "#FEF3C7", color: "#B45309", border: "1px solid rgba(180,83,9,0.2)", borderRadius: 12, cursor: "pointer", fontSize: 14, fontWeight: 600, fontFamily: SANS }}>Pause Auto-Pay</button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}

function StoryCard({ gradient, tag, title, desc, emoji, wide, onClick }: {
  gradient: string; tag: string; title: string; desc: string; emoji: string; wide?: boolean; onClick: () => void;
}) {
  return (
    <div
      onClick={onClick}
      style={{ background: gradient, borderRadius: 16, padding: 20, position: "relative", overflow: "hidden", cursor: "pointer", minHeight: 120, transition: "transform 0.2s, box-shadow 0.2s", gridColumn: wide ? "span 2" : undefined }}
      onMouseOver={e => { (e.currentTarget as HTMLDivElement).style.transform = "translateY(-2px)"; (e.currentTarget as HTMLDivElement).style.boxShadow = "0 8px 28px rgba(0,0,0,0.12)"; }}
      onMouseOut={e => { (e.currentTarget as HTMLDivElement).style.transform = ""; (e.currentTarget as HTMLDivElement).style.boxShadow = ""; }}
    >
      <p style={{ fontSize: 9, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.6px", marginBottom: 8, opacity: 0.7, color: "rgba(255,255,255,0.7)" }}>{tag}</p>
      <p style={{ fontFamily: SERIF, fontSize: 19, color: "#fff", lineHeight: 1.2, marginBottom: 6 }}>{title}</p>
      <p style={{ fontSize: 11, color: "rgba(255,255,255,0.7)", lineHeight: 1.5 }}>{desc}</p>
      <span style={{ position: "absolute", bottom: 14, right: 16, fontSize: 32, opacity: 0.6 }}>{emoji}</span>
    </div>
  );
}

function MetricCard({ label, value, sub, valueColor, sparkline, children }: {
  label: string; value: string; sub: string; valueColor: string; sparkline?: boolean; children?: React.ReactNode;
}) {
  return (
    <div style={{ background: "#fff", border: "1px solid rgba(0,0,0,0.07)", borderRadius: 14, padding: "16px 18px", position: "relative", overflow: "hidden" }}>
      <p style={{ fontSize: 9, fontWeight: 700, color: MU, textTransform: "uppercase", letterSpacing: "0.7px", marginBottom: 6 }}>{label}</p>
      <p style={{ fontFamily: SERIF, fontSize: 26, color: valueColor, lineHeight: 1, marginBottom: 3 }}>{value}</p>
      <p style={{ fontSize: 11, color: valueColor === MU ? MU : valueColor, fontWeight: 600 }}>{sub}</p>
      {children}
    </div>
  );
}

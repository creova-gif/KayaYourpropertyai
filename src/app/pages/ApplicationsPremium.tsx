import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useNavigate } from "react-router";
import { Search, Filter, CheckCircle2, AlertTriangle, XCircle, ChevronRight, Brain, Building2, Briefcase } from "lucide-react";
import { AIContextualHelper } from "../components/AIContextualHelper";

const G = "#0A7A52";
const GL = "#E5F4EE";
const BG = "#F8F7F4";
const BORDER = "rgba(0,0,0,0.07)";
const TEXT = "#0E0F0C";
const MUTED = "#767570";

interface Application {
  id: string;
  name: string;
  unit: string;
  rent: number;
  aiScore: number;
  riskLevel: "low" | "medium" | "high";
  recommendation: "approve" | "review" | "reject";
  creditScore: number;
  income: number;
  rentToIncomeRatio: number;
  employmentYears: number;
  appliedDate: string;
}

const applications: Application[] = [
  { id: "1", name: "Sarah Kim", unit: "Unit 4A — 2 Bedroom", rent: 2300, aiScore: 92, riskLevel: "low", recommendation: "approve", creditScore: 745, income: 8500, rentToIncomeRatio: 27, employmentYears: 4.5, appliedDate: "Mar 14" },
  { id: "2", name: "Michael Patel", unit: "Unit 2B — 1 Bedroom", rent: 1950, aiScore: 87, riskLevel: "low", recommendation: "approve", creditScore: 712, income: 6800, rentToIncomeRatio: 29, employmentYears: 3.2, appliedDate: "Mar 15" },
  { id: "3", name: "Jason Lee", unit: "Unit 1C — 3 Bedroom", rent: 2800, aiScore: 68, riskLevel: "medium", recommendation: "review", creditScore: 658, income: 7200, rentToIncomeRatio: 39, employmentYears: 1.8, appliedDate: "Mar 13" },
  { id: "4", name: "Emma Chen", unit: "Unit 3B — 1 Bedroom", rent: 1850, aiScore: 55, riskLevel: "high", recommendation: "reject", creditScore: 590, income: 4200, rentToIncomeRatio: 44, employmentYears: 0.8, appliedDate: "Mar 12" },
  { id: "5", name: "David Martinez", unit: "Unit 5A — 2 Bedroom", rent: 2200, aiScore: 89, riskLevel: "low", recommendation: "approve", creditScore: 728, income: 8200, rentToIncomeRatio: 27, employmentYears: 5.2, appliedDate: "Mar 15" },
];

interface BusinessApplication {
  id: string;
  companyName: string;
  contactName: string;
  unit: string;
  baseRent: number;
  aiScore: number;
  riskLevel: "low" | "medium" | "high";
  recommendation: "approve" | "review" | "reject";
  businessCreditScore: number;
  annualRevenue: number;
  incorporationYear: number;
  hasPersonalGuarantee: boolean;
  leaseType: string;
  appliedDate: string;
  incorporationNo: string;
}

const businessApplications: BusinessApplication[] = [
  { id: "b1", companyName: "Maple Leaf Café Inc.", contactName: "Priya Anand (Director)", unit: "Suite 101 — 1,200 sqft Retail", baseRent: 4800, aiScore: 88, riskLevel: "low", recommendation: "approve", businessCreditScore: 72, annualRevenue: 420000, incorporationYear: 2019, hasPersonalGuarantee: true, leaseType: "NNN", appliedDate: "Mar 12", incorporationNo: "ON-3847201" },
  { id: "b2", companyName: "TechNest Solutions Ltd.", contactName: "Jordan Wu (CEO)", unit: "Suite 305 — 2,400 sqft Office", baseRent: 9200, aiScore: 94, riskLevel: "low", recommendation: "approve", businessCreditScore: 81, annualRevenue: 1850000, incorporationYear: 2017, hasPersonalGuarantee: true, leaseType: "Gross", appliedDate: "Mar 14", incorporationNo: "ON-2194830" },
  { id: "b3", companyName: "Northview Fitness Co.", contactName: "Marcus Osei (Owner)", unit: "Suite 200 — 3,800 sqft", baseRent: 12400, aiScore: 61, riskLevel: "medium", recommendation: "review", businessCreditScore: 54, annualRevenue: 280000, incorporationYear: 2022, hasPersonalGuarantee: false, leaseType: "Modified Gross", appliedDate: "Mar 10", incorporationNo: "ON-4921047" },
  { id: "b4", companyName: "GreenByte Digital Inc.", contactName: "Sophie Tremblay (COO)", unit: "Suite 410 — 1,600 sqft Office", baseRent: 5600, aiScore: 79, riskLevel: "low", recommendation: "approve", businessCreditScore: 68, annualRevenue: 740000, incorporationYear: 2020, hasPersonalGuarantee: true, leaseType: "NNN", appliedDate: "Mar 15", incorporationNo: "ON-3310482" },
];

function ScoreRing({ score, risk }: { score: number; risk: string }) {
  const color = risk === "low" ? G : risk === "medium" ? "#B45309" : "#C0392B";
  const bg = risk === "low" ? GL : risk === "medium" ? "#FEF3C7" : "#FDECEA";
  return (
    <div style={{ width: 56, height: 56, borderRadius: "50%", background: bg, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
      <span style={{ fontSize: 18, fontWeight: 700, color, lineHeight: 1 }}>{score}</span>
      <span style={{ fontSize: 9, color, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.3px" }}>AI</span>
    </div>
  );
}

function RiskBadge({ rec, risk }: { rec: string; risk: string }) {
  const map = {
    approve: { bg: GL, color: G, icon: <CheckCircle2 size={12} />, label: "Approve" },
    review:  { bg: "#FEF3C7", color: "#B45309", icon: <AlertTriangle size={12} />, label: "Review" },
    reject:  { bg: "#FDECEA", color: "#C0392B", icon: <XCircle size={12} />, label: "Reject" },
  };
  const c = map[rec as keyof typeof map];
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 5, background: c.bg, color: c.color, fontSize: 12, fontWeight: 600, padding: "5px 12px", borderRadius: 20 }}>
      {c.icon}{c.label}
    </span>
  );
}

function StatPill({ label, value, warn }: { label: string; value: string; warn?: boolean }) {
  return (
    <div style={{ textAlign: "center" }}>
      <p style={{ fontSize: 14, fontWeight: 700, color: warn ? "#B45309" : TEXT }}>{value}</p>
      <p style={{ fontSize: 10, color: MUTED, marginTop: 2, fontWeight: 500 }}>{label}</p>
    </div>
  );
}

export function ApplicationsPremium() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [tenantType, setTenantType] = useState<"residential" | "business">("residential");

  const filtered = applications.filter(a =>
    (filter === "all" || a.riskLevel === filter) &&
    (a.name.toLowerCase().includes(search.toLowerCase()) || a.unit.toLowerCase().includes(search.toLowerCase()))
  );

  const filteredBusiness = businessApplications.filter(a =>
    (filter === "all" || a.riskLevel === filter) &&
    (a.companyName.toLowerCase().includes(search.toLowerCase()) || a.unit.toLowerCase().includes(search.toLowerCase()))
  );

  const stats = tenantType === "residential" ? {
    total: applications.length,
    pending: applications.length,
    highScore: applications.filter(a => a.aiScore >= 85).length,
    attention: applications.filter(a => a.riskLevel !== "low").length,
  } : {
    total: businessApplications.length,
    pending: businessApplications.length,
    highScore: businessApplications.filter(a => a.aiScore >= 85).length,
    attention: businessApplications.filter(a => a.riskLevel !== "low").length,
  };

  return (
    <div style={{ minHeight: "100vh", background: BG, fontFamily: "'DM Sans', system-ui, sans-serif", position: "relative" }}>
      {/* AI Contextual Helper - Application-specific suggestions */}
      <AIContextualHelper
        context="Application Review"
        suggestions={[
          "Screen Sarah Kim with AI",
          "Compare all high-score applicants",
          "Check income verification requirements",
          "Generate approval letter"
        ]}
        position="top-right"
      />
      
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "48px 40px 80px" }}>

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} style={{ marginBottom: 40 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 14, marginBottom: 8 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <div style={{ width: 40, height: 40, borderRadius: 12, background: TEXT, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Brain size={20} color="#fff" />
              </div>
              <div>
                <h1 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 42, fontWeight: 400, color: TEXT, lineHeight: 1, letterSpacing: "-0.5px" }}>
                  Smart Screening
                </h1>
              </div>
            </div>
            {/* Tenant type toggle */}
            <div style={{ display: "flex", background: "#fff", border: `1px solid ${BORDER}`, borderRadius: 10, padding: 4, gap: 4 }}>
              <button onClick={() => { setTenantType("residential"); setFilter("all"); }}
                style={{ padding: "8px 16px", borderRadius: 7, border: "none", fontSize: 13, fontWeight: 600, cursor: "pointer",
                  background: tenantType === "residential" ? TEXT : "transparent", color: tenantType === "residential" ? "#fff" : MUTED, transition: "all .2s", display: "flex", alignItems: "center", gap: 6 }}>
                Residential
              </button>
              <button onClick={() => { setTenantType("business"); setFilter("all"); }}
                style={{ padding: "8px 16px", borderRadius: 7, border: "none", fontSize: 13, fontWeight: 600, cursor: "pointer",
                  background: tenantType === "business" ? TEXT : "transparent", color: tenantType === "business" ? "#fff" : MUTED, transition: "all .2s", display: "flex", alignItems: "center", gap: 6 }}>
                <Building2 size={13} />Business Tenants
              </button>
            </div>
          </div>
          <p style={{ fontSize: 14, color: MUTED, marginLeft: 54 }}>
            {tenantType === "residential" ? "AI-powered tenant analysis" : "Corporate entity screening"} — {stats.total} applications
          </p>
        </motion.div>

        {/* Stat row */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14, marginBottom: 32 }}>
          {[
            { label: "Total", val: stats.total, color: TEXT },
            { label: "Pending", val: stats.pending, color: TEXT },
            { label: "High AI Score", val: stats.highScore, color: G },
            { label: "Needs Attention", val: stats.attention, color: "#B45309" },
          ].map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
              style={{ background: "#fff", border: `1px solid ${BORDER}`, borderRadius: 14, padding: "20px 22px" }}
            >
              <p style={{ fontSize: 10, color: MUTED, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.7px", marginBottom: 8 }}>{s.label}</p>
              <p style={{ fontFamily: "'Instrument Serif', serif", fontSize: 36, color: s.color, lineHeight: 1 }}>{s.val}</p>
            </motion.div>
          ))}
        </div>

        {/* Filters */}
        <div style={{ display: "flex", gap: 12, marginBottom: 24, alignItems: "center" }}>
          <div style={{ position: "relative", flex: 1, maxWidth: 340 }}>
            <Search size={15} color={MUTED} style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)" }} />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search applicants..."
              style={{ width: "100%", padding: "11px 14px 11px 38px", border: `1px solid ${BORDER}`, borderRadius: 10, fontSize: 13, fontFamily: "inherit", background: "#fff", color: TEXT, outline: "none" }}
            />
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            {["all", "low", "medium", "high"].map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                style={{
                  padding: "9px 16px", borderRadius: 20, fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", border: "1px solid",
                  background: filter === f ? TEXT : "#fff",
                  color: filter === f ? "#fff" : MUTED,
                  borderColor: filter === f ? TEXT : BORDER,
                  transition: "all 0.15s"
                }}
              >
                {f === "all" ? "All" : f.charAt(0).toUpperCase() + f.slice(1) + " risk"}
              </button>
            ))}
          </div>
          <p style={{ marginLeft: "auto", fontSize: 12, color: MUTED }}>{filtered.length} of {applications.length}</p>
        </div>

        {/* Residential Application List */}
        {tenantType === "residential" && (
          <>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <AnimatePresence>
                {filtered.map((app, i) => (
                  <motion.div
                    key={app.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ delay: i * 0.05 }}
                    onClick={() => navigate(`/applications/${app.id}`)}
                    whileHover={{ x: 4 }}
                    style={{
                      background: "#fff", border: `1px solid ${BORDER}`, borderRadius: 16,
                      padding: "20px 24px", cursor: "pointer", display: "flex", alignItems: "center", gap: 20,
                      borderLeft: `3px solid ${app.riskLevel === "low" ? G : app.riskLevel === "medium" ? "#B45309" : "#C0392B"}`,
                    }}
                  >
                    <ScoreRing score={app.aiScore} risk={app.riskLevel} />
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
                        <p style={{ fontSize: 16, fontWeight: 600, color: TEXT }}>{app.name}</p>
                        <RiskBadge rec={app.recommendation} risk={app.riskLevel} />
                      </div>
                      <p style={{ fontSize: 13, color: MUTED, marginBottom: 12 }}>{app.unit} · Applied {app.appliedDate}</p>
                      <div style={{ display: "flex", gap: 32 }}>
                        <StatPill label="Monthly income" value={`$${app.income.toLocaleString()}`} />
                        <StatPill label="Rent / income" value={`${app.rentToIncomeRatio}%`} warn={app.rentToIncomeRatio > 35} />
                        <StatPill label="Credit score" value={String(app.creditScore)} warn={app.creditScore < 650} />
                        <StatPill label="Employment" value={`${app.employmentYears} yrs`} warn={app.employmentYears < 1} />
                      </div>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: "flex-end" }}>
                      {app.recommendation === "approve" && (
                        <button onClick={e => { e.stopPropagation(); }}
                          style={{ padding: "9px 20px", background: G, color: "#fff", border: "none", borderRadius: 10, fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>
                          Approve
                        </button>
                      )}
                      <button onClick={e => { e.stopPropagation(); navigate(`/applications/${app.id}`); }}
                        style={{ padding: "9px 20px", background: BG, color: MUTED, border: `1px solid ${BORDER}`, borderRadius: 10, fontSize: 12, fontWeight: 500, cursor: "pointer", fontFamily: "inherit", display: "flex", alignItems: "center", gap: 4 }}>
                        View details <ChevronRight size={12} />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
            {filtered.length === 0 && (
              <div style={{ textAlign: "center", padding: "60px 0" }}>
                <p style={{ fontSize: 16, color: MUTED }}>No applications match your filter.</p>
              </div>
            )}
          </>
        )}

        {/* Business Tenant Application List */}
        {tenantType === "business" && (
          <>
            <div style={{ background: "#EBF2FB", border: "1px solid #BFDBFE", borderRadius: 12, padding: "12px 16px", marginBottom: 20, display: "flex", gap: 10, alignItems: "center" }}>
              <Briefcase size={15} color="#1E5FA8" />
              <span style={{ fontSize: 13, color: "#1E5FA8", fontWeight: 500 }}>Business tenant screening includes corporate credit, incorporation status, personal guarantee, and annual revenue verification.</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <AnimatePresence>
                {filteredBusiness.map((app, i) => {
                  const rColor = app.riskLevel === "low" ? G : app.riskLevel === "medium" ? "#B45309" : "#C0392B";
                  return (
                    <motion.div
                      key={app.id}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ delay: i * 0.05 }}
                      whileHover={{ x: 4 }}
                      style={{
                        background: "#fff", border: `1px solid ${BORDER}`, borderRadius: 16,
                        padding: "20px 24px", cursor: "pointer", display: "flex", alignItems: "flex-start", gap: 20,
                        borderLeft: `3px solid ${rColor}`,
                      }}
                    >
                      {/* AI Score */}
                      <ScoreRing score={app.aiScore} risk={app.riskLevel} />

                      <div style={{ flex: 1 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 2, flexWrap: "wrap" }}>
                          <p style={{ fontSize: 16, fontWeight: 700, color: TEXT }}>{app.companyName}</p>
                          <RiskBadge rec={app.recommendation} risk={app.riskLevel} />
                          {app.hasPersonalGuarantee && (
                            <span style={{ fontSize: 11, fontWeight: 600, background: GL, color: G, padding: "2px 9px", borderRadius: 20 }}>✓ Personal Guarantee</span>
                          )}
                          {!app.hasPersonalGuarantee && (
                            <span style={{ fontSize: 11, fontWeight: 600, background: "#FEF3C7", color: "#B45309", padding: "2px 9px", borderRadius: 20 }}>⚠ No Guarantee</span>
                          )}
                        </div>
                        <p style={{ fontSize: 13, color: MUTED, marginBottom: 14 }}>
                          {app.contactName} · {app.unit} · {app.leaseType} Lease · Applied {app.appliedDate}
                        </p>
                        <div style={{ display: "flex", gap: 32, flexWrap: "wrap" }}>
                          <StatPill label="Business Credit" value={`${app.businessCreditScore}/100`} warn={app.businessCreditScore < 60} />
                          <StatPill label="Annual Revenue" value={`$${(app.annualRevenue/1000).toFixed(0)}K`} />
                          <StatPill label="Inc. Year" value={String(app.incorporationYear)} warn={app.incorporationYear >= 2023} />
                          <StatPill label="Base Rent" value={`$${app.baseRent.toLocaleString()}/mo`} />
                        </div>
                        <p style={{ fontSize: 11, color: MUTED, marginTop: 10 }}>Corp. No: {app.incorporationNo}</p>
                      </div>

                      <div style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: "flex-end", flexShrink: 0 }}>
                        {app.recommendation === "approve" && (
                          <button style={{ padding: "9px 20px", background: G, color: "#fff", border: "none", borderRadius: 10, fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>
                            Approve
                          </button>
                        )}
                        <button style={{ padding: "9px 20px", background: BG, color: MUTED, border: `1px solid ${BORDER}`, borderRadius: 10, fontSize: 12, fontWeight: 500, cursor: "pointer", fontFamily: "inherit", display: "flex", alignItems: "center", gap: 4 }}>
                          View LOI <ChevronRight size={12} />
                        </button>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
            {filteredBusiness.length === 0 && (
              <div style={{ textAlign: "center", padding: "60px 0" }}>
                <p style={{ fontSize: 16, color: MUTED }}>No business applications match your filter.</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
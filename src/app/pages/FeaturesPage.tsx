import { PublicNav } from "../components/PublicNav";
import { motion } from "motion/react";
import { Link } from "react-router";
import {
  CheckCircle,
  Sparkles,
  Shield,
  FileText,
  TrendingUp,
  Bell,
  Users,
  Calculator,
  Globe,
  Zap,
  DollarSign,
  MessageSquare,
} from "lucide-react";

import React from "react";

const PRIMARY = "#0A7A52";
const BACKGROUND = "#F8F7F4";
const TEXT = "#0E0F0C";
const MUTED = "#767570";
const GL = "#E5F4EE";

type FeatureDef = {
  icon: React.ComponentType<{ size?: number; color?: string; strokeWidth?: number }>;
  title: string;
  description: string;
  preview: () => React.ReactNode;
};

const features: FeatureDef[] = [
  {
    icon: Sparkles,
    title: "AI-Powered Screening",
    description:
      "Advanced AI algorithms analyze tenant applications, credit reports, and employment history to provide instant risk assessments and recommendations.",
    preview: () => (
      <div style={{ background: BACKGROUND, borderRadius: 12, padding: "14px 16px", marginBottom: 20, border: "1px solid rgba(0,0,0,0.06)" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
          <span style={{ fontSize: 11, fontWeight: 700, color: PRIMARY, textTransform: "uppercase", letterSpacing: "0.6px" }}>AI Risk Score</span>
          <span style={{ fontSize: 18, fontWeight: 700, color: PRIMARY, fontFamily: "'Instrument Serif', Georgia, serif" }}>94 / 100</span>
        </div>
        {[["Credit Score", "782", 85], ["Income Ratio", "3.8×", 90], ["Rental History", "Clean", 100]].map(([label, val, pct]) => (
          <div key={label as string} style={{ marginBottom: 8 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
              <span style={{ fontSize: 10, color: MUTED, fontWeight: 500 }}>{label}</span>
              <span style={{ fontSize: 10, color: TEXT, fontWeight: 700 }}>{val}</span>
            </div>
            <div style={{ height: 4, borderRadius: 99, background: "rgba(0,0,0,0.06)" }}>
              <div style={{ height: "100%", width: `${pct}%`, borderRadius: 99, background: `linear-gradient(90deg, ${PRIMARY}, #5DCAA5)` }} />
            </div>
          </div>
        ))}
        <div style={{ display: "inline-flex", alignItems: "center", gap: 5, marginTop: 4, background: GL, borderRadius: 6, padding: "3px 8px" }}>
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: PRIMARY }} />
          <span style={{ fontSize: 10, fontWeight: 700, color: PRIMARY }}>LOW RISK — Recommended</span>
        </div>
      </div>
    ),
  },
  {
    icon: TrendingUp,
    title: "Rent Intelligence",
    description:
      "Real-time market analysis powered by AI to optimize your rental pricing, predict vacancy rates, and maximize your property ROI.",
    preview: () => {
      const months = ["Oct", "Nov", "Dec", "Jan", "Feb", "Mar"];
      const vals = [2050, 2100, 2180, 2240, 2290, 2350];
      const max = 2500;
      return (
        <div style={{ background: BACKGROUND, borderRadius: 12, padding: "14px 16px", marginBottom: 20, border: "1px solid rgba(0,0,0,0.06)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
            <div>
              <p style={{ fontSize: 10, color: MUTED, margin: 0, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.5px" }}>Recommended Rent</p>
              <p style={{ fontSize: 20, fontWeight: 400, color: TEXT, margin: "2px 0 0", fontFamily: "'Instrument Serif', Georgia, serif" }}>$2,350<span style={{ fontSize: 12, color: PRIMARY, fontWeight: 700, marginLeft: 6 }}>+14.6%</span></p>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 6, height: 44 }}>
            {vals.map((v, i) => (
              <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
                <div style={{ width: "100%", borderRadius: "3px 3px 0 0", background: i === vals.length - 1 ? PRIMARY : "rgba(10,122,82,0.25)", height: `${(v / max) * 44}px`, transition: "height 0.3s" }} />
                <span style={{ fontSize: 8, color: MUTED }}>{months[i]}</span>
              </div>
            ))}
          </div>
        </div>
      );
    },
  },
  {
    icon: DollarSign,
    title: "Automated Rent Collection",
    description:
      "Seamless payment processing with multiple methods including Interac e-Transfer, credit cards, and pre-authorized debits. Automatic payment reminders and receipts.",
    preview: () => (
      <div style={{ background: BACKGROUND, borderRadius: 12, padding: "14px 16px", marginBottom: 20, border: "1px solid rgba(0,0,0,0.06)" }}>
        {[
          { name: "Sarah Kim · Unit 4A", amount: "$2,300", status: "Paid", color: PRIMARY, bg: GL },
          { name: "James Lu · Unit 2B", amount: "$1,850", status: "Paid", color: PRIMARY, bg: GL },
          { name: "Maya Patel · Unit 1C", amount: "$2,100", status: "Pending", color: "#B45309", bg: "#FEF3C7" },
        ].map(r => (
          <div key={r.name} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid rgba(0,0,0,0.05)" }}>
            <div>
              <p style={{ fontSize: 11, fontWeight: 600, color: TEXT, margin: 0 }}>{r.name}</p>
              <p style={{ fontSize: 10, color: MUTED, margin: "1px 0 0" }}>Jun 2026 rent</p>
            </div>
            <div style={{ textAlign: "right" }}>
              <p style={{ fontSize: 12, fontWeight: 700, color: TEXT, margin: 0 }}>{r.amount}</p>
              <span style={{ fontSize: 9, fontWeight: 700, color: r.color, background: r.bg, padding: "1px 6px", borderRadius: 99 }}>{r.status.toUpperCase()}</span>
            </div>
          </div>
        ))}
      </div>
    ),
  },
  {
    icon: Shield,
    title: "LTB Compliance",
    description:
      "Ontario-specific legal forms (N4, N5, N12, etc.), automated compliance checks, and step-by-step guidance for Landlord and Tenant Board processes.",
    preview: () => (
      <div style={{ background: BACKGROUND, borderRadius: 12, padding: "14px 16px", marginBottom: 20, border: "1px solid rgba(0,0,0,0.06)" }}>
        <p style={{ fontSize: 10, color: MUTED, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.5px", margin: "0 0 10px" }}>Ontario LTB Forms</p>
        {[
          { form: "N4", title: "Notice for Non-Payment", ready: true },
          { form: "N5", title: "Notice to Terminate", ready: true },
          { form: "N12", title: "Landlord Personal Use", ready: true },
          { form: "L1", title: "Application to Evict", ready: false },
        ].map(f => (
          <div key={f.form} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 7 }}>
            <div style={{ width: 28, height: 20, borderRadius: 4, background: f.ready ? GL : "rgba(0,0,0,0.06)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <span style={{ fontSize: 9, fontWeight: 800, color: f.ready ? PRIMARY : MUTED }}>{f.form}</span>
            </div>
            <span style={{ fontSize: 11, color: TEXT, flex: 1 }}>{f.title}</span>
            {f.ready && <CheckCircle size={12} color={PRIMARY} strokeWidth={2.5} />}
          </div>
        ))}
      </div>
    ),
  },
  {
    icon: FileText,
    title: "Digital Document Management",
    description:
      "Secure cloud storage for leases, receipts, maintenance records, and all property-related documents. Easy search and retrieval.",
    preview: () => (
      <div style={{ background: BACKGROUND, borderRadius: 12, padding: "14px 16px", marginBottom: 20, border: "1px solid rgba(0,0,0,0.06)" }}>
        {[
          { name: "Lease_4A_2026.pdf", size: "248 KB", date: "Jan 2026" },
          { name: "Receipt_Jun2026.pdf", size: "42 KB", date: "Jun 2026" },
          { name: "Inspection_May26.pdf", size: "1.2 MB", date: "May 2026" },
        ].map(f => (
          <div key={f.name} style={{ display: "flex", alignItems: "center", gap: 10, padding: "7px 0", borderBottom: "1px solid rgba(0,0,0,0.05)" }}>
            <div style={{ width: 28, height: 34, borderRadius: 4, background: "#FEF2F2", border: "1px solid rgba(239,68,68,0.15)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <span style={{ fontSize: 7, fontWeight: 800, color: "#DC2626" }}>PDF</span>
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ fontSize: 11, fontWeight: 600, color: TEXT, margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{f.name}</p>
              <p style={{ fontSize: 9, color: MUTED, margin: "1px 0 0" }}>{f.size} · {f.date}</p>
            </div>
          </div>
        ))}
        <p style={{ fontSize: 9, color: MUTED, margin: "8px 0 0", textAlign: "center" }}>3 of 47 documents</p>
      </div>
    ),
  },
  {
    icon: Calculator,
    title: "Financial Tracking & Tax Reports",
    description:
      "Comprehensive accounting dashboard tracking income, expenses, and net operating income. Automated tax reports for CRA compliance.",
    preview: () => (
      <div style={{ background: BACKGROUND, borderRadius: 12, padding: "14px 16px", marginBottom: 20, border: "1px solid rgba(0,0,0,0.06)" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 12 }}>
          {[
            { label: "Revenue", val: "$6,450", color: PRIMARY },
            { label: "Expenses", val: "$1,820", color: "#B45309" },
            { label: "NOI", val: "$4,630", color: "#1D4ED8" },
          ].map(s => (
            <div key={s.label} style={{ background: "#fff", borderRadius: 8, padding: "8px 10px", textAlign: "center", border: "1px solid rgba(0,0,0,0.06)" }}>
              <p style={{ fontSize: 12, fontWeight: 700, color: s.color, margin: 0, fontFamily: "'Instrument Serif', Georgia, serif" }}>{s.val}</p>
              <p style={{ fontSize: 9, color: MUTED, margin: "2px 0 0" }}>{s.label}</p>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6, background: GL, borderRadius: 8, padding: "7px 10px" }}>
          <CheckCircle size={12} color={PRIMARY} strokeWidth={2.5} />
          <span style={{ fontSize: 10, color: PRIMARY, fontWeight: 600 }}>CRA-ready T776 report available</span>
        </div>
      </div>
    ),
  },
  {
    icon: Bell,
    title: "Maintenance Management",
    description:
      "Track repair requests, schedule preventive maintenance, manage service providers, and maintain complete maintenance history.",
    preview: () => (
      <div style={{ background: BACKGROUND, borderRadius: 12, padding: "14px 16px", marginBottom: 20, border: "1px solid rgba(0,0,0,0.06)" }}>
        {[
          { title: "Leaky faucet · Kitchen", unit: "Unit 4A", priority: "High", color: "#DC2626", bg: "#FEF2F2" },
          { title: "HVAC filter replacement", unit: "Unit 2B", priority: "Med", color: "#B45309", bg: "#FEF3C7" },
          { title: "Window seal check", unit: "Unit 1C", priority: "Low", color: PRIMARY, bg: GL },
        ].map(r => (
          <div key={r.title} style={{ display: "flex", alignItems: "center", gap: 8, padding: "7px 0", borderBottom: "1px solid rgba(0,0,0,0.05)" }}>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ fontSize: 11, fontWeight: 600, color: TEXT, margin: 0 }}>{r.title}</p>
              <p style={{ fontSize: 9, color: MUTED, margin: "1px 0 0" }}>{r.unit}</p>
            </div>
            <span style={{ fontSize: 8, fontWeight: 800, color: r.color, background: r.bg, padding: "2px 6px", borderRadius: 99, flexShrink: 0 }}>{r.priority.toUpperCase()}</span>
          </div>
        ))}
      </div>
    ),
  },
  {
    icon: Users,
    title: "Tenant Portal",
    description:
      "Give tenants 24/7 access to pay rent, submit maintenance requests, view lease documents, and communicate directly with landlords.",
    preview: () => (
      <div style={{ background: TEXT, borderRadius: 12, padding: "14px 16px", marginBottom: 20 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <div style={{ width: 22, height: 22, borderRadius: 6, background: `linear-gradient(135deg, ${PRIMARY}, #065E3C)`, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontSize: 9, fontWeight: 800, color: "#fff" }}>K</span>
            </div>
            <span style={{ fontSize: 10, color: "rgba(255,255,255,0.5)", fontWeight: 600 }}>Tenant Portal</span>
          </div>
        </div>
        <p style={{ fontSize: 9, color: "rgba(255,255,255,0.4)", margin: "0 0 4px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.5px" }}>Next Payment</p>
        <p style={{ fontSize: 22, color: "#fff", margin: "0 0 10px", fontFamily: "'Instrument Serif', Georgia, serif" }}>$2,300 <span style={{ fontSize: 10, color: "rgba(255,255,255,0.4)" }}>Due Jul 1</span></p>
        <div style={{ display: "flex", gap: 6 }}>
          <div style={{ flex: 1, background: "#fff", borderRadius: 7, padding: "6px 0", textAlign: "center" }}>
            <span style={{ fontSize: 10, fontWeight: 700, color: PRIMARY }}>Pay Now</span>
          </div>
          <div style={{ flex: 1, border: "1px solid rgba(255,255,255,0.2)", borderRadius: 7, padding: "6px 0", textAlign: "center" }}>
            <span style={{ fontSize: 10, fontWeight: 600, color: "rgba(255,255,255,0.6)" }}>Schedule</span>
          </div>
        </div>
      </div>
    ),
  },
  {
    icon: Globe,
    title: "Multi-Language Support",
    description:
      "Platform available in English, French, Mandarin, Cantonese, Punjabi, and more to serve Ontario's diverse communities.",
    preview: () => (
      <div style={{ background: BACKGROUND, borderRadius: 12, padding: "14px 16px", marginBottom: 20, border: "1px solid rgba(0,0,0,0.06)" }}>
        <p style={{ fontSize: 10, color: MUTED, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.5px", margin: "0 0 10px" }}>Available Languages</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {[
            { flag: "🇨🇦", lang: "English" },
            { flag: "🇫🇷", lang: "French" },
            { flag: "🇨🇳", lang: "中文" },
            { flag: "🇮🇳", lang: "Punjabi" },
            { flag: "🇰🇷", lang: "한국어" },
            { flag: "🇵🇭", lang: "Filipino" },
          ].map(l => (
            <div key={l.lang} style={{ display: "flex", alignItems: "center", gap: 4, background: "#fff", border: "1px solid rgba(0,0,0,0.07)", borderRadius: 99, padding: "4px 10px" }}>
              <span style={{ fontSize: 11 }}>{l.flag}</span>
              <span style={{ fontSize: 10, fontWeight: 600, color: TEXT }}>{l.lang}</span>
            </div>
          ))}
        </div>
        <p style={{ fontSize: 9, color: PRIMARY, fontWeight: 600, margin: "8px 0 0" }}>+ auto-detection based on browser language</p>
      </div>
    ),
  },
  {
    icon: MessageSquare,
    title: "Built-in Messaging",
    description:
      "Secure communication between landlords and tenants with message history, read receipts, and file attachments.",
    preview: () => (
      <div style={{ background: BACKGROUND, borderRadius: 12, padding: "14px 16px", marginBottom: 20, border: "1px solid rgba(0,0,0,0.06)" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <div style={{ display: "flex", justifyContent: "flex-start" }}>
            <div style={{ background: "#fff", border: "1px solid rgba(0,0,0,0.07)", borderRadius: "0 10px 10px 10px", padding: "7px 11px", maxWidth: "80%" }}>
              <p style={{ fontSize: 11, color: TEXT, margin: 0 }}>Hi! When can the plumber come?</p>
              <p style={{ fontSize: 8, color: MUTED, margin: "3px 0 0" }}>Sarah · 10:24 AM</p>
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <div style={{ background: PRIMARY, borderRadius: "10px 0 10px 10px", padding: "7px 11px", maxWidth: "80%" }}>
              <p style={{ fontSize: 11, color: "#fff", margin: 0 }}>Tomorrow between 9–11 AM works!</p>
              <p style={{ fontSize: 8, color: "rgba(255,255,255,0.6)", margin: "3px 0 0" }}>You · 10:26 AM · Read</p>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    icon: Zap,
    title: "Automated Workflows",
    description:
      "Set up automatic reminders, scheduled reports, recurring payments, and custom triggers to save time on repetitive tasks.",
    preview: () => (
      <div style={{ background: BACKGROUND, borderRadius: 12, padding: "14px 16px", marginBottom: 20, border: "1px solid rgba(0,0,0,0.06)" }}>
        <p style={{ fontSize: 10, color: MUTED, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.5px", margin: "0 0 10px" }}>Active Automations</p>
        {[
          { trigger: "5 days before rent due", action: "Send payment reminder", on: true },
          { trigger: "Rent paid", action: "Generate & email receipt", on: true },
          { trigger: "Lease expires in 90 days", action: "Send renewal notice", on: true },
        ].map(w => (
          <div key={w.trigger} style={{ display: "flex", alignItems: "flex-start", gap: 8, marginBottom: 8 }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: PRIMARY, marginTop: 3, flexShrink: 0 }} />
            <div>
              <p style={{ fontSize: 10, color: MUTED, margin: 0 }}>When: <span style={{ color: TEXT, fontWeight: 600 }}>{w.trigger}</span></p>
              <p style={{ fontSize: 10, color: MUTED, margin: "1px 0 0" }}>Then: <span style={{ color: PRIMARY, fontWeight: 600 }}>{w.action}</span></p>
            </div>
          </div>
        ))}
      </div>
    ),
  },
  {
    icon: CheckCircle,
    title: "Guarantor Management",
    description:
      "Complete guarantor workflows including verification, digital signatures, and automated notifications for rent guarantor programs.",
    preview: () => (
      <div style={{ background: BACKGROUND, borderRadius: 12, padding: "14px 16px", marginBottom: 20, border: "1px solid rgba(0,0,0,0.06)" }}>
        <p style={{ fontSize: 10, color: MUTED, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.5px", margin: "0 0 10px" }}>Guarantor Agreement</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
          {[
            { step: "1", label: "ID verification", done: true },
            { step: "2", label: "Employment check", done: true },
            { step: "3", label: "Digital signature", done: true },
            { step: "4", label: "Landlord countersign", done: false },
          ].map(s => (
            <div key={s.step} style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ width: 20, height: 20, borderRadius: "50%", background: s.done ? PRIMARY : "rgba(0,0,0,0.06)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                {s.done ? <CheckCircle size={11} color="#fff" strokeWidth={3} /> : <span style={{ fontSize: 9, fontWeight: 700, color: MUTED }}>{s.step}</span>}
              </div>
              <span style={{ fontSize: 11, color: s.done ? TEXT : MUTED, fontWeight: s.done ? 600 : 400 }}>{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    ),
  },
];

export function FeaturesPage() {
  return (
    <div style={{ minHeight: "100vh", background: BACKGROUND }}>
      <PublicNav />

      {/* Hero Section */}
      <section
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: "80px 24px 60px",
          textAlign: "center",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1
            style={{
              fontSize: 56,
              fontWeight: 400,
              color: TEXT,
              marginBottom: 24,
              fontFamily: "'Instrument Serif', Georgia, serif",
              lineHeight: 1.1,
            }}
          >
            Everything you need to manage
            <br />
            <span style={{ color: PRIMARY, fontStyle: "italic" }}>
              rental properties
            </span>
          </h1>
          <p
            style={{
              fontSize: 18,
              color: MUTED,
              maxWidth: 720,
              margin: "0 auto 40px",
              lineHeight: 1.6,
            }}
          >
            KAYA brings together AI-powered tenant screening, automated rent
            collection, LTB compliance tools, and comprehensive property
            management in one intelligent platform built specifically for
            Ontario landlords.
          </p>
        </motion.div>
      </section>

      {/* Features Grid */}
      <section
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: "0 24px 80px",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
            gap: 32,
          }}
        >
          {features.map((feature, idx) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              style={{
                background: "white",
                padding: 28,
                borderRadius: 16,
                border: "1px solid rgba(0,0,0,0.07)",
                boxShadow: "0 2px 8px rgba(0,0,0,0.02)",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {feature.preview()}

              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 10,
                    background: `${PRIMARY}12`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <feature.icon
                    size={20}
                    color={PRIMARY}
                    strokeWidth={2.5}
                  />
                </div>
                <h3
                  style={{
                    fontSize: 18,
                    fontWeight: 400,
                    color: TEXT,
                    margin: 0,
                    fontFamily: "'Instrument Serif', Georgia, serif",
                  }}
                >
                  {feature.title}
                </h3>
              </div>
              <p
                style={{
                  fontSize: 14,
                  color: MUTED,
                  lineHeight: 1.65,
                  margin: 0,
                  flex: 1,
                }}
              >
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: "60px 24px 100px",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          style={{
            background: `linear-gradient(135deg, ${PRIMARY} 0%, #085D3D 100%)`,
            borderRadius: 24,
            padding: "60px 40px",
            textAlign: "center",
            color: "white",
          }}
        >
          <h2 className="text-[#ffffff]"
            style={{
              fontSize: 42,
              fontWeight: 400,
              marginBottom: 20,
              fontFamily: "'Instrument Serif', Georgia, serif",
            }}
          >
            Ready to get started?
          </h2>
          <p className="text-[#fffafa]"
            style={{
              fontSize: 18,
              marginBottom: 36,
              opacity: 0.95,
            }}
          >
            Join hundreds of Ontario landlords simplifying their property
            management.
          </p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center" }}>
            <Link
              to="/app"
              style={{
                padding: "16px 32px",
                background: "white",
                color: PRIMARY,
                borderRadius: 12,
                fontSize: 16,
                fontWeight: 600,
                textDecoration: "none",
                display: "inline-block",
              }}
            >
              Start Free Trial
            </Link>
            <Link
              to="/contact"
              style={{
                padding: "16px 32px",
                background: "transparent",
                color: "white",
                border: "2px solid white",
                borderRadius: 12,
                fontSize: 16,
                fontWeight: 600,
                textDecoration: "none",
                display: "inline-block",
              }}
            >
              Contact Sales
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer
        style={{
          background: "white",
          borderTop: "1px solid rgba(0,0,0,0.07)",
          padding: "40px 24px",
        }}
      >
        <div
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 24,
          }}
        >
          <div>
            <p style={{ fontSize: 24, fontWeight: 500, color: PRIMARY, marginBottom: 8, fontFamily: "'Instrument Serif', Georgia, serif" }}>
              KAYA
            </p>
            <p style={{ fontSize: 13, color: MUTED }}>
              Ontario's AI-powered property management platform
            </p>
          </div>
          <div style={{ textAlign: "right" }}>
            <p style={{ fontSize: 13, color: MUTED, marginBottom: 4 }}>
              Need help? Contact our support team
            </p>
            <a
              href="mailto:support@creova.one"
              style={{
                fontSize: 15,
                color: PRIMARY,
                textDecoration: "none",
                fontWeight: 600,
              }}
            >
              support@creova.one
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
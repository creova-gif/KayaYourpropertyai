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

const PRIMARY = "#0A7A52";
const BACKGROUND = "#F8F7F4";
const TEXT = "#0E0F0C";
const MUTED = "#767570";

const features = [
  {
    icon: Sparkles,
    title: "AI-Powered Screening",
    description:
      "Advanced AI algorithms analyze tenant applications, credit reports, and employment history to provide instant risk assessments and recommendations.",
  },
  {
    icon: TrendingUp,
    title: "Rent Intelligence",
    description:
      "Real-time market analysis powered by AI to optimize your rental pricing, predict vacancy rates, and maximize your property ROI.",
  },
  {
    icon: DollarSign,
    title: "Automated Rent Collection",
    description:
      "Seamless payment processing with multiple methods including Interac e-Transfer, credit cards, and pre-authorized debits. Automatic payment reminders and receipts.",
  },
  {
    icon: Shield,
    title: "LTB Compliance",
    description:
      "Ontario-specific legal forms (N4, N5, N12, etc.), automated compliance checks, and step-by-step guidance for Landlord and Tenant Board processes.",
  },
  {
    icon: FileText,
    title: "Digital Document Management",
    description:
      "Secure cloud storage for leases, receipts, maintenance records, and all property-related documents. Easy search and retrieval.",
  },
  {
    icon: Calculator,
    title: "Financial Tracking & Tax Reports",
    description:
      "Comprehensive accounting dashboard tracking income, expenses, and net operating income. Automated tax reports for CRA compliance.",
  },
  {
    icon: Bell,
    title: "Maintenance Management",
    description:
      "Track repair requests, schedule preventive maintenance, manage service providers, and maintain complete maintenance history.",
  },
  {
    icon: Users,
    title: "Tenant Portal",
    description:
      "Give tenants 24/7 access to pay rent, submit maintenance requests, view lease documents, and communicate directly with landlords.",
  },
  {
    icon: Globe,
    title: "Multi-Language Support",
    description:
      "Platform available in English, French, Mandarin, Cantonese, Punjabi, and more to serve Ontario's diverse communities.",
  },
  {
    icon: MessageSquare,
    title: "Built-in Messaging",
    description:
      "Secure communication between landlords and tenants with message history, read receipts, and file attachments.",
  },
  {
    icon: Zap,
    title: "Automated Workflows",
    description:
      "Set up automatic reminders, scheduled reports, recurring payments, and custom triggers to save time on repetitive tasks.",
  },
  {
    icon: CheckCircle,
    title: "Guarantor Management",
    description:
      "Complete guarantor workflows including verification, digital signatures, and automated notifications for rent guarantor programs.",
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
                padding: 32,
                borderRadius: 16,
                border: "1px solid rgba(0,0,0,0.07)",
                boxShadow: "0 2px 8px rgba(0,0,0,0.02)",
              }}
            >
              <div
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: 12,
                  background: `${PRIMARY}10`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 20,
                }}
              >
                <feature.icon
                  size={28}
                  color={PRIMARY}
                  strokeWidth={2.5}
                />
              </div>
              <h3
                style={{
                  fontSize: 20,
                  fontWeight: 400,
                  color: TEXT,
                  marginBottom: 12,
                  fontFamily: "'Instrument Serif', Georgia, serif",
                }}
              >
                {feature.title}
              </h3>
              <p
                style={{
                  fontSize: 15,
                  color: MUTED,
                  lineHeight: 1.6,
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
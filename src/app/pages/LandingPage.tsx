import { useState } from "react";
import { motion } from "motion/react";
import { useNavigate, Link } from "react-router";
import { 
  Sparkles, Shield, TrendingUp, Zap, Brain, Lock, 
  CheckCircle, ArrowRight, ChevronRight, Building2, Users, FileText, MapPin
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { LanguageSwitcher } from "../components/LanguageSwitcher";

const G = "#0A7A52";
const GL = "#E5F4EE";
const TEXT = "#0E0F0C";
const MUTED = "#767570";

export function LandingPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [email, setEmail] = useState("");

  const features = [
    {
      icon: <Brain size={22} />,
      title: "AI-Powered Screening",
      description: "Intelligent tenant evaluation with 92% accuracy. Pre-screen applications in seconds, not hours.",
      cta: "See how it works"
    },
    {
      icon: <Shield size={22} />,
      title: "LTB Compliance",
      description: "Ontario-specific legal compliance built-in. Auto-generated notices, lease templates, and forms.",
      cta: "View compliance"
    },
    {
      icon: <TrendingUp size={22} />,
      title: "Rent Intelligence",
      description: "Real-time market data and pricing recommendations. Maximize revenue with AI-driven insights.",
      cta: "Explore insights"
    },
    {
      icon: <Zap size={22} />,
      title: "Automated Workflows",
      description: "From application to move-in, fully automated. Save 15+ hours per week on property management.",
      cta: "See automation"
    },
    {
      icon: <Lock size={22} />,
      title: "Trust & Safety",
      description: "Identity verification and fraud detection. Multi-layer security for landlords and tenants.",
      cta: "Security details"
    },
    {
      icon: <FileText size={22} />,
      title: "Document Vault",
      description: "Centralized document management with e-signatures. Digital lease signing in under 5 minutes.",
      cta: "Manage documents"
    }
  ];

  const stats = [
    { value: "12,000+", label: "Active landlords" },
    { value: "98%", label: "Tenant satisfaction" },
    { value: "$2.8B", label: "Properties managed" },
    { value: "15 hrs", label: "Saved per week" }
  ];

  return (
    <div style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}>
      {/* Navigation */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
        height: 74, padding: "0 64px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        background: "rgba(248,247,244,0.85)", backdropFilter: "blur(24px) saturate(180%)",
        borderBottom: "1px solid rgba(0,0,0,0.06)",
        boxShadow: "0 1px 0 0 rgba(255,255,255,0.5) inset"
      }}>
        {/* Logo with enhanced styling */}
        <div style={{ 
          display: "flex", 
          alignItems: "center", 
          gap: 12,
          cursor: "pointer",
          transition: "transform 0.2s ease"
        }} 
        onClick={() => navigate("/")}
        onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.02)"}
        onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
        >
          <div style={{
            width: 38,
            height: 38,
            borderRadius: 10,
            background: `linear-gradient(135deg, ${G} 0%, #085D3D 100%)`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 2px 8px rgba(10,122,82,0.15), inset 0 1px 0 rgba(255,255,255,0.2)"
          }}>
            <Building2 size={20} color="#fff" strokeWidth={2.5} />
          </div>
          <div style={{ 
            fontFamily: "'Instrument Serif', serif", 
            fontSize: 26, 
            color: TEXT,
            letterSpacing: "-0.5px"
          }}>
            Kaya<span style={{ color: G }}>.</span>
          </div>
          <div style={{
            fontSize: 9,
            color: MUTED,
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "1px",
            padding: "3px 8px",
            background: GL,
            borderRadius: 4,
            marginLeft: 4
          }}>
            BETA
          </div>
        </div>
        
        {/* Navigation Links with creative hover */}
        <div style={{ display: "flex", gap: 2, alignItems: "center" }}>
          {[
            { label: "Find a Home", path: "/listings" },
            { label: "Features", path: "/features" },
            { label: "Pricing", path: "/pricing" },
            { label: "About", path: "/about" },
            { label: "Contact", path: "/contact" }
          ].map(({ label, path }) => (
            <Link
              key={label}
              to={path}
              style={{ 
                fontSize: 14, 
                color: MUTED, 
                textDecoration: "none", 
                fontWeight: 500, 
                cursor: "pointer",
                padding: "10px 18px",
                borderRadius: 8,
                transition: "all 0.2s ease",
                position: "relative"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = TEXT;
                e.currentTarget.style.background = "rgba(10,122,82,0.04)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = MUTED;
                e.currentTarget.style.background = "transparent";
              }}
            >
              {label}
            </Link>
          ))}
        </div>

        {/* CTA Buttons with enhanced design */}
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <button 
            onClick={() => navigate("/listings")}
            style={{ 
              padding: "10px 20px", 
              border: `1.5px solid ${G}`, 
              borderRadius: 10, 
              background: GL, 
              fontSize: 14, 
              fontWeight: 500, 
              cursor: "pointer", 
              color: G,
              transition: "all 0.2s ease",
              boxShadow: "0 1px 2px rgba(10,122,82,0.08)",
              display: "flex",
              alignItems: "center",
              gap: 6
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = G;
              e.currentTarget.style.color = "#fff";
              e.currentTarget.style.boxShadow = "0 2px 8px rgba(10,122,82,0.2)";
              e.currentTarget.style.transform = "translateY(-1px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = GL;
              e.currentTarget.style.color = G;
              e.currentTarget.style.boxShadow = "0 1px 2px rgba(10,122,82,0.08)";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            <MapPin size={16} strokeWidth={2.5} />
            <span>Browse Homes</span>
          </button>
          <LanguageSwitcher />
          {user ? (
            <button 
              onClick={() => navigate("/app")}
              style={{ 
                padding: "10px 20px", 
                border: "1px solid rgba(0,0,0,0.08)", 
                borderRadius: 10, 
                background: "white", 
                fontSize: 14, 
                fontWeight: 500, 
                cursor: "pointer", 
                color: TEXT,
                transition: "all 0.2s ease",
                boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
                display: "flex",
                alignItems: "center",
                gap: 6
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(0,0,0,0.12)";
                e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.08)";
                e.currentTarget.style.transform = "translateY(-1px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(0,0,0,0.08)";
                e.currentTarget.style.boxShadow = "0 1px 2px rgba(0,0,0,0.04)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <Building2 size={16} strokeWidth={2.5} />
              <span>My Dashboard</span>
            </button>
          ) : (
            <button 
              onClick={() => navigate("/login")}
              style={{ 
                padding: "10px 20px", 
                border: "1px solid rgba(0,0,0,0.08)", 
                borderRadius: 10, 
                background: "white", 
                fontSize: 14, 
                fontWeight: 500, 
                cursor: "pointer", 
                color: TEXT,
                transition: "all 0.2s ease",
                boxShadow: "0 1px 2px rgba(0,0,0,0.04)"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(0,0,0,0.12)";
                e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.08)";
                e.currentTarget.style.transform = "translateY(-1px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(0,0,0,0.08)";
                e.currentTarget.style.boxShadow = "0 1px 2px rgba(0,0,0,0.04)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              Sign in
            </button>
          )}
          <button 
            onClick={() => navigate("/signup")}
            style={{ 
              padding: "11px 24px", 
              border: "none", 
              borderRadius: 10, 
              background: `linear-gradient(135deg, ${G} 0%, #085D3D 100%)`, 
              fontSize: 14, 
              fontWeight: 600, 
              cursor: "pointer", 
              color: "#fff",
              display: "flex",
              alignItems: "center",
              gap: 6,
              transition: "all 0.2s ease",
              boxShadow: "0 2px 8px rgba(10,122,82,0.2), inset 0 1px 0 rgba(255,255,255,0.2)",
              position: "relative",
              overflow: "hidden"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = "0 4px 16px rgba(10,122,82,0.3), inset 0 1px 0 rgba(255,255,255,0.2)";
              e.currentTarget.style.transform = "translateY(-1px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = "0 2px 8px rgba(10,122,82,0.2), inset 0 1px 0 rgba(255,255,255,0.2)";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            <span>Get started</span>
            <ArrowRight size={16} strokeWidth={2.5} />
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section style={{
        minHeight: "100vh", display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        padding: "120px 48px 80px", textAlign: "center",
        position: "relative", overflow: "hidden",
        background: TEXT
      }}>
        {/* Grid Pattern */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "64px 64px", pointerEvents: "none"
        }} />

        {/* Glow Effect */}
        <div style={{
          position: "absolute", width: 700, height: 700, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(10,122,82,0.18) 0%, transparent 70%)",
          top: "50%", left: "50%", transform: "translate(-50%, -60%)", pointerEvents: "none"
        }} />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{ position: "relative", zIndex: 1 }}
        >
          {/* Badge */}
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: 40, padding: "6px 16px 6px 8px",
            fontSize: 12, fontWeight: 600, color: GL, marginBottom: 32
          }}>
            <div style={{ width: 22, height: 22, background: G, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10 }}>
              <Sparkles size={12} color="#fff" />
            </div>
            Now with AI Co-Pilot
          </div>

          {/* Hero Title */}
          <h1 style={{
            fontFamily: "'Instrument Serif', serif",
            fontSize: "clamp(52px, 8vw, 96px)",
            fontWeight: 400,
            color: "#fff",
            lineHeight: 0.95,
            letterSpacing: "-2px",
            marginBottom: 28,
            maxWidth: 900
          }}>
            Ontario's <em style={{ fontStyle: "italic", color: G }}>smartest</em><br />
            landlord platform
          </h1>

          {/* Hero Subtitle */}
          <p style={{
            fontSize: 17,
            color: "rgba(255,255,255,0.5)",
            maxWidth: 500,
            lineHeight: 1.7,
            marginBottom: 44,
            fontWeight: 400
          }}>
            AI-powered tenant screening, automated compliance, and intelligent property management. Built for modern landlords.
          </p>

          {/* Hero Actions */}
          <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap", marginBottom: 60 }}>
            <button
              onClick={() => navigate("/signup")}
              style={{ padding: "14px 32px", background: G, color: "#fff", border: "none", borderRadius: 40, fontSize: 15, fontWeight: 600, cursor: "pointer" }}
            >
              Start free trial
            </button>
            <button 
              onClick={() => navigate("/features")}
              style={{ padding: "14px 32px", background: "transparent", color: "#fff", border: "1px solid rgba(255,255,255,0.2)", borderRadius: 40, fontSize: 15, fontWeight: 500, cursor: "pointer" }}
            >
              Watch demo
            </button>
          </div>

          {/* Stats */}
          <div style={{ display: "flex", gap: 48, justifyContent: "center", flexWrap: "wrap" }}>
            {stats.map((stat, i) => (
              <div key={i}>
                <div style={{ fontFamily: "'Instrument Serif', serif", fontSize: 36, color: "#fff", lineHeight: 1, marginBottom: 4 }}>
                  {stat.value}
                </div>
                <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", fontWeight: 500 }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Trust Strip */}
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0,
          background: "rgba(255,255,255,0.03)", borderTop: "1px solid rgba(255,255,255,0.06)",
          padding: "18px 48px", display: "flex", alignItems: "center", justifyContent: "center", gap: 44, flexWrap: "wrap"
        }}>
          {["LTB Compliant", "Bank-level security", "24/7 Support", "Ontario-focused"].map((item, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "rgba(255,255,255,0.45)" }}>
              <CheckCircle size={14} color={G} />
              {item}
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section style={{ background: "#fff", padding: "100px 48px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          {/* Section Header */}
          <div style={{ textAlign: "center", maxWidth: 600, margin: "0 auto 64px" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 11, fontWeight: 600, letterSpacing: 1, textTransform: "uppercase", color: G, marginBottom: 16 }}>
              <div style={{ width: 24, height: 1.5, background: G }} />
              PLATFORM FEATURES
            </div>
            <h2 style={{
              fontFamily: "'Instrument Serif', serif",
              fontSize: "clamp(36px, 5vw, 56px)",
              color: TEXT,
              letterSpacing: "-1px",
              lineHeight: 1.05,
              marginBottom: 14
            }}>
              Everything you need in <em style={{ fontStyle: "italic", color: G }}>one place</em>
            </h2>
            <p style={{ fontSize: 16, color: MUTED, lineHeight: 1.7, fontWeight: 400 }}>
              From tenant screening to lease signing, Kaya handles it all with AI-powered automation.
            </p>
          </div>

          {/* Feature Grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 20 }}>
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -4, boxShadow: "0 16px 48px rgba(0,0,0,0.08)" }}
                style={{
                  border: "1px solid rgba(0,0,0,0.07)",
                  borderRadius: 20,
                  padding: 28,
                  cursor: "pointer",
                  transition: "all 0.25s"
                }}
              >
                <div style={{ width: 44, height: 44, background: GL, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 18, color: G }}>
                  {feature.icon}
                </div>
                <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8, color: TEXT }}>
                  {feature.title}
                </h3>
                <p style={{ fontSize: 13, color: MUTED, lineHeight: 1.65, fontWeight: 400, marginBottom: 16 }}>
                  {feature.description}
                </p>
                <div style={{ fontSize: 12, fontWeight: 600, color: G, display: "flex", alignItems: "center", gap: 4, cursor: "pointer" }}>
                  {feature.cta} <ChevronRight size={14} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section style={{ background: "#F8F7F4", padding: "80px 48px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
          <h2 style={{
            fontFamily: "'Instrument Serif', serif",
            fontSize: "clamp(32px, 5vw, 48px)",
            color: TEXT,
            letterSpacing: "-1px",
            lineHeight: 1.1,
            marginBottom: 48
          }}>
            Trusted by Ontario's <em style={{ fontStyle: "italic", color: G }}>top landlords</em>
          </h2>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: 24 }}>
            {[
              { icon: <Building2 size={20} />, stat: "12,000+", label: "Active properties" },
              { icon: <Users size={20} />, stat: "45,000+", label: "Screened tenants" },
              { icon: <FileText size={20} />, stat: "100%", label: "Digital lease signing" }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                style={{
                  background: "#fff",
                  border: "1px solid rgba(0,0,0,0.07)",
                  borderRadius: 16,
                  padding: "32px 24px",
                  textAlign: "center"
                }}
              >
                <div style={{ width: 48, height: 48, background: GL, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px", color: G }}>
                  {item.icon}
                </div>
                <div style={{ fontFamily: "'Instrument Serif', serif", fontSize: 40, color: TEXT, lineHeight: 1, marginBottom: 8 }}>
                  {item.stat}
                </div>
                <div style={{ fontSize: 13, color: MUTED, fontWeight: 500 }}>
                  {item.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{
        background: G,
        padding: "96px 48px",
        textAlign: "center",
        position: "relative",
        overflow: "hidden"
      }}>
        <div style={{
          position: "absolute", inset: 0,
          background: "radial-gradient(ellipse 80% 80% at 20% 50%, rgba(255,255,255,0.04), transparent), radial-gradient(ellipse 60% 80% at 80% 50%, rgba(0,0,0,0.08), transparent)",
          pointerEvents: "none"
        }} />

        <div style={{ position: "relative", zIndex: 1 }}>
          <h2 style={{
            fontFamily: "'Instrument Serif', serif",
            fontSize: "clamp(40px, 6vw, 70px)",
            color: "#fff",
            letterSpacing: "-1.5px",
            lineHeight: 1,
            marginBottom: 14
          }}>
            Start managing smarter
          </h2>
          <p style={{ fontSize: 16, color: "rgba(255,255,255,0.7)", maxWidth: 420, margin: "0 auto 36px", lineHeight: 1.65, fontWeight: 400 }}>
            Join thousands of landlords already using Kaya to streamline their operations.
          </p>

          <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap", maxWidth: 500, margin: "0 auto 18px" }}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              style={{
                flex: 1,
                minWidth: 240,
                padding: "14px 20px",
                border: "1px solid rgba(255,255,255,0.2)",
                borderRadius: 40,
                background: "rgba(255,255,255,0.1)",
                fontSize: 14,
                color: "#fff",
                outline: "none",
                fontFamily: "'DM Sans', sans-serif"
              }}
            />
            <button
              onClick={() => navigate("/signup")}
              style={{
                padding: "14px 32px",
                background: "#fff",
                color: G,
                border: "none",
                borderRadius: 40,
                fontSize: 14,
                fontWeight: 600,
                cursor: "pointer",
                fontFamily: "'DM Sans', sans-serif",
                display: "flex",
                alignItems: "center",
                gap: 8
              }}
            >
              Get started <ArrowRight size={16} />
            </button>
          </div>

          <p style={{ fontSize: 12, color: "rgba(255,255,255,0.5)" }}>
            No credit card required · 14-day free trial
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: TEXT, color: "rgba(255,255,255,0.5)", padding: "48px 48px 32px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 48, marginBottom: 48 }}>
            <div>
              <div style={{ fontFamily: "'Instrument Serif', serif", fontSize: 24, color: "#fff", marginBottom: 12 }}>
                Kaya<span style={{ color: G }}>.</span>
              </div>
              <p style={{ fontSize: 14, lineHeight: 1.7, maxWidth: 280 }}>
                The AI-powered property management platform built for Ontario landlords.
              </p>
            </div>

            {[
              { title: "Product", links: ["Features", "Pricing", "Integrations", "Updates"] },
              { title: "Resources", links: ["Documentation", "Blog", "Support", "Contact"] },
              { title: "Legal", links: ["Privacy", "Terms", "Security", "Compliance"] }
            ].map((col, i) => (
              <div key={i}>
                <div style={{ fontSize: 12, fontWeight: 600, color: "#fff", textTransform: "uppercase", letterSpacing: 1, marginBottom: 16 }}>
                  {col.title}
                </div>
                {col.links.map((link, j) => (
                  <div key={j} style={{ fontSize: 14, marginBottom: 10, cursor: "pointer" }}>
                    {link}
                  </div>
                ))}
              </div>
            ))}
          </div>

          <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: 24, display: "flex", justifyContent: "space-between", fontSize: 13 }}>
            <div>© 2026 Kaya. All rights reserved.</div>
            <div style={{ display: "flex", gap: 24 }}>
              <span style={{ cursor: "pointer" }}>Twitter</span>
              <span style={{ cursor: "pointer" }}>LinkedIn</span>
              <span style={{ cursor: "pointer" }}>GitHub</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
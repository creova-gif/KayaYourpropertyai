import { Outlet, useNavigate, useLocation } from "react-router";
import {
  Building2, Menu, X, Plus, ChevronRight, Zap,
  Home, Bell
} from "lucide-react";
import { NavigationMenu } from "./NavigationMenu";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { TrialBanner } from "./TrialBanner";
import { GlobalAIAssistant } from "./GlobalAIAssistant";
import { AICommandPalette } from "./AICommandPalette";
import { AIFeatureAnnouncement } from "./AIFeatureAnnouncement";
import { useState } from "react";

const G = "#0A7A52";
const DARK = "#0C0D0A";
const SERIF = "'Instrument Serif', Georgia, serif";
const SANS = "'DM Sans', system-ui, sans-serif";

export function LayoutPremium() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const getPageContext = () => {
    const path = location.pathname;
    if (path.includes("applications")) return "Tenant Applications";
    if (path.includes("properties")) return "Properties Management";
    if (path.includes("ltb")) return "LTB Forms & Notices";
    if (path.includes("tenants")) return "Tenant Management";
    if (path.includes("payments") || path.includes("financial")) return "Payments & Financial";
    if (path.includes("maintenance")) return "Maintenance Requests";
    if (path.includes("analytics") || path.includes("reports")) return "Analytics & Reports";
    if (path.includes("ai-assistant")) return "AI Assistant";
    if (path === "/app") return "Dashboard";
    return "KAYA Platform";
  };

  const close = () => setMobileMenuOpen(false);

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#F8F7F4", fontFamily: SANS }}>
      <a href="#main-content" className="skip-to-content">Skip to main content</a>

      <GlobalAIAssistant pageContext={getPageContext()} userContext="Premium landlord" userId="demo-landlord" />
      <AICommandPalette userId="demo-landlord" />
      <AIFeatureAnnouncement />

      {/* Mobile hamburger */}
      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
        className="lg:hidden"
        style={{
          position: "fixed", top: 14, left: 14, zIndex: 60,
          width: 42, height: 42, borderRadius: 11,
          background: DARK, border: "none", cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "0 4px 12px rgba(0,0,0,0.25)"
        }}
      >
        {mobileMenuOpen
          ? <X size={18} color="#fff" strokeWidth={2.5} />
          : <Menu size={18} color="#fff" strokeWidth={2.5} />}
      </button>

      {/* Mobile backdrop */}
      {mobileMenuOpen && (
        <div
          onClick={close}
          aria-hidden="true"
          className="lg:hidden"
          style={{
            position: "fixed", inset: 0, background: "rgba(0,0,0,0.55)",
            backdropFilter: "blur(3px)", zIndex: 45
          }}
        />
      )}

      {/* ── SIDEBAR ── */}
      <aside
        aria-label="Main navigation"
        className={`fixed inset-y-0 left-0 z-50 transform transition-transform duration-300 lg:relative lg:translate-x-0 ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
        style={{
          width: 252,
          background: DARK,
          display: "flex",
          flexDirection: "column",
          borderRight: "1px solid rgba(255,255,255,0.05)",
          overflowY: "auto",
        }}
      >
        {/* ── Brand ── */}
        <div style={{ padding: "22px 18px 18px", borderBottom: "1px solid rgba(255,255,255,0.06)", flexShrink: 0 }}>
          <button
            onClick={() => { navigate("/app"); close(); }}
            aria-label="Go to dashboard"
            style={{
              background: "none", border: "none", cursor: "pointer",
              display: "flex", alignItems: "center", gap: 11, padding: 0, width: "100%"
            }}
          >
            <div style={{
              width: 38, height: 38, borderRadius: 11,
              background: `linear-gradient(135deg, ${G} 0%, #064D33 100%)`,
              display: "flex", alignItems: "center", justifyContent: "center",
              flexShrink: 0, boxShadow: `0 4px 12px ${G}44`
            }}>
              <Building2 size={18} color="#fff" strokeWidth={2.5} />
            </div>
            <div style={{ textAlign: "left" }}>
              <p style={{ fontFamily: SERIF, fontSize: 24, color: "#fff", margin: 0, lineHeight: 1, letterSpacing: "-0.5px" }}>
                Kaya<span style={{ color: G }}>.</span>
              </p>
              <p style={{ fontSize: 9, color: "rgba(255,255,255,0.3)", margin: 0, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.8px" }}>
                Ontario · Property Platform
              </p>
            </div>
          </button>
        </div>

        {/* ── List Property CTA ── */}
        <div style={{ padding: "12px 14px", borderBottom: "1px solid rgba(255,255,255,0.06)", flexShrink: 0 }}>
          <button
            onClick={() => { navigate("/app/list-property"); close(); }}
            style={{
              width: "100%", padding: "10px 14px",
              background: G, color: "#fff",
              border: "none", borderRadius: 10,
              fontSize: 13, fontWeight: 700, cursor: "pointer",
              display: "flex", alignItems: "center", gap: 8,
              fontFamily: SANS, boxShadow: `0 4px 14px ${G}55`,
              letterSpacing: "0.1px"
            }}
          >
            <Plus size={15} strokeWidth={2.5} />
            List a Property
          </button>
        </div>

        {/* ── Navigation ── */}
        <div style={{ flex: 1, overflowY: "auto" }}>
          <NavigationMenu basePath="/app" onNavigate={close} dark />
        </div>

        {/* ── Quick actions strip ── */}
        <div style={{
          padding: "10px 14px", borderTop: "1px solid rgba(255,255,255,0.06)",
          display: "flex", gap: 6, flexShrink: 0
        }}>
          <button
            onClick={() => { navigate("/app/notification-center"); close(); }}
            aria-label="Notifications"
            title="Notifications"
            style={{
              flex: 1, padding: "8px", background: "rgba(255,255,255,0.07)", border: "none",
              borderRadius: 9, cursor: "pointer", display: "flex", alignItems: "center",
              justifyContent: "center", gap: 6
            }}
          >
            <Bell size={14} color="rgba(255,255,255,0.55)" />
            <span style={{ fontSize: 11, color: "rgba(255,255,255,0.45)", fontWeight: 500 }}>Alerts</span>
          </button>
          <button
            onClick={() => { navigate("/search"); close(); }}
            aria-label="Find a property"
            title="Public search"
            style={{
              flex: 1, padding: "8px", background: "rgba(255,255,255,0.07)", border: "none",
              borderRadius: 9, cursor: "pointer", display: "flex", alignItems: "center",
              justifyContent: "center", gap: 6
            }}
          >
            <Home size={14} color="rgba(255,255,255,0.55)" />
            <span style={{ fontSize: 11, color: "rgba(255,255,255,0.45)", fontWeight: 500 }}>Search</span>
          </button>
        </div>

        {/* ── AI Nudge ── */}
        <div style={{ padding: "0 14px 10px", flexShrink: 0 }}>
          <button
            onClick={() => { navigate("/app/ai-assistant"); close(); }}
            style={{
              width: "100%", padding: "10px 12px",
              background: "rgba(10,122,82,0.18)", border: "1px solid rgba(10,122,82,0.3)",
              borderRadius: 10, cursor: "pointer", textAlign: "left"
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 3 }}>
              <Zap size={13} color="#5DCAA5" strokeWidth={2.5} />
              <span style={{ fontSize: 12, fontWeight: 700, color: "#5DCAA5", fontFamily: SANS }}>Kaya AI</span>
              <ChevronRight size={11} color="#5DCAA5" style={{ marginLeft: "auto" }} />
            </div>
            <p style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", margin: 0, lineHeight: 1.5 }}>
              Ask about rent, LTB forms, tenants…
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 6 }}>
              <kbd style={{ fontSize: 9, color: "rgba(255,255,255,0.22)", background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 4, padding: "1px 5px", fontFamily: "monospace", letterSpacing: "0.3px" }}>⌘K</kbd>
              <span style={{ fontSize: 9, color: "rgba(255,255,255,0.2)" }}>/</span>
              <kbd style={{ fontSize: 9, color: "rgba(255,255,255,0.22)", background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 4, padding: "1px 5px", fontFamily: "monospace", letterSpacing: "0.3px" }}>Ctrl+K</kbd>
              <span style={{ fontSize: 9, color: "rgba(255,255,255,0.2)", marginLeft: 2 }}>to open anywhere</span>
            </div>
          </button>
        </div>

        {/* ── User profile ── */}
        <div style={{ padding: "0 14px 14px", flexShrink: 0 }}>
          <div style={{
            display: "flex", alignItems: "center", gap: 10,
            padding: "10px 12px", borderRadius: 10,
            background: "rgba(255,255,255,0.06)", cursor: "pointer",
            border: "1px solid rgba(255,255,255,0.07)"
          }}>
            <div style={{
              width: 34, height: 34, borderRadius: "50%",
              background: `linear-gradient(135deg, ${G}, #064D33)`,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 12, fontWeight: 700, color: "#fff", flexShrink: 0
            }}>JM</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ fontSize: 13, fontWeight: 600, color: "#fff", margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>Justin Mafie</p>
              <p style={{ fontSize: 10, color: "rgba(255,255,255,0.35)", margin: 0 }}>justin@kaya.ca</p>
            </div>
            <span style={{
              background: G, color: "#fff",
              fontSize: 9, fontWeight: 800, padding: "3px 7px",
              borderRadius: 20, flexShrink: 0, letterSpacing: "0.4px"
            }}>PRO</span>
          </div>

          {/* Language switcher */}
          <div style={{ marginTop: 8 }}>
            <LanguageSwitcher dark />
          </div>
        </div>
      </aside>

      {/* ── Main Content ── */}
      <main
        id="main-content"
        style={{ flex: 1, overflowY: "auto", minWidth: 0, minHeight: "100vh" }}
        className="lg:ml-0 pt-14 lg:pt-0"
      >
        <TrialBanner />
        <Outlet />
      </main>
    </div>
  );
}

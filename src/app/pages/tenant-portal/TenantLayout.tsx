import { Outlet, Link, useLocation, useNavigate } from "react-router";
import { Home, CreditCard, FileText, Wrench, Menu, X, ClipboardList, Building2, Sparkles } from "lucide-react";
import { useState } from "react";
import { RoleSwitcher } from "../../components/RoleSwitcher";
import { GlobalAIAssistant } from "../../components/GlobalAIAssistant";
import { AICommandPalette } from "../../components/AICommandPalette";

const G = "#0A7A52";
const GL = "#E5F4EE";
const TX = "#0E0F0C";
const MU = "#767570";
const SANS = "'DM Sans', system-ui, sans-serif";
const SERIF = "'Instrument Serif', Georgia, serif";

export function TenantLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigation = [
    { name: "Home", href: "/tenant", icon: Home },
    { name: "Applications", href: "/tenant/applications", icon: ClipboardList },
    { name: "Payments", href: "/tenant/payments", icon: CreditCard },
    { name: "Documents", href: "/tenant/documents", icon: FileText },
    { name: "Maintenance", href: "/tenant/maintenance", icon: Wrench },
  ];

  const isActive = (path: string) => {
    if (path === "/tenant") return location.pathname === "/tenant";
    return location.pathname.startsWith(path);
  };

  const currentPage = navigation.find(n => isActive(n.href))?.name ?? "Tenant Portal";

  return (
    <div style={{ minHeight: "100vh", background: "#F8F7F4", fontFamily: SANS }}>
      <GlobalAIAssistant pageContext="Tenant Portal" userContext="Tenant" userId="demo-tenant" />
      <AICommandPalette userId="demo-tenant" />

      {/* ── Mobile header ── */}
      <div className="lg:hidden" style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
        background: TX, height: 56,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 16px",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
          <div style={{ width: 28, height: 28, borderRadius: 8, background: `linear-gradient(135deg, ${G} 0%, #065E3C 100%)`, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Building2 size={14} color="#fff" strokeWidth={2.5} />
          </div>
          <span style={{ fontFamily: SERIF, fontSize: 18, color: "#fff" }}>Kaya<span style={{ color: G }}>.</span></span>
        </div>
        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} style={{ background: "none", border: "none", cursor: "pointer", padding: 6 }}>
          {mobileMenuOpen ? <X size={20} color="#fff" /> : <Menu size={20} color="#fff" />}
        </button>
      </div>

      {/* ── Mobile menu overlay ── */}
      {mobileMenuOpen && (
        <div className="lg:hidden" style={{ position: "fixed", inset: 0, zIndex: 45, background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)" }} onClick={() => setMobileMenuOpen(false)} />
      )}
      {mobileMenuOpen && (
        <div className="lg:hidden" style={{
          position: "fixed", top: 56, left: 0, bottom: 0, zIndex: 46,
          width: 240, background: TX,
          borderRight: "1px solid rgba(255,255,255,0.07)",
          overflowY: "auto", padding: "16px 12px",
        }}>
          {navigation.map(item => {
            const Icon = item.icon;
            const active = isActive(item.href);
            return (
              <Link key={item.name} to={item.href} onClick={() => setMobileMenuOpen(false)} style={{
                display: "flex", alignItems: "center", gap: 10,
                padding: "11px 14px", borderRadius: 10, marginBottom: 4,
                background: active ? `rgba(10,122,82,0.18)` : "transparent",
                color: active ? "#5DCAA5" : "rgba(255,255,255,0.55)",
                textDecoration: "none", fontSize: 14, fontWeight: active ? 600 : 400,
                transition: "all 0.15s",
              }}>
                <Icon size={17} />
                {item.name}
              </Link>
            );
          })}
        </div>
      )}

      {/* ── Bottom nav — mobile ── */}
      <nav className="lg:hidden" style={{
        position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 40,
        background: "#fff", borderTop: "1px solid rgba(0,0,0,0.07)",
        paddingBottom: "env(safe-area-inset-bottom, 0px)",
      }}>
        <div style={{ display: "grid", gridTemplateColumns: `repeat(${navigation.length}, 1fr)`, padding: "6px 8px" }}>
          {navigation.map(item => {
            const Icon = item.icon;
            const active = isActive(item.href);
            return (
              <Link key={item.name} to={item.href} style={{
                display: "flex", flexDirection: "column", alignItems: "center", gap: 3,
                padding: "8px 4px", borderRadius: 10, textDecoration: "none",
                color: active ? G : MU, transition: "all 0.15s",
                background: active ? GL : "transparent",
              }}>
                <Icon size={18} strokeWidth={active ? 2.5 : 2} />
                <span style={{ fontSize: 10, fontWeight: active ? 700 : 400 }}>{item.name}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* ── Desktop sidebar ── */}
      <aside className="hidden lg:flex" style={{
        position: "fixed", top: 0, left: 0, bottom: 0, width: 240,
        background: TX, flexDirection: "column",
        borderRight: "1px solid rgba(255,255,255,0.06)",
      }}>
        {/* Brand */}
        <div style={{ padding: "20px 16px 16px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
          <button onClick={() => navigate("/tenant")} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 10, padding: 0, width: "100%" }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: `linear-gradient(135deg, ${G} 0%, #065E3C 100%)`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, boxShadow: `0 4px 12px ${G}44` }}>
              <Building2 size={17} color="#fff" strokeWidth={2.5} />
            </div>
            <div style={{ textAlign: "left" }}>
              <p style={{ fontFamily: SERIF, fontSize: 22, color: "#fff", margin: 0, lineHeight: 1, letterSpacing: "-0.4px" }}>
                Kaya<span style={{ color: G }}>.</span>
              </p>
              <p style={{ fontSize: 9, color: "rgba(255,255,255,0.3)", margin: 0, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.8px" }}>
                Tenant Portal
              </p>
            </div>
          </button>
        </div>

        {/* Tenant info */}
        <div style={{ padding: "12px 14px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", background: "rgba(255,255,255,0.06)", borderRadius: 10 }}>
            <div style={{ width: 34, height: 34, borderRadius: "50%", background: "linear-gradient(135deg, #1E5FA8, #163F70)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: "#fff", flexShrink: 0 }}>SK</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ fontSize: 13, fontWeight: 600, color: "#fff", margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>Sarah Kim</p>
              <p style={{ fontSize: 10, color: "rgba(255,255,255,0.35)", margin: 0 }}>Unit 4A · 123 King St</p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <div style={{ flex: 1, overflowY: "auto", padding: "10px 10px" }}>
          {navigation.map(item => {
            const Icon = item.icon;
            const active = isActive(item.href);
            return (
              <Link key={item.name} to={item.href} style={{
                display: "flex", alignItems: "center", gap: 10,
                padding: "10px 14px", borderRadius: 10, marginBottom: 2,
                background: active ? `rgba(10,122,82,0.2)` : "transparent",
                color: active ? "#5DCAA5" : "rgba(255,255,255,0.5)",
                textDecoration: "none", fontSize: 14, fontWeight: active ? 600 : 400,
                borderLeft: active ? `2px solid ${G}` : "2px solid transparent",
                transition: "all 0.15s",
              }}>
                <Icon size={16} strokeWidth={active ? 2.5 : 2} />
                {item.name}
              </Link>
            );
          })}
        </div>

        {/* AI nudge */}
        <div style={{ padding: "0 12px 10px" }}>
          <button
            onClick={() => window.dispatchEvent(new CustomEvent("openAIWithQuery", { detail: { query: "" } }))}
            style={{ width: "100%", padding: "10px 12px", background: "rgba(10,122,82,0.18)", border: "1px solid rgba(10,122,82,0.3)", borderRadius: 10, cursor: "pointer", textAlign: "left" }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 3 }}>
              <Sparkles size={13} color="#5DCAA5" strokeWidth={2.5} />
              <span style={{ fontSize: 12, fontWeight: 700, color: "#5DCAA5", fontFamily: SANS }}>Kaya AI</span>
            </div>
            <p style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", margin: 0, lineHeight: 1.5 }}>Ask about your lease, payments…</p>
            <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 6 }}>
              <kbd style={{ fontSize: 9, color: "rgba(255,255,255,0.22)", background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 4, padding: "1px 5px", fontFamily: "monospace" }}>⌘K</kbd>
              <span style={{ fontSize: 9, color: "rgba(255,255,255,0.2)" }}>/</span>
              <kbd style={{ fontSize: 9, color: "rgba(255,255,255,0.22)", background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 4, padding: "1px 5px", fontFamily: "monospace" }}>Ctrl+K</kbd>
            </div>
          </button>
        </div>
      </aside>

      {/* ── Main content ── */}
      <main style={{ paddingLeft: 0 }} className="lg:pl-[240px] pt-14 pb-20 lg:pb-0 lg:pt-0">
        {/* Sticky topbar */}
        <div style={{
          position: "sticky", top: 0, zIndex: 30,
          background: "rgba(248,247,244,0.95)", backdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(0,0,0,0.05)",
          padding: "0 24px", height: 48,
          display: "flex", alignItems: "center", justifyContent: "space-between",
          fontFamily: SANS,
        }}>
          <p style={{ fontSize: 11, fontWeight: 700, color: "rgba(0,0,0,0.3)", textTransform: "uppercase", letterSpacing: "0.9px", margin: 0 }}>
            {currentPage}
          </p>
          <button
            onClick={() => window.dispatchEvent(new CustomEvent("openAIWithQuery", { detail: { query: "" } }))}
            style={{
              display: "flex", alignItems: "center", gap: 7,
              padding: "5px 12px 5px 10px",
              background: "#fff", border: "1px solid rgba(0,0,0,0.08)",
              borderRadius: 9, cursor: "pointer",
              boxShadow: "0 1px 4px rgba(0,0,0,0.05)", fontFamily: SANS,
            }}
          >
            <Sparkles size={13} color={G} strokeWidth={2.5} />
            <span style={{ fontSize: 12, fontWeight: 500, color: MU }}>AI</span>
            <div style={{ display: "flex", alignItems: "center", gap: 3, marginLeft: 2 }}>
              <kbd style={{ fontSize: 10, color: MU, background: "#F8F7F4", border: "1px solid rgba(0,0,0,0.08)", borderRadius: 4, padding: "1px 5px", fontFamily: "monospace" }}>⌘K</kbd>
              <span style={{ fontSize: 10, color: "rgba(0,0,0,0.25)" }}>/</span>
              <kbd style={{ fontSize: 10, color: MU, background: "#F8F7F4", border: "1px solid rgba(0,0,0,0.08)", borderRadius: 4, padding: "1px 5px", fontFamily: "monospace" }}>Ctrl+K</kbd>
            </div>
          </button>
        </div>

        <Outlet />
      </main>

      <RoleSwitcher />
    </div>
  );
}

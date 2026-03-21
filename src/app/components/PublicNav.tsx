import { useState, useEffect, useRef } from "react";
import { useNavigate, Link, useLocation } from "react-router";
import { Building2, Menu, X, LayoutDashboard, ChevronRight, LogOut } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { LanguageSwitcher } from "./LanguageSwitcher";

const G = "#0A7A52";
const GL = "#E5F4EE";
const TX = "#0E0F0C";
const MU = "#767570";

const NAV_LINKS = [
  { label: "Find a Home", to: "/search" },
  { label: "Landlords", to: "/features" },
  { label: "Pricing", to: "/pricing" },
  { label: "Neighbourhoods", to: "/neighbourhood-insights" },
  { label: "Community", to: "/community" },
];

export function PublicNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, signOut, loading } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const isActive = (to: string) => location.pathname === to;

  const navBg = scrolled
    ? "rgba(255,255,255,0.97)"
    : "rgba(248,247,244,0.82)";

  const navShadow = scrolled
    ? "0 2px 24px rgba(0,0,0,0.08)"
    : "none";

  const initials = user?.name
    ? user.name.split(" ").map((n: string) => n[0]).join("").slice(0, 2).toUpperCase()
    : user?.email?.slice(0, 2).toUpperCase() || "??";

  return (
    <>
      <nav
        style={{
          position: "fixed",
          top: 0, left: 0, right: 0,
          zIndex: 999,
          height: 62,
          padding: "0 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: navBg,
          backdropFilter: "blur(20px) saturate(180%)",
          WebkitBackdropFilter: "blur(20px) saturate(180%)",
          borderBottom: scrolled ? "1px solid rgba(0,0,0,0.07)" : "1px solid rgba(0,0,0,0.05)",
          boxShadow: navShadow,
          transition: "background 0.3s, box-shadow 0.3s, border-color 0.3s",
        }}
      >
        {/* Logo */}
        <Link
          to="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            textDecoration: "none",
            flexShrink: 0,
          }}
        >
          <div style={{
            width: 34, height: 34, borderRadius: 9,
            background: `linear-gradient(135deg, ${G} 0%, #085D3D 100%)`,
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 2px 8px rgba(10,122,82,0.2), inset 0 1px 0 rgba(255,255,255,0.18)",
            flexShrink: 0,
          }}>
            <Building2 size={17} color="#fff" strokeWidth={2.5} />
          </div>
          <span style={{
            fontFamily: "'Instrument Serif', serif",
            fontSize: 23,
            color: TX,
            letterSpacing: "-0.5px",
            fontWeight: 400,
            lineHeight: 1,
          }}>
            Kaya<span style={{ color: G }}>.</span>
          </span>
          <span style={{
            fontSize: 8,
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.9px",
            padding: "3px 7px",
            background: GL,
            color: G,
            borderRadius: 4,
          }}>
            BETA
          </span>
        </Link>

        {/* Desktop links */}
        <div className="nav-desktop-links" style={{
          display: "flex",
          gap: 0,
          alignItems: "center",
        }}>
          {NAV_LINKS.map(({ label, to }) => (
            <Link
              key={to}
              to={to}
              style={{
                fontSize: 13,
                fontWeight: 500,
                color: isActive(to) ? G : MU,
                textDecoration: "none",
                padding: "8px 14px",
                borderRadius: 8,
                transition: "all 0.15s",
                background: isActive(to) ? GL : "transparent",
                position: "relative",
              }}
              onMouseEnter={(e) => {
                if (!isActive(to)) {
                  e.currentTarget.style.color = TX;
                  e.currentTarget.style.background = "rgba(0,0,0,0.04)";
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive(to)) {
                  e.currentTarget.style.color = MU;
                  e.currentTarget.style.background = "transparent";
                }
              }}
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Right side CTAs */}
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <div className="nav-lang-desktop">
            <LanguageSwitcher />
          </div>

          {!loading && (
            user ? (
              /* Logged-in state */
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <button
                  onClick={() => navigate("/app")}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 7,
                    padding: "9px 18px",
                    background: G,
                    color: "#fff",
                    border: "none",
                    borderRadius: 10,
                    fontSize: 13,
                    fontWeight: 600,
                    cursor: "pointer",
                    fontFamily: "'DM Sans', system-ui, sans-serif",
                    transition: "all 0.2s",
                    boxShadow: "0 2px 8px rgba(10,122,82,0.2)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-1px)";
                    e.currentTarget.style.boxShadow = "0 4px 16px rgba(10,122,82,0.3)";
                    e.currentTarget.style.background = "#085D3D";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "0 2px 8px rgba(10,122,82,0.2)";
                    e.currentTarget.style.background = G;
                  }}
                >
                  <LayoutDashboard size={15} />
                  Dashboard
                </button>

                {/* User avatar dropdown */}
                <div ref={userMenuRef} style={{ position: "relative" }}>
                  <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    style={{
                      width: 34, height: 34,
                      borderRadius: "50%",
                      background: GL,
                      border: `2px solid ${userMenuOpen ? G : "rgba(10,122,82,0.2)"}`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      cursor: "pointer",
                      fontSize: 11,
                      fontWeight: 700,
                      color: G,
                      fontFamily: "'DM Sans', system-ui, sans-serif",
                      transition: "all 0.2s",
                    }}
                  >
                    {initials}
                  </button>

                  {userMenuOpen && (
                    <div style={{
                      position: "absolute",
                      top: "calc(100% + 10px)",
                      right: 0,
                      background: "#fff",
                      border: "1px solid rgba(0,0,0,0.08)",
                      borderRadius: 14,
                      padding: 8,
                      minWidth: 200,
                      boxShadow: "0 8px 40px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.06)",
                      zIndex: 1000,
                      animation: "navDropIn 0.18s ease",
                    }}>
                      <div style={{
                        padding: "10px 12px 12px",
                        borderBottom: "1px solid rgba(0,0,0,0.06)",
                        marginBottom: 6,
                      }}>
                        <div style={{ fontSize: 13, fontWeight: 600, color: TX }}>{user.name || "Landlord"}</div>
                        <div style={{ fontSize: 11, color: MU, marginTop: 2 }}>{user.email}</div>
                        <div style={{
                          display: "inline-flex", alignItems: "center", marginTop: 6,
                          fontSize: 9, fontWeight: 700, color: G,
                          background: GL, padding: "2px 8px", borderRadius: 20, textTransform: "uppercase", letterSpacing: "0.5px"
                        }}>PRO</div>
                      </div>
                      {[
                        { label: "Dashboard", icon: "🏠", path: "/app" },
                        { label: "Properties", icon: "🏢", path: "/app/properties" },
                        { label: "Settings", icon: "⚙️", path: "/app/settings" },
                      ].map(({ label, icon, path }) => (
                        <button key={path} onClick={() => { navigate(path); setUserMenuOpen(false); }}
                          style={{
                            width: "100%", display: "flex", alignItems: "center", gap: 10,
                            padding: "9px 12px", background: "transparent",
                            border: "none", borderRadius: 9,
                            fontSize: 13, color: TX, fontWeight: 500,
                            cursor: "pointer", fontFamily: "'DM Sans', system-ui, sans-serif",
                            textAlign: "left", transition: "background 0.12s",
                          }}
                          onMouseEnter={(e) => e.currentTarget.style.background = "#F8F7F4"}
                          onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
                        >
                          <span>{icon}</span> {label}
                        </button>
                      ))}
                      <div style={{ borderTop: "1px solid rgba(0,0,0,0.06)", marginTop: 6, paddingTop: 6 }}>
                        <button
                          onClick={async () => { await signOut(); setUserMenuOpen(false); navigate("/"); }}
                          style={{
                            width: "100%", display: "flex", alignItems: "center", gap: 10,
                            padding: "9px 12px", background: "transparent",
                            border: "none", borderRadius: 9,
                            fontSize: 13, color: "#C0392B", fontWeight: 500,
                            cursor: "pointer", fontFamily: "'DM Sans', system-ui, sans-serif",
                            textAlign: "left", transition: "background 0.12s",
                          }}
                          onMouseEnter={(e) => e.currentTarget.style.background = "#FDECEA"}
                          onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
                        >
                          <LogOut size={14} /> Sign out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              /* Logged-out state */
              <div style={{ display: "flex", gap: 8, alignItems: "center" }} className="nav-auth-btns">
                <button
                  onClick={() => navigate("/login")}
                  className="nav-signin-btn"
                  style={{
                    padding: "9px 20px",
                    border: "1px solid rgba(0,0,0,0.1)",
                    borderRadius: 10,
                    background: "transparent",
                    fontSize: 13,
                    fontWeight: 500,
                    color: TX,
                    cursor: "pointer",
                    fontFamily: "'DM Sans', system-ui, sans-serif",
                    transition: "all 0.15s",
                    whiteSpace: "nowrap",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "rgba(0,0,0,0.03)";
                    e.currentTarget.style.borderColor = "rgba(0,0,0,0.15)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.borderColor = "rgba(0,0,0,0.1)";
                  }}
                >
                  Sign in
                </button>
                <button
                  onClick={() => navigate("/signup")}
                  className="nav-trial-btn"
                  style={{
                    padding: "9px 20px",
                    border: "none",
                    borderRadius: 10,
                    background: G,
                    fontSize: 13,
                    fontWeight: 600,
                    color: "#fff",
                    cursor: "pointer",
                    fontFamily: "'DM Sans', system-ui, sans-serif",
                    boxShadow: "0 2px 8px rgba(10,122,82,0.18)",
                    transition: "all 0.2s",
                    whiteSpace: "nowrap",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-1px)";
                    e.currentTarget.style.boxShadow = "0 4px 16px rgba(10,122,82,0.28)";
                    e.currentTarget.style.background = "#085D3D";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "0 2px 8px rgba(10,122,82,0.18)";
                    e.currentTarget.style.background = G;
                  }}
                >
                  Start free trial
                </button>
              </div>
            )
          )}

          {/* Hamburger — mobile only */}
          <button
            className="nav-hamburger"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
            style={{
              display: "none",
              padding: 7,
              background: "transparent",
              border: "1px solid rgba(0,0,0,0.1)",
              borderRadius: 9,
              cursor: "pointer",
              alignItems: "center",
              justifyContent: "center",
              color: TX,
              transition: "all 0.15s",
            }}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile backdrop */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          style={{
            position: "fixed", inset: 0, zIndex: 997,
            background: "rgba(0,0,0,0.4)",
            backdropFilter: "blur(4px)",
            animation: "navFadeIn 0.2s ease",
          }}
        />
      )}

      {/* Mobile drawer */}
      <div
        style={{
          position: "fixed",
          top: 0, right: 0, bottom: 0,
          width: 300,
          zIndex: 998,
          background: "#fff",
          boxShadow: "-8px 0 48px rgba(0,0,0,0.12)",
          display: "flex",
          flexDirection: "column",
          transform: mobileOpen ? "translateX(0)" : "translateX(105%)",
          transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          overflowY: "auto",
        }}
        className="nav-mobile-drawer"
      >
        {/* Drawer header */}
        <div style={{
          padding: "18px 20px",
          borderBottom: "1px solid rgba(0,0,0,0.07)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
            <div style={{
              width: 30, height: 30, borderRadius: 8,
              background: `linear-gradient(135deg, ${G} 0%, #085D3D 100%)`,
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <Building2 size={15} color="#fff" strokeWidth={2.5} />
            </div>
            <span style={{ fontFamily: "'Instrument Serif', serif", fontSize: 20, color: TX }}>
              Kaya<span style={{ color: G }}>.</span>
            </span>
          </div>
          <button
            onClick={() => setMobileOpen(false)}
            style={{
              padding: 7, background: "#F8F7F4",
              border: "none", borderRadius: 8,
              cursor: "pointer", color: MU,
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* User card (if logged in) */}
        {user && (
          <div style={{
            margin: "12px 16px",
            padding: "14px 16px",
            background: GL,
            borderRadius: 12,
            border: `1px solid rgba(10,122,82,0.15)`,
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 11 }}>
              <div style={{
                width: 40, height: 40, borderRadius: "50%",
                background: G, display: "flex", alignItems: "center",
                justifyContent: "center", fontSize: 14, fontWeight: 700, color: "#fff",
              }}>
                {initials}
              </div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 600, color: TX }}>{user.name || "Landlord"}</div>
                <div style={{ fontSize: 11, color: MU }}>{user.email}</div>
              </div>
            </div>
            <button
              onClick={() => navigate("/app")}
              style={{
                marginTop: 12, width: "100%",
                padding: "10px 0",
                background: G, color: "#fff",
                border: "none", borderRadius: 9,
                fontSize: 13, fontWeight: 600,
                cursor: "pointer", fontFamily: "'DM Sans', system-ui, sans-serif",
                display: "flex", alignItems: "center", justifyContent: "center", gap: 7,
              }}
            >
              <LayoutDashboard size={15} /> Go to Dashboard
            </button>
          </div>
        )}

        {/* Navigation links */}
        <div style={{ flex: 1, padding: "8px 12px" }}>
          <div style={{ fontSize: 9, fontWeight: 700, color: "#AEADA8", textTransform: "uppercase", letterSpacing: "0.8px", padding: "10px 8px 6px" }}>
            Navigation
          </div>
          {NAV_LINKS.map(({ label, to }) => (
            <Link
              key={to}
              to={to}
              style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                padding: "12px 12px",
                borderRadius: 10,
                fontSize: 14, fontWeight: 500,
                color: isActive(to) ? G : TX,
                background: isActive(to) ? GL : "transparent",
                textDecoration: "none",
                marginBottom: 2,
                transition: "all 0.15s",
              }}
              onMouseEnter={(e) => {
                if (!isActive(to)) e.currentTarget.style.background = "#F8F7F4";
              }}
              onMouseLeave={(e) => {
                if (!isActive(to)) e.currentTarget.style.background = "transparent";
              }}
            >
              {label}
              <ChevronRight size={15} style={{ color: "#AEADA8" }} />
            </Link>
          ))}

          <div style={{ fontSize: 9, fontWeight: 700, color: "#AEADA8", textTransform: "uppercase", letterSpacing: "0.8px", padding: "16px 8px 6px" }}>
            More
          </div>
          {[
            { label: "About Kaya", to: "/about" },
            { label: "Help & FAQ", to: "/faq" },
            { label: "Contact us", to: "/contact" },
          ].map(({ label, to }) => (
            <Link
              key={to}
              to={to}
              style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                padding: "11px 12px",
                borderRadius: 10,
                fontSize: 14, fontWeight: 500,
                color: MU,
                textDecoration: "none",
                marginBottom: 2,
                transition: "background 0.15s",
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = "#F8F7F4"}
              onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
            >
              {label}
              <ChevronRight size={15} style={{ color: "#AEADA8" }} />
            </Link>
          ))}
        </div>

        {/* Drawer footer CTAs */}
        <div style={{ padding: "16px", borderTop: "1px solid rgba(0,0,0,0.07)" }}>
          <div style={{ marginBottom: 10 }}>
            <LanguageSwitcher />
          </div>
          {user ? (
            <button
              onClick={async () => { await signOut(); setMobileOpen(false); navigate("/"); }}
              style={{
                width: "100%", padding: "11px 0",
                background: "#FDECEA", color: "#C0392B",
                border: "none", borderRadius: 10,
                fontSize: 13, fontWeight: 600,
                cursor: "pointer", fontFamily: "'DM Sans', system-ui, sans-serif",
                display: "flex", alignItems: "center", justifyContent: "center", gap: 7,
              }}
            >
              <LogOut size={15} /> Sign out
            </button>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <button
                onClick={() => { navigate("/login"); setMobileOpen(false); }}
                style={{
                  width: "100%", padding: "12px 0",
                  background: "#F8F7F4", color: TX,
                  border: "1px solid rgba(0,0,0,0.09)", borderRadius: 10,
                  fontSize: 14, fontWeight: 500,
                  cursor: "pointer", fontFamily: "'DM Sans', system-ui, sans-serif",
                }}
              >
                Sign in
              </button>
              <button
                onClick={() => { navigate("/signup"); setMobileOpen(false); }}
                style={{
                  width: "100%", padding: "12px 0",
                  background: G, color: "#fff",
                  border: "none", borderRadius: 10,
                  fontSize: 14, fontWeight: 600,
                  cursor: "pointer", fontFamily: "'DM Sans', system-ui, sans-serif",
                  boxShadow: "0 2px 8px rgba(10,122,82,0.2)",
                }}
              >
                Start free trial →
              </button>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes navDropIn {
          from { opacity: 0; transform: translateY(-8px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes navFadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @media (max-width: 768px) {
          .nav-desktop-links { display: none !important; }
          .nav-auth-btns { display: none !important; }
          .nav-lang-desktop { display: none !important; }
          .nav-hamburger { display: flex !important; }
        }
        @media (min-width: 769px) {
          .nav-hamburger { display: none !important; }
          .nav-mobile-drawer { display: none !important; }
        }
      `}</style>
    </>
  );
}

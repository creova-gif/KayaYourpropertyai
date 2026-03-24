import { useState, useEffect, useRef } from "react";
import { useNavigate, Link, useLocation } from "react-router";
import {
  Building2, Menu, X, LayoutDashboard, ChevronRight,
  LogOut, Home, Settings, ChevronDown, ArrowRight,
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { LanguageSwitcher } from "./LanguageSwitcher";

const G = "#0A7A52";
const GL = "#E5F4EE";
const TX = "#0E0F0C";
const MU = "#767570";
const SANS = "'DM Sans', system-ui, sans-serif";
const SERIF = "'Instrument Serif', serif";

const NAV_LINKS = [
  { label: "Find a Home", to: "/search" },
  { label: "For Landlords", to: "/features" },
  { label: "Pricing", to: "/pricing" },
  { label: "Community", to: "/community" },
];

const MORE_LINKS = [
  { label: "Neighbourhoods", to: "/neighbourhood-insights" },
  { label: "About Kaya", to: "/about" },
  { label: "Help & FAQ", to: "/faq" },
  { label: "Contact us", to: "/contact" },
];

export function PublicNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, signOut, loading } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const moreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [location.pathname]);

  useEffect(() => {
    const handle = (e: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) setUserMenuOpen(false);
      if (moreRef.current && !moreRef.current.contains(e.target as Node)) setMoreOpen(false);
    };
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const isActive = (to: string) => location.pathname === to;

  const navBg = scrolled ? "rgba(255,255,255,0.98)" : "rgba(248,247,244,0.88)";
  const navBorder = scrolled ? "1px solid rgba(0,0,0,0.09)" : "1px solid rgba(0,0,0,0.06)";
  const navShadow = scrolled ? "0 1px 20px rgba(0,0,0,0.07)" : "none";

  const initials = user?.name
    ? user.name.split(" ").map((n: string) => n[0]).join("").slice(0, 2).toUpperCase()
    : user?.email?.slice(0, 2).toUpperCase() || "??";

  return (
    <>
      <style>{`
        @keyframes navDropIn { from { opacity:0; transform:translateY(-6px); } to { opacity:1; transform:translateY(0); } }
        @keyframes navFadeIn { from { opacity:0; } to { opacity:1; } }
        @media (max-width: 860px) {
          .nav-desktop-links, .nav-lang-desktop, .nav-auth-btns { display: none !important; }
          .nav-hamburger { display: flex !important; }
        }
        @media (max-width: 1060px) {
          .nav-desktop-links a { padding: 7px 10px !important; font-size: 12.5px !important; }
        }
      `}</style>

      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 999,
        height: 60,
        padding: "0 32px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        background: navBg,
        backdropFilter: "blur(24px) saturate(200%)",
        WebkitBackdropFilter: "blur(24px) saturate(200%)",
        borderBottom: navBorder,
        boxShadow: navShadow,
        transition: "background 0.25s, box-shadow 0.25s, border-color 0.25s",
      }}>

        {/* ── Logo ── */}
        <Link to="/" style={{ display: "flex", alignItems: "center", gap: 9, textDecoration: "none", flexShrink: 0 }}>
          <div style={{
            width: 32, height: 32, borderRadius: 8,
            background: `linear-gradient(140deg, ${G} 0%, #065E3C 100%)`,
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 2px 10px rgba(10,122,82,0.22), inset 0 1px 0 rgba(255,255,255,0.15)",
          }}>
            <Building2 size={16} color="#fff" strokeWidth={2.4} />
          </div>
          <span style={{ fontFamily: SERIF, fontSize: 22, color: TX, letterSpacing: "-0.4px", lineHeight: 1 }}>
            Kaya<span style={{ color: G }}>.</span>
          </span>
        </Link>

        {/* ── Desktop nav links ── */}
        <div className="nav-desktop-links" style={{ display: "flex", alignItems: "center", gap: 2 }}>
          {NAV_LINKS.map(({ label, to }) => {
            const active = isActive(to);
            return (
              <Link key={to} to={to} style={{
                fontSize: 13.5,
                fontWeight: active ? 600 : 450,
                color: active ? TX : MU,
                textDecoration: "none",
                padding: "7px 13px",
                borderRadius: 8,
                transition: "color 0.15s, background 0.15s",
                background: "transparent",
                position: "relative",
                fontFamily: SANS,
              }}
                onMouseEnter={e => { e.currentTarget.style.color = TX; e.currentTarget.style.background = "rgba(0,0,0,0.04)"; }}
                onMouseLeave={e => { e.currentTarget.style.color = active ? TX : MU; e.currentTarget.style.background = "transparent"; }}
              >
                {label}
                {active && (
                  <span style={{
                    position: "absolute", bottom: 3, left: "50%", transform: "translateX(-50%)",
                    width: 20, height: 2, borderRadius: 2, background: G,
                  }} />
                )}
              </Link>
            );
          })}

          {/* More dropdown */}
          <div ref={moreRef} style={{ position: "relative" }}>
            <button onClick={() => setMoreOpen(v => !v)} style={{
              fontSize: 13.5, fontWeight: 450,
              color: moreOpen ? TX : MU,
              background: moreOpen ? "rgba(0,0,0,0.04)" : "transparent",
              border: "none", cursor: "pointer",
              padding: "7px 13px", borderRadius: 8,
              display: "flex", alignItems: "center", gap: 4,
              fontFamily: SANS, transition: "color 0.15s, background 0.15s",
            }}
              onMouseEnter={e => { e.currentTarget.style.color = TX; e.currentTarget.style.background = "rgba(0,0,0,0.04)"; }}
              onMouseLeave={e => { if (!moreOpen) { e.currentTarget.style.color = MU; e.currentTarget.style.background = "transparent"; } }}
            >
              More <ChevronDown size={13} style={{ transition: "transform 0.2s", transform: moreOpen ? "rotate(180deg)" : "rotate(0deg)" }} />
            </button>

            {moreOpen && (
              <div style={{
                position: "absolute", top: "calc(100% + 10px)", left: "50%", transform: "translateX(-50%)",
                background: "#fff", border: "1px solid rgba(0,0,0,0.08)", borderRadius: 14,
                padding: 6, minWidth: 190,
                boxShadow: "0 8px 40px rgba(0,0,0,0.11), 0 2px 8px rgba(0,0,0,0.06)",
                zIndex: 1000, animation: "navDropIn 0.18s ease",
              }}>
                {MORE_LINKS.map(({ label, to }) => (
                  <Link key={to} to={to} onClick={() => setMoreOpen(false)} style={{
                    display: "block", padding: "9px 12px", borderRadius: 9,
                    fontSize: 13, color: TX, fontWeight: 500,
                    textDecoration: "none", transition: "background 0.12s", fontFamily: SANS,
                  }}
                    onMouseEnter={e => e.currentTarget.style.background = "#F8F7F4"}
                    onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                  >
                    {label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* ── Right side ── */}
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <div className="nav-lang-desktop">
            <LanguageSwitcher />
          </div>

          {!loading && (
            user ? (
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <button onClick={() => navigate("/app")} style={{
                  display: "flex", alignItems: "center", gap: 6,
                  padding: "8px 16px",
                  background: GL, color: G,
                  border: `1px solid rgba(10,122,82,0.18)`,
                  borderRadius: 9,
                  fontSize: 13, fontWeight: 600,
                  cursor: "pointer", fontFamily: SANS, transition: "all 0.18s",
                }}
                  onMouseEnter={e => { e.currentTarget.style.background = "#cce9dc"; e.currentTarget.style.borderColor = "rgba(10,122,82,0.35)"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = GL; e.currentTarget.style.borderColor = "rgba(10,122,82,0.18)"; }}
                >
                  <LayoutDashboard size={14} />
                  Dashboard
                </button>

                <div ref={userMenuRef} style={{ position: "relative" }}>
                  <button onClick={() => setUserMenuOpen(!userMenuOpen)} style={{
                    width: 34, height: 34, borderRadius: "50%",
                    background: userMenuOpen ? G : GL,
                    border: `2px solid ${userMenuOpen ? G : "rgba(10,122,82,0.22)"}`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    cursor: "pointer", fontSize: 11, fontWeight: 700,
                    color: userMenuOpen ? "#fff" : G,
                    fontFamily: SANS, transition: "all 0.2s",
                  }}>
                    {initials}
                  </button>

                  {userMenuOpen && (
                    <div style={{
                      position: "absolute", top: "calc(100% + 10px)", right: 0,
                      background: "#fff", border: "1px solid rgba(0,0,0,0.08)",
                      borderRadius: 14, padding: 8, minWidth: 210,
                      boxShadow: "0 8px 40px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.06)",
                      zIndex: 1000, animation: "navDropIn 0.18s ease",
                    }}>
                      <div style={{ padding: "10px 12px 12px", borderBottom: "1px solid rgba(0,0,0,0.06)", marginBottom: 6 }}>
                        <div style={{ fontSize: 13, fontWeight: 600, color: TX }}>{user.name || "Landlord"}</div>
                        <div style={{ fontSize: 11, color: MU, marginTop: 2 }}>{user.email}</div>
                        <div style={{
                          display: "inline-flex", alignItems: "center", marginTop: 7,
                          fontSize: 9, fontWeight: 700, color: G, background: GL,
                          padding: "2px 8px", borderRadius: 20, textTransform: "uppercase", letterSpacing: "0.5px",
                        }}>PRO</div>
                      </div>
                      {[
                        { label: "Dashboard", Icon: LayoutDashboard, path: "/app" },
                        { label: "Properties", Icon: Home, path: "/app/properties" },
                        { label: "Settings", Icon: Settings, path: "/app/settings" },
                      ].map(({ label, Icon, path }) => (
                        <button key={path} onClick={() => { navigate(path); setUserMenuOpen(false); }} style={{
                          width: "100%", display: "flex", alignItems: "center", gap: 10,
                          padding: "9px 12px", background: "transparent",
                          border: "none", borderRadius: 9,
                          fontSize: 13, color: TX, fontWeight: 500,
                          cursor: "pointer", fontFamily: SANS, textAlign: "left", transition: "background 0.12s",
                        }}
                          onMouseEnter={e => e.currentTarget.style.background = "#F8F7F4"}
                          onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                        >
                          <Icon size={14} color={MU} /> {label}
                        </button>
                      ))}
                      <div style={{ borderTop: "1px solid rgba(0,0,0,0.06)", marginTop: 6, paddingTop: 6 }}>
                        <button onClick={async () => { await signOut(); setUserMenuOpen(false); navigate("/"); }} style={{
                          width: "100%", display: "flex", alignItems: "center", gap: 10,
                          padding: "9px 12px", background: "transparent",
                          border: "none", borderRadius: 9,
                          fontSize: 13, color: "#C0392B", fontWeight: 500,
                          cursor: "pointer", fontFamily: SANS, textAlign: "left", transition: "background 0.12s",
                        }}
                          onMouseEnter={e => e.currentTarget.style.background = "#FDECEA"}
                          onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                        >
                          <LogOut size={14} /> Sign out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div style={{ display: "flex", gap: 7, alignItems: "center" }} className="nav-auth-btns">
                <button onClick={() => navigate("/login")} className="nav-signin-btn" style={{
                  padding: "8px 18px",
                  border: "1px solid rgba(0,0,0,0.1)", borderRadius: 9,
                  background: "transparent",
                  fontSize: 13, fontWeight: 500, color: TX,
                  cursor: "pointer", fontFamily: SANS, transition: "all 0.15s", whiteSpace: "nowrap",
                }}
                  onMouseEnter={e => { e.currentTarget.style.background = "rgba(0,0,0,0.04)"; e.currentTarget.style.borderColor = "rgba(0,0,0,0.16)"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "rgba(0,0,0,0.1)"; }}
                >
                  Sign in
                </button>
                <button onClick={() => navigate("/signup")} className="nav-trial-btn" style={{
                  padding: "8px 18px",
                  border: "none", borderRadius: 9,
                  background: TX,
                  fontSize: 13, fontWeight: 600, color: "#fff",
                  cursor: "pointer", fontFamily: SANS,
                  boxShadow: "0 2px 8px rgba(14,15,12,0.16)",
                  transition: "all 0.18s", whiteSpace: "nowrap",
                  display: "flex", alignItems: "center", gap: 6,
                }}
                  onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-1px)"; e.currentTarget.style.background = "#1A1B17"; e.currentTarget.style.boxShadow = "0 4px 16px rgba(14,15,12,0.24)"; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.background = TX; e.currentTarget.style.boxShadow = "0 2px 8px rgba(14,15,12,0.16)"; }}
                >
                  Get started <ArrowRight size={13} />
                </button>
              </div>
            )
          )}

          <button className="nav-hamburger" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu" style={{
            display: "none", padding: 7,
            background: "transparent", border: "1px solid rgba(0,0,0,0.1)", borderRadius: 9,
            cursor: "pointer", alignItems: "center", justifyContent: "center", color: TX, transition: "all 0.15s",
          }}>
            {mobileOpen ? <X size={19} /> : <Menu size={19} />}
          </button>
        </div>
      </nav>

      {/* ── Mobile backdrop ── */}
      {mobileOpen && (
        <div onClick={() => setMobileOpen(false)} style={{
          position: "fixed", inset: 0, zIndex: 997,
          background: "rgba(0,0,0,0.38)", backdropFilter: "blur(4px)",
          animation: "navFadeIn 0.2s ease",
        }} />
      )}

      {/* ── Mobile drawer ── */}
      <div style={{
        position: "fixed", top: 0, right: 0, bottom: 0, width: 300, zIndex: 998,
        background: "#fff", boxShadow: "-8px 0 48px rgba(0,0,0,0.12)",
        display: "flex", flexDirection: "column",
        transform: mobileOpen ? "translateX(0)" : "translateX(105%)",
        transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        overflowY: "auto",
      }} className="nav-mobile-drawer">

        <div style={{
          padding: "16px 20px", borderBottom: "1px solid rgba(0,0,0,0.07)",
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{
              width: 28, height: 28, borderRadius: 7,
              background: `linear-gradient(140deg, ${G} 0%, #065E3C 100%)`,
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <Building2 size={14} color="#fff" strokeWidth={2.4} />
            </div>
            <span style={{ fontFamily: SERIF, fontSize: 19, color: TX }}>
              Kaya<span style={{ color: G }}>.</span>
            </span>
          </div>
          <button onClick={() => setMobileOpen(false)} style={{
            padding: 7, background: "#F8F7F4", border: "none", borderRadius: 8, cursor: "pointer", color: MU,
          }}>
            <X size={17} />
          </button>
        </div>

        {user && (
          <div style={{ margin: "12px 16px", padding: "14px 16px", background: GL, borderRadius: 12, border: `1px solid rgba(10,122,82,0.15)` }}>
            <div style={{ display: "flex", alignItems: "center", gap: 11 }}>
              <div style={{
                width: 38, height: 38, borderRadius: "50%", background: G,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 13, fontWeight: 700, color: "#fff",
              }}>
                {initials}
              </div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: TX }}>{user.name || "Landlord"}</div>
                <div style={{ fontSize: 11, color: MU }}>{user.email}</div>
              </div>
            </div>
            <button onClick={() => navigate("/app")} style={{
              marginTop: 12, width: "100%", padding: "10px 0",
              background: G, color: "#fff", border: "none", borderRadius: 9,
              fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: SANS,
              display: "flex", alignItems: "center", justifyContent: "center", gap: 7,
            }}>
              <LayoutDashboard size={14} /> Go to Dashboard
            </button>
          </div>
        )}

        <div style={{ flex: 1, padding: "6px 12px" }}>
          <div style={{ fontSize: 9, fontWeight: 700, color: "#AEADA8", textTransform: "uppercase", letterSpacing: "0.8px", padding: "10px 8px 6px" }}>
            Navigation
          </div>
          {[...NAV_LINKS, ...MORE_LINKS].map(({ label, to }) => (
            <Link key={to} to={to} style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              padding: "11px 12px", borderRadius: 10,
              fontSize: 13.5, fontWeight: 500,
              color: isActive(to) ? G : TX,
              background: isActive(to) ? GL : "transparent",
              textDecoration: "none", marginBottom: 2, transition: "all 0.15s",
            }}
              onMouseEnter={e => { if (!isActive(to)) e.currentTarget.style.background = "#F8F7F4"; }}
              onMouseLeave={e => { if (!isActive(to)) e.currentTarget.style.background = "transparent"; }}
            >
              {label}
              <ChevronRight size={14} style={{ color: "#AEADA8" }} />
            </Link>
          ))}
        </div>

        <div style={{ padding: "16px", borderTop: "1px solid rgba(0,0,0,0.07)" }}>
          <div style={{ marginBottom: 10 }}>
            <LanguageSwitcher />
          </div>
          {user ? (
            <button onClick={async () => { await signOut(); setMobileOpen(false); navigate("/"); }} style={{
              width: "100%", padding: "11px 0", background: "#FDECEA", color: "#C0392B",
              border: "none", borderRadius: 10, fontSize: 13, fontWeight: 600,
              cursor: "pointer", fontFamily: SANS,
              display: "flex", alignItems: "center", justifyContent: "center", gap: 7,
            }}>
              <LogOut size={14} /> Sign out
            </button>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <button onClick={() => { navigate("/login"); setMobileOpen(false); }} style={{
                width: "100%", padding: "12px 0", background: "#F8F7F4", color: TX,
                border: "1px solid rgba(0,0,0,0.09)", borderRadius: 10,
                fontSize: 13.5, fontWeight: 500, cursor: "pointer", fontFamily: SANS,
              }}>
                Sign in
              </button>
              <button onClick={() => { navigate("/signup"); setMobileOpen(false); }} style={{
                width: "100%", padding: "12px 0", background: TX, color: "#fff",
                border: "none", borderRadius: 10, fontSize: 13.5, fontWeight: 600,
                cursor: "pointer", fontFamily: SANS,
                display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
              }}>
                Get started <ArrowRight size={14} />
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

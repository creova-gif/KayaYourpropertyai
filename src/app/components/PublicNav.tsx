import { Building2 } from "lucide-react";
import { useNavigate, Link } from "react-router";

const G = "#0A7A52";

export function PublicNav() {
  const navigate = useNavigate();

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        height: 74,
        padding: "0 64px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: "rgba(248,247,244,0.85)",
        backdropFilter: "blur(24px) saturate(180%)",
        borderBottom: "1px solid rgba(0,0,0,0.06)",
        boxShadow: "0 1px 0 0 rgba(255,255,255,0.5) inset",
      }}
    >
      {/* Logo */}
      <Link
        to="/"
        aria-label="Kaya home"
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          cursor: "pointer",
          transition: "transform 0.2s ease",
          textDecoration: "none",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.02)")}
        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
      >
        <div
          style={{
            width: 38,
            height: 38,
            borderRadius: 10,
            background: `linear-gradient(135deg, ${G} 0%, #085D3D 100%)`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow:
              "0 2px 8px rgba(10,122,82,0.15), inset 0 1px 0 rgba(255,255,255,0.2)",
          }}
        >
          <Building2 size={20} color="#fff" strokeWidth={2.5} />
        </div>
        <div
          style={{
            fontFamily: "'Instrument Serif', serif",
            fontSize: 26,
            color: "#0E0F0C",
            letterSpacing: "-0.5px",
            fontWeight: 400,
          }}
        >
          Kaya<span style={{ color: G }}>.</span>
        </div>
        <div
          style={{
            fontSize: 9,
            color: "#767570",
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "1px",
            padding: "3px 8px",
            background: "#E5F4EE",
            borderRadius: 4,
          }}
        >
          BETA
        </div>
      </Link>

      {/* Navigation Links */}
      <div
        style={{
          display: "flex",
          gap: 32,
          alignItems: "center",
          fontSize: 14,
          fontFamily: "'DM Sans', system-ui, sans-serif",
        }}
      >
        {[
          { label: "Find a home", to: "/listings" },
          { label: "For landlords", to: "/features" },
          { label: "AI tools", to: "/ai-demo" },
          { label: "Resources", to: "/faq" },
        ].map(({ label, to }) => (
          <Link
            key={to}
            to={to}
            style={{
              color: "#767570",
              cursor: "pointer",
              fontWeight: 500,
              transition: "color 0.2s",
              textDecoration: "none",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#0E0F0C")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#767570")}
          >
            {label}
          </Link>
        ))}
      </div>

      {/* CTA Buttons */}
      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
        <button
          onClick={() => navigate("/login")}
          style={{
            padding: "10px 24px",
            border: "1px solid rgba(0,0,0,0.1)",
            borderRadius: 10,
            background: "transparent",
            fontSize: 14,
            fontWeight: 500,
            color: "#0E0F0C",
            cursor: "pointer",
            fontFamily: "'DM Sans', system-ui, sans-serif",
            transition: "all 0.2s",
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
          style={{
            padding: "10px 24px",
            border: "none",
            borderRadius: 10,
            background: `linear-gradient(135deg, ${G} 0%, #0D9469 100%)`,
            fontSize: 14,
            fontWeight: 600,
            color: "#fff",
            cursor: "pointer",
            fontFamily: "'DM Sans', system-ui, sans-serif",
            boxShadow: "0 2px 8px rgba(10,122,82,0.15)",
            transition: "all 0.2s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-1px)";
            e.currentTarget.style.boxShadow = "0 4px 16px rgba(10,122,82,0.25)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 2px 8px rgba(10,122,82,0.15)";
          }}
        >
          Start free trial
        </button>
      </div>
    </nav>
  );
}

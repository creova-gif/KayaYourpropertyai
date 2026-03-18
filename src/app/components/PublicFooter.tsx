import { useNavigate } from "react-router";

const G = "#0A7A52";
const TEXT = "#0E0F0C";

export function PublicFooter() {
  const navigate = useNavigate();

  return (
    <footer
      style={{
        background: TEXT,
        color: "rgba(255,255,255,0.5)",
        padding: "48px 48px 32px",
      }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr 1fr 1fr",
            gap: 48,
            marginBottom: 48,
          }}
        >
          <div>
            <div
              style={{
                fontFamily: "'Instrument Serif', serif",
                fontSize: 24,
                color: "#fff",
                marginBottom: 12,
              }}
            >
              Kaya<span style={{ color: G }}>.</span>
            </div>
            <p style={{ fontSize: 14, lineHeight: 1.7, maxWidth: 280 }}>
              The AI-powered property management platform built for Canadian
              landlords.
            </p>
          </div>

          {[
            {
              title: "Product",
              links: [
                { label: "Features", path: "/features" },
                { label: "Pricing", path: "/pricing" },
                { label: "AI Tools", path: "/ai-demo" },
                { label: "Property Listings", path: "/listings" },
              ],
            },
            {
              title: "Resources",
              links: [
                { label: "FAQ", path: "/faq" },
                { label: "Contact", path: "/contact" },
                { label: "About", path: "/about" },
                { label: "Support", path: "/contact" },
              ],
            },
            {
              title: "Legal",
              links: [
                { label: "Privacy", path: "/privacy" },
                { label: "Terms", path: "/terms" },
                { label: "Security", path: "/security" },
                { label: "Compliance", path: "/compliance" },
              ],
            },
          ].map((col, i) => (
            <div key={i}>
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 600,
                  color: "#fff",
                  textTransform: "uppercase",
                  letterSpacing: 1,
                  marginBottom: 16,
                }}
              >
                {col.title}
              </div>
              {col.links.map((link, j) => (
                <div
                  key={j}
                  onClick={() => navigate(link.path)}
                  style={{
                    fontSize: 14,
                    marginBottom: 10,
                    cursor: "pointer",
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "rgba(255,255,255,0.9)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "rgba(255,255,255,0.5)")
                  }
                >
                  {link.label}
                </div>
              ))}
            </div>
          ))}
        </div>

        <div
          style={{
            borderTop: "1px solid rgba(255,255,255,0.1)",
            paddingTop: 24,
            display: "flex",
            justifyContent: "space-between",
            fontSize: 13,
          }}
        >
          <div>© 2026 Kaya. All rights reserved.</div>
          <div style={{ display: "flex", gap: 24 }}>
            <a
              href="mailto:support@creova.one"
              style={{
                color: "rgba(255,255,255,0.5)",
                cursor: "pointer",
                textDecoration: "none",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = "rgba(255,255,255,0.9)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "rgba(255,255,255,0.5)")
              }
            >
              Email Support
            </a>
            <span
              style={{
                cursor: "pointer",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = "rgba(255,255,255,0.9)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "rgba(255,255,255,0.5)")
              }
            >
              Twitter
            </span>
            <span
              style={{
                cursor: "pointer",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = "rgba(255,255,255,0.9)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "rgba(255,255,255,0.5)")
              }
            >
              LinkedIn
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

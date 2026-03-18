import { motion } from "motion/react";
import { Link } from "react-router";
import { Target, Users, Lightbulb, Shield, Heart, TrendingUp } from "lucide-react";

const PRIMARY = "#0A7A52";
const BACKGROUND = "#F8F7F4";
const TEXT = "#0E0F0C";
const MUTED = "#767570";

const values = [
  {
    icon: Target,
    title: "Landlord-First",
    description:
      "Every feature is designed with Ontario landlords in mind. We understand the unique challenges you face and build solutions that actually work.",
  },
  {
    icon: Shield,
    title: "Compliance & Security",
    description:
      "Your data and your tenants' data are protected with bank-level encryption. We stay up-to-date with LTB regulations so you don't have to.",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description:
      "We leverage cutting-edge AI and automation to save you time and make better decisions, while keeping the platform simple and intuitive.",
  },
  {
    icon: Heart,
    title: "Customer Success",
    description:
      "Your success is our success. We provide world-class support, training resources, and regular updates based on your feedback.",
  },
];

const stats = [
  { number: "500+", label: "Landlords" },
  { number: "2,000+", label: "Properties Managed" },
  { number: "15,000+", label: "Tenants Screened" },
  { number: "99.9%", label: "Uptime" },
];

export function AboutPage() {
  return (
    <div style={{ minHeight: "100vh", background: BACKGROUND }}>
      {/* Header */}
      <header
        style={{
          background: "white",
          borderBottom: "1px solid rgba(0,0,0,0.07)",
          position: "sticky",
          top: 0,
          zIndex: 50,
        }}
      >
        <div
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            padding: "20px 24px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Link
            to="/"
            style={{
              fontSize: 24,
              fontWeight: 500,
              color: PRIMARY,
              textDecoration: "none",
              fontFamily: "'Instrument Serif', Georgia, serif",
            }}
          >
            KAYA
          </Link>
          <nav style={{ display: "flex", gap: 24, alignItems: "center" }}>
            <Link
              to="/features"
              style={{
                fontSize: 14,
                color: MUTED,
                textDecoration: "none",
                fontWeight: 500,
              }}
            >
              Features
            </Link>
            <Link
              to="/pricing"
              style={{
                fontSize: 14,
                color: MUTED,
                textDecoration: "none",
                fontWeight: 500,
              }}
            >
              Pricing
            </Link>
            <Link
              to="/about"
              style={{
                fontSize: 14,
                color: PRIMARY,
                textDecoration: "none",
                fontWeight: 600,
              }}
            >
              About
            </Link>
            <Link
              to="/contact"
              style={{
                fontSize: 14,
                color: MUTED,
                textDecoration: "none",
                fontWeight: 500,
              }}
            >
              Contact
            </Link>
            <Link
              to="/app"
              style={{
                padding: "10px 24px",
                background: PRIMARY,
                color: "white",
                borderRadius: 8,
                fontSize: 14,
                fontWeight: 600,
                textDecoration: "none",
              }}
            >
              Launch App
            </Link>
          </nav>
        </div>
      </header>

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
            Simplifying property management
            <br />
            <span style={{ color: PRIMARY, fontStyle: "italic" }}>
              for Ontario landlords
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
            KAYA was born from a simple observation: Ontario landlords deserved
            better tools. We built an intelligent platform that combines AI
            automation with deep understanding of local regulations to make
            property management effortless.
          </p>
        </motion.div>
      </section>

      {/* Stats */}
      <section
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: "40px 24px 80px",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: 32,
          }}
        >
          {stats.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              style={{
                background: "white",
                padding: 40,
                borderRadius: 16,
                border: "1px solid rgba(0,0,0,0.07)",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  fontSize: 48,
                  fontWeight: 400,
                  color: PRIMARY,
                  marginBottom: 8,
                  fontFamily: "'Instrument Serif', Georgia, serif",
                }}
              >
                {stat.number}
              </div>
              <div
                style={{
                  fontSize: 14,
                  color: MUTED,
                  fontWeight: 500,
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                }}
              >
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Mission */}
      <section
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: "60px 24px 80px",
        }}
      >
        <div
          style={{
            background: `linear-gradient(135deg, ${PRIMARY} 0%, #085D3D 100%)`,
            borderRadius: 24,
            padding: 80,
            color: "white",
            textAlign: "center",
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-[#181818] text-[#181818] text-[#1e1e1e] text-[#2a2a2a] text-[#404040] text-[#676767] text-[#909090] text-[#bebebe] text-[#ececec] text-[#ffffff] text-[#ffffff] text-[#ffffff] text-[#ffffff] text-[#ffffff] text-[#ffffff] text-[#ffffff] text-[#ffffff] text-[#ffffff] text-[#ffffff] text-[#ffffff] text-[#ffffff] text-[#ffffff] text-[#ffffff] text-[#ffffff] text-[#ffffff] text-[#ffffff] text-[#ffffff] text-[#ffffff] text-[#ffffff] text-[#ffffff] text-[#ffffff]"
              style={{
                fontSize: 42,
                fontWeight: 400,
                marginBottom: 24,
                fontFamily: "'Instrument Serif', Georgia, serif",
              }}
            >
              Our Mission
            </h2>
            <p className="text-[#191818] text-[#191818] text-[#191919] text-[#212020] text-[#3c3b3b] text-[#4c4a4a] text-[#9a9393] text-[#dbcece] text-[#fbebeb] text-[#ffeded] text-[#ffeded] text-[#ffeded] text-[#ffeeee] text-[#ffefef] text-[#fff0f0] text-[#fff0f0] text-[#fff0f0] text-[#fff0f0] text-[#fff0f0] text-[#fff2f2] text-[#fff2f2] text-[#fff3f3] text-[#fff3f3] text-[#fff3f3] text-[#fff4f4] text-[#fff5f5] text-[#fff5f5] text-[#fff5f5]"
              style={{
                fontSize: 20,
                maxWidth: 800,
                margin: "0 auto",
                lineHeight: 1.7,
                opacity: 0.95,
              }}
            >
              To empower every Ontario landlord with intelligent, automated
              tools that save time, reduce risk, and maximize returns—while
              maintaining the highest standards of tenant relations and legal
              compliance.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: "0 24px 80px",
        }}
      >
        <h2
          style={{
            fontSize: 42,
            fontWeight: 400,
            color: TEXT,
            marginBottom: 48,
            textAlign: "center",
            fontFamily: "'Instrument Serif', Georgia, serif",
          }}
        >
          Our Values
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 32,
          }}
        >
          {values.map((value, idx) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
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
                <value.icon size={28} color={PRIMARY} strokeWidth={2.5} />
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
                {value.title}
              </h3>
              <p
                style={{
                  fontSize: 15,
                  color: MUTED,
                  lineHeight: 1.6,
                }}
              >
                {value.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Story */}
      <section
        style={{
          maxWidth: 900,
          margin: "0 auto",
          padding: "60px 24px 80px",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{
            background: "white",
            padding: 48,
            borderRadius: 20,
            border: "1px solid rgba(0,0,0,0.07)",
          }}
        >
          <h2
            style={{
              fontSize: 32,
              fontWeight: 400,
              color: TEXT,
              marginBottom: 24,
              fontFamily: "'Instrument Serif', Georgia, serif",
            }}
          >
            Why KAYA?
          </h2>
          <div
            style={{
              fontSize: 16,
              color: MUTED,
              lineHeight: 1.8,
            }}
          >
            <p style={{ marginBottom: 20 }}>
              The name KAYA comes from the idea of growth and strength—like a
              sturdy foundation that supports everything above it. In property
              management, that foundation is trust, efficiency, and compliance.
            </p>
            <p style={{ marginBottom: 20 }}>
              We started KAYA after hearing the same frustrations from landlords
              across Ontario: outdated software, confusing LTB processes, manual
              data entry, poor tenant screening, and hours wasted on tasks that
              should be automated.
            </p>
            <p style={{ marginBottom: 20 }}>
              So we built KAYA differently. We combined modern AI technology
              with deep expertise in Ontario rental law. We automated the boring
              stuff and simplified the complex stuff. We made it beautiful,
              fast, and actually enjoyable to use.
            </p>
            <p>
              Today, hundreds of Ontario landlords use KAYA to manage thousands
              of properties. And we're just getting started.
            </p>
          </div>
        </motion.div>
      </section>

      {/* CTA */}
      <section
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: "0 24px 100px",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{
            background: BACKGROUND,
            border: "1px solid rgba(0,0,0,0.07)",
            borderRadius: 24,
            padding: "60px 40px",
            textAlign: "center",
          }}
        >
          <h2
            style={{
              fontSize: 36,
              fontWeight: 400,
              marginBottom: 16,
              color: TEXT,
              fontFamily: "'Instrument Serif', Georgia, serif",
            }}
          >
            Join us on this journey
          </h2>
          <p
            style={{
              fontSize: 17,
              color: MUTED,
              marginBottom: 32,
              maxWidth: 600,
              margin: "0 auto 32px",
            }}
          >
            Whether you manage one property or one hundred, KAYA is built for
            you. Start your free trial today.
          </p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center" }}>
            <Link
              to="/app"
              style={{
                padding: "16px 32px",
                background: PRIMARY,
                color: "white",
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
                background: "white",
                color: PRIMARY,
                border: `2px solid ${PRIMARY}`,
                borderRadius: 12,
                fontSize: 16,
                fontWeight: 600,
                textDecoration: "none",
                display: "inline-block",
              }}
            >
              Contact Us
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
            <p
              style={{
                fontSize: 24,
                fontWeight: 500,
                color: PRIMARY,
                marginBottom: 8,
                fontFamily: "'Instrument Serif', Georgia, serif",
              }}
            >
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
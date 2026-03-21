import { PublicNav } from "../components/PublicNav";
import { motion } from "motion/react";
import { Link } from "react-router";
import { Mail, MessageSquare, Phone, MapPin, Clock, Send } from "lucide-react";
import { useState } from "react";

const PRIMARY = "#0A7A52";
const BACKGROUND = "#F8F7F4";
const TEXT = "#0E0F0C";
const MUTED = "#767570";

const contactMethods = [
  {
    icon: Mail,
    title: "Email Support",
    detail: "support@creova.one",
    description: "Get help from our support team within 24 hours",
    link: "mailto:support@creova.one",
  },
  {
    icon: MessageSquare,
    title: "Live Chat",
    detail: "Available in-app",
    description: "Chat with us in real-time during business hours",
    link: "/",
  },
  {
    icon: Phone,
    title: "Phone Support",
    detail: "Enterprise customers only",
    description: "Priority phone support for enterprise plans",
    link: null,
  },
];

const officeHours = [
  { day: "Monday - Friday", hours: "9:00 AM - 6:00 PM EST" },
  { day: "Saturday", hours: "10:00 AM - 4:00 PM EST" },
  { day: "Sunday", hours: "Closed" },
];

export function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In production, this would send to your backend
    console.log("Form submitted:", formData);
    
    // Compose email
    const mailtoLink = `mailto:support@creova.one?subject=${encodeURIComponent(
      formData.subject
    )}&body=${encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    )}`;
    
    window.location.href = mailtoLink;
    setSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setFormData({ name: "", email: "", subject: "", message: "" });
      setSubmitted(false);
    }, 3000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

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
            Get in{" "}
            <span style={{ color: PRIMARY, fontStyle: "italic" }}>touch</span>
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
            Have questions? We're here to help. Reach out to our team and we'll
            get back to you as soon as possible.
          </p>
        </motion.div>
      </section>

      {/* Contact Methods */}
      <section
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: "0 24px 60px",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: 24,
          }}
        >
          {contactMethods.map((method, idx) => (
            <motion.div
              key={method.title}
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
                <method.icon size={28} color={PRIMARY} strokeWidth={2.5} />
              </div>
              <h3
                style={{
                  fontSize: 20,
                  fontWeight: 400,
                  color: TEXT,
                  marginBottom: 8,
                  fontFamily: "'Instrument Serif', Georgia, serif",
                }}
              >
                {method.title}
              </h3>
              {method.link ? (
                <a
                  href={method.link}
                  style={{
                    fontSize: 16,
                    color: PRIMARY,
                    textDecoration: "none",
                    fontWeight: 600,
                    display: "block",
                    marginBottom: 8,
                  }}
                >
                  {method.detail}
                </a>
              ) : (
                <p
                  style={{
                    fontSize: 16,
                    color: MUTED,
                    fontWeight: 600,
                    marginBottom: 8,
                  }}
                >
                  {method.detail}
                </p>
              )}
              <p
                style={{
                  fontSize: 14,
                  color: MUTED,
                  lineHeight: 1.6,
                }}
              >
                {method.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Main Content Grid */}
      <section
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: "0 24px 80px",
          display: "grid",
          gridTemplateColumns: "2fr 1fr",
          gap: 32,
        }}
      >
        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
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
              marginBottom: 8,
              fontFamily: "'Instrument Serif', Georgia, serif",
            }}
          >
            Send us a message
          </h2>
          <p
            style={{
              fontSize: 15,
              color: MUTED,
              marginBottom: 32,
            }}
          >
            Fill out the form below and we'll respond within 24 hours.
          </p>

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: 24 }}>
              <label
                style={{
                  display: "block",
                  fontSize: 14,
                  fontWeight: 600,
                  color: TEXT,
                  marginBottom: 8,
                }}
              >
                Name
              </label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  fontSize: 15,
                  border: "1px solid rgba(0,0,0,0.08)",
                  borderRadius: 10,
                  outline: "none",
                  transition: "border-color 0.2s",
                }}
                onFocus={(e) => (e.target.style.borderColor = PRIMARY)}
                onBlur={(e) =>
                  (e.target.style.borderColor = "rgba(0,0,0,0.08)")
                }
              />
            </div>

            <div style={{ marginBottom: 24 }}>
              <label
                style={{
                  display: "block",
                  fontSize: 14,
                  fontWeight: 600,
                  color: TEXT,
                  marginBottom: 8,
                }}
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  fontSize: 15,
                  border: "1px solid rgba(0,0,0,0.08)",
                  borderRadius: 10,
                  outline: "none",
                  transition: "border-color 0.2s",
                }}
                onFocus={(e) => (e.target.style.borderColor = PRIMARY)}
                onBlur={(e) =>
                  (e.target.style.borderColor = "rgba(0,0,0,0.08)")
                }
              />
            </div>

            <div style={{ marginBottom: 24 }}>
              <label
                style={{
                  display: "block",
                  fontSize: 14,
                  fontWeight: 600,
                  color: TEXT,
                  marginBottom: 8,
                }}
              >
                Subject
              </label>
              <select
                name="subject"
                required
                value={formData.subject}
                onChange={handleChange}
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  fontSize: 15,
                  border: "1px solid rgba(0,0,0,0.08)",
                  borderRadius: 10,
                  outline: "none",
                  transition: "border-color 0.2s",
                  background: "white",
                }}
                onFocus={(e) => (e.target.style.borderColor = PRIMARY)}
                onBlur={(e) =>
                  (e.target.style.borderColor = "rgba(0,0,0,0.08)")
                }
              >
                <option value="">Select a subject</option>
                <option value="General Inquiry">General Inquiry</option>
                <option value="Sales">Sales & Pricing</option>
                <option value="Technical Support">Technical Support</option>
                <option value="Feature Request">Feature Request</option>
                <option value="Billing">Billing Question</option>
                <option value="Partnership">Partnership Opportunity</option>
              </select>
            </div>

            <div style={{ marginBottom: 32 }}>
              <label
                style={{
                  display: "block",
                  fontSize: 14,
                  fontWeight: 600,
                  color: TEXT,
                  marginBottom: 8,
                }}
              >
                Message
              </label>
              <textarea
                name="message"
                required
                rows={6}
                value={formData.message}
                onChange={handleChange}
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  fontSize: 15,
                  border: "1px solid rgba(0,0,0,0.08)",
                  borderRadius: 10,
                  outline: "none",
                  resize: "vertical",
                  fontFamily: "'DM Sans', system-ui, sans-serif",
                  transition: "border-color 0.2s",
                }}
                onFocus={(e) => (e.target.style.borderColor = PRIMARY)}
                onBlur={(e) =>
                  (e.target.style.borderColor = "rgba(0,0,0,0.08)")
                }
              />
            </div>

            <button
              type="submit"
              disabled={submitted}
              style={{
                width: "100%",
                padding: "16px 32px",
                background: submitted ? MUTED : PRIMARY,
                color: "white",
                border: "none",
                borderRadius: 12,
                fontSize: 16,
                fontWeight: 600,
                cursor: submitted ? "not-allowed" : "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                transition: "background 0.2s",
              }}
            >
              <Send size={18} strokeWidth={2.5} />
              {submitted ? "Message Sent!" : "Send Message"}
            </button>
          </form>
        </motion.div>

        {/* Office Hours & Info */}
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{
              background: "white",
              padding: 32,
              borderRadius: 16,
              border: "1px solid rgba(0,0,0,0.07)",
            }}
          >
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: 10,
                background: `${PRIMARY}10`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 16,
              }}
            >
              <Clock size={24} color={PRIMARY} strokeWidth={2.5} />
            </div>
            <h3
              style={{
                fontSize: 20,
                fontWeight: 400,
                color: TEXT,
                marginBottom: 16,
                fontFamily: "'Instrument Serif', Georgia, serif",
              }}
            >
              Office Hours
            </h3>
            {officeHours.map((schedule) => (
              <div
                key={schedule.day}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: 12,
                  paddingBottom: 12,
                  borderBottom: "1px solid rgba(0,0,0,0.05)",
                }}
              >
                <span style={{ fontSize: 14, color: TEXT, fontWeight: 600 }}>
                  {schedule.day}
                </span>
                <span style={{ fontSize: 14, color: MUTED }}>
                  {schedule.hours}
                </span>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{
              background: `linear-gradient(135deg, ${PRIMARY} 0%, #085D3D 100%)`,
              padding: 32,
              borderRadius: 16,
              color: "white",
            }}
          >
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: 10,
                background: "rgba(255,255,255,0.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 16,
              }}
            >
              <MapPin size={24} color="white" strokeWidth={2.5} />
            </div>
            <h3 className="text-[#181818] text-[#1a1a1a] text-[#222222] text-[#353535] text-[#5d5d5d] text-[#acacac] text-[#dfdfdf] text-[#ffffff] text-[#ffffff] text-[#ffffff] text-[#ffffff] text-[#ffffff] text-[#ffffff] text-[#ffffff] text-[#ffffff] text-[#ffffff] text-[#ffffff] text-[#ffffff] text-[#ffffff] text-[#ffffff] text-[#ffffff] text-[#ffffff] text-[#ffffff] text-[#ffffff]"
              style={{
                fontSize: 20,
                fontWeight: 400,
                marginBottom: 12,
                fontFamily: "'Instrument Serif', Georgia, serif",
              }}
            >
              Location
            </h3>
            <p className="text-[#151515] text-[#161616] text-[#161616] text-[#181818] text-[#242424] text-[#3d3d3d] text-[#676767] text-[#a9a8a8] text-[#ddd6d6] text-[#fff1f1] text-[#ffecec] text-[#ffecec] text-[#ffeeee] text-[#fff0f0] text-[#fff2f2] text-[#fff4f4] text-[#fff6f6] text-[#fff6f6] text-[#fff9f9] text-[#fffbfb] text-[#fffcfc] text-[#fffefe] text-[#ffffff] text-[#ffffff] text-[#ffffff] text-[#ffffff] text-[#ffffff] text-[#ffffff]"
              style={{
                fontSize: 15,
                opacity: 0.95,
                lineHeight: 1.6,
              }}
            >
              Proudly serving Canadian landlords from coast to coast. Our team
              operates remotely to provide you with the best support wherever
              you are.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            style={{
              background: BACKGROUND,
              border: "1px solid rgba(0,0,0,0.07)",
              padding: 24,
              borderRadius: 16,
              textAlign: "center",
            }}
          >
            <p style={{ fontSize: 14, color: MUTED, marginBottom: 12 }}>
              Prefer email?
            </p>
            <a
              href="mailto:support@creova.one"
              style={{
                fontSize: 18,
                color: PRIMARY,
                textDecoration: "none",
                fontWeight: 600,
              }}
            >
              support@creova.one
            </a>
          </motion.div>
        </div>
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
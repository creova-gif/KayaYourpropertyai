import { User, Phone, Mail, Shield, Globe, Bell, LogOut, ChevronRight, CheckCircle2, Lock, Smartphone, Camera, Sparkles, AlertTriangle } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";

const G = "#0A7A52";
const GL = "#E5F4EE";
const TX = "#0E0F0C";
const MU = "#767570";
const BD = "rgba(0,0,0,0.07)";
const SANS = "'DM Sans', system-ui, sans-serif";
const SERIF = "'Instrument Serif', Georgia, serif";

const LANGUAGES = [
  { code: "en", label: "English" },
  { code: "fr", label: "Français" },
  { code: "pa", label: "Punjabi" },
  { code: "hi", label: "Hindi" },
  { code: "tl", label: "Filipino" },
];

export function TenantProfile() {
  const navigate = useNavigate();
  const [lang, setLang] = useState("en");
  const [notifications, setNotifications] = useState({ rent: true, maintenance: true, notices: true, renewal: true, marketing: false });
  const [emergencyName, setEmergencyName] = useState("James Kim");
  const [emergencyPhone, setEmergencyPhone] = useState("+1 (416) 555-0199");
  const [emergencyRelation, setEmergencyRelation] = useState("Sibling");
  const [saved, setSaved] = useState(false);

  const verifications = [
    { label: "Phone", verified: true, value: "+1 (416) 555-0100", icon: Phone },
    { label: "Email", verified: true, value: "sarah@example.com", icon: Mail },
    { label: "Government ID", verified: true, value: "Driver's Licence", icon: Shield },
  ];

  const handleSave = async () => {
    await new Promise(r => setTimeout(r, 800));
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div style={{ fontFamily: SANS }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <p style={{ fontSize: 11, fontWeight: 700, color: MU, textTransform: "uppercase", letterSpacing: "0.7px", marginBottom: 4 }}>Settings</p>
          <h1 style={{ fontFamily: SERIF, fontSize: 36, fontWeight: 400, color: TX, letterSpacing: "-1px", lineHeight: 1 }}>Profile & Settings</h1>
        </motion.div>

        {/* Profile header */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} style={{ background: "#fff", borderRadius: 16, border: "1px solid rgba(0,0,0,0.07)", padding: "24px 26px", marginBottom: 20 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 18, marginBottom: 20 }}>
            <div style={{ position: "relative" }}>
              <div style={{ width: 72, height: 72, borderRadius: "50%", background: "linear-gradient(135deg, #1E5FA8, #163F70)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontSize: 24, fontWeight: 700, color: "#fff", fontFamily: SERIF }}>SK</span>
              </div>
              <button style={{ position: "absolute", bottom: 0, right: 0, width: 24, height: 24, borderRadius: "50%", background: G, border: "2px solid #fff", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                <Camera size={11} color="#fff" strokeWidth={2.5} />
              </button>
            </div>
            <div>
              <h2 style={{ fontFamily: SERIF, fontSize: 24, fontWeight: 400, color: TX, margin: "0 0 4px" }}>Sarah Kim</h2>
              <p style={{ fontSize: 13, color: MU, margin: "0 0 8px" }}>Unit 4A · 123 King St, Toronto · Tenant since Jan 2026</p>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "4px 12px", background: GL, border: `1px solid ${G}20`, borderRadius: 99 }}>
                <div style={{ width: 6, height: 6, borderRadius: "50%", background: G }} />
                <span style={{ fontSize: 11, fontWeight: 700, color: G }}>Active Tenant</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: "Tenure", value: "6 mo" },
              { label: "On-Time Payments", value: "100%" },
              { label: "Trust Score", value: "98/100" },
              { label: "Profile", value: "100%" },
            ].map(s => (
              <div key={s.label} style={{ padding: "12px 14px", background: "#F8F7F4", borderRadius: 12, textAlign: "center" }}>
                <p style={{ fontFamily: SERIF, fontSize: 22, fontWeight: 400, color: TX, margin: "0 0 3px" }}>{s.value}</p>
                <p style={{ fontSize: 10, color: MU, fontWeight: 600, margin: 0 }}>{s.label}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Verifications */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} style={{ background: "#fff", borderRadius: 16, border: "1px solid rgba(0,0,0,0.07)", padding: "22px 24px", marginBottom: 20 }}>
          <h2 style={{ fontFamily: SERIF, fontSize: 20, fontWeight: 400, color: TX, marginBottom: 16 }}>Identity Verifications</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {verifications.map(v => {
              const Icon = v.icon;
              return (
                <div key={v.label} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 16px", background: v.verified ? GL : "#F8F7F4", borderRadius: 12, border: `1px solid ${v.verified ? G + "20" : BD}` }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{ width: 36, height: 36, borderRadius: 9, background: v.verified ? "#fff" : "#F0EFEC", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <Icon size={16} color={v.verified ? G : MU} strokeWidth={2.5} />
                    </div>
                    <div>
                      <p style={{ fontSize: 13, fontWeight: 700, color: TX, margin: "0 0 2px" }}>{v.label}</p>
                      <p style={{ fontSize: 12, color: MU, margin: 0 }}>{v.value}</p>
                    </div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "4px 12px", borderRadius: 99, background: v.verified ? "#fff" : "#F0EFEC", border: `1px solid ${v.verified ? G + "25" : BD}` }}>
                    {v.verified ? <CheckCircle2 size={13} color={G} strokeWidth={2.5} /> : <AlertTriangle size={13} color={MU} strokeWidth={2.5} />}
                    <span style={{ fontSize: 11, fontWeight: 700, color: v.verified ? G : MU }}>{v.verified ? "Verified" : "Pending"}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Security */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} style={{ background: "#fff", borderRadius: 16, border: "1px solid rgba(0,0,0,0.07)", padding: "22px 24px", marginBottom: 20 }}>
          <h2 style={{ fontFamily: SERIF, fontSize: 20, fontWeight: 400, color: TX, marginBottom: 16 }}>Security</h2>
          {[
            { label: "Change Password", desc: "Update your login password", icon: Lock, action: "Change" },
            { label: "Passkey (Face ID / Touch ID)", desc: "Sign in without a password", icon: Smartphone, action: "Set Up" },
            { label: "Two-Factor Authentication", desc: "Require OTP on new devices", icon: Shield, action: "Enabled", active: true },
            { label: "Active Sessions", desc: "Manage devices logged into your account", icon: Globe, action: "View 2" },
          ].map((item, idx, arr) => {
            const Icon = item.icon;
            return (
              <div key={item.label} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 0", borderBottom: idx < arr.length - 1 ? "1px solid rgba(0,0,0,0.05)" : "none" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <div style={{ width: 38, height: 38, borderRadius: 10, background: item.active ? GL : "#F8F7F4", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Icon size={17} color={item.active ? G : MU} strokeWidth={2.5} />
                  </div>
                  <div>
                    <p style={{ fontSize: 14, fontWeight: 600, color: TX, margin: "0 0 2px" }}>{item.label}</p>
                    <p style={{ fontSize: 12, color: MU, margin: 0 }}>{item.desc}</p>
                  </div>
                </div>
                <button style={{ display: "flex", alignItems: "center", gap: 5, padding: "6px 14px", borderRadius: 9, border: `1px solid ${item.active ? G + "30" : BD}`, background: item.active ? GL : "#fff", color: item.active ? G : MU, fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: SANS }}>
                  {item.action} {!item.active && <ChevronRight size={12} strokeWidth={2.5} />}
                </button>
              </div>
            );
          })}
        </motion.div>

        {/* Emergency Contact */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} style={{ background: "#fff", borderRadius: 16, border: "1px solid rgba(0,0,0,0.07)", padding: "22px 24px", marginBottom: 20 }}>
          <h2 style={{ fontFamily: SERIF, fontSize: 20, fontWeight: 400, color: TX, marginBottom: 6 }}>Emergency Contact</h2>
          <p style={{ fontSize: 13, color: MU, marginBottom: 20 }}>Your landlord can view this in an emergency. You control access.</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-12">
            {[
              { label: "Full Name", value: emergencyName, onChange: setEmergencyName, placeholder: "James Kim", icon: User },
              { label: "Phone Number", value: emergencyPhone, onChange: setEmergencyPhone, placeholder: "+1 (416) 555-0199", icon: Phone },
              { label: "Relationship", value: emergencyRelation, onChange: setEmergencyRelation, placeholder: "Sibling", icon: User },
            ].map(field => {
              const Icon = field.icon;
              return (
                <div key={field.label} style={{ flex: 1 }}>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: TX, marginBottom: 7, textTransform: "uppercase", letterSpacing: "0.5px" }}>{field.label}</label>
                  <div style={{ position: "relative" }}>
                    <Icon size={15} color={MU} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }} />
                    <input
                      value={field.value}
                      onChange={e => field.onChange(e.target.value)}
                      placeholder={field.placeholder}
                      style={{ width: "100%", padding: "11px 12px 11px 36px", border: `1.5px solid ${BD}`, borderRadius: 11, fontSize: 14, fontFamily: SANS, outline: "none", boxSizing: "border-box" }}
                      onFocus={e => e.target.style.borderColor = G}
                      onBlur={e => e.target.style.borderColor = BD}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Notifications */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} style={{ background: "#fff", borderRadius: 16, border: "1px solid rgba(0,0,0,0.07)", padding: "22px 24px", marginBottom: 20 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
            <Bell size={18} color={TX} strokeWidth={2.5} />
            <h2 style={{ fontFamily: SERIF, fontSize: 20, fontWeight: 400, color: TX, margin: 0 }}>Notifications</h2>
          </div>
          {[
            { key: "rent", label: "Rent Reminders", desc: "3 days before due date" },
            { key: "maintenance", label: "Maintenance Updates", desc: "Status changes on your requests" },
            { key: "notices", label: "Building Notices", desc: "Maintenance and emergency alerts" },
            { key: "renewal", label: "Lease Renewal", desc: "90-day and 60-day renewal reminders" },
            { key: "marketing", label: "Tips & Offers", desc: "Kaya features and partner deals" },
          ].map((n, idx, arr) => (
            <div key={n.key} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "13px 0", borderBottom: idx < arr.length - 1 ? "1px solid rgba(0,0,0,0.05)" : "none" }}>
              <div>
                <p style={{ fontSize: 14, fontWeight: 600, color: TX, margin: "0 0 2px" }}>{n.label}</p>
                <p style={{ fontSize: 12, color: MU, margin: 0 }}>{n.desc}</p>
              </div>
              <button
                onClick={() => setNotifications(prev => ({ ...prev, [n.key]: !prev[n.key as keyof typeof prev] }))}
                style={{ width: 46, height: 26, borderRadius: 13, background: notifications[n.key as keyof typeof notifications] ? G : "rgba(0,0,0,0.1)", border: "none", cursor: "pointer", position: "relative", transition: "background 0.2s" }}
              >
                <div style={{ position: "absolute", top: 3, left: notifications[n.key as keyof typeof notifications] ? 23 : 3, width: 20, height: 20, borderRadius: "50%", background: "#fff", boxShadow: "0 1px 4px rgba(0,0,0,0.2)", transition: "left 0.2s" }} />
              </button>
            </div>
          ))}
        </motion.div>

        {/* Language */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} style={{ background: "#fff", borderRadius: 16, border: "1px solid rgba(0,0,0,0.07)", padding: "22px 24px", marginBottom: 24 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
            <Globe size={18} color={TX} strokeWidth={2.5} />
            <h2 style={{ fontFamily: SERIF, fontSize: 20, fontWeight: 400, color: TX, margin: 0 }}>Language</h2>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {LANGUAGES.map(l => (
              <button key={l.code} onClick={() => setLang(l.code)} style={{ padding: "8px 18px", borderRadius: 10, border: `2px solid ${lang === l.code ? G : BD}`, background: lang === l.code ? GL : "#fff", color: lang === l.code ? G : MU, fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: SANS }}>
                {l.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Actions */}
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 20 }}>
          <button onClick={handleSave} style={{ flex: 1, padding: "13px 24px", background: saved ? G : TX, color: "#fff", border: "none", borderRadius: 12, fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: SANS, display: "flex", alignItems: "center", justifyContent: "center", gap: 7, transition: "background 0.2s" }}>
            {saved ? <><CheckCircle2 size={16} strokeWidth={2.5} /> Saved!</> : "Save Changes"}
          </button>
          <button onClick={() => navigate("/login")} style={{ display: "flex", alignItems: "center", gap: 7, padding: "13px 20px", border: "1px solid rgba(220,38,38,0.2)", color: "#DC2626", borderRadius: 12, fontSize: 14, fontWeight: 600, cursor: "pointer", background: "#FEF2F2", fontFamily: SANS }}>
            <LogOut size={15} strokeWidth={2.5} /> Sign Out
          </button>
        </div>

        <div style={{ background: GL, borderRadius: 14, padding: "18px 22px", border: `1px solid ${G}20`, cursor: "pointer" }} onClick={() => window.dispatchEvent(new CustomEvent("openAIWithQuery", { detail: { query: "How does Kaya keep my data private?" } }))}>
          <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
            <div style={{ width: 34, height: 34, borderRadius: 9, background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <Sparkles size={16} color={G} strokeWidth={2.5} />
            </div>
            <div>
              <p style={{ fontSize: 13, fontWeight: 700, color: TX, margin: "0 0 4px" }}>Your Privacy is Protected</p>
              <p style={{ fontSize: 13, color: "#3D6B55", margin: 0, lineHeight: 1.5 }}>Your data is encrypted, stored in Canadian servers, and compliant with PIPEDA. Ask Kaya AI how your information is used and protected.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

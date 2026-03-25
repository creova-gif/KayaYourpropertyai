import { useState } from "react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { X, Sparkles } from "lucide-react";
import { toast } from "sonner";

const G = "#0A7A52";
const GL = "#E5F4EE";
const TX = "#0E0F0C";
const MU = "#767570";
const SANS = "'DM Sans', system-ui, sans-serif";
const SERIF = "'Instrument Serif', Georgia, serif";

type ModalType = "otp" | "password" | "devices" | "history" | "editprofile" | "passport" | null;
interface Toggles { rent: boolean; maintenance: boolean; notices: boolean; renewal: boolean; passport: boolean; messages: boolean; }

export function TenantProfile() {
  const navigate = useNavigate();
  const [modal, setModal] = useState<ModalType>(null);
  const [toggles, setToggles] = useState<Toggles>({ rent: true, maintenance: true, notices: true, renewal: true, passport: false, messages: true });
  const [lang, setLang] = useState("English (Canada)");

  function flip(key: keyof Toggles) {
    setToggles(t => ({ ...t, [key]: !t[key] }));
  }

  return (
    <div style={{ fontFamily: SANS, paddingBottom: 80 }}>

      {/* Profile hero */}
      <div style={{ background: "linear-gradient(135deg,#085040 0%,#0A7A52 100%)", padding: "28px 20px 24px", display: "flex", gap: 16, alignItems: "flex-start" }}>
        <div style={{ width: 64, height: 64, borderRadius: "50%", background: "rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, fontWeight: 700, color: "#fff", border: "2px solid rgba(255,255,255,0.3)", flexShrink: 0 }}>SK</div>
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 2 }}>
            <p style={{ fontFamily: SERIF, fontSize: 22, color: "#fff", margin: 0 }}>Sarah Kim</p>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 5, background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.2)", borderRadius: 99, padding: "3px 10px", fontSize: 10, fontWeight: 600, color: "#fff" }}>✓ Verified</span>
          </div>
          <p style={{ fontSize: 12, color: "rgba(255,255,255,0.65)", margin: 0 }}>Unit 4A · 123 King Street, Toronto</p>
          <p style={{ fontSize: 12, color: "rgba(255,255,255,0.55)", margin: "2px 0 0" }}>sarah.kim@email.com</p>
        </div>
        <button onClick={() => setModal("editprofile")} style={{ background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.2)", color: "#fff", padding: "7px 13px", borderRadius: 9, fontSize: 11, fontWeight: 600, cursor: "pointer" }}>Edit</button>
      </div>

      <div style={{ maxWidth: 600, margin: "0 auto", padding: "16px 20px" }}>

        {/* Passport score card */}
        <div style={{ background: "#fff", border: "1px solid rgba(0,0,0,0.07)", borderLeft: "4px solid #7C3AED", borderRadius: 16, padding: 16, marginBottom: 12, cursor: "pointer" }} onClick={() => setModal("passport")}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
            <div>
              <p style={{ fontSize: 13, fontWeight: 700, color: TX, margin: 0 }}>Tenant Passport</p>
              <p style={{ fontSize: 11, color: MU }}>Your portable rental reputation</p>
            </div>
            <div style={{ textAlign: "right" }}>
              <p style={{ fontFamily: SERIF, fontSize: 30, color: "#7C3AED", lineHeight: 1, margin: 0 }}>87</p>
              <p style={{ fontSize: 9, color: "#7C3AED", margin: 0 }}>/ 100</p>
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8 }}>
            {[["Payment", "100%", "On-time rate"], ["Identity", "✓", "Verified"], ["Tenancy", "14 mo", "Experience"]].map(m => (
              <div key={m[0]} style={{ background: "#F8F7F4", borderRadius: 9, padding: 9, textAlign: "center" }}>
                <p style={{ fontSize: 13, fontWeight: 700, color: TX, margin: 0 }}>{m[1]}</p>
                <p style={{ fontSize: 9, color: MU, margin: 0 }}>{m[2]}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Identity Verifications (existing content) */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} style={{ background: "#fff", borderRadius: 14, border: "1px solid rgba(0,0,0,0.07)", padding: "16px", marginBottom: 12 }}>
          <p style={{ fontSize: 12, fontWeight: 700, color: MU, textTransform: "uppercase", letterSpacing: "0.6px", marginBottom: 12 }}>Identity Verifications</p>
          {[
            { icon: "📞", label: "Phone", val: "+1 (416) 555-0100", verified: true },
            { icon: "✉️", label: "Email", val: "sarah.kim@email.com", verified: true },
            { icon: "🪪", label: "Government ID", val: "Driver's Licence", verified: true },
          ].map((v, i) => (
            <div key={v.label} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "11px 12px", borderBottom: i < 2 ? "1px solid rgba(0,0,0,0.05)" : "none" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 30, height: 30, borderRadius: 8, background: GL, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12 }}>{v.icon}</div>
                <div>
                  <p style={{ fontSize: 12, fontWeight: 600, color: TX, margin: 0 }}>{v.label}</p>
                  <p style={{ fontSize: 10, color: MU }}>{v.val}</p>
                </div>
              </div>
              <span style={{ fontSize: 9, fontWeight: 700, color: G, background: GL, borderRadius: 99, padding: "3px 10px" }}>✓ Verified</span>
            </div>
          ))}
        </motion.div>

        {/* Security & Login */}
        <SectionLabel>Security & Login</SectionLabel>
        <div style={{ background: "#fff", border: "1px solid rgba(0,0,0,0.07)", borderRadius: 14, marginBottom: 12 }}>
          {[
            { icon: "🔐", label: "Two-factor authentication", val: "✓ Active", bg: GL, action: () => setModal("otp") },
            { icon: "🔒", label: "Change password", val: "Last changed 30 days ago", bg: "#EBF2FB", action: () => setModal("password") },
            { icon: "📱", label: "Trusted devices", val: "1 active device", bg: "#F8F7F4", action: () => setModal("devices") },
            { icon: "🕵️", label: "Login history", val: "View all sessions", bg: "#F5F5F5", action: () => setModal("history") },
          ].map((r, i) => (
            <div key={r.label} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 16px", borderBottom: i < 3 ? "1px solid rgba(0,0,0,0.06)" : "none", cursor: "pointer" }} onClick={r.action}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, flex: 1 }}>
                <div style={{ width: 34, height: 34, borderRadius: 9, background: r.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14 }}>{r.icon}</div>
                <div>
                  <p style={{ fontSize: 13, fontWeight: 600, color: TX, margin: 0 }}>{r.label}</p>
                  <p style={{ fontSize: 11, color: MU }}>{r.val}</p>
                </div>
              </div>
              <span style={{ color: "#AEADA8", fontSize: 16 }}>›</span>
            </div>
          ))}
        </div>

        {/* Emergency Contact */}
        <SectionLabel>Emergency Contact</SectionLabel>
        <div style={{ background: "#fff", border: "1px solid rgba(0,0,0,0.07)", borderRadius: 14, padding: 16, marginBottom: 12 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <p style={{ fontSize: 13, fontWeight: 600, color: TX, margin: 0 }}>James Kim</p>
              <p style={{ fontSize: 11, color: MU }}>Sibling · +1 (416) 555-0199</p>
            </div>
            <button onClick={() => setModal("editprofile")} style={{ fontSize: 11, color: G, background: GL, border: "none", borderRadius: 8, padding: "5px 11px", cursor: "pointer", fontFamily: SANS, fontWeight: 600 }}>Edit</button>
          </div>
        </div>

        {/* Notifications */}
        <SectionLabel>Notifications</SectionLabel>
        <div style={{ background: "#fff", border: "1px solid rgba(0,0,0,0.07)", borderRadius: 14, marginBottom: 12 }}>
          {([
            { key: "rent" as const, label: "Rent reminders", sub: "3 days before due date" },
            { key: "maintenance" as const, label: "Maintenance updates", sub: "Status changes on requests" },
            { key: "notices" as const, label: "Lease alerts", sub: "90, 60, 30 days before expiry" },
            { key: "passport" as const, label: "Passport score changes", sub: "When your score updates" },
            { key: "messages" as const, label: "Messages from landlord", sub: "Immediate notification" },
          ] as const).map((n, i) => (
            <div key={n.key} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "13px 16px", borderBottom: i < 4 ? "1px solid rgba(0,0,0,0.06)" : "none" }}>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: 13, fontWeight: 600, color: TX, margin: 0 }}>{n.label}</p>
                <p style={{ fontSize: 11, color: MU }}>{n.sub}</p>
              </div>
              <div onClick={() => flip(n.key)} style={{ width: 40, height: 22, borderRadius: 11, cursor: "pointer", position: "relative", background: toggles[n.key] ? G : "rgba(0,0,0,0.12)", transition: "background 0.2s", flexShrink: 0 }}>
                <div style={{ width: 16, height: 16, borderRadius: "50%", background: "#fff", position: "absolute", top: 3, left: toggles[n.key] ? 21 : 3, transition: "left 0.2s", boxShadow: "0 1px 4px rgba(0,0,0,0.2)" }} />
              </div>
            </div>
          ))}
        </div>

        {/* Account */}
        <SectionLabel>Account & Language</SectionLabel>
        <div style={{ background: "#fff", border: "1px solid rgba(0,0,0,0.07)", borderRadius: 14, marginBottom: 12 }}>
          <div style={{ padding: "13px 16px", borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
            <p style={{ fontSize: 11, fontWeight: 700, color: MU, textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 8 }}>Language</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {["English (Canada)", "Français", "Punjabi ਪੰਜਾਬੀ", "हिंदी", "Filipino"].map(l => (
                <button key={l} onClick={() => { setLang(l); toast.info(`Language set to ${l.split(" ")[0]}`); }} style={{ padding: "6px 14px", borderRadius: 9, border: `1.5px solid ${lang === l ? G : "rgba(0,0,0,0.07)"}`, background: lang === l ? GL : "#fff", color: lang === l ? G : MU, fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: SANS }}>
                  {l}
                </button>
              ))}
            </div>
          </div>
          {[
            { icon: "🛡", label: "Privacy & Data", val: "AES-256 · ca-central-1 · PIPEDA", action: () => toast.info("Privacy settings") },
            { icon: "💬", label: "Help & Support", val: "Chat with Kaya support", action: () => toast.info("Support chat opening…") },
          ].map((r, i) => (
            <div key={r.label} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "13px 16px", borderBottom: i === 0 ? "1px solid rgba(0,0,0,0.06)" : "none", cursor: "pointer" }} onClick={r.action}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 30, height: 30, borderRadius: 8, background: "#F8F7F4", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12 }}>{r.icon}</div>
                <div>
                  <p style={{ fontSize: 13, fontWeight: 600, color: TX, margin: 0 }}>{r.label}</p>
                  <p style={{ fontSize: 11, color: MU }}>{r.val}</p>
                </div>
              </div>
              <span style={{ color: "#AEADA8", fontSize: 16 }}>›</span>
            </div>
          ))}
        </div>

        {/* AI nudge */}
        <div style={{ background: GL, borderRadius: 12, padding: "14px 16px", border: `1px solid ${G}20`, cursor: "pointer", marginBottom: 14 }} onClick={() => window.dispatchEvent(new CustomEvent("openAIWithQuery", { detail: { query: "How does Kaya keep my data private?" } }))}>
          <div style={{ display: "flex", gap: 10 }}>
            <div style={{ width: 30, height: 30, borderRadius: 8, background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <Sparkles size={13} color={G} strokeWidth={2.5} />
            </div>
            <div>
              <p style={{ fontSize: 12, fontWeight: 700, color: TX, margin: "0 0 2px" }}>Your data is protected</p>
              <p style={{ fontSize: 11, color: "#3D6B55", margin: 0 }}>Encrypted, stored in Canada, PIPEDA compliant. Tap to learn more.</p>
            </div>
          </div>
        </div>

        <button onClick={() => { if (window.confirm("Sign out of your tenant portal?")) { navigate("/login"); toast.success("Signed out securely"); } }} style={{ width: "100%", padding: 13, background: "#FEF2F2", color: "#C0392B", border: "1.5px solid rgba(192,57,43,0.2)", borderRadius: 12, fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: SANS, marginBottom: 10 }}>Sign Out</button>
        <p style={{ fontSize: 10, color: "#AEADA8", textAlign: "center" }}>Kaya v2.1 · All data encrypted · PIPEDA compliant</p>
      </div>

      {/* ── Modals ── */}
      <AnimatePresence>
        {modal && (
          <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.45)", backdropFilter: "blur(4px)", zIndex: 900, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }} onClick={() => setModal(null)}>
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} onClick={e => e.stopPropagation()} style={{ background: "#fff", borderRadius: 22, padding: 28, width: "100%", maxWidth: 440, maxHeight: "90vh", overflowY: "auto" }}>

              {modal === "otp" && (
                <>
                  <ModalHead title="Two-Factor Auth" onClose={() => setModal(null)} />
                  <div style={{ background: GL, borderRadius: 12, padding: 14, marginBottom: 16, textAlign: "center" }}>
                    <p style={{ fontSize: 28, marginBottom: 8 }}>🔐</p>
                    <p style={{ fontSize: 13, fontWeight: 700, color: "#085040" }}>Two-factor authentication is active</p>
                    <p style={{ fontSize: 11, color: G, marginTop: 4 }}>Every sign-in requires a one-time code sent to your email or phone.</p>
                  </div>
                  <p style={{ fontSize: 12, color: MU, marginBottom: 16, lineHeight: 1.5 }}>OTP protects your account even if your password is stolen. We strongly recommend keeping this enabled.</p>
                  <div style={{ display: "flex", flexDirection: "column", gap: 9, marginBottom: 14 }}>
                    <div style={{ padding: 12, border: "1px solid rgba(0,0,0,0.07)", borderRadius: 11 }}>
                      <p style={{ fontSize: 12, fontWeight: 600, color: TX, margin: 0 }}>✉️ Email OTP</p>
                      <p style={{ fontSize: 10, color: MU }}>s***@email.com · Active</p>
                    </div>
                    <div style={{ padding: 12, border: "1px solid rgba(0,0,0,0.07)", borderRadius: 11, cursor: "pointer" }} onClick={() => { setModal(null); toast.info("SMS OTP setup started"); }}>
                      <p style={{ fontSize: 12, fontWeight: 600, color: TX, margin: 0 }}>📱 Add SMS OTP</p>
                      <p style={{ fontSize: 10, color: MU }}>Add your phone as a backup method</p>
                    </div>
                  </div>
                  <button onClick={() => { setModal(null); toast.warning("Please contact support to disable OTP"); }} style={{ width: "100%", padding: 13, background: "#FDECEA", color: "#C0392B", border: "1.5px solid rgba(192,57,43,0.2)", borderRadius: 12, fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: SANS }}>Disable 2FA</button>
                </>
              )}

              {modal === "password" && (
                <>
                  <ModalHead title="Change Password" onClose={() => setModal(null)} />
                  {[["Current password", "Enter current password"], ["New password", "At least 8 characters"], ["Confirm new password", "Repeat new password"]].map((f, i) => (
                    <div key={f[0]} style={{ marginBottom: 13 }}>
                      <p style={{ fontSize: 11, fontWeight: 700, color: MU, textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 5 }}>{f[0]}</p>
                      <input type="password" placeholder={f[1]} style={{ width: "100%", padding: "11px 13px", border: "1.5px solid rgba(0,0,0,0.07)", borderRadius: 10, fontFamily: SANS, fontSize: 13, outline: "none", boxSizing: "border-box" }} />
                    </div>
                  ))}
                  <button onClick={() => { setModal(null); toast.success("Password updated. OTP required at next login."); }} style={{ width: "100%", marginTop: 4, padding: 13, background: G, color: "#fff", border: "none", borderRadius: 12, fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: SANS }}>Update Password</button>
                </>
              )}

              {modal === "devices" && (
                <>
                  <ModalHead title="Trusted Devices" onClose={() => setModal(null)} />
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "13px 16px", border: "1px solid rgba(0,0,0,0.07)", borderRadius: 11 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <div style={{ width: 34, height: 34, borderRadius: 9, background: GL, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14 }}>💻</div>
                      <div>
                        <p style={{ fontSize: 13, fontWeight: 600, color: TX, margin: 0 }}>Chrome on macOS</p>
                        <p style={{ fontSize: 11, color: MU }}>Toronto, ON · Last active today</p>
                      </div>
                    </div>
                    <button onClick={() => { setModal(null); toast.warning("Device removed"); }} style={{ background: "#FDECEA", color: "#C0392B", border: "none", borderRadius: 99, fontSize: 10, fontWeight: 600, padding: "4px 10px", cursor: "pointer", fontFamily: SANS }}>Remove</button>
                  </div>
                </>
              )}

              {modal === "history" && (
                <>
                  <ModalHead title="Login History" onClose={() => setModal(null)} />
                  {["Today 9:02 AM — Chrome, macOS — Toronto, ON", "Yesterday 7:31 PM — Safari, iPhone — Toronto, ON", "Mar 20 12:14 PM — Chrome, macOS — Toronto, ON"].map((e, i) => (
                    <div key={i} style={{ padding: "11px 0", borderBottom: "1px solid rgba(0,0,0,0.05)" }}>
                      <p style={{ fontSize: 12, color: TX, margin: 0 }}>{e}</p>
                    </div>
                  ))}
                </>
              )}

              {modal === "editprofile" && (
                <>
                  <ModalHead title="Edit Profile" onClose={() => setModal(null)} />
                  {[["Full Name", "Sarah Kim", "text"], ["Email", "sarah.kim@email.com", "email"], ["Phone", "+1 (416) 555-0123", "tel"], ["Emergency Contact", "James Kim", "text"], ["Emergency Phone", "+1 (416) 555-0199", "tel"]].map(f => (
                    <div key={f[0]} style={{ marginBottom: 13 }}>
                      <p style={{ fontSize: 11, fontWeight: 700, color: MU, textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 5 }}>{f[0]}</p>
                      <input type={f[2]} defaultValue={f[1]} style={{ width: "100%", padding: "11px 13px", border: "1.5px solid rgba(0,0,0,0.07)", borderRadius: 10, fontFamily: SANS, fontSize: 13, outline: "none", boxSizing: "border-box" }} />
                    </div>
                  ))}
                  <button onClick={() => { setModal(null); toast.success("Profile updated"); }} style={{ width: "100%", padding: 13, background: G, color: "#fff", border: "none", borderRadius: 12, fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: SANS }}>Save Changes</button>
                </>
              )}

              {modal === "passport" && (
                <>
                  <ModalHead title="Tenant Passport" subtitle="Your portable rental reputation score" onClose={() => setModal(null)} />
                  <div style={{ textAlign: "center", marginBottom: 18 }}>
                    <div style={{ width: 100, height: 100, borderRadius: "50%", background: "linear-gradient(135deg,#7C3AED,#9F5AFF)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", margin: "0 auto" }}>
                      <p style={{ fontFamily: SERIF, fontSize: 36, color: "#fff", lineHeight: 1, margin: 0 }}>87</p>
                      <p style={{ fontSize: 9, color: "rgba(255,255,255,0.7)", fontWeight: 700, margin: 0 }}>/ 100</p>
                    </div>
                    <p style={{ fontSize: 12, fontWeight: 600, color: "#7C3AED", marginTop: 10 }}>↑ +4 points this month</p>
                  </div>
                  {[
                    { label: "Payment history", score: 40, max: 40, desc: "14 consecutive on-time payments" },
                    { label: "Identity verification", score: 25, max: 25, desc: "Government ID verified" },
                    { label: "Tenancy duration", score: 14, max: 30, desc: "14 months in current unit" },
                    { label: "Maintenance cooperation", score: 8, max: 10, desc: "Quick access, good communication" },
                  ].map(s => (
                    <div key={s.label} style={{ marginBottom: 12 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                        <span style={{ fontSize: 12, fontWeight: 600, color: TX }}>{s.label}</span>
                        <span style={{ fontSize: 11, fontWeight: 700, color: "#7C3AED" }}>{s.score}/{s.max}</span>
                      </div>
                      <div style={{ height: 6, background: "#F3F0FF", borderRadius: 3, overflow: "hidden" }}>
                        <div style={{ width: `${Math.round(s.score / s.max * 100)}%`, height: "100%", background: "linear-gradient(90deg,#7C3AED,#9F5AFF)", borderRadius: 3 }} />
                      </div>
                      <p style={{ fontSize: 10, color: MU, marginTop: 2 }}>{s.desc}</p>
                    </div>
                  ))}
                  <div style={{ background: GL, borderRadius: 11, padding: 12, marginBottom: 14 }}>
                    <p style={{ fontSize: 11, color: "#085040", lineHeight: 1.5, margin: 0 }}>💡 Reach 95+ by extending your tenancy to 24 months. Keep paying on time to maintain your perfect payment score.</p>
                  </div>
                  <button onClick={() => setModal(null)} style={{ width: "100%", padding: 13, background: "#7C3AED", color: "#fff", border: "none", borderRadius: 12, fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: SANS }}>Close</button>
                </>
              )}

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <p style={{ fontSize: 11, fontWeight: 700, color: MU, textTransform: "uppercase", letterSpacing: "0.6px", margin: "16px 0 8px" }}>{children}</p>;
}

function ModalHead({ title, subtitle, onClose }: { title: string; subtitle?: string; onClose: () => void }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 22 }}>
      <div>
        <h3 style={{ fontFamily: SERIF, fontSize: 26, color: TX, margin: 0 }}>{title}</h3>
        {subtitle && <p style={{ fontSize: 11, color: MU, marginTop: 3 }}>{subtitle}</p>}
      </div>
      <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: MU, display: "flex", alignItems: "center", justifyContent: "center", width: 32, height: 32, borderRadius: "50%", flexShrink: 0 }}><X size={18} /></button>
    </div>
  );
}

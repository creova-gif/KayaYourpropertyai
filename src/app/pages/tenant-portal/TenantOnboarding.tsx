import { useState, useRef } from "react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import {
  Building2, ArrowRight, ArrowLeft, Phone, Mail, Shield, User, Calendar,
  CheckCircle2, Upload, Camera, Eye, EyeOff, Loader2, Sparkles, Lock,
  AlertCircle, Globe, Flag,
} from "lucide-react";

const G = "#0A7A52";
const GL = "#E5F4EE";
const TX = "#0E0F0C";
const MU = "#767570";
const BD = "rgba(0,0,0,0.07)";
const SANS = "'DM Sans', system-ui, sans-serif";
const SERIF = "'Instrument Serif', Georgia, serif";

const TOTAL_STEPS = 5;
const LANGUAGES = ["English", "Français", "Punjabi", "Hindi", "Filipino"];

function Step({ current, total }: { current: number; total: number }) {
  return (
    <div style={{ display: "flex", gap: 6, marginBottom: 36 }}>
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} style={{ flex: 1, height: 4, borderRadius: 2, background: i < current ? G : i === current ? G : "rgba(0,0,0,0.08)", opacity: i < current ? 0.4 : 1, transition: "all 0.3s" }} />
      ))}
    </div>
  );
}

function InputField({ label, icon: Icon, type = "text", value, onChange, placeholder, error, hint }: {
  label: string; icon: React.ComponentType<any>; type?: string; value: string;
  onChange: (v: string) => void; placeholder: string; error?: string; hint?: string;
}) {
  const [focused, setFocused] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const isPass = type === "password";
  return (
    <div style={{ marginBottom: 18 }}>
      <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: TX, marginBottom: 7 }}>{label}</label>
      <div style={{ position: "relative" }}>
        <Icon size={16} color={focused ? G : MU} style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", pointerEvents: "none", transition: "color 0.15s" }} />
        <input
          type={isPass && showPass ? "text" : type}
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{ width: "100%", padding: `12px 14px 12px ${isPass ? "42px" : "42px"}`, paddingRight: isPass ? 42 : 14, border: `1.5px solid ${error ? "#C0392B" : focused ? G : BD}`, borderRadius: 11, fontSize: 14, fontFamily: SANS, outline: "none", background: "#fff", boxSizing: "border-box", transition: "border-color 0.15s" }}
        />
        {isPass && (
          <button type="button" onClick={() => setShowPass(!showPass)} style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: MU }}>
            {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        )}
      </div>
      {error && <p style={{ fontSize: 12, color: "#C0392B", marginTop: 5 }}>{error}</p>}
      {hint && !error && <p style={{ fontSize: 12, color: MU, marginTop: 5 }}>{hint}</p>}
    </div>
  );
}

export function TenantOnboarding() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [lang, setLang] = useState("English");

  // Step 0 — Basics
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dob, setDob] = useState("");
  const [phone, setPhone] = useState("");

  // Step 1 — Phone OTP
  const [phoneOtp, setPhoneOtp] = useState(["", "", "", "", "", ""]);
  const phoneRefs = Array.from({ length: 6 }, () => useRef<HTMLInputElement>(null));
  const [phoneVerified, setPhoneVerified] = useState(false);

  // Step 2 — Email OTP
  const [emailAddress, setEmailAddress] = useState("");
  const [emailOtp, setEmailOtp] = useState(["", "", "", "", "", ""]);
  const emailRefs = Array.from({ length: 6 }, () => useRef<HTMLInputElement>(null));
  const [emailVerified, setEmailVerified] = useState(false);

  // Step 3 — ID Upload
  const [idType, setIdType] = useState("drivers");
  const [idUploaded, setIdUploaded] = useState(false);
  const [selfieUploaded, setSelfieUploaded] = useState(false);
  const [kycChecking, setKycChecking] = useState(false);
  const [kycDone, setKycDone] = useState(false);

  // Step 4 — Password
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passError, setPassError] = useState("");

  const next = () => setStep(s => Math.min(s + 1, TOTAL_STEPS - 1));
  const back = () => setStep(s => Math.max(s - 1, 0));

  const sim = async (ms = 1500) => { setLoading(true); await new Promise(r => setTimeout(r, ms)); setLoading(false); };

  const handleOTPDigit = (digits: string[], setDigits: (d: string[]) => void, refs: React.RefObject<HTMLInputElement | null>[], onComplete: () => void, idx: number, val: string) => {
    const next = [...digits]; next[idx] = val.replace(/\D/, "").slice(-1); setDigits(next);
    if (val && idx < 5) refs[idx + 1]?.current?.focus();
    if (next.every(d => d)) onComplete();
  };

  const handlePhoneVerify = async () => {
    await sim(1200);
    setPhoneVerified(true);
    setTimeout(next, 600);
  };

  const handleEmailVerify = async () => {
    await sim(1200);
    setEmailVerified(true);
    setTimeout(next, 600);
  };

  const handleIDUpload = async () => {
    await sim(2000);
    setKycDone(true);
  };

  const handleFinish = async () => {
    if (password !== confirmPassword) { setPassError("Passwords don't match"); return; }
    if (password.length < 8) { setPassError("Password must be at least 8 characters"); return; }
    await sim(2000);
    navigate("/tenant");
  };

  const OTPRow = ({ digits, setDigits, refs, onComplete }: { digits: string[]; setDigits: (d: string[]) => void; refs: React.RefObject<HTMLInputElement | null>[]; onComplete: () => void }) => (
    <div style={{ display: "flex", gap: 8, justifyContent: "center", margin: "24px 0" }}>
      {digits.map((d, i) => (
        <input key={i} ref={refs[i]} type="text" inputMode="numeric" maxLength={1} value={d}
          onChange={e => handleOTPDigit(digits, setDigits, refs, onComplete, i, e.target.value)}
          onKeyDown={e => { if (e.key === "Backspace" && !d && i > 0) refs[i - 1]?.current?.focus(); }}
          style={{ width: 48, height: 56, textAlign: "center", fontSize: 22, fontWeight: 700, border: `2px solid ${d ? G : BD}`, borderRadius: 12, outline: "none", fontFamily: SERIF, color: TX, background: d ? GL : "#fff", transition: "all 0.15s" }}
        />
      ))}
    </div>
  );

  return (
    <div style={{ minHeight: "100vh", background: "#F8F7F4", display: "flex", fontFamily: SANS }}>
      <style>{`@keyframes spin { from { transform:rotate(0deg); } to { transform:rotate(360deg); } }`}</style>

      {/* Left panel */}
      <div style={{ width: "38%", minWidth: 340, background: TX, display: "flex", flexDirection: "column", padding: "40px 40px", position: "relative", overflow: "hidden" }} className="hidden lg:flex flex-col">
        <div style={{ position: "absolute", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(10,122,82,0.12) 0%, transparent 70%)", top: "60%", left: "50%", transform: "translate(-50%,-50%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,0.02) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.02) 1px,transparent 1px)", backgroundSize: "48px 48px", pointerEvents: "none" }} />

        <div style={{ position: "relative", zIndex: 1 }}>
          <button onClick={() => navigate("/login")} style={{ display: "flex", alignItems: "center", gap: 10, background: "none", border: "none", cursor: "pointer", padding: 0, marginBottom: 48 }}>
            <div style={{ width: 34, height: 34, borderRadius: 9, background: `linear-gradient(140deg, ${G} 0%, #065E3C 100%)`, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Building2 size={17} color="#fff" strokeWidth={2.4} />
            </div>
            <span style={{ fontFamily: SERIF, fontSize: 22, color: "#fff" }}>Kaya<span style={{ color: G }}>.</span></span>
          </button>

          <p style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.3)", textTransform: "uppercase", letterSpacing: "1px", marginBottom: 10 }}>Account Setup</p>
          <h2 style={{ fontFamily: SERIF, fontSize: 28, color: "#fff", lineHeight: 1.1, marginBottom: 20, letterSpacing: "-0.5px" }}>
            Your secure<br />tenant account
          </h2>

          {/* Step indicators */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {[
              { label: "Basic Information", desc: "Name, DOB, and phone number" },
              { label: "Phone Verification", desc: "6-digit SMS code" },
              { label: "Email Verification", desc: "Confirm your email address" },
              { label: "Identity Check", desc: "Government ID + liveness" },
              { label: "Secure Password", desc: "Protect your account" },
            ].map((s, i) => (
              <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                <div style={{ width: 28, height: 28, borderRadius: "50%", flexShrink: 0, border: `2px solid ${i < step ? G : i === step ? G : "rgba(255,255,255,0.15)"}`, background: i < step ? G : i === step ? "rgba(10,122,82,0.2)" : "transparent", display: "flex", alignItems: "center", justifyContent: "center", marginTop: 2, transition: "all 0.3s" }}>
                  {i < step
                    ? <CheckCircle2 size={14} color="#fff" strokeWidth={2.5} />
                    : <span style={{ fontSize: 11, fontWeight: 700, color: i === step ? "#5DCAA5" : "rgba(255,255,255,0.3)" }}>{i + 1}</span>}
                </div>
                <div>
                  <p style={{ fontSize: 13, fontWeight: i === step ? 700 : 500, color: i <= step ? "#fff" : "rgba(255,255,255,0.35)", margin: "2px 0 2px" }}>{s.label}</p>
                  <p style={{ fontSize: 11, color: "rgba(255,255,255,0.25)", margin: 0 }}>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: "auto", paddingTop: 40 }}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {LANGUAGES.map(l => (
                <button key={l} onClick={() => setLang(l)} style={{ padding: "4px 10px", borderRadius: 99, border: `1px solid ${lang === l ? G : "rgba(255,255,255,0.12)"}`, background: lang === l ? "rgba(10,122,82,0.2)" : "transparent", color: lang === l ? "#5DCAA5" : "rgba(255,255,255,0.35)", fontSize: 11, fontWeight: 600, cursor: "pointer", fontFamily: SANS }}>
                  {l}
                </button>
              ))}
            </div>
            <p style={{ fontSize: 11, color: "rgba(255,255,255,0.2)", marginTop: 10 }}>Platform available in 5 languages</p>
          </div>
        </div>
      </div>

      {/* Right panel */}
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 32px" }}>
        <div style={{ width: "100%", maxWidth: 460 }}>
          <Step current={step} total={TOTAL_STEPS} />

          <AnimatePresence mode="wait">
            <motion.div key={step} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }} transition={{ duration: 0.25 }}>

              {/* ── STEP 0: Basics ── */}
              {step === 0 && (
                <>
                  <p style={{ fontSize: 11, fontWeight: 700, color: MU, textTransform: "uppercase", letterSpacing: "0.7px", marginBottom: 6 }}>Step 1 of 5</p>
                  <h1 style={{ fontFamily: SERIF, fontSize: 32, fontWeight: 400, color: TX, marginBottom: 6 }}>Let's set up your account</h1>
                  <p style={{ fontSize: 14, color: MU, marginBottom: 28 }}>We'll need a few details to create your tenant profile.</p>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 6 }}>
                    <InputField label="First Name" icon={User} value={firstName} onChange={setFirstName} placeholder="Sarah" />
                    <InputField label="Last Name" icon={User} value={lastName} onChange={setLastName} placeholder="Kim" />
                  </div>
                  <InputField label="Date of Birth" icon={Calendar} type="date" value={dob} onChange={setDob} placeholder="YYYY-MM-DD" hint="Must be 18 or older to create an account" />
                  <InputField label="Phone Number" icon={Phone} type="tel" value={phone} onChange={setPhone} placeholder="+1 (416) 555-0100" hint="We'll send a verification code to this number" />
                  <button onClick={next} disabled={!firstName || !lastName || !phone} style={{ width: "100%", padding: "13px", background: firstName && lastName && phone ? G : MU, color: "#fff", border: "none", borderRadius: 11, fontSize: 14, fontWeight: 600, fontFamily: SANS, cursor: firstName && lastName && phone ? "pointer" : "not-allowed", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, boxShadow: firstName && lastName && phone ? `0 4px 16px ${G}40` : "none" }}>
                    Continue <ArrowRight size={15} />
                  </button>
                </>
              )}

              {/* ── STEP 1: Phone OTP ── */}
              {step === 1 && (
                <>
                  <div style={{ width: 52, height: 52, borderRadius: 14, background: GL, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20 }}>
                    <Phone size={24} color={G} strokeWidth={2.5} />
                  </div>
                  <p style={{ fontSize: 11, fontWeight: 700, color: MU, textTransform: "uppercase", letterSpacing: "0.7px", marginBottom: 6 }}>Step 2 of 5</p>
                  <h1 style={{ fontFamily: SERIF, fontSize: 28, fontWeight: 400, color: TX, marginBottom: 8 }}>Verify your phone</h1>
                  <p style={{ fontSize: 14, color: MU, marginBottom: 4 }}>Enter the 6-digit code sent to</p>
                  <p style={{ fontSize: 14, fontWeight: 700, color: TX, marginBottom: 4 }}>{phone || "+1 (416) 555-0100"}</p>
                  <div style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "4px 12px", background: GL, border: `1px solid ${G}20`, borderRadius: 99, marginBottom: 20 }}>
                    <div style={{ width: 5, height: 5, borderRadius: "50%", background: G }} />
                    <span style={{ fontSize: 11, fontWeight: 700, color: G }}>Demo: enter any 6 digits</span>
                  </div>
                  {!phoneVerified
                    ? <OTPRow digits={phoneOtp} setDigits={setPhoneOtp} refs={phoneRefs} onComplete={handlePhoneVerify} />
                    : (
                      <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, padding: "20px", background: GL, borderRadius: 14, margin: "24px 0" }}>
                        <CheckCircle2 size={22} color={G} strokeWidth={2.5} />
                        <span style={{ fontSize: 15, fontWeight: 700, color: G }}>Phone verified!</span>
                      </motion.div>
                    )}
                  {loading && !phoneVerified && (
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: 16 }}>
                      <Loader2 size={16} color={G} style={{ animation: "spin 1s linear infinite" }} />
                      <span style={{ fontSize: 13, color: G }}>Verifying...</span>
                    </div>
                  )}
                  <button onClick={back} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: MU, background: "none", border: "none", cursor: "pointer", fontFamily: SANS, marginTop: 8 }}>
                    <ArrowLeft size={14} /> Back
                  </button>
                </>
              )}

              {/* ── STEP 2: Email OTP ── */}
              {step === 2 && (
                <>
                  <div style={{ width: 52, height: 52, borderRadius: 14, background: "#EFF6FF", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20 }}>
                    <Mail size={24} color="#1D4ED8" strokeWidth={2.5} />
                  </div>
                  <p style={{ fontSize: 11, fontWeight: 700, color: MU, textTransform: "uppercase", letterSpacing: "0.7px", marginBottom: 6 }}>Step 3 of 5</p>
                  <h1 style={{ fontFamily: SERIF, fontSize: 28, fontWeight: 400, color: TX, marginBottom: 8 }}>Verify your email</h1>
                  <p style={{ fontSize: 14, color: MU, marginBottom: 20 }}>Enter your email address and confirm it with a code.</p>
                  <InputField label="Email Address" icon={Mail} type="email" value={emailAddress} onChange={setEmailAddress} placeholder="sarah@example.com" />
                  {emailAddress && !emailVerified && (
                    <>
                      <div style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "4px 12px", background: "#EFF6FF", border: "1px solid rgba(29,78,216,0.12)", borderRadius: 99, marginBottom: 16 }}>
                        <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#1D4ED8" }} />
                        <span style={{ fontSize: 11, fontWeight: 700, color: "#1D4ED8" }}>Demo: enter any 6 digits</span>
                      </div>
                      <OTPRow digits={emailOtp} setDigits={setEmailOtp} refs={emailRefs} onComplete={handleEmailVerify} />
                    </>
                  )}
                  {emailVerified && (
                    <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, padding: "20px", background: GL, borderRadius: 14, margin: "24px 0" }}>
                      <CheckCircle2 size={22} color={G} strokeWidth={2.5} />
                      <span style={{ fontSize: 15, fontWeight: 700, color: G }}>Email verified!</span>
                    </motion.div>
                  )}
                  {loading && <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: 16 }}><Loader2 size={16} color={G} style={{ animation: "spin 1s linear infinite" }} /><span style={{ fontSize: 13, color: G }}>Verifying...</span></div>}
                  <button onClick={back} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: MU, background: "none", border: "none", cursor: "pointer", fontFamily: SANS, marginTop: 8 }}>
                    <ArrowLeft size={14} /> Back
                  </button>
                </>
              )}

              {/* ── STEP 3: KYC ── */}
              {step === 3 && (
                <>
                  <div style={{ width: 52, height: 52, borderRadius: 14, background: "#FEF3C7", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20 }}>
                    <Shield size={24} color="#B45309" strokeWidth={2.5} />
                  </div>
                  <p style={{ fontSize: 11, fontWeight: 700, color: MU, textTransform: "uppercase", letterSpacing: "0.7px", marginBottom: 6 }}>Step 4 of 5</p>
                  <h1 style={{ fontFamily: SERIF, fontSize: 28, fontWeight: 400, color: TX, marginBottom: 8 }}>Identity verification</h1>
                  <p style={{ fontSize: 14, color: MU, marginBottom: 24 }}>Upload a government ID and take a quick selfie to confirm your identity.</p>

                  <div style={{ marginBottom: 18 }}>
                    <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: TX, marginBottom: 10 }}>ID Type</label>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
                      {[{ val: "drivers", label: "Driver's Licence" }, { val: "passport", label: "Passport" }, { val: "pr", label: "PR Card" }].map(t => (
                        <button key={t.val} onClick={() => setIdType(t.val)} style={{ padding: "10px 8px", border: `2px solid ${idType === t.val ? G : BD}`, borderRadius: 10, background: idType === t.val ? GL : "#fff", color: idType === t.val ? G : MU, fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: SANS, textAlign: "center" }}>
                          {t.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* ID upload */}
                  <div onClick={() => { if (!idUploaded) { sim(1500).then(() => setIdUploaded(true)); } }} style={{ border: `2px dashed ${idUploaded ? G : BD}`, borderRadius: 14, padding: "24px", textAlign: "center", cursor: idUploaded ? "default" : "pointer", background: idUploaded ? GL : "#fff", marginBottom: 12, transition: "all 0.2s" }}>
                    {idUploaded
                      ? <><CheckCircle2 size={28} color={G} strokeWidth={2} style={{ marginBottom: 8 }} /><p style={{ fontSize: 14, fontWeight: 700, color: G, margin: 0 }}>ID uploaded successfully</p></>
                      : loading
                      ? <><Loader2 size={28} color={MU} strokeWidth={2} style={{ animation: "spin 1s linear infinite", marginBottom: 8 }} /><p style={{ fontSize: 14, color: MU, margin: 0 }}>Uploading...</p></>
                      : <><Upload size={28} color={MU} strokeWidth={1.5} style={{ marginBottom: 8 }} /><p style={{ fontSize: 14, fontWeight: 600, color: TX, margin: "0 0 4px" }}>Upload your {idType === "drivers" ? "driver's licence" : idType === "passport" ? "passport" : "PR card"}</p><p style={{ fontSize: 12, color: MU, margin: 0 }}>JPEG or PNG, max 5MB</p></>}
                  </div>

                  {/* Selfie */}
                  {idUploaded && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} onClick={() => { if (!selfieUploaded) { sim(1500).then(() => { setSelfieUploaded(true); setKycChecking(true); sim(2000).then(() => setKycDone(true)); }); } }} style={{ border: `2px dashed ${selfieUploaded ? G : "#B45309"}`, borderRadius: 14, padding: "24px", textAlign: "center", cursor: selfieUploaded ? "default" : "pointer", background: selfieUploaded ? GL : "#FFFBEB", marginBottom: 16, transition: "all 0.2s" }}>
                      {selfieUploaded
                        ? <><CheckCircle2 size={28} color={G} strokeWidth={2} style={{ marginBottom: 8 }} /><p style={{ fontSize: 14, fontWeight: 700, color: G, margin: 0 }}>Selfie captured</p></>
                        : loading
                        ? <><Loader2 size={28} color="#B45309" strokeWidth={2} style={{ animation: "spin 1s linear infinite", marginBottom: 8 }} /><p style={{ fontSize: 14, color: "#B45309", margin: 0 }}>Processing...</p></>
                        : <><Camera size={28} color="#B45309" strokeWidth={1.5} style={{ marginBottom: 8 }} /><p style={{ fontSize: 14, fontWeight: 600, color: TX, margin: "0 0 4px" }}>Take a selfie for liveness check</p><p style={{ fontSize: 12, color: MU, margin: 0 }}>Make sure your face is clearly visible</p></>}
                    </motion.div>
                  )}

                  {kycDone && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "14px 16px", background: GL, border: `1px solid ${G}20`, borderRadius: 12, marginBottom: 16 }}>
                        <Sparkles size={18} color={G} strokeWidth={2.5} />
                        <div>
                          <p style={{ fontSize: 13, fontWeight: 700, color: TX, margin: 0 }}>Identity Verified</p>
                          <p style={{ fontSize: 12, color: MU, margin: "2px 0 0" }}>AI liveness check passed. Your ID is confirmed.</p>
                        </div>
                      </div>
                      <button onClick={next} style={{ width: "100%", padding: "13px", background: G, color: "#fff", border: "none", borderRadius: 11, fontSize: 14, fontWeight: 600, fontFamily: SANS, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, boxShadow: `0 4px 16px ${G}40` }}>
                        Continue <ArrowRight size={15} />
                      </button>
                    </motion.div>
                  )}

                  <button onClick={back} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: MU, background: "none", border: "none", cursor: "pointer", fontFamily: SANS, marginTop: 12 }}>
                    <ArrowLeft size={14} /> Back
                  </button>
                </>
              )}

              {/* ── STEP 4: Password ── */}
              {step === 4 && (
                <>
                  <div style={{ width: 52, height: 52, borderRadius: 14, background: "#F5F3FF", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20 }}>
                    <Lock size={24} color="#7C3AED" strokeWidth={2.5} />
                  </div>
                  <p style={{ fontSize: 11, fontWeight: 700, color: MU, textTransform: "uppercase", letterSpacing: "0.7px", marginBottom: 6 }}>Step 5 of 5</p>
                  <h1 style={{ fontFamily: SERIF, fontSize: 28, fontWeight: 400, color: TX, marginBottom: 8 }}>Secure your account</h1>
                  <p style={{ fontSize: 14, color: MU, marginBottom: 28 }}>Create a strong password to protect your tenant account.</p>

                  <InputField label="Password" icon={Lock} type="password" value={password} onChange={setPassword} placeholder="Min. 8 characters" hint="Use a mix of letters, numbers, and symbols" />
                  <InputField label="Confirm Password" icon={Lock} type="password" value={confirmPassword} onChange={setConfirmPassword} placeholder="Re-enter your password" error={passError} />

                  {/* Password strength */}
                  {password && (
                    <div style={{ marginBottom: 20 }}>
                      <div style={{ display: "flex", gap: 4, marginBottom: 6 }}>
                        {[8, 12, 16].map((threshold, i) => (
                          <div key={i} style={{ flex: 1, height: 4, borderRadius: 2, background: password.length >= threshold ? [G, "#1D4ED8", "#B45309"][i] : "rgba(0,0,0,0.08)", transition: "all 0.3s" }} />
                        ))}
                      </div>
                      <p style={{ fontSize: 11, color: MU }}>{password.length < 8 ? "Weak" : password.length < 12 ? "Fair" : password.length < 16 ? "Strong" : "Very strong"}</p>
                    </div>
                  )}

                  {/* Passkey option */}
                  <div style={{ display: "flex", alignItems: "flex-start", gap: 12, padding: "14px 16px", background: "#F0EFEC", borderRadius: 12, marginBottom: 24 }}>
                    <Shield size={18} color={MU} strokeWidth={2} style={{ flexShrink: 0, marginTop: 1 }} />
                    <div>
                      <p style={{ fontSize: 13, fontWeight: 600, color: TX, margin: "0 0 2px" }}>Or use a passkey instead</p>
                      <p style={{ fontSize: 12, color: MU, margin: 0 }}>Sign in with Face ID, Touch ID, or Windows Hello — no password needed.</p>
                    </div>
                  </div>

                  <button onClick={handleFinish} disabled={!password || !confirmPassword || loading} style={{ width: "100%", padding: "13px", background: password && confirmPassword ? G : MU, color: "#fff", border: "none", borderRadius: 11, fontSize: 14, fontWeight: 600, fontFamily: SANS, cursor: password && confirmPassword ? "pointer" : "not-allowed", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, boxShadow: password && confirmPassword ? `0 4px 16px ${G}40` : "none" }}>
                    {loading ? <><Loader2 size={16} style={{ animation: "spin 1s linear infinite" }} /> Creating account...</> : <>Complete Setup <ArrowRight size={15} /></>}
                  </button>

                  <p style={{ textAlign: "center", fontSize: 11, color: MU, marginTop: 16, lineHeight: 1.6 }}>
                    By creating an account, you agree to Kaya's Terms of Service and Privacy Policy. Your data is protected under PIPEDA and stored in Canadian servers.
                  </p>

                  <button onClick={back} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: MU, background: "none", border: "none", cursor: "pointer", fontFamily: SANS, margin: "12px auto 0" }}>
                    <ArrowLeft size={14} /> Back
                  </button>
                </>
              )}

            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

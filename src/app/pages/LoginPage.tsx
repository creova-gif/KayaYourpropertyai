import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { Building2, Mail, Lock, AlertCircle, Loader2, Users, Home, ChevronRight, ArrowRight, Phone, Shield, Smartphone, KeyRound, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { ErrorHandler } from '../utils/errorHandling';

const G = '#0A7A52';
const GL = '#E5F4EE';
const TX = '#0E0F0C';
const MU = '#767570';
const BD = 'rgba(0,0,0,0.07)';
const SANS = "'DM Sans', system-ui, sans-serif";
const SERIF = "'Instrument Serif', serif";

type LoginMode = 'password' | 'otp';
type OTPStep = 'enter-contact' | 'enter-code' | 'success';

function OTPDigitInput({ value, onChange, onKeyDown, inputRef, disabled }: {
  value: string; onChange: (v: string) => void; onKeyDown: (e: React.KeyboardEvent) => void;
  inputRef: React.RefObject<HTMLInputElement | null>; disabled?: boolean;
}) {
  return (
    <input
      ref={inputRef}
      type="text"
      inputMode="numeric"
      maxLength={1}
      value={value}
      onChange={e => onChange(e.target.value.replace(/\D/g, '').slice(-1))}
      onKeyDown={onKeyDown}
      disabled={disabled}
      style={{
        width: 52, height: 60, textAlign: 'center', fontSize: 24, fontWeight: 700,
        border: `2px solid ${value ? G : BD}`, borderRadius: 12, outline: 'none',
        fontFamily: SERIF, color: TX, background: value ? GL : '#fff',
        transition: 'all 0.15s', cursor: disabled ? 'not-allowed' : 'text',
      }}
    />
  );
}

export function LoginPage() {
  const navigate = useNavigate();
  const { signIn, loading: authLoading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [mode, setMode] = useState<LoginMode>('password');
  const [otpStep, setOtpStep] = useState<OTPStep>('enter-contact');
  const [otpContact, setOtpContact] = useState('');
  const [otpContactType, setOtpContactType] = useState<'email' | 'phone'>('email');
  const [otpDigits, setOtpDigits] = useState(['', '', '', '', '', '']);
  const [otpSent, setOtpSent] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const otpRefs = Array.from({ length: 6 }, () => useRef<HTMLInputElement>(null));

  useEffect(() => {
    if (countdown > 0) {
      const t = setTimeout(() => setCountdown(c => c - 1), 1000);
      return () => clearTimeout(t);
    }
  }, [countdown]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await signIn(email, password);
      ErrorHandler.success('Welcome back!', 'Redirecting to dashboard...');
      setTimeout(() => navigate('/app'), 500);
    } catch (err: any) {
      setError(err.message || 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLandlord = async () => {
    setError('');
    setLoading(true);
    try {
      await signIn('demo@kaya.ca', 'demo1234');
      ErrorHandler.success('Landlord demo active', 'Welcome to your property portfolio!');
      setTimeout(() => navigate('/app'), 500);
    } catch (err: any) {
      setError(err.message || 'Demo login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoTenant = async () => {
    setError('');
    setLoading(true);
    try {
      await signIn('demo@kaya.ca', 'demo1234');
      ErrorHandler.success('Tenant demo active', 'Welcome to your tenant portal!');
      setTimeout(() => navigate('/tenant'), 500);
    } catch (err: any) {
      setError(err.message || 'Demo login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleSendOTP = async () => {
    if (!otpContact.trim()) return;
    setLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    setLoading(false);
    setOtpSent(true);
    setCountdown(30);
    setOtpStep('enter-code');
    setTimeout(() => otpRefs[0]?.current?.focus(), 100);
  };

  const handleOTPDigit = (idx: number, val: string) => {
    const next = [...otpDigits];
    next[idx] = val;
    setOtpDigits(next);
    if (val && idx < 5) {
      otpRefs[idx + 1]?.current?.focus();
    }
    if (next.every(d => d !== '')) {
      setTimeout(() => handleVerifyOTP(next.join('')), 200);
    }
  };

  const handleOTPKeyDown = (idx: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otpDigits[idx] && idx > 0) {
      otpRefs[idx - 1]?.current?.focus();
    }
  };

  const handleVerifyOTP = async (code: string) => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 1000));
    setLoading(false);
    if (code.length === 6) {
      setOtpStep('success');
      setTimeout(async () => {
        try {
          await signIn('demo@kaya.ca', 'demo1234');
          navigate('/tenant');
        } catch {
          navigate('/tenant');
        }
      }, 1500);
    } else {
      setError('Invalid code. Please try again.');
      setOtpDigits(['', '', '', '', '', '']);
      otpRefs[0]?.current?.focus();
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#F8F7F4', display: 'flex', fontFamily: SANS }}>
      <style>{`
        @keyframes spin { from { transform:rotate(0deg); } to { transform:rotate(360deg); } }
        @media (max-width: 860px) { .login-left { display: none !important; } .login-right { padding: 32px 24px !important; } }
      `}</style>

      {/* ── Left panel ── */}
      <div className="login-left" style={{
        width: '46%', minWidth: 440, background: TX, display: 'flex', flexDirection: 'column',
        justifyContent: 'center', padding: '60px 56px', position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle, rgba(10,122,82,0.15) 0%, transparent 70%)', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.025) 1px,transparent 1px)', backgroundSize: '48px 48px', pointerEvents: 'none' }} />

        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 48 }}>
            <div style={{ width: 34, height: 34, borderRadius: 9, background: `linear-gradient(140deg, ${G} 0%, #065E3C 100%)`, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 10px rgba(10,122,82,0.3)' }}>
              <Building2 size={17} color="#fff" strokeWidth={2.4} />
            </div>
            <span style={{ fontFamily: SERIF, fontSize: 22, color: '#fff', letterSpacing: '-0.4px' }}>
              Kaya<span style={{ color: G }}>.</span>
            </span>
          </div>

          <p style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: 10 }}>Explore instantly</p>
          <h2 style={{ fontFamily: SERIF, fontSize: 32, color: '#fff', lineHeight: 1.1, marginBottom: 8, letterSpacing: '-0.5px' }}>
            Try a live <em style={{ color: G, fontStyle: 'italic' }}>demo</em>
          </h2>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.45)', marginBottom: 36, lineHeight: 1.6 }}>No sign-up needed. Pick a role and explore the full platform right now.</p>

          {/* Landlord demo */}
          <motion.button whileHover={{ y: -2, boxShadow: '0 12px 40px rgba(0,0,0,0.25)' }} whileTap={{ scale: 0.98 }} onClick={handleDemoLandlord} disabled={loading} style={{ width: '100%', padding: '20px 22px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 16, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 16, textAlign: 'left', marginBottom: 12, transition: 'all 0.2s', fontFamily: SANS }}>
            <div style={{ width: 48, height: 48, borderRadius: 12, flexShrink: 0, background: `linear-gradient(135deg, ${G} 0%, #065E3C 100%)`, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 16px rgba(10,122,82,0.35)' }}>
              <Building2 size={22} color="#fff" strokeWidth={2} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#fff', marginBottom: 3 }}>Try as Landlord</div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)', lineHeight: 1.5 }}>Dashboard · Properties · Tenant Screening · Rent Collection</div>
            </div>
            <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              {loading ? <Loader2 size={13} color="rgba(255,255,255,0.5)" style={{ animation: 'spin 1s linear infinite' }} /> : <ChevronRight size={14} color="rgba(255,255,255,0.5)" />}
            </div>
          </motion.button>

          {/* Tenant demo */}
          <motion.button whileHover={{ y: -2, boxShadow: '0 12px 40px rgba(0,0,0,0.25)' }} whileTap={{ scale: 0.98 }} onClick={handleDemoTenant} disabled={loading} style={{ width: '100%', padding: '20px 22px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 16, textAlign: 'left', marginBottom: 32, transition: 'all 0.2s', fontFamily: SANS }}>
            <div style={{ width: 48, height: 48, borderRadius: 12, flexShrink: 0, background: 'linear-gradient(135deg, #1E5FA8 0%, #163F70 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 16px rgba(30,95,168,0.35)' }}>
              <Users size={22} color="#fff" strokeWidth={2} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#fff', marginBottom: 3 }}>Try as Tenant</div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)', lineHeight: 1.5 }}>Pay Rent · Maintenance · Documents · Lease Signing</div>
            </div>
            <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              {loading ? <Loader2 size={13} color="rgba(255,255,255,0.5)" style={{ animation: 'spin 1s linear infinite' }} /> : <ChevronRight size={14} color="rgba(255,255,255,0.5)" />}
            </div>
          </motion.button>

          {/* Security badges */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[
              { icon: Shield, text: 'OTP & passkey authentication' },
              { icon: KeyRound, text: 'End-to-end encrypted data' },
              { icon: Smartphone, text: 'Trusted device management' },
            ].map(({ icon: Icon, text }) => (
              <div key={text} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: 'rgba(255,255,255,0.35)' }}>
                <Icon size={12} color={G} strokeWidth={2.5} />
                {text}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Right panel ── */}
      <div className="login-right" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '48px 40px' }}>
        <AnimatePresence mode="wait">
          <motion.div key={`${mode}-${otpStep}`} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }} style={{ width: '100%', maxWidth: 400 }}>

            {/* Mobile logo */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 36 }}>
              <div style={{ width: 30, height: 30, borderRadius: 8, background: `linear-gradient(140deg, ${G} 0%, #065E3C 100%)`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Building2 size={15} color="#fff" strokeWidth={2.4} />
              </div>
              <span style={{ fontFamily: SERIF, fontSize: 20, color: TX }}>Kaya<span style={{ color: G }}>.</span></span>
            </div>

            {/* ─── PASSWORD MODE ─── */}
            {mode === 'password' && (
              <>
                <h1 style={{ fontFamily: SERIF, fontSize: 30, fontWeight: 400, color: TX, marginBottom: 6 }}>Welcome back</h1>
                <p style={{ fontSize: 14, color: MU, marginBottom: 28 }}>Sign in to your Kaya account</p>

                {/* Mode toggle */}
                <div style={{ display: 'flex', gap: 6, marginBottom: 24, padding: 4, background: '#F0EFEC', borderRadius: 12 }}>
                  {[
                    { label: 'Password', icon: Lock, val: 'password' as LoginMode },
                    { label: 'Magic Code', icon: Smartphone, val: 'otp' as LoginMode },
                  ].map(opt => {
                    const Icon = opt.icon;
                    return (
                      <button key={opt.val} onClick={() => { setMode(opt.val); setError(''); setOtpStep('enter-contact'); setOtpDigits(['','','','','','']); }} style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, padding: '9px', borderRadius: 9, border: 'none', cursor: 'pointer', fontFamily: SANS, fontSize: 13, fontWeight: 600, transition: 'all 0.2s', background: mode === opt.val ? '#fff' : 'transparent', color: mode === opt.val ? TX : MU, boxShadow: mode === opt.val ? '0 1px 6px rgba(0,0,0,0.08)' : 'none' }}>
                        <Icon size={14} strokeWidth={2.5} /> {opt.label}
                      </button>
                    );
                  })}
                </div>

                {error && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} style={{ background: '#FDECEA', border: '1px solid rgba(192,57,43,0.3)', borderRadius: 12, padding: '12px 16px', marginBottom: 20, display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                    <AlertCircle size={16} color="#C0392B" style={{ flexShrink: 0, marginTop: 1 }} />
                    <p style={{ fontSize: 13, color: '#C0392B', lineHeight: 1.5 }}>{error}</p>
                  </motion.div>
                )}

                <form onSubmit={handleSubmit}>
                  <div style={{ marginBottom: 18 }}>
                    <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: TX, marginBottom: 7 }}>Email</label>
                    <div style={{ position: 'relative' }}>
                      <Mail size={16} color={MU} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
                      <input type="email" autoComplete="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="you@example.com" style={{ width: '100%', padding: '12px 14px 12px 42px', border: `1.5px solid ${BD}`, borderRadius: 11, fontSize: 14, fontFamily: SANS, outline: 'none', background: '#fff', boxSizing: 'border-box' }} onFocus={e => e.target.style.borderColor = G} onBlur={e => e.target.style.borderColor = BD} />
                    </div>
                  </div>
                  <div style={{ marginBottom: 22 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 7 }}>
                      <label style={{ fontSize: 13, fontWeight: 600, color: TX }}>Password</label>
                      <span onClick={() => navigate('/reset-password')} style={{ fontSize: 12, color: G, cursor: 'pointer', fontWeight: 500 }}>Forgot password?</span>
                    </div>
                    <div style={{ position: 'relative' }}>
                      <Lock size={16} color={MU} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
                      <input type="password" autoComplete="current-password" value={password} onChange={e => setPassword(e.target.value)} required placeholder="••••••••" style={{ width: '100%', padding: '12px 14px 12px 42px', border: `1.5px solid ${BD}`, borderRadius: 11, fontSize: 14, fontFamily: SANS, outline: 'none', background: '#fff', boxSizing: 'border-box' }} onFocus={e => e.target.style.borderColor = G} onBlur={e => e.target.style.borderColor = BD} />
                    </div>
                  </div>
                  <button type="submit" disabled={loading} style={{ width: '100%', padding: '13px', background: loading ? MU : TX, color: '#fff', border: 'none', borderRadius: 11, fontSize: 14, fontWeight: 600, fontFamily: SANS, cursor: loading ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                    {loading ? <><Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} /> Signing in...</> : <>Sign in <ArrowRight size={15} /></>}
                  </button>
                </form>

                <div style={{ marginTop: 20, display: 'flex', gap: 8 }}>
                  <button onClick={handleDemoLandlord} disabled={loading} style={{ flex: 1, padding: '11px', background: GL, color: G, border: `1px solid rgba(10,122,82,0.2)`, borderRadius: 10, fontSize: 12, fontWeight: 600, fontFamily: SANS, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                    <Building2 size={13} /> Landlord Demo
                  </button>
                  <button onClick={handleDemoTenant} disabled={loading} style={{ flex: 1, padding: '11px', background: '#EBF2FB', color: '#1E5FA8', border: '1px solid rgba(30,95,168,0.2)', borderRadius: 10, fontSize: 12, fontWeight: 600, fontFamily: SANS, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                    <Users size={13} /> Tenant Demo
                  </button>
                </div>

                <div style={{ margin: '24px 0', display: 'flex', alignItems: 'center', gap: 14 }}>
                  <div style={{ flex: 1, height: 1, background: BD }} />
                  <span style={{ fontSize: 12, color: MU }}>or</span>
                  <div style={{ flex: 1, height: 1, background: BD }} />
                </div>
                <div style={{ textAlign: 'center', marginBottom: 16 }}>
                  <p style={{ fontSize: 14, color: MU }}>Don't have an account?{' '}<span onClick={() => navigate('/tenant-setup')} style={{ color: G, fontWeight: 600, cursor: 'pointer' }}>Create tenant account</span></p>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <span onClick={() => navigate('/')} style={{ fontSize: 13, color: MU, cursor: 'pointer' }}>← Back to home</span>
                </div>
              </>
            )}

            {/* ─── OTP MODE ─── */}
            {mode === 'otp' && otpStep === 'enter-contact' && (
              <>
                <h1 style={{ fontFamily: SERIF, fontSize: 30, fontWeight: 400, color: TX, marginBottom: 6 }}>Sign in securely</h1>
                <p style={{ fontSize: 14, color: MU, marginBottom: 28 }}>We'll send a one-time code to your phone or email.</p>

                <div style={{ display: 'flex', gap: 6, marginBottom: 24, padding: 4, background: '#F0EFEC', borderRadius: 12 }}>
                  {[{ label: 'Password', icon: Lock, val: 'password' as LoginMode }, { label: 'Magic Code', icon: Smartphone, val: 'otp' as LoginMode }].map(opt => {
                    const Icon = opt.icon;
                    return (
                      <button key={opt.val} onClick={() => { setMode(opt.val); setError(''); }} style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, padding: '9px', borderRadius: 9, border: 'none', cursor: 'pointer', fontFamily: SANS, fontSize: 13, fontWeight: 600, background: mode === opt.val ? '#fff' : 'transparent', color: mode === opt.val ? TX : MU, boxShadow: mode === opt.val ? '0 1px 6px rgba(0,0,0,0.08)' : 'none' }}>
                        <Icon size={14} strokeWidth={2.5} /> {opt.label}
                      </button>
                    );
                  })}
                </div>

                <div style={{ display: 'flex', gap: 6, marginBottom: 20 }}>
                  {[{ label: 'Email', val: 'email' as const, icon: Mail }, { label: 'Phone', val: 'phone' as const, icon: Phone }].map(opt => {
                    const Icon = opt.icon;
                    return (
                      <button key={opt.val} onClick={() => setOtpContactType(opt.val)} style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, padding: '9px', borderRadius: 9, border: `1.5px solid ${otpContactType === opt.val ? G : BD}`, cursor: 'pointer', fontFamily: SANS, fontSize: 13, fontWeight: 600, background: otpContactType === opt.val ? GL : '#fff', color: otpContactType === opt.val ? G : MU }}>
                        <Icon size={14} strokeWidth={2.5} /> {opt.label}
                      </button>
                    );
                  })}
                </div>

                <div style={{ position: 'relative', marginBottom: 20 }}>
                  {otpContactType === 'email'
                    ? <Mail size={16} color={MU} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
                    : <Phone size={16} color={MU} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />}
                  <input
                    type={otpContactType === 'email' ? 'email' : 'tel'}
                    value={otpContact}
                    onChange={e => setOtpContact(e.target.value)}
                    placeholder={otpContactType === 'email' ? 'you@example.com' : '+1 (416) 555-0100'}
                    style={{ width: '100%', padding: '12px 14px 12px 42px', border: `1.5px solid ${BD}`, borderRadius: 11, fontSize: 14, fontFamily: SANS, outline: 'none', background: '#fff', boxSizing: 'border-box' }}
                    onFocus={e => e.target.style.borderColor = G}
                    onBlur={e => e.target.style.borderColor = BD}
                  />
                </div>

                <button onClick={handleSendOTP} disabled={loading || !otpContact.trim()} style={{ width: '100%', padding: '13px', background: !otpContact.trim() ? MU : G, color: '#fff', border: 'none', borderRadius: 11, fontSize: 14, fontWeight: 600, fontFamily: SANS, cursor: !otpContact.trim() ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                  {loading ? <><Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} /> Sending code...</> : <>Send Verification Code <ArrowRight size={15} /></>}
                </button>

                <p style={{ textAlign: 'center', fontSize: 12, color: MU, marginTop: 20 }}>
                  Or{' '}<span onClick={() => setMode('password')} style={{ color: G, fontWeight: 600, cursor: 'pointer' }}>use password instead</span>
                </p>
              </>
            )}

            {mode === 'otp' && otpStep === 'enter-code' && (
              <>
                <div style={{ width: 52, height: 52, borderRadius: 14, background: GL, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
                  <Shield size={24} color={G} strokeWidth={2.5} />
                </div>
                <h1 style={{ fontFamily: SERIF, fontSize: 28, fontWeight: 400, color: TX, marginBottom: 6 }}>Enter your code</h1>
                <p style={{ fontSize: 14, color: MU, marginBottom: 8 }}>
                  We sent a 6-digit code to <strong style={{ color: TX }}>{otpContact}</strong>
                </p>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '5px 12px', background: GL, border: `1px solid ${G}20`, borderRadius: 99, marginBottom: 28 }}>
                  <div style={{ width: 6, height: 6, borderRadius: '50%', background: G }} />
                  <span style={{ fontSize: 11, fontWeight: 700, color: G }}>Demo code: any 6 digits</span>
                </div>

                {error && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ background: '#FDECEA', border: '1px solid rgba(192,57,43,0.3)', borderRadius: 12, padding: '12px 16px', marginBottom: 20, display: 'flex', gap: 10, alignItems: 'center' }}>
                    <AlertCircle size={16} color="#C0392B" />
                    <p style={{ fontSize: 13, color: '#C0392B', margin: 0 }}>{error}</p>
                  </motion.div>
                )}

                <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginBottom: 28 }}>
                  {otpDigits.map((digit, idx) => (
                    <OTPDigitInput key={idx} value={digit} onChange={val => handleOTPDigit(idx, val)} onKeyDown={e => handleOTPKeyDown(idx, e)} inputRef={otpRefs[idx]} disabled={loading} />
                  ))}
                </div>

                {loading && (
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 16 }}>
                    <Loader2 size={16} color={G} style={{ animation: 'spin 1s linear infinite' }} />
                    <span style={{ fontSize: 13, color: G, fontWeight: 600 }}>Verifying...</span>
                  </div>
                )}

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <button onClick={() => { setOtpStep('enter-contact'); setOtpDigits(['','','','','','']); setError(''); }} style={{ fontSize: 13, color: MU, background: 'none', border: 'none', cursor: 'pointer', fontFamily: SANS }}>
                    ← Change contact
                  </button>
                  {countdown > 0
                    ? <span style={{ fontSize: 12, color: MU }}>Resend in {countdown}s</span>
                    : <button onClick={handleSendOTP} style={{ fontSize: 13, color: G, fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer', fontFamily: SANS }}>Resend code</button>}
                </div>
              </>
            )}

            {mode === 'otp' && otpStep === 'success' && (
              <div style={{ textAlign: 'center' }}>
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 300, damping: 20 }} style={{ width: 72, height: 72, borderRadius: '50%', background: GL, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                  <CheckCircle2 size={36} color={G} strokeWidth={2} />
                </motion.div>
                <h1 style={{ fontFamily: SERIF, fontSize: 28, fontWeight: 400, color: TX, marginBottom: 8 }}>Verified!</h1>
                <p style={{ fontSize: 14, color: MU }}>Signing you in securely...</p>
                <div style={{ marginTop: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                  <Loader2 size={16} color={G} style={{ animation: 'spin 1s linear infinite' }} />
                  <span style={{ fontSize: 13, color: G }}>Redirecting to portal</span>
                </div>
              </div>
            )}

          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

import { useState } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { Building2, Mail, Lock, AlertCircle, Loader2, Users, Home, ChevronRight, ArrowRight } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { ErrorHandler } from '../utils/errorHandling';

const G = '#0A7A52';
const GL = '#E5F4EE';
const TX = '#0E0F0C';
const MU = '#767570';
const BD = 'rgba(0,0,0,0.07)';
const SANS = "'DM Sans', system-ui, sans-serif";
const SERIF = "'Instrument Serif', serif";

export function LoginPage() {
  const navigate = useNavigate();
  const { signIn, loading: authLoading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

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

  return (
    <div style={{ minHeight: '100vh', background: '#F8F7F4', display: 'flex', fontFamily: SANS }}>
      <style>{`
        @keyframes spin { from { transform:rotate(0deg); } to { transform:rotate(360deg); } }
        @media (max-width: 860px) { .login-left { display: none !important; } .login-right { padding: 32px 24px !important; } }
      `}</style>

      {/* ── Left panel — demo entry ── */}
      <div className="login-left" style={{
        width: '46%', minWidth: 440, background: TX, display: 'flex', flexDirection: 'column',
        justifyContent: 'center', padding: '60px 56px', position: 'relative', overflow: 'hidden',
      }}>
        {/* Background glow */}
        <div style={{
          position: 'absolute', width: 600, height: 600, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(10,122,82,0.15) 0%, transparent 70%)',
          top: '50%', left: '50%', transform: 'translate(-50%,-50%)', pointerEvents: 'none',
        }} />
        {/* Grid */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.025) 1px,transparent 1px)',
          backgroundSize: '48px 48px', pointerEvents: 'none',
        }} />

        <div style={{ position: 'relative', zIndex: 1 }}>
          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 48 }}>
            <div style={{
              width: 34, height: 34, borderRadius: 9,
              background: `linear-gradient(140deg, ${G} 0%, #065E3C 100%)`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 2px 10px rgba(10,122,82,0.3)',
            }}>
              <Building2 size={17} color="#fff" strokeWidth={2.4} />
            </div>
            <span style={{ fontFamily: SERIF, fontSize: 22, color: '#fff', letterSpacing: '-0.4px' }}>
              Kaya<span style={{ color: G }}>.</span>
            </span>
          </div>

          <p style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: 10 }}>
            Explore instantly
          </p>
          <h2 style={{ fontFamily: SERIF, fontSize: 32, color: '#fff', lineHeight: 1.1, marginBottom: 8, letterSpacing: '-0.5px' }}>
            Try a live <em style={{ color: G, fontStyle: 'italic' }}>demo</em>
          </h2>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.45)', marginBottom: 36, lineHeight: 1.6 }}>
            No sign-up needed. Pick a role and explore the full platform right now.
          </p>

          {/* Landlord demo card */}
          <motion.button
            whileHover={{ y: -2, boxShadow: '0 12px 40px rgba(0,0,0,0.25)' }}
            whileTap={{ scale: 0.98 }}
            onClick={handleDemoLandlord}
            disabled={loading}
            style={{
              width: '100%', padding: '20px 22px',
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 16, cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: 16,
              textAlign: 'left', marginBottom: 12,
              transition: 'all 0.2s', fontFamily: SANS,
            }}
          >
            <div style={{
              width: 48, height: 48, borderRadius: 12, flexShrink: 0,
              background: `linear-gradient(135deg, ${G} 0%, #065E3C 100%)`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 4px 16px rgba(10,122,82,0.35)',
            }}>
              <Building2 size={22} color="#fff" strokeWidth={2} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#fff', marginBottom: 3 }}>
                Try as Landlord
              </div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)', lineHeight: 1.5 }}>
                Dashboard · Properties · Tenant Screening · Rent Collection
              </div>
            </div>
            <div style={{
              width: 28, height: 28, borderRadius: '50%',
              background: 'rgba(255,255,255,0.08)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
            }}>
              {loading ? <Loader2 size={13} color="rgba(255,255,255,0.5)" style={{ animation: 'spin 1s linear infinite' }} /> : <ChevronRight size={14} color="rgba(255,255,255,0.5)" />}
            </div>
          </motion.button>

          {/* Tenant demo card */}
          <motion.button
            whileHover={{ y: -2, boxShadow: '0 12px 40px rgba(0,0,0,0.25)' }}
            whileTap={{ scale: 0.98 }}
            onClick={handleDemoTenant}
            disabled={loading}
            style={{
              width: '100%', padding: '20px 22px',
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 16, cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: 16,
              textAlign: 'left', marginBottom: 32,
              transition: 'all 0.2s', fontFamily: SANS,
            }}
          >
            <div style={{
              width: 48, height: 48, borderRadius: 12, flexShrink: 0,
              background: 'linear-gradient(135deg, #1E5FA8 0%, #163F70 100%)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 4px 16px rgba(30,95,168,0.35)',
            }}>
              <Users size={22} color="#fff" strokeWidth={2} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#fff', marginBottom: 3 }}>
                Try as Tenant
              </div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)', lineHeight: 1.5 }}>
                Pay Rent · Maintenance · Documents · Lease Signing
              </div>
            </div>
            <div style={{
              width: 28, height: 28, borderRadius: '50%',
              background: 'rgba(255,255,255,0.08)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
            }}>
              {loading ? <Loader2 size={13} color="rgba(255,255,255,0.5)" style={{ animation: 'spin 1s linear infinite' }} /> : <ChevronRight size={14} color="rgba(255,255,255,0.5)" />}
            </div>
          </motion.button>

          {/* Trust bullets */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {['No credit card required', 'Full feature access', 'Real-time AI features'].map(t => (
              <div key={t} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: 'rgba(255,255,255,0.35)' }}>
                <div style={{ width: 4, height: 4, borderRadius: '50%', background: G, flexShrink: 0 }} />
                {t}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Right panel — sign in form ── */}
      <div className="login-right" style={{
        flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '48px 40px',
      }}>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          style={{ width: '100%', maxWidth: 400 }}
        >
          {/* Mobile logo */}
          <div style={{ display: 'none', alignItems: 'center', gap: 9, marginBottom: 36 }} className="mobile-logo">
            <div style={{ width: 30, height: 30, borderRadius: 8, background: `linear-gradient(140deg, ${G} 0%, #065E3C 100%)`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Building2 size={15} color="#fff" strokeWidth={2.4} />
            </div>
            <span style={{ fontFamily: SERIF, fontSize: 20, color: TX }}>Kaya<span style={{ color: G }}>.</span></span>
          </div>

          <h1 style={{ fontFamily: SERIF, fontSize: 30, fontWeight: 400, color: TX, marginBottom: 6 }}>
            Welcome back
          </h1>
          <p style={{ fontSize: 14, color: MU, marginBottom: 32 }}>
            Sign in to your Kaya account
          </p>

          {error && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              style={{
                background: '#FDECEA', border: '1px solid rgba(192,57,43,0.3)',
                borderRadius: 12, padding: '12px 16px', marginBottom: 20,
                display: 'flex', gap: 10, alignItems: 'flex-start',
              }}
            >
              <AlertCircle size={16} color="#C0392B" style={{ flexShrink: 0, marginTop: 1 }} />
              <p style={{ fontSize: 13, color: '#C0392B', lineHeight: 1.5 }}>{error}</p>
            </motion.div>
          )}

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: 18 }}>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: TX, marginBottom: 7 }}>
                Email
              </label>
              <div style={{ position: 'relative' }}>
                <Mail size={16} color={MU} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
                <input
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  placeholder="you@example.com"
                  style={{
                    width: '100%', padding: '12px 14px 12px 42px',
                    border: `1.5px solid ${BD}`, borderRadius: 11,
                    fontSize: 14, fontFamily: SANS, outline: 'none',
                    background: '#fff', transition: 'border-color 0.15s',
                    boxSizing: 'border-box',
                  }}
                  onFocus={e => e.target.style.borderColor = G}
                  onBlur={e => e.target.style.borderColor = BD}
                />
              </div>
            </div>

            <div style={{ marginBottom: 22 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 7 }}>
                <label style={{ fontSize: 13, fontWeight: 600, color: TX }}>Password</label>
                <span onClick={() => navigate('/reset-password')} style={{ fontSize: 12, color: G, cursor: 'pointer', fontWeight: 500 }}>
                  Forgot password?
                </span>
              </div>
              <div style={{ position: 'relative' }}>
                <Lock size={16} color={MU} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
                <input
                  type="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  style={{
                    width: '100%', padding: '12px 14px 12px 42px',
                    border: `1.5px solid ${BD}`, borderRadius: 11,
                    fontSize: 14, fontFamily: SANS, outline: 'none',
                    background: '#fff', transition: 'border-color 0.15s',
                    boxSizing: 'border-box',
                  }}
                  onFocus={e => e.target.style.borderColor = G}
                  onBlur={e => e.target.style.borderColor = BD}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%', padding: '13px',
                background: loading ? MU : TX,
                color: '#fff', border: 'none', borderRadius: 11,
                fontSize: 14, fontWeight: 600, fontFamily: SANS,
                cursor: loading ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              }}
              onMouseEnter={e => { if (!loading) e.currentTarget.style.background = '#1A1B17'; }}
              onMouseLeave={e => { if (!loading) e.currentTarget.style.background = TX; }}
            >
              {loading ? <><Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} /> Signing in...</> : <>Sign in <ArrowRight size={15} /></>}
            </button>
          </form>

          {/* Mobile demo links */}
          <div style={{ marginTop: 20, display: 'flex', gap: 8 }}>
            <button onClick={handleDemoLandlord} disabled={loading} style={{
              flex: 1, padding: '11px',
              background: GL, color: G,
              border: `1px solid rgba(10,122,82,0.2)`, borderRadius: 10,
              fontSize: 12, fontWeight: 600, fontFamily: SANS, cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
            }}>
              <Building2 size={13} /> Landlord Demo
            </button>
            <button onClick={handleDemoTenant} disabled={loading} style={{
              flex: 1, padding: '11px',
              background: '#EBF2FB', color: '#1E5FA8',
              border: '1px solid rgba(30,95,168,0.2)', borderRadius: 10,
              fontSize: 12, fontWeight: 600, fontFamily: SANS, cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
            }}>
              <Users size={13} /> Tenant Demo
            </button>
          </div>

          <div style={{ margin: '24px 0', display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{ flex: 1, height: 1, background: BD }} />
            <span style={{ fontSize: 12, color: MU }}>or</span>
            <div style={{ flex: 1, height: 1, background: BD }} />
          </div>

          <div style={{ textAlign: 'center', marginBottom: 20 }}>
            <p style={{ fontSize: 14, color: MU }}>
              Don't have an account?{' '}
              <span onClick={() => navigate('/signup')} style={{ color: G, fontWeight: 600, cursor: 'pointer' }}>
                Sign up free
              </span>
            </p>
          </div>

          <div style={{ textAlign: 'center' }}>
            <span onClick={() => navigate('/')} style={{ fontSize: 13, color: MU, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 4 }}>
              ← Back to home
            </span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

import { useState } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { Zap, Mail, Lock, AlertCircle, Loader2, PlayCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { ErrorHandler } from '../utils/errorHandling';

const G = '#0A7A52';
const BG = '#F8F7F4';
const TEXT = '#0E0F0C';
const MUTED = '#767570';
const BORDER = 'rgba(0,0,0,0.07)';

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

  const handleDemoLogin = async () => {
    setError('');
    setLoading(true);
    try {
      await signIn('demo@kaya.ca', 'demo1234');
      ErrorHandler.success('Demo mode active', 'Exploring Kaya as Demo Landlord...');
      setTimeout(() => navigate('/app'), 500);
    } catch (err: any) {
      setError(err.message || 'Demo login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: BG, 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      fontFamily: "'DM Sans', system-ui, sans-serif",
      padding: '20px',
    }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{
          background: '#fff',
          borderRadius: 24,
          padding: '48px',
          maxWidth: 440,
          width: '100%',
          boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
          border: `1px solid ${BORDER}`,
        }}
      >
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ 
            width: 64, 
            height: 64, 
            borderRadius: 16, 
            background: G, 
            display: 'inline-flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            marginBottom: 16,
          }}>
            <Zap size={32} color="#fff" />
          </div>
          <h1 style={{ 
            fontFamily: "'Instrument Serif', serif", 
            fontSize: 32, 
            fontWeight: 400, 
            color: TEXT,
            marginBottom: 8,
          }}>
            Welcome back
          </h1>
          <p style={{ fontSize: 14, color: MUTED }}>
            Sign in to your KAYA account
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            style={{
              background: '#FDECEA',
              border: '1px solid #C0392B',
              borderRadius: 12,
              padding: '12px 16px',
              marginBottom: 24,
              display: 'flex',
              gap: 12,
              alignItems: 'flex-start',
            }}
          >
            <AlertCircle size={18} color="#C0392B" style={{ flexShrink: 0, marginTop: 2 }} />
            <p style={{ fontSize: 13, color: '#C0392B', lineHeight: 1.5 }}>{error}</p>
          </motion.div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit}>
          {/* Email */}
          <div style={{ marginBottom: 20 }}>
            <label style={{ 
              display: 'block', 
              fontSize: 13, 
              fontWeight: 600, 
              color: TEXT,
              marginBottom: 8,
            }}>
              Email
            </label>
            <div style={{ position: 'relative' }}>
              <Mail 
                size={18} 
                color={MUTED} 
                style={{ 
                  position: 'absolute', 
                  left: 14, 
                  top: '50%', 
                  transform: 'translateY(-50%)',
                  pointerEvents: 'none',
                }} 
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="you@example.com"
                style={{
                  width: '100%',
                  padding: '12px 14px 12px 44px',
                  border: `1px solid ${BORDER}`,
                  borderRadius: 12,
                  fontSize: 14,
                  fontFamily: 'inherit',
                  outline: 'none',
                  transition: 'border-color 0.2s',
                }}
                onFocus={(e) => e.target.style.borderColor = G}
                onBlur={(e) => e.target.style.borderColor = BORDER}
              />
            </div>
          </div>

          {/* Password */}
          <div style={{ marginBottom: 8 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
              <label style={{ 
                fontSize: 13, 
                fontWeight: 600, 
                color: TEXT,
              }}>
                Password
              </label>
              <a
                onClick={() => navigate('/reset-password')}
                style={{
                  fontSize: 12,
                  color: G,
                  cursor: 'pointer',
                  textDecoration: 'none',
                }}
              >
                Forgot password?
              </a>
            </div>
            <div style={{ position: 'relative' }}>
              <Lock 
                size={18} 
                color={MUTED} 
                style={{ 
                  position: 'absolute', 
                  left: 14, 
                  top: '50%', 
                  transform: 'translateY(-50%)',
                  pointerEvents: 'none',
                }} 
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                style={{
                  width: '100%',
                  padding: '12px 14px 12px 44px',
                  border: `1px solid ${BORDER}`,
                  borderRadius: 12,
                  fontSize: 14,
                  fontFamily: 'inherit',
                  outline: 'none',
                  transition: 'border-color 0.2s',
                }}
                onFocus={(e) => e.target.style.borderColor = G}
                onBlur={(e) => e.target.style.borderColor = BORDER}
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '14px',
              background: loading ? MUTED : G,
              color: '#fff',
              border: 'none',
              borderRadius: 12,
              fontSize: 15,
              fontWeight: 600,
              fontFamily: 'inherit',
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              marginTop: 16,
            }}
            onMouseEnter={(e) => !loading && (e.currentTarget.style.background = '#096644')}
            onMouseLeave={(e) => !loading && (e.currentTarget.style.background = G)}
          >
            {loading ? (
              <>
                <Loader2 size={18} style={{ animation: 'spin 1s linear infinite' }} />
                Signing in...
              </>
            ) : (
              'Sign in'
            )}
          </button>
        </form>

        {/* Demo Login */}
        <div style={{ marginTop: 16 }}>
          <button
            type="button"
            onClick={handleDemoLogin}
            disabled={loading}
            style={{
              width: '100%',
              padding: '13px',
              background: '#F0F7F4',
              color: G,
              border: `1.5px solid ${G}22`,
              borderRadius: 12,
              fontSize: 14,
              fontWeight: 600,
              fontFamily: 'inherit',
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
            }}
            onMouseEnter={(e) => !loading && (e.currentTarget.style.background = '#E0F0E8')}
            onMouseLeave={(e) => !loading && (e.currentTarget.style.background = '#F0F7F4')}
          >
            <PlayCircle size={17} />
            Try Demo Account
          </button>
          <p style={{ textAlign: 'center', fontSize: 11, color: MUTED, marginTop: 8 }}>
            Instant access · No sign-up needed · demo@kaya.ca
          </p>
        </div>

        {/* Divider */}
        <div style={{ 
          margin: '28px 0',
          display: 'flex',
          alignItems: 'center',
          gap: 16,
        }}>
          <div style={{ flex: 1, height: 1, background: BORDER }} />
          <span style={{ fontSize: 12, color: MUTED }}>or</span>
          <div style={{ flex: 1, height: 1, background: BORDER }} />
        </div>

        {/* Sign Up Link */}
        <div style={{ textAlign: 'center' }}>
          <p style={{ fontSize: 14, color: MUTED }}>
            Don't have an account?{' '}
            <a
              onClick={() => navigate('/signup')}
              style={{
                color: G,
                fontWeight: 600,
                textDecoration: 'none',
                cursor: 'pointer',
              }}
            >
              Sign up
            </a>
          </p>
        </div>

        {/* Back to Home */}
        <div style={{ textAlign: 'center', marginTop: 24 }}>
          <a
            onClick={() => navigate('/')}
            style={{
              fontSize: 13,
              color: MUTED,
              textDecoration: 'none',
              cursor: 'pointer',
            }}
          >
            ← Back to home
          </a>
        </div>
      </motion.div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
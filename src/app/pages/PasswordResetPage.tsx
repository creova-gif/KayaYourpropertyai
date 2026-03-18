import { useState } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { Zap, Mail, ArrowLeft, CheckCircle, Loader2 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const G = '#0A7A52';
const BG = '#F8F7F4';
const TEXT = '#0E0F0C';
const MUTED = '#767570';
const BORDER = 'rgba(0,0,0,0.07)';

export function PasswordResetPage() {
  const navigate = useNavigate();
  const { resetPassword } = useAuth();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = await resetPassword(email);

      if (result.success) {
        setSuccess(true);
      } else {
        setError(result.error || 'Failed to send reset email');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
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
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          style={{
            background: '#fff',
            borderRadius: 24,
            padding: '48px',
            maxWidth: 440,
            width: '100%',
            boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
            border: `1px solid ${BORDER}`,
            textAlign: 'center',
          }}
        >
          <div style={{ 
            width: 64, 
            height: 64, 
            borderRadius: '50%', 
            background: '#E5F4EE', 
            display: 'inline-flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            marginBottom: 24,
          }}>
            <CheckCircle size={32} color={G} />
          </div>
          <h2 style={{ 
            fontFamily: "'Instrument Serif', serif", 
            fontSize: 28, 
            fontWeight: 400, 
            color: TEXT,
            marginBottom: 12,
          }}>
            Check your email!
          </h2>
          <p style={{ fontSize: 14, color: MUTED, marginBottom: 24 }}>
            We've sent a password reset link to <strong>{email}</strong>. 
            Click the link in the email to reset your password.
          </p>
          <button
            onClick={() => navigate('/login')}
            style={{
              width: '100%',
              padding: '14px',
              background: G,
              color: '#fff',
              border: 'none',
              borderRadius: 12,
              fontSize: 15,
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = '#096644')}
            onMouseLeave={(e) => (e.currentTarget.style.background = G)}
          >
            Back to Login
          </button>
        </motion.div>
      </div>
    );
  }

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
            Reset Password
          </h1>
          <p style={{ fontSize: 14, color: MUTED }}>
            Enter your email to receive a reset link
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div style={{
            background: '#FDECEA',
            border: '1px solid #C0392B',
            borderRadius: 12,
            padding: '12px 16px',
            marginBottom: 24,
            fontSize: 13,
            color: '#C0392B',
          }}>
            {error}
          </div>
        )}

        {/* Reset Form */}
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 24 }}>
            <label style={{ 
              display: 'block', 
              fontSize: 13, 
              fontWeight: 600, 
              color: TEXT,
              marginBottom: 8,
            }}>
              Email Address
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
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
            }}
            onMouseEnter={(e) => !loading && (e.currentTarget.style.background = '#096644')}
            onMouseLeave={(e) => !loading && (e.currentTarget.style.background = G)}
          >
            {loading ? (
              <>
                <Loader2 size={18} style={{ animation: 'spin 1s linear infinite' }} />
                Sending...
              </>
            ) : (
              'Send Reset Link'
            )}
          </button>
        </form>

        {/* Back to Login */}
        <div style={{ marginTop: 24 }}>
          <button
            onClick={() => navigate('/login')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              fontSize: 13,
              color: MUTED,
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
              margin: '0 auto',
            }}
          >
            <ArrowLeft size={16} />
            Back to login
          </button>
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

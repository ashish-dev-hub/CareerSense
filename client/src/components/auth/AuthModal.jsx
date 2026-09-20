import React, { useState, useRef, useEffect } from 'react';
import { api } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { Mail, X, ArrowRight, Loader2, CheckCircle2 } from 'lucide-react';

export default function AuthModal({ isOpen, onClose }) {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [step, setStep] = useState(1); // 1: Email, 2: OTP
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const inputRefs = useRef([]);
  const emailRef = useRef(null);

  const { login } = useAuth();

  useEffect(() => {
    if (isOpen && step === 1) {
      setTimeout(() => emailRef.current?.focus(), 100);
    }
    if (step === 2) {
      setTimeout(() => inputRefs.current[0]?.focus(), 100);
    }
  }, [isOpen, step]);

  if (!isOpen) return null;

  const handleOtpChange = (index, value) => {
    if (!/^[0-9]*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);
    setError('');
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
    // Auto-submit when all 6 digits filled
    if (index === 5 && value) {
      const fullOtp = [...newOtp.slice(0, 5), value.slice(-1)].join('');
      if (fullOtp.length === 6) {
        handleVerifyOtp(null, fullOtp);
      }
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleOtpPaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    if (pasted.length === 6) {
      setOtp(pasted.split(''));
      handleVerifyOtp(null, pasted);
    }
  };

  const handleSendOtp = async (e) => {
    e?.preventDefault();
    if (!email) { setError('Please enter your email'); return; }
    setError('');
    setLoading(true);
    try {
      await api.sendOtp(email);
      setStep(2);
    } catch (err) {
      setError('Failed to send OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e, otpValue) => {
    e?.preventDefault();
    const finalOtp = otpValue || otp.join('');
    if (finalOtp.length !== 6) { setError('Please enter the complete 6-digit code'); return; }
    setError('');
    setLoading(true);
    try {
      const data = await api.verifyOtp(email, finalOtp);
      setSuccess(true);
      setTimeout(() => {
        login(data.token, data.user);
        onClose();
      }, 1200);
    } catch (err) {
      setError('Invalid or expired code. Please try again.');
      setOtp(['', '', '', '', '', '']);
      inputRefs.current[0]?.focus();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(12px)' }}>
      <div
        style={{
          background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
          boxShadow: '0 25px 60px rgba(0,0,0,0.2), 0 0 0 1px rgba(255,255,255,0.8)',
          animation: 'modalIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)'
        }}
        className="w-full max-w-md rounded-3xl overflow-hidden relative"
      >
        <style>{`
          @keyframes modalIn {
            from { opacity: 0; transform: scale(0.9) translateY(20px); }
            to { opacity: 1; transform: scale(1) translateY(0); }
          }
          @keyframes slideUp {
            from { opacity: 0; transform: translateY(16px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes successPop {
            0% { transform: scale(0); opacity: 0; }
            60% { transform: scale(1.2); }
            100% { transform: scale(1); opacity: 1; }
          }
          .otp-box { transition: all 0.15s ease; }
          .otp-box:focus { transform: scale(1.08); box-shadow: 0 0 0 3px rgba(15,23,42,0.15); }
          .otp-box.filled { background: #0f172a; color: #ffffff; border-color: #0f172a; }
        `}</style>

        {/* Decorative top gradient bar */}
        <div style={{ height: 4, background: 'linear-gradient(90deg, #6366f1, #8b5cf6, #a78bfa, #c4b5fd)' }} />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-all z-10"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Success State */}
        {success ? (
          <div className="p-10 flex flex-col items-center justify-center text-center" style={{ animation: 'slideUp 0.4s ease' }}>
            <div style={{ animation: 'successPop 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)' }}>
              <div className="w-20 h-20 rounded-full flex items-center justify-center mb-4" style={{ background: 'linear-gradient(135deg, #10b981, #059669)' }}>
                <CheckCircle2 className="w-10 h-10 text-white" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">Welcome back!</h3>
            <p className="text-gray-500 text-sm">Logging you into CareerSense...</p>
          </div>
        ) : step === 1 ? (
          /* ── STEP 1: EMAIL ── */
          <div className="p-8" style={{ animation: 'slideUp 0.3s ease' }}>
            {/* Logo mark */}
            <div className="flex items-center gap-2 mb-8">
              <img src="/favicon-32x32.png" alt="CareerSense" className="w-8 h-8 rounded-lg" />
              <span className="text-lg font-bold text-gray-900">CareerSense</span>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-1">Sign in to continue</h2>
            <p className="text-gray-500 text-sm mb-6">Enter your email — we'll send a secure one-time code.</p>

            {error && (
              <div className="mb-4 px-4 py-3 rounded-xl text-sm font-medium" style={{ background: '#fef2f2', color: '#dc2626', border: '1px solid #fecaca' }}>
                {error}
              </div>
            )}

            <form onSubmit={handleSendOtp} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    ref={emailRef}
                    type="email"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setError(''); }}
                    className="w-full pl-11 pr-4 py-3.5 text-gray-900 rounded-xl text-sm transition-all outline-none"
                    style={{ background: '#f8fafc', border: '1.5px solid #e2e8f0', fontSize: 15 }}
                    onFocus={e => e.target.style.borderColor = '#0f172a'}
                    onBlur={e => e.target.style.borderColor = '#e2e8f0'}
                    placeholder="you@example.com"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading || !email}
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold text-sm transition-all"
                style={{
                  background: loading || !email ? '#94a3b8' : 'linear-gradient(135deg, #0f172a, #1e293b)',
                  color: '#fff',
                  cursor: loading || !email ? 'not-allowed' : 'pointer',
                  boxShadow: loading || !email ? 'none' : '0 4px 14px rgba(15,23,42,0.35)'
                }}
              >
                {loading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <>Continue with Email <ArrowRight className="w-4 h-4" /></>
                )}
              </button>
            </form>

            <p className="text-center text-xs text-gray-400 mt-5">
              No password needed. Just your email.
            </p>
          </div>
        ) : (
          /* ── STEP 2: OTP ── */
          <div className="p-8" style={{ animation: 'slideUp 0.3s ease' }}>
            <div className="flex items-center gap-2 mb-8">
              <img src="/favicon-32x32.png" alt="CareerSense" className="w-8 h-8 rounded-lg" />
              <span className="text-lg font-bold text-gray-900">CareerSense</span>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-1">Check your inbox</h2>
            <p className="text-gray-500 text-sm mb-1">
              We sent a 6-digit code to
            </p>
            <p className="text-gray-900 font-semibold text-sm mb-6 truncate">{email}</p>

            {error && (
              <div className="mb-4 px-4 py-3 rounded-xl text-sm font-medium" style={{ background: '#fef2f2', color: '#dc2626', border: '1px solid #fecaca' }}>
                {error}
              </div>
            )}

            <form onSubmit={handleVerifyOtp}>
              {/* OTP Digit Boxes */}
              <div className="flex gap-3 justify-center mb-6" onPaste={handleOtpPaste}>
                {otp.map((digit, i) => (
                  <input
                    key={i}
                    ref={el => inputRefs.current[i] = el}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(i, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(i, e)}
                    className={`otp-box w-12 h-14 text-center text-xl font-bold rounded-xl outline-none ${digit ? 'filled' : ''}`}
                    style={{
                      border: digit ? '2px solid #0f172a' : '2px solid #e2e8f0',
                      background: digit ? '#0f172a' : '#f8fafc',
                      color: digit ? '#fff' : '#0f172a',
                      fontSize: 22
                    }}
                  />
                ))}
              </div>

              <button
                type="submit"
                disabled={loading || otp.join('').length !== 6}
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold text-sm transition-all"
                style={{
                  background: (loading || otp.join('').length !== 6) ? '#94a3b8' : 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                  color: '#fff',
                  cursor: (loading || otp.join('').length !== 6) ? 'not-allowed' : 'pointer',
                  boxShadow: (loading || otp.join('').length !== 6) ? 'none' : '0 4px 14px rgba(99,102,241,0.4)'
                }}
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Verify & Sign In'}
              </button>
            </form>

            <div className="flex items-center justify-center gap-4 mt-5">
              <button
                type="button"
                onClick={() => { setStep(1); setOtp(['','','','','','']); setError(''); }}
                className="text-xs text-gray-400 hover:text-gray-700 transition-colors"
              >
                ← Change email
              </button>
              <span className="text-gray-300">|</span>
              <button
                type="button"
                onClick={handleSendOtp}
                className="text-xs font-medium transition-colors"
                style={{ color: '#6366f1' }}
              >
                Resend code
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

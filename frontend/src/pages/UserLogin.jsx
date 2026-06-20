// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// USER LOGIN PAGE
//
// MENTOR: Auth pages sit OUTSIDE the AppLayout shell.
// They have no Sidebar or Topbar — they are full-screen
// experiences that stand alone.
//
// DESIGN PATTERN: Split layout
//   LEFT  → Cinematic brand panel (decorative, animated)
//   RIGHT → Focused auth form (functional, minimal)
//
// This pattern is used by Linear, Vercel, and Raycast
// because it lets you reinforce brand identity while
// keeping the actual form clean and friction-free.
//
// FORM STATE PATTERN:
//   We track: fields, errors, loading, and showPassword.
//   Each is separate useState — mixing them into one object
//   would make validation logic harder to read.
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import {
  Eye, EyeOff, ArrowRight, Zap, Shield,
  AlertCircle, GitBranch, Globe, Loader2
} from 'lucide-react';
import { useMagnetic } from '../hooks/useGSAP';

// ── ANIMATED BACKGROUND PANEL ─────────────────────────
// This is the left side — pure atmosphere, no content clutter.
function BrandPanel() {
const panelRef   = useRef(null);
const gridRef    = useRef(null);
const cardRef    = useRef(null);
const card2Ref   = useRef(null);
const orb1Ref    = useRef(null);
const orb2Ref    = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.3 });

    // Orbs breathe independently
    gsap.to(orb1Ref.current, {
      scale: 1.15, opacity: 0.7, duration: 5,
      ease: 'sine.inOut', repeat: -1, yoyo: true,
    });
    gsap.to(orb2Ref.current, {
      scale: 1.2, opacity: 0.5, duration: 7,
      ease: 'sine.inOut', repeat: -1, yoyo: true, delay: 2,
    });

    // Floating code cards
    gsap.to(cardRef.current, {
      y: -14, duration: 4,
      ease: 'sine.inOut', repeat: -1, yoyo: true,
    });
    gsap.to(card2Ref.current, {
      y: 10, duration: 5.5,
      ease: 'sine.inOut', repeat: -1, yoyo: true, delay: 1,
    });

    // Entrance sequence
    tl.fromTo(panelRef.current,
      { opacity: 0 }, { opacity: 1, duration: 0.8, ease: 'power2.out' }
    )
    .fromTo(gridRef.current,
      { opacity: 0 }, { opacity: 1, duration: 1.2 }, '<'
    )
    .fromTo([cardRef.current, card2Ref.current],
      { opacity: 0, y: 30, scale: 0.95 },
      { opacity: 1, y: 0, scale: 1, stagger: 0.2, duration: 0.8, ease: 'back.out(1.4)' },
      '<0.4'
    );
  }, []);

  return (
    <div
      ref={panelRef}
      className="relative hidden lg:flex flex-col w-[48%] min-h-screen overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #0D1117 0%, #0A0F1A 50%, #090B0F 100%)' }}
    >
      {/* Animated grid */}
      <div
        ref={gridRef}
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(20,184,166,0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(20,184,166,0.05) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
        }}
      />

      {/* Atmospheric orbs */}
      <div
        ref={orb1Ref}
        className="absolute"
        style={{
          top: '20%', left: '30%',
          width: '380px', height: '380px',
          background: 'radial-gradient(circle, rgba(20,184,166,0.12) 0%, transparent 70%)',
          borderRadius: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      />
      <div
        ref={orb2Ref}
        className="absolute"
        style={{
          bottom: '25%', right: '10%',
          width: '280px', height: '280px',
          background: 'radial-gradient(circle, rgba(245,158,11,0.09) 0%, transparent 70%)',
          borderRadius: '50%',
        }}
      />

      {/* Brand mark top-left */}
      <div className="relative z-10 p-10">
        <Link to="/" className="flex items-center gap-3 no-underline w-fit">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center"
            style={{
              background: 'linear-gradient(135deg, #14B8A6, #0D9488)',
              boxShadow: '0 0 20px rgba(20,184,166,0.35)',
            }}
          >
            <Zap size={17} color="#fff" fill="#fff" />
          </div>
          <span className="text-base font-bold" style={{ color: '#F1F5F9' }}>
            CodeLens<span style={{ color: '#14B8A6' }}>AI</span>
          </span>
        </Link>
      </div>

      {/* Floating UI cards — show the product's value */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-10 gap-5">

        {/* Card 1 — Review report */}
        <div
          ref={cardRef}
          className="w-full max-w-sm rounded-2xl p-5"
          style={{
            background: 'rgba(22,31,46,0.75)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(20,184,166,0.2)',
            boxShadow: '0 20px 60px rgba(0,0,0,0.5), 0 0 40px rgba(20,184,166,0.08)',
          }}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg flex items-center justify-center"
                style={{ background: 'rgba(20,184,166,0.12)', border: '1px solid rgba(20,184,166,0.25)' }}>
                <Shield size={13} style={{ color: '#14B8A6' }} />
              </div>
              <span className="text-xs font-mono font-semibold" style={{ color: '#94A3B8' }}>authentication.py</span>
            </div>
            <span className="text-xs font-bold px-2 py-0.5 rounded-full font-mono"
              style={{ background: 'rgba(34,197,94,0.1)', color: '#4ADE80', border: '1px solid rgba(34,197,94,0.25)' }}>
              8.5 / 10
            </span>
          </div>

          {/* Mini metric bars */}
          {[
            { label: 'Security',     val: 94, color: '#14B8A6' },
            { label: 'Readability',  val: 88, color: '#60A5FA' },
            { label: 'Performance',  val: 79, color: '#F59E0B' },
          ].map(m => (
            <div key={m.label} className="mb-2.5">
              <div className="flex justify-between mb-1">
                <span className="text-xs" style={{ color: '#475569' }}>{m.label}</span>
                <span className="text-xs font-mono" style={{ color: m.color }}>{m.val}%</span>
              </div>
              <div className="h-1 rounded-full" style={{ background: 'rgba(255,255,255,0.06)' }}>
                <div className="h-full rounded-full"
                  style={{ width: `${m.val}%`, background: `linear-gradient(90deg, ${m.color}88, ${m.color})` }} />
              </div>
            </div>
          ))}
        </div>

        {/* Card 2 — Issue alert */}
        <div
          ref={card2Ref}
          className="w-full max-w-sm rounded-xl p-4 ml-8"
          style={{
            background: 'rgba(22,31,46,0.7)',
            backdropFilter: 'blur(16px)',
            border: '1px solid rgba(239,68,68,0.2)',
            boxShadow: '0 12px 40px rgba(0,0,0,0.4)',
          }}
        >
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
              style={{ background: 'rgba(239,68,68,0.12)' }}>
              <AlertCircle size={12} style={{ color: '#F87171' }} />
            </div>
            <div>
              <p className="text-xs font-semibold mb-0.5" style={{ color: '#F87171' }}>SQL Injection — CWE-89</p>
              <p className="text-xs leading-relaxed" style={{ color: '#475569' }}>
                Unsanitized userId param on line 47. Use parameterized queries.
              </p>
              <p className="text-xs font-mono mt-1.5" style={{ color: '#334155' }}>auth/middleware.ts · L47</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom tagline */}
      <div className="relative z-10 p-10">
        <blockquote>
          <p className="text-sm leading-relaxed mb-3" style={{ color: '#475569' }}>
            AI-powered code reviews, security analysis, and architecture insights
                  designed for modern development teams.
          </p>
        </blockquote>
      </div>

      {/* Edge vignette toward the form side */}
      <div className="absolute inset-y-0 right-0 w-24 pointer-events-none"
        style={{ background: 'linear-gradient(to right, transparent, #09090B)' }} />
    </div>
  );
}

// ── FORM INPUT ────────────────────────────────────────
// MENTOR: A controlled input component.
// We pass value, onChange, and error as props.
// The component is purely presentational — no logic inside.
function AuthInput({ label, id, type = 'text', value, onChange, error, placeholder, autoComplete, children }) {
  const [focused, setFocused] = useState(false);

  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-xs font-semibold mb-1.5" style={{ color: '#94A3B8' }}>
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          type={type}
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder}
          autoComplete={autoComplete}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-200 font-mono"
          style={{
            background: 'rgba(255,255,255,0.04)',
            border: `1px solid ${error ? 'rgba(239,68,68,0.5)' : focused ? 'rgba(20,184,166,0.5)' : 'rgba(255,255,255,0.1)'}`,
            color: '#F1F5F9',
            boxShadow: focused
              ? `0 0 0 3px ${error ? 'rgba(239,68,68,0.1)' : 'rgba(20,184,166,0.08)'}`
              : 'none',
          }}
        />
        {/* Right slot — e.g. show/hide password toggle */}
        {children && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">{children}</div>
        )}
      </div>
      {/* Inline error message */}
      {error && (
        <p className="flex items-center gap-1 mt-1.5 text-xs" style={{ color: '#F87171' }}>
          <AlertCircle size={11} /> {error}
        </p>
      )}
    </div>
  );
}

// ── SOCIAL AUTH BUTTON ────────────────────────────────
function SocialButton({ icon: Icon, label, onClick }) {
  return (
    <button
      onClick={onClick}
      type="button"
      className="flex-1 flex items-center justify-center gap-2.5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200"
      style={{
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.1)',
        color: '#94A3B8',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)';
        e.currentTarget.style.color = '#F1F5F9';
        e.currentTarget.style.background = 'rgba(255,255,255,0.07)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
        e.currentTarget.style.color = '#94A3B8';
        e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
      }}
    >
      <Icon size={15} />
      {label}
    </button>
  );
}

// ── MAIN LOGIN PAGE ───────────────────────────────────
export default function UserLogin() {
  const navigate = useNavigate();
  const formRef  = useRef(null);
  const btnRef   = useMagnetic(0.2);

  // Form state
  const [email,    setEmail]    = useState('');
  const [password, setPassword] = useState('');
  const [showPwd,  setShowPwd]  = useState(false);
  const [loading,  setLoading]  = useState(false);
  const [errors,   setErrors]   = useState({});

  // Form entrance animation
  useEffect(() => {
    gsap.fromTo(formRef.current,
      { opacity: 0, x: 30 },
      { opacity: 1, x: 0, duration: 0.7, ease: 'power3.out', delay: 0.2 }
    );
  }, []);

  // MENTOR: Form validation.
  // We check all fields, collect errors into an object,
  // then set them all at once with setErrors().
  // This prevents showing one error at a time (bad UX).
  const validate = () => {
    const errs = {};
    if (!email.trim())                      errs.email    = 'Email is required.';
    else if (!/\S+@\S+\.\S+/.test(email))  errs.email    = 'Enter a valid email address.';
    if (!password)                          errs.password = 'Password is required.';
    else if (password.length < 8)          errs.password = 'Password must be at least 8 characters.';
    return errs;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      // Shake animation on error
      gsap.fromTo(formRef.current,
        { x: -8 },
        { x: 0, duration: 0.5, ease: 'elastic.out(1, 0.3)' }
      );
      return;
    }
    setErrors({});
    setLoading(true);

    // Simulate API call — replace with real auth
    await new Promise(r => setTimeout(r, 1500));
    setLoading(false);
    navigate('/dashboard');
  };

  // Allow Enter key to submit
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSubmit();
  };

  return (
    <div className="min-h-screen flex" style={{ background: '#09090B' }}>
      {/* Left — brand panel */}
      <BrandPanel />

      {/* Right — auth form */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 relative overflow-hidden min-h-screen">

        {/* Subtle background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          style={{
            width: '500px', height: '500px',
            background: 'radial-gradient(circle, rgba(20,184,166,0.05) 0%, transparent 65%)',
          }}
        />

        <div ref={formRef} className="w-full max-w-sm relative z-10">

          {/* Mobile logo (hidden on desktop where BrandPanel shows it) */}
          <div className="flex items-center gap-2.5 mb-10 lg:hidden">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #14B8A6, #0D9488)', boxShadow: '0 0 16px rgba(20,184,166,0.3)' }}>
              <Zap size={14} color="#fff" fill="#fff" />
            </div>
            <span className="font-bold text-sm" style={{ color: '#F1F5F9' }}>
              CodeLens<span style={{ color: '#14B8A6' }}>AI</span>
            </span>
          </div>

          {/* Heading */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold mb-1.5" style={{ color: '#F1F5F9', letterSpacing: '-0.02em' }}>
              Welcome back
            </h1>
            <p className="text-sm" style={{ color: '#475569' }}>
              Sign in to your CodeLens AI workspace.
            </p>
          </div>

          {/* Social login */}
          <div className="flex gap-3 mb-6">
            <SocialButton icon={GitBranch} label="GitHub" onClick={() => {}} />
            <SocialButton icon={Globe} label="Google" onClick={() => {}} />
          </div>

          {/* Divider */}
          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.07)' }} />
            <span className="text-xs font-medium" style={{ color: '#334155' }}>or continue with email</span>
            <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.07)' }} />
          </div>

          {/* Email + Password */}
          <form onSubmit={handleSubmit} noValidate onKeyDown={handleKeyDown}>
            <AuthInput
              label="Email address"
              id="email"
              type="email"
              value={email}
              onChange={v => { setEmail(v); setErrors(p => ({ ...p, email: '' })); }}
              error={errors.email}
              placeholder="you@company.com"
              autoComplete="email"
            />

            <AuthInput
              label="Password"
              id="password"
              type={showPwd ? 'text' : 'password'}
              value={password}
              onChange={v => { setPassword(v); setErrors(p => ({ ...p, password: '' })); }}
              error={errors.password}
              placeholder="••••••••••"
              autoComplete="current-password"
            >
              <button
                type="button"
                onClick={() => setShowPwd(s => !s)}
                className="transition-colors duration-200"
                style={{ color: '#334155' }}
                onMouseEnter={e => { e.currentTarget.style.color = '#94A3B8'; }}
                onMouseLeave={e => { e.currentTarget.style.color = '#334155'; }}
              >
                {showPwd ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </AuthInput>

            {/* Forgot password */}
            <div className="flex justify-end mb-6 -mt-2">
              <Link to="/forgot-password"
                className="text-xs no-underline transition-colors duration-200"
                style={{ color: '#475569' }}
                onMouseEnter={e => { e.currentTarget.style.color = '#14B8A6'; }}
                onMouseLeave={e => { e.currentTarget.style.color = '#475569'; }}
              >
                Forgot password?
              </Link>
            </div>

            {/* Submit */}
            <div ref={btnRef}>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
                style={{
                  background: 'linear-gradient(135deg, #14B8A6, #0D9488)',
                  color: '#0A0A0A',
                  boxShadow: loading ? 'none' : '0 0 24px rgba(20,184,166,0.35)',
                }}
                onMouseEnter={e => { if (!loading) e.currentTarget.style.boxShadow = '0 0 40px rgba(20,184,166,0.55)'; }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 0 24px rgba(20,184,166,0.35)'; }}
              >
                {loading
                  ? <><Loader2 size={15} className="animate-spin" /> Signing in...</>
                  : <><span>Sign in</span> <ArrowRight size={15} /></>
                }
              </button>
            </div>
          </form>

          {/* Sign up link */}
          <p className="text-center text-sm mt-6" style={{ color: '#475569' }}>
            Don't have an account?{' '}
            <Link
              to="/signup"
              className="font-semibold no-underline transition-colors duration-200"
              style={{ color: '#14B8A6' }}
              onMouseEnter={e => { e.currentTarget.style.color = '#67E8F9'; }}
              onMouseLeave={e => { e.currentTarget.style.color = '#14B8A6'; }}
            >
              Create one free →
            </Link>
          </p>

          {/* Trust badges */}
          <div className="flex items-center justify-center gap-5 mt-10">
            {[
              { icon: Shield, text: 'SOC 2 Type II' },
              { icon: Shield, text: 'GDPR Compliant' },
              { icon: Shield, text: 'Zero data storage' },
            ].map(b => (
              <div key={b.text} className="flex items-center gap-1.5">
                <b.icon size={11} style={{ color: '#334155' }} />
                <span className="text-xs" style={{ color: '#334155' }}>{b.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// USER SIGNUP PAGE
//
// MENTOR: Single-page form pattern.
// A premium, streamlined signup experience that captures
// essential account information with smooth animations
// and real-time validation.
//
// STATE MANAGEMENT:
//   formData = all field values (object)
//   errors = validation messages (object)
//   loading = submission in progress (boolean)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import {
  Eye, EyeOff, Zap,
  CheckCircle2, AlertCircle, GitBranch, Globe,
  Loader2, Code2, Users,  Cpu
} from 'lucide-react';
import { useMagnetic } from '../hooks/useGSAP';

// ── ANIMATED BRAND PANEL ──────────────────────────────
function BrandPanel() {
  const orb1 = useRef(null);
  const orb2 = useRef(null);
  const orb3 = useRef(null);
  const statsRef = useRef(null);
  const featsRef = useRef(null);

  useEffect(() => {
    // Orbs
    gsap.to(orb1.current, { scale:1.2, opacity:0.7, duration:6, ease:'sine.inOut', repeat:-1, yoyo:true });
    gsap.to(orb2.current, { scale:1.15, opacity:0.5, duration:8, ease:'sine.inOut', repeat:-1, yoyo:true, delay:2 });
    gsap.to(orb3.current, { scale:1.1, opacity:0.6, duration:5, ease:'sine.inOut', repeat:-1, yoyo:true, delay:1 });

    // Stats and feature cards entrance
    gsap.fromTo(statsRef.current,
      { opacity:0, y:20 },
      { opacity:1, y:0, duration:0.8, ease:'power2.out', delay:0.5 }
    );
    gsap.fromTo(Array.from(featsRef.current?.children || []),
      { opacity:0, x:20 },
      { opacity:1, x:0, stagger:0.1, duration:0.6, ease:'power2.out', delay:0.7 }
    );
  }, []);

  const features = [
    { icon: Cpu,    title: 'AI Code Reviews',    sub: 'Detect bugs, security risks, and performance issues automatically' },
    { icon: Code2,  title: 'Multi-Language Support',  sub: 'Analyze JavaScript, Python, Java, C++, Go, and more.'  },
    { icon: Users,  title: 'Developer Insights',     sub: 'Track code quality trends and review history across projects'    },
    { icon: Zap,    title: 'Instant Analysis',    sub: 'Get actionable feedback and suggestions within seconds'           },
  ];

  return (
    <div
      className="relative hidden lg:flex flex-col w-[52%] min-h-screen overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #09090F 0%, #0A0E1A 50%, #0D1117 100%)' }}
    >
      {/* Grid */}
      <div className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(245,158,11,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(245,158,11,0.04) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
        }}
      />

      {/* Orbs */}
      <div ref={orb1} className="absolute pointer-events-none"
        style={{ top:'15%', left:'40%', width:'360px', height:'360px', borderRadius:'50%',
          background:'radial-gradient(circle, rgba(245,158,11,0.1) 0%, transparent 70%)', transform:'translate(-50%,-50%)' }} />
      <div ref={orb2} className="absolute pointer-events-none"
        style={{ bottom:'20%', right:'5%', width:'260px', height:'260px', borderRadius:'50%',
          background:'radial-gradient(circle, rgba(20,184,166,0.1) 0%, transparent 70%)' }} />
      <div ref={orb3} className="absolute pointer-events-none"
        style={{ top:'60%', left:'10%', width:'200px', height:'200px', borderRadius:'50%',
          background:'radial-gradient(circle, rgba(249,115,22,0.08) 0%, transparent 70%)' }} />

      {/* Logo */}
      <div className="relative z-10 p-10">
        <Link to="/" className="flex items-center gap-3 no-underline w-fit">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center"
            style={{ background:'linear-gradient(135deg,#14B8A6,#0D9488)', boxShadow:'0 0 20px rgba(20,184,166,0.35)' }}>
            <Zap size={17} color="#fff" fill="#fff" />
          </div>
          <span className="text-base font-bold" style={{ color:'#F1F5F9' }}>
            CodeLens<span style={{ color:'#14B8A6' }}>AI</span>
          </span>
        </Link>
      </div>

      {/* Main content */}
      <div className="relative z-10 flex-1 flex flex-col justify-center px-12">
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-2" style={{ color:'#F1F5F9', letterSpacing:'-0.02em' }}>
            Your codebase has<br />
            <span style={{
              background:'linear-gradient(135deg,#14B8A6,#67E8F9,#F59E0B)',
              WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent',
            }}>
              a blind spot.
            </span>
          </h2>
          <p className="text-sm leading-relaxed" style={{ color:'#475569' }}>
             Upload your repository, get AI-powered code reviews,
            and improve code quality in minutes.
          </p>
        </div>

        {/* Stats strip */}
        <div ref={statsRef} className="grid grid-cols-3 gap-3 mb-8">
         {[
           { val:'Bug', label:'Detection' },
           { val:'Secure', label:'Code Analysis' },
          { val:'Fast', label:'Review Results' },
              ].map(s => (
            <div key={s.label} className="p-3 rounded-xl text-center"
              style={{ background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.07)' }}>
              <p className="text-lg font-bold font-mono mb-0.5" style={{ color:'#14B8A6' }}>{s.val}</p>
              <p className="text-xs" style={{ color:'#334155' }}>{s.label}</p>
            </div>
          ))}
        </div>

        {/* Feature list */}
        <div ref={featsRef} className="space-y-3">
          {features.map(f => (
            <div key={f.title} className="flex items-start gap-3 p-3.5 rounded-xl transition-all duration-200"
              style={{ background:'rgba(255,255,255,0.02)', border:'1px solid rgba(255,255,255,0.06)' }}>
              <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ background:'rgba(20,184,166,0.1)', border:'1px solid rgba(20,184,166,0.2)' }}>
                <f.icon size={14} style={{ color:'#14B8A6' }} />
              </div>
              <div>
                <p className="text-sm font-semibold mb-0.5" style={{ color:'#F1F5F9' }}>{f.title}</p>
                <p className="text-xs leading-relaxed" style={{ color:'#475569' }}>{f.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom */}
      <div className="relative z-10 px-12 py-10">
        <p className="text-xs" style={{ color:'#334155' }}>
           AI-powered code reviews · Security analysis · Performance insights
        </p>
      </div>

      {/* Left vignette */}
      <div className="absolute inset-y-0 left-0 w-16 pointer-events-none"
        style={{ background:'linear-gradient(to left, transparent, #09090B)' }} />
    </div>
  );
}

// ── PASSWORD STRENGTH METER ───────────────────────────
function PasswordStrength({ password }) {
  const checks = [
    { label: '8+ characters',    pass: password.length >= 8       },
    { label: 'Uppercase letter',  pass: /[A-Z]/.test(password)     },
    { label: 'Number or symbol',  pass: /[0-9!@#$%^&*]/.test(password) },
  ];
  const score = checks.filter(c => c.pass).length;
  const configs = [
    { label: '',    color: 'rgba(255,255,255,0.08)' },
    { label: 'Weak',    color: '#EF4444' },
    { label: 'Fair',    color: '#F59E0B' },
    { label: 'Strong',  color: '#22C55E' },
  ];
  const { label, color } = configs[score];

  if (!password) return null;

  return (
    <div className="mt-2 mb-1">
      <div className="flex gap-1 mb-1.5">
        {[0,1,2].map(i => (
          <div key={i} className="flex-1 h-1 rounded-full transition-all duration-300"
            style={{ background: i < score ? color : 'rgba(255,255,255,0.08)' }} />
        ))}
      </div>
      <div className="flex items-center justify-between">
        <div className="flex gap-3">
          {checks.map(c => (
            <span key={c.label} className="flex items-center gap-1 text-xs"
              style={{ color: c.pass ? '#22C55E' : '#334155' }}>
              <CheckCircle2 size={9} />
              {c.label}
            </span>
          ))}
        </div>
        {label && <span className="text-xs font-semibold" style={{ color }}>{label}</span>}
      </div>
    </div>
  );
}

// ── FORM INPUT ────────────────────────────────────────
function AuthInput({ label, id, type='text', value, onChange, error, placeholder, autoComplete, hint, children }) {
  const [focused, setFocused] = useState(false);
  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-xs font-semibold mb-1.5" style={{ color:'#94A3B8' }}>
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
        {children && <div className="absolute right-3 top-1/2 -translate-y-1/2">{children}</div>}
      </div>
      {hint && !error && <p className="mt-1 text-xs" style={{ color:'#334155' }}>{hint}</p>}
      {error && (
        <p className="flex items-center gap-1 mt-1.5 text-xs" style={{ color:'#F87171' }}>
          <AlertCircle size={11} /> {error}
        </p>
      )}
    </div>
  );
}

// ── MAIN SIGNUP PAGE ──────────────────────────────────
export default function UserSignup() {
  const navigate  = useNavigate();
  const formRef   = useRef(null);
  const btnRef    = useMagnetic(0.2);

  const [data, setData] = useState({
    firstName: '', lastName: '', email: '', password: '', confirmPassword: ''
  });
  const [errors,  setErrors]  = useState({});
  const [loading, setLoading] = useState(false);
  
  const [showPwd,  setShowPwd]  = useState(false);
  const [showPwd2, setShowPwd2] = useState(false);

  const handleChange = (field, value) => {
    setData(prev => ({ ...prev, [field]: value }));
    setErrors(prev => ({ ...prev, [field]: '' }));
  };

  useEffect(() => {
    gsap.fromTo(formRef.current,
      { opacity:0, x:-30 },
      { opacity:1, x:0, duration:0.7, ease:'power3.out', delay:0.2 }
    );
  }, []);

  const validateForm = () => {
    const e = {};
    if (!data.firstName.trim())                   e.firstName       = 'First name is required.';
    if (!data.lastName.trim())                    e.lastName        = 'Last name is required.';
    if (!data.email.trim())                        e.email           = 'Email is required.';
    else if (!/\S+@\S+\.\S+/.test(data.email))    e.email           = 'Enter a valid email.';
    if (!data.password)                            e.password        = 'Password is required.';
    else if (data.password.length < 8)            e.password        = 'At least 8 characters required.';
    if (data.password !== data.confirmPassword)    e.confirmPassword = 'Passwords do not match.';
    return e;
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  const errs = validateForm();

  if (Object.keys(errs).length > 0) {
    setErrors(errs);

    gsap.fromTo(
      formRef.current,
      { x: -8 },
      {
        x: 0,
        duration: 0.5,
        ease: "elastic.out(1,0.3)",
      }
    );

    return;
  }

  try {
    setErrors({});
    setLoading(true);

    const response = await fetch(
      "http://localhost:5000/auth/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          password: data.password,
        }),
      }
    );

    const result = await response.json();

    console.log(result);

    setLoading(false);

    alert("User registered successfully!");

    navigate("/login");

  } catch (error) {
    console.error(error);
    setLoading(false);
    alert("Registration failed");
  }
};

  return (
    <div className="min-h-screen flex" style={{ background:'#09090B' }}>

      {/* Left — form */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 relative overflow-hidden min-h-screen">

        {/* Background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          style={{ width:'500px', height:'500px',
            background:'radial-gradient(circle, rgba(245,158,11,0.05) 0%, transparent 65%)' }} />

        <div ref={formRef} className="w-full max-w-sm relative z-10">

          {/* Mobile logo */}
          <div className="flex items-center gap-2.5 mb-8 lg:hidden">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center"
              style={{ background:'linear-gradient(135deg,#14B8A6,#0D9488)', boxShadow:'0 0 16px rgba(20,184,166,0.3)' }}>
              <Zap size={14} color="#fff" fill="#fff" />
            </div>
            <span className="font-bold text-sm" style={{ color:'#F1F5F9' }}>
              CodeLens<span style={{ color:'#14B8A6' }}>AI</span>
            </span>
          </div>

          {/* Heading */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold mb-1.5" style={{ color:'#F1F5F9', letterSpacing:'-0.02em' }}>
              Create your account
            </h1>
            <p className="text-sm" style={{ color:'#475569' }}>
               Upload your repository, get AI-powered insights,
               and improve your code quality in minutes
            </p>
          </div>

          {/* Social buttons */}
          <div className="flex gap-3 mb-5">
            {[
              { icon: GitBranch, label:'GitHub' },
              { icon: Globe, label:'Google' },
            ].map(s => (
              <button key={s.label} type="button"
                className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200"
                style={{ background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.1)', color:'#94A3B8' }}
                onMouseEnter={e => { e.currentTarget.style.background='rgba(255,255,255,0.07)'; e.currentTarget.style.color='#F1F5F9'; e.currentTarget.style.borderColor='rgba(255,255,255,0.2)'; }}
                onMouseLeave={e => { e.currentTarget.style.background='rgba(255,255,255,0.04)'; e.currentTarget.style.color='#94A3B8'; e.currentTarget.style.borderColor='rgba(255,255,255,0.1)'; }}
              >
                <s.icon size={15} /> {s.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3 mb-5">
            <div className="flex-1 h-px" style={{ background:'rgba(255,255,255,0.07)' }} />
            <span className="text-xs font-medium" style={{ color:'#334155' }}>or with email</span>
            <div className="flex-1 h-px" style={{ background:'rgba(255,255,255,0.07)' }} />
          </div>

          {/* Main Form */}
          <form onSubmit={handleSubmit} noValidate>
            <div className="grid grid-cols-2 gap-3">
              <AuthInput
                label="First name" id="firstName" value={data.firstName}
                onChange={v => handleChange('firstName', v)} error={errors.firstName}
                placeholder="Riya" autoComplete="given-name"
              />
              <AuthInput
                label="Last name" id="lastName" value={data.lastName}
                onChange={v => handleChange('lastName', v)} error={errors.lastName}
                placeholder="Sharma" autoComplete="family-name"
              />
            </div>

            <AuthInput
              label="Work email" id="email" type="email" value={data.email}
              onChange={v => handleChange('email', v)} error={errors.email}
              placeholder="you@company.com" autoComplete="email"
              hint="Use your work email to unlock team features."
            />

            <AuthInput
              label="Password" id="password"
              type={showPwd ? 'text' : 'password'}
              value={data.password}
              onChange={v => handleChange('password', v)} error={errors.password}
              placeholder="Create a strong password" autoComplete="new-password"
            >
              <button type="button" onClick={() => setShowPwd(s => !s)}
                style={{ color:'#334155' }}
                onMouseEnter={e => { e.currentTarget.style.color = '#94A3B8'; }}
                onMouseLeave={e => { e.currentTarget.style.color = '#334155'; }}>
                {showPwd ? <EyeOff size={14} /> : <Eye size={14} />}
              </button>
            </AuthInput>

            <PasswordStrength password={data.password} />

            <AuthInput
              label="Confirm password" id="confirmPassword"
              type={showPwd2 ? 'text' : 'password'}
              value={data.confirmPassword}
              onChange={v => handleChange('confirmPassword', v)} error={errors.confirmPassword}
              placeholder="Repeat your password" autoComplete="new-password"
            >
              <button type="button" onClick={() => setShowPwd2(s => !s)}
                style={{ color:'#334155' }}
                onMouseEnter={e => { e.currentTarget.style.color = '#94A3B8'; }}
                onMouseLeave={e => { e.currentTarget.style.color = '#334155'; }}>
                {showPwd2 ? <EyeOff size={14} /> : <Eye size={14} />}
              </button>
            </AuthInput>

            {/* Action button */}
            <div ref={btnRef} className="mt-6">
              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
                style={{
                  background:'linear-gradient(135deg,#14B8A6,#0D9488)',
                  color:'#0A0A0A',
                  boxShadow: loading ? 'none' : '0 0 24px rgba(20,184,166,0.35)',
                }}
                onMouseEnter={e => { if (!loading) e.currentTarget.style.boxShadow='0 0 40px rgba(20,184,166,0.55)'; }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow='0 0 24px rgba(20,184,166,0.35)'; }}
              >
                {loading ? (
                  <><Loader2 size={15} className="animate-spin" /> Creating account...</>
                ) : (
                  <><Zap size={14} fill="#0A0A0A" /><span>Create Account</span></>
                )}
              </button>
            </div>
          </form>

          {/* Sign in link */}
          <p className="text-center text-sm mt-5" style={{ color:'#475569' }}>
            Already have an account?{' '}
            <Link to="/login"
              className="font-semibold no-underline"
              style={{ color:'#14B8A6' }}
              onMouseEnter={e => { e.currentTarget.style.color='#67E8F9'; }}
              onMouseLeave={e => { e.currentTarget.style.color='#14B8A6'; }}
            >
              Sign in →
            </Link>
          </p>
        </div>
      </div>

      {/* Right — brand panel */}
      <BrandPanel />
    </div>
  );
}
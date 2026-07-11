// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// DASHBOARD APPLICATION PAGE
//
// Includes a premium, responsive navigation bar with 
// scroll-aware glassmorphism, route highlighting, and 
// a robust layout structure surrounding the dashboard.
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

import { useEffect, useRef, useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import gsap from 'gsap';
import {
  FileText, TrendingUp, AlertTriangle, Activity,
  CheckCircle2, Loader2, Eye, ChevronRight, Cpu, 
  Zap, Shield, Menu, X, LogOut,  User
} from 'lucide-react';
import {
  GlassCard, StatusBadge, LangBadge,
  RatingBadge, ScoreDisplay, Button, 
} from '../components/ui';
import { useStagger, useEntrance } from '../hooks/useGSAP';
import { REVIEWS, STATS } from '../data/mockData';


// ── NAVIGATION BAR ────────────────────────────────────
function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  
  const location = useLocation();
  const navigate = useNavigate();
  const profileRef = useRef(null);
  const [user] = useState(() => {
    try {
      const storedUser = localStorage.getItem("user");
      const parsedUser = storedUser ? JSON.parse(storedUser) : null;
      return parsedUser && typeof parsedUser === "object" ? parsedUser : {};
    } catch {
      return {};
    }
  });
  const username = user.username || "Guest";
  const email = user.email || "guest@example.com";

  // Glassmorphism scroll effect
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle clicking outside of profile dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Logout action handler
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const navLinks = [
    { path: '/dashboard', label: 'Dashboard' },
    { path: '/upload', label: 'Upload Report' },
    { path: '/reports', label: 'Reports' },
  ];

  return (
    <header 
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 border-b ${
        isScrolled 
          ? 'bg-[#0f172a]/80 backdrop-blur-md border-white/5 shadow-lg shadow-black/10' 
          : 'bg-transparent border-transparent'
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 h-16 flex items-center justify-between">
        
        {/* Left: Logo */}
        <div className="relative z-10 py-10">
          <div className="flex items-center gap-3 no-underline w-fit">
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
          </div>
        </div>

        {/* Center: Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1 p-1 bg-white/[0.03] border border-white/[0.05] rounded-full">
          {navLinks.map((link) => {
            const isActive = location.pathname.startsWith(link.path);
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`relative px-4 py-1.5 text-sm font-medium rounded-full transition-all duration-300 ${
                  isActive 
                    ? 'text-teal bg-teal/10' 
                    : 'text-text-3 hover:text-text-1 hover:bg-white/5'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right: User Profile & Mobile Toggle */}
        <div className="flex items-center gap-4">
          
          {/* Desktop User Profile */}
          <div className="hidden md:block relative" ref={profileRef}>
            <button 
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center gap-3 hover:opacity-80 transition-opacity focus:outline-none"
            >

              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-teal to-blue-500 p-[1px]">
                <div className="w-full h-full rounded-full bg-[#0f172a] flex items-center justify-center">
                  <User size={14} className="text-text-2" />
                </div>
              </div>
            </button>

            {/* User Profile Dropdown Menu */}
            <div 
              className={`absolute right-0 top-full mt-3 w-56 bg-[#0f172a]/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl transition-all duration-200 origin-top-right overflow-hidden ${
                isProfileOpen ? 'scale-100 opacity-100 visible' : 'scale-95 opacity-0 invisible'
              }`}
            >
              <div className="p-4 border-b border-white/5 bg-white/[0.02]">
                <p className="text-sm font-medium text-text-1">{username}</p>
                <p className="text-xs text-text-4 mt-0.5 truncate">{email}</p>
              </div>
              <div className="p-2">
                <button 
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-sm font-medium text-text-3 hover:text-critical hover:bg-critical/10 rounded-lg transition-colors text-left"
                >
                  <LogOut size={16} />
                  Sign out
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden text-text-2 hover:text-teal transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <div 
        className={`md:hidden absolute top-16 inset-x-0 bg-[#0f172a]/95 backdrop-blur-xl border-b border-white/10 transition-all duration-300 origin-top overflow-hidden ${
          isMobileMenuOpen ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        {/* Mobile User Info */}
        <div className="p-5 border-b border-white/5 bg-white/[0.02] flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-teal to-blue-500 p-[1px] flex-shrink-0">
            <div className="w-full h-full rounded-full bg-[#0f172a] flex items-center justify-center">
              <User size={18} className="text-text-2" />
            </div>
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium text-text-1 truncate">{username}</p>
            <p className="text-xs text-text-4 truncate">{email}</p>
          </div>
          <div className="inline-flex items-center px-2 py-0.5 rounded-full bg-teal/10 border border-teal/20 text-[10px] font-semibold text-teal uppercase tracking-wider">
            Pro Plan
          </div>
        </div>

        {/* Mobile Navigation Links */}
        <nav className="flex flex-col p-4 gap-2">
          {navLinks.map((link) => {
            const isActive = location.pathname.startsWith(link.path);
            return (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                  isActive 
                    ? 'text-teal bg-teal/10 border border-teal/20' 
                    : 'text-text-3 hover:text-text-1 hover:bg-white/5'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <div className="h-[1px] bg-border-s my-2" />
          
          {/* Mobile Logout Button */}
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-3 text-sm font-medium text-text-3 hover:text-critical hover:bg-critical/10 rounded-lg transition-colors w-full text-left"
          >
            <LogOut size={16} />
            Sign out
          </button>
        </nav>
      </div>
    </header>
  );
}

// ── UTILITIES & HOOKS ─────────────────────────────────
function useCounter(target, duration = 1.8) {
  const [value, setValue] = useState(0);
  const ref = useRef(null);
  const triggered = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !triggered.current) {
        triggered.current = true;
        const obj = { val: 0 };
        gsap.to(obj, {
          val: target,
          duration,
          ease: 'power2.out',
          onUpdate: () => setValue(Math.round(obj.val * 10) / 10),
        });
      }
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, [target , duration]);

  return [value, ref];
}

// ── DASHBOARD WIDGETS ─────────────────────────────────
function ActivityItem({ item }) {
  const icons = {
    success:  { Icon: CheckCircle2, color: '#22C55E' },
    critical: { Icon: AlertTriangle, color: '#EF4444' },
    info:     { Icon: Activity, color: '#818CF8' },
  };
  const { Icon, color } = icons[item.type] || icons.info;

  return (
    <div className="flex items-start gap-3 py-3 border-b border-border-s last:border-0">
      <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
        style={{ background: `${color}15` }}>
        <Icon size={13} style={{ color }} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs font-medium text-text-1 leading-tight">{item.action}</p>
        <p className="text-xs text-text-3 font-mono mt-0.5 truncate">{item.file}</p>
      </div>
      <span className="text-xs text-text-4 whitespace-nowrap flex-shrink-0">{item.time}</span>
    </div>
  );
}

function AIEnginePanel() {
  const engines = [
    { name: 'Security Scanner',    status: 'online', load: 23, color: '#EF4444' },
    { name: 'Pattern Intelligence',status: 'online', load: 67, color: '#14B8A6' },
    { name: 'Perf Profiler',       status: 'online', load: 45, color: '#F59E0B' },
    { name: 'Architecture AI',     status: 'online', load: 12, color: '#8B5CF6' },
  ];

  return (
    <GlassCard className="p-5 h-full">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Cpu size={15} className="text-teal" />
          <h3 className="text-sm font-bold text-text-1">AI Engine Status</h3>
        </div>
        <span className="text-xs font-mono text-teal bg-teal-glow px-2 py-0.5 rounded-full border border-border-t">
          4/4 Online
        </span>
      </div>

      <div className="space-y-3">
        {engines.map(e => (
          <div key={e.name}>
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: e.color, boxShadow: `0 0 4px ${e.color}` }} />
                <span className="text-xs text-text-2 font-medium">{e.name}</span>
              </div>
              <span className="text-xs font-mono text-text-3">{e.load}%</span>
            </div>
            <div className="h-1 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
              <div
                className="h-full rounded-full transition-all duration-1000"
                style={{ width: `${e.load}%`, background: `linear-gradient(90deg, ${e.color}99, ${e.color})` }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-border-s flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs text-text-3">
          <Loader2 size={12} className="animate-spin text-teal" />
          <span>1 file in queue</span>
        </div>
        <span className="text-xs font-mono text-teal">~3.2s remaining</span>
      </div>
    </GlassCard>
  );
}

function ReviewsTable({ reviews, onViewReport }) {
  const tableRef = useStagger(0.06, { start: 'top 90%' });

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-border-s">
            {['File Name', 'Language', 'Date', 'Status', 'Score', 'Rating', 'Action'].map(h => (
              <th key={h} className="text-left py-3 px-4 text-xs font-semibold text-text-3 uppercase tracking-wider first:pl-0 last:pr-0 last:text-right whitespace-nowrap">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody ref={tableRef}>
          {reviews.map(review => (
            <ReviewRow key={review.id} review={review} onView={() => onViewReport(review.id)} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ReviewRow({ review, onView }) {
  const [hovered, setHovered] = useState(false);

  return (
    <tr
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="border-b border-border-s last:border-0 transition-all duration-200 group"
      style={{ background: hovered ? 'rgba(255,255,255,0.02)' : 'transparent' }}
    >
      <td className="py-4 pl-0 pr-4">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{ background: 'rgba(20,184,166,0.08)', border: '1px solid rgba(20,184,166,0.15)' }}>
            <FileText size={12} className="text-teal" />
          </div>
          <span className="text-sm font-mono font-semibold text-text-1 truncate max-w-[160px]">
            {review.filename}
          </span>
        </div>
      </td>
      <td className="py-4 px-4"><LangBadge lang={review.language} /></td>
      <td className="py-4 px-4">
        <span className="text-sm font-mono text-text-3">{review.date}</span>
      </td>
      <td className="py-4 px-4"><StatusBadge status={review.status} /></td>
      <td className="py-4 px-4"><ScoreDisplay score={review.score} /></td>
      <td className="py-4 px-4"><RatingBadge rating={review.rating} /></td>
      <td className="py-4 pl-4 pr-0 text-right">
        {review.status === 'completed' ? (
          <button
            onClick={onView}
            className="inline-flex items-center gap-1.5 text-sm font-semibold transition-all duration-200 group/btn"
            style={{ color: hovered ? '#14B8A6' : '#475569' }}
          >
            <Eye size={13} />
            View Report
            <ChevronRight size={12} className="group-hover/btn:translate-x-0.5 transition-transform" />
          </button>
        ) : review.status === 'processing' ? (
          <span className="inline-flex items-center gap-1.5 text-xs text-text-3">
            <Loader2 size={12} className="animate-spin" />
            Analyzing...
          </span>
        ) : (
          <span className="text-xs text-critical/70 font-medium">Retry</span>
        )}
      </td>
    </tr>
  );
}

// ── DASHBOARD CONTENT ─────────────────────────────────
function DashboardContent() {
  const navigate = useNavigate();
  const pageRef = useEntrance({ fromY: 12, duration: 0.5 });
  const statsRef = useStagger(0.08, { delay: 0.1 });

  const [totalVal, totalRef] = useCounter(STATS.totalReports);
  const [scoreVal, scoreRef] = useCounter(STATS.avgScore, 2.2);
  const [issuesVal, issuesRef] = useCounter(STATS.issuesFound, 1.5);

  return (
    <div ref={pageRef} className="w-full max-w-[1400px] mx-auto">
      
      {/* ── STAT CARDS ── */}
      <div ref={statsRef} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <GlassCard className="p-6 group hover:border-border-t transition-all duration-300 cursor-default">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-text-3 text-xs font-semibold uppercase tracking-wider mb-2">Total Reports</p>
              <p ref={totalRef} className="text-4xl font-bold font-mono text-text-1 leading-none">{totalVal}</p>
            </div>
            <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: 'rgba(20,184,166,0.1)', border: '1px solid rgba(20,184,166,0.2)' }}>
              <FileText size={19} style={{ color: '#14B8A6' }} />
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-xs font-semibold text-success">
            <TrendingUp size={12} />
            {STATS.weeklyChange} this week
          </div>
        </GlassCard>

        <GlassCard className="p-6 hover:border-border-t transition-all duration-300 cursor-default">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-text-3 text-xs font-semibold uppercase tracking-wider mb-2">Average Score</p>
              <p ref={scoreRef} className="text-4xl font-bold font-mono leading-none" style={{ color: '#14B8A6' }}>
                {scoreVal.toFixed(1)}
              </p>
            </div>
            <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: 'rgba(20,184,166,0.1)', border: '1px solid rgba(20,184,166,0.2)' }}>
              <Shield size={19} style={{ color: '#14B8A6' }} />
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-xs font-semibold text-success">
            <TrendingUp size={12} />
            {STATS.scoreChange} improvement this month
          </div>
        </GlassCard>

        <GlassCard className="p-6 hover:border-border-t transition-all duration-300 cursor-default">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-text-3 text-xs font-semibold uppercase tracking-wider mb-2">Issues Found</p>
              <p ref={issuesRef} className="text-4xl font-bold font-mono text-text-1 leading-none">{issuesVal}</p>
            </div>
            <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.2)' }}>
              <AlertTriangle size={19} style={{ color: '#F59E0B' }} />
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-xs font-semibold" style={{ color: '#F59E0B' }}>
            <AlertTriangle size={12} />
            {STATS.criticalIssues} critical across all reviews
          </div>
        </GlassCard>
      </div>

      {/* ── ACTIVITY + AI ENGINE ROW ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        <GlassCard className="p-5 lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Activity size={15} className="text-teal" />
              <h3 className="text-sm font-bold text-text-1">Recent Activity</h3>
            </div>
            <button className="text-xs text-text-3 hover:text-teal transition-colors">View all</button>
          </div>
          {STATS.recentActivity.map((item, i) => (
            <ActivityItem key={i} item={item} />
          ))}
        </GlassCard>

        <AIEnginePanel />
      </div>

      {/* ── REVIEWS TABLE ── */}
      <GlassCard className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-base font-bold text-text-1 mb-0.5">Recent Reviews</h3>
            <p className="text-xs text-text-3">View and manage your code review history</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              className="text-xs text-text-3 hover:text-teal transition-colors font-medium"
              onClick={() => navigate('/reports')}
            >
              View all →
            </button>
            <Button
              variant="primary"
              size="sm"
              icon={Zap}
              onClick={() => navigate('/upload')}
            >
              New Review
            </Button>
          </div>
        </div>
  
        <ReviewsTable
          reviews={REVIEWS}
          onViewReport={(id) => navigate(`/report/${id}`)}
        />
      </GlassCard>
    </div>
  );
}

// ── MAIN APPLICATION LAYOUT EXPORT ────────────────────
export default function DashboardPage() {
  return (
    // Application Shell: Uses min-height and slate background 
    <div className="min-h-screen bg-[#0f172a] text-slate-200 font-sans selection:bg-teal/30">
      <Navbar />
      
      {/* Content wrapper with pt-24 to offset the 4rem fixed header + spacing */}
      <main className="pt-24 pb-12 px-4 sm:px-6 flex justify-center">
        <DashboardContent />
      </main>
      
      {/* Optional minimalist Footer matching layout width */}
      <footer className="w-full border-t border-white/5 bg-[#0f172a]">
        <div className="max-w-[1400px] mx-auto px-6 py-6 flex items-center justify-between text-xs text-text-4">
          <span>&copy; {new Date().getFullYear()} CodeLens AI. All rights reserved.</span>
          <div className="flex gap-4">
            <a href="#" className="hover:text-text-2 transition-colors">Terms</a>
            <a href="#" className="hover:text-text-2 transition-colors">Privacy</a>
            <a href="#" className="hover:text-text-2 transition-colors">Documentation</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

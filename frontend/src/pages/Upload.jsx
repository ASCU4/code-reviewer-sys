// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// UPLOAD PAGE
//
// MENTOR: This page has 3 states — an important pattern:
// 1. IDLE: waiting for user to drop/select a file
// 2. ANALYZING: showing AI progress animation
// 3. DONE: file processed, ready to navigate to report
//
// State machines (explicit states) are better than
// boolean flags (isLoading, isError, isDone) because
// you can never be in two states at once, preventing
// impossible UI states.
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

import { useState, useRef, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import {
  Upload as UploadIcon, FileCode2, CheckCircle2, Zap, Shield,
  Activity, Cpu, ArrowRight, FileText, RotateCcw
} from 'lucide-react';
import { useEntrance } from '../hooks/useGSAP';
import { Button } from '../Components/ui';

// Only Python is supported now
const SUPPORTED_LANGS = ['Python'];

// Analysis steps shown during processing
const ANALYSIS_STEPS = [
  { id: 1, label: 'Detecting language & framework',    icon: FileCode2, duration: 600  },
  { id: 2, label: 'Parsing AST structure',             icon: Cpu,       duration: 800  },
  { id: 3, label: 'Running OWASP security scan',       icon: Shield,    duration: 1200 },
  { id: 4, label: 'Analyzing code patterns',           icon: Activity,  duration: 900  },
  { id: 5, label: 'Generating AI recommendations',     icon: Zap,       duration: 700  },
  { id: 6, label: 'Compiling report',                  icon: FileText,  duration: 400  },
];

// ── DROP ZONE ─────────────────────────────────────────
function DropZone({ onFile }) {
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef(null);
  const zoneRef = useRef(null);

  // MENTOR: useCallback memoizes the function reference.
  // Without it, the function is recreated on every render,
  // which can cause unnecessary re-renders in child components.
  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) onFile(file);
  }, [onFile]);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setDragging(true);
  }, []);

  const handleDragLeave = useCallback(() => setDragging(false), []);

  // Entrance animation for the drop zone
  useEffect(() => {
    gsap.fromTo(zoneRef.current,
      { scale: 0.96, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(1.7)', delay: 0.2 }
    );
  }, []);

  // Animate border glow when dragging
  useEffect(() => {
    if (dragging) {
      gsap.to(zoneRef.current, { scale: 1.01, duration: 0.2, ease: 'power2.out' });
    } else {
      gsap.to(zoneRef.current, { scale: 1, duration: 0.3, ease: 'elastic.out(1,0.5)' });
    }
  }, [dragging]);

  return (
    <div
      ref={zoneRef}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onClick={() => inputRef.current?.click()}
      className="relative cursor-pointer rounded-2xl p-16 flex flex-col items-center justify-center text-center transition-all duration-300"
      style={{
        background: dragging ? 'rgba(20,184,166,0.06)' : 'rgba(22,31,46,0.4)',
        border: `2px dashed ${dragging ? 'rgba(20,184,166,0.6)' : 'rgba(255,255,255,0.1)'}`,
        boxShadow: dragging ? '0 0 40px rgba(20,184,166,0.15), inset 0 0 40px rgba(20,184,166,0.04)' : 'none',
      }}
    >
      <input
        ref={inputRef}
        type="file"
        className="hidden"
        accept=".py"
        onChange={(e) => e.target.files[0] && onFile(e.target.files[0])}
      />

      {/* Animated upload icon */}
      <div
        className="w-20 h-20 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300"
        style={{
          background: dragging ? 'rgba(20,184,166,0.15)' : 'rgba(255,255,255,0.05)',
          border: `1px solid ${dragging ? 'rgba(20,184,166,0.4)' : 'rgba(255,255,255,0.1)'}`,
          boxShadow: dragging ? '0 0 30px rgba(20,184,166,0.3)' : 'none',
        }}
      >
        <UploadIcon
          size={32}
          style={{ color: dragging ? '#14B8A6' : '#475569', transition: 'color 0.3s' }}
        />
      </div>

      <h3 className="text-lg font-bold text-text-1 mb-2">
        {dragging ? 'Drop to analyze' : 'Drop your Python code here'}
      </h3>
      <p className="text-sm text-text-3 mb-6 max-w-xs">
        or click to browse. Your code is analyzed locally — never stored on our servers.
      </p>

      {/* Supported languages */}
      <div className="flex flex-wrap justify-center gap-2 max-w-sm">
        {SUPPORTED_LANGS.map(lang => (
          <span
            key={lang}
            className="text-xs px-2 py-1 rounded font-mono text-text-3"
            style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
          >
            {lang}
          </span>
        ))}
      </div>
    </div>
  );
}

// ── ANALYSIS PROGRESS ─────────────────────────────────
function AnalysisProgress({ file, onComplete }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(containerRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
    );

    // Run through each analysis step with delays
    let elapsed = 0;
    const timerIds = [];

    ANALYSIS_STEPS.forEach((step, i) => {
      timerIds.push(setTimeout(() => {
        setCurrentStep(i);
        setProgress(Math.round(((i + 1) / ANALYSIS_STEPS.length) * 100));
      }, elapsed));
      elapsed += step.duration;
    });

    // Complete
    timerIds.push(setTimeout(() => {
      setProgress(100);
      timerIds.push(setTimeout(onComplete, 600));
    }, elapsed));

    return () => timerIds.forEach(clearTimeout);
  }, [onComplete]);

  return (
    <div ref={containerRef} className="max-w-lg mx-auto">
      {/* File info */}
      <div className="glass rounded-2xl p-5 mb-6 flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ background: 'rgba(20,184,166,0.1)', border: '1px solid rgba(20,184,166,0.2)' }}>
          <FileCode2 size={20} className="text-teal" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold font-mono text-text-1 truncate">{file.name}</p>
          <p className="text-xs text-text-3 mt-0.5">
            {(file.size / 1024).toFixed(1)} KB · Uploading to AI Engine
          </p>
        </div>
        <div className="flex-shrink-0">
          <span className="text-2xl font-bold font-mono" style={{ color: '#14B8A6' }}>{progress}%</span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="mb-6">
        <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: `${progress}%`,
              background: 'linear-gradient(90deg, #14B8A6, #67E8F9)',
              boxShadow: '0 0 12px rgba(20,184,166,0.5)',
            }}
          />
        </div>
      </div>

      {/* Steps */}
      <div className="space-y-2">
        {ANALYSIS_STEPS.map((step, i) => {
          const StepIcon = step.icon;
          const isDone = i < currentStep;
          const isActive = i === currentStep;

          return (
            <div
              key={step.id}
              className="flex items-center gap-3 py-2.5 px-4 rounded-xl transition-all duration-300"
              style={{
                background: isActive ? 'rgba(20,184,166,0.06)' : 'transparent',
                border: isActive ? '1px solid rgba(20,184,166,0.15)' : '1px solid transparent',
                opacity: i > currentStep ? 0.35 : 1,
              }}
            >
              <div
                className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-300"
                style={{
                  background: isDone ? 'rgba(34,197,94,0.1)' : isActive ? 'rgba(20,184,166,0.1)' : 'rgba(255,255,255,0.04)',
                }}
              >
                {isDone
                  ? <CheckCircle2 size={14} className="text-success" />
                  : <StepIcon size={13} style={{ color: isActive ? '#14B8A6' : '#475569' }} />
                }
              </div>
              <span className="text-sm font-medium" style={{ color: isDone ? '#94A3B8' : isActive ? '#F1F5F9' : '#334155' }}>
                {step.label}
              </span>
              {isActive && (
                <span className="ml-auto text-xs text-teal font-mono animate-pulse">Running...</span>
              )}
              {isDone && (
                <span className="ml-auto text-xs text-success font-mono">✓</span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── SUCCESS STATE ─────────────────────────────────────
function SuccessState({ file, onViewReport, onReset }) {
  const ref = useRef(null);

  useEffect(() => {
    // Celebration entrance
    gsap.fromTo(ref.current,
      { scale: 0.9, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.6, ease: 'back.out(1.7)' }
    );
  }, []);

  return (
    <div ref={ref} className="max-w-lg mx-auto text-center">
      {/* Success icon with glow */}
      <div className="relative inline-flex mb-6">
        <div
          className="w-20 h-20 rounded-2xl flex items-center justify-center"
          style={{
            background: 'rgba(34,197,94,0.1)',
            border: '1px solid rgba(34,197,94,0.3)',
            boxShadow: '0 0 40px rgba(34,197,94,0.2)',
          }}
        >
          <CheckCircle2 size={36} className="text-success" />
        </div>
        <div className="absolute inset-0 rounded-2xl animate-breathe"
          style={{ background: 'radial-gradient(circle, rgba(34,197,94,0.2), transparent)', pointerEvents:'none' }} />
      </div>

      <h3 className="text-xl font-bold text-text-1 mb-2">Analysis Complete</h3>
      <p className="text-sm text-text-2 mb-1 font-mono">{file.name}</p>
      <p className="text-xs text-text-3 mb-8">Processed in 2.8 seconds · 342 lines analyzed</p>

      {/* Quick results preview */}
      <div className="glass rounded-2xl p-5 mb-6 grid grid-cols-3 gap-4 text-center">
        <div>
          <p className="text-2xl font-bold font-mono" style={{ color: '#14B8A6' }}>8.5</p>
          <p className="text-xs text-text-3 mt-1">Quality Score</p>
        </div>
        <div>
          <p className="text-2xl font-bold font-mono text-success">0</p>
          <p className="text-xs text-text-3 mt-1">Critical Issues</p>
        </div>
        <div>
          <p className="text-2xl font-bold font-mono text-warning">2</p>
          <p className="text-xs text-text-3 mt-1">Warnings</p>
        </div>
      </div>

      <div className="flex gap-3 justify-center">
        <Button variant="primary" size="lg" icon={ArrowRight} onClick={onViewReport}>
          View Full Report
        </Button>
        <Button variant="ghost" size="lg" icon={RotateCcw} onClick={onReset}>
          Analyze Another
        </Button>
      </div>
    </div>
  );
}

// ── MAIN UPLOAD PAGE ──────────────────────────────────
export default function Upload() {
  const navigate = useNavigate();
  const pageRef = useEntrance({ fromY: 16, duration: 0.5 });
  const [state, setState] = useState('idle'); // idle | analyzing | done
  const [file, setFile] = useState(null);
  const [error, setError] = useState(''); // Added error state

  const handleFile = (f) => {
    // Validate file extension for Python files
    if (f && !f.name.toLowerCase().endsWith('.py')) {
      setError('Only Python (.py) files are supported.');
      return;
    }
    
    setError(''); // Clear error on successful valid file
    setFile(f);
    setState('analyzing');
  };

  const handleComplete = () => setState('done');
  const handleReset = () => { 
    setFile(null); 
    setError(''); // Clear error on reset
    setState('idle'); 
  };
  const handleViewReport = () => navigate('/reports');

  return (
    <div ref={pageRef} className="p-6 max-w-3xl mx-auto">
      {/* Header */}
      {state === 'idle' && (
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold text-teal mb-4"
            style={{ background: 'rgba(20,184,166,0.08)', border: '1px solid rgba(20,184,166,0.2)' }}>
            <span className="w-1.5 h-1.5 rounded-full bg-teal animate-pulse-teal" />
            AI Engine Ready
          </div>
          <h2 className="text-2xl font-bold text-text-1 mb-2">Upload a file to analyze</h2>
          <p className="text-text-3 text-sm">
            Get a full security, quality, and architecture review in under 5 seconds.
          </p>
        </div>
      )}

      {/* State machine renders */}
      {state === 'idle' && (
        <div className="relative">
          <DropZone onFile={handleFile} />
          {/* Display validation error message if needed */}
          {error && (
            <p className="absolute -bottom-8 left-0 right-0 text-center text-sm font-medium" style={{ color: '#EF4444' }}>
              {error}
            </p>
          )}
        </div>
      )}
      
      {state === 'analyzing' && (
        <div className="mt-4">
          <AnalysisProgress file={file} onComplete={handleComplete} />
        </div>
      )}
      {state === 'done' && (
        <div className="mt-4">
          <SuccessState file={file} onViewReport={handleViewReport} onReset={handleReset} />
        </div>
      )}

      {/* Features strip */}
      {state === 'idle' && (
        <div className="grid grid-cols-3 gap-4 mt-8">
          {[
            { icon: Shield, label: 'Security Scan',    sub: 'OWASP Top 10 + CVE matching',      color: '#EF4444' },
            { icon: Zap,    label: 'Instant Results',  sub: 'Full review in under 5 seconds',   color: '#14B8A6' },
            { icon: Cpu,    label: 'AI-Powered',       sub: '5 specialized models in parallel', color: '#8B5CF6' },
          ].map(f => (
            <div key={f.label} className="glass rounded-xl p-4 text-center">
              <div className="w-9 h-9 rounded-lg flex items-center justify-center mx-auto mb-3"
                style={{ background: `${f.color}18`, border: `1px solid ${f.color}30` }}>
                <f.icon size={16} style={{ color: f.color }} />
              </div>
              <p className="text-xs font-semibold text-text-1 mb-1">{f.label}</p>
              <p className="text-xs text-text-3 leading-relaxed">{f.sub}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
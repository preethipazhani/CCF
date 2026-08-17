import React, { useEffect, useMemo, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Shield, Lock, Mail, User, ArrowRight, Eye, EyeOff, CheckCircle2, Sparkles, Globe2, BadgeCheck, LoaderCircle } from 'lucide-react';
import { isGoogleConfigured, isMicrosoftConfigured, getGoogleAuthUrl, getMicrosoftAuthUrl } from '../data/oauthConfig';

const passwordStrength = (value) => {
  let score = 0;
  if (value.length >= 8) score += 1;
  if (/[A-Z]/.test(value)) score += 1;
  if (/[0-9]/.test(value)) score += 1;
  if (/[^A-Za-z0-9]/.test(value)) score += 1;
  return score;
};

export const AuthPage = ({ setActiveTab }) => {
  const { login, signup, showToast } = useAuth();
  const [authMode, setAuthMode] = useState('login');
  const [formState, setFormState] = useState({
    email: '',
    password: '',
    name: '',
    confirmPassword: '',
    acceptedTerms: true,
    avatar: '⚡'
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const passwordScore = useMemo(() => passwordStrength(formState.password), [formState.password]);
  const passwordHint = useMemo(() => {
    if (!formState.password) return 'Use at least 8 characters with a mix of letters, numbers, and symbols.';
    if (passwordScore <= 1) return 'Weak';
    if (passwordScore === 2) return 'Fair';
    if (passwordScore === 3) return 'Strong';
    return 'Excellent';
  }, [formState.password, passwordScore]);

  useEffect(() => {
    setErrors((prev) => ({ ...prev, password: '' }));
  }, [formState.password]);

  const validateLogin = () => {
    const nextErrors = {};
    if (!formState.email.trim()) nextErrors.email = 'Email is required.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.email)) nextErrors.email = 'Enter a valid email address.';
    if (!formState.password) nextErrors.password = 'Password is required.';
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const validateSignup = () => {
    const nextErrors = {};
    if (!formState.name.trim()) nextErrors.name = 'Your full name is required.';
    if (!formState.email.trim()) nextErrors.email = 'Email is required.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.email)) nextErrors.email = 'Enter a valid email address.';
    if (!formState.password) nextErrors.password = 'Create a password to continue.';
    else if (formState.password.length < 8) nextErrors.password = 'Use at least 8 characters.';
    if (formState.password !== formState.confirmPassword) nextErrors.confirmPassword = 'Passwords do not match.';
    if (!formState.acceptedTerms) nextErrors.terms = 'Please accept the terms and privacy policy.';
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    if (!validateLogin()) return;
    setLoading(true);
    setTimeout(() => {
      const result = login(formState.email, formState.password);
      setLoading(false);
      if (result?.success) setActiveTab('dashboard');
    }, 800);
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    if (!validateSignup()) return;
    setLoading(true);
    setTimeout(() => {
      const result = signup(formState.name, formState.email, formState.password, formState.acceptedTerms, formState.avatar);
      setLoading(false);
      if (result?.success) setActiveTab('dashboard');
    }, 900);
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(0,240,255,0.2),_transparent_30%),linear-gradient(135deg,_#050814_0%,_#09111f_45%,_#071122_100%)] px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto flex min-h-[calc(100vh-3rem)] max-w-7xl flex-col overflow-hidden rounded-[32px] border border-cyan-500/20 bg-[#050814]/70 shadow-[0_30px_120px_rgba(0,0,0,0.45)] backdrop-blur-xl lg:flex-row">
        <div className="relative flex-1 overflow-hidden bg-gradient-to-br from-cyan-600/20 via-slate-950 to-purple-950/40 px-8 py-10 sm:px-10 lg:px-14 lg:py-16">
          <div className="absolute inset-0 opacity-40">
            {[...Array(24)].map((_, index) => (
              <span
                key={index}
                className="absolute h-1.5 w-1.5 rounded-full bg-cyan-300/70"
                style={{
                  top: `${8 + (index * 3) % 84}%`,
                  left: `${6 + (index * 7) % 88}%`,
                  animation: `pulse 4s ease-in-out ${index * 0.2}s infinite`
                }}
              />
            ))}
          </div>
          <div className="relative z-10 flex h-full flex-col justify-between">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-3 rounded-full border border-cyan-400/30 bg-cyan-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-cyan-200">
                <Shield className="h-4 w-4" />
                CyberQuest Enterprise
              </div>
              <div className="space-y-4 max-w-xl">
                <h1 className="text-4xl font-black leading-tight text-white sm:text-5xl">
                  Master Cybersecurity Through Interactive Learning.
                </h1>
                <p className="max-w-lg text-lg text-slate-300">
                  Join a modern training platform built for security teams, students, and ambitious professionals who need practical defense skills in real-world scenarios.
                </p>
              </div>
            </div>

            <div className="mt-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div className="relative flex h-56 w-full max-w-lg items-center justify-center rounded-[28px] border border-cyan-400/20 bg-slate-950/40 p-6 shadow-[0_0_80px_rgba(0,240,255,0.18)]">
                <div className="absolute inset-0 rounded-[28px] bg-[radial-gradient(circle,_rgba(0,240,255,0.25),_transparent_60%)]" />
                <div className="relative flex h-40 w-40 items-center justify-center rounded-full border border-cyan-300/30 bg-gradient-to-br from-cyan-400/30 via-slate-900 to-purple-500/30 shadow-[0_0_60px_rgba(0,240,255,0.16)]">
                  <Shield className="h-20 w-20 text-cyan-300" />
                  <div className="absolute inset-4 rounded-full border border-cyan-200/20" />
                </div>
                <div className="absolute bottom-6 left-6 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-300">
                  Live skill pathways
                </div>
                <div className="absolute right-6 top-6 rounded-full border border-purple-400/30 bg-purple-500/10 px-3 py-1 text-xs font-medium text-purple-300">
                  24/7 threat simulation
                </div>
              </div>
              <div className="max-w-sm rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-300 backdrop-blur">
                <div className="flex items-center gap-2 text-cyan-300">
                  <Sparkles className="h-4 w-4" />
                  <span>Trusted by teams mastering phishing defense, cloud security, and incident response.</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex w-full max-w-xl items-center justify-center bg-slate-950/70 px-5 py-8 sm:px-8 lg:px-10">
          <div className="w-full rounded-[28px] border border-cyan-500/20 bg-[#07111f]/85 p-6 shadow-[0_0_120px_rgba(0,240,255,0.12)] sm:p-8">
            <div className="mb-8 flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.35em] text-cyan-300">Welcome back</p>
                <h2 className="mt-2 text-2xl font-semibold text-white">
                  {authMode === 'login' ? 'Sign in to your workspace' : 'Create your secure account'}
                </h2>
              </div>
              <div className="rounded-2xl border border-cyan-500/20 bg-cyan-500/10 p-3 text-cyan-300">
                <Shield className="h-6 w-6" />
              </div>
            </div>

            {authMode !== 'forgot' && (
              <div className="mb-6 flex rounded-2xl border border-cyan-500/20 bg-slate-900/70 p-1">
                <button
                  type="button"
                  onClick={() => setAuthMode('login')}
                  className={`flex-1 rounded-xl px-3 py-2.5 text-sm font-semibold transition-all ${authMode === 'login' ? 'bg-gradient-to-r from-cyan-500/30 to-purple-500/20 text-white shadow' : 'text-slate-400 hover:text-white'}`}
                >
                  Sign In
                </button>
                <button
                  type="button"
                  onClick={() => setAuthMode('signup')}
                  className={`flex-1 rounded-xl px-3 py-2.5 text-sm font-semibold transition-all ${authMode === 'signup' ? 'bg-gradient-to-r from-cyan-500/30 to-purple-500/20 text-white shadow' : 'text-slate-400 hover:text-white'}`}
                >
                  Create Account
                </button>
              </div>
            )}

            {authMode === 'login' && (
              <form onSubmit={handleLoginSubmit} className="space-y-4">
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-300">Email Address</label>
                  <div className="relative">
                    <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                    <input
                      value={formState.email}
                      onChange={(e) => setFormState(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full rounded-2xl border border-slate-700 bg-slate-900/80 py-3 pl-10 pr-4 text-sm text-white outline-none transition focus:border-cyan-400"
                      placeholder="you@company.com"
                      type="email"
                    />
                  </div>
                  {errors.email && <p className="mt-2 text-sm text-red-400">{errors.email}</p>}
                </div>
                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <label className="text-sm font-medium text-slate-300">Password</label>
                    <button type="button" className="text-sm text-cyan-300 hover:text-cyan-200">Forgot Password?</button>
                  </div>
                  <div className="relative">
                    <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                    <input
                      value={formState.password}
                      onChange={(e) => setFormState(prev => ({ ...prev, password: e.target.value }))}
                      className="w-full rounded-2xl border border-slate-700 bg-slate-900/80 py-3 pl-10 pr-12 text-sm text-white outline-none transition focus:border-cyan-400"
                      placeholder="Enter your password"
                      type={showPassword ? 'text' : 'password'}
                    />
                    <button type="button" onClick={() => setShowPassword((prev) => !prev)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  {errors.password && <p className="mt-2 text-sm text-red-400">{errors.password}</p>}
                </div>
                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center gap-2 text-slate-400">
                    <input type="checkbox" className="rounded border-slate-700 bg-slate-900" />
                    <span>Remember me</span>
                  </label>
                </div>
                <button type="submit" disabled={loading} className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-500 to-purple-600 px-4 py-3 font-semibold text-white transition hover:shadow-[0_0_35px_rgba(0,240,255,0.28)] disabled:cursor-not-allowed disabled:opacity-70">
                  {loading ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <ArrowRight className="h-4 w-4" />}
                  {loading ? 'Signing in…' : 'Sign In'}
                </button>
                <div className="flex items-center gap-3 pt-2 text-xs uppercase tracking-[0.3em] text-slate-500">
                  <div className="h-px flex-1 bg-slate-700" />
                  <span>Or continue with</span>
                  <div className="h-px flex-1 bg-slate-700" />
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <button
                    type="button"
                    onClick={() => {
                      if (isGoogleConfigured()) {
                        window.location.href = getGoogleAuthUrl();
                      } else {
                        showToast("Google OAuth configuration is missing. Configure VITE_GOOGLE_CLIENT_ID and VITE_GOOGLE_REDIRECT_URI.", "error");
                      }
                    }}
                    className={`flex items-center justify-center gap-2 rounded-2xl border px-3 py-3 text-sm font-medium transition-all ${
                      isGoogleConfigured()
                        ? 'border-cyan-500/30 bg-cyan-950/20 text-cyan-300 hover:bg-cyan-500/10'
                        : 'border-slate-800 bg-slate-900/50 text-slate-500 cursor-not-allowed opacity-80'
                    }`}
                  >
                    <Globe2 className="h-4 w-4" /> Google {isGoogleConfigured() ? '' : '(Unavailable)'}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      if (isMicrosoftConfigured()) {
                        window.location.href = getMicrosoftAuthUrl();
                      } else {
                        showToast("Microsoft OAuth configuration is missing. Configure VITE_MICROSOFT_CLIENT_ID and VITE_MICROSOFT_REDIRECT_URI.", "error");
                      }
                    }}
                    className={`flex items-center justify-center gap-2 rounded-2xl border px-3 py-3 text-sm font-medium transition-all ${
                      isMicrosoftConfigured()
                        ? 'border-purple-500/30 bg-purple-950/20 text-purple-300 hover:bg-purple-500/10'
                        : 'border-slate-800 bg-slate-900/50 text-slate-500 cursor-not-allowed opacity-80'
                    }`}
                  >
                    <BadgeCheck className="h-4 w-4" /> Microsoft {isMicrosoftConfigured() ? '' : '(Unavailable)'}
                  </button>
                </div>
                <p className="text-center text-sm text-slate-400">
                  New to CyberQuest?{' '}
                  <button type="button" onClick={() => setAuthMode('signup')} className="font-semibold text-cyan-300 hover:text-cyan-200">Create an account</button>
                </p>
              </form>
            )}

            {authMode === 'signup' && (
              <form onSubmit={handleSignupSubmit} className="space-y-4">
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-300">Full Name</label>
                  <div className="relative">
                    <User className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                    <input
                      value={formState.name}
                      onChange={(e) => setFormState(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full rounded-2xl border border-slate-700 bg-slate-900/80 py-3 pl-10 pr-4 text-sm text-white outline-none transition focus:border-cyan-400"
                      placeholder="Alex Vance"
                      type="text"
                    />
                  </div>
                  {errors.name && <p className="mt-2 text-sm text-red-400">{errors.name}</p>}
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-300">Email Address</label>
                  <div className="relative">
                    <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                    <input
                      value={formState.email}
                      onChange={(e) => setFormState(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full rounded-2xl border border-slate-700 bg-slate-900/80 py-3 pl-10 pr-4 text-sm text-white outline-none transition focus:border-cyan-400"
                      placeholder="you@company.com"
                      type="email"
                    />
                  </div>
                  {errors.email && <p className="mt-2 text-sm text-red-400">{errors.email}</p>}
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-300">Password</label>
                  <div className="relative">
                    <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                    <input
                      value={formState.password}
                      onChange={(e) => setFormState(prev => ({ ...prev, password: e.target.value }))}
                      className="w-full rounded-2xl border border-slate-700 bg-slate-900/80 py-3 pl-10 pr-12 text-sm text-white outline-none transition focus:border-cyan-400"
                      placeholder="Create a strong password"
                      type={showPassword ? 'text' : 'password'}
                    />
                    <button type="button" onClick={() => setShowPassword((prev) => !prev)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  <div className="mt-3 flex items-center gap-2">
                    <div className="h-2 flex-1 rounded-full bg-slate-800">
                      <div className={`h-2 rounded-full transition-all ${passwordScore <= 1 ? 'w-1/4 bg-red-500' : passwordScore === 2 ? 'w-2/4 bg-amber-500' : passwordScore === 3 ? 'w-3/4 bg-cyan-500' : 'w-full bg-emerald-500'}`} />
                    </div>
                    <span className="text-xs font-medium text-slate-400">{passwordHint}</span>
                  </div>
                  {errors.password && <p className="mt-2 text-sm text-red-400">{errors.password}</p>}
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-300">Confirm Password</label>
                  <div className="relative">
                    <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                    <input
                      value={formState.confirmPassword}
                      onChange={(e) => setFormState(prev => ({ ...prev, confirmPassword: e.target.value }))}
                      className="w-full rounded-2xl border border-slate-700 bg-slate-900/80 py-3 pl-10 pr-12 text-sm text-white outline-none transition focus:border-cyan-400"
                      placeholder="Re-enter your password"
                      type={showConfirmPassword ? 'text' : 'password'}
                    />
                    <button type="button" onClick={() => setShowConfirmPassword((prev) => !prev)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
                      {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  {errors.confirmPassword && <p className="mt-2 text-sm text-red-400">{errors.confirmPassword}</p>}
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-300">Profile Avatar (Optional)</label>
                  <div className="grid grid-cols-6 gap-2 bg-slate-900/60 p-3 rounded-2xl border border-slate-700">
                    {['⚡', '🛡️', '👾', '👑', '🚀', '🎯', '🔍', '💻', '🦊', '🦉', '🦁', '🐼'].map((emoji) => (
                      <button
                        key={emoji}
                        type="button"
                        onClick={() => setFormState(prev => ({ ...prev, avatar: emoji }))}
                        className={`text-xl p-2 rounded-xl border transition-all ${
                          formState.avatar === emoji
                            ? 'bg-cyan-500/20 border-cyan-400 text-white shadow-[0_0_15px_rgba(0,240,255,0.25)]'
                            : 'bg-black/35 border-transparent hover:border-slate-700 text-slate-350'
                        }`}
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                </div>
                <label className="flex items-start gap-3 rounded-2xl border border-slate-700 bg-slate-900/60 p-3 text-sm text-slate-400">
                  <input
                    type="checkbox"
                    checked={formState.acceptedTerms}
                    onChange={(e) => setFormState(prev => ({ ...prev, acceptedTerms: e.target.checked }))}
                    className="mt-1 rounded border-slate-700 bg-slate-900"
                  />
                  <span>I agree to the Terms & Privacy Policy</span>
                </label>
                {errors.terms && <p className="text-sm text-red-400">{errors.terms}</p>}
                <button type="submit" disabled={loading} className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-500 to-purple-600 px-4 py-3 font-semibold text-white transition hover:shadow-[0_0_35px_rgba(0,240,255,0.28)] disabled:cursor-not-allowed disabled:opacity-70">
                  {loading ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <CheckCircle2 className="h-4 w-4" />}
                  {loading ? 'Creating account…' : 'Create Account'}
                </button>
                <p className="text-center text-sm text-slate-400">
                  Already have an account?{' '}
                  <button type="button" onClick={() => setAuthMode('login')} className="font-semibold text-cyan-300 hover:text-cyan-200">Sign In</button>
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

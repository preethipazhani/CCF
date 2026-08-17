import React, { useState } from 'react';
import { CYBER_GAMES } from '../data/gamesData';
import { useAuth } from '../context/AuthContext';
import { Gamepad2, Zap, Shield, Lock, Play, Clock, Sparkles, CheckCircle2, X, AlertTriangle, Info, Check, ArrowRight, Eye, EyeOff } from 'lucide-react';

const PHISHING_SCENARIOS = [
  {
    sender: "security@paypal-update-alert.com",
    subject: "Urgent: Verify Your Account Details Immediately",
    recipient: "operator@cyberquest.io",
    date: "Today, 10:24 AM",
    body: "Dear Customer,\n\nWe detected suspicious login attempts on your account from an unrecognized IP address. To safeguard your funds and restore full access, you must verify your identity immediately.\n\nFailure to verify within 24 hours will result in permanent account suspension.",
    linkText: "Click Here to Restore Account Access",
    linkUrl: "http://paypal-verification-portal-auth.net/login",
    correctAnswer: "phishing",
    explanation: "Look at the sender domain ('paypal-update-alert.com') and link URL ('paypal-verification-portal-auth.net'). Neither belong to paypal.com. Additionally, the urgent tone and threat of permanent suspension are classic indicators of phishing."
  },
  {
    sender: "it-support@company.com",
    subject: "Scheduled Network Maintenance This Saturday",
    recipient: "all-employees@company.com",
    date: "Yesterday, 4:15 PM",
    body: "Hi Team,\n\nOur internal databases will undergo routine maintenance this Saturday, from 02:00 AM to 05:00 AM EST. \n\nNo actions are required from your side. Internal apps may experience brief connectivity drops. If you have questions, please reach out to internal IT extension 5521 or via the ticket system.",
    correctAnswer: "safe",
    explanation: "The email is purely informative, does not request credentials, contains no suspicious links or attachments, refers users to established internal support lines, and matches standard corporate operations."
  },
  {
    sender: "hr-department-notices@gmail.com",
    subject: "RE: Q3 Bonus Structure Changes",
    recipient: "operator@cyberquest.io",
    date: "Today, 1:12 PM",
    body: "Hello,\n\nPlease find attached the updated corporate Q3 bonus distribution spreadsheet. All employees must review their allocated figures and confirm with HR.",
    attachment: "Q3_Bonus_Details_xlsx.exe",
    correctAnswer: "phishing",
    explanation: "The sender uses a public '@gmail.com' address, which is highly abnormal for internal corporate communication. More critically, the attachment is disguised as a spreadsheet but has an '.exe' extension, which will execute malicious code if clicked."
  },
  {
    sender: "support@microsoft.com",
    subject: "Verify your email account security settings",
    recipient: "operator@cyberquest.io",
    date: "Today, 8:05 AM",
    body: "Security Alert: Microsoft has detected unusual login attempts. Please secure your account. Security updates can be accessed via secure portal.",
    linkText: "https://www.goog1e.com/login-verification",
    correctAnswer: "suspicious",
    explanation: "Typosquatting alert! The link shows 'goog1e.com' using a number '1' instead of letter 'l'. Furthermore, an email claiming to be from Microsoft shouldn't link to a Google login page."
  },
  {
    sender: "delivery@fedex-tracking-parcel.info",
    subject: "Failed Delivery Notice - Package #FDX-99482",
    recipient: "operator@cyberquest.io",
    date: "Yesterday, 11:30 AM",
    body: "Your package could not be delivered because no recipient was available at the address. Please download the delivery receipt and schedule a new delivery date at our local branch.",
    linkText: "Download FedEx Delivery Receipt (PDF)",
    linkUrl: "http://fedex-package-receipt-pdf.info/download",
    correctAnswer: "phishing",
    explanation: "The sender domain 'fedex-tracking-parcel.info' is not fedex.com. Delivery scams commonly use lookalike domains and request you to download documents or click external links to steal credentials or install spyware."
  }
];

const WEAK_PASSWORDS = [
  { val: "123456", label: "Sequential numbers" },
  { val: "password123", label: "Common keyboard walk" },
  { val: "Admin2026!", label: "Predictable pattern" },
  { val: "Cyb3rQu3st#26", label: "Moderate complexity" },
  { val: "correct horse battery staple", label: "Long multi-word passphrase" }
];

export const CyberGamesPage = () => {
  const { completeGame } = useAuth();
  const [activeGameId, setActiveGameId] = useState(null); // null | 'phishing-spotter' | 'password-arena'

  // Phishing Game State
  const [phishIdx, setPhishIdx] = useState(0);
  const [phishAnswers, setPhishAnswers] = useState({}); // { [scenarioIndex]: selectedChoice }
  const [phishShowExplanation, setPhishShowExplanation] = useState(false);
  const [phishFinished, setPhishFinished] = useState(false);

  // Password Game State
  const [passwordInput, setPasswordInput] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [pwHasSubmitted, setPwHasSubmitted] = useState(false);

  const handleLaunchGame = (game) => {
    if (game.status === 'Available Now') {
      setActiveGameId(game.id);
      // Reset game states
      if (game.id === 'phishing-spotter') {
        setPhishIdx(0);
        setPhishAnswers({});
        setPhishShowExplanation(false);
        setPhishFinished(false);
      } else if (game.id === 'password-arena') {
        setPasswordInput("");
        setPwHasSubmitted(false);
      }
    }
  };

  // --- PHISHING SIMULATOR LOGIC ---
  const handlePhishAnswer = (choice) => {
    if (phishShowExplanation) return;
    setPhishAnswers(prev => ({ ...prev, [phishIdx]: choice }));
    setPhishShowExplanation(true);
  };

  const handlePhishNext = () => {
    setPhishShowExplanation(false);
    if (phishIdx < PHISHING_SCENARIOS.length - 1) {
      setPhishIdx(prev => prev + 1);
    } else {
      setPhishFinished(true);
    }
  };

  const getPhishingCorrectCount = () => {
    let count = 0;
    PHISHING_SCENARIOS.forEach((scenario, idx) => {
      if (phishAnswers[idx] === scenario.correctAnswer) {
        count++;
      }
    });
    return count;
  };

  const handlePhishingComplete = () => {
    completeGame("phishing-spotter", 50);
    setActiveGameId(null);
  };

  // --- PASSWORD ENTROPY LOGIC ---
  const evaluatePassword = (pwd) => {
    if (!pwd) return { rating: "Weak", entropy: 0, timeMsg: "Instantly", color: "text-red-400", bg: "bg-red-500/20", pct: 0, checks: {} };

    const checks = {
      length: pwd.length >= 12,
      uppercase: /[A-Z]/.test(pwd),
      lowercase: /[a-z]/.test(pwd),
      number: /[0-9]/.test(pwd),
      special: /[^A-Za-z0-9]/.test(pwd),
      avoidCommon: !/123|password|admin|qwerty/i.test(pwd)
    };

    // Calculate alphabet size
    let poolSize = 0;
    if (checks.lowercase) poolSize += 26;
    if (checks.uppercase) poolSize += 26;
    if (checks.number) poolSize += 10;
    if (checks.special) poolSize += 32;
    if (poolSize === 0) poolSize = 10; // Default fallback

    const entropy = Math.round(pwd.length * Math.log2(poolSize));

    let rating = "Weak";
    let color = "text-red-400";
    let bg = "bg-red-500/20";
    let pct = 25;

    if (entropy >= 75 && checks.length && checks.uppercase && checks.lowercase && checks.number && checks.special && checks.avoidCommon) {
      rating = "Strong";
      color = "text-emerald-400";
      bg = "bg-emerald-500/20";
      pct = 100;
    } else if (entropy >= 50 && pwd.length >= 8) {
      rating = "Moderate";
      color = "text-yellow-400";
      bg = "bg-yellow-500/20";
      pct = 60;
    }

    // Time estimate at 10 billion guesses/sec
    const guessesPerSec = 10000000000;
    const totalPossibilities = Math.pow(poolSize, pwd.length);
    const secondsToCrack = totalPossibilities / guessesPerSec;

    let timeMsg = "Instantly";
    if (secondsToCrack < 1) {
      timeMsg = "Instantly";
    } else if (secondsToCrack < 60) {
      timeMsg = `${Math.round(secondsToCrack)} seconds`;
    } else if (secondsToCrack < 3600) {
      timeMsg = `${Math.round(secondsToCrack / 60)} minutes`;
    } else if (secondsToCrack < 86400) {
      timeMsg = `${Math.round(secondsToCrack / 3600)} hours`;
    } else if (secondsToCrack < 31536000) {
      timeMsg = `${Math.round(secondsToCrack / 86400)} days`;
    } else if (secondsToCrack < 3153600000) {
      timeMsg = `${Math.round(secondsToCrack / 31536000)} years`;
    } else if (secondsToCrack < 315360000000) {
      timeMsg = `${Math.round(secondsToCrack / 3153600000)} centuries`;
    } else {
      timeMsg = "Billions of years";
    }

    return { rating, entropy, timeMsg, color, bg, pct, checks };
  };

  const pwMetrics = evaluatePassword(passwordInput);
  const isPasswordStrong = pwMetrics.rating === "Strong";

  const handlePasswordComplete = () => {
    completeGame("password-arena", 50);
    setActiveGameId(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Hero Banner */}
      <div className="glass-card rounded-3xl p-6 sm:p-10 border border-purple-500/30 relative overflow-hidden">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center space-x-2 bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full text-xs font-mono border border-purple-500/30">
            <Gamepad2 className="w-3.5 h-3.5 text-purple-400" />
            <span>Interactive Gamified Cyber Simulations</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-mono">
            CYBER GAMES <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-300 to-cyan-400">ARENA</span>
          </h1>
          <p className="text-gray-300 text-sm leading-relaxed">
            Sharpen your security reflexes in hands-on tactical mini-games. Test password entropy, spot deceptive spear phishing emails, and decode incident logs.
          </p>
        </div>
      </div>

      {/* Games Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {CYBER_GAMES.map(game => (
          <div
            key={game.id}
            className="glass-card glass-card-hover rounded-3xl p-6 border border-cyan-500/20 flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-start justify-between mb-4">
                <div className="w-14 h-14 rounded-2xl bg-[#060b1e] border border-cyan-500/30 flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
                  {game.icon}
                </div>
                <div className="flex flex-col items-end space-y-1">
                  <span className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full border ${
                    game.status === 'Available Now' 
                      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' 
                      : 'bg-purple-500/20 text-purple-300 border-purple-500/40'
                  }`}>
                    {game.status}
                  </span>
                  <span className="text-[10px] text-gray-400 font-mono">
                    {game.difficulty}
                  </span>
                </div>
              </div>

              <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                {game.title}
              </h3>
              <p className="text-xs text-gray-300 mt-2 leading-relaxed">
                {game.description}
              </p>

              {/* Feature Bullets */}
              <div className="mt-4 pt-3 border-t border-cyan-500/10 space-y-1.5">
                {game.features.map((feat, idx) => (
                  <div key={idx} className="flex items-center space-x-2 text-[11px] text-gray-400 font-mono">
                    <Sparkles className="w-3 h-3 text-cyan-400 shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-cyan-500/15 flex items-center justify-between">
              <div className="flex items-center space-x-1 text-xs font-mono font-bold text-yellow-400">
                <Zap className="w-3.5 h-3.5 fill-yellow-400" />
                <span>+50 XP Reward</span>
              </div>

              <button
                onClick={() => handleLaunchGame(game)}
                className={`px-4 py-2 rounded-xl text-xs font-mono font-bold flex items-center space-x-1.5 transition-all ${
                  game.status === 'Available Now'
                    ? 'neon-glow-btn text-white'
                    : 'bg-cyber-card border border-cyan-500/20 text-gray-400 hover:text-white'
                }`}
              >
                <Play className="w-3.5 h-3.5" />
                <span>{game.status === 'Available Now' ? 'LAUNCH LAB' : 'PREVIEW'}</span>
              </button>
            </div>

          </div>
        ))}
      </div>

      {/* --- PHISHING SPOTTER MINI-GAME MODAL --- */}
      {activeGameId === 'phishing-spotter' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-[#090f24] border-2 border-cyan-400/60 rounded-3xl p-6 sm:p-8 shadow-[0_0_50px_rgba(0,240,255,0.25)] space-y-6 my-8">
            
            <div className="flex items-center justify-between border-b border-cyan-500/20 pb-4">
              <div className="flex items-center space-x-3">
                <span className="text-3xl">🎣</span>
                <div>
                  <h3 className="text-lg font-bold text-white font-mono">Spot the Phishing Simulator</h3>
                  <p className="text-xs text-cyan-400 font-mono">Domain Analysis & Email Header Inspector</p>
                </div>
              </div>
              <button onClick={() => setActiveGameId(null)} className="text-gray-400 hover:text-white p-1">
                <X className="w-5 h-5" />
              </button>
            </div>

            {!phishFinished ? (
              <div className="space-y-6">
                
                {/* HUD Checkpoint Progress */}
                <div className="flex justify-between items-center text-xs font-mono text-gray-400">
                  <span>SCENARIO {phishIdx + 1} OF 5</span>
                  <div className="flex space-x-1">
                    {PHISHING_SCENARIOS.map((_, idx) => (
                      <span
                        key={idx}
                        className={`w-3.5 h-1.5 rounded-full ${
                          idx === phishIdx
                            ? 'bg-cyan-400'
                            : phishAnswers[idx] !== undefined
                            ? 'bg-purple-600'
                            : 'bg-cyan-950/80 border border-cyan-800'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Email Interface Mockup */}
                <div className="bg-[#050917] rounded-2xl border border-cyan-500/20 overflow-hidden shadow-inner font-sans">
                  
                  {/* Email Header Panel */}
                  <div className="bg-[#0c1228] p-4 border-b border-cyan-500/20 space-y-2 text-xs text-gray-300 font-mono">
                    <div className="flex justify-between">
                      <div>
                        <span className="text-gray-500">From: </span>
                        <span className="text-pink-400 font-semibold">{PHISHING_SCENARIOS[phishIdx].sender}</span>
                      </div>
                      <span className="text-gray-500">{PHISHING_SCENARIOS[phishIdx].date}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">To: </span>
                      <span>{PHISHING_SCENARIOS[phishIdx].recipient}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Subject: </span>
                      <span className="text-white font-bold">{PHISHING_SCENARIOS[phishIdx].subject}</span>
                    </div>
                    
                    {/* Attachment slot if present */}
                    {PHISHING_SCENARIOS[phishIdx].attachment && (
                      <div className="mt-2 pt-2 border-t border-cyan-500/10 flex items-center space-x-2">
                        <span className="text-gray-500">Attachment:</span>
                        <div className="bg-red-950/40 border border-red-500/40 text-red-300 px-3 py-1 rounded-lg text-[11px] font-bold flex items-center space-x-1.5 animate-pulse">
                          <span>📦</span>
                          <span>{PHISHING_SCENARIOS[phishIdx].attachment}</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Email Body Panel */}
                  <div className="p-5 text-sm text-gray-300 space-y-4 whitespace-pre-line leading-relaxed font-sans min-h-[140px]">
                    {PHISHING_SCENARIOS[phishIdx].body}
                    
                    {/* Embedded link if present */}
                    {PHISHING_SCENARIOS[phishIdx].linkText && (
                      <div className="pt-2">
                        <div className="inline-block bg-[#0e172e] border border-cyan-500/30 hover:border-cyan-400 px-4 py-2.5 rounded-xl text-xs font-mono text-cyan-300 font-bold transition-all select-none">
                          🔗 {PHISHING_SCENARIOS[phishIdx].linkText}
                          <div className="text-[10px] text-gray-500 font-normal mt-1 lowercase">
                            Hover target URL: {PHISHING_SCENARIOS[phishIdx].linkUrl}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                </div>

                {/* Classify Decision Choices */}
                {!phishShowExplanation ? (
                  <div className="grid grid-cols-3 gap-3">
                    <button
                      onClick={() => handlePhishAnswer("safe")}
                      className="p-3.5 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 hover:bg-emerald-950/40 text-emerald-300 font-mono text-xs font-bold transition-all text-center flex flex-col items-center justify-center space-y-1.5"
                    >
                      <span className="text-lg">✅</span>
                      <span>SAFE</span>
                    </button>
                    <button
                      onClick={() => handlePhishAnswer("suspicious")}
                      className="p-3.5 rounded-2xl bg-amber-950/20 border border-amber-500/30 hover:bg-amber-950/40 text-amber-300 font-mono text-xs font-bold transition-all text-center flex flex-col items-center justify-center space-y-1.5"
                    >
                      <span className="text-lg">⚠️</span>
                      <span>SUSPICIOUS</span>
                    </button>
                    <button
                      onClick={() => handlePhishAnswer("phishing")}
                      className="p-3.5 rounded-2xl bg-red-950/20 border border-red-500/30 hover:bg-red-950/40 text-red-300 font-mono text-xs font-bold transition-all text-center flex flex-col items-center justify-center space-y-1.5"
                    >
                      <span className="text-lg">🎣</span>
                      <span>PHISHING</span>
                    </button>
                  </div>
                ) : (
                  // Reveal Feedback Panel
                  <div className={`p-5 rounded-2xl border space-y-3 font-mono text-xs ${
                    phishAnswers[phishIdx] === PHISHING_SCENARIOS[phishIdx].correctAnswer
                      ? 'bg-emerald-950/30 border-emerald-500/50 text-emerald-300'
                      : 'bg-red-950/30 border-red-500/50 text-red-300'
                  }`}>
                    <div className="flex items-center space-x-2">
                      <span className="text-lg">
                        {phishAnswers[phishIdx] === PHISHING_SCENARIOS[phishIdx].correctAnswer ? '🏆' : '❌'}
                      </span>
                      <span className="font-bold uppercase tracking-wider">
                        {phishAnswers[phishIdx] === PHISHING_SCENARIOS[phishIdx].correctAnswer ? 'Correct Classification' : 'Incorrect Decision'}
                      </span>
                    </div>
                    <p className="text-gray-300 leading-relaxed font-sans">
                      {PHISHING_SCENARIOS[phishIdx].explanation}
                    </p>
                    <div className="pt-2 flex justify-end">
                      <button
                        onClick={handlePhishNext}
                        className="neon-glow-btn px-5 py-2.5 rounded-xl font-bold text-white text-xs flex items-center space-x-1.5"
                      >
                        <span>NEXT SCENARIO</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                )}

              </div>
            ) : (
              // Phishing Game Finish View
              <div className="text-center space-y-6 py-4">
                <div className="inline-flex p-4 rounded-3xl bg-cyan-500/20 border border-cyan-400/40 text-cyan-300">
                  <Shield className="w-12 h-12 text-yellow-400 animate-pulse" />
                </div>
                <h3 className="text-2xl font-bold text-white font-mono">SIMULATION COMPLETE!</h3>
                <p className="text-sm text-gray-300 font-mono">
                  You classified {getPhishingCorrectCount()} out of 5 cyber threats successfully.
                </p>

                <div className="inline-flex items-center justify-center p-4 bg-[#050917] border border-cyan-500/30 rounded-2xl font-mono text-xs text-yellow-400 space-x-2">
                  <Zap className="w-4 h-4 fill-yellow-400" />
                  <span>Flat +50 XP and Daily Streak Active!</span>
                </div>

                <div className="flex justify-center pt-2">
                  <button
                    onClick={handlePhishingComplete}
                    className="neon-glow-btn px-6 py-3 rounded-xl font-bold text-white text-xs font-mono"
                  >
                    COMPLETE CHALLENGE & AWARD XP
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      )}

      {/* --- PASSWORD ENTROPY MINI-GAME MODAL --- */}
      {activeGameId === 'password-arena' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-[#090f24] border-2 border-cyan-400/60 rounded-3xl p-6 sm:p-8 shadow-[0_0_50px_rgba(0,240,255,0.25)] space-y-6 my-8">
            
            <div className="flex items-center justify-between border-b border-cyan-500/20 pb-4">
              <div className="flex items-center space-x-3">
                <span className="text-3xl">🔑</span>
                <div>
                  <h3 className="text-lg font-bold text-white font-mono">Password Entropy Challenge</h3>
                  <p className="text-xs text-cyan-400 font-mono">Real-time Cracking Speed & Entropy Calculations</p>
                </div>
              </div>
              <button onClick={() => setActiveGameId(null)} className="text-gray-400 hover:text-white p-1">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-6">
              
              <div className="p-4 bg-cyan-950/30 border border-cyan-500/20 rounded-2xl text-xs text-gray-300 font-mono leading-relaxed space-y-2">
                <div className="font-bold text-cyan-300 uppercase">Challenge Directive:</div>
                <p className="font-sans text-[11px]">
                  Cybercriminals use advanced GPU rigs that process billions of hash guesses per second. 
                  To protect the platform vault, craft a password strong enough to withstand brute force. 
                  Reach a <strong className="text-emerald-400 font-mono">STRONG</strong> security rating by fulfilling all guidelines.
                </p>
              </div>

              {/* Password Input Fields */}
              <div className="space-y-2">
                <label className="text-xs font-mono text-gray-400">INPUT TEST PASSWORD</label>
                <div className="relative flex items-center">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    placeholder="Enter candidate password..."
                    className="w-full bg-[#050917] border border-cyan-500/30 focus:border-cyan-400 rounded-xl px-4 py-3 font-mono text-sm text-white focus:outline-none placeholder-gray-600 tracking-widest"
                  />
                  <button
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 text-gray-500 hover:text-white p-1 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Live Status HUD */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Entropy Gauge */}
                <div className="bg-[#050917] p-4 rounded-xl border border-cyan-500/10 space-y-2">
                  <div className="text-xs font-mono text-gray-400 flex justify-between">
                    <span>ENTROPY RATING</span>
                    <span className={`font-bold ${pwMetrics.color}`}>{pwMetrics.rating.toUpperCase()}</span>
                  </div>
                  
                  {/* Entropy progress bar */}
                  <div className="w-full bg-cyan-950/80 h-3 rounded-full overflow-hidden border border-cyan-500/20">
                    <div
                      className={`h-full transition-all duration-300 ${
                        pwMetrics.rating === 'Strong'
                          ? 'bg-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.5)]'
                          : pwMetrics.rating === 'Moderate'
                          ? 'bg-yellow-400'
                          : 'bg-red-400'
                      }`}
                      style={{ width: `${Math.min(pwMetrics.entropy, 100)}%` }}
                    />
                  </div>

                  <div className="flex justify-between text-[10px] font-mono text-gray-500 pt-1">
                    <span>{pwMetrics.entropy} Bits Calculated</span>
                    <span>Goal: 75+ Bits</span>
                  </div>
                </div>

                {/* Estimate Speed */}
                <div className="bg-[#050917] p-4 rounded-xl border border-cyan-500/10 flex flex-col justify-between">
                  <div className="text-xs font-mono text-gray-400">
                    CRACK TIME (10B GUESSES/SEC)
                  </div>
                  <div className={`text-xl font-mono font-bold mt-1 ${pwMetrics.color}`}>
                    {pwMetrics.timeMsg}
                  </div>
                  <span className="text-[10px] text-gray-500 font-mono">GPU cluster search speed</span>
                </div>

              </div>

              {/* Hardening Checklist Panel */}
              <div className="bg-[#050917] p-5 rounded-2xl border border-cyan-500/10 space-y-3 font-mono text-[11px]">
                <div className="text-xs text-gray-400 border-b border-cyan-500/10 pb-1.5">
                  PASSWORD HARDENING CHECKLIST
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  
                  <div className="flex items-center space-x-2">
                    <span className={`w-4 h-4 rounded-full flex items-center justify-center border text-[9px] font-bold ${
                      pwMetrics.checks.length
                        ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-400'
                        : 'bg-black/40 border-cyan-500/20 text-gray-500'
                    }`}>
                      {pwMetrics.checks.length ? '✓' : '×'}
                    </span>
                    <span className={pwMetrics.checks.length ? 'text-emerald-300' : 'text-gray-500'}>
                      At least 12 characters ({passwordInput.length})
                    </span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <span className={`w-4 h-4 rounded-full flex items-center justify-center border text-[9px] font-bold ${
                      pwMetrics.checks.uppercase
                        ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-400'
                        : 'bg-black/40 border-cyan-500/20 text-gray-500'
                    }`}>
                      {pwMetrics.checks.uppercase ? '✓' : '×'}
                    </span>
                    <span className={pwMetrics.checks.uppercase ? 'text-emerald-300' : 'text-gray-500'}>
                      Uppercase letter (A-Z)
                    </span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <span className={`w-4 h-4 rounded-full flex items-center justify-center border text-[9px] font-bold ${
                      pwMetrics.checks.lowercase
                        ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-400'
                        : 'bg-black/40 border-cyan-500/20 text-gray-500'
                    }`}>
                      {pwMetrics.checks.lowercase ? '✓' : '×'}
                    </span>
                    <span className={pwMetrics.checks.lowercase ? 'text-emerald-300' : 'text-gray-500'}>
                      Lowercase letter (a-z)
                    </span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <span className={`w-4 h-4 rounded-full flex items-center justify-center border text-[9px] font-bold ${
                      pwMetrics.checks.number
                        ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-400'
                        : 'bg-black/40 border-cyan-500/20 text-gray-500'
                    }`}>
                      {pwMetrics.checks.number ? '✓' : '×'}
                    </span>
                    <span className={pwMetrics.checks.number ? 'text-emerald-300' : 'text-gray-500'}>
                      Number digit (0-9)
                    </span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <span className={`w-4 h-4 rounded-full flex items-center justify-center border text-[9px] font-bold ${
                      pwMetrics.checks.special
                        ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-400'
                        : 'bg-black/40 border-cyan-500/20 text-gray-500'
                    }`}>
                      {pwMetrics.checks.special ? '✓' : '×'}
                    </span>
                    <span className={pwMetrics.checks.special ? 'text-emerald-300' : 'text-gray-500'}>
                      Special character (!@#$)
                    </span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <span className={`w-4 h-4 rounded-full flex items-center justify-center border text-[9px] font-bold ${
                      pwMetrics.checks.avoidCommon
                        ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-400'
                        : 'bg-black/40 border-cyan-500/20 text-gray-500'
                    }`}>
                      {pwMetrics.checks.avoidCommon ? '✓' : '×'}
                    </span>
                    <span className={pwMetrics.checks.avoidCommon ? 'text-emerald-300' : 'text-gray-500'}>
                      Avoids common patterns
                    </span>
                  </div>

                </div>

              </div>

              {/* Try presets */}
              <div className="space-y-2">
                <span className="text-xs font-mono text-gray-400">TRY REVEALING COMMON EXAMPLES:</span>
                <div className="flex flex-wrap gap-2">
                  {WEAK_PASSWORDS.map((pwObj, idx) => (
                    <button
                      key={idx}
                      onClick={() => setPasswordInput(pwObj.val)}
                      className="px-2.5 py-1.5 rounded-lg bg-[#0e172e] border border-cyan-500/20 hover:border-cyan-400/50 text-[10px] text-gray-400 font-mono transition-colors"
                      title={pwObj.label}
                    >
                      "{pwObj.val}"
                    </button>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div className="flex items-center justify-between border-t border-cyan-500/15 pt-4">
                <div className="text-xs font-mono text-yellow-400 flex items-center space-x-1">
                  <Zap className="w-4 h-4 fill-yellow-400" />
                  <span>+50 XP Reward Available</span>
                </div>
                
                <button
                  onClick={handlePasswordComplete}
                  disabled={!isPasswordStrong}
                  className={`px-6 py-2.5 rounded-xl font-bold text-white text-xs font-mono flex items-center space-x-2 transition-all ${
                    isPasswordStrong
                      ? 'neon-glow-btn'
                      : 'bg-cyan-950/20 border border-cyan-500/20 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>SUBMIT SECURED VAULT PASSWORD</span>
                </button>
              </div>

            </div>

          </div>
        </div>
      )}

    </div>
  );
};

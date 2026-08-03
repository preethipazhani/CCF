import React, { useState } from 'react';
import { CYBER_GAMES } from '../data/gamesData';
import { useAuth } from '../context/AuthContext';
import { Gamepad2, Zap, Shield, Lock, Play, Clock, Sparkles, CheckCircle2, X } from 'lucide-react';

export const CyberGamesPage = () => {
  const { triggerNotification } = useAuth();
  const [activeGameModal, setActiveGameModal] = useState(null);

  const handleLaunchGame = (game) => {
    if (game.status === 'Available Now') {
      setActiveGameModal(game);
    } else {
      triggerNotification(
        "Game Under Deployment",
        `"${game.title}" is scheduled for release in ${game.releaseDate}. Stay tuned!`,
        "🎮",
        "info"
      );
    }
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
                <span>+{game.xpReward} XP</span>
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

      {/* Interactive Demo Game Modal */}
      {activeGameModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-xl bg-[#090f24] border-2 border-cyan-400/60 rounded-3xl p-6 sm:p-8 shadow-[0_0_50px_rgba(0,240,255,0.25)] space-y-6">
            
            <div className="flex items-center justify-between border-b border-cyan-500/20 pb-4">
              <div className="flex items-center space-x-3">
                <span className="text-3xl">{activeGameModal.icon}</span>
                <div>
                  <h3 className="text-lg font-bold text-white font-mono">{activeGameModal.title}</h3>
                  <p className="text-xs text-cyan-400 font-mono">Interactive Security Training Sandbox</p>
                </div>
              </div>
              <button onClick={() => setActiveGameModal(null)} className="text-gray-400 hover:text-white p-1">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="bg-[#050917] p-5 rounded-2xl border border-cyan-500/20 space-y-4">
              <div className="text-xs font-mono text-cyan-300 font-bold uppercase">
                TRAINING SIMULATION CHECKPOINT
              </div>
              <p className="text-xs text-gray-300 leading-relaxed font-mono">
                [SIMULATED ENVIRONMENT]: The target system has received an unrecognized email payload from <code className="text-pink-400">admin@company-security-update.xyz</code> requesting root credential verification.
              </p>
              <div className="p-3 bg-red-950/40 border border-red-500/30 rounded-xl text-xs text-red-300 font-mono">
                Threat Detected: Typosquatting Domain & Credential Harvesting Script.
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="text-xs font-mono text-yellow-400 flex items-center space-x-1">
                <Zap className="w-4 h-4 fill-yellow-400" />
                <span>+{activeGameModal.xpReward} XP Reward Available</span>
              </div>
              <button
                onClick={() => {
                  triggerNotification("Simulation Complete!", `Mastered "${activeGameModal.title}"! Earned +${activeGameModal.xpReward} XP.`, "🎮", "success", activeGameModal.xpReward);
                  setActiveGameModal(null);
                }}
                className="neon-glow-btn px-6 py-2.5 rounded-xl font-bold text-white text-xs font-mono flex items-center space-x-2"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>SUBMIT DEFENSE RESPONSE</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

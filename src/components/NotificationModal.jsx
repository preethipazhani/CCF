import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Sparkles, Zap, CheckCircle, X } from 'lucide-react';

export const NotificationModal = () => {
  const { activeModal, closeModal } = useAuth();

  if (!activeModal) return null;

  const { title, message, icon, type, rewardXp } = activeModal;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-md bg-[#0a1026] border-2 border-cyan-400/60 rounded-3xl p-6 sm:p-8 shadow-[0_0_50px_rgba(0,240,255,0.25)] text-center overflow-hidden">
        
        {/* Ambient Top Glow */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-48 h-48 bg-gradient-to-br from-cyan-500/30 to-purple-600/30 rounded-full blur-2xl pointer-events-none" />

        {/* Close Icon */}
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 text-gray-400 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Icon Badge */}
        <div className="relative inline-flex items-center justify-center w-20 h-20 mb-5 rounded-2xl bg-gradient-to-tr from-cyan-500/20 via-purple-600/30 to-pink-500/20 border border-cyan-400/40 shadow-inner">
          <span className="text-4xl animate-bounce">{icon || '🎉'}</span>
          <Sparkles className="absolute -top-2 -right-2 w-6 h-6 text-yellow-400 animate-spin" style={{ animationDuration: '6s' }} />
        </div>

        {/* Title & Message */}
        <h3 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-white to-purple-300 mb-2 font-mono">
          {title}
        </h3>
        <p className="text-gray-300 text-sm leading-relaxed mb-6">
          {message}
        </p>

        {/* XP Bonus Badge */}
        {rewardXp > 0 && (
          <div className="inline-flex items-center space-x-2 bg-yellow-500/15 border border-yellow-500/40 px-4 py-2 rounded-2xl mb-6 text-yellow-400 font-bold font-mono text-sm shadow-md animate-pulse">
            <Zap className="w-5 h-5 fill-yellow-400 text-yellow-400" />
            <span>+{rewardXp} XP ADDED TO PROFILE</span>
          </div>
        )}

        {/* Action Button */}
        <div>
          <button
            onClick={closeModal}
            className="w-full neon-glow-btn py-3.5 px-6 rounded-2xl font-bold text-white tracking-wide text-sm flex items-center justify-center space-x-2"
          >
            <CheckCircle className="w-5 h-5" />
            <span>CONTINUE MISSION</span>
          </button>
        </div>

      </div>
    </div>
  );
};

import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Sparkles, CheckCircle, Info, AlertCircle } from 'lucide-react';

export const Toast = () => {
  const { toast } = useAuth();

  if (!toast) return null;

  const { message, type } = toast;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-bounce">
      <div className="glass-card px-5 py-3.5 rounded-2xl border border-cyan-400/60 shadow-[0_0_30px_rgba(0,240,255,0.3)] flex items-center space-x-3 bg-[#0a1026]">
        {type === 'success' ? (
          <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
        ) : (
          <Sparkles className="w-5 h-5 text-cyan-400 shrink-0" />
        )}
        <span className="text-xs font-mono font-bold text-white tracking-wide">
          {message}
        </span>
      </div>
    </div>
  );
};

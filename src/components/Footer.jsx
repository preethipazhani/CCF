import React from 'react';
import { Shield, Terminal, Heart, Lock, CheckCircle2 } from 'lucide-react';

export const Footer = ({ setActiveTab }) => {
  return (
    <footer className="mt-20 border-t border-cyan-500/20 bg-[#040711]/90 backdrop-blur-md py-12 text-gray-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          {/* Col 1: Brand & Tagline */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-500 to-purple-600 p-[1.5px]">
                <div className="w-full h-full bg-[#070b19] rounded-[6px] flex items-center justify-center">
                  <Shield className="w-4 h-4 text-cyan-400" />
                </div>
              </div>
              <span className="font-mono font-extrabold text-lg text-white tracking-wider">
                CYBER<span className="text-cyan-400">QUEST</span>
              </span>
            </div>
            <p className="text-sm text-gray-400 max-w-md leading-relaxed">
              Smart Security Awareness Training Platform designed for interactive employee & student cyber defense training, gamified assessments, and real-time threat response.
            </p>
            <div className="inline-flex items-center space-x-2 bg-emerald-950/60 border border-emerald-500/30 px-3 py-1 rounded-full text-xs text-emerald-400 font-mono">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Secure learning workspace • Enterprise ready</span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-white font-mono uppercase tracking-wider mb-4">
              Training Modules
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button onClick={() => setActiveTab('lessons')} className="hover:text-cyan-400 transition-colors">
                  🎣 Phishing Defense
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('lessons')} className="hover:text-cyan-400 transition-colors">
                  🔑 Password Hygiene & MFA
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('lessons')} className="hover:text-cyan-400 transition-colors">
                  🛡️ Malware & Ransomware
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('lessons')} className="hover:text-cyan-400 transition-colors">
                  🧠 Social Engineering
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: System Status & College Project */}
          <div>
            <h4 className="text-sm font-semibold text-white font-mono uppercase tracking-wider mb-4">
              System Defense
            </h4>
            <div className="space-y-3 text-xs font-mono">
              <div className="bg-cyber-card p-3 rounded-xl border border-cyan-500/20">
                <div className="text-gray-400 mb-1">Defense Status</div>
                <div className="text-cyan-300 font-bold flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                  <span>ACTIVE SHIELD v2.4</span>
                </div>
              </div>
              <div className="flex items-center space-x-2 text-gray-500">
                <Lock className="w-3.5 h-3.5 text-purple-400" />
                <span>Zero-Trust Architecture</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 font-mono gap-4">
          <div>
            © {new Date().getFullYear()} CyberQuest Platform. Built for modern security training teams.
          </div>
          <div className="flex items-center space-x-2 text-gray-400">
            <Terminal className="w-4 h-4 text-cyan-400" />
            <span>React • Tailwind • Secure authentication</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

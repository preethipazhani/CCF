import React from 'react';
import { LABS_DATA } from '../data/labsData';
import { ExternalLink, FlaskConical, ShieldAlert } from 'lucide-react';

export const AdvancedLabsPage = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Hero Banner */}
      <div className="glass-card rounded-3xl p-6 sm:p-10 border border-cyan-500/30 relative overflow-hidden">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center space-x-2 bg-cyan-500/20 text-cyan-300 px-3 py-1 rounded-full text-xs font-mono border border-cyan-500/30">
            <FlaskConical className="w-3.5 h-3.5 text-cyan-400" />
            <span>External Hands-On Practice Environments</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-mono">
            ADVANCED CYBER <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-300 to-pink-500">LABS</span>
          </h1>
          <p className="text-gray-300 text-sm leading-relaxed">
            Take your cybersecurity skills to the next level by practicing on world-class, external gamified platforms. Hack virtual machines, exploit web vulnerabilities, and respond to real-world threats.
          </p>
        </div>
      </div>

      {/* External Warning Alert */}
      <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-300 font-mono flex items-start space-x-3">
        <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold uppercase">External Resources Warning:</span> These training labs are hosted on third-party websites independent of CyberQuest. Clicking the links below will redirect you to these external platforms in a new tab.
        </div>
      </div>

      {/* Labs Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {LABS_DATA.map(lab => (
          <div
            key={lab.id}
            className="glass-card glass-card-hover rounded-3xl p-6 border border-cyan-500/20 flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-cyan-505/10 border border-cyan-500/20 flex items-center justify-center text-2xl font-bold text-cyan-400 font-mono">
                  {lab.name[0]}
                </div>
                <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full border bg-purple-500/10 text-purple-300 border-purple-500/30">
                  {lab.difficulty}
                </span>
              </div>

              <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                {lab.name}
              </h3>
              <p className="text-xs text-gray-300 mt-2 leading-relaxed h-16 line-clamp-3">
                {lab.description}
              </p>

              {/* Skills Covered */}
              <div className="mt-4 pt-3 border-t border-cyan-500/10">
                <div className="text-[10px] font-mono text-cyan-400 font-bold uppercase mb-1">
                  Core Domains Covered:
                </div>
                <p className="text-[11px] text-gray-400 font-sans leading-relaxed">
                  {lab.skills}
                </p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-cyan-500/15 flex items-center justify-end">
              <a
                href={lab.url}
                target="_blank"
                rel="noopener noreferrer"
                className="neon-glow-btn px-4 py-2.5 rounded-xl text-xs font-mono font-bold text-white flex items-center space-x-1.5 shadow-md"
              >
                <span>Visit Lab</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};

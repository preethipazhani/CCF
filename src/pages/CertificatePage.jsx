import React from 'react';
import { useAuth } from '../context/AuthContext';
import { getLevelInfo } from '../data/mockUser';
import { LESSONS_DATA } from '../data/lessonsData';
import { Award, Download, Printer, Shield, CheckCircle2, Zap, Lock } from 'lucide-react';

export const CertificatePage = () => {
  const { user } = useAuth();
  const levelInfo = getLevelInfo(user.xp);

  const totalLessons = LESSONS_DATA.length;
  const completedCount = user.completedLessons.length;
  const completionPercent = Math.round((completedCount / totalLessons) * 100);

  const issueDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const certId = `CQ-CERT-${user.name.replace(/\s+/g, '').toUpperCase()}-2026-X99`;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 print:p-0 print:m-0">
      
      {/* Top Banner (Hidden on Print) */}
      <div className="glass-card rounded-3xl p-6 border border-cyan-500/30 flex flex-col sm:flex-row items-center justify-between gap-4 print:hidden">
        <div>
          <div className="flex items-center space-x-2 text-cyan-400 font-mono text-xs mb-1">
            <Award className="w-4 h-4" />
            <span>OFFICIAL ACADEMIC CERTIFICATION</span>
          </div>
          <h1 className="text-2xl font-bold text-white font-mono">
            CYBER SECURITY AWARENESS CERTIFICATE
          </h1>
          <p className="text-xs text-gray-400 mt-1 font-mono">
            Course Completion Progress: <strong className="text-cyan-400">{completionPercent}%</strong> ({completedCount}/{totalLessons} Lessons Mastered)
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={handlePrint}
            className="neon-glow-btn px-6 py-3 rounded-xl font-bold text-white text-xs font-mono flex items-center space-x-2 shadow-lg"
          >
            <Printer className="w-4 h-4" />
            <span>PRINT / DOWNLOAD CERTIFICATE</span>
          </button>
        </div>
      </div>

      {/* Progress Status Bar (Hidden on Print) */}
      <div className="glass-card rounded-2xl p-4 border border-cyan-500/20 flex items-center justify-between print:hidden text-xs font-mono">
        <div className="flex items-center space-x-3">
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          <span>Status: Verified Operator • Grade: {completionPercent >= 80 ? 'Distinction High Honors' : 'Certified Specialist'}</span>
        </div>
        <div className="text-yellow-400 font-bold flex items-center space-x-1">
          <Zap className="w-4 h-4 fill-yellow-400" />
          <span>{user.xp} XP Certified</span>
        </div>
      </div>

      {/* CERTIFICATE CANVAS FRAME */}
      <div className="glass-card rounded-3xl p-8 sm:p-14 border-4 border-cyan-400/60 relative overflow-hidden bg-gradient-to-b from-[#0a1028] via-[#050814] to-[#0d1636] shadow-[0_0_60px_rgba(0,240,255,0.25)] text-center space-y-8 print:border-4 print:bg-white print:text-black">
        
        {/* Certificate Watermark Graphic */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

        {/* Decorative Inner Border */}
        <div className="border border-cyan-500/30 p-6 sm:p-10 rounded-2xl space-y-6">
          
          {/* Header Shield */}
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-cyan-500/20 border border-cyan-400/40 text-cyan-400 mx-auto">
            <Shield className="w-10 h-10 text-cyan-400" />
          </div>

          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-bold">
              CyberQuest International Security Institute
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-mono mt-2 tracking-tight">
              CERTIFICATE OF CYBER COMPETENCY
            </h2>
            <p className="text-xs text-gray-400 font-mono mt-1">
              THIS CERTIFIES THAT
            </p>
          </div>

          {/* User Name */}
          <div className="py-2">
            <span className="text-3xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-purple-300 to-pink-400 font-mono tracking-wide">
              {user.name}
            </span>
            <div className="w-64 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent mx-auto mt-3" />
          </div>

          {/* Description */}
          <p className="text-sm text-gray-300 max-w-2xl mx-auto leading-relaxed font-sans">
            has successfully completed the comprehensive <strong className="text-white">Smart Security Awareness Training Program</strong>, demonstrating advanced proficiency in email phishing defense, multi-factor password hygiene, ransomware isolation, social engineering mitigation, network encryption, and PII data privacy protocols.
          </p>

          {/* Metrics Grid */}
          <div className="grid grid-cols-3 gap-4 max-w-xl mx-auto py-4 bg-[#050917] p-4 rounded-2xl border border-cyan-500/20">
            <div>
              <div className="text-[10px] font-mono text-gray-400">TOTAL XP</div>
              <div className="text-lg font-bold text-yellow-400 font-mono">{user.xp} XP</div>
            </div>
            <div>
              <div className="text-[10px] font-mono text-gray-400">LEVEL REACHED</div>
              <div className="text-lg font-bold text-purple-300 font-mono">Level {levelInfo.level}</div>
            </div>
            <div>
              <div className="text-[10px] font-mono text-gray-400">VERIFICATION</div>
              <div className="text-xs font-bold text-emerald-400 font-mono mt-1 truncate">VERIFIED</div>
            </div>
          </div>

          {/* Signatures & Footer */}
          <div className="pt-8 grid grid-cols-2 gap-8 text-left border-t border-cyan-500/20">
            <div>
              <div className="text-xs text-gray-400 font-mono font-bold">ISSUED DATE</div>
              <div className="text-sm font-semibold text-white font-mono mt-1">{issueDate}</div>
              <div className="text-[10px] text-cyan-400 font-mono mt-2 truncate">
                HASH: {certId}
              </div>
            </div>

            <div className="text-right">
              <div className="font-mono text-cyan-400 text-sm font-bold tracking-widest uppercase">
                CYBERQUEST DEFENSE BOARD
              </div>
              <div className="text-xs text-gray-400 font-mono mt-1">Chief Academic Officer</div>
              <div className="text-[10px] text-emerald-400 font-mono mt-2">✓ Digital Signature Valid</div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};

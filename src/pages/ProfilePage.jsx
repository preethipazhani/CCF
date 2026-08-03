import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { BADGES_DEFINITION, getLevelInfo } from '../data/mockUser';
import { LESSONS_DATA } from '../data/lessonsData';
import { EditProfileModal } from '../components/EditProfileModal';
import { User, Mail, Zap, Shield, Award, Edit, RotateCcw, Lock, Flame, Calendar, Clock } from 'lucide-react';

export const ProfilePage = () => {
  const { user, resetProgress } = useAuth();
  const levelInfo = getLevelInfo(user.xp);
  const [editModalOpen, setEditModalOpen] = useState(false);

  const accuracyPercent = user.quizStats.totalAnswered > 0 
    ? Math.round((user.quizStats.correctAnswers / user.quizStats.totalAnswered) * 100)
    : 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header Profile Card */}
      <div className="glass-card rounded-3xl p-6 sm:p-10 border border-cyan-500/30 relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6 text-center sm:text-left">
          
          <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
            <div className="relative">
              <div className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-cyan-500 via-purple-500 to-pink-500 p-[2.5px] shadow-2xl shadow-cyan-500/30">
                <div className="w-full h-full bg-[#080d21] rounded-[22px] flex items-center justify-center text-5xl">
                  {user.avatar || '⚡'}
                </div>
              </div>
              <div className="absolute -bottom-2 -right-2 bg-yellow-400 text-black font-mono font-black text-xs px-2.5 py-1 rounded-full border border-yellow-200">
                Lvl {levelInfo.level}
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex items-center space-x-3 justify-center sm:justify-start">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white">{user.name}</h1>
                <span className="bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs px-3 py-1 rounded-full font-mono font-bold">
                  {levelInfo.rankTitle}
                </span>
              </div>
              <p className="text-gray-400 text-xs font-mono flex items-center justify-center sm:justify-start space-x-1.5">
                <Mail className="w-3.5 h-3.5 text-cyan-400" />
                <span>{user.email}</span>
              </p>
              <p className="text-xs text-gray-300 font-sans italic pt-1">
                "{user.bio || 'Cyber Cadet passionate about security awareness.'}"
              </p>
              <div className="pt-2 flex items-center justify-center sm:justify-start space-x-3 text-xs font-mono text-gray-300">
                <span className="bg-purple-950/60 border border-purple-500/30 px-3 py-1 rounded-lg">
                  🔥 {user.dailyLoginStreak} Day Streak
                </span>
                <span className="bg-emerald-950/60 border border-emerald-500/30 px-3 py-1 rounded-lg text-emerald-400">
                  🛡️ Active Operator
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => setEditModalOpen(true)}
              className="neon-glow-btn px-4 py-2.5 rounded-xl font-mono text-xs font-bold text-white flex items-center space-x-2 shadow-lg"
            >
              <Edit className="w-4 h-4" />
              <span>EDIT PROFILE</span>
            </button>

            <button
              onClick={resetProgress}
              className="p-2.5 rounded-xl bg-red-950/40 hover:bg-red-900/60 border border-red-500/30 text-red-400 transition-all"
              title="Reset baseline progress"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="glass-card p-5 rounded-2xl border border-cyan-500/20">
          <div className="text-xs font-mono text-gray-400 mb-1">TOTAL XP EARNED</div>
          <div className="text-3xl font-black text-yellow-400 font-mono flex items-center space-x-1">
            <Zap className="w-6 h-6 fill-yellow-400" />
            <span>{user.xp} XP</span>
          </div>
          <div className="text-[11px] text-gray-400 mt-2 font-mono">Next level at {levelInfo.level * 250} XP</div>
        </div>

        <div className="glass-card p-5 rounded-2xl border border-cyan-500/20">
          <div className="text-xs font-mono text-gray-400 mb-1">COMPLETED LESSONS</div>
          <div className="text-3xl font-black text-white font-mono">
            {user.completedLessons.length} / {LESSONS_DATA.length}
          </div>
          <div className="text-[11px] text-cyan-400 mt-2 font-mono">
            {Math.round((user.completedLessons.length / LESSONS_DATA.length) * 100)}% Modules Completed
          </div>
        </div>

        <div className="glass-card p-5 rounded-2xl border border-cyan-500/20">
          <div className="text-xs font-mono text-gray-400 mb-1">QUIZ ATTEMPTS</div>
          <div className="text-3xl font-black text-purple-300 font-mono">
            {user.quizStats.attempts}
          </div>
          <div className="text-[11px] text-purple-300 mt-2 font-mono">Highest Score: {user.quizStats.highestScore}%</div>
        </div>

        <div className="glass-card p-5 rounded-2xl border border-cyan-500/20">
          <div className="text-xs font-mono text-gray-400 mb-1">ACCURACY RATING</div>
          <div className="text-3xl font-black text-emerald-400 font-mono">
            {accuracyPercent}%
          </div>
          <div className="text-[11px] text-emerald-400 mt-2 font-mono">{user.quizStats.correctAnswers} / {user.quizStats.totalAnswered} Correct</div>
        </div>
      </div>

      {/* Badge Showcase */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 border border-pink-500/30 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-white font-mono flex items-center space-x-2">
              <Award className="w-5 h-5 text-pink-400" />
              <span>ACHIEVEMENT BADGE SHOWCASE</span>
            </h3>
            <p className="text-xs text-gray-400 mt-1">
              Unlocked ({user.unlockedBadges.length}/{BADGES_DEFINITION.length}) security honor badges
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {BADGES_DEFINITION.map(badge => {
            const isUnlocked = user.unlockedBadges.includes(badge.id);

            return (
              <div
                key={badge.id}
                className={`rounded-2xl p-4 border transition-all ${
                  isUnlocked
                    ? 'bg-gradient-to-br from-pink-950/30 via-cyber-card to-purple-950/30 border-pink-500/40 shadow-lg'
                    : 'bg-[#050814]/60 border-gray-800 opacity-50 grayscale'
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <span className="text-3xl">{badge.icon}</span>
                  {isUnlocked ? (
                    <span className="text-[10px] font-mono font-bold bg-pink-500/20 text-pink-300 border border-pink-500/40 px-2 py-0.5 rounded-full">
                      UNLOCKED
                    </span>
                  ) : (
                    <span className="text-[10px] font-mono text-gray-500 flex items-center space-x-1">
                      <Lock className="w-3 h-3" />
                      <span>LOCKED</span>
                    </span>
                  )}
                </div>

                <h4 className="text-sm font-bold text-white font-mono">{badge.title}</h4>
                <p className="text-xs text-gray-400 mt-1 leading-relaxed">{badge.description}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Edit Profile Modal */}
      <EditProfileModal
        isOpen={editModalOpen}
        onClose={() => setEditModalOpen(false)}
      />

    </div>
  );
};

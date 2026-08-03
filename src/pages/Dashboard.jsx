import React from 'react';
import { useAuth } from '../context/AuthContext';
import { getLevelInfo, DAILY_CHALLENGE, BADGES_DEFINITION } from '../data/mockUser';
import { LESSONS_DATA } from '../data/lessonsData';
import { WeeklyProgressChart } from '../components/WeeklyProgressChart';
import { 
  Zap, Award, Flame, BookOpen, ArrowRight, ShieldCheck, 
  HelpCircle, Trophy, CheckCircle, Clock, Star, Sparkles, Activity, CheckCircle2
} from 'lucide-react';

export const Dashboard = ({ setActiveTab, setSelectedLessonId }) => {
  const { user, claimDailyChallenge, leaderboardUsers } = useAuth();
  const levelInfo = getLevelInfo(user.xp);

  const nextLesson = LESSONS_DATA.find(l => !user.completedLessons.includes(l.id)) || LESSONS_DATA[0];
  const completedLessonsList = LESSONS_DATA.filter(l => user.completedLessons.includes(l.id));

  const topUsers = leaderboardUsers.slice(0, 3);

  const handleStartLesson = (lessonId) => {
    setSelectedLessonId(lessonId);
    setActiveTab('lesson-detail');
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Welcome Banner */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 border border-cyan-500/30 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-cyan-500/10 via-purple-600/10 to-transparent rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center space-x-5">
            <div className="relative">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-tr from-cyan-500 via-purple-500 to-pink-500 p-[2px] shadow-lg shadow-cyan-500/20">
                <div className="w-full h-full bg-[#080d21] rounded-[14px] flex items-center justify-center text-3xl sm:text-4xl">
                  {user.avatar || '⚡'}
                </div>
              </div>
              <div className="absolute -bottom-1 -right-1 bg-cyan-500 text-[#070b19] font-mono font-black text-[10px] px-2 py-0.5 rounded-full border border-cyan-300">
                LVL {levelInfo.level}
              </div>
            </div>

            <div>
              <div className="flex items-center space-x-3">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-purple-300">{user.name}</span>
                </h1>
                <span className="bg-purple-500/20 text-purple-300 border border-purple-500/30 text-xs px-3 py-1 rounded-full font-mono font-bold hidden sm:inline-block">
                  {levelInfo.rankTitle}
                </span>
              </div>
              <p className="text-gray-400 text-sm mt-1 font-mono">
                System Status: <span className="text-emerald-400 font-semibold">Active Shield Protected</span> • Login Streak: <span className="text-yellow-400 font-bold">{user.dailyLoginStreak} Days 🔥</span>
              </p>
            </div>
          </div>

          <button
            onClick={() => handleStartLesson(nextLesson.id)}
            className="neon-glow-btn px-6 py-3 rounded-2xl font-bold text-white text-sm flex items-center space-x-2 shadow-lg w-full md:w-auto justify-center"
          >
            <BookOpen className="w-4 h-4" />
            <span>CONTINUE LEARNING ({user.completedLessons.length}/{LESSONS_DATA.length})</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Core Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="glass-card glass-card-hover p-5 rounded-2xl border border-cyan-500/20">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-mono text-gray-400 uppercase">Total XP Earned</span>
            <div className="p-2.5 rounded-xl bg-yellow-500/10 border border-yellow-500/30 text-yellow-400">
              <Zap className="w-5 h-5 fill-yellow-400" />
            </div>
          </div>
          <div className="text-3xl font-black text-white font-mono">{user.xp} <span className="text-sm text-yellow-400">XP</span></div>
          <div className="text-xs text-gray-400 mt-2 font-mono flex items-center space-x-1">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>+{user.completedLessons.length * 100} XP from lessons</span>
          </div>
        </div>

        <div className="glass-card glass-card-hover p-5 rounded-2xl border border-cyan-500/20">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-mono text-gray-400 uppercase">Current Tier</span>
            <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-black text-white font-mono">Level {levelInfo.level}</div>
          <div className="text-xs text-cyan-300 mt-2 font-mono truncate">Title: {levelInfo.rankTitle}</div>
        </div>

        <div className="glass-card glass-card-hover p-5 rounded-2xl border border-cyan-500/20">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-mono text-gray-400 uppercase">Lessons Mastered</span>
            <div className="p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-400">
              <BookOpen className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-black text-white font-mono">
            {user.completedLessons.length} <span className="text-sm text-gray-500">/ {LESSONS_DATA.length}</span>
          </div>
          <div className="text-xs text-purple-300 mt-2 font-mono">
            {Math.round((user.completedLessons.length / LESSONS_DATA.length) * 100)}% Modules Completed
          </div>
        </div>

        <div className="glass-card glass-card-hover p-5 rounded-2xl border border-cyan-500/20">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-mono text-gray-400 uppercase">Badges Earned</span>
            <div className="p-2.5 rounded-xl bg-pink-500/10 border border-pink-500/30 text-pink-400">
              <Award className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-black text-white font-mono">
            {user.unlockedBadges.length} <span className="text-sm text-gray-500">/ {BADGES_DEFINITION.length}</span>
          </div>
          <div className="text-xs text-pink-300 mt-2 font-mono">Security Honor Badges</div>
        </div>
      </div>

      {/* Level Progress Bar */}
      <div className="glass-card rounded-2xl p-6 border border-cyan-500/30">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-3 gap-2">
          <div>
            <div className="text-sm font-bold text-white font-mono flex items-center space-x-2">
              <span>LEVEL {levelInfo.level} PROGRESS</span>
              <span className="text-cyan-400">({levelInfo.currentLevelXp} / {levelInfo.xpPerLevel} XP)</span>
            </div>
            <p className="text-xs text-gray-400 mt-0.5 font-mono">
              Earn {levelInfo.xpPerLevel - levelInfo.currentLevelXp} more XP to reach Level {levelInfo.level + 1}
            </p>
          </div>
          <div className="text-sm font-black text-cyan-400 font-mono">
            {levelInfo.progressPercent}%
          </div>
        </div>

        <div className="w-full bg-[#050917] h-4 rounded-full p-0.5 border border-cyan-500/30 overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 rounded-full transition-all duration-700 shadow-[0_0_15px_rgba(0,240,255,0.5)]"
            style={{ width: `${levelInfo.progressPercent}%` }}
          />
        </div>
      </div>

      {/* Weekly Progress Chart */}
      <WeeklyProgressChart />

      {/* Main Grid: Daily Challenge, Continue Learning, Leaderboard Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          
          {/* Daily Challenge Card */}
          <div className="glass-card rounded-3xl p-6 border-2 border-yellow-500/30 relative overflow-hidden bg-gradient-to-r from-yellow-950/20 via-cyber-card to-cyber-card">
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-2xl bg-yellow-500/20 border border-yellow-500/40 flex items-center justify-center text-yellow-400">
                  <Flame className="w-7 h-7 fill-yellow-400 text-yellow-400 animate-pulse" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-mono font-bold text-yellow-400 uppercase tracking-widest">
                      Daily Operator Challenge
                    </span>
                    <span className="bg-yellow-500/20 text-yellow-300 text-[10px] font-mono px-2 py-0.5 rounded-full">
                      +75 XP Bonus
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white mt-1">
                    {DAILY_CHALLENGE.title}
                  </h3>
                  <p className="text-xs text-gray-300 mt-1 max-w-lg">
                    {DAILY_CHALLENGE.description}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-5 pt-4 border-t border-yellow-500/20 flex items-center justify-between">
              <div className="text-xs text-gray-400 font-mono flex items-center space-x-1.5">
                <Clock className="w-4 h-4 text-yellow-400" />
                <span>Resets in 14 hours 22 mins</span>
              </div>

              {user.dailyChallengeClaimed ? (
                <div className="inline-flex items-center space-x-1.5 text-xs font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-4 py-2 rounded-xl">
                  <CheckCircle className="w-4 h-4" />
                  <span>CLAIMED (+75 XP)</span>
                </div>
              ) : (
                <button
                  onClick={claimDailyChallenge}
                  className="bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-400 hover:to-amber-500 text-black font-extrabold text-xs px-5 py-2.5 rounded-xl font-mono shadow-lg transition-all flex items-center space-x-1.5"
                >
                  <Zap className="w-4 h-4 fill-black" />
                  <span>CLAIM DAILY BONUS (+75 XP)</span>
                </button>
              )}
            </div>
          </div>

          {/* Continue Learning Spotlight */}
          <div className="glass-card rounded-3xl p-6 border border-cyan-500/30">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-white font-mono flex items-center space-x-2">
                <BookOpen className="w-5 h-5 text-cyan-400" />
                <span>RECOMMENDED NEXT LESSON</span>
              </h3>
              <button 
                onClick={() => setActiveTab('lessons')}
                className="text-xs text-cyan-400 hover:underline font-mono"
              >
                View All Lessons →
              </button>
            </div>

            <div className="bg-[#060b1e] rounded-2xl p-5 border border-cyan-500/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center space-x-4">
                <div className="w-14 h-14 rounded-2xl bg-cyan-950/60 border border-cyan-500/40 flex items-center justify-center text-3xl shrink-0">
                  {nextLesson.icon}
                </div>
                <div>
                  <div className="text-xs text-cyan-400 font-mono">{nextLesson.category} • {nextLesson.readTime}</div>
                  <h4 className="text-base font-bold text-white mt-0.5">{nextLesson.title}</h4>
                  <p className="text-xs text-gray-400 line-clamp-1 mt-1">{nextLesson.subtitle}</p>
                </div>
              </div>

              <button
                onClick={() => handleStartLesson(nextLesson.id)}
                className="neon-glow-btn px-5 py-2.5 rounded-xl text-xs font-bold text-white shrink-0 font-mono flex items-center space-x-1"
              >
                <span>START LESSON (+{nextLesson.xpReward} XP)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Recently Completed Lessons */}
          {completedLessonsList.length > 0 && (
            <div className="glass-card rounded-3xl p-6 border border-emerald-500/30">
              <h3 className="text-base font-bold text-white font-mono flex items-center space-x-2 mb-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <span>RECENTLY MASTERED LESSONS</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {completedLessonsList.map(l => (
                  <div key={l.id} className="p-3 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 flex items-center space-x-3">
                    <span className="text-2xl">{l.icon}</span>
                    <div className="min-w-0">
                      <div className="text-xs font-bold text-white truncate">{l.title}</div>
                      <div className="text-[10px] text-emerald-400 font-mono">{l.category} • +{l.xpReward} XP Earned</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Right Col: Mini Leaderboard & Quick Quiz */}
        <div className="space-y-8">
          <div className="glass-card rounded-3xl p-6 border border-purple-500/30">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-white font-mono flex items-center space-x-2">
                <Trophy className="w-5 h-5 text-yellow-400" />
                <span>TOP OPERATORS</span>
              </h3>
              <button
                onClick={() => setActiveTab('leaderboard')}
                className="text-xs text-cyan-400 hover:underline font-mono"
              >
                View All →
              </button>
            </div>

            <div className="space-y-3">
              {topUsers.map((u) => (
                <div 
                  key={u.rank}
                  className="flex items-center justify-between p-3 rounded-2xl bg-[#060b1e] border border-cyan-500/10 hover:border-cyan-500/30 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <span className={`w-6 h-6 rounded-full font-mono text-xs font-bold flex items-center justify-center ${
                      u.rank === 1 ? 'bg-yellow-500 text-black' :
                      u.rank === 2 ? 'bg-slate-300 text-black' :
                      'bg-amber-700 text-white'
                    }`}>
                      {u.rank}
                    </span>
                    <span className="text-xl">{u.avatar}</span>
                    <div>
                      <div className="text-sm font-semibold text-white">{u.name}</div>
                      <div className="text-[10px] text-gray-400 font-mono">Level {u.level} • {u.badgeTitle}</div>
                    </div>
                  </div>

                  <div className="text-xs font-mono font-bold text-yellow-400">
                    {u.xp} XP
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-card rounded-3xl p-6 border border-pink-500/30 text-center space-y-3 bg-gradient-to-b from-pink-950/20 to-cyber-card">
            <div className="inline-flex p-3 rounded-2xl bg-pink-500/20 text-pink-400 border border-pink-500/30">
              <HelpCircle className="w-6 h-6" />
            </div>
            <h4 className="text-base font-bold text-white font-mono">
              Ready for the Cyber Assessment?
            </h4>
            <p className="text-xs text-gray-300 leading-relaxed">
              Test your security knowledge across 10 questions to earn bonus XP and unlock badges!
            </p>
            <button
              onClick={() => setActiveTab('quiz')}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white font-bold font-mono text-xs shadow-lg transition-all"
            >
              LAUNCH QUIZ MODULE
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};

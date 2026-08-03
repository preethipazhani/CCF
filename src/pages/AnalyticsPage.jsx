import React from 'react';
import { ANALYTICS_MOCK } from '../data/analyticsData';
import { useAuth } from '../context/AuthContext';
import { WeeklyProgressChart } from '../components/WeeklyProgressChart';
import { BarChart2, Shield, Zap, Trophy, Target, Activity } from 'lucide-react';

export const AnalyticsPage = () => {
  const { user, quizHistory } = useAuth();
  const masteryData = ANALYTICS_MOCK.topicMastery;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header Banner */}
      <div className="glass-card rounded-3xl p-6 sm:p-10 border border-cyan-500/30 relative overflow-hidden">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center space-x-2 bg-cyan-500/20 text-cyan-300 px-3 py-1 rounded-full text-xs font-mono border border-cyan-500/30">
            <BarChart2 className="w-3.5 h-3.5 text-cyan-400" />
            <span>Interactive Threat Metrics & Training Analytics</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-mono">
            SECURITY PERFORMANCE <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-300 to-pink-400">ANALYTICS</span>
          </h1>
          <p className="text-gray-300 text-sm leading-relaxed">
            Track your security awareness progression, domain mastery levels, historical assessment scores, and weekly activity metrics.
          </p>
        </div>
      </div>

      {/* Top Chart Row: Weekly Progress & Topic Mastery */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Weekly Activity SVG Chart */}
        <WeeklyProgressChart />

        {/* Topic Mastery Bar Charts */}
        <div className="glass-card rounded-3xl p-6 border border-purple-500/30 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white font-mono flex items-center space-x-2">
              <Target className="w-5 h-5 text-purple-400" />
              <span>THREAT DOMAIN MASTERY</span>
            </h3>
            <span className="text-xs text-purple-300 font-mono">6 Categories</span>
          </div>

          <div className="space-y-3.5 pt-2">
            {masteryData.map((item, idx) => (
              <div key={idx} className="space-y-1 font-mono">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-300 flex items-center space-x-2">
                    <span className="text-lg">{item.icon}</span>
                    <span className="font-semibold text-white">{item.topic}</span>
                  </span>
                  <span className="font-bold text-cyan-400">{item.mastery}%</span>
                </div>

                <div className="w-full bg-[#050917] h-2.5 rounded-full p-0.5 border border-cyan-500/20">
                  <div 
                    className="h-full rounded-full transition-all duration-700 shadow-sm"
                    style={{ 
                      width: `${item.mastery}%`,
                      backgroundColor: item.color 
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Quiz History Performance Table */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 border border-cyan-500/20 space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-white font-mono flex items-center space-x-2">
            <Activity className="w-5 h-5 text-cyan-400" />
            <span>HISTORICAL ASSESSMENT LOGS</span>
          </h3>
          <span className="text-xs text-gray-400 font-mono">
            Total Attempts: {user.quizStats.attempts}
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left font-mono">
            <thead>
              <tr className="border-b border-cyan-500/20 text-xs text-gray-400 uppercase">
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Quiz Suite</th>
                <th className="py-3 px-4">Score Grade</th>
                <th className="py-3 px-4 text-right">XP Earned</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-cyan-500/10 text-sm">
              {quizHistory.length === 0 ? (
                <tr>
                  <td colSpan="4" className="py-6 text-center text-xs text-gray-500">
                    No quizzes attempted yet. Take the Quiz Module to populate stats!
                  </td>
                </tr>
              ) : (
                quizHistory.map((q, idx) => (
                  <tr key={idx} className="hover:bg-white/5 transition-colors">
                    <td className="py-3 px-4 text-xs text-gray-400">{q.date}</td>
                    <td className="py-3 px-4 font-semibold text-white">{q.topic}</td>
                    <td className="py-3 px-4">
                      <span className={`text-xs px-2.5 py-0.5 rounded-full font-bold ${
                        q.score >= 80 ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' :
                        q.score >= 60 ? 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30' :
                        'bg-red-500/20 text-red-300 border border-red-500/30'
                      }`}>
                        {q.score}%
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right text-yellow-400 font-bold">
                      +{q.xpEarned} XP
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

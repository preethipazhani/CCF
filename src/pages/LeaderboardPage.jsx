import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Trophy, Award, Flame, Search, Crown, Shield, Zap, Sparkles, Calendar } from 'lucide-react';

export const LeaderboardPage = () => {
  const { user, leaderboardUsers } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [timeframe, setTimeframe] = useState('all-time'); // 'all-time' | 'weekly'

  const updatedLeaderboard = leaderboardUsers
    .map((item) => ({
      ...item,
      xp: item.isCurrentUser ? user.xp : item.xp,
      level: item.isCurrentUser ? Math.floor(user.xp / 250) + 1 : item.level,
      badgesCount: item.isCurrentUser ? user.unlockedBadges.length : item.badgesCount,
      streakDays: item.isCurrentUser ? user.dailyLoginStreak : item.streakDays
    }))
    .sort((a, b) => b.xp - a.xp)
    .map((item, index) => ({
      ...item,
      rank: index + 1
    }));

  const filteredBoard = updatedLeaderboard.filter(u => 
    u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="glass-card rounded-3xl p-6 sm:p-10 border border-purple-500/30 relative overflow-hidden">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center space-x-2 bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full text-xs font-mono border border-purple-500/30">
            <Trophy className="w-3.5 h-3.5 text-yellow-400" />
            <span>Global Defense Standings</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-mono">
            CYBER OPERATOR <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-purple-300 to-cyan-400">LEADERBOARD</span>
          </h1>
          <p className="text-gray-300 text-sm leading-relaxed">
            Compete with fellow security cadets and threat hunters. Earn XP by mastering lessons and completing assessments to climb the rankings!
          </p>
        </div>
      </div>

      {/* Podium Top 3 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
        {updatedLeaderboard[1] && (
          <div className="glass-card rounded-3xl p-6 border border-slate-400/30 text-center relative overflow-hidden order-2 md:order-1 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="inline-flex p-3 rounded-2xl bg-slate-300/10 text-slate-300 border border-slate-400/30 mb-2">
                <Crown className="w-6 h-6 text-slate-300" />
              </div>
              <div className="text-4xl">{updatedLeaderboard[1].avatar}</div>
              <div className="font-bold text-white text-lg">{updatedLeaderboard[1].name}</div>
              <div className="text-xs text-cyan-400 font-mono">{updatedLeaderboard[1].title}</div>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-400/20 flex items-center justify-between text-xs font-mono">
              <span className="text-slate-300 font-bold">RANK #2</span>
              <span className="text-yellow-400 font-extrabold">{updatedLeaderboard[1].xp} XP</span>
            </div>
          </div>
        )}

        {updatedLeaderboard[0] && (
          <div className="glass-card rounded-3xl p-8 border-2 border-yellow-500/50 text-center relative overflow-hidden order-1 md:order-2 shadow-[0_0_40px_rgba(245,158,11,0.2)] bg-gradient-to-b from-yellow-950/20 to-cyber-card flex flex-col justify-between scale-105">
            <div className="space-y-3">
              <div className="inline-flex p-3 rounded-2xl bg-yellow-500/20 text-yellow-400 border border-yellow-500/40 mb-2">
                <Crown className="w-8 h-8 text-yellow-400 animate-bounce" />
              </div>
              <div className="text-5xl">{updatedLeaderboard[0].avatar}</div>
              <div className="font-extrabold text-white text-xl">{updatedLeaderboard[0].name}</div>
              <div className="text-xs text-yellow-400 font-mono font-bold">{updatedLeaderboard[0].title}</div>
            </div>
            <div className="mt-4 pt-3 border-t border-yellow-500/30 flex items-center justify-between text-sm font-mono">
              <span className="text-yellow-400 font-black">CHAMPION #1</span>
              <span className="text-yellow-400 font-extrabold text-base">{updatedLeaderboard[0].xp} XP</span>
            </div>
          </div>
        )}

        {updatedLeaderboard[2] && (
          <div className="glass-card rounded-3xl p-6 border border-amber-600/30 text-center relative overflow-hidden order-3 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="inline-flex p-3 rounded-2xl bg-amber-600/10 text-amber-500 border border-amber-600/30 mb-2">
                <Crown className="w-6 h-6 text-amber-500" />
              </div>
              <div className="text-4xl">{updatedLeaderboard[2].avatar}</div>
              <div className="font-bold text-white text-lg">{updatedLeaderboard[2].name}</div>
              <div className="text-xs text-cyan-400 font-mono">{updatedLeaderboard[2].title}</div>
            </div>
            <div className="mt-4 pt-3 border-t border-amber-600/20 flex items-center justify-between text-xs font-mono">
              <span className="text-amber-500 font-bold">RANK #3</span>
              <span className="text-yellow-400 font-extrabold">{updatedLeaderboard[2].xp} XP</span>
            </div>
          </div>
        )}
      </div>

      {/* Filter Tabs & Search */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 border border-cyan-500/20 space-y-6">
        
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <h3 className="text-xl font-bold text-white font-mono flex items-center space-x-2">
              <Shield className="w-5 h-5 text-cyan-400" />
              <span>FULL OPERATOR STANDINGS</span>
            </h3>

            {/* Timeframe Filter Tabs */}
            <div className="flex bg-[#050917] p-1 rounded-xl border border-cyan-500/20 text-xs font-mono">
              <button
                onClick={() => setTimeframe('all-time')}
                className={`px-3 py-1 rounded-lg font-bold transition-all ${
                  timeframe === 'all-time' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/40' : 'text-gray-400'
                }`}
              >
                All-Time
              </button>
              <button
                onClick={() => setTimeframe('weekly')}
                className={`px-3 py-1 rounded-lg font-bold transition-all ${
                  timeframe === 'weekly' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/40' : 'text-gray-400'
                }`}
              >
                Weekly Sprint
              </button>
            </div>
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3.5 top-3 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search operators..."
              className="w-full bg-cyber-card border border-cyan-500/20 focus:border-cyan-400 rounded-xl py-2 pl-10 pr-4 text-xs text-white placeholder-gray-500 focus:outline-none font-mono"
            />
          </div>
        </div>

        {/* Table View */}
        <div className="overflow-x-auto">
          <table className="w-full text-left font-mono">
            <thead>
              <tr className="border-b border-cyan-500/20 text-xs text-gray-400 uppercase">
                <th className="py-4 px-4">Rank</th>
                <th className="py-4 px-4">Operator</th>
                <th className="py-4 px-4">Level & Tier</th>
                <th className="py-4 px-4">Badges</th>
                <th className="py-4 px-4 text-right">Total XP</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-cyan-500/10 text-sm">
              {filteredBoard.map(u => (
                <tr 
                  key={u.rank}
                  className={`transition-colors ${
                    u.isCurrentUser 
                      ? 'bg-cyan-500/15 border-l-4 border-cyan-400 font-bold' 
                      : 'hover:bg-white/5'
                  }`}
                >
                  <td className="py-4 px-4">
                    <span className={`inline-flex items-center justify-center w-7 h-7 rounded-lg text-xs font-bold ${
                      u.rank === 1 ? 'bg-yellow-500 text-black' :
                      u.rank === 2 ? 'bg-slate-300 text-black' :
                      u.rank === 3 ? 'bg-amber-700 text-white' :
                      'bg-cyber-card text-gray-400 border border-cyan-500/20'
                    }`}>
                      #{u.rank}
                    </span>
                  </td>

                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{u.avatar}</span>
                      <div>
                        <div className="text-white font-semibold flex items-center space-x-2">
                          <span>{u.name}</span>
                          {u.isCurrentUser && (
                            <span className="bg-cyan-500/30 text-cyan-300 text-[10px] px-2 py-0.5 rounded-full border border-cyan-400/40">
                              YOU
                            </span>
                          )}
                        </div>
                        <div className="text-xs text-gray-400">{u.title}</div>
                      </div>
                    </div>
                  </td>

                  <td className="py-4 px-4">
                    <div className="text-xs text-purple-300">Level {u.level}</div>
                    <div className="text-[11px] text-gray-400">{u.badgeTitle}</div>
                  </td>

                  <td className="py-4 px-4">
                    <div className="inline-flex items-center space-x-1 text-xs text-pink-300 bg-pink-950/40 border border-pink-500/30 px-2.5 py-1 rounded-lg">
                      <Award className="w-3.5 h-3.5 text-pink-400" />
                      <span>{u.badgesCount} Badges</span>
                    </div>
                  </td>

                  <td className="py-4 px-4 text-right">
                    <div className="text-yellow-400 font-bold flex items-center justify-end space-x-1">
                      <Zap className="w-4 h-4 fill-yellow-400" />
                      <span>{u.xp} XP</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>

    </div>
  );
};

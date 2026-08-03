import React from 'react';
import { TrendingUp, Calendar } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const WeeklyProgressChart = () => {
  const { user, quizHistory } = useAuth();
  const historyItems = quizHistory || [];

  const dayLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const data = dayLabels.map((day, index) => {
    const date = new Date();
    date.setDate(date.getDate() - (dayLabels.length - 1 - index));
    const label = date.toISOString().split('T')[0];
    const earnedXp = historyItems
      .filter((entry) => entry.date === label)
      .reduce((sum, entry) => sum + (entry.xpEarned || 0), 0);
    const lessonBonus = index === dayLabels.length - 1 && (user.completedLessons?.length || 0) > 0 ? 25 : 0;
    return { day, xp: earnedXp + lessonBonus };
  });

  const maxXp = Math.max(...data.map((item) => item.xp), 1);

  return (
    <div className="glass-card rounded-3xl p-6 border border-cyan-500/30 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-bold text-white font-mono flex items-center space-x-2">
            <TrendingUp className="w-5 h-5 text-cyan-400" />
            <span>WEEKLY LEARNING & XP PROGRESS</span>
          </h3>
          <p className="text-xs text-gray-400 mt-0.5 font-mono">
            7-Day Activity Stream • Total: {data.reduce((acc, curr) => acc + curr.xp, 0)} XP
          </p>
        </div>

        <div className="inline-flex items-center space-x-1.5 text-xs text-cyan-300 bg-cyan-500/10 border border-cyan-500/20 px-3 py-1 rounded-full font-mono">
          <Calendar className="w-3.5 h-3.5" />
          <span>THIS WEEK</span>
        </div>
      </div>

      {/* SVG Bar Graph */}
      <div className="pt-4 flex items-end justify-between gap-2 h-44 border-b border-cyan-500/20 pb-2">
        {data.map((item, idx) => {
          const heightPercent = Math.round((item.xp / maxXp) * 100);

          return (
            <div key={idx} className="flex-1 flex flex-col items-center gap-2 group h-full justify-end">
              
              {/* Tooltip on hover */}
              <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-cyan-950 text-cyan-300 text-[10px] font-mono px-2 py-0.5 rounded border border-cyan-400/40 pointer-events-none mb-1">
                {item.xp} XP
              </div>

              {/* Animated Bar */}
              <div className="w-full bg-[#050917] rounded-t-xl h-full flex items-end p-1 border border-cyan-500/10">
                <div
                  className="w-full bg-gradient-to-t from-cyan-600 via-purple-500 to-pink-500 rounded-t-lg transition-all duration-500 group-hover:brightness-125 shadow-[0_0_10px_rgba(0,240,255,0.4)]"
                  style={{ height: `${heightPercent}%` }}
                />
              </div>

              {/* Day Label */}
              <span className="text-xs font-mono font-bold text-gray-400 group-hover:text-cyan-300">
                {item.day}
              </span>

            </div>
          );
        })}
      </div>

      <div className="flex items-center justify-between text-xs text-gray-400 font-mono pt-1">
        <div className="flex items-center space-x-2">
          <span className="w-3 h-3 rounded-sm bg-cyan-500 inline-block" />
          <span>XP Growth</span>
        </div>
        <div>Avg: ~{Math.round(data.reduce((acc, curr) => acc + curr.xp, 0) / 7)} XP / day</div>
      </div>
    </div>
  );
};

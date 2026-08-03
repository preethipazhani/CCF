import React, { useState } from 'react';
import { LESSONS_DATA } from '../data/lessonsData';
import { useAuth } from '../context/AuthContext';
import { BookOpen, CheckCircle2, Clock, Zap, Shield, Search, ArrowRight, Award } from 'lucide-react';

export const LearningModule = ({ setActiveTab, setSelectedLessonId }) => {
  const { user } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', 'Phishing', 'Password Security', 'Malware', 'Social Engineering'];

  const filteredLessons = LESSONS_DATA.filter(lesson => {
    const matchesCategory = selectedCategory === 'All' || lesson.category === selectedCategory;
    const matchesSearch = lesson.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          lesson.subtitle.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleLessonSelect = (lessonId) => {
    setSelectedLessonId(lessonId);
    setActiveTab('lesson-detail');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header Banner */}
      <div className="glass-card rounded-3xl p-6 sm:p-10 border border-cyan-500/30 relative overflow-hidden">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center space-x-2 bg-cyan-500/20 text-cyan-300 px-3 py-1 rounded-full text-xs font-mono border border-cyan-500/30">
            <Shield className="w-3.5 h-3.5 text-cyan-400" />
            <span>Interactive Defense Curriculum</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-mono">
            CYBER TRAINING <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">MODULES</span>
          </h1>
          <p className="text-gray-300 text-sm leading-relaxed">
            Master real-world cybersecurity protocols across 4 critical threat domains. Complete formatted lesson modules to earn XP, level up your profile, and unlock security achievement badges.
          </p>
        </div>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        
        {/* Category Pills */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-none">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-bold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-gradient-to-r from-cyan-500/30 to-purple-600/40 text-cyan-300 border border-cyan-400/50 shadow-md'
                  : 'bg-cyber-card text-gray-400 hover:text-white border border-cyan-500/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3.5 top-3 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search lessons..."
            className="w-full bg-cyber-card border border-cyan-500/20 focus:border-cyan-400 rounded-xl py-2 pl-10 pr-4 text-xs text-white placeholder-gray-500 focus:outline-none font-mono"
          />
        </div>
      </div>

      {/* Lessons Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredLessons.map(lesson => {
          const isCompleted = user.completedLessons.includes(lesson.id);

          return (
            <div
              key={lesson.id}
              onClick={() => handleLessonSelect(lesson.id)}
              className={`glass-card rounded-3xl p-6 border transition-all duration-300 cursor-pointer group flex flex-col justify-between ${
                isCompleted 
                  ? 'border-emerald-500/40 bg-emerald-950/10 hover:border-emerald-400' 
                  : 'border-cyan-500/20 hover:border-cyan-400/60 glass-card-hover'
              }`}
            >
              <div>
                {/* Top Bar: Icon, Category badge, Completion Status */}
                <div className="flex items-start justify-between mb-4">
                  <div className="w-14 h-14 rounded-2xl bg-[#060b1e] border border-cyan-500/30 flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
                    {lesson.icon}
                  </div>

                  <div className="flex items-center space-x-2">
                    <span className="text-[11px] font-mono font-semibold text-gray-400 bg-black/40 px-2.5 py-1 rounded-lg border border-cyan-500/10">
                      {lesson.category}
                    </span>
                    {isCompleted ? (
                      <span className="inline-flex items-center space-x-1 text-xs font-mono font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-500/40 px-3 py-1 rounded-full">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>COMPLETED</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center space-x-1 text-xs font-mono font-bold text-yellow-400 bg-yellow-500/10 border border-yellow-500/30 px-3 py-1 rounded-full">
                        <Zap className="w-3.5 h-3.5 fill-yellow-400" />
                        <span>+{lesson.xpReward} XP</span>
                      </span>
                    )}
                  </div>
                </div>

                {/* Lesson Title & Subtitle */}
                <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                  {lesson.title}
                </h3>
                <p className="text-xs text-gray-300 mt-2 leading-relaxed line-clamp-2">
                  {lesson.subtitle}
                </p>
              </div>

              {/* Bottom Metadata & Button */}
              <div className="mt-6 pt-4 border-t border-cyan-500/15 flex items-center justify-between">
                <div className="flex items-center space-x-4 text-xs font-mono text-gray-400">
                  <span className="flex items-center space-x-1">
                    <Clock className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{lesson.readTime}</span>
                  </span>
                  <span>•</span>
                  <span className="text-purple-300 font-semibold">{lesson.difficulty}</span>
                </div>

                <div className="flex items-center space-x-1 text-xs font-mono font-bold text-cyan-400 group-hover:translate-x-1 transition-transform">
                  <span>{isCompleted ? 'REVIEW NOTES' : 'START LESSON'}</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
};

import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { getLevelInfo } from '../data/mockUser';
import { NotificationCenter } from './NotificationCenter';
import { 
  Shield, BookOpen, HelpCircle, Trophy, User, LogOut, 
  Gamepad2, BarChart2, Award, Settings, Menu, X, Zap 
} from 'lucide-react';

export const Navbar = ({ activeTab, setActiveTab }) => {
  const { user, isAuthenticated, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const levelInfo = getLevelInfo(user ? user.xp : 0);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Shield },
    { id: 'lessons', label: 'Lessons', icon: BookOpen },
    { id: 'quiz', label: 'Quiz', icon: HelpCircle },
    { id: 'games', label: 'Cyber Games', icon: Gamepad2 },
    { id: 'leaderboard', label: 'Leaderboard', icon: Trophy },
    { id: 'analytics', label: 'Analytics', icon: BarChart2 },
    { id: 'certificate', label: 'Certificate', icon: Award },
  ];

  return (
    <header className="sticky top-0 z-50 glass-nav">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo */}
          <div 
            className="flex items-center space-x-3 cursor-pointer group"
            onClick={() => setActiveTab('dashboard')}
          >
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-cyan-500 to-purple-600 p-[2px] shadow-lg shadow-cyan-500/20 group-hover:shadow-cyan-500/40 transition-all duration-300">
              <div className="w-full h-full bg-[#070b19] rounded-[10px] flex items-center justify-center">
                <Shield className="w-6 h-6 text-cyan-400 group-hover:scale-110 transition-transform" />
              </div>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-extrabold text-xl tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-300 to-pink-500 font-mono">
                  CYBER<span className="text-white">QUEST</span>
                </span>
                <span className="bg-cyan-500/20 text-cyan-300 text-[10px] font-mono px-2 py-0.5 rounded-full border border-cyan-500/30">
                  ENTERPRISE
                </span>
              </div>
              <p className="text-[10px] text-gray-400 tracking-wide font-mono hidden sm:block">
                Smart Security Awareness Platform
              </p>
            </div>
          </div>

          {/* Desktop Nav Links */}
          {isAuthenticated && (
            <nav className="hidden xl:flex items-center space-x-1 bg-[#0b1226]/80 p-1.5 rounded-2xl border border-cyan-500/20">
              {navItems.map(item => {
                const Icon = item.icon;
                const isActive = activeTab === item.id || (item.id === 'lessons' && activeTab === 'lesson-detail');
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs font-mono font-semibold transition-all duration-200 ${
                      isActive
                        ? 'bg-gradient-to-r from-cyan-500/20 to-purple-600/30 text-cyan-300 border border-cyan-400/30 shadow-md'
                        : 'text-gray-400 hover:text-gray-200 hover:bg-white/5'
                    }`}
                  >
                    <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-cyan-400 animate-pulse' : ''}`} />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>
          )}

          {/* Right Section: Level HUD, Notification Bell, Settings & Profile */}
          {isAuthenticated ? (
            <div className="hidden sm:flex items-center space-x-3">
              
              {/* Notification Center */}
              <NotificationCenter />

              {/* Level & XP HUD Badge */}
              <div className="flex items-center space-x-3 bg-cyber-card/90 px-3 py-1.5 rounded-xl border border-cyan-500/30 shadow-inner">
                <div className="flex items-center space-x-1 text-yellow-400 text-xs font-bold font-mono">
                  <Zap className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                  <span>{user.xp} XP</span>
                </div>
                <div className="h-3.5 w-[1px] bg-cyan-500/20" />
                <div className="text-xs font-semibold text-purple-300 font-mono">
                  Lvl {levelInfo.level}
                </div>
              </div>

              {/* Settings Gear */}
              <button
                onClick={() => setActiveTab('settings')}
                className={`p-2.5 rounded-xl border transition-all ${
                  activeTab === 'settings'
                    ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300'
                    : 'bg-cyber-card border-cyan-500/20 text-gray-400 hover:text-white'
                }`}
                title="Platform Settings"
              >
                <Settings className="w-5 h-5" />
              </button>

              {/* Profile Avatar */}
              <button
                onClick={() => setActiveTab('profile')}
                className="w-10 h-10 rounded-xl bg-purple-950/80 border border-purple-500/40 flex items-center justify-center text-lg hover:border-cyan-400 transition-colors shadow-md"
                title="View Profile"
              >
                {user.avatar || '⚡'}
              </button>

              {/* Logout */}
              <button
                onClick={logout}
                className="p-2 rounded-xl text-gray-400 hover:text-red-400 hover:bg-red-500/10 border border-transparent hover:border-red-500/20 transition-all"
                title="Sign Out"
              >
                <LogOut className="w-5 h-5" />
              </button>

            </div>
          ) : (
            <button
              onClick={() => setActiveTab('auth')}
              className="neon-glow-btn px-5 py-2.5 rounded-xl text-sm font-bold text-white tracking-wide"
            >
              Sign In
            </button>
          )}

          {/* Mobile Menu Toggle Button */}
          <div className="flex xl:hidden items-center space-x-2">
            {isAuthenticated && <NotificationCenter />}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl text-gray-300 hover:text-white bg-cyber-card border border-cyan-500/30"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && isAuthenticated && (
        <div className="xl:hidden bg-[#070b19]/95 backdrop-blur-xl border-b border-cyan-500/20 px-4 pt-3 pb-6 space-y-2">
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-mono font-medium transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-cyan-500/20 to-purple-600/30 text-cyan-300 border border-cyan-400/40'
                    : 'text-gray-300 hover:bg-white/5'
                }`}
              >
                <Icon className="w-4 h-4 text-cyan-400" />
                <span>{item.label}</span>
              </button>
            );
          })}
          <div className="pt-4 border-t border-cyan-500/20 flex items-center justify-between">
            <button
              onClick={() => {
                setActiveTab('settings');
                setMobileMenuOpen(false);
              }}
              className="text-xs font-mono text-cyan-400 flex items-center space-x-1.5"
            >
              <Settings className="w-4 h-4" />
              <span>Settings</span>
            </button>
            <button
              onClick={() => {
                logout();
                setMobileMenuOpen(false);
              }}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-red-400 bg-red-500/10 border border-red-500/20 font-mono"
            >
              Sign Out
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

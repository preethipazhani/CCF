import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Settings, Moon, Bell, Shield, Key, Check, Lock, Eye } from 'lucide-react';

export const SettingsPage = () => {
  const { settings, setSettings, showToast } = useAuth();

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      showToast("Passwords do not match!", "info");
      return;
    }
    showToast("Password updated successfully!", "success");
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  const toggleSetting = (key) => {
    setSettings(prev => {
      const updated = { ...prev, [key]: !prev[key] };
      showToast("Setting preference updated", "info");
      return updated;
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 border border-cyan-500/30">
        <div className="flex items-center space-x-3 text-cyan-400 font-mono text-xs mb-1">
          <Settings className="w-4 h-4" />
          <span>SYSTEM PREFERENCES & CONTROL PANEL</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white font-mono">
          PLATFORM SETTINGS
        </h1>
      </div>

      {/* Settings Grid */}
      <div className="space-y-6">
        
        {/* Theme Settings */}
        <div className="glass-card rounded-3xl p-6 border border-cyan-500/20 space-y-4">
          <h3 className="text-base font-bold text-white font-mono flex items-center space-x-2 border-b border-cyan-500/20 pb-3">
            <Moon className="w-5 h-5 text-cyan-400" />
            <span>THEME & VISUAL PREFERENCES</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs">
            <button
              onClick={() => setSettings(prev => ({ ...prev, theme: 'cyber-dark' }))}
              className={`p-4 rounded-2xl border text-left flex items-center justify-between ${
                settings.theme === 'cyber-dark'
                  ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 font-bold'
                  : 'bg-[#050917] border-cyan-500/10 text-gray-400'
              }`}
            >
              <span>Cyber Dark (Default)</span>
              {settings.theme === 'cyber-dark' && <Check className="w-4 h-4 text-cyan-400" />}
            </button>

            <button
              onClick={() => setSettings(prev => ({ ...prev, theme: 'light-mode' }))}
              className={`p-4 rounded-2xl border text-left flex items-center justify-between ${
                settings.theme === 'light-mode'
                  ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 font-bold'
                  : 'bg-[#050917] border-cyan-500/10 text-gray-400'
              }`}
            >
              <span>Light Mode</span>
              {settings.theme === 'light-mode' && <Check className="w-4 h-4 text-cyan-400" />}
            </button>

            <button
              onClick={() => setSettings(prev => ({ ...prev, theme: 'high-contrast' }))}
              className={`p-4 rounded-2xl border text-left flex items-center justify-between ${
                settings.theme === 'high-contrast'
                  ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 font-bold'
                  : 'bg-[#050917] border-cyan-500/10 text-gray-400'
              }`}
            >
              <span>High Contrast Neon</span>
              {settings.theme === 'high-contrast' && <Check className="w-4 h-4 text-cyan-400" />}
            </button>
          </div>
        </div>

        {/* Notifications & Privacy Toggles */}
        <div className="glass-card rounded-3xl p-6 border border-cyan-500/20 space-y-4">
          <h3 className="text-base font-bold text-white font-mono flex items-center space-x-2 border-b border-cyan-500/20 pb-3">
            <Bell className="w-5 h-5 text-purple-400" />
            <span>NOTIFICATIONS & PRIVACY</span>
          </h3>

          <div className="space-y-3 font-mono text-xs">
            <div className="flex items-center justify-between p-3.5 bg-[#050917] rounded-2xl border border-cyan-500/10">
              <div>
                <div className="font-bold text-white">Achievement & Badge Toast Alerts</div>
                <div className="text-[11px] text-gray-400">Show popups when badges or XP rewards are earned.</div>
              </div>
              <button
                onClick={() => toggleSetting('achievementToasts')}
                className={`w-12 h-6 rounded-full p-1 transition-colors ${
                  settings.achievementToasts ? 'bg-cyan-400' : 'bg-gray-700'
                }`}
              >
                <div className={`w-4 h-4 rounded-full bg-black transition-transform ${
                  settings.achievementToasts ? 'translate-x-6' : 'translate-x-0'
                }`} />
              </button>
            </div>

            <div className="flex items-center justify-between p-3.5 bg-[#050917] rounded-2xl border border-cyan-500/10">
              <div>
                <div className="font-bold text-white">Public Leaderboard Visibility</div>
                <div className="text-[11px] text-gray-400">Display your profile alias on the global operator standings.</div>
              </div>
              <button
                onClick={() => toggleSetting('publicLeaderboard')}
                className={`w-12 h-6 rounded-full p-1 transition-colors ${
                  settings.publicLeaderboard ? 'bg-cyan-400' : 'bg-gray-700'
                }`}
              >
                <div className={`w-4 h-4 rounded-full bg-black transition-transform ${
                  settings.publicLeaderboard ? 'translate-x-6' : 'translate-x-0'
                }`} />
              </button>
            </div>
          </div>
        </div>

        {/* Change Password UI Form */}
        <div className="glass-card rounded-3xl p-6 border border-cyan-500/20 space-y-4">
          <h3 className="text-base font-bold text-white font-mono flex items-center space-x-2 border-b border-cyan-500/20 pb-3">
            <Key className="w-5 h-5 text-pink-400" />
            <span>CHANGE SECURITY PASSWORD</span>
          </h3>

          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-mono text-cyan-300 uppercase mb-1">
                Current Password
              </label>
              <input
                type="password"
                required
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-[#050917] border border-cyan-500/20 focus:border-cyan-400 rounded-xl py-2.5 px-4 text-sm text-white font-mono"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono text-cyan-300 uppercase mb-1">
                  New Password
                </label>
                <input
                  type="password"
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="At least 8 characters"
                  className="w-full bg-[#050917] border border-cyan-500/20 focus:border-cyan-400 rounded-xl py-2.5 px-4 text-sm text-white font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-cyan-300 uppercase mb-1">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm new password"
                  className="w-full bg-[#050917] border border-cyan-500/20 focus:border-cyan-400 rounded-xl py-2.5 px-4 text-sm text-white font-mono"
                />
              </div>
            </div>

            <button
              type="submit"
              className="neon-glow-btn px-6 py-2.5 rounded-xl font-bold text-white text-xs font-mono flex items-center space-x-2"
            >
              <Lock className="w-4 h-4" />
              <span>UPDATE PASSWORD</span>
            </button>
          </form>
        </div>

      </div>

    </div>
  );
};

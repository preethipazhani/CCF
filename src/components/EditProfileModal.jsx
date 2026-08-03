import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { User, X, Check, Sparkles } from 'lucide-react';

export const EditProfileModal = ({ isOpen, onClose }) => {
  const { user, updateProfile } = useAuth();

  const [name, setName] = useState(user.name || '');
  const [bio, setBio] = useState(user.bio || 'Cyber Cadet passionate about security awareness.');
  const [avatar, setAvatar] = useState(user.avatar || '⚡');

  if (!isOpen) return null;

  const avatars = ['⚡', '🛡️', '👾', '👑', '🚀', '🎯', '🔍', '💻'];

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProfile(name, bio, avatar);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-lg bg-[#090f24] border-2 border-cyan-400/60 rounded-3xl p-6 sm:p-8 shadow-[0_0_50px_rgba(0,240,255,0.25)]">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-cyan-500/20 pb-4 mb-6">
          <div className="flex items-center space-x-2 text-white font-mono font-bold text-lg">
            <User className="w-5 h-5 text-cyan-400" />
            <span>EDIT OPERATOR PROFILE</span>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* Avatar Choice */}
          <div>
            <label className="block text-xs font-mono font-semibold text-cyan-300 mb-2 uppercase">
              Choose Security Avatar
            </label>
            <div className="grid grid-cols-4 gap-3">
              {avatars.map((av) => (
                <button
                  type="button"
                  key={av}
                  onClick={() => setAvatar(av)}
                  className={`p-3 rounded-2xl text-2xl border transition-all ${
                    avatar === av 
                      ? 'bg-cyan-500/30 border-cyan-400 shadow-[0_0_15px_rgba(0,240,255,0.4)] scale-105' 
                      : 'bg-[#050917] border-cyan-500/10 hover:border-cyan-500/30'
                  }`}
                >
                  {av}
                </button>
              ))}
            </div>
          </div>

          {/* Alias */}
          <div>
            <label className="block text-xs font-mono font-semibold text-cyan-300 mb-1.5 uppercase">
              Operator Alias / Display Name
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-[#050917] border border-cyan-500/20 focus:border-cyan-400 rounded-xl py-3 px-4 text-sm text-white focus:outline-none font-mono"
            />
          </div>

          {/* Bio */}
          <div>
            <label className="block text-xs font-mono font-semibold text-cyan-300 mb-1.5 uppercase">
              Security Bio / Role Note
            </label>
            <textarea
              rows="3"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full bg-[#050917] border border-cyan-500/20 focus:border-cyan-400 rounded-xl py-3 px-4 text-sm text-white focus:outline-none font-sans"
              placeholder="Add your security specialization notes..."
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end space-x-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl border border-gray-700 text-gray-300 hover:text-white text-xs font-mono font-bold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="neon-glow-btn px-6 py-2.5 rounded-xl text-white font-bold text-xs font-mono flex items-center space-x-2"
            >
              <Check className="w-4 h-4" />
              <span>SAVE CREDENTIALS</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};

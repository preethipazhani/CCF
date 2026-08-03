import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Bell, Check, Trash2, X, CheckCheck } from 'lucide-react';

export const NotificationCenter = () => {
  const { notifications, markNotificationRead, markAllNotificationsRead } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="relative">
      
      {/* Bell Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2.5 rounded-xl bg-cyber-card border border-cyan-500/30 text-gray-300 hover:text-white hover:border-cyan-400 transition-all"
        title="Notification Center"
      >
        <Bell className="w-5 h-5 text-cyan-400" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-pink-600 text-white font-mono font-bold text-[10px] flex items-center justify-center border border-black animate-pulse">
            {unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown Menu Drawer */}
      {isOpen && (
        <div className="absolute right-0 mt-3 w-80 sm:w-96 bg-[#090f24] border border-cyan-500/40 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.8)] backdrop-blur-xl z-50 overflow-hidden animate-fade-in">
          
          {/* Header */}
          <div className="p-4 bg-[#050917] border-b border-cyan-500/20 flex items-center justify-between">
            <div className="flex items-center space-x-2 font-mono font-bold text-sm text-white">
              <Bell className="w-4 h-4 text-cyan-400" />
              <span>NOTIFICATIONS</span>
              {unreadCount > 0 && (
                <span className="bg-cyan-500/20 text-cyan-300 text-xs px-2 py-0.5 rounded-full border border-cyan-500/30">
                  {unreadCount} new
                </span>
              )}
            </div>

            <div className="flex items-center space-x-2">
              {unreadCount > 0 && (
                <button
                  onClick={markAllNotificationsRead}
                  className="text-[11px] font-mono text-cyan-400 hover:underline flex items-center space-x-1"
                  title="Mark all as read"
                >
                  <CheckCheck className="w-3.5 h-3.5" />
                  <span>Read All</span>
                </button>
              )}
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-white p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Stream Item List */}
          <div className="max-h-80 overflow-y-auto divide-y divide-cyan-500/10">
            {notifications.length === 0 ? (
              <div className="p-8 text-center text-xs text-gray-500 font-mono">
                No notifications logged yet.
              </div>
            ) : (
              notifications.map(item => (
                <div
                  key={item.id}
                  onClick={() => markNotificationRead(item.id)}
                  className={`p-4 transition-colors cursor-pointer flex items-start space-x-3 ${
                    item.read ? 'bg-transparent opacity-70' : 'bg-cyan-500/10 hover:bg-cyan-500/15'
                  }`}
                >
                  <span className="text-xl shrink-0 mt-0.5">{item.icon || '🔔'}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="font-mono font-bold text-white truncate">{item.title}</span>
                      <span className="text-[10px] text-gray-400 font-mono shrink-0 ml-2">{item.time}</span>
                    </div>
                    <p className="text-xs text-gray-300 leading-relaxed font-sans line-clamp-2">
                      {item.message}
                    </p>
                  </div>
                  {!item.read && (
                    <span className="w-2 h-2 rounded-full bg-cyan-400 shrink-0 mt-2 animate-ping" />
                  )}
                </div>
              ))
            )}
          </div>

          {/* Footer Bar */}
          <div className="p-3 bg-[#050917] border-t border-cyan-500/20 text-center">
            <span className="text-[10px] font-mono text-gray-500">
              CyberQuest Event Stream • Local Mode
            </span>
          </div>

        </div>
      )}

    </div>
  );
};

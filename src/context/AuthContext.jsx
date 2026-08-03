import React, { createContext, useContext, useEffect, useState } from 'react';
import { createInitialUserProfile, BADGES_DEFINITION, getLevelInfo } from '../data/mockUser';
import confetti from 'canvas-confetti';

const AuthContext = createContext(null);

const INITIAL_NOTIFICATIONS = [
  {
    id: 1,
    title: 'Welcome to CyberQuest!',
    message: 'Your security awareness training platform is active. Start with Phishing Defense.',
    time: '10 mins ago',
    type: 'info',
    read: false,
    icon: '🛡️'
  },
  {
    id: 2,
    title: 'Badge Unlocked!',
    message: "You earned the 'Vault Keeper' security badge for password hygiene.",
    time: '2 hours ago',
    type: 'success',
    read: false,
    icon: '🔑'
  },
  {
    id: 3,
    title: 'Daily Bonus Available',
    message: 'Claim +75 XP for completing your daily security check.',
    time: '5 hours ago',
    type: 'reward',
    read: false,
    icon: '🔥'
  }
];

const getStoredValue = (key, fallback) => {
  if (typeof window === 'undefined') return fallback;
  try {
    const saved = window.localStorage.getItem(key);
    return saved ? JSON.parse(saved) : fallback;
  } catch (error) {
    return fallback;
  }
};

const normalizeEmail = (value) => (value || '').trim().toLowerCase();
const DEMO_ACCOUNT_EMAILS = ['alex.vance@cyberquest.io', 'sam.lee@cyberquest.io'];

const sanitizeStoredAccounts = (accounts) => {
  if (!Array.isArray(accounts)) return [];
  return accounts.filter((account) => !DEMO_ACCOUNT_EMAILS.includes(normalizeEmail(account.email)));
};

const normalizeUserProfile = (profile) => {
  if (!profile) return createInitialUserProfile();
  return createInitialUserProfile(profile);
};

const buildLeaderboardEntry = (account, currentEmail) => {
  const levelInfo = getLevelInfo(account.xp || 0);
  return {
    ...account,
    xp: account.xp || 0,
    level: levelInfo.level,
    title: levelInfo.rankTitle,
    badgesCount: account.unlockedBadges?.length || 0,
    badgeTitle: account.unlockedBadges?.length ? `${account.unlockedBadges.length} badges` : 'New recruit',
    streakDays: account.dailyLoginStreak || 0,
    isCurrentUser: normalizeEmail(account.email) === normalizeEmail(currentEmail)
  };
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = getStoredValue('cyberquest_user', null);
    const isSessionActive = Boolean(getStoredValue('cyberquest_auth', false));
    const sanitizedUser = storedUser && !DEMO_ACCOUNT_EMAILS.includes(normalizeEmail(storedUser.email))
      ? normalizeUserProfile(storedUser)
      : createInitialUserProfile({ name: '', email: '' });
    return isSessionActive && sanitizedUser.email ? sanitizedUser : createInitialUserProfile({ name: '', email: '' });
  });
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const storedUser = getStoredValue('cyberquest_user', null);
    const authFlag = Boolean(getStoredValue('cyberquest_auth', false));
    return authFlag && storedUser && !DEMO_ACCOUNT_EMAILS.includes(normalizeEmail(storedUser.email));
  });
  const [registeredUsers, setRegisteredUsers] = useState(() => {
    const storedAccounts = getStoredValue('cyberquest_accounts', []);
    const sanitizedAccounts = sanitizeStoredAccounts(storedAccounts);
    return sanitizedAccounts.map((account) => normalizeUserProfile(account));
  });
  const [toast, setToast] = useState(null);
  const [activeModal, setActiveModal] = useState(null);

  const notifications = user.notifications || [];
  const quizHistory = user.quizHistory || [];
  const settings = user.settings || {
    theme: 'cyber-dark',
    emailNotifications: true,
    achievementToasts: true,
    publicLeaderboard: true
  };

  const leaderboardUsers = [...registeredUsers]
    .map((account) => buildLeaderboardEntry(account, user.email))
    .sort((first, second) => (second.xp || 0) - (first.xp || 0))
    .map((entry, index) => ({ ...entry, rank: index + 1 }));

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('cyberquest_user', JSON.stringify(user));
      window.localStorage.setItem('cyberquest_auth', isAuthenticated ? 'true' : 'false');
    }
  }, [user, isAuthenticated]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('cyberquest_accounts', JSON.stringify(registeredUsers));
    }
  }, [registeredUsers]);

  const showToast = (message, type = 'info') => {
    setToast({ message, type });
    if (typeof window !== 'undefined') {
      window.setTimeout(() => setToast(null), 3500);
    }
  };

  const persistUser = (nextUser) => {
    const normalizedUser = normalizeUserProfile(nextUser);
    const normalizedEmail = normalizeEmail(normalizedUser.email);

    setUser(normalizedUser);
    setRegisteredUsers((prev) => {
      if (prev.some((entry) => normalizeEmail(entry.email) === normalizedEmail)) {
        return prev.map((entry) => (normalizeEmail(entry.email) === normalizedEmail ? normalizedUser : entry));
      }

      return [...prev, normalizedUser];
    });

    return normalizedUser;
  };

  const addNotification = (title, message, icon = '🔔', type = 'info') => {
    const newNotif = {
      id: Date.now(),
      title,
      message,
      time: 'Just now',
      type,
      read: false,
      icon
    };

    persistUser({
      ...user,
      notifications: [newNotif, ...(user.notifications || [])]
    });
  };

  const markNotificationRead = (id) => {
    persistUser({
      ...user,
      notifications: (user.notifications || []).map((notification) => (
        notification.id === id ? { ...notification, read: true } : notification
      ))
    });
  };

  const markAllNotificationsRead = () => {
    persistUser({
      ...user,
      notifications: (user.notifications || []).map((notification) => ({ ...notification, read: true }))
    });
  };

  const applyProgressUpdate = (updates) => {
    const nextUser = normalizeUserProfile({
      ...user,
      ...updates,
      progressPercent: getLevelInfo((updates.xp ?? user.xp ?? 0)).progressPercent
    });
    return persistUser(nextUser);
  };

  const login = (email, password) => {
    const normalizedEmail = normalizeEmail(email);
    const normalizedPassword = (password || '').trim();
    const account = registeredUsers.find((entry) => normalizeEmail(entry.email) === normalizedEmail);

    if (!account) {
      showToast('No account was found for that email address.', 'error');
      return { success: false, message: 'No account was found for that email address.' };
    }

    if (account.password !== normalizedPassword) {
      showToast('Invalid credentials. Please verify your password and try again.', 'error');
      return { success: false, message: 'Invalid credentials. Please verify your password and try again.' };
    }

    const authenticatedUser = normalizeUserProfile({
      ...account,
      password: account.password,
      lastLoginDate: new Date().toISOString().split('T')[0]
    });

    persistUser(authenticatedUser);
    setIsAuthenticated(true);
    showToast('Signed in successfully. Welcome back to CyberQuest.', 'success');
    triggerNotification('Access Confirmed', `Welcome back, ${authenticatedUser.name.split(' ')[0] || 'operator'}!`, '🔐', 'success');
    return { success: true };
  };

  const signup = (name, email, password, acceptedTerms) => {
    const safeName = (name || '').trim();
    const normalizedEmail = normalizeEmail(email);
    const normalizedPassword = (password || '').trim();

    if (!acceptedTerms) {
      showToast('Please review and accept the Terms & Privacy Policy.', 'error');
      return { success: false, message: 'Please review and accept the Terms & Privacy Policy.' };
    }

    if (!safeName || safeName.length < 2) {
      showToast('Please enter your full name.', 'error');
      return { success: false, message: 'Please enter your full name.' };
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
      showToast('Please use a valid email address.', 'error');
      return { success: false, message: 'Please use a valid email address.' };
    }

    if (normalizedPassword.length < 8) {
      showToast('Use at least 8 characters for your password.', 'error');
      return { success: false, message: 'Use at least 8 characters for your password.' };
    }

    if (registeredUsers.some((entry) => normalizeEmail(entry.email) === normalizedEmail)) {
      showToast('An account with that email already exists.', 'error');
      return { success: false, message: 'An account with that email already exists.' };
    }

    const newAccount = createInitialUserProfile({
      name: safeName,
      email: normalizedEmail,
      password: normalizedPassword,
      lastLoginDate: new Date().toISOString().split('T')[0]
    });

    persistUser(newAccount);
    setIsAuthenticated(true);
    showToast('Account created successfully. Your secure workspace is ready.', 'success');
    triggerNotification('Workspace Ready', `Welcome aboard, ${safeName.split(' ')[0]}! Your training workspace is ready.`, '🎖️', 'success');
    return { success: true };
  };

  const logout = () => {
    setIsAuthenticated(false);
    showToast('You have been signed out.', 'info');
  };

  const updateProfile = (name, bio, avatar) => {
    persistUser({
      ...user,
      name: name || user.name,
      bio: bio !== undefined ? bio : user.bio,
      avatar: avatar || user.avatar
    });
    showToast('Profile credentials updated!', 'success');
    addNotification('Profile Updated', 'Your alias and security profile details were modified.', '👤', 'info');
  };

  const triggerNotification = (title, message, icon = '🎉', type = 'info', rewardXp = 0) => {
    setActiveModal({ title, message, icon, type, rewardXp });
    addNotification(title, message, icon, type);
    if (type === 'success' || rewardXp > 0) {
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#00f0ff', '#9d4edf', '#10b981', '#ff007f']
        });
      } catch (error) {
        // Ignore confetti failures in unsupported environments.
      }
    }
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  const completeLesson = (lessonId, xpReward = 100, badgeReward = null) => {
    if ((user.completedLessons || []).includes(lessonId)) {
      showToast('Lesson already completed!', 'info');
      return;
    }

    const updatedCompleted = [...(user.completedLessons || []), lessonId];
    const newXp = (user.xp || 0) + xpReward;
    const updatedBadges = [...(user.unlockedBadges || [])];
    let newlyUnlockedBadge = null;

    if (badgeReward && !updatedBadges.includes(badgeReward)) {
      updatedBadges.push(badgeReward);
      const foundBadge = BADGES_DEFINITION.find((badge) => badge.id === badgeReward);
      if (foundBadge) newlyUnlockedBadge = foundBadge.title;
    }

    if (!updatedBadges.includes('first_step')) {
      updatedBadges.push('first_step');
    }

    const newLevelInfo = getLevelInfo(newXp);
    if (newLevelInfo.level >= 3 && !updatedBadges.includes('speed_demon')) {
      updatedBadges.push('speed_demon');
    }

    applyProgressUpdate({
      xp: newXp,
      completedLessons: updatedCompleted,
      unlockedBadges: updatedBadges
    });

    const modalMsg = newlyUnlockedBadge
      ? `Lesson complete! Earned +${xpReward} XP & unlocked the "${newlyUnlockedBadge}" Badge!`
      : `Lesson complete! Earned +${xpReward} XP. Knowledge is your strongest armor!`;

    triggerNotification('Mission Accomplished!', modalMsg, '🛡️', 'success', xpReward);
  };

  const recordQuizResult = (scorePercent, correctCount, totalQuestions, totalXpEarned, topicName = 'General Quiz') => {
    const newXp = (user.xp || 0) + totalXpEarned;
    const updatedBadges = [...(user.unlockedBadges || [])];
    let badgeMsg = '';

    if (scorePercent >= 90 && !updatedBadges.includes('quiz_master')) {
      updatedBadges.push('quiz_master');
      badgeMsg = " 🏆 Unlocked 'Quiz Mastermind' Badge!";
    }

    const historyItem = {
      id: Date.now(),
      topic: topicName,
      score: scorePercent,
      date: new Date().toISOString().split('T')[0],
      xpEarned: totalXpEarned
    };

    applyProgressUpdate({
      xp: newXp,
      unlockedBadges: updatedBadges,
      quizStats: {
        attempts: (user.quizStats?.attempts || 0) + 1,
        highestScore: Math.max(user.quizStats?.highestScore || 0, scorePercent),
        lastScore: scorePercent,
        totalAnswered: (user.quizStats?.totalAnswered || 0) + totalQuestions,
        correctAnswers: (user.quizStats?.correctAnswers || 0) + correctCount
      },
      quizHistory: [historyItem, ...(user.quizHistory || [])]
    });

    triggerNotification(
      'Assessment Submitted!',
      `You scored ${scorePercent}% (${correctCount}/${totalQuestions}). Earned +${totalXpEarned} XP!${badgeMsg}`,
      scorePercent >= 70 ? '⚡' : '🎯',
      scorePercent >= 70 ? 'success' : 'info',
      totalXpEarned
    );
  };

  const claimDailyChallenge = () => {
    if (user.dailyChallengeClaimed) return;

    const xpBonus = 75;
    const newXp = (user.xp || 0) + xpBonus;
    const updatedBadges = [...(user.unlockedBadges || [])];
    if (!updatedBadges.includes('streak_7')) {
      updatedBadges.push('streak_7');
    }

    applyProgressUpdate({
      xp: newXp,
      dailyChallengeClaimed: true,
      unlockedBadges: updatedBadges,
      dailyLoginStreak: (user.dailyLoginStreak || 0) + 1
    });

    triggerNotification('Daily Challenge Claimed!', `Claimed +${xpBonus} XP and boosted your streak!`, '🔥', 'success', xpBonus);
  };

  const resetProgress = () => {
    const resetUser = createInitialUserProfile({
      name: user.name || '',
      email: user.email || '',
      avatar: user.avatar || '⚡',
      role: user.role || 'Cyber Cadet',
      bio: user.bio || '',
      password: user.password,
      settings: user.settings || {
        theme: 'cyber-dark',
        emailNotifications: true,
        achievementToasts: true,
        publicLeaderboard: true
      },
      notifications: [],
      quizHistory: []
    });

    resetUser.id = user.id;
    persistUser(resetUser);
    triggerNotification('System Reset', 'All progress, XP, badges, and logs reset to your baseline profile.', '🔄', 'info');
  };

  const setSettings = (valueOrUpdater) => {
    const nextSettings = typeof valueOrUpdater === 'function'
      ? valueOrUpdater(settings)
      : valueOrUpdater;

    persistUser({
      ...user,
      settings: nextSettings
    });
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated,
      activeModal,
      notifications,
      quizHistory,
      settings,
      toast,
      registeredUsers,
      leaderboardUsers,
      login,
      signup,
      logout,
      updateProfile,
      completeLesson,
      recordQuizResult,
      claimDailyChallenge,
      resetProgress,
      addNotification,
      markNotificationRead,
      markAllNotificationsRead,
      setSettings,
      showToast,
      triggerNotification,
      closeModal
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

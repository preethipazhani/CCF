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

const MOCK_COMPETITORS = [
  {
    id: 'mock-1',
    name: "Elena Rostova",
    email: "elena@cyberquest.io",
    avatar: "👑",
    xp: 2850,
    unlockedBadges: ['first_step', 'phishing_scout', 'password_guardian', 'malware_defender', 'social_engineer_shield', 'quiz_master', 'speed_demon', 'streak_7'],
    dailyLoginStreak: 14,
    role: "Chief Security Officer"
  },
  {
    id: 'mock-2',
    name: "Devon Chen",
    email: "devon@cyberquest.io",
    avatar: "👾",
    xp: 2210,
    unlockedBadges: ['first_step', 'phishing_scout', 'password_guardian', 'malware_defender', 'quiz_master'],
    dailyLoginStreak: 10,
    role: "Threat Hunter Elite"
  },
  {
    id: 'mock-3',
    name: "Marcus Vance",
    email: "marcus@cyberquest.io",
    avatar: "🛡️",
    xp: 1780,
    unlockedBadges: ['first_step', 'password_guardian', 'malware_defender', 'speed_demon'],
    dailyLoginStreak: 9,
    role: "Cyber Sentinel"
  },
  {
    id: 'mock-4',
    name: "Sarah Connor",
    email: "sarah@cyberquest.io",
    avatar: "⚡",
    xp: 1350,
    unlockedBadges: ['first_step', 'password_guardian', 'streak_7'],
    dailyLoginStreak: 7,
    role: "Vault Keeper"
  },
  {
    id: 'mock-5',
    name: "Tariq Al-Mansoor",
    email: "tariq@cyberquest.io",
    avatar: "🎯",
    xp: 380,
    unlockedBadges: ['first_step'],
    dailyLoginStreak: 3,
    role: "Cyber Initiate"
  },
  {
    id: 'mock-6',
    name: "Kaitlyn Wright",
    email: "kaitlyn@cyberquest.io",
    avatar: "🔍",
    xp: 240,
    unlockedBadges: ['first_step'],
    dailyLoginStreak: 2,
    role: "Cyber Initiate"
  },
  {
    id: 'mock-7',
    name: "Lucas Miller",
    email: "lucas@cyberquest.io",
    avatar: "💻",
    xp: 150,
    unlockedBadges: [],
    dailyLoginStreak: 1,
    role: "Cyber Initiate"
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
    isCurrentUser: account.email && normalizeEmail(account.email) === normalizeEmail(currentEmail)
  };
};

export const AuthProvider = ({ children }) => {
  const [registeredUsers, setRegisteredUsers] = useState(() => {
    const storedAccounts = getStoredValue('cyberquest_accounts', []);
    return storedAccounts.map((account) => normalizeUserProfile(account));
  });

  const [currentUserId, setCurrentUserId] = useState(() => {
    return getStoredValue('cyberquest_current_user_id', null);
  });

  const user = registeredUsers.find(u => u.id === currentUserId) || createInitialUserProfile({ name: '', email: '' });
  const isAuthenticated = !!currentUserId;

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

  // Combine real users and mock competitors on the leaderboard
  const leaderboardUsers = [
    ...registeredUsers.filter(r => r.email && !MOCK_COMPETITORS.some(m => normalizeEmail(m.email) === normalizeEmail(r.email))),
    ...MOCK_COMPETITORS
  ]
    .map((account) => buildLeaderboardEntry(account, user.email))
    .sort((first, second) => (second.xp || 0) - (first.xp || 0))
    .map((entry, index) => ({ ...entry, rank: index + 1 }));

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('cyberquest_accounts', JSON.stringify(registeredUsers));
    }
  }, [registeredUsers]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (currentUserId) {
        window.localStorage.setItem('cyberquest_current_user_id', currentUserId);
      } else {
        window.localStorage.removeItem('cyberquest_current_user_id');
      }
    }
  }, [currentUserId]);

  const showToast = (message, type = 'info') => {
    setToast({ message, type });
    if (typeof window !== 'undefined') {
      window.setTimeout(() => setToast(null), 3500);
    }
  };

  const persistUser = (nextUser) => {
    const normalizedUser = normalizeUserProfile(nextUser);
    
    setRegisteredUsers((prev) => {
      if (prev.some((entry) => entry.id === normalizedUser.id)) {
        return prev.map((entry) => (entry.id === normalizedUser.id ? normalizedUser : entry));
      } else {
        return [...prev, normalizedUser];
      }
    });

    return normalizedUser;
  };

  const updateStreak = (currentUser) => {
    const today = new Date().toLocaleDateString('en-CA'); // YYYY-MM-DD local format
    const lastActive = currentUser.lastActiveDate;

    let nextStreak = currentUser.dailyLoginStreak || 0;
    let nextLongest = currentUser.longestStreak || 0;

    if (lastActive === today) {
      // Already active today, do not increase
      return currentUser;
    }

    if (!lastActive) {
      nextStreak = 1;
    } else {
      const lastDate = new Date(lastActive);
      const todayDate = new Date(today);
      const diffTime = Math.abs(todayDate - lastDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays === 1) {
        nextStreak += 1;
      } else if (diffDays > 1) {
        nextStreak = 1;
      }
    }

    if (nextStreak > nextLongest) {
      nextLongest = nextStreak;
    }

    return {
      ...currentUser,
      dailyLoginStreak: nextStreak,
      longestStreak: nextLongest,
      lastActiveDate: today
    };
  };

  const checkStreakLiveness = (profile) => {
    if (!profile.lastActiveDate) return profile;
    const today = new Date().toLocaleDateString('en-CA');
    const lastDate = new Date(profile.lastActiveDate);
    const todayDate = new Date(today);
    const diffTime = Math.abs(todayDate - lastDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays > 1) {
      return {
        ...profile,
        dailyLoginStreak: 0
      };
    }
    return profile;
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
    const levelInfo = getLevelInfo(updates.xp ?? user.xp ?? 0);
    const nextUser = normalizeUserProfile({
      ...user,
      ...updates,
      progressPercent: levelInfo.progressPercent
    });
    return persistUser(nextUser);
  };

  const login = (email, password) => {
    const normalizedEmail = normalizeEmail(email);
    const normalizedPassword = (password || '').trim();
    const account = registeredUsers.find((entry) => normalizeEmail(entry.email) === normalizedEmail);

    if (!account) {
      showToast('Invalid email or password.', 'error');
      return { success: false, message: 'Invalid email or password.' };
    }

    if (account.password !== normalizedPassword) {
      showToast('Invalid email or password.', 'error');
      return { success: false, message: 'Invalid email or password.' };
    }

    const authenticatedUser = checkStreakLiveness(normalizeUserProfile({
      ...account,
      password: account.password,
      lastLoginDate: new Date().toLocaleDateString('en-CA')
    }));

    const welcomeNotif = {
      id: Date.now(),
      title: 'Access Confirmed',
      message: `Welcome back, ${authenticatedUser.name.split(' ')[0] || 'operator'}!`,
      time: 'Just now',
      type: 'success',
      read: false,
      icon: '🔐'
    };
    authenticatedUser.notifications = [welcomeNotif, ...(authenticatedUser.notifications || [])];

    persistUser(authenticatedUser);
    setCurrentUserId(authenticatedUser.id);
    showToast('Signed in successfully. Welcome back to CyberQuest.', 'success');
    setActiveModal({
      title: 'Access Confirmed',
      message: `Welcome back, ${authenticatedUser.name.split(' ')[0] || 'operator'}!`,
      icon: '🔐',
      type: 'success',
      rewardXp: 0
    });

    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#00f0ff', '#9d4edf', '#10b981', '#ff007f']
      });
    } catch (error) {
      // Ignore confetti failures
    }

    return { success: true };
  };

  const signup = (name, email, password, acceptedTerms, avatar) => {
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
      avatar: avatar || '⚡',
      lastLoginDate: new Date().toLocaleDateString('en-CA')
    });

    const welcomeNotif = {
      id: Date.now(),
      title: 'Workspace Ready',
      message: `Welcome aboard, ${safeName.split(' ')[0]}! Your training workspace is ready.`,
      time: 'Just now',
      type: 'success',
      read: false,
      icon: '🎖️'
    };
    newAccount.notifications = [welcomeNotif, ...(newAccount.notifications || [])];

    persistUser(newAccount);
    setCurrentUserId(newAccount.id);
    showToast('Account created successfully. Your secure workspace is ready.', 'success');
    setActiveModal({
      title: 'Workspace Ready',
      message: `Welcome aboard, ${safeName.split(' ')[0]}! Your training workspace is ready.`,
      icon: '🎖️',
      type: 'success',
      rewardXp: 0
    });

    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#00f0ff', '#9d4edf', '#10b981', '#ff007f']
      });
    } catch (error) {
      // Ignore confetti failures
    }

    return { success: true };
  };

  const logout = () => {
    setCurrentUserId(null);
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
        // Ignore confetti failures
      }
    }
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  const completeLesson = (lessonId, xpReward = 50, badgeReward = null) => {
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

    const userWithUpdatedStreak = updateStreak({
      ...user,
      xp: newXp,
      completedLessons: updatedCompleted,
      unlockedBadges: updatedBadges
    });

    applyProgressUpdate(userWithUpdatedStreak);

    const modalMsg = newlyUnlockedBadge
      ? `Lesson complete! Earned +${xpReward} XP & unlocked the "${newlyUnlockedBadge}" Badge!`
      : `Lesson complete! Earned +${xpReward} XP. Knowledge is your strongest armor!`;

    triggerNotification('Mission Accomplished!', modalMsg, '🛡️', 'success', xpReward);
  };

  const recordQuizResult = (scorePercent, correctCount, totalQuestions, totalXpEarned = 100, topicName = 'General Quiz') => {
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
      date: new Date().toLocaleDateString('en-CA'),
      xpEarned: totalXpEarned
    };

    const userWithUpdatedStreak = updateStreak({
      ...user,
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

    applyProgressUpdate(userWithUpdatedStreak);

    triggerNotification(
      'Assessment Submitted!',
      `You scored ${scorePercent}% (${correctCount}/${totalQuestions}). Earned +${totalXpEarned} XP!${badgeMsg}`,
      scorePercent >= 70 ? '⚡' : '🎯',
      scorePercent >= 70 ? 'success' : 'info',
      totalXpEarned
    );
  };

  const completeGame = (gameId, xpReward = 50) => {
    const newXp = (user.xp || 0) + xpReward;

    const userWithUpdatedStreak = updateStreak({
      ...user,
      xp: newXp
    });

    applyProgressUpdate(userWithUpdatedStreak);

    triggerNotification(
      'Game Complete!',
      `You successfully finished the challenge! Earned +${xpReward} XP.`,
      '🎮',
      'success',
      xpReward
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

    const userWithUpdatedStreak = updateStreak({
      ...user,
      xp: newXp,
      dailyChallengeClaimed: true,
      unlockedBadges: updatedBadges
    });

    applyProgressUpdate(userWithUpdatedStreak);

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
      completeGame,
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

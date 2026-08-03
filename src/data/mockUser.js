const buildDefaultSettings = () => ({
  theme: 'cyber-dark',
  emailNotifications: true,
  achievementToasts: true,
  publicLeaderboard: true
});

export const INITIAL_USER = {
  id: '',
  name: '',
  email: '',
  avatar: '⚡',
  role: 'Cyber Cadet',
  bio: '',
  xp: 0,
  completedLessons: [],
  quizStats: {
    attempts: 0,
    highestScore: 0,
    lastScore: 0,
    totalAnswered: 0,
    correctAnswers: 0
  },
  unlockedBadges: [],
  dailyChallengeClaimed: false,
  dailyLoginStreak: 0,
  lastLoginDate: null,
  progressPercent: 0,
  notifications: [],
  quizHistory: [],
  settings: buildDefaultSettings()
};

export const createInitialUserProfile = (overrides = {}) => {
  const nextProfile = {
    ...INITIAL_USER,
    ...overrides,
    id: overrides.id || `user-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    name: (overrides.name || '').trim(),
    email: ((overrides.email || '').trim()).toLowerCase(),
    avatar: overrides.avatar || '⚡',
    xp: Number(overrides.xp ?? 0),
    completedLessons: Array.isArray(overrides.completedLessons) ? overrides.completedLessons : [],
    quizStats: {
      attempts: Number(overrides.quizStats?.attempts ?? 0),
      highestScore: Number(overrides.quizStats?.highestScore ?? 0),
      lastScore: Number(overrides.quizStats?.lastScore ?? 0),
      totalAnswered: Number(overrides.quizStats?.totalAnswered ?? 0),
      correctAnswers: Number(overrides.quizStats?.correctAnswers ?? 0)
    },
    unlockedBadges: Array.isArray(overrides.unlockedBadges) ? overrides.unlockedBadges : [],
    dailyChallengeClaimed: Boolean(overrides.dailyChallengeClaimed),
    dailyLoginStreak: Number(overrides.dailyLoginStreak ?? 0),
    lastLoginDate: overrides.lastLoginDate || null,
    progressPercent: Number(overrides.progressPercent ?? 0),
    notifications: Array.isArray(overrides.notifications) ? overrides.notifications : [],
    quizHistory: Array.isArray(overrides.quizHistory) ? overrides.quizHistory : [],
    settings: { ...buildDefaultSettings(), ...(overrides.settings || {}) }
  };

  return nextProfile;
};

export const BADGES_DEFINITION = [
  {
    id: 'first_step',
    title: 'First Blood',
    description: 'Completed your first security lesson',
    icon: '🎯',
    category: 'Lesson'
  },
  {
    id: 'phishing_scout',
    title: 'Phishing Scout',
    description: 'Mastered the Phishing Awareness module',
    icon: '🎣',
    category: 'Mastery'
  },
  {
    id: 'password_guardian',
    title: 'Vault Keeper',
    description: 'Learned password hygiene & MFA rules',
    icon: '🔑',
    category: 'Mastery'
  },
  {
    id: 'malware_defender',
    title: 'Malware Hunter',
    description: 'Completed Malware & Ransomware modules',
    icon: '🛡️',
    category: 'Mastery'
  },
  {
    id: 'social_engineer_shield',
    title: 'Mind Guard',
    description: 'Finished Social Engineering defense training',
    icon: '🧠',
    category: 'Mastery'
  },
  {
    id: 'quiz_master',
    title: 'Quiz Mastermind',
    description: 'Scored 90%+ on the Cyber Security Assessment Quiz',
    icon: '🏆',
    category: 'Quiz'
  },
  {
    id: 'speed_demon',
    title: 'Cyber Sentinel',
    description: 'Reached Level 3 in Security Training',
    icon: '🚀',
    category: 'Level'
  },
  {
    id: 'streak_7',
    title: 'Daily Operator',
    description: 'Maintained a 5+ day training login streak',
    icon: '🔥',
    category: 'Streak'
  }
];

export const getLevelInfo = (xp) => {
  const xpPerLevel = 250;
  const level = Math.floor(xp / xpPerLevel) + 1;
  const currentLevelXp = xp % xpPerLevel;
  const progressPercent = Math.min(100, Math.round((currentLevelXp / xpPerLevel) * 100));

  let rankTitle = 'Cyber Initiate';
  if (level >= 2) rankTitle = 'Security Specialist';
  if (level >= 3) rankTitle = 'Cyber Sentinel';
  if (level >= 4) rankTitle = 'Threat Hunter';
  if (level >= 5) rankTitle = 'Chief Security Officer';

  return {
    level,
    currentLevelXp,
    xpPerLevel,
    progressPercent,
    rankTitle
  };
};

export const DAILY_CHALLENGE = {
  id: 'daily_phishing_check',
  title: 'Identify Suspicious Links',
  description: 'Review lesson notes on Spear Phishing and verify email headers.',
  rewardXp: 75,
  badgeTarget: 'daily_operator'
};

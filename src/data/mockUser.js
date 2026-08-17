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
  password: '',
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
  longestStreak: 0,
  lastActiveDate: null,
  lastLoginDate: null,
  progressPercent: 0,
  notifications: [],
  quizHistory: [],
  lessonScores: {},
  settings: buildDefaultSettings()
};

export const createInitialUserProfile = (overrides = {}) => {
  const nextProfile = {
    ...INITIAL_USER,
    ...overrides,
    id: overrides.id || `user-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    name: (overrides.name || '').trim(),
    email: ((overrides.email || '').trim()).toLowerCase(),
    password: overrides.password || '',
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
    longestStreak: Number(overrides.longestStreak ?? 0),
    lastActiveDate: overrides.lastActiveDate || null,
    lastLoginDate: overrides.lastLoginDate || null,
    progressPercent: Number(overrides.progressPercent ?? 0),
    notifications: Array.isArray(overrides.notifications) ? overrides.notifications : [],
    quizHistory: Array.isArray(overrides.quizHistory) ? overrides.quizHistory : [],
    lessonScores: overrides.lessonScores || {},
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

// ─── Level Definitions ─────────────────────────────────────────────────────────
export const LEVEL_DEFINITIONS = [
  {
    level: 1,
    name: 'Cyber Recruit',
    minXp: 0,
    maxXp: 199,
    rankTitle: 'Cyber Initiate',
    benefit: 'Access to beginner lessons and basic quiz modules',
    icon: '🛡️'
  },
  {
    level: 2,
    name: 'Security Explorer',
    minXp: 200,
    maxXp: 499,
    rankTitle: 'Security Specialist',
    benefit: 'Unlock additional challenges and intermediate lessons',
    icon: '🔍'
  },
  {
    level: 3,
    name: 'Cyber Defender',
    minXp: 500,
    maxXp: 999,
    rankTitle: 'Cyber Sentinel',
    benefit: 'Unlock advanced learning content and cyber games',
    icon: '⚔️'
  },
  {
    level: 4,
    name: 'Security Specialist',
    minXp: 1000,
    maxXp: 1999,
    rankTitle: 'Threat Hunter',
    benefit: 'Unlock advanced challenges and certification progress tracking',
    icon: '🎖️'
  },
  {
    level: 5,
    name: 'Chief Security Officer',
    minXp: 2000,
    maxXp: Infinity,
    rankTitle: 'Chief Security Officer',
    benefit: 'Full platform access, elite leaderboard status, and mentor capabilities',
    icon: '👑'
  }
];

export const getLevelInfo = (xp) => {
  const numXp = Number(xp) || 0;

  // Find the current level from LEVEL_DEFINITIONS
  let currentLevelDef = LEVEL_DEFINITIONS[0];
  for (const def of LEVEL_DEFINITIONS) {
    if (numXp >= def.minXp) {
      currentLevelDef = def;
    }
  }

  const level = currentLevelDef.level;
  const nextLevelDef = LEVEL_DEFINITIONS.find(d => d.level === level + 1);

  const currentLevelMinXp = currentLevelDef.minXp;
  const nextLevelMinXp = nextLevelDef ? nextLevelDef.minXp : currentLevelDef.maxXp;
  const xpRange = nextLevelMinXp - currentLevelMinXp;
  const currentLevelXp = numXp - currentLevelMinXp;
  const xpToNextLevel = Math.max(0, nextLevelMinXp - numXp);
  const progressPercent = xpRange > 0 ? Math.min(100, Math.round((currentLevelXp / xpRange) * 100)) : 100;

  return {
    level,
    currentLevelXp,
    xpPerLevel: xpRange,
    xpToNextLevel,
    progressPercent,
    rankTitle: currentLevelDef.rankTitle,
    levelName: currentLevelDef.name,
    benefit: currentLevelDef.benefit,
    icon: currentLevelDef.icon,
    nextLevelName: nextLevelDef ? nextLevelDef.name : null,
    nextLevelBenefit: nextLevelDef ? nextLevelDef.benefit : null
  };
};

export const DAILY_CHALLENGE = {
  id: 'daily_phishing_check',
  title: 'Identify Suspicious Links',
  description: 'Review lesson notes on Spear Phishing and verify email headers.',
  rewardXp: 75,
  badgeTarget: 'daily_operator'
};

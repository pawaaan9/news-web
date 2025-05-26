import Cookies from 'js-cookie';

interface UserPreferences {
  language: string;
  location: string;
  interests: string[];
  lastUpdated: number;
}

const USER_PREFS_COOKIE = 'user_preferences';
const DEFAULT_LANGUAGE = 'ta'; // Tamil
const DEFAULT_LOCATION = 'IN'; // India

export const getUserPreferences = (): UserPreferences => {
  const prefs = Cookies.get(USER_PREFS_COOKIE);
  if (prefs) {
    return JSON.parse(prefs);
  }
  
  // Set default preferences
  const defaultPrefs: UserPreferences = {
    language: DEFAULT_LANGUAGE,
    location: DEFAULT_LOCATION,
    interests: [],
    lastUpdated: Date.now()
  };
  
  Cookies.set(USER_PREFS_COOKIE, JSON.stringify(defaultPrefs), { expires: 365 });
  return defaultPrefs;
};

export const updateUserPreferences = (updates: Partial<UserPreferences>) => {
  const currentPrefs = getUserPreferences();
  const updatedPrefs = {
    ...currentPrefs,
    ...updates,
    lastUpdated: Date.now()
  };
  
  Cookies.set(USER_PREFS_COOKIE, JSON.stringify(updatedPrefs), { expires: 365 });
  return updatedPrefs;
};

export const addInterest = (interest: string) => {
  const prefs = getUserPreferences();
  if (!prefs.interests.includes(interest)) {
    prefs.interests.push(interest);
    updateUserPreferences(prefs);
  }
};

export const getTopInterests = (): string[] => {
  return getUserPreferences().interests;
};

// Helper to detect user's language
export const detectUserLanguage = (): string => {
  if (typeof window === 'undefined') return DEFAULT_LANGUAGE;
  
  const browserLang = navigator.language || (navigator as any).userLanguage;
  return browserLang.startsWith('ta') ? 'ta' : DEFAULT_LANGUAGE;
};

// Helper to detect user's location
export const detectUserLocation = async (): Promise<string> => {
  try {
    const response = await fetch('https://ipapi.co/json/');
    const data = await response.json();
    return data.country_code || DEFAULT_LOCATION;
  } catch {
    return DEFAULT_LOCATION;
  }
}; 
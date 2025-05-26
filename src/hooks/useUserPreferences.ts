import { useState, useEffect } from "react";
import {
  getUserPreferences,
  updateUserPreferences,
  detectUserLanguage,
  detectUserLocation,
  addInterest,
} from "@/utils/user-preferences";

export const useUserPreferences = () => {
  const [preferences, setPreferences] = useState(getUserPreferences());
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializePreferences = async () => {
      try {
        // Detect language and location
        const [language, location] = await Promise.all([
          detectUserLanguage(),
          detectUserLocation(),
        ]);

        // Update preferences if needed
        if (
          language !== preferences.language ||
          location !== preferences.location
        ) {
          const updated = updateUserPreferences({ language, location });
          setPreferences(updated);
        }
      } catch (error) {
        console.error("Error initializing user preferences:", error);
      } finally {
        setIsLoading(false);
      }
    };

    initializePreferences();
  }, [preferences.language, preferences.location]);

  const updatePreferences = (updates: Partial<typeof preferences>) => {
    const updated = updateUserPreferences(updates);
    setPreferences(updated);
  };

  const addUserInterest = (interest: string) => {
    addInterest(interest);
    setPreferences(getUserPreferences());
  };

  return {
    preferences,
    isLoading,
    updatePreferences,
    addUserInterest,
  };
};

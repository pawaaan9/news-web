"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface Country {
  name: string;
  code: string;
}

interface CountryContextType {
  selectedCountry: Country;
  setSelectedCountry: (country: Country) => void;
}

const defaultCountry: Country = { name: "இலங்கை", code: "LK" };

const CountryContext = createContext<CountryContextType | undefined>(undefined);

export function CountryProvider({ children }: { children: ReactNode }) {
  const [selectedCountry, setSelectedCountry] = useState<Country>(defaultCountry);

  return (
    <CountryContext.Provider value={{ selectedCountry, setSelectedCountry }}>
      {children}
    </CountryContext.Provider>
  );
}

export function useCountry() {
  const context = useContext(CountryContext);
  if (context === undefined) {
    throw new Error("useCountry must be used within a CountryProvider");
  }
  return context;
} 
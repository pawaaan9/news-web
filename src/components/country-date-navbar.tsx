"use client";

import { useState, useEffect } from "react";
import ReactCountryFlag from "react-country-flag";
import { ChevronDown } from "lucide-react";
import { useCountry } from "@/contexts/country-context";

interface Country {
  name: string;
  code: string;
}

const countries: Country[] = [
  { name: "இலங்கை", code: "LK" }, // Sri Lanka
  { name: "இந்தியா", code: "IN" }, // India
  { name: "கனடா", code: "CA" }, // Canada
  { name: "அமெரிக்கா", code: "US" }, // USA
  { name: "பிரித்தானியா", code: "GB" }, // UK
  { name: "சுவிஸ்", code: "CH" }, // Switzerland
  { name: "ஜேர்மனி", code: "DE" }, // Germany
  { name: "அவுஸ்திரேலியா", code: "AU" }, // Australia
];

export default function CountryAndDate() {
  const { selectedCountry, setSelectedCountry } = useCountry();
  const [currentDate, setCurrentDate] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const today = new Date();
    const formattedDate = today.toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    setCurrentDate(formattedDate);
  }, []);

  return (
    <nav className="w-full bg-secondary-grey shadow px-4 py-2">
      <div className="flex items-center justify-between md:px-[10%]">
        {/* Country Selector */}
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-2 text-charcoal hover:text-accent-teal transition-colors border rounded-md px-3 py-1 bg-white shadow-sm focus:outline-none focus:ring-1 focus:ring-accent-teal"
          >
            <ReactCountryFlag
              countryCode={selectedCountry.code}
              svg
              style={{
                width: "1.2em",
                height: "1.2em",
              }}
              title={selectedCountry.name}
            />
            <span className="text-sm font-medium">{selectedCountry.name}</span>
            <ChevronDown
              size={16}
              className={`transition-transform ${
                isDropdownOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute top-full left-0 mt-1 bg-white rounded-md shadow-lg z-50 min-w-[160px]">
              {countries.map((country) => (
                <button
                  key={country.code}
                  onClick={() => {
                    setSelectedCountry(country);
                    setIsDropdownOpen(false);
                  }}
                  className={`w-full flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-100 transition-colors ${
                    selectedCountry.code === country.code
                      ? "bg-gray-50 text-accent-teal"
                      : "text-gray-700"
                  }`}
                >
                  <ReactCountryFlag
                    countryCode={country.code}
                    svg
                    style={{
                      width: "1.2em",
                      height: "1.2em",
                    }}
                    title={country.name}
                  />
                  <span>{country.name}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Date */}
        <div className="text-charcoal text-sm font-medium">{currentDate}</div>
      </div>
    </nav>
  );
}

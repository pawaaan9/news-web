'use client';

import { useState, useEffect } from 'react';

const countries = ['Sri Lanka','India'];

export default function CountryAndDate() {
  const [selectedCountry, setSelectedCountry] = useState('Sri Lanka');
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    const today = new Date();
    const formattedDate = today.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    setCurrentDate(formattedDate);
  }, []);

  return (
    <nav className="w-full bg-secondary-grey shadow px-4 py-3 flex items-center">
      <div className="flex items-center space-x-4 md:px-[10%] h-3.5">
        <select
          value={selectedCountry}
          onChange={(e) => setSelectedCountry(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-secondary-500 text-charcoal"
        >
          {countries.map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>

        <span className="text-gray-700 text-sm">{currentDate}</span>
      </div>
    </nav>
  );
}

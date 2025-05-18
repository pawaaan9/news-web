"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, Search, ChevronDown, ChevronUp, Home } from "lucide-react";
import CountryAndDate from "./country-date-navbar";
import Image from "next/image";
import { categories } from "@/data/categories";
import logoTamil from "@/assets/images/tamilmedia.lk-weblogo-light.png";

interface NavBarProps {
  onCategorySelect: (category: string | null) => void;
  selectedCategory: string | null;
}

export default function NavBar({
  onCategorySelect,
  selectedCategory,
}: NavBarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showMobileMore, setShowMobileMore] = useState(false);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  // Split categories into main and additional items
  const mainNavItems = categories.slice(0, 6);
  const additionalNavItems = categories.slice(6);

  const handleCategoryClick = (category: string) => {
    if (selectedCategory === category) {
      onCategorySelect(null); // Deselect if clicking the same category
    } else {
      onCategorySelect(category);
    }
    setMobileMenuOpen(false);
  };

  const handleCategoryHover = (categoryName: string) => {
    setExpandedCategory(categoryName);
  };

  const handleCategoryLeave = () => {
    setExpandedCategory(null);
  };

  return (
    <div className="w-full bg-primary text-white font-dmSans">
      <CountryAndDate />

      {/* Top Section with Logo and Ad (Desktop) */}
      <div className="flex items-center justify-between px-4 py-3 lg:px-[10%]">
        <div className="text-lg font-bold">
          <Link
            href="/"
            className="flex items-center"
            onClick={() => onCategorySelect(null)}
          >
            <Image
              src={logoTamil}
              alt="Website Logo"
              width={120}
              height={40}
              className="h-12 w-auto"
            />
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Desktop Nav */}
      <div className="hidden lg:flex items-center justify-between bg-charcoal px-[10%] py-2">
        <div className="flex space-x-1">
          <button
            onClick={() => onCategorySelect(null)}
            className={`px-3 py-1 text-sm flex items-center gap-1 ${
              !selectedCategory
                ? "bg-accent-teal text-charcoal font-semibold rounded-sm"
                : ""
            }`}
          >
            <Home size={16} />
            Home
          </button>
          {mainNavItems.map((item) => (
            <div
              key={item.name}
              className="relative"
              onMouseEnter={() => handleCategoryHover(item.name)}
              onMouseLeave={handleCategoryLeave}
            >
              <button
                onClick={() => handleCategoryClick(item.name)}
                className={`px-3 py-1 text-sm flex items-center ${
                  selectedCategory === item.name
                    ? "bg-accent-teal text-charcoal font-semibold rounded-sm"
                    : ""
                }`}
              >
                {item.name}
                {item.subCategories && (
                  <ChevronDown size={16} className="ml-1" />
                )}
              </button>

              {item.subCategories && expandedCategory === item.name && (
                <div className="absolute left-0 mt-1 w-48 bg-charcoal text-white shadow-lg rounded-sm z-10">
                  {item.subCategories.map((subCat) => (
                    <button
                      key={subCat.name}
                      onClick={() => handleCategoryClick(subCat.name)}
                      className={`block w-full text-left px-4 py-2 text-sm hover:bg-accent-teal ${
                        selectedCategory === subCat.name
                          ? "bg-accent-teal text-charcoal font-semibold"
                          : ""
                      }`}
                    >
                      {subCat.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}

          {/* More dropdown */}
          <div className="relative">
            <button
              onClick={() => handleCategoryClick(additionalNavItems[0].name)}
              className={`px-3 py-1 text-sm flex items-center ${
                selectedCategory === additionalNavItems[0].name
                  ? "bg-accent-teal text-charcoal font-semibold rounded-sm"
                  : ""
              }`}
            >
              Other
              <ChevronDown size={16} className="ml-1" />
            </button>

            {selectedCategory === additionalNavItems[0].name && (
              <div className="absolute left-0 mt-1 w-48 bg-charcoal text-white shadow-lg rounded-sm z-10">
                {additionalNavItems.map((item) => (
                  <div key={item.name} className="relative group">
                    <button
                      onClick={() => handleCategoryClick(item.name)}
                      className={`block w-full text-left px-4 py-2 text-sm hover:bg-accent-teal flex items-center justify-between ${
                        selectedCategory === item.name
                          ? "bg-accent-teal text-charcoal font-semibold"
                          : ""
                      }`}
                    >
                      {item.name}
                      {item.subCategories && <ChevronDown size={16} />}
                    </button>
                    {item.subCategories && (
                      <div className="hidden group-hover:block absolute left-full top-0 w-48 bg-charcoal text-white shadow-lg rounded-sm">
                        {item.subCategories.map((subCat) => (
                          <button
                            key={subCat.name}
                            onClick={() => handleCategoryClick(subCat.name)}
                            className={`block w-full text-left px-4 py-2 text-sm hover:bg-accent-teal ${
                              selectedCategory === subCat.name
                                ? "bg-accent-teal text-charcoal font-semibold"
                                : ""
                            }`}
                          >
                            {subCat.name}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent border border-accent-teal rounded-full px-4 py-1 text-sm text-white placeholder:text-white"
          />
          <Search
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-accent-teal"
            size={16}
          />
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white text-primary flex flex-col h-[calc(100vh-120px)]">
          {/* Search bar at top */}
          <div className="relative p-4">
            <input
              type="text"
              placeholder="Search..."
              className="w-full bg-gray-100 border border-gray-300 rounded-full px-4 py-2 text-sm text-primary placeholder:text-gray-500"
            />
            <Search
              className="absolute right-7 top-1/2 transform -translate-y-1/2 text-gray-500"
              size={16}
            />
          </div>

          {/* Mobile Ad */}
          <div className="w-[92%] h-20 bg-gray-300 mx-4 mb-2 relative">
            <div className="w-full h-full flex items-center justify-center">
              <p className="text-gray-500">Mobile Ad</p>
            </div>
            <div className="absolute bottom-1 right-1 bg-black bg-opacity-70 text-white text-xs px-1 border border-white rounded">
              Ad
            </div>
          </div>

          {/* Scrollable menu items */}
          <div className="flex-1 overflow-y-auto pb-4">
            <div
              className={`px-4 py-3 text-sm font-medium flex items-center gap-2 ${
                !selectedCategory ? "bg-primary text-white" : ""
              }`}
              onClick={() => onCategorySelect(null)}
            >
              <Home size={16} />
              Home
            </div>
            {mainNavItems.map((item) => (
              <div key={item.name}>
                <div
                  className={`px-4 py-3 text-sm font-medium flex items-center justify-between ${
                    selectedCategory === item.name
                      ? "bg-primary text-white"
                      : ""
                  }`}
                  onClick={() => {
                    if (item.subCategories) {
                      setExpandedCategory(
                        expandedCategory === item.name ? null : item.name
                      );
                    } else {
                      handleCategoryClick(item.name);
                    }
                  }}
                >
                  <span>{item.name}</span>
                  {item.subCategories &&
                    (expandedCategory === item.name ? (
                      <ChevronUp size={16} />
                    ) : (
                      <ChevronDown size={16} />
                    ))}
                </div>
                {item.subCategories && expandedCategory === item.name && (
                  <div className="pl-4">
                    {item.subCategories.map((subCat) => (
                      <div
                        key={subCat.name}
                        className={`px-4 py-3 text-sm font-medium ${
                          selectedCategory === subCat.name
                            ? "bg-primary text-white"
                            : ""
                        }`}
                        onClick={() => handleCategoryClick(subCat.name)}
                      >
                        {subCat.name}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Other Categories section in mobile */}
            <div className="border-t border-gray-200 pt-2">
              <button
                onClick={() => setShowMobileMore(!showMobileMore)}
                className="flex items-center justify-between w-full px-4 py-3 text-sm font-medium"
              >
                <span>Other Categories</span>
                {showMobileMore ? (
                  <ChevronUp size={16} />
                ) : (
                  <ChevronDown size={16} />
                )}
              </button>

              {showMobileMore && (
                <div className="pl-4">
                  {additionalNavItems.map((item) => (
                    <div key={item.name}>
                      <div
                        className={`px-4 py-3 text-sm font-medium flex items-center justify-between ${
                          selectedCategory === item.name
                            ? "bg-primary text-white"
                            : ""
                        }`}
                        onClick={() => {
                          if (item.subCategories) {
                            setExpandedCategory(
                              expandedCategory === item.name ? null : item.name
                            );
                          } else {
                            handleCategoryClick(item.name);
                          }
                        }}
                      >
                        <span>{item.label}</span>
                        {item.subCategories &&
                          (expandedCategory === item.name ? (
                            <ChevronUp size={16} />
                          ) : (
                            <ChevronDown size={16} />
                          ))}
                      </div>
                      {item.subCategories && expandedCategory === item.name && (
                        <div className="pl-4">
                          {item.subCategories.map((subCat) => (
                            <div
                              key={subCat.name}
                              className={`px-4 py-3 text-sm font-medium ${
                                selectedCategory === subCat.name
                                  ? "bg-primary text-white"
                                  : ""
                              }`}
                              onClick={() => handleCategoryClick(subCat.name)}
                            >
                              {subCat.label}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

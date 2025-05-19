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
  isStaticPage?: boolean;
}

export default function NavBar({
  onCategorySelect,
  selectedCategory,
  isStaticPage = false,
}: NavBarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  // Split categories into main and additional items
  const mainNavItems = categories.slice(0, 6);
  const additionalNavItems = categories.slice(6);

  const handleCategoryClick = (category: string) => {
    if (isStaticPage) return; // Don't handle category clicks on static pages
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
    <div className="fixed top-0 left-0 right-0 z-50 text-white font-dmSans">
      <div className="bg-charcoal">
        <CountryAndDate />
      </div>

      <div
        style={{
          background: "linear-gradient(to right, #ff3131, #ff914d)",
        }}
      >
        {/* Top Section with Logo and Ad (Desktop) */}
        <div className="flex items-center justify-between px-4 py-3 lg:px-[10%]">
          {/* Mobile Home Icon */}
          <div className="lg:hidden">
            <Link href="/" onClick={() => onCategorySelect(null)}>
              <Home size={24} className="text-white" />
            </Link>
          </div>

          {/* Logo - Centered on mobile */}
          <div className="text-lg font-bold flex-1 flex justify-center lg:justify-start">
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
        <div className="hidden lg:flex items-center justify-between px-[10%] py-2 bg-charcoal">
          <div className="flex space-x-1">
            <Link
              href="/"
              onClick={() => onCategorySelect(null)}
              className={`px-3 py-1 text-sm flex items-center gap-1 rounded-sm transition-all duration-200 ${
                !selectedCategory
                  ? "bg-gradient-to-r from-[#ff3131] to-[#ff914d] text-white font-semibold"
                  : "hover:bg-gradient-to-r hover:from-[#ff3131] hover:to-[#ff914d] hover:text-white"
              }`}
            >
              <Home size={16} />
              Home
            </Link>
            {mainNavItems.map((item) => (
              <div
                key={item.name}
                className="relative"
                onMouseEnter={() => handleCategoryHover(item.name)}
                onMouseLeave={handleCategoryLeave}
              >
                <Link
                  href={`/?category=${item.name}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleCategoryClick(item.name);
                  }}
                  className={`px-3 py-1 text-sm flex items-center rounded-sm transition-all duration-200 ${
                    selectedCategory === item.name
                      ? "bg-gradient-to-r from-[#ff3131] to-[#ff914d] text-white font-semibold"
                      : "hover:bg-gradient-to-r hover:from-[#ff3131] hover:to-[#ff914d] hover:text-white"
                  }`}
                >
                  {item.name}
                  {item.subCategories && (
                    <ChevronDown size={16} className="ml-1" />
                  )}
                </Link>

                {expandedCategory === item.name && item.subCategories && (
                  <div className="absolute left-0 mt-1 w-48 bg-white/95 text-primary shadow-lg rounded-sm z-10">
                    {item.subCategories.map((subCat) => (
                      <Link
                        key={subCat.name}
                        href={`/?category=${subCat.name}`}
                        onClick={(e) => {
                          e.preventDefault();
                          handleCategoryClick(subCat.name);
                        }}
                        className={`block w-full text-left px-4 py-2 text-sm transition-all duration-200 ${
                          selectedCategory === subCat.name
                            ? "bg-gradient-to-r from-[#ff3131] to-[#ff914d] text-white font-semibold"
                            : "hover:bg-gradient-to-r hover:from-[#ff3131] hover:to-[#ff914d] hover:text-white"
                        }`}
                      >
                        {subCat.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* More dropdown */}
            <div className="relative">
              <Link
                href={`/?category=${additionalNavItems[0].name}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleCategoryClick(additionalNavItems[0].name);
                }}
                className={`px-3 py-1 text-sm flex items-center rounded-sm transition-all duration-200 ${
                  selectedCategory === additionalNavItems[0].name
                    ? "bg-gradient-to-r from-[#ff3131] to-[#ff914d] text-white font-semibold"
                    : "hover:bg-gradient-to-r hover:from-[#ff3131] hover:to-[#ff914d] hover:text-white"
                }`}
              >
                Other
                <ChevronDown size={16} className="ml-1" />
              </Link>

              {selectedCategory === additionalNavItems[0].name && (
                <div className="absolute left-0 mt-1 w-48 bg-white/95 text-primary shadow-lg rounded-sm z-10">
                  {additionalNavItems.map((item) => (
                    <div key={item.name} className="relative group">
                      <Link
                        href={`/?category=${item.name}`}
                        onClick={(e) => {
                          e.preventDefault();
                          handleCategoryClick(item.name);
                        }}
                        className={`block w-full text-left px-4 py-2 text-sm transition-all duration-200 flex items-center justify-between ${
                          selectedCategory === item.name
                            ? "bg-gradient-to-r from-[#ff3131] to-[#ff914d] text-white font-semibold"
                            : "hover:bg-gradient-to-r hover:from-[#ff3131] hover:to-[#ff914d] hover:text-white"
                        }`}
                      >
                        {item.name}
                        {item.subCategories && <ChevronDown size={16} />}
                      </Link>

                      {item.subCategories && (
                        <div className="hidden group-hover:block absolute left-full top-0 w-48 bg-white/95 text-primary shadow-lg rounded-sm">
                          {item.subCategories.map((subCat) => (
                            <Link
                              key={subCat.name}
                              href={`/?category=${subCat.name}`}
                              onClick={(e) => {
                                e.preventDefault();
                                handleCategoryClick(subCat.name);
                              }}
                              className={`block w-full text-left px-4 py-2 text-sm transition-all duration-200 ${
                                selectedCategory === subCat.name
                                  ? "bg-gradient-to-r from-[#ff3131] to-[#ff914d] text-white font-semibold"
                                  : "hover:bg-gradient-to-r hover:from-[#ff3131] hover:to-[#ff914d] hover:text-white"
                              }`}
                            >
                              {subCat.name}
                            </Link>
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
              className="bg-white/10 border border-white/20 rounded-full px-4 py-1 text-sm text-white placeholder:text-white/70 focus:outline-none focus:border-white/40 transition-colors"
            />
            <Search
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/70"
              size={16}
            />
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-charcoal text-white flex flex-col h-[calc(100vh-120px)]">
            {/* Search bar at top */}
            <div className="relative p-4">
              <input
                type="text"
                placeholder="Search..."
                className="w-full bg-white/10 border border-white/20 rounded-full px-4 py-2 text-sm text-white placeholder:text-white/70 focus:outline-none focus:border-white/40"
              />
              <Search
                className="absolute right-7 top-1/2 transform -translate-y-1/2 text-white/70"
                size={16}
              />
            </div>

            {/* Scrollable menu items */}
            <div className="flex-1 overflow-y-auto pb-4">
              <Link
                href="/"
                onClick={() => {
                  onCategorySelect(null);
                  setMobileMenuOpen(false);
                }}
                className={`px-4 py-3 text-sm font-medium flex items-center gap-2 ${
                  !selectedCategory
                    ? "bg-gradient-to-r from-[#ff3131] to-[#ff914d] text-white"
                    : ""
                }`}
              >
                <Home size={16} />
                Home
              </Link>

              {categories.map((item) => (
                <div key={item.name}>
                  <Link
                    href={`/?category=${item.name}`}
                    onClick={(e) => {
                      e.preventDefault();
                      if (item.subCategories) {
                        setExpandedCategory(
                          expandedCategory === item.name ? null : item.name
                        );
                      } else {
                        handleCategoryClick(item.name);
                        setMobileMenuOpen(false);
                      }
                    }}
                    className={`px-4 py-3 text-sm font-medium flex items-center justify-between ${
                      selectedCategory === item.name
                        ? "bg-gradient-to-r from-[#ff3131] to-[#ff914d] text-white"
                        : ""
                    }`}
                  >
                    <span>{item.name}</span>
                    {item.subCategories &&
                      (expandedCategory === item.name ? (
                        <ChevronUp size={16} />
                      ) : (
                        <ChevronDown size={16} />
                      ))}
                  </Link>
                  {item.subCategories && expandedCategory === item.name && (
                    <div className="pl-4">
                      {item.subCategories.map((subCat) => (
                        <Link
                          key={subCat.name}
                          href={`/?category=${subCat.name}`}
                          onClick={(e) => {
                            e.preventDefault();
                            handleCategoryClick(subCat.name);
                            setMobileMenuOpen(false);
                          }}
                          className={`px-4 py-3 text-sm font-medium block ${
                            selectedCategory === subCat.name
                              ? "bg-gradient-to-r from-[#ff3131] to-[#ff914d] text-white"
                              : ""
                          }`}
                        >
                          {subCat.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

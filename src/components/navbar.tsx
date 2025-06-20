"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X, Search, ChevronDown, Home } from "lucide-react";
import CountryAndDate from "./country-date-navbar";
import Image from "next/image";
import { categories } from "@/data/categories";
import logoTamil from "@/assets/images/Logo-web-final.png";
import { getLogo } from "@/api/logo.api";
import { getTopCategories } from "@/utils/cookies";

interface NavBarProps {
  onCategorySelect: (category: string | null) => void;
  selectedCategory: string | null;
  isStaticPage?: boolean;
  onSearch?: (query: string) => void;
  showSearchBar?: boolean;
}

export default function NavBar({
  onCategorySelect,
  selectedCategory,
  isStaticPage = false,
  onSearch,
  showSearchBar = false,
}: NavBarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [showCountryBar, setShowCountryBar] = useState(true);
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [hoverTimeout, setHoverTimeout] = useState<NodeJS.Timeout | null>(null);
  const [frequentCategories, setFrequentCategories] = useState<string[]>([]);

  useEffect(() => {
    const fetchLogo = async () => {
      try {
        const res = await getLogo();
        if (res && res.data && typeof res.data.url === "string") {
          setLogoUrl(res.data.url);
        } else {
          setLogoUrl(null);
        }
      } catch {
        setLogoUrl(null);
      }
    };
    fetchLogo();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setShowCountryBar(window.scrollY < 10);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Get frequently viewed categories
    const topCategories = getTopCategories();
    setFrequentCategories(topCategories);
  }, []);

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
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
      setHoverTimeout(null);
    }
    setExpandedCategory(categoryName);
  };

  const handleCategoryLeave = () => {
    const timeout = setTimeout(() => {
      setExpandedCategory(null);
    }, 100); // Small delay to prevent accidental closing
    setHoverTimeout(timeout);
  };

  useEffect(() => {
    return () => {
      if (hoverTimeout) {
        clearTimeout(hoverTimeout);
      }
    };
  }, [hoverTimeout]);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 text-white font-dmSans">
      {showCountryBar && (
        <div className="w-full bg-charcoal z-40">
          <CountryAndDate />
        </div>
      )}

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
                src={logoUrl ?? logoTamil}
                alt="Website Logo"
                width={120}
                height={40}
                className="h-12 w-auto"
                priority
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
              முகப்பு
            </Link>

            {/* Frequently Viewed Categories */}
            {frequentCategories.length > 0 && (
              <div className="relative group">
                <button className="px-3 py-1 text-sm flex items-center rounded-sm transition-all duration-200 hover:bg-gradient-to-r hover:from-[#ff3131] hover:to-[#ff914d] hover:text-white">
                  பிரபலமான பிரிவுகள்
                  <ChevronDown
                    size={16}
                    className="ml-1 transition-transform duration-200 group-hover:rotate-180"
                  />
                </button>

                <div className="absolute left-0 mt-1 w-48 bg-white/95 text-primary shadow-lg rounded-sm z-10 transition-all duration-200 transform origin-top opacity-0 scale-95 pointer-events-none group-hover:opacity-100 group-hover:scale-100">
                  {frequentCategories.map((category) => (
                    <Link
                      key={category}
                      href={`/?category=${category}`}
                      onClick={(e) => {
                        e.preventDefault();
                        handleCategoryClick(category);
                      }}
                      className="block w-full text-left px-4 py-2 text-sm transition-all duration-200 hover:bg-gradient-to-r hover:from-[#ff3131] hover:to-[#ff914d] hover:text-white"
                    >
                      {category}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {mainNavItems.map((item) => (
              <div
                key={item.name}
                className="relative group"
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
                    <ChevronDown
                      size={16}
                      className="ml-1 transition-transform duration-200 group-hover:rotate-180"
                    />
                  )}
                </Link>

                {item.subCategories && (
                  <div
                    className={`absolute left-0 mt-1 w-48 bg-white/95 text-primary shadow-lg rounded-sm z-10 transition-all duration-200 transform origin-top ${
                      expandedCategory === item.name
                        ? "opacity-100 scale-100"
                        : "opacity-0 scale-95 pointer-events-none"
                    }`}
                  >
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
            <div
              className="relative group"
              onMouseEnter={() =>
                handleCategoryHover(additionalNavItems[0].name)
              }
              onMouseLeave={handleCategoryLeave}
            >
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
                ஏனையவை
                <ChevronDown
                  size={16}
                  className="ml-1 transition-transform duration-200 group-hover:rotate-180"
                />
              </Link>

              <div
                className={`absolute left-0 mt-1 w-48 bg-white/95 text-primary shadow-lg rounded-sm z-10 transition-all duration-200 transform origin-top ${
                  expandedCategory === additionalNavItems[0].name
                    ? "opacity-100 scale-100"
                    : "opacity-0 scale-95 pointer-events-none"
                }`}
                onMouseEnter={() =>
                  handleCategoryHover(additionalNavItems[0].name)
                }
                onMouseLeave={handleCategoryLeave}
              >
                {additionalNavItems.map((item) => (
                  <div key={item.name} className="relative group/sub">
                    <Link
                      href={`/?category=${item.name}`}
                      onClick={(e) => {
                        e.preventDefault();
                        handleCategoryClick(item.name);
                      }}
                      className={` w-full text-left px-4 py-2 text-sm transition-all duration-200 flex items-center justify-between ${
                        selectedCategory === item.name
                          ? "bg-gradient-to-r from-[#ff3131] to-[#ff914d] text-white font-semibold"
                          : "hover:bg-gradient-to-r hover:from-[#ff3131] hover:to-[#ff914d] hover:text-white"
                      }`}
                    >
                      {item.name}
                      {item.subCategories && (
                        <ChevronDown
                          size={16}
                          className="transition-transform duration-200 group-hover/sub:rotate-180"
                        />
                      )}
                    </Link>

                    {item.subCategories && (
                      <div className="hidden group-hover/sub:block absolute left-full top-0 w-48 bg-white/95 text-primary shadow-lg rounded-sm z-20 transition-all duration-200">
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
            </div>
          </div>

          {showSearchBar && (
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                onChange={(e) => onSearch?.(e.target.value)}
                className="bg-white/10 border border-white/20 rounded-full px-4 py-1 text-sm text-white placeholder:text-white/70 focus:outline-none focus:border-white/40 transition-colors"
              />
              <Search
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/70"
                size={16}
              />
            </div>
          )}
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-charcoal text-white flex flex-col h-[calc(100vh-120px)]">
            {/* Search bar at top */}
            {showSearchBar && (
              <div className="relative p-4">
                <input
                  type="text"
                  placeholder="Search..."
                  onChange={(e) => onSearch?.(e.target.value)}
                  className="w-full bg-white/10 border border-white/20 rounded-full px-4 py-2 text-sm text-white placeholder:text-white/70 focus:outline-none focus:border-white/40"
                />
                <Search
                  className="absolute right-7 top-1/2 transform -translate-y-1/2 text-white/70"
                  size={16}
                />
              </div>
            )}

            {/* Scrollable menu items */}
            <div className="flex-1 overflow-y-auto pb-4">
              <Link
                href="/"
                onClick={() => {
                  onCategorySelect(null);
                  setMobileMenuOpen(false);
                }}
                className={`px-4 py-3 text-sm font-medium flex items-center gap-2 transition-all duration-200 ${
                  !selectedCategory
                    ? "bg-gradient-to-r from-[#ff3131] to-[#ff914d] text-white"
                    : ""
                }`}
              >
                <Home size={16} />
                முகப்பு
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
                    className={`px-4 py-3 text-sm font-medium flex items-center justify-between transition-all duration-200 ${
                      selectedCategory === item.name
                        ? "bg-gradient-to-r from-[#ff3131] to-[#ff914d] text-white"
                        : ""
                    }`}
                  >
                    <span>{item.name}</span>
                    {item.subCategories && (
                      <ChevronDown
                        size={16}
                        className={`transition-transform duration-200 ${
                          expandedCategory === item.name ? "rotate-180" : ""
                        }`}
                      />
                    )}
                  </Link>
                  {item.subCategories && expandedCategory === item.name && (
                    <div className="pl-4 transition-all duration-200">
                      {item.subCategories.map((subCat) => (
                        <Link
                          key={subCat.name}
                          href={`/?category=${subCat.name}`}
                          onClick={(e) => {
                            e.preventDefault();
                            handleCategoryClick(subCat.name);
                            setMobileMenuOpen(false);
                          }}
                          className={`px-4 py-3 text-sm font-medium block transition-all duration-200 ${
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

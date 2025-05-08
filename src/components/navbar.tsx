"use client";

import { useState } from "react";
import { Menu, X, Search, ChevronDown, ChevronUp } from "lucide-react";
import CountryAndDate from "./country-date-navbar";
import logo from "../assets/images/logo.png";
import Image from "next/image";

const mainNavItems = [
  "Home",
  "විදෙස්",
  "දේශිය",
  "දේශපාලන",
  "ව්‍යාපාරික",
  "තාක්ෂණික",
  "විනෝදාස්වාද",
  "ක්‍රීඩා",
  "විද්‍යාව",
];
const additionalNavItems = [
  "සෞඛ්‍ය",
  "රාජ්‍ය සේවා",
  "අධ්‍යාපනය",
  "කලා",
  "ආගම",
  "පරිසරය",
];

export default function NavBar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [active, setActive] = useState("Home");
  const [showMoreDropdown, setShowMoreDropdown] = useState(false);
  const [showMobileMore, setShowMobileMore] = useState(false);

  return (
    <div className="w-full bg-primary text-white">
      <CountryAndDate />

      {/* Top Section with Logo and Ad (Desktop) */}
      <div className="flex items-center justify-between px-4 py-3 lg:px-[10%]">
        <div className="text-lg font-bold">
          <Image
            src={logo}
            alt="Website Logo"
            width={120}
            height={40}
            className="h-10 w-auto"
          />
        </div>

        {/* Desktop Ad - Parallel to logo */}
        <div className="hidden lg:block w-[970px] h-[90px] bg-gray-300 relative">
          <div className="w-full h-full flex items-center justify-center">
            <p className="text-gray-500">970×90 Desktop Ad</p>
            {/* Replace with your actual ad component */}
            {/* <Image 
              src="/desktop-ad.jpg" 
              alt="Desktop Advertisement"
              width={970}
              height={90}
              className="object-contain"
            /> */}
          </div>
          {/* Ad label */}
          <div className="absolute bottom-1 right-1 bg-black bg-opacity-70 text-white text-xs px-1 border border-white rounded">
            Ad
          </div>
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
          {mainNavItems.map((item) => (
            <button
              key={item}
              onClick={() => setActive(item)}
              className={`px-3 py-1 text-sm ${
                active === item
                  ? "bg-accent-teal text-charcoal font-semibold rounded-sm"
                  : ""
              }`}
            >
              {item}
            </button>
          ))}

          {/* More dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowMoreDropdown(!showMoreDropdown)}
              className={`px-3 py-1 text-sm flex items-center ${
                showMoreDropdown
                  ? "bg-accent-teal text-charcoal font-semibold rounded-sm"
                  : ""
              }`}
            >
              වැඩිදුර <ChevronDown size={16} className="ml-1" />
            </button>

            {showMoreDropdown && (
              <div className="absolute left-0 mt-1 w-48 bg-charcoal text-white shadow-lg rounded-sm z-10">
                {additionalNavItems.map((item) => (
                  <button
                    key={item}
                    onClick={() => {
                      setActive(item);
                      setShowMoreDropdown(false);
                    }}
                    className={`block w-full text-left px-4 py-2 text-sm hover:bg-accent-teal ${
                      active === item ? "bg-charcoal font-semibold" : ""
                    }`}
                  >
                    {item}
                  </button>
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

          {/* Mobile Ad - Below search but above categories */}
          <div className="w-[92%] h-20 bg-gray-300 mx-4 mb-2 relative">
            <div className="w-full h-full flex items-center justify-center">
              <p className="text-gray-500">Mobile Ad</p>
              {/* Replace with your actual ad component */}
              {/* <Image 
                src="/mobile-ad.jpg" 
                alt="Mobile Advertisement"
                width={320}
                height={80}
                className="object-contain"
              /> */}
            </div>
            {/* Ad label */}
            <div className="absolute bottom-1 right-1 bg-black bg-opacity-70 text-white text-xs px-1 border border-white rounded">
              Ad
            </div>
          </div>

          {/* Scrollable menu items */}
          <div className="flex-1 overflow-y-auto pb-4">
            {mainNavItems.map((item) => (
              <div
                key={item}
                className={`px-4 py-3 text-sm font-medium ${
                  active === item ? "bg-primary text-white" : ""
                }`}
                onClick={() => {
                  setActive(item);
                  setMobileMenuOpen(false);
                }}
              >
                {item}
              </div>
            ))}

            {/* Other Categories section in mobile */}
            <div className="border-t border-gray-200 pt-2">
              <button
                onClick={() => setShowMobileMore(!showMobileMore)}
                className="flex items-center justify-between w-full px-4 py-3 text-sm font-medium"
              >
                <span>වෙනත් කාණ්ඩ</span>
                {showMobileMore ? (
                  <ChevronUp size={16} />
                ) : (
                  <ChevronDown size={16} />
                )}
              </button>

              {showMobileMore && (
                <div className="pl-4">
                  {additionalNavItems.map((item) => (
                    <div
                      key={item}
                      className={`px-4 py-3 text-sm font-medium ${
                        active === item ? "bg-[#0A3552] text-white" : ""
                      }`}
                      onClick={() => {
                        setActive(item);
                        setMobileMenuOpen(false);
                      }}
                    >
                      {item}
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

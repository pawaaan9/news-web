"use client";

import Image from "next/image";
import Link from "next/link";
import logoTamil from "@/assets/images/tamilmedia.lk-weblogo-light.png";

const footerLinks = [
  { name: "Welcome", href: "/welcome" },
  { name: "About", href: "/about" },
  { name: "Reach Out", href: "/contact" },
  { name: "User Guidelines", href: "/user-guidelines" },
  { name: "Cookie Settings", href: "/cookie-settings" },
  { name: "Data Protection", href: "/data-protection" },
];

export default function Footer() {
  return (
    <footer className="relative py-12">
      {/* Gradient Background */}
      <div 
        className="absolute inset-0 bg-gradient-to-r from-[#ff3131] to-[#ff914d] opacity-90"
        style={{ zIndex: -1 }}
      />

      <div className="container mx-auto px-4 relative">
        <div className="flex flex-col items-center">
          {/* Logo */}
          <div className="mb-8">
            <Image
              src={logoTamil}
              alt="TamilMedia Logo"
              width={120}
              height={40}
              className="h-12 w-auto"
            />
          </div>

          {/* Links - Desktop */}
          <div className="hidden md:flex justify-center gap-8 mb-8">
            {footerLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-white hover:text-white/80 transition-colors duration-200 font-medium"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Links - Mobile */}
          <div className="md:hidden flex flex-col items-center gap-4 mb-8">
            {footerLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-white hover:text-white/80 transition-colors duration-200 font-medium"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Copyright */}
          <div className="text-center text-white/90">
            <p className="text-sm">
              Copyrights © {new Date().getFullYear()} TamilMedia. All rights reserved | Made with{" "}
              <span className="text-white">❤</span> in Sri Lanka for உலக
              தமிழர்களுக்கு!
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

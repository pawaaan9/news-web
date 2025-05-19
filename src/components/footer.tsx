"use client";

import Image from "next/image";
import Link from "next/link";
import logoTamil from "@/assets/images/tamilmedia.lk-weblogo-light.png";

const footerLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Contact Us", href: "/contact" },
  { name: "User Policy", href: "/user-policy" },
  { name: "Cookie Policy", href: "/cookie-policy" },
  { name: "Privacy Policy", href: "/privacy-policy" },
];

export default function Footer() {
  return (
    <footer className="bg-[#0A3552] text-white py-8">
      <div className="container mx-auto px-4">
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
                className="text-gray-300 hover:text-white transition-colors duration-200"
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
                className="text-gray-300 hover:text-white transition-colors duration-200"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Copyright */}
          <div className="text-center text-sm text-gray-400">
            <p>
              Copyrights © 2025 TamilMedia. All rights reserved | Made with{" "}
              <span className="text-red-500">❤</span> in Sri Lanka for உலக
              தமிழர்களுக்கு!
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

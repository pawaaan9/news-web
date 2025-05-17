"use client";

import Image from "next/image";
import logoTamil from "@/assets/images/tamilmedia.lk-weblogo-light.png";

const footerLinks = [
  { label: "Privacy Policy", href: "#" },
  { label: "Do not sell my personal info", href: "#" },
  { label: "Terms of Service", href: "#" },
  { label: "nbcnews.com Site Map", href: "#" },
];

const infoLinks = [
  { label: "About", href: "#" },
  { label: "Contact", href: "#" },
  { label: "Careers", href: "#" },
  { label: "Coupons", href: "#" },
];

export default function Footer() {
  return (
    <footer className="bg-[#0A3552] text-white text-sm py-8">
      {/* Desktop View */}
      <div className="hidden md:flex justify-between items-start px-[10%]">
        {/* Left: Logo */}
        <div className="flex-shrink-0 mr-12">
          <Image src={logoTamil} alt="Logo" width={100} height={30} />
        </div>

        {/* Middle: Footer Links */}
        <div className="flex flex-col space-y-2">
          {footerLinks.map((link) => (
            <a key={link.label} href={link.href} className="hover:underline">
              {link.label}
            </a>
          ))}
        </div>

        {/* Right: Info Links */}
        <div className="flex items-center space-x-6">
          {infoLinks.map((link) => (
            <a key={link.label} href={link.href} className="hover:underline">
              {link.label}
            </a>
          ))}
        </div>
      </div>

      {/* Mobile View */}
      <div className="md:hidden text-center px-4 flex flex-col items-center space-y-3">
        <Image
          src={logoTamil}
          alt="Logo"
          width={100}
          height={30}
          className="mb-2"
        />
        {footerLinks.map((link) => (
          <a key={link.label} href={link.href} className="hover:underline">
            {link.label}
          </a>
        ))}
        <div className="flex flex-wrap justify-center gap-4 mt-2">
          {infoLinks.map((link) => (
            <a key={link.label} href={link.href} className="hover:underline">
              {link.label}
            </a>
          ))}
        </div>
      </div>

      {/* Copyright with extra mobile padding below */}
      <div className="text-xs text-center mt-6 text-gray-400 pb-4 md:pb-0">
        copyright © 2025 | Vigasaa NEWS
      </div>
    </footer>
  );
}

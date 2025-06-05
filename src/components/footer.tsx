"use client";

import Image from "next/image";
import Link from "next/link";
import footerLogo from "@/assets/images/footer-logo.png";
import {
  FaFacebookF,
  FaInstagram,
  FaTiktok,
  FaYoutube,
  FaXTwitter,
} from "react-icons/fa6";
import { useEffect, useState } from "react";
import { getFooterLogo } from "@/api/logo.api";

const footerLinks = [
  { name: "About", href: "/about" },
  { name: "Reach Out", href: "/contact" },
  { name: "User Guidelines", href: "/user-guidelines" },
  { name: "Cookie Settings", href: "/cookie-settings" },
  { name: "Data Protection", href: "/data-protection" },
  { name: "Disclaimer", href: "/disclaimer" },
];

export default function Footer() {
  const [logoUrl, setLogoUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchLogo = async () => {
      try {
        const res = await getFooterLogo();
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

  return (
    <footer className="relative py-4 z-10 font-rubik">
      {/* Gradient Background */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-[#ff3131] to-[#ff914d] opacity-90"
        style={{ zIndex: -1 }}
      />

      <div className="container mx-auto px-4 relative">
        <div className="flex flex-col items-center">
          {/* Logo */}
          <div
            className="mb-8 bg-white rounded-lg border-2 border-white/40 shadow-lg hover:shadow-xl transition-all duration-300 px-3 py-1 flex items-center justify-center"
            style={{ minHeight: 40, width: 140, maxWidth: "100%" }}
          >
            <Image
              src={logoUrl ?? footerLogo}
              alt="TamilMedia Logo"
              width={120}
              height={32}
              className="w-auto filter drop-shadow-lg"
              priority
            />
          </div>

          {/* Social Media Links */}
          {/* Social Media Links */}
          <div className="flex gap-5 mb-8">
            <Link
              href="https://www.facebook.com/tamilmedia.live"
              aria-label="Facebook"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white rounded-full w-10 h-10 flex items-center justify-center shadow hover:scale-105 transition-transform"
            >
              <FaFacebookF className="text-black" size={20} />
            </Link>
            <Link
              href="#"
              aria-label="Instagram"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white rounded-full w-10 h-10 flex items-center justify-center shadow hover:scale-105 transition-transform"
            >
              <FaInstagram className="text-black" size={20} />
            </Link>
            <Link
              href="https://www.tiktok.com/@tamilmedia.lk"
              aria-label="Tiktok"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white rounded-full w-10 h-10 flex items-center justify-center shadow hover:scale-105 transition-transform"
            >
              <FaTiktok className="text-black" size={20} />
            </Link>
            <Link
              href="https://www.youtube.com/@tamilmedia.online"
              aria-label="YouTube"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white rounded-full w-10 h-10 flex items-center justify-center shadow hover:scale-105 transition-transform"
            >
              <FaYoutube className="text-black" size={20} />
            </Link>
            <Link
              href="https://x.com/tamilmedia_x"
              aria-label="X"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white rounded-full w-10 h-10 flex items-center justify-center shadow hover:scale-105 transition-transform"
            >
              <FaXTwitter className="text-black" size={20} />
            </Link>
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
              Copyrights © {new Date().getFullYear()} TamilMedia. All rights
              reserved | Made with <span className="text-white">❤</span> in Sri
              Lanka for தமிழ் தாயகச் செய்தியின் நம்பகமான குரல்!
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

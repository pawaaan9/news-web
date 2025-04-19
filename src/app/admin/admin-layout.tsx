"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  IconBadgeAd,
  IconFile,
  IconLayout,
  IconLogout,
  IconMenu2,
  IconSettings,
  IconUsersGroup,
  IconX,
} from "@tabler/icons-react";
import userImage from "@/assets/images/user-image.png";
import Image from "next/image";

const menuItems = [
  { href: "/admin", label: "Dashboard", icon: IconLayout },
  { href: "/admin/content", label: "Content", icon: IconFile },
  { href: "/admin/accounts", label: "Accounts", icon: IconUsersGroup },
  { href: "/admin/advertisements", label: "Advertisements", icon: IconBadgeAd },
  { href: "/admin/settings", label: "Settings", icon: IconSettings },
];

const AdminLayout: React.FC<{
  children: React.ReactNode;
  pageTitle: string;
}> = ({ children, pageTitle }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname(); // Get the current route

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="flex h-screen font-dmSans">
      {/* Sidebar for large screens */}
      <aside className="hidden lg:flex w-[300px] bg-white text-primary flex-col border-r border-[#B1B1B1]">
        <div className="text-[40px] font-bold font-dmSans text-charcoal p-10">
          News
        </div>
        <nav className="flex-1">
          <ul className="space-y-2">
            {menuItems.map((item, index) => (
              <li key={index}>
                <Link
                  href={item.href}
                  className={`p-2 rounded flex items-center pl-10 ${
                    pathname === item.href
                      ? "bg-primary text-white"
                      : "hover:bg-gray-200 hover:text-primary"
                  }`}
                >
                  <item.icon
                    size={20}
                    className={`inline-block mr-2 ${
                      pathname === item.href ? "text-white" : "text-primary"
                    }`}
                  />
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="p-4">
          <div className="p-2 hover:bg-gray-700 rounded flex items-center text-red-700 cursor-pointer">
            <IconLogout size={20} className="inline-block mr-2" />
            Logout
          </div>
        </div>
      </aside>

      {/* Full-screen menu for mobile */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-white z-50 flex flex-col">
          <div className="flex justify-between items-center p-4 border-b border-gray-300">
            <div className="text-[40px] font-bold font-dmSans text-charcoal">
              News
            </div>
            <button onClick={toggleMenu} className="text-gray-700">
              <IconX size={30} />
            </button>
          </div>
          <nav className="flex-1 p-4">
            <ul className="space-y-4">
              {menuItems.map((item, index) => (
                <li key={index}>
                  <Link
                    href={item.href}
                    className={`p-2 rounded flex items-center ${
                      pathname === item.href
                        ? "bg-primary text-white"
                        : "hover:bg-gray-200 hover:text-primary"
                    }`}
                    onClick={toggleMenu}
                  >
                    <item.icon
                      size={20}
                      className={`inline-block mr-2 ${
                        pathname === item.href ? "text-white" : "text-primary"
                      }`}
                    />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="p-4">
            <div className="p-2 hover:bg-gray-700 rounded flex items-center text-red-700 cursor-pointer">
              <IconLogout size={20} className="inline-block mr-2" />
              Logout
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <header className="bg-white shadow p-4 flex items-center justify-start border-b border-[#B1B1B1] gap-2 ">
          <button
            onClick={toggleMenu}
            className="lg:hidden text-gray-700 focus:outline-none"
          >
            <IconMenu2 size={24} />
          </button>
          <h1 className="text-[20px] lg:text-[35px] font-bold uppercase font-dmSans">
            {pageTitle}
          </h1>
          <Image
            src={userImage}
            alt="User"
            width={24}
            height={24}
            className="w-6 h-6 lg:w-10 lg:h-10 rounded-full ml-auto"
          />
        </header>

        {/* Page Content */}
        <main className="flex-1 p-5 bg-[#F4F4F4] overflow-y-auto font-dmSans">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;

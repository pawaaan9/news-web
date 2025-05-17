"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  IconBadgeAd,
  IconFile,
  IconKeyboard,
  IconLayout,
  IconLogout,
  IconMenu2,
  IconUsersGroup,
  IconX,
} from "@tabler/icons-react";
import userImage from "@/assets/images/user-image.png";
import Image from "next/image";
import { logout } from "../../api/auth.api"; // Make sure path is correct

const menuItems = [
  { href: "/admin/dashboard", label: "Dashboard", icon: IconLayout },
  { href: "/admin/content", label: "Content", icon: IconFile },
  { href: "/admin/accounts", label: "Accounts", icon: IconUsersGroup },
  { href: "/admin/advertisements", label: "Advertisements", icon: IconBadgeAd },
  { href: "/admin/keywords", label: "Keywords", icon: IconKeyboard },
];

const AdminLayout: React.FC<{
  children: React.ReactNode;
  pageTitle: string;
}> = ({ children, pageTitle }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = async () => {
    try {
      await logout();
      localStorage.removeItem("token"); // Adjust if you're using cookies instead
      router.push("/admin/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="flex h-screen font-dmSans">
      {/* Sidebar for large screens */}
      <aside className="hidden lg:flex w-[300px] bg-white text-primary flex-col border-r border-[#B1B1B1]">
        <div className="text-[40px] font-bold font-dmSans text-charcoal p-10">
          News
        </div>
        <nav className="flex-1">
          <ul
            className="space-y-2 list-none p-0 m-0"
            style={{ listStyleType: "none" }}
          >
            {menuItems.map((item, index) => (
              <li key={index}>
                <Link
                  href={item.href}
                  className={`p-2 rounded flex items-center mr-4 ${
                    pathname.startsWith(item.href)
                      ? "bg-primary text-white"
                      : "hover:bg-gray-200 hover:text-primary"
                  }`}
                >
                  <item.icon
                    size={20}
                    className={`inline-block mr-2 ${
                      pathname.startsWith(item.href)
                        ? "text-white"
                        : "text-primary"
                    }`}
                  />
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="p-4">
          <div
            className="p-2 hover:bg-gray-700 rounded flex items-center text-red-700 cursor-pointer"
            onClick={handleLogout}
          >
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
          <nav className="flex-1 pl-0 p-4">
            <ul className="space-y-4  p-0 m-0 !list-none">
              {menuItems.map((item, index) => (
                <li key={index}>
                  <Link
                    href={item.href}
                    className={`p-2 rounded flex items-center ${
                      pathname.startsWith(item.href)
                        ? "bg-primary text-white"
                        : "hover:bg-gray-200 hover:text-primary"
                    }`}
                    onClick={toggleMenu}
                  >
                    <item.icon
                      size={20}
                      className={`inline-block mr-2 ${
                        pathname.startsWith(item.href)
                          ? "text-white"
                          : "text-primary"
                      }`}
                    />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="p-4">
            <div
              className="p-2 hover:bg-gray-700 rounded flex items-center text-red-700 cursor-pointer"
              onClick={handleLogout}
            >
              <IconLogout size={20} className="inline-block mr-2" />
              Logout
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <header className="bg-white shadow p-4 items-center border-b border-[#B1B1B1] gap-2 flex justify-between">
          <div className="flex gap-2 items-center">
            <button
              onClick={toggleMenu}
              className="lg:hidden text-gray-700 focus:outline-none"
            >
              <IconMenu2 size={24} />
            </button>
            <h1 className="text-[20px] lg:text-[35px] font-bold uppercase font-dmSans">
              {pageTitle}
            </h1>
          </div>
          <Link href="/admin/profile">
            <Image
              src={userImage}
              alt="User"
              width={24}
              height={24}
              className="w-6 h-6 lg:w-10 lg:h-10 rounded-full ml-auto"
            />
          </Link>
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

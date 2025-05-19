"use client";

import { ReactNode } from 'react';
import NavBar from './navbar';
import Footer from './footer';

interface PageLayoutProps {
  children: ReactNode;
  title: string;
}

export default function PageLayout({ children, title }: PageLayoutProps) {
  return (
    <main className="min-h-screen flex flex-col">
      <NavBar onCategorySelect={() => {}} selectedCategory={null} isStaticPage={true} />
      
      {/* Main Content */}
      <div className="flex-1 bg-gradient-to-b from-gray-50 to-gray-100 pt-[160px] pb-16">
        <div className="max-w-4xl mx-auto px-4">
          {/* Decorative top border */}
          <div className="h-2 w-full bg-gradient-to-r from-[#ff3131] to-[#ff914d] rounded-t-lg mb-8"></div>
          
          {/* Content Card */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            {/* Header Section */}
            <div className="relative">
              {/* Background gradient overlay */}
              <div 
                className="absolute inset-0 bg-gradient-to-r from-[#ff3131] to-[#ff914d] opacity-10"
                style={{ zIndex: 0 }}
              ></div>
              
              {/* Title Section */}
              <div className="relative px-8 py-12 text-center">
                <h1 className="text-4xl font-bold font-muktaMalar mb-4 text-gray-800">
                  {title}
                </h1>
                <div className="w-24 h-1 bg-gradient-to-r from-[#ff3131] to-[#ff914d] mx-auto"></div>
              </div>
            </div>
            
            {/* Content Section */}
            <div className="px-8 py-12">
              <div className="prose prose-lg max-w-none prose-headings:font-muktaMalar prose-headings:text-gray-800 prose-p:text-gray-600 prose-a:text-[#ff3131] prose-a:no-underline hover:prose-a:underline">
                {children}
              </div>
            </div>
          </div>
          
          {/* Decorative bottom border */}
          <div className="h-2 w-full bg-gradient-to-r from-[#ff914d] to-[#ff3131] rounded-b-lg mt-8"></div>
        </div>
      </div>
      
      <Footer />
    </main>
  );
} 
"use client";

import ThemeToggle from "@/components/ThemeToggle";
import Link from "next/link";
import { HomeIcon, InfoIcon, CodeIcon } from "lucide-react";

const Header = () => (
  <header className="w-full bg-gray-50 dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-10">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex h-16 items-center justify-between">
        <div className="flex items-center">
          <Link href="/" className="flex items-center">
            <span className="text-lg font-bold text-primary mr-8">CPF Calculator</span>
          </Link>
          <nav className="hidden md:flex space-x-1">
            <Link href="/" className="flex items-center px-4 py-2 text-sm font-medium rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
              <HomeIcon className="h-4 w-4 mr-2" />
              Home
            </Link>
            <Link href="/about" className="flex items-center px-4 py-2 text-sm font-medium rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
              <InfoIcon className="h-4 w-4 mr-2" />
              About
            </Link>
            <Link href="/api" className="flex items-center px-4 py-2 text-sm font-medium rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
              <CodeIcon className="h-4 w-4 mr-2" />
              API
            </Link>
          </nav>
        </div>
        <ThemeToggle />
      </div>
    </div>
  </header>
);

export default Header;

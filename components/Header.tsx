"use client";

import ThemeToggle from "@/components/ThemeToggle";
import Link from "next/link";

const Header = () => (
  <header className="w-full bg-gray-50 dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex h-16 items-center justify-between">
        <nav className="flex space-x-8 items-center text-gray-600 dark:text-gray-300 hover:text-gray-900 hover:dark:text-gray-100">
          <Link href="/" className="px-3 py-2 text-sm font-medium">
            Home
          </Link>
          <Link href="/about" className="px-3 py-2 text-sm font-medium">
            About
          </Link>
          <Link href="/api" className="px-3 py-2 text-sm font-medium">
            API
          </Link>
        </nav>
        <ThemeToggle />
      </div>
    </div>
  </header>
);

export default Header;

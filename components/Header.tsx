"use client";

import Link from "next/link";

const Header = () => (
  <header className="w-full bg-white border-b border-gray-200">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex h-16 items-center justify-between">
        <div className="flex-shrink-0">
          <span className="text-xl font-semibold">CPF Calculator</span>
        </div>

        <nav className="flex space-x-8 items-center">
          <Link
            href="/"
            className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium"
          >
            Home
          </Link>
          <Link
            href="/about"
            className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium"
          >
            About
          </Link>
          <Link
            href="/api"
            className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium"
          >
            API
          </Link>
        </nav>
      </div>
    </div>
  </header>
);

export default Header;

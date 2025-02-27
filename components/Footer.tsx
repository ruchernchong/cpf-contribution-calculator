"use client";

import Link from "next/link";
import { GithubIcon, HeartIcon } from "lucide-react";

const Footer = () => (
  <footer className="border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950">
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {/* Disclaimer */}
        <div>
          <h3 className="mb-4 text-sm font-semibold text-gray-900 dark:text-gray-100">
            Disclaimer
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            This calculator is an independent tool and is not affiliated with,
            endorsed by, or connected to the CPF Board, Ministry of Manpower, or
            any government agency.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="mb-4 text-sm font-semibold text-gray-900 dark:text-gray-100">
            Quick Links
          </h3>
          <ul className="space-y-3">
            <li>
              <Link
                href="/about"
                className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 hover:dark:text-gray-200 transition-colors"
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                href="/api"
                className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 hover:dark:text-gray-200 transition-colors"
              >
                API Documentation
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 hover:dark:text-gray-200 transition-colors"
              >
                FAQ
              </Link>
            </li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h3 className="mb-4 text-sm font-semibold text-gray-900 dark:text-gray-100">
            Resources
          </h3>
          <ul className="space-y-3">
            <li>
              <a
                href="https://www.cpf.gov.sg"
                className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 hover:dark:text-gray-200 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                CPF Official Website
              </a>
            </li>
            <li>
              <a
                href="https://www.mom.gov.sg"
                className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 hover:dark:text-gray-200 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                Ministry of Manpower
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-8 border-t border-gray-200 dark:border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          © {new Date().getFullYear()} CPF Calculator. All rights reserved.
        </p>
        <div className="flex items-center space-x-4">
          <a
            href="https://github.com"
            className="text-gray-600 hover:text-gray-900 dark:text-gray-400 hover:dark:text-gray-200 transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            <GithubIcon className="h-5 w-5" />
            <span className="sr-only">GitHub</span>
          </a>
          <span className="text-sm text-gray-600 dark:text-gray-400 flex items-center">
            Made with <HeartIcon className="h-4 w-4 mx-1 text-red-500" /> in Singapore
          </span>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;

"use client";

import { GithubIcon, HeartIcon } from "lucide-react";
import Link from "next/link";

const Footer = () => (
  <footer className="border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950">
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        <div>
          <h3 className="mb-4 text-sm font-semibold text-zinc-900 dark:text-zinc-100">
            Disclaimer
          </h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            This calculator is an independent tool and is not affiliated with,
            endorsed by, or connected to the CPF Board, Ministry of Manpower, or
            any government agency.
          </p>
        </div>
        <div>
          <h3 className="mb-4 text-sm font-semibold text-zinc-900 dark:text-zinc-100">
            Quick Links
          </h3>
          <ul className="space-y-3">
            <li>
              <Link
                href="/about"
                className="text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 hover:dark:text-zinc-200 transition-colors"
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                href="/api"
                className="text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 hover:dark:text-zinc-200 transition-colors"
              >
                API Documentation
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="mb-4 text-sm font-semibold text-zinc-900 dark:text-zinc-100">
            Resources
          </h3>
          <ul className="space-y-3">
            <li>
              <a
                href="https://www.cpf.gov.sg"
                className="text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 hover:dark:text-zinc-200 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                CPF Official Website
              </a>
            </li>
            <li>
              <a
                href="https://www.mom.gov.sg"
                className="text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 hover:dark:text-zinc-200 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                Ministry of Manpower
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="mt-8 border-t border-zinc-200 dark:border-zinc-800 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          © {new Date().getFullYear()} CPF Calculator. All rights reserved.
        </p>
        <div className="flex items-center space-x-4">
          <a
            href="https://github.com"
            className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 hover:dark:text-zinc-200 transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            <GithubIcon className="h-5 w-5" />
            <span className="sr-only">GitHub</span>
          </a>
          <span className="text-sm text-zinc-600 dark:text-zinc-400 flex items-center">
            Made with <HeartIcon className="h-4 w-4 mx-1 text-red-500" /> in
            Singapore
          </span>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;

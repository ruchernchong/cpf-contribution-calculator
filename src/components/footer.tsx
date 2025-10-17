"use client";

import { GithubIcon, HeartIcon } from "lucide-react";
import Link from "next/link";

const Footer = () => (
  <footer className="border-zinc-200 border-t bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950">
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        <div>
          <h3 className="mb-4 font-semibold text-sm text-zinc-900 dark:text-zinc-100">
            Disclaimer
          </h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            This calculator is an independent tool and is not affiliated with,
            endorsed by, or connected to the CPF Board, Ministry of Manpower, or
            any government agency.
          </p>
        </div>
        <div>
          <h3 className="mb-4 font-semibold text-sm text-zinc-900 dark:text-zinc-100">
            Quick Links
          </h3>
          <ul className="space-y-3">
            <li>
              <Link
                href="/about"
                className="text-sm text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 hover:dark:text-zinc-200"
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                href="/api"
                className="text-sm text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 hover:dark:text-zinc-200"
              >
                API Documentation
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="mb-4 font-semibold text-sm text-zinc-900 dark:text-zinc-100">
            Resources
          </h3>
          <ul className="space-y-3">
            <li>
              <a
                href="https://www.cpf.gov.sg"
                className="text-sm text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 hover:dark:text-zinc-200"
                target="_blank"
                rel="noopener noreferrer"
              >
                CPF Official Website
              </a>
            </li>
            <li>
              <a
                href="https://www.mom.gov.sg"
                className="text-sm text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 hover:dark:text-zinc-200"
                target="_blank"
                rel="noopener noreferrer"
              >
                Ministry of Manpower
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="mt-8 flex flex-col items-center justify-between space-y-4 border-zinc-200 border-t pt-8 md:flex-row md:space-y-0 dark:border-zinc-800">
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          © {new Date().getFullYear()} CPF Calculator. All rights reserved.
        </p>
        <div className="flex items-center space-x-4">
          <a
            href="https://github.com"
            className="text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 hover:dark:text-zinc-200"
            target="_blank"
            rel="noopener noreferrer"
          >
            <GithubIcon className="h-5 w-5" />
            <span className="sr-only">GitHub</span>
          </a>
          <span className="flex items-center text-sm text-zinc-600 dark:text-zinc-400">
            Made with <HeartIcon className="mx-1 h-4 w-4 text-red-500" /> in
            Singapore
          </span>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;

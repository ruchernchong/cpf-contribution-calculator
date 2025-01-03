"use client";

import Link from "next/link";

const Footer = () => (
  <footer className="border-t border-gray-200 bg-white">
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {/* Disclaimer */}
        <div>
          <h3 className="mb-4 text-sm font-semibold text-gray-900">
            Disclaimer
          </h3>
          <p className="text-sm text-gray-600">
            This calculator is an independent tool and is not affiliated with,
            endorsed by, or connected to the CPF Board, Ministry of Manpower, or
            any government agency.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="mb-4 text-sm font-semibold text-gray-900">
            Quick Links
          </h3>
          <ul className="space-y-3">
            <li>
              <Link
                href="/about"
                className="text-sm text-gray-600 hover:text-gray-900"
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                href="/api"
                className="text-sm text-gray-600 hover:text-gray-900"
              >
                API Documentation
              </Link>
            </li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h3 className="mb-4 text-sm font-semibold text-gray-900">
            Resources
          </h3>
          <ul className="space-y-3">
            <li>
              <a
                href="https://www.cpf.gov.sg"
                className="text-sm text-gray-600 hover:text-gray-900"
                target="_blank"
                rel="noopener noreferrer"
              >
                CPF Official Website
              </a>
            </li>
            <li>
              <a
                href="https://www.mom.gov.sg"
                className="text-sm text-gray-600 hover:text-gray-900"
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
      <div className="mt-8 border-t border-gray-200 pt-8">
        <p className="text-center text-sm text-gray-600">
          © {new Date().getFullYear()} CPF Calculator. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;

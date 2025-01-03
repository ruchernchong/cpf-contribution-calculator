'use client';

import Link from 'next/link';

const Footer = () => (
  <footer className="bg-white border-t border-gray-200">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* About Section */}
        <div>
          <h3 className="text-sm font-semibold text-gray-900 mb-4">About</h3>
          <p className="text-sm text-gray-600">
            CPF Calculator helps Singaporeans understand and plan their CPF contributions with the latest income ceiling changes.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-sm font-semibold text-gray-900 mb-4">Quick Links</h3>
          <ul className="space-y-3">
            <li>
              <Link href="/about" className="text-sm text-gray-600 hover:text-gray-900">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/faqs" className="text-sm text-gray-600 hover:text-gray-900">
                FAQs
              </Link>
            </li>
            <li>
              <Link href="/api" className="text-sm text-gray-600 hover:text-gray-900">
                API Documentation
              </Link>
            </li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h3 className="text-sm font-semibold text-gray-900 mb-4">Resources</h3>
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

        {/* Contact */}
        <div>
          <h3 className="text-sm font-semibold text-gray-900 mb-4">Contact</h3>
          <ul className="space-y-3">
            <li>
              <a href="mailto:contact@cpfcalculator.sg" className="text-sm text-gray-600 hover:text-gray-900">
                contact@cpfcalculator.sg
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-8 pt-8 border-t border-gray-200">
        <p className="text-sm text-gray-600 text-center">
          © {new Date().getFullYear()} CPF Calculator. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;

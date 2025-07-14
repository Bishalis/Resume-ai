

'use client';

import { useState } from 'react';
import Link from 'next/link';
import PrimaryButton from './PrimaryButton';

export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const navigation = [
    { name: "Home", href: "/", current: true },
    { name: "Analyze Resume", href: "/analyze", current: false },
    { name: "About", href: "/about", current: false },
    { name: "Contact", href: "/contact", current: false },
  ];

  function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-4">
        {/* Desktop Nav */}
        <div className="flex justify-between items-center">
          <div className="text-2xl font-extrabold text-blue-700">CWD</div>

          {/* Desktop Nav Links - Hidden on mobile */}
          <div className="hidden md:flex space-x-4 items-center">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={classNames(
                  item.current
                    ? "border-b-2 border-blue-600 text-blue-700"
                    : "text-gray-700 hover:bg-gray-200 hover:text-blue-700",
                  "rounded-md px-4 py-2 text-sm font-medium transition"
                )}
              >
                {item.name}
              </Link>
            ))}
            <PrimaryButton className="ml-4">Get Started</PrimaryButton>
          </div>

          {/* Mobile menu button - Hidden on desktop */}
          <div className="md:hidden flex items-center">
            <PrimaryButton className="mr-4">Get Started</PrimaryButton>
            <button
              onClick={toggleMenu}
              className="text-gray-700 hover:text-blue-700 focus:outline-none"
              aria-label="Toggle menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu - Only shows when isMenuOpen is true */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={toggleMenu}
                className={classNames(
                  item.current
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-700 hover:bg-gray-200",
                  "block rounded-md px-4 py-2 text-sm font-medium"
                )}
              >
                {item.name}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
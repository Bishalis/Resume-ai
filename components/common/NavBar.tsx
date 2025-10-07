'use client';



import { useState } from 'react';
import Link from 'next/link';
import PrimaryButton from './PrimaryButton';
import { usePathname } from 'next/navigation';

export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  
  const navigation = [
    { name: "Home", href: "/"},
    { name: "Analyze Resume", href: "/analyze"},
    { name: "Contact", href: "/contact"},
  ];


  function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50 ">
      <div className="max-w-7xl mx-auto px-4 py-4">
        {/* Desktop Nav */}
        <div className="flex justify-between items-center">
          {/* <div className="text-2xl font-extrabold text-green-700">CWB</div> */}
          <img src={'/assets/Dalle.webp'} className='w-15 h-15 cursor-pointer rounded-full'/>


          {/* Desktop Nav Links - Hidden on mobile */}
          <div className="hidden md:flex space-x-4 items-center">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={classNames(
                  pathname === item.href
                    ? "border-b-2 border-green-600 text-green-700"
                    : "text-gray-700 hover:bg-gray-200 hover:text-green-700",
                  "rounded-md px-4 py-2 text-sm font-medium transition"
                )}
              >
                {item.name}
              </Link>
            ))}

             <Link href={'/login'}>
            <PrimaryButton  className="ml-4 bg-white lg:text-green-600 lg:hover:text-green-700 lg:hover:bg-white font-bold">Login</PrimaryButton>
            </Link>
            <Link href={'/signup'}>
            <PrimaryButton  className="ml-4">Sign Up</PrimaryButton>
            </Link>
          </div>

          {/* Mobile menu button - Hidden on desktop */}
          <div className="md:hidden flex items-center">
            <PrimaryButton className="mr-4">Get Started</PrimaryButton>
            <button
              onClick={toggleMenu}
              className="text-gray-700 hover:text-green-700 focus:outline-none"
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
                  pathname === item.href
                    ? "bg-blue-100 text-green-700"
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
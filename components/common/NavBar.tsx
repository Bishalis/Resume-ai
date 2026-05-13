"use client";

import { useState } from "react";
import Link from "next/link";
import PrimaryButton from "./PrimaryButton";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";

export default function NavBar() {
  const { data: session, status } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const baseNavigation = [
    { name: "Home", href: "/" },
    { name: "Analyze Resume", href: "/analyze" },
    { name: "Contact", href: "/contact" },
  ];

  const adminNav =
    session?.user?.role === "admin"
      ? [{ name: "Admin", href: "/admin/users" as const }]
      : [];

  const navigation = [...baseNavigation, ...adminNav];

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
          <div className="flex items-center gap-3">
            <div className="text-2xl font-extrabold text-green-700">
              ResAnalyser
            </div>
          </div>

          {/* Desktop Nav Links - Hidden on mobile */}
          <div className="hidden md:flex space-x-4 items-center">
            {navigation.map((item) => {
              const isActive =
                item.name === "Admin"
                  ? pathname?.startsWith("/admin")
                  : pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={classNames(
                    isActive
                      ? "border-b-2 border-green-600 text-green-700"
                      : "text-gray-700 hover:bg-gray-200 hover:text-green-700",
                    "rounded-md px-4 py-2 text-sm font-medium transition",
                  )}
                >
                  {item.name}
                </Link>
              );
            })}

            {status === "loading" ? (
              <p>Loading...</p>
            ) : session ? (
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => signOut({ callbackUrl: "/" })}
              >
                Logout
              </button>
            ) : (
              <Link href={"/login"}>
                <PrimaryButton className="ml-4">Login</PrimaryButton>
              </Link>
            )}
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
            {navigation.map((item) => {
              const isActive =
                item.name === "Admin"
                  ? pathname?.startsWith("/admin")
                  : pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={toggleMenu}
                  className={classNames(
                    isActive
                      ? "bg-blue-100 text-green-700"
                      : "text-gray-700 hover:bg-gray-200",
                    "block rounded-md px-4 py-2 text-sm font-medium",
                  )}
                >
                  {item.name}
                </Link>
              );
            })}
            {status === "loading" ? (
              <p className="px-4 text-sm text-gray-500">Loading...</p>
            ) : session ? (
              <button
                type="button"
                className="block w-full text-left rounded-md px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
                onClick={() => {
                  toggleMenu();
                  void signOut({ callbackUrl: "/" });
                }}
              >
                Logout
              </button>
            ) : (
              <Link
                href="/login"
                onClick={toggleMenu}
                className="block rounded-md px-4 py-2 text-sm font-medium text-green-700"
              >
                Login
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}

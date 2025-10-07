'use client';

import { usePathname } from "next/navigation";
import NavBar from "@/components/common/NavBar";
import Footer from "@/components/common/Footer";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathName = usePathname();
  const noNavBarPaths = ['/login', '/signup'];
  const hideNav = noNavBarPaths.includes(pathName);

  return (
    <>
      {!hideNav && <NavBar />}
      {children}
      {!hideNav && <Footer />}
    </>
  );
}

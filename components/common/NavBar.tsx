import Link from "next/link";
import PrimaryButton from "./PrimaryButton";
export default function NavBar() {
    const navigation = [
      { name: "Home", href: "/", current: true },
      { name: "Analyze Resume", href: "/analyze", current: false },
      { name: "About", href: "/about", current: false },
      { name: "Contact", href: "/contact", current: false },
    ];
  
    function classNames(...classes: string[]) {
      return classes.filter(Boolean).join(" ");
    }
  
    return (
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
   
          <div className="text-2xl font-extrabold text-blue-700">CWD</div>
  
          {/* Nav Links */}
          <div className="flex space-x-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={classNames(
                  item.current
                    ? "border-b-2 border-blue-600 text-blue-700 "
                    : "text-gray-700 hover:bg-gray-200 hover:text-blue-700",
                  "rounded-md px-4 py-2 text-sm font-medium transition"
                )}
              >
                {item.name}
              </Link>
            ))}
          </div>

          <PrimaryButton>Get Started</PrimaryButton>
        </div>
      </nav>
    );
  }
  
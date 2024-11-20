import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import Logo from "./Logo";

export const MobileNavigation = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="lg:hidden">
      <div className="container flex justify-between gap-4 py-6">
        <Logo />
        <button onClick={() => setIsMenuOpen((prev) => !prev)}>
          <span className="sr-only">
            {isMenuOpen ? "Close Menu" : "Open Menu"}
          </span>
          {isMenuOpen ? <X className="size-7" /> : <Menu className="size-7" />}
        </button>
      </div>
      <div
        className={cn(
          "overflow-hidden bg-[#f8f4f4] transition-all duration-300 ease-in-out",
          isMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0",
        )}
      >
        {children}
      </div>
    </nav>
  );
};

"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Search, ShoppingBag, Menu, X } from "lucide-react";
import { CartBadge } from "@/components/commerce/CartBadge";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { SearchModal } from "./SearchModal";
import { listProducts } from "@/lib/mockApi";
import { Product } from "@/types";

export function Header() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    listProducts().then(setProducts);
  }, []);

  // Keyboard shortcut for search (Cmd+K or Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="text-xl font-medium hover:text-emerald-600 transition-colors">
            Modern Home
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className={cn(
                "relative text-slate-600 hover:text-slate-900 transition-colors",
                pathname === "/" && "text-slate-900 after:absolute after:bottom-[-1.5rem] after:left-0 after:right-0 after:h-0.5 after:bg-emerald-500"
              )}
            >
              Shop
            </Link>
            <Link
              href="/about"
              className={cn(
                "relative text-slate-600 hover:text-slate-900 transition-colors",
                pathname === "/about" && "text-slate-900 after:absolute after:bottom-[-1.5rem] after:left-0 after:right-0 after:h-0.5 after:bg-emerald-500"
              )}
            >
              About
            </Link>
          </nav>

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            <button
              className="p-2 text-slate-600 hover:text-slate-900 transition-colors"
              aria-label="Search"
              onClick={() => setIsSearchOpen(true)}
            >
              <Search className="h-5 w-5" />
            </button>
            <Link
              href="/cart"
              className="relative p-2 text-slate-600 hover:text-slate-900 transition-colors"
              aria-label="Shopping cart"
            >
              <ShoppingBag className="h-5 w-5" />
              <CartBadge />
            </Link>
            
            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white">
          <nav className="container mx-auto px-4 py-4 space-y-2">
            <Link
              href="/"
              className={cn(
                "block px-4 py-2 text-slate-600 hover:text-slate-900 hover:bg-stone-50 rounded-md transition-colors",
                pathname === "/" && "text-slate-900 bg-stone-50"
              )}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Shop
            </Link>
            <Link
              href="/about"
              className={cn(
                "block px-4 py-2 text-slate-600 hover:text-slate-900 hover:bg-stone-50 rounded-md transition-colors",
                pathname === "/about" && "text-slate-900 bg-stone-50"
              )}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About
            </Link>
          </nav>
        </div>
      )}
      
      {/* Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        products={products}
      />
    </header>
  );
}
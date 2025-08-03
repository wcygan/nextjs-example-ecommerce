"use client";

import Link from "next/link";
import { Search, ShoppingBag } from "lucide-react";
import { CartBadge } from "@/components/commerce/CartBadge";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="text-xl font-medium">
            Modern Home
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="text-slate-600 hover:text-slate-900 transition-colors"
            >
              Shop
            </Link>
            <Link
              href="/about"
              className="text-slate-600 hover:text-slate-900 transition-colors"
            >
              About
            </Link>
          </nav>

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            <button
              className="p-2 text-slate-600 hover:text-slate-900 transition-colors"
              aria-label="Search"
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
          </div>
        </div>
      </div>
    </header>
  );
}
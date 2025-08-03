"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Search, X } from "lucide-react";
import { Product } from "@/types";
import { toMoney } from "@/lib/currency";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
}

export function SearchModal({ isOpen, onClose, products }: SearchModalProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  // Close on escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    
    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  // Filter products based on search query
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    
    const query = searchQuery.toLowerCase();
    return products.filter(
      (product) =>
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query)
    ).slice(0, 5); // Limit to 5 results
  }, [searchQuery, products]);

  const handleProductClick = (slug: string) => {
    router.push(`/product/${slug}`);
    onClose();
    setSearchQuery("");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div className="relative w-full max-w-2xl mx-4 bg-white rounded-xl shadow-xl">
        {/* Search Input */}
        <div className="flex items-center border-b border-slate-200 p-4">
          <Search className="h-5 w-5 text-slate-400 mr-3" />
          <Input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 border-0 focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-lg"
            autoFocus
          />
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="ml-2"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Search Results */}
        {searchQuery && (
          <div className="max-h-96 overflow-y-auto">
            {searchResults.length > 0 ? (
              <div className="py-2">
                {searchResults.map((product) => (
                  <button
                    key={product.id}
                    onClick={() => handleProductClick(product.slug)}
                    className="w-full px-4 py-3 hover:bg-stone-50 transition-colors text-left flex items-center space-x-4"
                  >
                    <div className="w-16 h-16 bg-stone-100 rounded-md flex-shrink-0" />
                    <div className="flex-1">
                      <h3 className="font-medium text-slate-900">
                        {product.name}
                      </h3>
                      <p className="text-sm text-slate-600">
                        {toMoney(product.price)}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center text-slate-500">
                No products found for &quot;{searchQuery}&quot;
              </div>
            )}
          </div>
        )}

        {/* Quick Links */}
        {!searchQuery && (
          <div className="p-4">
            <p className="text-sm text-slate-500 mb-3">Quick Links</p>
            <div className="space-y-2">
              <Link
                href="/"
                onClick={onClose}
                className="block px-3 py-2 text-sm hover:bg-stone-50 rounded-md transition-colors"
              >
                All Products
              </Link>
              <Link
                href="/about"
                onClick={onClose}
                className="block px-3 py-2 text-sm hover:bg-stone-50 rounded-md transition-colors"
              >
                About Us
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
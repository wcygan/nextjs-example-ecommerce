"use client";

import { useState, useMemo } from "react";
import { Product } from "@/types";
import { InventoryGrid } from "@/components/commerce/InventoryGrid";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type SortOption = "featured" | "price-low" | "price-high" | "name";

interface InventoryPageClientProps {
  products: Product[];
}

export function InventoryPageClient({ products }: InventoryPageClientProps) {
  const [sortOption, setSortOption] = useState<SortOption>("featured");

  const sortedProducts = useMemo(() => {
    const sorted = [...products];
    
    switch (sortOption) {
      case "price-low":
        return sorted.sort((a, b) => a.price - b.price);
      case "price-high":
        return sorted.sort((a, b) => b.price - a.price);
      case "name":
        return sorted.sort((a, b) => a.name.localeCompare(b.name));
      case "featured":
      default:
        // Keep original order for featured
        return sorted;
    }
  }, [products, sortOption]);

  return (
    <>
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-medium text-slate-900 tracking-wide">
          All Products
        </h1>
        
        {/* Sort dropdown */}
        <div className="mt-4 flex justify-end">
          <Select
            value={sortOption}
            onValueChange={(value) => setSortOption(value as SortOption)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="featured">Featured</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="name">Name: A-Z</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Product Grid */}
      <InventoryGrid products={sortedProducts} />
    </>
  );
}
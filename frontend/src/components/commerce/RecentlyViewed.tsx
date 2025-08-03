"use client";

import { useEffect, useState } from "react";
import { Product } from "@/types";
import { RelatedProducts } from "./RelatedProducts";

interface RecentlyViewedProps {
  currentProductId: string;
  allProducts: Product[];
}

const RECENTLY_VIEWED_KEY = "recently-viewed-products";
const MAX_ITEMS = 4;

export function RecentlyViewed({ currentProductId, allProducts }: RecentlyViewedProps) {
  const [recentProducts, setRecentProducts] = useState<Product[]>([]);

  useEffect(() => {
    // Load recently viewed from localStorage
    const stored = localStorage.getItem(RECENTLY_VIEWED_KEY);
    let viewedIds: string[] = stored ? JSON.parse(stored) : [];

    // Add current product to recently viewed
    if (!viewedIds.includes(currentProductId)) {
      viewedIds = [currentProductId, ...viewedIds].slice(0, MAX_ITEMS + 1);
      localStorage.setItem(RECENTLY_VIEWED_KEY, JSON.stringify(viewedIds));
    }

    // Filter out current product and get product objects
    const recentIds = viewedIds.filter(id => id !== currentProductId).slice(0, MAX_ITEMS);
    const products = recentIds
      .map(id => allProducts.find(p => p.id === id))
      .filter(Boolean) as Product[];
    
    setRecentProducts(products);
  }, [currentProductId, allProducts]);

  if (recentProducts.length === 0) {
    return null;
  }

  return (
    <div className="border-t border-slate-200 pt-12 mt-12">
      <h2 className="text-2xl font-medium mb-6">Recently Viewed</h2>
      <RelatedProducts products={recentProducts} />
    </div>
  );
}
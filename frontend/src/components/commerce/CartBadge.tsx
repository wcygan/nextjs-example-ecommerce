"use client";

import { useCart } from "@/hooks/useCart";
import { useEffect, useState } from "react";

export function CartBadge() {
  const { itemCount } = useCart();
  const [isAnimating, setIsAnimating] = useState(false);
  const [prevCount, setPrevCount] = useState(itemCount);

  useEffect(() => {
    if (itemCount !== prevCount && itemCount > 0) {
      setIsAnimating(true);
      const timer = setTimeout(() => setIsAnimating(false), 300);
      setPrevCount(itemCount);
      return () => clearTimeout(timer);
    }
  }, [itemCount, prevCount]);

  if (itemCount === 0) {
    return null;
  }

  return (
    <span 
      className={`absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 text-xs font-medium text-white transition-all duration-300 ${
        isAnimating ? "scale-125" : "scale-100"
      }`}
    >
      {itemCount > 99 ? "99+" : itemCount}
    </span>
  );
}
"use client";

import { useCart } from "@/hooks/useCart";

export function CartBadge() {
  const { itemCount } = useCart();

  if (itemCount === 0) {
    return null;
  }

  return (
    <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 text-xs font-medium text-white">
      {itemCount > 99 ? "99+" : itemCount}
    </span>
  );
}
"use client";

import { useCart } from "@/hooks/useCart";
import { toMoney } from "@/lib/currency";

interface CartSummaryProps {
  shipping?: number;
}

export function CartSummary({ shipping = 650 }: CartSummaryProps) {
  const { subtotal } = useCart();
  
  // Free shipping threshold
  const freeShippingThreshold = 5000; // $50
  const shippingCost = subtotal >= freeShippingThreshold ? 0 : shipping;
  const total = subtotal + shippingCost;

  return (
    <div className="space-y-3">
      <h2 className="text-lg font-medium mb-4">Order Summary</h2>
      
      <div className="flex justify-between text-sm">
        <span className="text-slate-600">Subtotal</span>
        <span className="font-medium">{toMoney(subtotal)}</span>
      </div>
      
      <div className="flex justify-between text-sm">
        <span className="text-slate-600">Shipping</span>
        <span className="font-medium">
          {shippingCost === 0 ? "Free" : toMoney(shippingCost)}
        </span>
      </div>
      
      <div className="border-t border-slate-200 pt-3">
        <div className="flex justify-between">
          <span className="text-base font-medium">Total</span>
          <span className="text-base font-semibold">{toMoney(total)}</span>
        </div>
      </div>
    </div>
  );
}
"use client";

import Image from "next/image";
import { useCart } from "@/hooks/useCart";
import { toMoney } from "@/lib/currency";

export function OrderSummary() {
  const { lines, subtotal } = useCart();
  
  const shipping = subtotal >= 5000 ? 0 : 650;
  const total = subtotal + shipping;

  return (
    <div>
      <h2 className="text-lg font-medium mb-4">Order summary</h2>
      
      {/* Line items */}
      <div className="space-y-4 mb-6">
        {lines.map((line) => (
          <div key={line.id} className="flex gap-3">
            <div className="relative h-16 w-16 overflow-hidden rounded-md bg-slate-100">
              <Image
                src={line.image}
                alt={line.name}
                fill
                className="object-contain"
              />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">{line.name}</p>
              {line.selectedOptions && (
                <p className="text-xs text-slate-600">
                  {Object.entries(line.selectedOptions).map(([key, value]) => (
                    <span key={key}>{value} </span>
                  ))}
                </p>
              )}
              <p className="text-xs text-slate-600">Qty: {line.quantity}</p>
            </div>
            <p className="text-sm font-medium">{toMoney(line.price * line.quantity)}</p>
          </div>
        ))}
      </div>

      {/* Totals */}
      <div className="space-y-2 border-t border-slate-200 pt-4">
        <div className="flex justify-between text-sm">
          <span className="text-slate-600">Subtotal</span>
          <span className="font-medium">{toMoney(subtotal)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-slate-600">Shipping</span>
          <span className="font-medium">
            {shipping === 0 ? "Free" : toMoney(shipping)}
          </span>
        </div>
        <div className="flex justify-between border-t border-slate-200 pt-2">
          <span className="font-medium">Total</span>
          <span className="font-semibold">{toMoney(total)}</span>
        </div>
      </div>
    </div>
  );
}
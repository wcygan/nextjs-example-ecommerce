"use client";

import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { CartLineItem } from "@/components/commerce/CartLineItem";
import { CartSummary } from "@/components/commerce/CartSummary";
import { Button } from "@/components/ui/button";

export default function CartPage() {
  const { lines, subtotal, itemCount } = useCart();

  if (lines.length === 0) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-2xl mx-auto text-center">
          <ShoppingBag className="mx-auto h-12 w-12 text-slate-400 mb-4" />
          <h1 className="text-2xl font-medium text-slate-900 mb-2">
            Your cart is empty
          </h1>
          <p className="text-slate-600 mb-6">
            Looks like you haven't added anything to your cart yet.
          </p>
          <Link href="/">
            <Button className="rounded-2xl">Continue shopping</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-2xl md:text-3xl font-medium text-slate-900 mb-8">
        Shopping Cart
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Left: Cart Items */}
        <div className="lg:col-span-2">
          {/* Free shipping message */}
          {subtotal < 5000 && (
            <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-xl mb-6">
              <p className="text-sm text-emerald-800">
                Only {((5000 - subtotal) / 100).toFixed(2)} away from free shipping!
              </p>
            </div>
          )}

          <div className="divide-y divide-slate-200">
            {lines.map((line) => (
              <CartLineItem key={line.id} line={line} />
            ))}
          </div>
        </div>

        {/* Right: Summary */}
        <div className="bg-stone-50 p-6 rounded-xl h-fit">
          <CartSummary />
          <Link href="/checkout" className="block mt-6">
            <Button className="w-full rounded-2xl" size="lg">
              Checkout
            </Button>
          </Link>
          <Link
            href="/"
            className="block text-center text-sm text-slate-600 hover:text-slate-900 mt-4"
          >
            Continue shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
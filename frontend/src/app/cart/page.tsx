"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { CartLineItem } from "@/components/commerce/CartLineItem";
import { CartSummary } from "@/components/commerce/CartSummary";
import { CartRecommendations } from "@/components/commerce/CartRecommendations";
import { CheckoutProgress } from "@/components/checkout/CheckoutProgress";
import { ExpressCheckout } from "@/components/checkout/ExpressCheckout";
import { Button } from "@/components/ui/button";
import { listProducts } from "@/lib/mockApi";
import { Product } from "@/types";

export default function CartPage() {
  const { lines, subtotal, savedItems } = useCart();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    listProducts().then(setProducts);
  }, []);

  if (lines.length === 0 && savedItems.length === 0) {
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
        {products.length > 0 && (
          <div className="mt-16 max-w-6xl mx-auto">
            <CartRecommendations products={products} />
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-2xl md:text-3xl font-medium text-slate-900 mb-4">
        Shopping Cart
      </h1>

      <CheckoutProgress currentStep="cart" />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Left: Cart Items */}
        <div className="lg:col-span-2">
          {/* Free shipping message */}
          {subtotal < 5000 && lines.length > 0 && (
            <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-xl mb-6">
              <p className="text-sm text-emerald-800">
                Only ${((5000 - subtotal) / 100).toFixed(2)} away from free shipping!
              </p>
            </div>
          )}

          {lines.length > 0 ? (
            <div className="divide-y divide-slate-200">
              {lines.map((line) => (
                <CartLineItem key={line.id} line={line} />
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-slate-600">
              Your cart is empty. Check your saved items below or continue shopping.
            </div>
          )}

          {/* Saved Items */}
          {savedItems.length > 0 && (
            <div className="mt-12 border-t border-slate-200 pt-8">
              <h2 className="text-xl font-medium mb-4">Saved for later ({savedItems.length})</h2>
              <div className="divide-y divide-slate-200">
                {savedItems.map((item) => (
                  <CartLineItem key={item.id} line={item} isSaved />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right: Summary */}
        <div className="bg-stone-50 p-6 rounded-xl h-fit">
          <CartSummary />
          <Link href="/checkout" className="block mt-6">
            <Button 
              className="w-full rounded-2xl" 
              size="lg"
              disabled={lines.length === 0}
            >
              Checkout
            </Button>
          </Link>
          <Link
            href="/"
            className="block text-center text-sm text-slate-600 hover:text-slate-900 mt-4"
          >
            Continue shopping
          </Link>

          {/* Express Checkout */}
          {lines.length > 0 && <ExpressCheckout />}
        </div>
      </div>

      {/* Recommendations */}
      {products.length > 0 && (
        <CartRecommendations products={products} />
      )}
    </div>
  );
}
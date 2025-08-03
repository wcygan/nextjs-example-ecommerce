"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/hooks/useCart";
import { CheckoutForm } from "@/components/checkout/CheckoutForm";
import { OrderSummary } from "@/components/checkout/OrderSummary";
import { CheckoutProgress } from "@/components/checkout/CheckoutProgress";
import { TrustBadges } from "@/components/sections/TrustBadges";

export default function CheckoutPage() {
  const router = useRouter();
  const { lines } = useCart();

  useEffect(() => {
    // Redirect to cart if empty
    if (lines.length === 0) {
      router.push("/cart");
    }
  }, [lines, router]);

  if (lines.length === 0) {
    return null; // Show nothing while redirecting
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-2xl md:text-3xl font-medium text-slate-900 mb-4">
        Checkout
      </h1>

      <CheckoutProgress currentStep="information" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left: Checkout Form */}
        <div>
          <CheckoutForm />
        </div>

        {/* Right: Order Summary */}
        <div className="bg-stone-50 p-6 rounded-xl h-fit">
          <OrderSummary />
        </div>
      </div>

      {/* Trust Badges */}
      <div className="mt-12 border-t border-slate-200">
        <TrustBadges />
      </div>
    </div>
  );
}
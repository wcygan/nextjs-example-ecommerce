"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/hooks/useCart";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { createOrder } from "@/lib/mockApi";
import { Zap } from "lucide-react";

export function ExpressCheckout() {
  const router = useRouter();
  const { lines, subtotal, clear } = useCart();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleExpressCheckout = async () => {
    setIsLoading(true);

    try {
      // Mock express checkout - using saved details
      const mockSavedDetails = {
        email: "express@example.com",
        firstName: "Express",
        lastName: "User",
        address1: "123 Quick St",
        city: "Fastville",
        region: "CA",
        postalCode: "90210",
        country: "US",
        paymentMethod: "express",
      };

      const order = await createOrder({
        ...mockSavedDetails,
        lines,
        subtotal,
        shipping: subtotal >= 5000 ? 0 : 500,
        total: subtotal + (subtotal >= 5000 ? 0 : 500),
      });

      clear();
      toast({
        title: "Order placed!",
        description: "Thank you for your express purchase.",
      });
      router.push(`/order/${order.id}`);
    } catch (error) {
      toast({
        title: "Express checkout failed",
        description: "Please try regular checkout instead.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="border-t border-slate-200 pt-4 mt-4">
      <p className="text-sm text-slate-600 mb-3">Skip the form with express checkout</p>
      <Button
        onClick={handleExpressCheckout}
        disabled={isLoading || lines.length === 0}
        className="w-full rounded-2xl bg-slate-900 hover:bg-slate-800"
        size="lg"
      >
        <Zap className="w-4 h-4 mr-2" />
        Express Checkout
      </Button>
      <p className="text-xs text-slate-500 mt-2 text-center">
        Uses your saved shipping and payment details
      </p>
    </div>
  );
}
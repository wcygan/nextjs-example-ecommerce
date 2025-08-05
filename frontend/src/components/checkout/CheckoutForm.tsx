"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckoutForm as CheckoutFormType, checkoutSchema } from "@/lib/validation/checkout";
import { createOrder } from "@/lib/mockApi";
import { useCart } from "@/hooks/useCart";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

export function CheckoutForm() {
  const router = useRouter();
  const { lines, subtotal, clear } = useCart();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<CheckoutFormType>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (values: CheckoutFormType) => {
    setIsSubmitting(true);
    
    try {
      const shipping = subtotal >= 5000 ? 0 : 650;
      const order = await createOrder({
        email: values.email,
        shippingAddress: {
          firstName: "Guest",
          lastName: "User",
          address1: "123 Demo Street",
          address2: "",
          city: "Demo City",
          region: "CA",
          postalCode: "12345",
          country: "US",
        },
        lines,
        subtotal,
        shipping,
        total: subtotal + shipping,
      });

      // Clear cart first to ensure it happens
      clear();
      // Redirect to confirmation page
      router.push(`/order/${order.id}`);
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <section>
          <h2 className="text-xl font-medium mb-4">Contact Information</h2>
          <p className="text-sm text-slate-600 mb-6">
            Enter your email to receive order confirmation.
          </p>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="your@email.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </section>

        <div className="border-t border-slate-200 pt-6">
          <p className="text-sm text-slate-600 mb-4">
            This is a demo checkout. No payment will be processed.
          </p>
        </div>

        <Button
          type="submit"
          size="lg"
          className="w-full rounded-2xl"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Processing..." : "Complete order"}
        </Button>
      </form>
    </Form>
  );
}
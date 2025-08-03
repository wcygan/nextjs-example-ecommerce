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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ContactSection } from "./ContactSection";
import { ShippingSection } from "./ShippingSection";
import { PaymentSection } from "./PaymentSection";

export function CheckoutForm() {
  const router = useRouter();
  const { lines, subtotal, clear } = useCart();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<CheckoutFormType>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
      address1: "",
      address2: "",
      city: "",
      region: "",
      postalCode: "",
      country: "US",
      paymentMethod: "now",
    },
  });

  const onSubmit = async (values: CheckoutFormType) => {
    setIsSubmitting(true);
    
    try {
      const shipping = subtotal >= 5000 ? 0 : 650;
      const order = await createOrder({
        email: values.email,
        shippingAddress: {
          firstName: values.firstName,
          lastName: values.lastName,
          address1: values.address1,
          address2: values.address2,
          city: values.city,
          region: values.region,
          postalCode: values.postalCode,
          country: values.country,
        },
        lines,
        subtotal,
        shipping,
        total: subtotal + shipping,
      });

      // Clear cart and redirect to confirmation
      clear();
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
        <ContactSection form={form} />
        <ShippingSection form={form} />
        <PaymentSection form={form} />

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
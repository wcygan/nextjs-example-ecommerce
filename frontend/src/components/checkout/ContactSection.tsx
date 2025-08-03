"use client";

import { UseFormReturn } from "react-hook-form";
import { CheckoutForm } from "@/lib/validation/checkout";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface ContactSectionProps {
  form: UseFormReturn<CheckoutForm>;
}

export function ContactSection({ form }: ContactSectionProps) {
  return (
    <section>
      <h2 className="text-xl font-medium mb-4">Contact</h2>
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
  );
}
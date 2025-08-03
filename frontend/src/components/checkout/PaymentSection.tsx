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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface PaymentSectionProps {
  form: UseFormReturn<CheckoutForm>;
}

export function PaymentSection({ form }: PaymentSectionProps) {
  return (
    <section>
      <h2 className="text-xl font-medium mb-4">Payment</h2>
      <FormField
        control={form.control}
        name="paymentMethod"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="space-y-3"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="now" id="now" />
                  <Label htmlFor="now" className="cursor-pointer font-normal">
                    Pay now
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="installments" id="installments" />
                  <Label htmlFor="installments" className="cursor-pointer font-normal">
                    4 interest-free installments
                  </Label>
                </div>
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </section>
  );
}
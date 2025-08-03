import { z } from "zod";

export const checkoutSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  address1: z.string().min(1, "Address is required"),
  address2: z.string().optional(),
  city: z.string().min(1, "City is required"),
  region: z.string().min(1, "State/Province is required"),
  postalCode: z.string().min(3, "Postal code is required"),
  country: z.string().min(2, "Country is required"),
  paymentMethod: z.enum(["now", "installments"]),
});

export type CheckoutForm = z.infer<typeof checkoutSchema>;
export type Money = number; // store as cents for precision

export type ProductOption = {
  id: string;
  name: string; // e.g., "Legs", "Color"
  values: { id: string; label: string }[];
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  price: Money;
  image: string; // local /public/ path
  description: string;
  options?: ProductOption[];
  sku?: string;
};

export type CartLine = {
  id: string; // cart line id
  productId: string;
  name: string;
  price: Money;
  quantity: number;
  image: string;
  selectedOptions?: Record<string, string>; // optionId -> valueId
};

export type Order = {
  id: string;
  number: string;
  email: string;
  shippingAddress: Address;
  lines: CartLine[];
  subtotal: Money;
  shipping: Money;
  total: Money;
  createdAt: string;
};

export type Address = {
  firstName: string;
  lastName: string;
  address1: string;
  address2?: string;
  city: string;
  region: string;
  postalCode: string;
  country: string;
};
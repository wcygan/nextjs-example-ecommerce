## RFC: Mocked Online Ordering Site (Next.js + TS)

**Scope:** UI-only prototype with stubbed data/API. No real backend, payments, or auth.
**Tech:** TypeScript, Next.js (App Router), Tailwind CSS, shadcn/ui, React Hook Form, Zod.

---

### 1) Goals / Non-Goals

**Goals**

* Showcase a modern storefront with:
  Inventory (grid) → Product detail → Cart → Checkout → Order confirmation.
* All data from a local mock API with simulated latency and occasional “errors.”
* Tasteful, minimal design aligned to the reference screenshots: airy white space, clear product imagery, subtle accent colors, modern typography, unobtrusive borders, and clean CTAs.
* Maintainable component structure to swap mock API with a real one later.

**Non-Goals**

* Real payment, shipping, taxes, or auth.
* Server-side persistence (use localStorage only).
* Complex search, faceting, or admin.

---

### 2) User Flow (Happy Path)

1. **Inventory** (`/`) – Browse grid, quick add to cart.
2. **Product** (`/product/[slug]`) – View images, price, options, description. Add to cart.
3. **Cart** (`/cart`) – Edit quantities, remove items, proceed to checkout.
4. **Checkout** (`/checkout`) – Enter contact + shipping details. Choose (fake) payment option.
5. **Confirmation** (`/order/[id]`) – Show order number, items, totals, shipping address.

Fallbacks: empty states for cart/confirmation, skeleton loading, error toasts with retry.

---

### 3) Information Architecture & Routing (Next.js App Router)

```
/app
  /layout.tsx              // global shell (header, footer, cart badge)
  /page.tsx                // inventory grid
  /product/[slug]/page.tsx // product detail
  /cart/page.tsx
  /checkout/page.tsx
  /order/[id]/page.tsx
/components
/lib
  mockApi.ts               // fake API
  currency.ts
  id.ts
/store
  cart.tsx                 // CartProvider (Context + reducer + localStorage sync)
/styles
```

* Prefer **Server Components** for page shells and static product lists (from mock API).
* Use **Client Components** where interactivity is needed (cart controls, forms).

---

### 4) Data Model (lightweight)

```ts
// types.ts
export type Money = number; // store as cents for precision

export type ProductOption = {
  id: string;
  name: string;           // e.g., "Legs", "Color"
  values: { id: string; label: string }[];
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  price: Money;
  image: string;          // local /public/ path
  description: string;
  options?: ProductOption[];
  sku?: string;
};

export type CartLine = {
  id: string;             // cart line id
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
```

---

### 5) Mock API (no network, simulated latency)

* **Location:** `/lib/mockApi.ts`
* **Behavior:** Promises with `setTimeout` (200–600 ms). Random 5% error rate for realism.
* **Source of truth:** In-memory arrays; seed from `/lib/seed.ts`.
* **Persistence:** Cart in `localStorage` only (through CartProvider).

```ts
// lib/mockApi.ts
import { Product, Order } from "@/types";

const products: Product[] = [ /* seeded items with images in /public/products */ ];

const wait = (ms: number) => new Promise(r => setTimeout(r, ms));
const maybeFail = () => { if (Math.random() < 0.05) throw new Error("Temporary error"); };

export async function listProducts(): Promise<Product[]> {
  await wait(300); maybeFail(); return products;
}

export async function getProduct(slug: string): Promise<Product | undefined> {
  await wait(250); maybeFail(); return products.find(p => p.slug === slug);
}

export async function createOrder(payload: Omit<Order, "id"|"number"|"createdAt">): Promise<Order> {
  await wait(600); maybeFail();
  const id = crypto.randomUUID();
  return { ...payload, id, number: id.slice(0, 8).toUpperCase(), createdAt: new Date().toISOString() };
}
```

---

### 6) State Management

* **CartProvider** (Context + `useReducer`) handles: add, update qty, remove, clear.
* Sync cart state to `localStorage` (throttle to avoid excessive writes).
* Expose a `useCart()` hook with typed actions.
* Keep order data ephemeral; confirmation page reads from mock API return (passed via redirect state or query param id; for prototype we can also stash last order in sessionStorage).

```ts
// store/cart.tsx
type Action =
  | { type: "ADD"; line: CartLine }
  | { type: "REMOVE"; id: string }
  | { type: "UPDATE_QTY"; id: string; quantity: number }
  | { type: "CLEAR" };

```

---

### 7) Forms & Validation (React Hook Form + Zod)

* **Checkout form schema**:

```ts
import { z } from "zod";
export const checkoutSchema = z.object({
  email: z.string().email(),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  address1: z.string().min(1),
  address2: z.string().optional(),
  city: z.string().min(1),
  region: z.string().min(1),
  postalCode: z.string().min(3),
  country: z.string().min(2),
  paymentMethod: z.enum(["now", "installments"]),
});
export type CheckoutForm = z.infer<typeof checkoutSchema>;
```

* Use shadcn **Form**, **Input**, **RadioGroup**, **Button**, **Separator**, **Textarea**.
* On submit: transform to `Order` payload, call `createOrder`, then `router.push('/order/[id]')`.

---

### 8) Styling & UX (aligned to references)

**Palette & Tone**

* **Base:** neutral white/stone backgrounds (`bg-white`, `bg-stone-50`).
* **Text:** `text-slate-900` primary, `text-slate-600` secondary.
* **Accents:** teal (`emerald/teal-500`) for CTAs; olive/dark-moss hover per checkout reference (`hover:bg-emerald-600`).
* **Borders:** subtle (`border-slate-200`), 1 px.
* **Shadows:** soft (`shadow-md/10`, `shadow-sm`).

**Components**

* **Header:** logo left, nav links (Shop, About), right: search icon (non-functional), cart badge (count).
* **Product cards:** large image, name, price, subtle hover raise (`hover:shadow-md`, `hover:-translate-y-0.5`).
* **Buttons:** shadcn `Button` with rounded-xl (`rounded-2xl`), generous padding; primary/secondary variants.
* **Skeletons:** use shadcn `Skeleton` for grid items and PDP media.
* **Empty states:** centered icon + copy + CTA back to shop.
* **Toasts:** shadcn `useToast` for add-to-cart, errors, and checkout success.
* **Spacing:** generous `py-12` sections, `gap-6` grids.

**Typography**

* Use a modern sans (system UI or a single variable font).
* Product name: `text-lg md:text-xl font-medium`; prices: `font-semibold`.
* Headings: `text-2xl md:text-3xl` with wide letter spacing on landing titles to echo the minimalist style.

**Imagery**

* Keep images large with ample negative space (like the bench product shots).
* Consistent aspect ratio (e.g., 4:3) with `object-contain` and a light backdrop.

---

### 9) Page Specs

#### Inventory (`/`)

* **Server Component** reads `listProducts()`.
* Grid: `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6`.
* Card: image, name, price, “Quick add” (client action).
* Sort dropdown (non-functional UI element for realism).

#### Product Detail (`/product/[slug]`)

* **Server Component** shell + client add-to-cart.
* Left: large image pane; Right: name, price, options (e.g., "Legs" selector), quantity, Add to cart.
* “Gold Aston Legs” style option as a nod to the reference.
* Shipping & returns copy block (static).
* Related products (3 items) row.

#### Cart (`/cart`)

* Line items with image, name, selected options, price, qty stepper, remove.
* Summary card: subtotal, shipping (flat mocked, e.g., 6.50), total.
* CTA: “Checkout.”
* “Only \$X away from free shipping” banner (static threshold), aligned to reference tone.

#### Checkout (`/checkout`)

* **Client Component** with RHF + Zod.
* Left: contact + address; Right: order summary with totals.
* Payment options (radio): **Pay now** or **4 installments** (non-functional).
* Submit → loading state → `createOrder` → redirect to confirmation.

#### Order Confirmation (`/order/[id]`)

* Large “Thank you” heading, order number, email receipt notice.
* Address, items, totals.
* CTA: “Continue shopping.”

---

### 10) Components (shadcn/ui)

* `Header`, `Footer`, `Container`
* `ProductCard`, `Price`
* `QuantityStepper`
* `OptionPicker` (for product options)
* `CartSheet` (optional mini-cart) and `CartLineItem`
* `OrderSummary`
* `SkeletonGrid`
* `Form` wrappers over RHF + shadcn

---

### 11) Example Snippets

**Currency helper**

```ts
// lib/currency.ts
export const toMoney = (cents: number) => (cents / 100).toLocaleString(undefined, {
  style: "currency",
  currency: "USD",
});
```

**Add to cart action**

```ts
// components/AddToCart.tsx (client)
const AddToCart = ({ product }: { product: Product }) => {
  const { add } = useCart();
  const onClick = () => add({
    id: crypto.randomUUID(),
    productId: product.id,
    name: product.name,
    price: product.price,
    quantity: 1,
    image: product.image,
  });
  return <Button onClick={onClick}>Add to cart</Button>;
};
```

**Checkout submit**

```ts
const onSubmit = async (values: CheckoutForm) => {
  const order = await createOrder({
    email: values.email,
    shippingAddress: pickAddress(values),
    lines: cart.lines,
    subtotal: cart.subtotal,
    shipping: 650,
    total: cart.subtotal + 650,
  });
  clear();
  router.push(`/order/${order.id}?number=${order.number}`);
};
```

---

### 12) Accessibility & UX Details

* All interactive elements keyboard accessible; visible focus rings (`focus:ring-2`).
* Use `alt` text on all images with product names.
* Button labels are explicit (“Add to cart”, “Remove”).
* Form fields have labels + `aria-invalid` on errors; inline error messages.
* Color contrast ≥ WCAG AA.

---

### 13) Performance & Perceived Speed

* Static product list (mocked) → cached by RSC in memory for session.
* Lightweight images (WebP) in `/public/products`.
* Skeletons during artificial latency.
* Keep bundle lean; avoid new libs beyond shadcn and RHF/Zod.

---

### 14) Testing (minimal)

* Playwright smoke flows: inventory → product → cart → checkout → confirmation.
* Unit: cart reducer actions.

---

### 15) Project Setup

* Tailwind + shadcn initialized; define `primary` (teal) and `muted` (stone) tokens.
* Seed 8–12 products with images and at least one with an option group (“Legs”).
* Add `CartProvider` in `app/layout.tsx`.

---

### 16) Acceptance Criteria

* All pages render with mocked data and graceful loading/error states.
* Cart persists between page navigations.
* Checkout validates input and produces a confirmation page with an order number.
* Visual style matches references: clean product grid, elegant PDP, tidy cart/checkout paneling.
* No network or backend required to demo.

---

### 17) Deliberate Simplifications (and why)

* Local mock API instead of MSW/test containers → faster iteration; demoable offline.
* No global data fetcher/react-query → RSC + simple hooks are enough for a prototype.
* Flat shipping + no tax → keeps totals understandable without real logic.

---

### 18) Next Steps

1. Scaffold Next.js app, Tailwind, and shadcn; create theme tokens.
2. Build `CartProvider` + reducer and wire header cart badge.
3. Implement `listProducts()` inventory page with skeletons.
4. Implement PDP with option picker and add-to-cart.
5. Cart page + summary; then checkout form and confirmation.
6. Polish: toasts, empty states, subtle animations, error retries.

If you want, I’ll translate this into a project skeleton next.

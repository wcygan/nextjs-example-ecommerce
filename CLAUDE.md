# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **Next.js 15 ecommerce prototype** built according to the detailed RFC specification. The project is designed as a **UI-only demonstration** with no real backend, payments, or authentication - all data comes from mock APIs with simulated latency.

**Status:** Currently in planning/initialization phase with only Next.js boilerplate code. Implementation follows the comprehensive RFC.md blueprint.

## Technology Stack

- **Framework:** Next.js 15.4.5 with App Router
- **Runtime:** React 19.1.0  
- **Language:** TypeScript 5
- **Styling:** Tailwind CSS 4 with PostCSS
- **Package Manager:** Bun (explicitly preferred over npm/yarn/pnpm)
- **Planned Dependencies:** shadcn/ui, React Hook Form, Zod validation

## Development Commands

**Working Directory:** `/frontend/` (all commands run from this subdirectory)

```bash
# Development server with Turbopack
bun dev

# Production build
bun run build

# Serve production build
bun start

# Code linting
bun run lint

# Type checking (manual)
bunx tsc --noEmit
```

## Architecture & Planned Structure

The application follows the Next.js App Router pattern with a complete ecommerce flow:

### Page Routes (Planned Implementation)
```
/                         # Inventory grid (product catalog)
/product/[slug]          # Product detail pages with options
/cart                    # Shopping cart management  
/checkout                # Contact + shipping form
/order/[id]              # Order confirmation
```

### Directory Structure (Target)
```
/frontend/
├── src/
│   ├── app/
│   │   ├── layout.tsx              # Global shell (header, footer, cart badge)
│   │   ├── page.tsx                # Inventory grid
│   │   ├── product/[slug]/page.tsx # Product detail
│   │   ├── cart/page.tsx           # Cart page
│   │   ├── checkout/page.tsx       # Checkout form
│   │   └── order/[id]/page.tsx     # Order confirmation
│   ├── components/                 # Reusable UI components
│   ├── lib/
│   │   ├── mockApi.ts              # Fake API with simulated latency
│   │   ├── currency.ts             # Currency formatting utilities
│   │   └── types.ts                # TypeScript type definitions
│   ├── store/
│   │   └── cart.tsx                # CartProvider (Context + reducer)
│   └── styles/
└── public/
    └── products/                   # Product images
```

## Core Data Models

Based on the RFC specification, the primary types are:

```typescript
type Product = {
  id: string;
  slug: string;
  name: string;
  price: Money;           // stored as cents
  image: string;
  description: string;
  options?: ProductOption[];
};

type CartLine = {
  id: string;
  productId: string;
  name: string;
  price: Money;
  quantity: number;
  image: string;
  selectedOptions?: Record<string, string>;
};
```

## State Management Strategy

- **CartProvider** using React Context + useReducer
- Actions: ADD, REMOVE, UPDATE_QTY, CLEAR
- localStorage synchronization for cart persistence
- `useCart()` hook for component access

## Mock API Design

All data comes from `/lib/mockApi.ts` with:
- Simulated latency (200-600ms delays)
- 5% random error rate for realistic error handling
- In-memory product arrays seeded from `/lib/seed.ts`
- No real backend persistence

## Component Strategy

**Server Components:** Use for static content (product lists, page shells)
**Client Components:** Use only where interactivity needed (cart controls, forms)

### Planned Component Library
- ProductCard, Price, QuantityStepper
- OptionPicker (for product variants)
- CartLineItem, OrderSummary  
- SkeletonGrid (loading states)
- Form wrappers with React Hook Form + Zod

## Styling Guidelines

**Design System (from RFC):**
- Base: neutral white/stone backgrounds (`bg-white`, `bg-stone-50`)
- Text: `text-slate-900` primary, `text-slate-600` secondary
- Accents: teal/emerald for CTAs (`emerald-500`, `hover:bg-emerald-600`)
- Borders: subtle 1px (`border-slate-200`)
- Generous spacing: `py-12` sections, `gap-6` grids

**Typography:**
- Product names: `text-lg md:text-xl font-medium`
- Prices: `font-semibold`
- Headings: `text-2xl md:text-3xl`

## Form Validation

Use React Hook Form + Zod for checkout form:
```typescript
const checkoutSchema = z.object({
  email: z.string().email(),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  // ... address fields
  paymentMethod: z.enum(["now", "installments"]),
});
```

## Testing Strategy

**Planned Testing:**
- Playwright for e2e smoke tests (inventory → checkout flow)
- Unit tests for cart reducer actions
- No current testing framework installed

## Implementation Roadmap

According to RFC, the 18-step implementation plan prioritizes:

1. **Foundation:** Install shadcn/ui, configure theme tokens
2. **State Management:** Implement CartProvider with localStorage sync
3. **Data Layer:** Create mock API with product seeding
4. **Core Pages:** Build inventory → product → cart → checkout → confirmation flow
5. **Polish:** Add toasts, empty states, error handling

## Key Project Constraints

**Scope Limitations:**
- No real payment processing (mock payment options only)
- No server-side persistence (localStorage only)
- No user authentication (email collection during checkout only)
- No complex search or admin features

**Performance Goals:**
- Static product data cached by RSC
- Lightweight images (WebP format)
- Skeleton loading states during artificial latency
- Lean bundle (avoid unnecessary libraries)

## Development Notes

- **Package Manager:** Always use Bun for performance
- **Error Handling:** Mock API includes 5% error rate - implement proper error boundaries and retry logic  
- **Accessibility:** Ensure keyboard navigation, proper ARIA labels, WCAG AA contrast
- **Images:** Use consistent 4:3 aspect ratio with `object-contain`
- **Currency:** Store prices as cents, format with `toLocaleString` helper

## Missing Dependencies

The following need to be installed per RFC specification:
- `shadcn/ui` component library
- `react-hook-form` for form management
- `zod` for validation schemas
- Additional utilities as needed during implementation
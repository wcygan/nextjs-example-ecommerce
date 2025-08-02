# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## ⚠️ CRITICAL: Always Read design.md First

**BEFORE making any UI changes, you MUST:**
1. Read `design.md` (in repository root) completely
2. Follow the design system exactly as specified
3. Use ONLY approved color tokens, spacing, and components
4. Verify your changes against the Definition of Done checklist in design.md

## Project Overview

This is a **Next.js 15 ecommerce prototype** built according to the detailed RFC specification and strict design.md guidelines. The project is designed as a **UI-only demonstration** with no real backend, payments, or authentication - all data comes from mock APIs with simulated latency.

**Status:** Currently in planning/initialization phase with only Next.js boilerplate code. Implementation follows the comprehensive RFC.md blueprint and design.md specifications.

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

## Design System Enforcement

**⚠️ MANDATORY: All styling MUST follow design.md specifications exactly.**

### Approved Design Tokens ONLY
- **Colors**: ONLY use tokens from design.md (no arbitrary colors)
- **Spacing**: ONLY 8pt grid system (`py-12`, `gap-6`, `p-6`, etc.)
- **Typography**: ONLY approved scales from design.md
- **Components**: ONLY shadcn/ui components (no custom CSS unless absolutely necessary)

### Design.md Integration Rules
1. **Before ANY UI work**: Read design.md completely
2. **Reference patterns**: Use exact code examples from design.md
3. **Component consistency**: Follow component reuse patterns strictly
4. **State management**: Implement all interactive states (hover, focus, loading, error)
5. **Accessibility**: Meet all WCAG AA requirements from design.md checklist

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

## UI Development Workflow

### Phase 1: Rough Draft (Structure First)
1. Read design.md completely before starting
2. Generate rough draft for ALL pages using Next.js + Tailwind + shadcn/ui
3. Prioritize structure and component choices over polish
4. NO custom CSS - only Tailwind utilities and shadcn components
5. Return minimal diffs

### Phase 2: Polish (One Page at a Time)
1. Focus on ONE page only per session
2. Self-review first: identify spacing/typography/consistency issues
3. Apply design.md rules strictly (8pt spacing, accessible contrast, shadcn variants)
4. Add all required states: empty/loading/error/hover/focus
5. Verify against design.md Definition of Done checklist
6. Return diff only

### Phase 3: Micro-fixes (Targeted)
1. Make only specific, targeted improvements
2. Tighten spacing, align elements, add subtle interactions
3. Touch only the requested component/section
4. Maintain consistency with design.md patterns

## Development Notes

- **Package Manager:** Always use Bun for performance
- **Design System:** NEVER deviate from design.md - it's the single source of truth
- **Error Handling:** Mock API includes 5% error rate - implement proper error boundaries and retry logic  
- **Accessibility:** ALL WCAG AA requirements from design.md are mandatory
- **Images:** Use consistent 4:3 aspect ratio with `object-contain` (per design.md)
- **Currency:** Store prices as cents, format with `toLocaleString` helper
- **Code Reviews:** Self-review against design.md checklist before completion

## Missing Dependencies

The following need to be installed per RFC specification:
- `shadcn/ui` component library
- `react-hook-form` for form management
- `zod` for validation schemas
- Additional utilities as needed during implementation
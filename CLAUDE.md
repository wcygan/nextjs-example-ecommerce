# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## ⚠️ CRITICAL: Specialized Sub-Agents Required

**BEFORE making any changes, you MUST leverage the specialized sub-agents:**

### Three Specialized Agents Available
1. **design-guardian** - UI/UX design enforcer (red) - Ensures strict design.md compliance
2. **commerce-architect** - Ecommerce flow specialist (blue) - Handles cart, checkout, commerce logic  
3. **type-architect** - TypeScript architecture specialist (green) - Ensures type safety & Next.js patterns

### Mandatory Agent Consultation Rules
- **ALL UI work**: Consult `design-guardian` FIRST before any styling or component changes
- **ANY ecommerce feature**: Use `commerce-architect` for cart, products, checkout, state management
- **TypeScript/architecture**: Engage `type-architect` for components, types, Next.js patterns, errors
- **Complex features**: Use multiple agents in coordination (design → commerce → types)

## Project Overview

This is a **Next.js 15 ecommerce prototype** built according to the detailed RFC specification and strict design.md guidelines. The project is designed as a **UI-only demonstration** with no real backend, payments, or authentication - all data comes from mock APIs with simulated latency.

**Status:** ✅ Complete implementation with full shopping flow from browsing to order confirmation.

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

## Architecture & Implementation

The application follows the Next.js App Router pattern with a complete ecommerce flow:

### Page Routes (Implemented)
```
/                         # Inventory grid (product catalog)
/product/[slug]          # Product detail pages with options
/cart                    # Shopping cart management  
/checkout                # Contact + shipping form
/order/[id]              # Order confirmation
```

### Directory Structure (Current)
```
/frontend/
├── src/
│   ├── app/
│   │   ├── layout.tsx              # Global shell with CartProvider, Header, Toaster
│   │   ├── page.tsx                # Inventory grid with product cards
│   │   ├── product/[slug]/page.tsx # Product detail with options
│   │   ├── cart/page.tsx           # Cart page with line items
│   │   ├── checkout/page.tsx       # Checkout form with validation
│   │   └── order/[id]/page.tsx     # Order confirmation
│   ├── components/
│   │   ├── ui/                     # shadcn/ui components
│   │   ├── commerce/               # ProductCard, CartLineItem, etc.
│   │   ├── checkout/               # Form sections
│   │   ├── order/                  # OrderConfirmation
│   │   └── layout/                 # Header component
│   ├── lib/
│   │   ├── mockApi.ts              # Fake API with simulated latency
│   │   ├── currency.ts             # Currency formatting utilities
│   │   ├── seed.ts                 # Product data (12 items)
│   │   ├── utils.ts                # cn() helper
│   │   └── validation/             # Zod schemas
│   ├── store/
│   │   ├── cart.tsx                # CartProvider (Context + reducer)
│   │   └── cartReducer.ts          # Cart state logic
│   ├── types/
│   │   ├── index.ts                # Core types (Product, Order, etc.)
│   │   └── cart.ts                 # Cart-specific types
│   └── hooks/
│       └── useCart.ts              # Cart hook for components
└── public/
    └── products/                   # Product SVG placeholders
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

## State Management

### Cart State Architecture
- **CartProvider** using React Context + useReducer pattern
- **Actions**: ADD, REMOVE, UPDATE_QTY, CLEAR, HYDRATE
- **localStorage** synchronization with 1-second throttling
- **useCart()** hook provides typed access to:
  - `lines`: Array of cart items
  - `subtotal`: Calculated total in cents
  - `itemCount`: Total quantity across all lines
  - `add()`, `remove()`, `updateQuantity()`, `clear()` methods

### Key Implementation Details
- Cart persists across browser sessions
- Handles product variants (selected options)
- Prevents duplicate items with same options
- Automatic totals calculation on state changes

## Mock API Design

All data comes from `/lib/mockApi.ts` with:
- Simulated latency (200-600ms delays)
- 5% random error rate for realistic error handling
- In-memory product arrays seeded from `/lib/seed.ts`
- Order storage in sessionStorage for confirmation page
- No real backend persistence

### Available Endpoints
- `listProducts()`: Returns all 12 products
- `getProduct(slug)`: Returns single product by slug
- `createOrder(payload)`: Creates order and stores in sessionStorage
- `getOrder(id)`: Retrieves order from sessionStorage

## Component Architecture

### Server vs Client Components
**Server Components (default):**
- Page shells and layouts
- Product listings
- Static content sections
- Order confirmation display

**Client Components ("use client"):**
- Cart operations (add/remove/update)
- Form handling (checkout)
- Interactive UI (quantity steppers, option pickers)
- Toast notifications
- Components using hooks (useCart, useToast)

### Component Library (Implemented)
**UI Components (shadcn/ui):**
- Button, Input, Label, Form
- RadioGroup, Select, Skeleton
- Toast, Toaster
- All with consistent Radix UI primitives

**Commerce Components:**
- ProductCard: Grid item with image, name, price, quick add
- ProductDetail: Options, quantity, add to cart
- CartLineItem: Image, details, quantity stepper, remove
- CartSummary: Subtotal, shipping, total calculations
- OrderSummary: Condensed cart for checkout

**Layout Components:**
- Header: Logo, nav, search icon, cart badge
- CartBadge: Shows item count, hides when empty

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

## Form Handling

### Checkout Form Implementation
**Stack:** React Hook Form + Zod + shadcn/ui Form components

**Validation Schema (`/lib/validation/checkout.ts`):**
```typescript
const checkoutSchema = z.object({
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
```

**Form Sections:**
1. ContactSection: Email input
2. ShippingSection: Address fields in grid layout
3. PaymentSection: Radio group for payment options

**Key Features:**
- Real-time validation on blur
- Helpful inline error messages
- Loading state during submission
- Redirect protection (empty cart → cart page)

## Key Features Implemented

### Shopping Flow
1. **Product Browsing**: Grid layout with 12 products, non-functional sort dropdown
2. **Product Detail**: Image gallery, option selection (e.g., leg variants), quantity picker
3. **Cart Management**: Add/remove items, quantity updates, persistent across sessions
4. **Checkout**: Multi-field form with validation, payment method selection
5. **Order Confirmation**: Success page with order details and shipping address

### User Experience
- **Loading States**: Skeleton grids during data fetching
- **Error Handling**: 5% error rate simulation with retry capability
- **Toast Notifications**: Feedback for cart actions
- **Empty States**: Friendly messages and CTAs when cart is empty
- **Free Shipping**: Threshold at $50 with progress indicator
- **Responsive Design**: Mobile, tablet, and desktop layouts

### Technical Features
- **Type Safety**: Full TypeScript coverage, no 'any' types
- **Performance**: Server Components by default, Client Components only when needed
- **Accessibility**: WCAG AA compliant with proper ARIA labels, keyboard navigation
- **State Persistence**: Cart survives page refreshes and browser restarts

## Agent Coordination Rules & Quality Gates

### Automatic Agent Triggers
- **File creation/modification in `/components`**: Triggers `design-guardian` + `type-architect`
- **Cart/checkout/commerce logic**: Automatically engages `commerce-architect`
- **TypeScript errors or `tsc` failures**: Requires `type-architect` intervention
- **UI styling or Tailwind changes**: Mandatory `design-guardian` approval
- **New pages or routing**: All three agents must coordinate

### Quality Gates (Must Pass Before Proceeding)
1. **Design Gate**: `design-guardian` approves all UI elements match design.md
2. **Commerce Gate**: `commerce-architect` validates ecommerce flows and state management
3. **Architecture Gate**: `type-architect` confirms TypeScript safety and Next.js patterns
4. **Integration Gate**: All agents verify cross-cutting concerns are addressed

### Multi-Agent Collaboration Patterns
```
Feature Type          Primary Agent        Secondary Agents           Coordination Pattern
─────────────────────────────────────────────────────────────────────────────────────────
Product Card          design-guardian      type-architect             UI → Types
Shopping Cart         commerce-architect   design-guardian            Commerce → UI → Types
Checkout Form         commerce-architect   design-guardian            Commerce → UI → Types  
Type Definitions      type-architect       commerce-architect         Types → Commerce
Page Layouts          design-guardian      type-architect             UI → Types
API Integration       commerce-architect   type-architect             Commerce → Types
Error Boundaries      type-architect       commerce-architect         Types → Commerce
```

## Common Development Tasks

### Adding a New Product
1. Add product data to `/lib/seed.ts` following existing pattern
2. Add corresponding SVG image to `/public/products/`
3. Include any product options (variants) if applicable

### Modifying Cart Behavior
1. Update cart actions in `/store/cartReducer.ts`
2. Add new action types to `/types/cart.ts` if needed
3. Update `CartProvider` methods in `/store/cart.tsx`
4. Ensure localStorage sync still works

### Creating New Pages
1. Add route in `/app/[route]/page.tsx`
2. Use Server Components by default
3. Only add "use client" if interactivity needed
4. Follow existing layout patterns

### Updating Styles
1. **ALWAYS** check design.md first
2. Use only approved color tokens and spacing
3. Prefer shadcn/ui components over custom styles
4. Test responsive breakpoints

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

## Agent-Integrated Development Workflow

### Phase 1: Architecture & Planning (Multi-Agent Coordination)
1. **type-architect**: Define component architecture, Server/Client boundaries, type definitions
2. **commerce-architect**: Plan ecommerce flow, state management, data models  
3. **design-guardian**: Review design.md patterns for the planned feature
4. Generate rough draft structure with agent-approved patterns
5. Return minimal diffs focusing on architecture over polish

### Phase 2: Implementation & Polish (Agent-Specific Focus)
1. **Primary Agent Selection**: Choose lead agent based on feature type:
   - UI components → **design-guardian**
   - Commerce flows → **commerce-architect** 
   - TypeScript issues → **type-architect**
2. **Lead Agent Review**: Agent reviews implementation against their specialty
3. **Secondary Agent Validation**: Other agents validate their concerns
4. Apply agent feedback with strict compliance
5. Verify against all agent-specific requirements

### Phase 3: Quality Assurance (All-Agent Verification)
1. **design-guardian**: Final design compliance check
2. **commerce-architect**: Commerce flow and UX validation
3. **type-architect**: TypeScript architecture and performance review
4. All agents must approve before completion
5. Return diff only after all-agent sign-off

## Agent-Enforced Quality Standards

### design-guardian Requirements (UI/UX)
- ✅ ZERO tolerance for design.md violations
- ✅ Only approved color tokens, spacing, typography
- ✅ WCAG AA accessibility compliance mandatory
- ✅ shadcn/ui components only (no custom CSS)
- ✅ Consistent hover/focus/loading/error states
- ✅ 4:3 aspect ratio images with `object-contain`

### commerce-architect Requirements (Ecommerce)
- ✅ Complete user journey validation (inventory → confirmation)
- ✅ Proper Product/CartLine/Order type usage
- ✅ CartProvider with localStorage synchronization
- ✅ Mock API error handling (5% failure rate)
- ✅ React Hook Form + Zod validation patterns
- ✅ Optimistic updates for cart operations

### type-architect Requirements (TypeScript)
- ✅ Strict TypeScript compliance (no 'any' types)
- ✅ Proper Server/Client Component boundaries
- ✅ Clean import/export patterns (no circular deps)
- ✅ Performance optimizations (memo, proper dependencies)
- ✅ Error boundary implementations
- ✅ Next.js 15 App Router best practices

### Multi-Agent Definition of Done
**EVERY feature must pass ALL agent validations:**
1. **design-guardian**: UI matches design.md exactly
2. **commerce-architect**: Commerce flow works end-to-end  
3. **type-architect**: TypeScript compiles without errors
4. **Integration**: All agents verify cross-cutting concerns

## Common Issues & Solutions

### Cart Not Persisting
- Check browser localStorage is enabled
- Verify CartProvider wraps the app in layout.tsx
- Check for localStorage quota errors in console

### Product Images Not Loading
- Ensure SVG files exist in `/public/products/`
- File names must match product slugs exactly
- Use `.svg` extension in seed data

### Form Validation Errors
- All fields except address2 are required
- Email must be valid format
- Postal code needs 3+ characters
- Check console for Zod validation details

### Checkout Redirect Issues
- Cart must have items to access checkout
- Form must be fully valid to submit
- Check for API errors (5% failure rate)

### TypeScript Errors
- Run `bunx tsc --noEmit` to check types
- Ensure all imports use proper paths
- Check for missing type exports

## Development Commands

```bash
# Start development server
bun dev

# Type checking
bunx tsc --noEmit

# Build for production
bun run build

# Lint code
bun run lint
```
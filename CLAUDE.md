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

## Implementation Roadmap (Agent-Coordinated)

Each step requires specific agent approval:

1. **Foundation** (`type-architect` + `design-guardian`): Install shadcn/ui, configure theme tokens
2. **State Management** (`commerce-architect` + `type-architect`): Implement CartProvider with localStorage sync
3. **Data Layer** (`commerce-architect` + `type-architect`): Create mock API with product seeding
4. **Core Pages** (All agents): Build inventory → product → cart → checkout → confirmation flow
5. **Polish** (`design-guardian` + `commerce-architect`): Add toasts, empty states, error handling

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

## Development Notes

- **Package Manager:** Always use Bun for performance
- **Agent Hierarchy:** All three agents must approve significant changes
- **Quality Gates:** No exceptions - agents enforce zero-compromise standards
- **Coordination:** Use agents proactively, not reactively
- **Currency:** Store prices as cents, format with `toLocaleString` helper

## Missing Dependencies

The following need to be installed per RFC specification:
- `shadcn/ui` component library
- `react-hook-form` for form management
- `zod` for validation schemas
- Additional utilities as needed during implementation
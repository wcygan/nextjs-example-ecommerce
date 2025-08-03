# Phase 1: Foundation & Infrastructure

## Overview
Set up the core infrastructure, design system, and data layer for the ecommerce prototype. This phase establishes the technical foundation that all subsequent features will build upon.

## Tasks

### 1.1 Install Core Dependencies
```bash
cd frontend
bun add @radix-ui/react-dialog @radix-ui/react-dropdown-menu @radix-ui/react-label @radix-ui/react-radio-group @radix-ui/react-select @radix-ui/react-separator @radix-ui/react-slot @radix-ui/react-toast
bun add class-variance-authority clsx tailwind-merge lucide-react
bun add react-hook-form zod @hookform/resolvers
```

### 1.2 Configure shadcn/ui
- Initialize shadcn/ui with custom theme
- Set up components.json configuration
- Define custom color tokens:
  - Primary: teal/emerald-500
  - Muted: stone backgrounds
  - Borders: slate-200
- Configure CSS variables in globals.css

### 1.3 Create Type Definitions
Create `/frontend/src/types/index.ts`:
- Money type (cents storage)
- Product type with options
- CartLine type
- Order type
- Address type
- ProductOption type for variants

### 1.4 Set Up Project Structure
Create directory structure:
```
/frontend/src/
├── components/
│   ├── ui/           (shadcn components)
│   ├── layout/       (Header, Footer, Container)
│   └── commerce/     (ProductCard, CartLineItem, etc.)
├── lib/
│   ├── mockApi.ts
│   ├── currency.ts
│   ├── utils.ts
│   └── seed.ts
├── store/
│   └── cart.tsx
└── hooks/
    └── useCart.ts
```

### 1.5 Implement Mock API Layer
Create `/frontend/src/lib/mockApi.ts`:
- Simulated latency (200-600ms)
- 5% random error rate
- Product listing endpoint
- Product detail endpoint
- Order creation endpoint
- Helper functions (wait, maybeFail)

### 1.6 Create Product Seed Data
Create `/frontend/src/lib/seed.ts`:
- 8-12 products with realistic data
- At least one product with options (e.g., "Legs" selector)
- Product images in `/public/products/`
- Consistent naming and slugs
- Price ranges from $50-$500

### 1.7 Set Up Currency Utilities
Create `/frontend/src/lib/currency.ts`:
- toMoney() function for formatting cents
- fromMoney() for parsing user input
- Consistent USD formatting

### 1.8 Configure Base Layout
Update `/frontend/src/app/layout.tsx`:
- Import custom fonts if needed
- Set up metadata
- Prepare for CartProvider (skeleton)
- Add basic HTML structure

### 1.9 Add Product Images
Create `/public/products/` directory:
- Add 8-12 product images
- Consistent aspect ratio (4:3)
- WebP format preferred
- Light, neutral backgrounds
- Name images to match product slugs

### 1.10 Update Tailwind Configuration
Configure `tailwind.config.ts`:
- Custom color tokens
- Font configurations
- Animation classes
- Container settings
- Plugin configurations

## Deliverables
- [ ] All dependencies installed
- [ ] shadcn/ui configured with custom theme
- [ ] Complete TypeScript type definitions
- [ ] Mock API with seeded products
- [ ] Currency formatting utilities
- [ ] Product images ready
- [ ] Project structure established

## Validation Checklist
- [ ] `bun dev` runs without errors
- [ ] TypeScript compilation passes (`bunx tsc --noEmit`)
- [ ] Mock API returns products with latency
- [ ] Theme colors match design specifications
- [ ] All product images load correctly

## Agent Coordination
- **type-architect**: Review all TypeScript definitions and module structure
- **design-guardian**: Validate theme configuration matches design.md
- **commerce-architect**: Verify data models support ecommerce flows

## Next Phase
With foundation complete, proceed to PHASE-2-STATE.md for cart state management.
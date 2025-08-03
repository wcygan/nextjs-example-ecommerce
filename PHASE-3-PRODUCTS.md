# Phase 3: Product Catalog & Detail Pages

## Overview
Build the product browsing experience including the inventory grid, product cards, and detailed product pages with option selection. This phase creates the core shopping interface where users discover and select products.

## Tasks

### 3.1 Create Product Card Component
Create `/frontend/src/components/commerce/ProductCard.tsx`:
- Large product image with consistent aspect ratio
- Product name and price display
- "Quick Add" button (client-side)
- Hover effects (shadow, slight translate)
- Link to product detail page

### 3.2 Build Inventory Grid Page
Update `/frontend/src/app/page.tsx`:
- Server Component fetching from mockApi
- Responsive grid layout (1/2/3 columns)
- Loading skeleton grid
- Error state with retry
- Sort dropdown (UI only, non-functional)

### 3.3 Create Skeleton Components
Create `/frontend/src/components/ui/SkeletonGrid.tsx`:
- Product card skeleton
- Grid skeleton for loading state
- Shimmer animation effect
- Matches actual card dimensions

### 3.4 Implement Product Detail Page
Create `/frontend/src/app/product/[slug]/page.tsx`:
- Server Component for product data
- Dynamic routing with slug
- 404 handling for invalid slugs
- Metadata generation for SEO

### 3.5 Build Product Detail Layout
Create `/frontend/src/components/commerce/ProductDetail.tsx`:
- Two-column layout (image left, details right)
- Large product image gallery
- Product information section
- Client-side add-to-cart section

### 3.6 Create Option Picker Component
Create `/frontend/src/components/commerce/OptionPicker.tsx`:
- Radio buttons for single-select options
- Support for multiple option groups
- Visual feedback for selection
- Pass selected options to cart

### 3.7 Build Add to Cart Component
Create `/frontend/src/components/commerce/AddToCart.tsx`:
- Quantity selector
- Add to cart button
- Loading state during add
- Success toast notification
- Option validation

### 3.8 Create Price Display Component
Create `/frontend/src/components/commerce/Price.tsx`:
- Consistent price formatting
- Currency symbol placement
- Optional sale price display
- Responsive text sizing

### 3.9 Add Related Products Section
Create `/frontend/src/components/commerce/RelatedProducts.tsx`:
- Display 3-4 related items
- Horizontal scroll on mobile
- Exclude current product
- Reuse ProductCard component

### 3.10 Implement Quick Add Feature
Update ProductCard with quick add:
- Direct add for products without options
- Modal/drawer for products with options
- Optimistic UI updates
- Error handling for failures

## Deliverables
- [ ] Functional inventory grid with products
- [ ] Product detail pages with routing
- [ ] Option selection for configurable products
- [ ] Add to cart functionality
- [ ] Loading and error states
- [ ] Responsive layouts

## Validation Checklist
- [ ] Grid displays all seeded products
- [ ] Product images load with proper aspect ratio
- [ ] Click product navigates to detail page
- [ ] Options can be selected and added to cart
- [ ] Cart badge updates after adding items
- [ ] 404 page shows for invalid product slugs
- [ ] Loading skeletons appear during fetch

## Design Compliance
- [ ] Grid spacing matches design specs (gap-6)
- [ ] Card hover effects are subtle
- [ ] Typography hierarchy is consistent
- [ ] Color palette adheres to theme
- [ ] Images have ample negative space
- [ ] Buttons use proper variants

## Performance Checks
- [ ] Images are optimized (WebP format)
- [ ] Server Components used where possible
- [ ] Client Components minimized
- [ ] No layout shift during loading
- [ ] Smooth hover transitions

## Agent Coordination
- **design-guardian**: Validate all UI components against design.md
- **commerce-architect**: Review product data flow and cart integration
- **type-architect**: Ensure proper Server/Client Component boundaries

## Next Phase
With product browsing complete, proceed to PHASE-4-CHECKOUT.md for cart and checkout.
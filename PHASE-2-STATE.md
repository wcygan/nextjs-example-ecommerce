# Phase 2: State Management & Cart

## Overview
Implement cart state management using React Context and useReducer, with localStorage synchronization for persistence. This phase establishes the core shopping cart functionality that powers the entire purchase flow.

## Tasks

### 2.1 Create Cart Types and Actions
Define cart-specific types in `/frontend/src/types/cart.ts`:
- CartState interface
- CartAction union type (ADD, REMOVE, UPDATE_QTY, CLEAR)
- Cart totals calculation types

### 2.2 Implement Cart Reducer
Create `/frontend/src/store/cartReducer.ts`:
- Handle ADD action (check for existing items)
- Handle REMOVE action
- Handle UPDATE_QTY action
- Handle CLEAR action
- Calculate totals on each state change

### 2.3 Build CartProvider Component
Create `/frontend/src/store/cart.tsx`:
- React Context setup
- useReducer implementation
- localStorage sync (with throttling)
- Initial state hydration from localStorage
- Export CartContext

### 2.4 Create useCart Hook
Create `/frontend/src/hooks/useCart.ts`:
- Type-safe cart operations
- Calculated values (itemCount, subtotal)
- Helper methods (addItem, removeItem, updateQuantity, clearCart)
- Error handling for cart operations

### 2.5 Build Header Component
Create `/frontend/src/components/layout/Header.tsx`:
- Logo and navigation
- Cart badge with item count
- Responsive mobile menu
- Link to cart page
- Search icon (non-functional)

### 2.6 Create Cart Badge Component
Create `/frontend/src/components/commerce/CartBadge.tsx`:
- Display item count from useCart
- Animate on count change
- Hide when cart is empty
- Accessible label

### 2.7 Wire CartProvider in Layout
Update `/frontend/src/app/layout.tsx`:
- Wrap children with CartProvider
- Add Header component
- Ensure proper component hierarchy

### 2.8 Create Cart Line Item Component
Create `/frontend/src/components/commerce/CartLineItem.tsx`:
- Product image and details
- Quantity stepper
- Remove button
- Price display
- Selected options display

### 2.9 Build Quantity Stepper Component
Create `/frontend/src/components/ui/QuantityStepper.tsx`:
- Increment/decrement buttons
- Direct input field
- Min/max validation
- Accessible controls

### 2.10 Add Cart Persistence Tests
Create manual test checklist:
- Cart persists on page refresh
- Cart syncs across tabs
- Cart handles invalid localStorage data
- Cart recovers from corrupted state

## Deliverables
- [ ] CartProvider with full reducer logic
- [ ] useCart hook with typed operations
- [ ] Header with functional cart badge
- [ ] Cart persistence via localStorage
- [ ] Reusable cart components
- [ ] Proper error handling

## Validation Checklist
- [ ] Add items to cart and verify badge updates
- [ ] Refresh page and confirm cart persists
- [ ] Open new tab and verify cart syncs
- [ ] Remove all items and verify empty state
- [ ] Test quantity updates (increment/decrement)
- [ ] Verify TypeScript types are properly inferred

## Code Quality Checks
- [ ] No 'any' types in cart-related code
- [ ] Proper memoization for expensive calculations
- [ ] Clean separation of concerns
- [ ] Consistent naming conventions
- [ ] Error boundaries for cart operations

## Agent Coordination
- **type-architect**: Validate Context/Reducer TypeScript patterns
- **commerce-architect**: Review cart business logic and UX flows
- **design-guardian**: Ensure cart badge matches design specs

## Common Pitfalls to Avoid
- Don't forget to throttle localStorage writes
- Handle edge cases (negative quantities, invalid IDs)
- Ensure cart calculations use cents consistently
- Prevent duplicate items with same options
- Handle localStorage quota exceeded errors

## Next Phase
With cart state management complete, proceed to PHASE-3-PRODUCTS.md for product browsing.
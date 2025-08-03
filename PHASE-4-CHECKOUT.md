# Phase 4: Cart & Checkout Flow

## Overview
Complete the purchase flow by building the cart page, checkout form with validation, and order processing. This phase transforms browsing intent into completed orders through a streamlined checkout experience.

## Tasks

### 4.1 Build Cart Page Layout
Create `/frontend/src/app/cart/page.tsx`:
- Two-column layout (items left, summary right)
- Empty cart state with CTA
- Loading state during operations
- Responsive stacking on mobile

### 4.2 Create Cart Summary Component
Create `/frontend/src/components/commerce/CartSummary.tsx`:
- Subtotal calculation
- Shipping cost (flat rate)
- Total calculation
- Proceed to checkout button
- Free shipping threshold message

### 4.3 Enhance Cart Line Item Display
Update `/frontend/src/components/commerce/CartLineItem.tsx`:
- Product image with link
- Selected options display
- Inline quantity editing
- Remove confirmation
- Line total display

### 4.4 Build Checkout Page Structure
Create `/frontend/src/app/checkout/page.tsx`:
- Client Component for form handling
- Two-column layout
- Redirect if cart is empty
- Progress indicator

### 4.5 Create Checkout Form Schema
Create `/frontend/src/lib/validation/checkout.ts`:
- Zod schema for form fields
- Email validation
- Address validation
- Payment method enum
- Type inference

### 4.6 Build Contact Information Section
Create `/frontend/src/components/checkout/ContactSection.tsx`:
- Email input with validation
- Marketing consent checkbox
- Error display
- Auto-focus on mount

### 4.7 Create Shipping Address Form
Create `/frontend/src/components/checkout/ShippingSection.tsx`:
- First/Last name fields
- Address line 1 & 2
- City, State/Region, Postal Code
- Country selector
- Form field grouping

### 4.8 Implement Payment Options
Create `/frontend/src/components/checkout/PaymentSection.tsx`:
- Radio group for payment methods
- "Pay Now" option
- "4 Installments" option (UI only)
- Visual payment method cards
- Selection feedback

### 4.9 Build Order Summary Sidebar
Create `/frontend/src/components/checkout/OrderSummary.tsx`:
- Condensed cart display
- Shipping cost
- Tax line (if applicable)
- Total with emphasis
- Edit cart link

### 4.10 Handle Checkout Submission
Implement in checkout page:
- Form submission with loading state
- Call createOrder from mockApi
- Clear cart on success
- Handle API errors with retry
- Redirect to confirmation

### 4.11 Create Form Error Display
Create `/frontend/src/components/ui/FormError.tsx`:
- Inline field errors
- Summary error section
- Accessible error announcements
- Clear error styling

### 4.12 Add Loading States
Create `/frontend/src/components/ui/CheckoutSkeleton.tsx`:
- Form section skeletons
- Order summary skeleton
- Button loading states
- Prevent double submission

## Deliverables
- [ ] Complete cart page with management features
- [ ] Validated checkout form with all fields
- [ ] Order summary with calculations
- [ ] Payment method selection
- [ ] Successful order creation flow
- [ ] Proper error handling

## Validation Checklist
- [ ] Cart items can be modified and removed
- [ ] Empty cart shows appropriate message
- [ ] All form fields validate correctly
- [ ] Error messages are helpful and clear
- [ ] Form prevents submission with errors
- [ ] Successful checkout clears cart
- [ ] Order is created in mock API

## Form UX Requirements
- [ ] Tab order is logical
- [ ] Required fields are marked
- [ ] Errors appear on blur/submit
- [ ] Success feedback is clear
- [ ] Loading states prevent interaction
- [ ] Mobile keyboard types are correct

## Business Logic Checks
- [ ] Shipping calculation is consistent
- [ ] Free shipping threshold works
- [ ] Cart totals match order totals
- [ ] Empty cart redirects from checkout
- [ ] Payment methods display correctly

## Agent Coordination
- **commerce-architect**: Validate complete checkout flow and calculations
- **design-guardian**: Ensure form styling matches design system
- **type-architect**: Review form validation and type safety

## Common Issues to Address
- Prevent checkout with empty cart
- Handle browser back button properly
- Preserve form data on validation errors
- Clear sensitive data after submission
- Test with various cart configurations

## Next Phase
With checkout complete, proceed to PHASE-5-POLISH.md for confirmation and final polish.
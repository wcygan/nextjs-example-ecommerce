# Design System & UI Specification

Single source of truth for UI/UX decisions in this Next.js ecommerce prototype.

## Information Architecture

### Page List & Navigation Flow
1. **Inventory** (`/`) - Product grid with quick add-to-cart
2. **Product Detail** (`/product/[slug]`) - Images, options, description, add-to-cart
3. **Cart** (`/cart`) - Line items, quantities, remove, checkout CTA
4. **Checkout** (`/checkout`) - Contact + shipping form, payment options
5. **Order Confirmation** (`/order/[id]`) - Thank you, order details, continue shopping

### Header Navigation
- Logo (left)
- Nav links: Shop, About (center)
- Search icon (non-functional) + Cart badge with count (right)

## Color Palette & Design Tokens

### Primary Colors
- **Background**: `bg-white`, `bg-stone-50`
- **Text Primary**: `text-slate-900`
- **Text Secondary**: `text-slate-600`
- **Accent/CTA**: `emerald-500`, `hover:bg-emerald-600`
- **Borders**: `border-slate-200` (1px)
- **Shadows**: `shadow-sm`, `shadow-md`

### Typography Scale
- **Headings**: `text-2xl md:text-3xl font-medium` with wide letter-spacing
- **Product Names**: `text-lg md:text-xl font-medium`
- **Prices**: `font-semibold`
- **Body Text**: `text-base text-slate-600`
- **Font Family**: System UI / single variable font

## Spacing System (8pt Grid)

### Section Spacing
- **Page Sections**: `py-12` (48px)
- **Component Groups**: `gap-6` (24px)
- **Grid Layouts**: `gap-6` (24px)
- **Card Padding**: `p-6` (24px)
- **Button Padding**: `px-6 py-3` (24px/12px)

### Responsive Breakpoints
- **Mobile**: Default (≥360px)
- **Tablet**: `sm:` (≥640px)
- **Desktop**: `lg:` (≥1024px)

## Component Standards

### Buttons (shadcn/ui only)
```tsx
// Primary CTA
<Button className="rounded-2xl px-6 py-3">Add to cart</Button>

// Secondary
<Button variant="outline" className="rounded-2xl px-6 py-3">Continue shopping</Button>
```

### Product Cards
```tsx
// Structure: image → name → price → quick add
<div className="group hover:shadow-md hover:-translate-y-0.5 transition-all">
  <img className="aspect-[4/3] object-contain" />
  <h3 className="text-lg font-medium mt-4">{name}</h3>
  <p className="font-semibold">{price}</p>
  <Button className="w-full mt-3">Quick add</Button>
</div>
```

### Form Fields (React Hook Form + Zod + shadcn)
```tsx
// Standard pattern
<FormField
  control={form.control}
  name="email"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Email</FormLabel>
      <FormControl>
        <Input placeholder="your@email.com" {...field} />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>
```

### Loading States
- **Grid Loading**: `<Skeleton className="aspect-[4/3]" />` pattern
- **Button Loading**: Spinner + "Adding..." text
- **Page Loading**: Skeleton layouts matching final content

## Page-Specific Layouts

### Inventory Page (`/`)
```tsx
// Grid layout
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
  {products.map(product => <ProductCard key={product.id} />)}
</div>

// Sort dropdown (non-functional UI)
<Select>
  <SelectContent>
    <SelectItem value="featured">Featured</SelectItem>
    <SelectItem value="price-low">Price: Low to High</SelectItem>
  </SelectContent>
</Select>
```

### Product Detail Page (`/product/[slug]`)
```tsx
// Two-column layout
<div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
  {/* Left: Image */}
  <div className="aspect-[4/3]">
    <img className="w-full h-full object-contain" />
  </div>
  
  {/* Right: Details */}
  <div className="space-y-6">
    <h1 className="text-2xl md:text-3xl font-medium">{name}</h1>
    <p className="text-xl font-semibold">{price}</p>
    <OptionPicker options={product.options} />
    <QuantityStepper />
    <Button className="w-full rounded-2xl">Add to cart</Button>
  </div>
</div>

// Related products (horizontal scroll)
<div className="flex gap-6 overflow-x-auto">
  {related.map(item => <ProductCard key={item.id} className="min-w-64" />)}
</div>
```

### Cart Page (`/cart`)
```tsx
// Two-column: items + summary
<div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
  {/* Left: Line items (2/3) */}
  <div className="lg:col-span-2 space-y-4">
    {lines.map(line => <CartLineItem key={line.id} />)}
  </div>
  
  {/* Right: Summary (1/3) */}
  <div className="bg-stone-50 p-6 rounded-xl">
    <OrderSummary />
    <Button className="w-full rounded-2xl mt-6">Checkout</Button>
  </div>
</div>

// Free shipping banner
<div className="bg-emerald-50 border border-emerald-200 p-4 rounded-xl">
  Only $23.50 away from free shipping
</div>
```

### Checkout Page (`/checkout`)
```tsx
// Two-column: form + summary
<div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
  {/* Left: Contact + Address Form */}
  <div className="space-y-8">
    <section>
      <h2 className="text-xl font-medium mb-4">Contact</h2>
      <Input name="email" placeholder="Email" />
    </section>
    
    <section>
      <h2 className="text-xl font-medium mb-4">Shipping address</h2>
      <div className="grid grid-cols-2 gap-4">
        <Input name="firstName" placeholder="First name" />
        <Input name="lastName" placeholder="Last name" />
      </div>
    </section>
    
    <section>
      <h2 className="text-xl font-medium mb-4">Payment</h2>
      <RadioGroup>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="now" id="now" />
          <Label htmlFor="now">Pay now</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="installments" id="installments" />
          <Label htmlFor="installments">4 installments</Label>
        </div>
      </RadioGroup>
    </section>
  </div>
  
  {/* Right: Order Summary */}
  <div className="bg-stone-50 p-6 rounded-xl">
    <OrderSummary />
  </div>
</div>
```

### Order Confirmation (`/order/[id]`)
```tsx
// Centered layout
<div className="max-w-2xl mx-auto text-center space-y-8">
  <div>
    <h1 className="text-3xl font-medium mb-2">Thank you!</h1>
    <p className="text-slate-600">Your order #{orderNumber} has been confirmed</p>
    <p className="text-sm text-slate-500">A receipt has been sent to {email}</p>
  </div>
  
  <div className="bg-stone-50 p-6 rounded-xl text-left">
    <h3 className="font-medium mb-4">Shipping address</h3>
    <address className="not-italic text-slate-600">
      {/* formatted address */}
    </address>
  </div>
  
  <div className="space-y-4">
    {lines.map(line => <OrderLineItem key={line.id} />)}
  </div>
  
  <Button variant="outline" className="rounded-2xl">
    Continue shopping
  </Button>
</div>
```

## Interactive States

### Hover States
- **Product Cards**: `hover:shadow-md hover:-translate-y-0.5 transition-all`
- **Buttons**: Built into shadcn variants
- **Links**: `hover:text-emerald-600 transition-colors`

### Focus States
- **All Interactive Elements**: `focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2`
- **Form Inputs**: `focus:border-emerald-500 focus:ring-emerald-500`

### Loading States
- **Buttons**: Spinner + disabled state + "Loading..." text
- **Forms**: Disable all inputs during submission
- **Pages**: Skeleton components matching layout

### Error States
- **Form Fields**: Red border + error message below
- **API Errors**: Toast notification with retry button
- **Empty States**: Centered icon + message + CTA

## Accessibility Requirements

### WCAG AA Compliance
- **Color Contrast**: ≥4.5:1 for normal text, ≥3:1 for large text
- **Focus Indicators**: Visible focus rings on all interactive elements
- **Keyboard Navigation**: All functionality accessible via keyboard
- **Screen Readers**: Proper ARIA labels, alt text, semantic HTML

### Form Accessibility
- **Labels**: Every input has associated label
- **Error Messages**: `aria-invalid` and `aria-describedby`
- **Required Fields**: `aria-required="true"`
- **Button Labels**: Explicit text ("Add to cart", not "Add")

## Image Guidelines

### Product Images
- **Aspect Ratio**: 4:3 consistent across all products
- **Object Fit**: `object-contain` with light background
- **Format**: WebP for performance
- **Alt Text**: Product name + key features

### Responsive Images
- **Mobile**: Single column, full width
- **Tablet**: 2 columns
- **Desktop**: 3 columns

## Component Reuse Patterns

### Required shadcn/ui Components
- `Button` (primary/secondary/outline variants)
- `Input`, `Label`, `Textarea`
- `Form`, `FormField`, `FormItem`, `FormLabel`, `FormControl`, `FormMessage`
- `RadioGroup`, `RadioGroupItem`
- `Select`, `SelectContent`, `SelectItem`, `SelectTrigger`, `SelectValue`
- `Skeleton`
- `Separator`
- `Toast`, `useToast`

### Custom Components (Build These)
- `ProductCard` - Reusable product display
- `Price` - Currency formatting component
- `QuantityStepper` - Increment/decrement controls
- `OptionPicker` - Product variant selector
- `CartLineItem` - Cart row with image, details, controls
- `OrderSummary` - Subtotal, shipping, total breakdown
- `SkeletonGrid` - Loading state for product grids

## Definition of Done (UI Checklist)

Before marking any page complete, verify:

### Layout & Spacing
- [ ] 8pt grid spacing throughout
- [ ] Consistent use of `py-12` for sections
- [ ] Proper responsive breakpoints (mobile/tablet/desktop)
- [ ] No custom margins/padding outside design tokens

### Typography & Colors
- [ ] Only approved color tokens used
- [ ] Typography scales applied correctly
- [ ] WCAG AA contrast ratios met
- [ ] No arbitrary color values in code

### Interactive States
- [ ] Hover states on all interactive elements
- [ ] Focus rings visible and accessible
- [ ] Loading states implemented
- [ ] Error states styled and functional

### Component Usage
- [ ] Only shadcn/ui components used (no custom CSS unless absolutely necessary)
- [ ] Consistent button variants and sizes
- [ ] Form components properly integrated with React Hook Form + Zod

### Responsive Design
- [ ] Mobile-first approach (≥360px)
- [ ] Proper grid layouts at all breakpoints
- [ ] Touch targets ≥44px on mobile
- [ ] Horizontal scroll handled appropriately

### Accessibility
- [ ] Keyboard navigation functional
- [ ] Screen reader compatible
- [ ] Form labels and error messages proper
- [ ] Alt text on all images

This design system ensures consistency, maintainability, and a professional user experience across the entire ecommerce prototype.
import { Suspense } from "react";
import { listProducts } from "@/lib/mockApi";
import { ProductCard } from "@/components/commerce/ProductCard";
import { SkeletonGrid } from "@/components/ui/SkeletonGrid";
import { InventoryGrid } from "@/components/commerce/InventoryGrid";

export default async function Home() {
  const products = await listProducts();

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-medium text-slate-900 tracking-wide">
          All Products
        </h1>
        
        {/* Sort dropdown (non-functional) */}
        <div className="mt-4 flex justify-end">
          <select className="rounded-md border border-slate-200 px-4 py-2 text-sm focus:border-emerald-500 focus:ring-emerald-500">
            <option>Featured</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
            <option>Newest</option>
          </select>
        </div>
      </div>

      {/* Product Grid */}
      <Suspense fallback={<SkeletonGrid count={9} />}>
        <InventoryGrid products={products} />
      </Suspense>
    </div>
  );
}
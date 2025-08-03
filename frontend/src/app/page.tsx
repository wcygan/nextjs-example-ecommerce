import { Suspense } from "react";
import { listProducts } from "@/lib/mockApi";
import { SkeletonGrid } from "@/components/ui/SkeletonGrid";
import { InventoryPageClient } from "@/components/commerce/InventoryPageClient";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { TrustBadges } from "@/components/sections/TrustBadges";

export default async function Home() {
  const products = await listProducts();

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Suspense fallback={<SkeletonGrid count={9} />}>
        <InventoryPageClient products={products} />
      </Suspense>
      
      <TrustBadges />
      <TestimonialsSection />
    </div>
  );
}
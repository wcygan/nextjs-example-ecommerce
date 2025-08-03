import { Product } from "@/types";
import { RelatedProducts } from "./RelatedProducts";

interface CartRecommendationsProps {
  products: Product[];
}

export function CartRecommendations({ products }: CartRecommendationsProps) {
  // Get up to 4 random products as recommendations
  const recommendations = products
    .sort(() => Math.random() - 0.5)
    .slice(0, 4);

  return (
    <div className="border-t border-slate-200 pt-8 mt-8">
      <h2 className="text-xl font-medium mb-6">You might also like</h2>
      <RelatedProducts products={recommendations} />
    </div>
  );
}
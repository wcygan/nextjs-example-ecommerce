import { Product } from "@/types";
import { ProductCard } from "./ProductCard";

interface RelatedProductsProps {
  products: Product[];
}

export function RelatedProducts({ products }: RelatedProductsProps) {
  return (
    <div className="flex gap-6 overflow-x-auto pb-4">
      {products.map((product) => (
        <div key={product.id} className="min-w-[280px] flex-shrink-0">
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  );
}
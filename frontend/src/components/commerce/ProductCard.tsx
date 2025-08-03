import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types";
import { toMoney } from "@/lib/currency";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface ProductCardProps {
  product: Product;
  onQuickAdd?: (product: Product) => void;
}

export function ProductCard({ product, onQuickAdd }: ProductCardProps) {
  return (
    <div className="group hover:shadow-md hover:-translate-y-0.5 hover:scale-[1.02] transition-all duration-300 ease-out rounded-lg overflow-hidden">
      <Link href={`/product/${product.slug}`}>
        <div className="aspect-[4/3] relative bg-stone-50 overflow-hidden">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-contain p-4 transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
          {product.badge && (
            <div className="absolute top-2 right-2">
              <Badge type={product.badge.type} text={product.badge.text} />
            </div>
          )}
        </div>
      </Link>
      
      <div className="p-4 space-y-3">
        <Link href={`/product/${product.slug}`}>
          <h3 className="text-lg font-medium text-slate-900 hover:text-emerald-600 transition-colors duration-200">
            {product.name}
          </h3>
        </Link>
        
        <p className="font-semibold text-slate-900">
          {toMoney(product.price)}
        </p>
        
        {onQuickAdd && (
          <Button
            onClick={() => onQuickAdd(product)}
            className="w-full rounded-2xl transition-all duration-200 hover:scale-[1.02]"
          >
            Quick add
          </Button>
        )}
      </div>
    </div>
  );
}
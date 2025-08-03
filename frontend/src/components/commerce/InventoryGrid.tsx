"use client";

import { Product } from "@/types";
import { ProductCard } from "./ProductCard";
import { useCart } from "@/hooks/useCart";
import { useToast } from "@/components/ui/use-toast";

interface InventoryGridProps {
  products: Product[];
}

export function InventoryGrid({ products }: InventoryGridProps) {
  const { add } = useCart();
  const { toast } = useToast();

  const handleQuickAdd = (product: Product) => {
    // For products with options, we'd normally show a modal
    // For now, just add with default options
    add({
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.image,
      selectedOptions: product.options?.reduce((acc, option) => {
        acc[option.name] = option.values[0].label;
        return acc;
      }, {} as Record<string, string>),
    });

    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onQuickAdd={handleQuickAdd}
        />
      ))}
    </div>
  );
}
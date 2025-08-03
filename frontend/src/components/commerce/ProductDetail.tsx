"use client";

import { useState } from "react";
import { Product } from "@/types";
import { toMoney } from "@/lib/currency";
import { useCart } from "@/hooks/useCart";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { QuantityStepper } from "@/components/ui/QuantityStepper";
import { OptionPicker } from "./OptionPicker";
import { CustomersViewing } from "./CustomersViewing";

interface ProductDetailProps {
  product: Product;
}

export function ProductDetail({ product }: ProductDetailProps) {
  const [quantity, setQuantity] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});
  const { add } = useCart();
  const { toast } = useToast();

  // Initialize default options
  useState(() => {
    if (product.options) {
      const defaults = product.options.reduce((acc, option) => {
        acc[option.name] = option.values[0].label;
        return acc;
      }, {} as Record<string, string>);
      setSelectedOptions(defaults);
    }
  });

  const handleAddToCart = () => {
    add({
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity,
      image: product.image,
      selectedOptions: Object.keys(selectedOptions).length > 0 ? selectedOptions : undefined,
    });

    toast({
      title: "Added to cart",
      description: `${quantity} × ${product.name} has been added to your cart.`,
    });

    // Reset quantity after adding
    setQuantity(1);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-medium text-slate-900">
          {product.name}
        </h1>
        <p className="text-xl font-semibold mt-2">{toMoney(product.price)}</p>
        
        {/* Stock availability */}
        {product.stock !== undefined && (
          <div className="mt-3">
            {product.stock > 0 ? (
              <p className={`text-sm ${
                product.stock <= 5 
                  ? "text-orange-600 font-medium" 
                  : "text-emerald-600"
              }`}>
                {product.stock <= 5 
                  ? `Only ${product.stock} left in stock!` 
                  : "In stock"}
              </p>
            ) : (
              <p className="text-sm text-red-600 font-medium">Out of stock</p>
            )}
          </div>
        )}
        
        {/* Customers Viewing */}
        <CustomersViewing />
      </div>

      {product.options && (
        <OptionPicker
          options={product.options}
          selectedOptions={selectedOptions}
          onChange={setSelectedOptions}
        />
      )}

      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium text-slate-700 mb-2 block">
            Quantity
          </label>
          <QuantityStepper
            value={quantity}
            onChange={setQuantity}
            min={1}
            max={99}
          />
        </div>

        <Button
          onClick={handleAddToCart}
          className="w-full rounded-2xl py-3"
          size="lg"
          disabled={product.stock === 0}
        >
          {product.stock === 0 ? "Out of Stock" : "Add to cart"}
        </Button>
      </div>

      <div className="prose prose-slate max-w-none">
        <p className="text-slate-600">{product.description}</p>
        {product.sku && (
          <p className="text-sm text-slate-500 mt-4">SKU: {product.sku}</p>
        )}
      </div>
    </div>
  );
}
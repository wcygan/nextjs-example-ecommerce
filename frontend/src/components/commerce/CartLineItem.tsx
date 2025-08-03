"use client";

import Image from "next/image";
import Link from "next/link";
import { Trash2 } from "lucide-react";
import { CartLine } from "@/types";
import { toMoney } from "@/lib/currency";
import { useCart } from "@/hooks/useCart";
import { QuantityStepper } from "@/components/ui/QuantityStepper";
import { Button } from "@/components/ui/button";

interface CartLineItemProps {
  line: CartLine;
}

export function CartLineItem({ line }: CartLineItemProps) {
  const { remove, updateQuantity } = useCart();

  return (
    <div className="flex gap-4 py-4">
      {/* Image */}
      <div className="relative h-24 w-24 overflow-hidden rounded-md bg-slate-100">
        <Image
          src={line.image}
          alt={line.name}
          fill
          className="object-contain"
        />
      </div>

      {/* Details */}
      <div className="flex flex-1 flex-col">
        <div className="flex justify-between">
          <div>
            <Link
              href={`/product/${line.productId}`}
              className="font-medium hover:underline"
            >
              {line.name}
            </Link>
            {line.selectedOptions && (
              <div className="mt-1 text-sm text-slate-600">
                {Object.entries(line.selectedOptions).map(([optionName, value]) => (
                  <span key={optionName} className="mr-3">
                    {optionName}: {value}
                  </span>
                ))}
              </div>
            )}
          </div>
          <p className="font-semibold">{toMoney(line.price * line.quantity)}</p>
        </div>

        <div className="mt-2 flex items-center justify-between">
          <QuantityStepper
            value={line.quantity}
            onChange={(qty) => updateQuantity(line.id, qty)}
            min={1}
            max={99}
          />
          <Button
            variant="ghost"
            size="sm"
            onClick={() => remove(line.id)}
            className="text-slate-600 hover:text-red-600"
          >
            <Trash2 className="h-4 w-4" />
            <span className="sr-only">Remove item</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
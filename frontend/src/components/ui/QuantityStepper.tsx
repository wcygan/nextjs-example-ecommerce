"use client";

import { Minus, Plus } from "lucide-react";
import { Button } from "./button";

interface QuantityStepperProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
}

export function QuantityStepper({
  value,
  onChange,
  min = 1,
  max = 99,
}: QuantityStepperProps) {
  const handleIncrement = () => {
    if (value < max) {
      onChange(value + 1);
    }
  };

  const handleDecrement = () => {
    if (value > min) {
      onChange(value - 1);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value, 10);
    if (!isNaN(newValue) && newValue >= min && newValue <= max) {
      onChange(newValue);
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <Button
        type="button"
        variant="outline"
        size="icon"
        onClick={handleDecrement}
        disabled={value <= min}
        className="h-8 w-8"
      >
        <Minus className="h-3 w-3" />
        <span className="sr-only">Decrease quantity</span>
      </Button>
      
      <input
        type="number"
        value={value}
        onChange={handleInputChange}
        className="h-8 w-12 rounded-md border border-input bg-background px-2 text-center text-sm"
        min={min}
        max={max}
        aria-label="Quantity"
      />
      
      <Button
        type="button"
        variant="outline"
        size="icon"
        onClick={handleIncrement}
        disabled={value >= max}
        className="h-8 w-8"
      >
        <Plus className="h-3 w-3" />
        <span className="sr-only">Increase quantity</span>
      </Button>
    </div>
  );
}
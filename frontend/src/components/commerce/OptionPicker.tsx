"use client";

import { ProductOption } from "@/types";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface OptionPickerProps {
  options: ProductOption[];
  selectedOptions: Record<string, string>;
  onChange: (options: Record<string, string>) => void;
}

export function OptionPicker({
  options,
  selectedOptions,
  onChange,
}: OptionPickerProps) {
  const handleOptionChange = (optionName: string, value: string) => {
    onChange({
      ...selectedOptions,
      [optionName]: value,
    });
  };

  return (
    <div className="space-y-6">
      {options.map((option) => (
        <div key={option.id}>
          <h3 className="text-sm font-medium text-slate-700 mb-3">
            {option.name}
          </h3>
          <RadioGroup
            value={selectedOptions[option.name]}
            onValueChange={(value) => handleOptionChange(option.name, value)}
          >
            <div className="space-y-2">
              {option.values.map((value) => (
                <div key={value.id} className="flex items-center space-x-2">
                  <RadioGroupItem value={value.label} id={value.id} />
                  <Label htmlFor={value.id} className="cursor-pointer">
                    {value.label}
                  </Label>
                </div>
              ))}
            </div>
          </RadioGroup>
        </div>
      ))}
    </div>
  );
}
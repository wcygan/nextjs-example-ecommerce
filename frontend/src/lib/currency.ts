import { Money } from "@/types";

export const toMoney = (cents: Money): string => {
  return (cents / 100).toLocaleString(undefined, {
    style: "currency",
    currency: "USD",
  });
};

export const fromMoney = (value: string): Money => {
  const number = parseFloat(value.replace(/[^0-9.-]+/g, ""));
  return Math.round(number * 100);
};
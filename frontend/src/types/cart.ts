import { CartLine, Money } from "./index";

export interface CartState {
  lines: CartLine[];
  subtotal: Money;
  itemCount: number;
}

export type CartAction =
  | { type: "ADD"; line: CartLine }
  | { type: "REMOVE"; id: string }
  | { type: "UPDATE_QTY"; id: string; quantity: number }
  | { type: "CLEAR" }
  | { type: "HYDRATE"; state: CartState };
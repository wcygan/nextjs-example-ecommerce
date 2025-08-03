import { CartLine, Money } from "./index";

export interface CartState {
  lines: CartLine[];
  savedItems: CartLine[];
  subtotal: Money;
  itemCount: number;
}

export type CartAction =
  | { type: "ADD"; line: CartLine }
  | { type: "REMOVE"; id: string }
  | { type: "UPDATE_QTY"; id: string; quantity: number }
  | { type: "CLEAR" }
  | { type: "HYDRATE"; state: CartState }
  | { type: "SAVE_FOR_LATER"; id: string }
  | { type: "MOVE_TO_CART"; id: string }
  | { type: "REMOVE_SAVED"; id: string };
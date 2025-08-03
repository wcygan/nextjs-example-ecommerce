import { CartState, CartAction } from "@/types/cart";
import { CartLine } from "@/types";

export const initialCartState: CartState = {
  lines: [],
  savedItems: [],
  subtotal: 0,
  itemCount: 0,
};

function calculateTotals(lines: CartLine[]): { subtotal: number; itemCount: number } {
  const subtotal = lines.reduce((sum, line) => sum + line.price * line.quantity, 0);
  const itemCount = lines.reduce((sum, line) => sum + line.quantity, 0);
  return { subtotal, itemCount };
}

export function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD": {
      // Check if item with same options already exists
      const existingLineIndex = state.lines.findIndex(
        (line) =>
          line.productId === action.line.productId &&
          JSON.stringify(line.selectedOptions) === JSON.stringify(action.line.selectedOptions)
      );

      let newLines: CartLine[];
      if (existingLineIndex >= 0) {
        // Update quantity of existing line
        newLines = state.lines.map((line, index) =>
          index === existingLineIndex
            ? { ...line, quantity: line.quantity + action.line.quantity }
            : line
        );
      } else {
        // Add new line
        newLines = [...state.lines, action.line];
      }

      const { subtotal, itemCount } = calculateTotals(newLines);
      return { ...state, lines: newLines, subtotal, itemCount };
    }

    case "REMOVE": {
      const newLines = state.lines.filter((line) => line.id !== action.id);
      const { subtotal, itemCount } = calculateTotals(newLines);
      return { ...state, lines: newLines, subtotal, itemCount };
    }

    case "UPDATE_QTY": {
      if (action.quantity <= 0) {
        // Remove item if quantity is 0 or negative
        return cartReducer(state, { type: "REMOVE", id: action.id });
      }

      const newLines = state.lines.map((line) =>
        line.id === action.id ? { ...line, quantity: action.quantity } : line
      );
      const { subtotal, itemCount } = calculateTotals(newLines);
      return { ...state, lines: newLines, subtotal, itemCount };
    }

    case "CLEAR": {
      return { ...initialCartState, savedItems: state.savedItems };
    }

    case "HYDRATE": {
      return action.state;
    }

    case "SAVE_FOR_LATER": {
      const lineToSave = state.lines.find((line) => line.id === action.id);
      if (!lineToSave) return state;

      const newLines = state.lines.filter((line) => line.id !== action.id);
      const newSavedItems = [...state.savedItems, lineToSave];
      const { subtotal, itemCount } = calculateTotals(newLines);

      return {
        lines: newLines,
        savedItems: newSavedItems,
        subtotal,
        itemCount,
      };
    }

    case "MOVE_TO_CART": {
      const savedItem = state.savedItems.find((item) => item.id === action.id);
      if (!savedItem) return state;

      const newSavedItems = state.savedItems.filter((item) => item.id !== action.id);
      const newLines = [...state.lines, savedItem];
      const { subtotal, itemCount } = calculateTotals(newLines);

      return {
        lines: newLines,
        savedItems: newSavedItems,
        subtotal,
        itemCount,
      };
    }

    case "REMOVE_SAVED": {
      const newSavedItems = state.savedItems.filter((item) => item.id !== action.id);
      return { ...state, savedItems: newSavedItems };
    }

    default:
      return state;
  }
}
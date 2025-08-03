"use client";

import React, { createContext, useReducer, useEffect, useCallback, useRef } from "react";
import { CartState, CartAction } from "@/types/cart";
import { CartLine } from "@/types";
import { cartReducer, initialCartState } from "./cartReducer";

interface CartContextValue extends CartState {
  add: (line: Omit<CartLine, "id">) => void;
  remove: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clear: () => void;
}

export const CartContext = createContext<CartContextValue | null>(null);

const CART_STORAGE_KEY = "cart";
const STORAGE_THROTTLE_MS = 1000;

interface CartProviderProps {
  children: React.ReactNode;
}

export function CartProvider({ children }: CartProviderProps) {
  const [state, dispatch] = useReducer(cartReducer, initialCartState);
  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Hydrate from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as CartState;
        if (parsed.lines && Array.isArray(parsed.lines)) {
          dispatch({ type: "HYDRATE", state: parsed });
        }
      }
    } catch (error) {
      console.error("Failed to load cart from storage:", error);
    }
  }, []);

  // Save to localStorage (throttled)
  useEffect(() => {
    // Clear any existing timeout
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }

    // Set new timeout
    saveTimeoutRef.current = setTimeout(() => {
      try {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(state));
      } catch (error) {
        console.error("Failed to save cart to storage:", error);
      }
    }, STORAGE_THROTTLE_MS);

    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, [state]);

  const add = useCallback((line: Omit<CartLine, "id">) => {
    const id = crypto.randomUUID();
    dispatch({ type: "ADD", line: { ...line, id } });
  }, []);

  const remove = useCallback((id: string) => {
    dispatch({ type: "REMOVE", id });
  }, []);

  const updateQuantity = useCallback((id: string, quantity: number) => {
    dispatch({ type: "UPDATE_QTY", id, quantity });
  }, []);

  const clear = useCallback(() => {
    dispatch({ type: "CLEAR" });
  }, []);

  const value: CartContextValue = {
    ...state,
    add,
    remove,
    updateQuantity,
    clear,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { products } from "@/lib/products";

export type CartItem = {
  productId: string;
  size: string;
  color: string;
  quantity: number;
};

type CommerceContextValue = {
  cart: CartItem[];
  wishlist: string[];
  addToCart: (item: CartItem) => void;
  updateQuantity: (index: number, quantity: number) => void;
  removeFromCart: (index: number) => void;
  clearCart: () => void;
  toggleWishlist: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;
  removeWishlist: (productId: string) => void;
  subtotal: number;
  count: number;
};

const CommerceContext = createContext<CommerceContextValue | null>(null);

function readStorage<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const value = window.localStorage.getItem(key);
    return value ? (JSON.parse(value) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function CommerceProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setCart(readStorage("noire-cart", []));
    setWishlist(readStorage("noire-wishlist", []));
    setReady(true);
  }, []);

  useEffect(() => {
    if (ready) window.localStorage.setItem("noire-cart", JSON.stringify(cart));
  }, [cart, ready]);

  useEffect(() => {
    if (ready) window.localStorage.setItem("noire-wishlist", JSON.stringify(wishlist));
  }, [wishlist, ready]);

  const subtotal = useMemo(
    () =>
      cart.reduce((sum, item) => {
        const product = products.find((candidate) => candidate.id === item.productId);
        return sum + (product?.price ?? 0) * item.quantity;
      }, 0),
    [cart]
  );

  const value = useMemo<CommerceContextValue>(
    () => ({
      cart,
      wishlist,
      subtotal,
      count: cart.reduce((sum, item) => sum + item.quantity, 0),
      addToCart: (item) =>
        setCart((current) => {
          const existing = current.findIndex(
            (entry) => entry.productId === item.productId && entry.size === item.size && entry.color === item.color
          );
          if (existing >= 0) {
            return current.map((entry, index) =>
              index === existing ? { ...entry, quantity: entry.quantity + item.quantity } : entry
            );
          }
          return [...current, item];
        }),
      updateQuantity: (index, quantity) =>
        setCart((current) => current.map((entry, entryIndex) => (entryIndex === index ? { ...entry, quantity } : entry))),
      removeFromCart: (index) => setCart((current) => current.filter((_, entryIndex) => entryIndex !== index)),
      clearCart: () => setCart([]),
      toggleWishlist: (productId) =>
        setWishlist((current) =>
          current.includes(productId) ? current.filter((id) => id !== productId) : [...current, productId]
        ),
      isWishlisted: (productId) => wishlist.includes(productId),
      removeWishlist: (productId) => setWishlist((current) => current.filter((id) => id !== productId))
    }),
    [cart, subtotal, wishlist]
  );

  return <CommerceContext.Provider value={value}>{children}</CommerceContext.Provider>;
}

export function useCommerce() {
  const context = useContext(CommerceContext);
  if (!context) throw new Error("useCommerce must be used within CommerceProvider");
  return context;
}

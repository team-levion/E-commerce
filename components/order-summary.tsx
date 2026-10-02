"use client";

import { products, money } from "@/lib/products";
import { useCommerce } from "@/lib/use-commerce";

export function OrderSummary() {
  const { cart, subtotal } = useCommerce();
  const shipping = subtotal > 9999 || subtotal === 0 ? 0 : 199;

  return (
    <aside className="border border-ink/10 bg-porcelain p-6">
      <h2 className="font-serif text-3xl">Order Summary</h2>
      <div className="mt-6 grid gap-4">
        {cart.map((item, index) => {
          const product = products.find((entry) => entry.id === item.productId);
          if (!product) return null;
          return (
            <div key={`${item.productId}-${index}`} className="flex justify-between gap-4 text-sm">
              <span>{product.name} <span className="text-stone">x{item.quantity}</span></span>
              <span>{money(product.price * item.quantity)}</span>
            </div>
          );
        })}
      </div>
      <div className="mt-6 grid gap-3 border-t border-ink/10 pt-5 text-sm">
        <div className="flex justify-between"><span>Subtotal</span><span>{money(subtotal)}</span></div>
        <div className="flex justify-between"><span>Shipping</span><span>{shipping ? money(shipping) : "Complimentary"}</span></div>
        <div className="flex justify-between text-base font-semibold"><span>Total</span><span>{money(subtotal + shipping)}</span></div>
      </div>
    </aside>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";
import { LinkButton } from "@/components/button";
import { OrderSummary } from "@/components/order-summary";
import { money, products } from "@/lib/products";
import { useCommerce } from "@/lib/use-commerce";

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart } = useCommerce();

  return (
    <section className="section py-12">
      <p className="eyebrow">Bag</p>
      <h1 className="mt-3 font-serif text-6xl">Shopping Cart</h1>
      {cart.length === 0 ? (
        <div className="mt-10 border border-ink/10 bg-porcelain p-10">
          <p className="text-stone">Your cart is empty.</p>
          <LinkButton href="/shop" className="mt-6">Continue Shopping</LinkButton>
        </div>
      ) : (
        <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_380px]">
          <div className="grid gap-4">
            {cart.map((item, index) => {
              const product = products.find((entry) => entry.id === item.productId);
              if (!product) return null;
              return (
                <div key={`${item.productId}-${index}`} className="grid gap-5 border border-ink/10 bg-porcelain p-4 sm:grid-cols-[130px_1fr_auto]">
                  <Link href={`/product/${product.slug}`} className="relative aspect-square overflow-hidden bg-bone">
                    <Image src={product.images[0]} alt={product.name} fill className="object-cover" />
                  </Link>
                  <div>
                    <Link href={`/product/${product.slug}`} className="font-medium">{product.name}</Link>
                    <p className="mt-1 text-sm text-stone">{item.color} / {item.size}</p>
                    <p className="mt-4">{money(product.price)}</p>
                  </div>
                  <div className="flex items-center gap-3 sm:justify-end">
                    <button onClick={() => updateQuantity(index, Math.max(1, item.quantity - 1))} className="grid h-10 w-10 place-items-center border border-ink/10"><Minus size={15} /></button>
                    <span className="w-7 text-center">{item.quantity}</span>
                    <button onClick={() => updateQuantity(index, item.quantity + 1)} className="grid h-10 w-10 place-items-center border border-ink/10"><Plus size={15} /></button>
                    <button onClick={() => removeFromCart(index)} className="grid h-10 w-10 place-items-center border border-ink/10" aria-label="Remove"><Trash2 size={16} /></button>
                  </div>
                </div>
              );
            })}
          </div>
          <div>
            <OrderSummary />
            <LinkButton href="/checkout" className="mt-4 w-full">Proceed to Checkout</LinkButton>
          </div>
        </div>
      )}
    </section>
  );
}

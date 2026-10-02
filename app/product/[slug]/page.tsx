"use client";

import Image from "next/image";
import { notFound } from "next/navigation";
import { Heart, Minus, Plus } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/button";
import { ProductGrid } from "@/components/product-grid";
import { money } from "@/lib/products";
import { useCommerce } from "@/lib/use-commerce";
import { useProducts, useProduct } from "@/lib/use-products";

export default function ProductPage({ params }: { params: { slug: string } }) {
  const { product } = useProduct(params.slug);
  const { products } = useProducts();
  const { addToCart, toggleWishlist, isWishlisted } = useCommerce();
  const [size, setSize] = useState(product?.sizes[0] ?? "");
  const [color, setColor] = useState(product?.colors[0] ?? "");
  const [quantity, setQuantity] = useState(1);

  if (!product) notFound();

  const related = products.filter((entry) => entry.category === product.category && entry.id !== product.id).slice(0, 4);

  return (
    <section className="section py-12">
      <div className="grid gap-10 lg:grid-cols-[1.08fr_0.92fr]">
        <div className="relative aspect-[4/5] overflow-hidden bg-porcelain">
          <Image src={product.images[0]} alt={product.name} fill priority className="object-cover" />
        </div>
        <div className="lg:pl-8">
          <p className="eyebrow">{product.category}</p>
          <h1 className="mt-4 font-serif text-6xl leading-none">{product.name}</h1>
          <p className="mt-5 text-xl">{money(product.price)}</p>
          <p className="mt-6 max-w-xl leading-7 text-stone">{product.description}</p>

          <div className="mt-8">
            <p className="text-xs font-semibold uppercase tracking-[0.18em]">Color</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {product.colors.map((entry) => (
                <button key={entry} onClick={() => setColor(entry)} className={`border px-4 py-2 text-sm ${color === entry ? "border-ink bg-ink text-porcelain" : "border-ink/10 bg-porcelain"}`}>{entry}</button>
              ))}
            </div>
          </div>

          <div className="mt-7">
            <p className="text-xs font-semibold uppercase tracking-[0.18em]">Size</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {product.sizes.map((entry) => (
                <button key={entry} onClick={() => setSize(entry)} className={`min-w-12 border px-4 py-2 text-sm ${size === entry ? "border-ink bg-ink text-porcelain" : "border-ink/10 bg-porcelain"}`}>{entry}</button>
              ))}
            </div>
          </div>

          <div className="mt-7 flex items-center gap-3">
            <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="grid h-11 w-11 place-items-center border border-ink/10 bg-porcelain"><Minus size={16} /></button>
            <span className="w-8 text-center">{quantity}</span>
            <button onClick={() => setQuantity(quantity + 1)} className="grid h-11 w-11 place-items-center border border-ink/10 bg-porcelain"><Plus size={16} /></button>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button onClick={() => addToCart({ productId: product.id, size, color, quantity })} className="flex-1">Add to Cart</Button>
            <button onClick={() => toggleWishlist(product.id)} className="inline-flex items-center justify-center gap-2 border border-ink px-6 py-3 text-xs font-semibold uppercase tracking-[0.18em] transition hover:bg-ink hover:text-porcelain">
              <Heart size={18} fill={isWishlisted(product.id) ? "currentColor" : "none"} /> Wishlist
            </button>
          </div>

          <div className="mt-10 grid gap-5 border-t border-ink/10 pt-8">
            <div><h2 className="font-medium">Product Details</h2><ul className="mt-3 grid gap-2 text-sm text-stone">{product.details.map((detail) => <li key={detail}>{detail}</li>)}</ul></div>
            <div><h2 className="font-medium">Shipping & Returns</h2><p className="mt-3 text-sm leading-6 text-stone">Complimentary shipping over $250. Returns accepted within 14 days on unworn pieces with original tags.</p></div>
          </div>
        </div>
      </div>
      {related.length > 0 && (
        <div className="mt-20">
          <p className="eyebrow">Related Products</p>
          <h2 className="mt-3 font-serif text-5xl">Complete the edit</h2>
          <div className="mt-8"><ProductGrid products={related} /></div>
        </div>
      )}
    </section>
  );
}

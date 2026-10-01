"use client";

import Image from "next/image";
import Link from "next/link";
import { Trash2 } from "lucide-react";
import { Button, LinkButton } from "@/components/button";
import { money, products } from "@/lib/products";
import { useCommerce } from "@/lib/use-commerce";

export default function WishlistPage() {
  const { wishlist, removeWishlist, addToCart } = useCommerce();
  const items = products.filter((product) => wishlist.includes(product.id));

  return (
    <section className="section py-12">
      <p className="eyebrow">Saved</p>
      <h1 className="mt-3 font-serif text-6xl">Wishlist</h1>
      {items.length === 0 ? (
        <div className="mt-10 border border-ink/10 bg-porcelain p-10">
          <p className="text-stone">Your wishlist is empty.</p>
          <LinkButton href="/shop" className="mt-6">Explore Products</LinkButton>
        </div>
      ) : (
        <div className="mt-10 grid gap-5">
          {items.map((product) => (
            <div key={product.id} className="grid gap-5 border border-ink/10 bg-porcelain p-4 sm:grid-cols-[130px_1fr_auto] sm:items-center">
              <Link href={`/product/${product.slug}`} className="relative aspect-square overflow-hidden bg-bone">
                <Image src={product.images[0]} alt={product.name} fill className="object-cover" />
              </Link>
              <div>
                <Link href={`/product/${product.slug}`} className="font-medium">{product.name}</Link>
                <p className="mt-1 text-sm text-stone">{product.category}</p>
                <p className="mt-3">{money(product.price)}</p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button onClick={() => addToCart({ productId: product.id, size: product.sizes[0], color: product.colors[0], quantity: 1 })}>Add to Cart</Button>
                <button onClick={() => removeWishlist(product.id)} className="grid h-12 w-12 place-items-center border border-ink/10 hover:border-ink" aria-label="Remove">
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

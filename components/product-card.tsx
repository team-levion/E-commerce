"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";
import { money, Product } from "@/lib/products";
import { useCommerce } from "@/lib/use-commerce";

export function ProductCard({ product }: { product: Product }) {
  const { toggleWishlist, isWishlisted } = useCommerce();
  const wished = isWishlisted(product.id);

  return (
    <article className="group">
      <div className="relative aspect-[4/5] overflow-hidden bg-porcelain">
        <Link href={`/product/${product.slug}`}>
          <Image src={product.images[0]} alt={product.name} fill sizes="(min-width: 1024px) 25vw, 50vw" className="object-cover transition duration-700 group-hover:scale-105" />
        </Link>
        <button
          aria-label="Toggle wishlist"
          onClick={() => toggleWishlist(product.id)}
          className="absolute right-3 top-3 grid h-10 w-10 place-items-center bg-porcelain/90 transition hover:bg-ink hover:text-porcelain"
        >
          <Heart size={18} fill={wished ? "currentColor" : "none"} />
        </button>
      </div>
      <Link href={`/product/${product.slug}`} className="mt-4 block">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="font-medium">{product.name}</h3>
            <p className="mt-1 text-sm text-stone">{product.category}</p>
          </div>
          <p className="text-sm">{money(product.price)}</p>
        </div>
      </Link>
    </article>
  );
}

"use client";

import { useEffect, useState } from "react";
import { products as fallbackProducts, Product } from "@/lib/products";

export function useProducts() {
  const [products, setProducts] = useState<Product[]>(fallbackProducts);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    fetch("/api/products")
      .then((response) => response.json())
      .then((payload: { products?: Product[] }) => {
        if (active && payload.products?.length) setProducts(payload.products);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  return { products, loading };
}

export function useProduct(slug: string) {
  const [product, setProduct] = useState<Product | null>(fallbackProducts.find((entry) => entry.slug === slug) ?? null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    fetch(`/api/products/${slug}`)
      .then((response) => (response.ok ? response.json() : null))
      .then((payload: { product?: Product } | null) => {
        if (active && payload?.product) setProduct(payload.product);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [slug]);

  return { product, loading };
}

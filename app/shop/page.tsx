"use client";

import { Suspense, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { ProductGrid } from "@/components/product-grid";
import { categories } from "@/lib/products";
import { useProducts } from "@/lib/use-products";

function ShopContent() {
  const params = useSearchParams();
  const { products, loading } = useProducts();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [maxPrice, setMaxPrice] = useState("12000");
  const [sort, setSort] = useState(params.get("sort") ?? "featured");
  const audience = params.get("audience");

  const filtered = useMemo(() => {
    const normalized = query.toLowerCase();
    return products
      .filter((product) => !audience || product.audience === audience)
      .filter((product) => category === "All" || product.category === category)
      .filter((product) => product.price <= Number(maxPrice))
      .filter((product) => `${product.name} ${product.category}`.toLowerCase().includes(normalized))
      .sort((a, b) => {
        if (sort === "price-low") return a.price - b.price;
        if (sort === "price-high") return b.price - a.price;
        if (sort === "new") return b.id.localeCompare(a.id);
        return Number(b.featured) - Number(a.featured);
      });
  }, [audience, category, maxPrice, products, query, sort]);

  return (
    <section className="section py-12">
      <div className="flex flex-col justify-between gap-4 border-b border-ink/10 pb-8 md:flex-row md:items-end">
        <div>
          <p className="eyebrow">Shop</p>
          <h1 className="mt-3 font-serif text-6xl">{audience ?? "Collection"}</h1>
        </div>
        <p className="text-sm text-stone">{loading ? "Loading products" : `${filtered.length} products`}</p>
      </div>
      <div className="grid gap-3 py-8 md:grid-cols-4">
        <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search" className="h-12 border border-ink/10 bg-porcelain px-4 outline-none focus:border-ink" />
        <select value={category} onChange={(event) => setCategory(event.target.value)} className="h-12 border border-ink/10 bg-porcelain px-4 outline-none">
          {categories.map((entry) => <option key={entry}>{entry}</option>)}
        </select>
        <select value={maxPrice} onChange={(event) => setMaxPrice(event.target.value)} className="h-12 border border-ink/10 bg-porcelain px-4 outline-none">
          <option value="3000">Under ₹3,000</option>
          <option value="6000">Under ₹6,000</option>
          <option value="12000">All prices</option>
        </select>
        <select value={sort} onChange={(event) => setSort(event.target.value)} className="h-12 border border-ink/10 bg-porcelain px-4 outline-none">
          <option value="featured">Featured</option>
          <option value="new">Newest</option>
          <option value="price-low">Price low to high</option>
          <option value="price-high">Price high to low</option>
        </select>
      </div>
      <ProductGrid products={filtered} />
    </section>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<section className="section py-12"><p className="eyebrow">Shop</p><h1 className="mt-3 font-serif text-6xl">Collection</h1></section>}>
      <ShopContent />
    </Suspense>
  );
}

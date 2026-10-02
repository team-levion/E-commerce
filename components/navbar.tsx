"use client";

import Link from "next/link";
import { Heart, Menu, Search, ShoppingBag, User, X } from "lucide-react";
import { useState } from "react";
import { useCommerce } from "@/lib/use-commerce";

const nav = [
  ["New Arrivals", "/shop?sort=new"],
  ["Men", "/shop?audience=Men"],
  ["Women", "/shop?audience=Women"],
  ["Collections", "/shop"]
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const { count, wishlist } = useCommerce();

  return (
    <header className="sticky top-0 z-50 border-b border-ink/10 bg-bone/90 backdrop-blur">
      <div className="section flex h-20 items-center justify-between">
        <Link href="/" className="font-serif text-3xl tracking-[0.18em]">NOIRE</Link>
        <nav className="hidden items-center gap-8 text-sm uppercase tracking-[0.16em] lg:flex">
          {nav.map(([label, href]) => (
            <Link key={label} href={href} className="hover:text-stone">{label}</Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Link href="/shop" aria-label="Search" className="p-2 hover:text-stone"><Search size={19} /></Link>
          <Link href="/login" aria-label="Account" className="p-2 hover:text-stone"><User size={19} /></Link>
          <Link href="/wishlist" aria-label="Wishlist" className="relative p-2 hover:text-stone">
            <Heart size={19} />
            {wishlist.length > 0 && <span className="absolute right-0 top-0 h-4 min-w-4 rounded-full bg-ink px-1 text-center text-[10px] text-porcelain">{wishlist.length}</span>}
          </Link>
          <Link href="/cart" aria-label="Cart" className="relative p-2 hover:text-stone">
            <ShoppingBag size={19} />
            {count > 0 && <span className="absolute right-0 top-0 h-4 min-w-4 rounded-full bg-ink px-1 text-center text-[10px] text-porcelain">{count}</span>}
          </Link>
          <button className="p-2 lg:hidden" onClick={() => setOpen((value) => !value)} aria-label="Menu">
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>
      {open && (
        <nav className="section grid gap-5 border-t border-ink/10 py-6 text-sm uppercase tracking-[0.18em] lg:hidden">
          {nav.map(([label, href]) => (
            <Link key={label} href={href} onClick={() => setOpen(false)}>{label}</Link>
          ))}
        </nav>
      )}
    </header>
  );
}

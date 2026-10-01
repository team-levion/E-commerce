import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { LinkButton } from "@/components/button";
import { ProductGrid } from "@/components/product-grid";
import { products } from "@/lib/products";

const categoryCards = [
  { title: "Men", href: "/shop?audience=Men", image: "https://images.unsplash.com/photo-1492447166138-50c3889fccb1?auto=format&fit=crop&w=1000&q=85" },
  { title: "Women", href: "/shop?audience=Women", image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=1000&q=85" },
  { title: "Accessories", href: "/shop?audience=Accessories", image: "https://images.unsplash.com/photo-1523779105320-d1cd346ff52b?auto=format&fit=crop&w=1000&q=85" }
];

export default function Home() {
  return (
    <>
      <section className="section grid min-h-[78vh] items-center gap-10 py-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="eyebrow">The New Collection</p>
          <h1 className="mt-6 font-serif text-6xl leading-[0.95] md:text-8xl">Modern essentials, designed for every day.</h1>
          <p className="mt-6 max-w-md text-lg leading-8 text-stone">Designed for everyday. Made to stand apart.</p>
          <LinkButton href="/shop" className="mt-8">Shop Collection</LinkButton>
        </div>
        <div className="relative min-h-[440px] overflow-hidden bg-porcelain lg:min-h-[660px]">
          <Image src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1400&q=85" alt="NOIRE editorial fashion" fill priority className="object-cover" />
        </div>
      </section>

      <section className="section py-12">
        <p className="eyebrow">Shop by Category</p>
        <div className="mt-6 grid gap-5 md:grid-cols-3">
          {categoryCards.map((card) => (
            <Link key={card.title} href={card.href} className="group relative min-h-[360px] overflow-hidden bg-porcelain">
              <Image src={card.image} alt={card.title} fill className="object-cover transition duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/45 to-transparent" />
              <div className="absolute bottom-6 left-6 flex items-center gap-3 text-porcelain">
                <span className="font-serif text-4xl">{card.title}</span><ArrowRight size={22} />
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="section py-14">
        <div className="mb-7 flex items-end justify-between gap-4">
          <div><p className="eyebrow">New Arrivals</p><h2 className="mt-3 font-serif text-5xl">Fresh restraint</h2></div>
          <Link href="/shop" className="hidden text-sm uppercase tracking-[0.18em] underline underline-offset-8 md:block">View All</Link>
        </div>
        <ProductGrid products={products.filter((product) => product.featured).slice(0, 4)} />
      </section>

      <section className="section grid items-center gap-8 py-16 lg:grid-cols-2">
        <div className="relative min-h-[520px] overflow-hidden bg-porcelain">
          <Image src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1300&q=85" alt="Editorial essentials" fill className="object-cover" />
        </div>
        <div className="lg:px-12">
          <p className="eyebrow">Editorial</p>
          <h2 className="mt-5 font-serif text-6xl leading-none">Less noise. Better essentials.</h2>
          <p className="mt-6 max-w-md leading-7 text-stone">A studied wardrobe of texture, proportion, and quiet confidence.</p>
          <LinkButton href="/shop" className="mt-8">Explore Best Sellers</LinkButton>
        </div>
      </section>

      <section className="section py-14">
        <div className="mb-7"><p className="eyebrow">Best Sellers</p><h2 className="mt-3 font-serif text-5xl">Most considered</h2></div>
        <ProductGrid products={products.filter((product) => product.bestSeller).slice(0, 4)} />
      </section>

      <section className="section py-16">
        <div className="border-y border-ink/10 py-12 text-center">
          <p className="eyebrow">Newsletter</p>
          <h2 className="mt-4 font-serif text-5xl">Notes on better dressing</h2>
          <div className="mx-auto mt-7 flex max-w-xl flex-col gap-3 sm:flex-row">
            <input className="min-h-12 flex-1 border border-ink/10 bg-porcelain px-4 outline-none focus:border-ink" placeholder="Email address" />
            <button className="border border-ink bg-ink px-6 text-xs font-semibold uppercase tracking-[0.18em] text-porcelain transition hover:bg-transparent hover:text-ink">Subscribe</button>
          </div>
        </div>
      </section>
    </>
  );
}

import Link from "next/link";

export function Footer() {
  const columns = {
    Shop: ["New Arrivals", "Men", "Women", "Accessories"],
    About: ["Our Studio", "Materials", "Journal", "Levion"],
    "Customer Care": ["Shipping", "Returns", "Sizing", "Contact"],
    Social: ["Instagram", "Pinterest", "LinkedIn", "X"]
  };

  return (
    <footer className="mt-20 border-t border-ink/10 bg-porcelain">
      <div className="section grid gap-10 py-14 md:grid-cols-[1.2fr_2fr]">
        <div>
          <div className="font-serif text-3xl tracking-[0.18em]">NOIRE</div>
          <p className="mt-4 max-w-sm text-sm leading-6 text-stone">Designed for everyday. Made to stand apart.</p>
        </div>
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {Object.entries(columns).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-xs font-semibold uppercase tracking-[0.2em]">{title}</h3>
              <div className="mt-4 grid gap-3 text-sm text-stone">
                {links.map((link) => <Link key={link} href="/shop" className="hover:text-ink">{link}</Link>)}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="section border-t border-ink/10 py-5 text-xs text-stone">NOIRE - A concept project designed & developed by Levion.</div>
    </footer>
  );
}

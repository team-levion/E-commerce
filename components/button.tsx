import Link from "next/link";
import { ButtonHTMLAttributes } from "react";

const base =
  "inline-flex items-center justify-center gap-2 border px-6 py-3 text-xs font-semibold uppercase tracking-[0.18em] transition";

export function Button({ className = "", ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button className={`${base} border-ink bg-ink text-porcelain hover:bg-transparent hover:text-ink ${className}`} {...props} />;
}

export function LinkButton({ href, children, className = "" }: { href: string; children: React.ReactNode; className?: string }) {
  return (
    <Link href={href} className={`${base} border-ink bg-ink text-porcelain hover:bg-transparent hover:text-ink ${className}`}>
      {children}
    </Link>
  );
}

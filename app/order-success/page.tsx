"use client";

import { useEffect, useState } from "react";
import { Check } from "lucide-react";
import { LinkButton } from "@/components/button";

export default function OrderSuccessPage() {
  const [order, setOrder] = useState("");

  useEffect(() => {
    setOrder(window.localStorage.getItem("noire-last-order") ?? `NR-${Math.floor(100000 + Math.random() * 900000)}`);
  }, []);

  return (
    <section className="section grid min-h-[62vh] place-items-center py-16 text-center">
      <div className="max-w-2xl">
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-full border border-ink bg-ink text-porcelain">
          <Check size={28} />
        </div>
        <p className="eyebrow mt-8">Order Confirmed</p>
        <h1 className="mt-4 font-serif text-6xl">Thank you for your order.</h1>
        <p className="mt-5 text-stone">Order {order || "NR-000000"} has been received. A confirmation email would be sent in a production store.</p>
        <LinkButton href="/shop" className="mt-8">Continue Shopping</LinkButton>
      </div>
    </section>
  );
}

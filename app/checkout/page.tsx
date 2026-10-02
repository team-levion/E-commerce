"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { Button } from "@/components/button";
import { OrderSummary } from "@/components/order-summary";
import { useCommerce } from "@/lib/use-commerce";

const fields = ["email", "phone", "fullName", "address", "city", "state", "postalCode", "country"];

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, clearCart } = useCommerce();
  const [error, setError] = useState("");
  const [payment, setPayment] = useState("Card");

  function placeOrder(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const missing = fields.some((field) => !String(data.get(field) ?? "").trim());
    if (cart.length === 0) {
      setError("Add at least one item before placing an order.");
      return;
    }
    if (missing) {
      setError("Please complete the required checkout fields.");
      return;
    }
    fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        customer: {
          fullName: data.get("fullName"),
          email: data.get("email"),
          phone: data.get("phone"),
          address: data.get("address"),
          city: data.get("city"),
          state: data.get("state"),
          postalCode: data.get("postalCode"),
          country: data.get("country")
        },
        paymentMethod: payment,
        items: cart
      })
    })
      .then(async (response) => {
        const payload = await response.json();
        if (!response.ok) throw new Error(payload.error ?? "Unable to place order.");
        window.localStorage.setItem("noire-last-order", payload.orderId);
        clearCart();
        router.push("/order-success");
      })
      .catch((orderError: Error) => setError(orderError.message));
  }

  return (
    <section className="section py-12">
      <p className="eyebrow">Checkout</p>
      <h1 className="mt-3 font-serif text-6xl">Complete Order</h1>
      <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_380px]">
        <form onSubmit={placeOrder} className="grid gap-8">
          <div className="border border-ink/10 bg-porcelain p-6">
            <h2 className="font-serif text-3xl">Contact Information</h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <input name="email" type="email" placeholder="Email" className="h-12 border border-ink/10 bg-white px-4 outline-none focus:border-ink" />
              <input name="phone" placeholder="Phone" className="h-12 border border-ink/10 bg-white px-4 outline-none focus:border-ink" />
            </div>
          </div>
          <div className="border border-ink/10 bg-porcelain p-6">
            <h2 className="font-serif text-3xl">Shipping Address</h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <input name="fullName" placeholder="Full Name" className="h-12 border border-ink/10 bg-white px-4 outline-none focus:border-ink sm:col-span-2" />
              <input name="address" placeholder="Address" className="h-12 border border-ink/10 bg-white px-4 outline-none focus:border-ink sm:col-span-2" />
              <input name="city" placeholder="City" className="h-12 border border-ink/10 bg-white px-4 outline-none focus:border-ink" />
              <input name="state" placeholder="State" className="h-12 border border-ink/10 bg-white px-4 outline-none focus:border-ink" />
              <input name="postalCode" placeholder="Postal Code" className="h-12 border border-ink/10 bg-white px-4 outline-none focus:border-ink" />
              <input name="country" placeholder="Country" className="h-12 border border-ink/10 bg-white px-4 outline-none focus:border-ink" />
            </div>
          </div>
          <div className="border border-ink/10 bg-porcelain p-6">
            <h2 className="font-serif text-3xl">Payment Method</h2>
            <p className="mt-2 text-sm text-stone">Demo only. No payment will be processed.</p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {["Card", "Cash on Delivery"].map((entry) => (
                <button type="button" key={entry} onClick={() => setPayment(entry)} className={`border p-4 text-left ${payment === entry ? "border-ink bg-ink text-porcelain" : "border-ink/10 bg-white"}`}>{entry}</button>
              ))}
            </div>
          </div>
          {error && <p className="text-sm text-red-700">{error}</p>}
          <Button type="submit">Place Order</Button>
        </form>
        <OrderSummary />
      </div>
    </section>
  );
}

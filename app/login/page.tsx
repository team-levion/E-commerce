"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { Button } from "@/components/button";
import { createBrowserSupabaseClient } from "@/lib/supabase-browser";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");

  async function login(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    const supabase = createBrowserSupabaseClient();
    if (!supabase) {
      setError("Supabase environment variables are not configured.");
      return;
    }

    const data = new FormData(event.currentTarget);
    const { error } = await supabase.auth.signInWithPassword({
      email: String(data.get("email")),
      password: String(data.get("password"))
    });

    if (error) setError(error.message);
    else router.push("/shop");
  }

  async function logout() {
    const supabase = createBrowserSupabaseClient();
    await supabase?.auth.signOut();
    router.refresh();
  }

  return (
    <section className="section grid min-h-[62vh] place-items-center py-12">
      <form onSubmit={login} className="w-full max-w-md border border-ink/10 bg-porcelain p-7">
        <p className="eyebrow">Account</p>
        <h1 className="mt-3 font-serif text-5xl">Login</h1>
        <div className="mt-7 grid gap-4">
          <input name="email" type="email" required placeholder="Email" className="h-12 border border-ink/10 bg-white px-4 outline-none focus:border-ink" />
          <input name="password" type="password" required placeholder="Password" className="h-12 border border-ink/10 bg-white px-4 outline-none focus:border-ink" />
        </div>
        {error && <p className="mt-4 text-sm text-red-700">{error}</p>}
        <Button type="submit" className="mt-6 w-full">Login</Button>
        <div className="mt-5 flex justify-between text-sm text-stone">
          <Link href="/register" className="hover:text-ink">Create account</Link>
          <button type="button" onClick={logout} className="hover:text-ink">Logout</button>
        </div>
      </form>
    </section>
  );
}

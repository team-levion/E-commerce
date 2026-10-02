"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { Button } from "@/components/button";
import { createBrowserSupabaseClient } from "@/lib/supabase-browser";

export default function RegisterPage() {
  const router = useRouter();
  const [message, setMessage] = useState("");

  async function register(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");
    const supabase = createBrowserSupabaseClient();
    if (!supabase) {
      setMessage("Supabase environment variables are not configured.");
      return;
    }

    const data = new FormData(event.currentTarget);
    const { error } = await supabase.auth.signUp({
      email: String(data.get("email")),
      password: String(data.get("password"))
    });

    if (error) setMessage(error.message);
    else {
      setMessage("Account created. Check your email if confirmations are enabled.");
      router.push("/login");
    }
  }

  return (
    <section className="section grid min-h-[62vh] place-items-center py-12">
      <form onSubmit={register} className="w-full max-w-md border border-ink/10 bg-porcelain p-7">
        <p className="eyebrow">Account</p>
        <h1 className="mt-3 font-serif text-5xl">Register</h1>
        <div className="mt-7 grid gap-4">
          <input name="email" type="email" required placeholder="Email" className="h-12 border border-ink/10 bg-white px-4 outline-none focus:border-ink" />
          <input name="password" type="password" required minLength={6} placeholder="Password" className="h-12 border border-ink/10 bg-white px-4 outline-none focus:border-ink" />
        </div>
        {message && <p className="mt-4 text-sm text-stone">{message}</p>}
        <Button type="submit" className="mt-6 w-full">Create Account</Button>
        <p className="mt-5 text-sm text-stone">Already registered? <Link href="/login" className="text-ink underline underline-offset-4">Login</Link></p>
      </form>
    </section>
  );
}

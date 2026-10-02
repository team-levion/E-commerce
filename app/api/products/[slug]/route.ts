import { NextResponse } from "next/server";
import { getSupabaseProduct } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export async function GET(_: Request, { params }: { params: { slug: string } }) {
  const product = await getSupabaseProduct(params.slug);
  if (!product) return NextResponse.json({ error: "Product not found" }, { status: 404 });
  return NextResponse.json({ product });
}

import { NextResponse } from "next/server";
import { getSupabaseProducts } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export async function GET() {
  const products = await getSupabaseProducts();
  return NextResponse.json({ products });
}

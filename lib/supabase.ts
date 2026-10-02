import { createClient } from "@supabase/supabase-js";
import { products as fallbackProducts, Product } from "@/lib/products";

export type ProductRow = {
  id: string;
  slug: string;
  name: string;
  description: string;
  category: string;
  price: number;
  image_url: string;
  sizes: string[];
  colors: string[];
  featured: boolean;
  best_seller: boolean;
  created_at: string;
};

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

function isValidSupabaseUrl(value: string | undefined) {
  if (!value) return false;
  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:";
  } catch {
    return false;
  }
}

export function hasSupabasePublicConfig() {
  return Boolean(isValidSupabaseUrl(supabaseUrl) && supabaseAnonKey);
}

export function createPublicSupabaseClient() {
  if (!isValidSupabaseUrl(supabaseUrl) || !supabaseAnonKey) return null;
  return createClient(supabaseUrl as string, supabaseAnonKey);
}

export function createAdminSupabaseClient() {
  if (!isValidSupabaseUrl(supabaseUrl) || !supabaseServiceKey) return null;
  return createClient(supabaseUrl as string, supabaseServiceKey, {
    auth: { persistSession: false, autoRefreshToken: false }
  });
}

export function rowToProduct(row: ProductRow): Product {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    description: row.description,
    category: row.category,
    audience: row.category === "Accessories" ? "Accessories" : ["Dresses", "Knitwear"].includes(row.category) ? "Women" : "Men",
    price: Number(row.price),
    images: [row.image_url],
    details: ["Premium NOIRE material selection", "Designed for everyday wear", "Easy to style across seasons"],
    sizes: row.sizes,
    colors: row.colors,
    featured: row.featured,
    bestSeller: row.best_seller
  };
}

export async function getSupabaseProducts(): Promise<Product[]> {
  const supabase = createPublicSupabaseClient();
  if (!supabase) return fallbackProducts;

  const { data, error } = await supabase.from("products").select("*").order("created_at", { ascending: false });
  if (error || !data) return fallbackProducts;
  return (data as ProductRow[]).map(rowToProduct);
}

export async function getSupabaseProduct(slug: string): Promise<Product | null> {
  const supabase = createPublicSupabaseClient();
  if (!supabase) return fallbackProducts.find((product) => product.slug === slug) ?? null;

  const { data, error } = await supabase.from("products").select("*").eq("slug", slug).single();
  if (error || !data) return fallbackProducts.find((product) => product.slug === slug) ?? null;
  return rowToProduct(data as ProductRow);
}

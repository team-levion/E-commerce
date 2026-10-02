import { NextResponse } from "next/server";
import { createAdminSupabaseClient } from "@/lib/supabase";
import { products as fallbackProducts } from "@/lib/products";

export const dynamic = "force-dynamic";

type OrderRequest = {
  customer: {
    fullName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  paymentMethod: string;
  items: {
    productId: string;
    quantity: number;
    size: string;
    color: string;
  }[];
};

export async function POST(request: Request) {
  const body = (await request.json()) as OrderRequest;
  const required = [
    body.customer?.fullName,
    body.customer?.email,
    body.customer?.phone,
    body.customer?.address,
    body.customer?.city,
    body.customer?.state,
    body.customer?.postalCode,
    body.customer?.country
  ];

  if (required.some((value) => !String(value ?? "").trim()) || !body.items?.length) {
    return NextResponse.json({ error: "Missing required order fields." }, { status: 400 });
  }

  const supabase = createAdminSupabaseClient();
  if (!supabase) {
    return NextResponse.json({ error: "Supabase server credentials are not configured." }, { status: 500 });
  }

  const ids = body.items.map((item) => item.productId);
  const { data: dbProducts, error: productError } = await supabase.from("products").select("id,name,price").in("id", ids);

  if (productError) {
    return NextResponse.json({ error: productError.message }, { status: 500 });
  }

  const catalog = dbProducts?.length ? dbProducts : fallbackProducts;
  const subtotal = body.items.reduce((sum, item) => {
    const product = catalog.find((entry) => entry.id === item.productId);
    return sum + Number(product?.price ?? 0) * item.quantity;
  }, 0);
  const shipping = subtotal > 9999 ? 0 : 199;
  const total = subtotal + shipping;

  const { data: order, error: orderError } = await supabase
    .from("orders")
    .insert({
      customer_name: body.customer.fullName,
      email: body.customer.email,
      phone: body.customer.phone,
      address: body.customer.address,
      city: body.customer.city,
      state: body.customer.state,
      postal_code: body.customer.postalCode,
      country: body.customer.country,
      subtotal,
      shipping,
      total,
      payment_method: body.paymentMethod,
      status: "placed"
    })
    .select("id")
    .single();

  if (orderError || !order) {
    return NextResponse.json({ error: orderError?.message ?? "Unable to create order." }, { status: 500 });
  }

  const orderItems = body.items.map((item) => {
    const product = catalog.find((entry) => entry.id === item.productId);
    return {
      order_id: order.id,
      product_id: item.productId,
      product_name: product?.name ?? "NOIRE Product",
      quantity: item.quantity,
      size: item.size,
      color: item.color,
      price: Number(product?.price ?? 0)
    };
  });

  const { error: itemsError } = await supabase.from("order_items").insert(orderItems);
  if (itemsError) {
    return NextResponse.json({ error: itemsError.message }, { status: 500 });
  }

  return NextResponse.json({ orderId: order.id });
}

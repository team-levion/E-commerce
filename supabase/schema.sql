create extension if not exists "pgcrypto";

create table if not exists public.products (
  id text primary key,
  slug text not null unique,
  name text not null,
  description text not null,
  category text not null,
  price numeric(10, 2) not null check (price >= 0),
  image_url text not null,
  sizes text[] not null default '{}',
  colors text[] not null default '{}',
  featured boolean not null default false,
  best_seller boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  customer_name text not null,
  email text not null,
  phone text not null,
  address text not null,
  city text not null,
  state text not null,
  postal_code text not null,
  country text not null,
  subtotal numeric(10, 2) not null check (subtotal >= 0),
  shipping numeric(10, 2) not null check (shipping >= 0),
  total numeric(10, 2) not null check (total >= 0),
  payment_method text not null check (payment_method in ('Card', 'Cash on Delivery')),
  status text not null default 'placed',
  created_at timestamptz not null default now()
);

create table if not exists public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  product_id text references public.products(id) on delete set null,
  product_name text not null,
  quantity integer not null check (quantity > 0),
  size text not null,
  color text not null,
  price numeric(10, 2) not null check (price >= 0)
);

create index if not exists products_slug_idx on public.products(slug);
create index if not exists products_category_idx on public.products(category);
create index if not exists products_featured_idx on public.products(featured);
create index if not exists products_best_seller_idx on public.products(best_seller);
create index if not exists orders_user_id_idx on public.orders(user_id);
create index if not exists order_items_order_id_idx on public.order_items(order_id);

alter table public.products enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;

drop policy if exists "Products are publicly readable" on public.products;
create policy "Products are publicly readable"
  on public.products for select
  using (true);

drop policy if exists "Authenticated users can read their own orders" on public.orders;
create policy "Authenticated users can read their own orders"
  on public.orders for select
  using (auth.uid() = user_id);

drop policy if exists "Authenticated users can read their own order items" on public.order_items;
create policy "Authenticated users can read their own order items"
  on public.order_items for select
  using (
    exists (
      select 1
      from public.orders
      where orders.id = order_items.order_id
      and orders.user_id = auth.uid()
    )
  );

-- Orders are inserted by the Next.js API route with SUPABASE_SERVICE_ROLE_KEY.
-- Do not expose the service role key in browser/client code.

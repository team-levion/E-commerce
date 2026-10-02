# Supabase Setup

## 1. Create a Supabase Project

Go to https://supabase.com, create a new project, and wait for the database to finish provisioning.

## 2. Find the Project URL

In the Supabase dashboard, open **Project Settings > API**.

Copy the **Project URL**. Add it to `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
```

## 3. Find the Public Key

In **Project Settings > API**, copy the public `anon` key.

Add it to `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-public-anon-key
```

## 4. Find the Service Role Key

In **Project Settings > API**, copy the `service_role` key.

Add it to `.env.local`:

```env
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key
```

Keep this key private. It is used only by the Next.js server API route for creating orders.

## 5. Run the Schema

Open **SQL Editor** in Supabase.

Paste the contents of `supabase/schema.sql` and click **Run**.

This creates:

- `products`
- `orders`
- `order_items`
- indexes
- Row Level Security policies

## 6. Run the Seed Data

Open a new SQL Editor query.

Paste the contents of `supabase/seed.sql` and click **Run**.

This inserts the 12 NOIRE demo products.

## 7. Enable Authentication

Open **Authentication > Providers**.

Make sure **Email** is enabled.

For the simplest portfolio demo, you can disable email confirmation in **Authentication > Providers > Email** so test accounts can log in immediately.

## 8. Test the Connection

Create `.env.local` from `.env.example`, fill in your Supabase values, then run:

```bash
npm run dev
```

Open `http://localhost:3000/shop`.

The shop should load products from Supabase. Test `/register`, `/login`, add a product to cart, then place an order from checkout. Confirm the new rows appear in the Supabase `orders` and `order_items` tables.

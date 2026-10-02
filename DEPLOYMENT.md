# Vercel Deployment

## 1. Push to GitHub

Commit the project and push it to a GitHub repository.

## 2. Import into Vercel

Go to https://vercel.com/new and import the GitHub repository.

Use the default Next.js settings.

## 3. Add Environment Variables

In the Vercel project, open **Settings > Environment Variables** and add:

```env
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
```

Use the same values from your Supabase project.

## 4. Deploy

Click **Deploy**. Vercel will install dependencies and run the production build.

## 5. Test Production

After deployment, open the Vercel URL and test:

- Product listing
- Product detail page
- Register
- Login
- Add to cart
- Checkout
- Order success page

Then check Supabase to confirm `orders` and `order_items` rows are created.

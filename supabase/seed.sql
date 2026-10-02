insert into public.products (id, slug, name, description, category, price, image_url, sizes, colors, featured, best_seller) values
('p-001', 'atelier-cotton-shirt', 'Atelier Cotton Shirt', 'A crisp everyday shirt cut from breathable cotton poplin with a softened structured collar.', 'Shirts', 3990, 'https://images.unsplash.com/photo-1603252109303-2751441dd157?auto=format&fit=crop&w=1200&q=85', array['S','M','L','XL'], array['Ivory','Charcoal','Slate'], true, true),
('p-002', 'soft-structure-blazer', 'Soft Structure Blazer', 'A refined single-breasted blazer with relaxed shoulders and a fluid, modern drape.', 'Jackets', 7990, 'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=1200&q=85', array['XS','S','M','L'], array['Black','Sand'], true, false),
('p-003', 'ribbed-knit-dress', 'Ribbed Knit Dress', 'A clean column dress in compact rib knit, designed to move from day plans to evening tables.', 'Dresses', 5490, 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=85', array['XS','S','M','L'], array['Espresso','Cream','Black'], true, true),
('p-004', 'heavyweight-essential-tee', 'Heavyweight Essential Tee', 'A substantial cotton tee with a boxy silhouette and refined neckline.', 'T-Shirts', 2490, 'https://images.unsplash.com/photo-1523398002811-999ca8dec234?auto=format&fit=crop&w=1200&q=85', array['S','M','L','XL'], array['White','Black','Taupe'], true, true),
('p-005', 'pleated-wool-trouser', 'Pleated Wool Trouser', 'A generous pleated trouser with a clean fall and quiet tailoring details.', 'Trousers', 5990, 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=1200&q=85', array['30','32','34','36'], array['Graphite','Khaki'], false, true),
('p-006', 'brushed-fleece-hoodie', 'Brushed Fleece Hoodie', 'A dense, brushed fleece hoodie with tonal hardware and a quietly oversized fit.', 'Hoodies', 3990, 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=1200&q=85', array['S','M','L','XL'], array['Heather','Black','Moss'], false, true),
('p-007', 'cashmere-blend-cardigan', 'Cashmere Blend Cardigan', 'A soft cardigan with a deep neckline, dropped shoulder, and refined rib finish.', 'Knitwear', 6490, 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=85', array['XS','S','M','L'], array['Oat','Black'], true, false),
('p-008', 'silk-square-scarf', 'Silk Square Scarf', 'A luminous silk scarf with a restrained tonal border for everyday styling.', 'Accessories', 2990, 'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?auto=format&fit=crop&w=1200&q=85', array['One Size'], array['Ivory','Black','Clay'], false, true),
('p-009', 'longline-wool-coat', 'Longline Wool Coat', 'A sweeping wool coat with a precise lapel and clean, minimal closure.', 'Jackets', 10990, 'https://images.unsplash.com/photo-1548624313-0396c75e4b1a?auto=format&fit=crop&w=1200&q=85', array['XS','S','M','L'], array['Camel','Black'], false, false),
('p-010', 'leather-tote', 'North-South Leather Tote', 'A streamlined leather tote sized for workdays, weekends, and everything between.', 'Accessories', 7490, 'https://images.unsplash.com/photo-1594223274512-ad4803739b7c?auto=format&fit=crop&w=1200&q=85', array['One Size'], array['Black','Cocoa'], true, false),
('p-011', 'linen-camp-shirt', 'Linen Camp Shirt', 'An airy linen shirt with an open collar and softened vacation tailoring.', 'Shirts', 3490, 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=1200&q=85', array['S','M','L','XL'], array['Bone','Olive','Black'], false, false),
('p-012', 'satin-slip-skirt', 'Satin Slip Skirt', 'A bias-cut satin skirt with fluid movement and an effortless pull-on waist.', 'Trousers', 4490, 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1200&q=85', array['XS','S','M','L'], array['Champagne','Black'], false, true)
on conflict (id) do update set
  slug = excluded.slug,
  name = excluded.name,
  description = excluded.description,
  category = excluded.category,
  price = excluded.price,
  image_url = excluded.image_url,
  sizes = excluded.sizes,
  colors = excluded.colors,
  featured = excluded.featured,
  best_seller = excluded.best_seller;

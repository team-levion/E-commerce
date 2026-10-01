export type Product = {
  id: string;
  slug: string;
  name: string;
  category: string;
  audience: "Men" | "Women" | "Accessories";
  price: number;
  images: string[];
  description: string;
  details: string[];
  sizes: string[];
  colors: string[];
  featured: boolean;
  bestSeller: boolean;
};

export const products: Product[] = [
  {
    id: "p-001",
    slug: "atelier-cotton-shirt",
    name: "Atelier Cotton Shirt",
    category: "Shirts",
    audience: "Men",
    price: 128,
    images: ["https://images.unsplash.com/photo-1603252109303-2751441dd157?auto=format&fit=crop&w=1200&q=85"],
    description: "A crisp everyday shirt cut from breathable cotton poplin with a softened structured collar.",
    details: ["100% cotton poplin", "Relaxed tailored fit", "Mother-of-pearl buttons"],
    sizes: ["S", "M", "L", "XL"],
    colors: ["Ivory", "Charcoal", "Slate"],
    featured: true,
    bestSeller: true
  },
  {
    id: "p-002",
    slug: "soft-structure-blazer",
    name: "Soft Structure Blazer",
    category: "Jackets",
    audience: "Women",
    price: 248,
    images: ["https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=1200&q=85"],
    description: "A refined single-breasted blazer with relaxed shoulders and a fluid, modern drape.",
    details: ["Lightweight woven suiting", "Fully lined", "Single-button closure"],
    sizes: ["XS", "S", "M", "L"],
    colors: ["Black", "Sand"],
    featured: true,
    bestSeller: false
  },
  {
    id: "p-003",
    slug: "ribbed-knit-dress",
    name: "Ribbed Knit Dress",
    category: "Dresses",
    audience: "Women",
    price: 168,
    images: ["https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=85"],
    description: "A clean column dress in compact rib knit, designed to move from day plans to evening tables.",
    details: ["Viscose blend knit", "Midi length", "Slight stretch"],
    sizes: ["XS", "S", "M", "L"],
    colors: ["Espresso", "Cream", "Black"],
    featured: true,
    bestSeller: true
  },
  {
    id: "p-004",
    slug: "heavyweight-essential-tee",
    name: "Heavyweight Essential Tee",
    category: "T-Shirts",
    audience: "Men",
    price: 72,
    images: ["https://images.unsplash.com/photo-1523398002811-999ca8dec234?auto=format&fit=crop&w=1200&q=85"],
    description: "A substantial cotton tee with a boxy silhouette and refined neckline.",
    details: ["Heavy organic cotton jersey", "Boxy fit", "Garment washed"],
    sizes: ["S", "M", "L", "XL"],
    colors: ["White", "Black", "Taupe"],
    featured: true,
    bestSeller: true
  },
  {
    id: "p-005",
    slug: "pleated-wool-trouser",
    name: "Pleated Wool Trouser",
    category: "Trousers",
    audience: "Men",
    price: 188,
    images: ["https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=1200&q=85"],
    description: "A generous pleated trouser with a clean fall and quiet tailoring details.",
    details: ["Wool blend twill", "Double pleat front", "Extended tab waistband"],
    sizes: ["30", "32", "34", "36"],
    colors: ["Graphite", "Khaki"],
    featured: false,
    bestSeller: true
  },
  {
    id: "p-006",
    slug: "brushed-fleece-hoodie",
    name: "Brushed Fleece Hoodie",
    category: "Hoodies",
    audience: "Men",
    price: 118,
    images: ["https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=1200&q=85"],
    description: "A dense, brushed fleece hoodie with tonal hardware and a quietly oversized fit.",
    details: ["Cotton fleece", "Kangaroo pocket", "Ribbed cuffs and hem"],
    sizes: ["S", "M", "L", "XL"],
    colors: ["Heather", "Black", "Moss"],
    featured: false,
    bestSeller: true
  },
  {
    id: "p-007",
    slug: "cashmere-blend-cardigan",
    name: "Cashmere Blend Cardigan",
    category: "Knitwear",
    audience: "Women",
    price: 198,
    images: ["https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=85"],
    description: "A soft cardigan with a deep neckline, dropped shoulder, and refined rib finish.",
    details: ["Cashmere wool blend", "Button front", "Relaxed fit"],
    sizes: ["XS", "S", "M", "L"],
    colors: ["Oat", "Black"],
    featured: true,
    bestSeller: false
  },
  {
    id: "p-008",
    slug: "silk-square-scarf",
    name: "Silk Square Scarf",
    category: "Accessories",
    audience: "Accessories",
    price: 88,
    images: ["https://images.unsplash.com/photo-1601924994987-69e26d50dc26?auto=format&fit=crop&w=1200&q=85"],
    description: "A luminous silk scarf with a restrained tonal border for everyday styling.",
    details: ["100% silk", "Hand-rolled edges", "70 cm square"],
    sizes: ["One Size"],
    colors: ["Ivory", "Black", "Clay"],
    featured: false,
    bestSeller: true
  },
  {
    id: "p-009",
    slug: "longline-wool-coat",
    name: "Longline Wool Coat",
    category: "Jackets",
    audience: "Women",
    price: 328,
    images: ["https://images.unsplash.com/photo-1548624313-0396c75e4b1a?auto=format&fit=crop&w=1200&q=85"],
    description: "A sweeping wool coat with a precise lapel and clean, minimal closure.",
    details: ["Warm wool blend", "Hidden button placket", "Deep welt pockets"],
    sizes: ["XS", "S", "M", "L"],
    colors: ["Camel", "Black"],
    featured: false,
    bestSeller: false
  },
  {
    id: "p-010",
    slug: "leather-tote",
    name: "North-South Leather Tote",
    category: "Accessories",
    audience: "Accessories",
    price: 228,
    images: ["https://images.unsplash.com/photo-1594223274512-ad4803739b7c?auto=format&fit=crop&w=1200&q=85"],
    description: "A streamlined leather tote sized for workdays, weekends, and everything between.",
    details: ["Full-grain leather", "Interior zip pocket", "Magnetic closure"],
    sizes: ["One Size"],
    colors: ["Black", "Cocoa"],
    featured: true,
    bestSeller: false
  },
  {
    id: "p-011",
    slug: "linen-camp-shirt",
    name: "Linen Camp Shirt",
    category: "Shirts",
    audience: "Men",
    price: 112,
    images: ["https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=1200&q=85"],
    description: "An airy linen shirt with an open collar and softened vacation tailoring.",
    details: ["Pure linen", "Camp collar", "Straight hem"],
    sizes: ["S", "M", "L", "XL"],
    colors: ["Bone", "Olive", "Black"],
    featured: false,
    bestSeller: false
  },
  {
    id: "p-012",
    slug: "satin-slip-skirt",
    name: "Satin Slip Skirt",
    category: "Trousers",
    audience: "Women",
    price: 138,
    images: ["https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1200&q=85"],
    description: "A bias-cut satin skirt with fluid movement and an effortless pull-on waist.",
    details: ["Satin viscose blend", "Bias cut", "Elasticated waist"],
    sizes: ["XS", "S", "M", "L"],
    colors: ["Champagne", "Black"],
    featured: false,
    bestSeller: true
  }
];

export const categories = ["All", "T-Shirts", "Shirts", "Trousers", "Hoodies", "Jackets", "Dresses", "Knitwear", "Accessories"];

export function getProduct(slug: string) {
  return products.find((product) => product.slug === slug);
}

export function money(value: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(value);
}

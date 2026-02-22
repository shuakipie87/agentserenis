// =============================================================================
// Meat Shop E-Commerce - Database Seed Script
// Run via: npx ts-node server/src/prisma/seed.ts
// =============================================================================

import { PrismaClient, Role } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

// -----------------------------------------------------------------------------
// Helper: standard weight options reused across products
// -----------------------------------------------------------------------------
const STANDARD_WEIGHTS = [
  { label: "500g", grams: 500 },
  { label: "1kg", grams: 1000 },
  { label: "2kg", grams: 2000 },
];

const SMALL_WEIGHTS = [
  { label: "250g", grams: 250 },
  { label: "500g", grams: 500 },
  { label: "1kg", grams: 1000 },
];

const LARGE_WEIGHTS = [
  { label: "1kg", grams: 1000 },
  { label: "2kg", grams: 2000 },
  { label: "5kg", grams: 5000 },
];

function randomStock(min = 5, max = 50): number {
  return Math.round((Math.random() * (max - min) + min) * 100) / 100;
}

// -----------------------------------------------------------------------------
// Seed: Admin User
// -----------------------------------------------------------------------------
async function seedAdminUser() {
  const passwordHash = await bcrypt.hash("admin123", 12);

  const admin = await prisma.user.upsert({
    where: { email: "admin@meatshop.com" },
    update: {
      passwordHash,
      firstName: "Admin",
      lastName: "User",
      role: Role.ADMIN,
    },
    create: {
      email: "admin@meatshop.com",
      passwordHash,
      firstName: "Admin",
      lastName: "User",
      role: Role.ADMIN,
      isActive: true,
    },
  });

  console.log(`  Admin user seeded: ${admin.email} (id: ${admin.id})`);
  return admin;
}

// -----------------------------------------------------------------------------
// Seed: Categories
// -----------------------------------------------------------------------------
interface CategorySeed {
  name: string;
  slug: string;
  description: string;
  image: string;
  sortOrder: number;
}

const CATEGORIES: CategorySeed[] = [
  {
    name: "Beef",
    slug: "beef",
    description: "Premium cuts of locally sourced beef",
    image: "/images/categories/beef.jpg",
    sortOrder: 1,
  },
  {
    name: "Chicken",
    slug: "chicken",
    description: "Farm-fresh chicken, free-range options available",
    image: "/images/categories/chicken.jpg",
    sortOrder: 2,
  },
  {
    name: "Lamb",
    slug: "lamb",
    description: "Tender lamb from pasture-raised flocks",
    image: "/images/categories/lamb.jpg",
    sortOrder: 3,
  },
  {
    name: "Pork",
    slug: "pork",
    description: "Quality pork cuts for every occasion",
    image: "/images/categories/pork.jpg",
    sortOrder: 4,
  },
  {
    name: "Seafood",
    slug: "seafood",
    description: "Fresh catches and premium seafood selections",
    image: "/images/categories/seafood.jpg",
    sortOrder: 5,
  },
  {
    name: "Specialty",
    slug: "specialty",
    description: "Deli meats, sausages, and gourmet selections",
    image: "/images/categories/specialty.jpg",
    sortOrder: 6,
  },
];

async function seedCategories() {
  const created: Record<string, string> = {};

  for (const cat of CATEGORIES) {
    const category = await prisma.category.upsert({
      where: { slug: cat.slug },
      update: {
        name: cat.name,
        description: cat.description,
        image: cat.image,
        sortOrder: cat.sortOrder,
      },
      create: {
        name: cat.name,
        slug: cat.slug,
        description: cat.description,
        image: cat.image,
        sortOrder: cat.sortOrder,
        isActive: true,
      },
    });
    created[cat.slug] = category.id;
  }

  console.log(`  Categories seeded: ${Object.keys(created).length} categories`);
  return created;
}

// -----------------------------------------------------------------------------
// Seed: Products
// -----------------------------------------------------------------------------
interface ProductSeed {
  name: string;
  slug: string;
  description: string;
  categorySlug: string;
  pricePerKg: number;
  weightOptions: { label: string; grams: number }[];
  allowCustomWeight: boolean;
  tags: string[];
  origin: string;
  isFeatured: boolean;
  isOnSale: boolean;
  salePrice?: number;
  images: { url: string; alt: string }[];
}

const PRODUCTS: ProductSeed[] = [
  // =========================================================================
  // BEEF (5 products)
  // =========================================================================
  {
    name: "Ribeye Steak",
    slug: "ribeye-steak",
    description:
      "Generously marbled ribeye steak cut from the prime rib section. Perfect for grilling or pan-searing to achieve a rich, buttery flavour. Best served medium-rare with a side of roasted vegetables.",
    categorySlug: "beef",
    pricePerKg: 54.99,
    weightOptions: STANDARD_WEIGHTS,
    allowCustomWeight: true,
    tags: ["grass-fed", "premium", "steak"],
    origin: "Australia",
    isFeatured: true,
    isOnSale: false,
    images: [
      { url: "/images/products/ribeye-steak.jpg", alt: "Ribeye steak on a wooden board" },
      { url: "/images/products/ribeye-steak-2.jpg", alt: "Ribeye steak close-up marbling" },
    ],
  },
  {
    name: "Scotch Fillet",
    slug: "scotch-fillet",
    description:
      "Tender scotch fillet with exceptional marbling throughout. A versatile cut that performs well on the barbecue, under the grill, or in a hot cast-iron pan. Pairs beautifully with a peppercorn sauce.",
    categorySlug: "beef",
    pricePerKg: 49.99,
    weightOptions: STANDARD_WEIGHTS,
    allowCustomWeight: true,
    tags: ["grass-fed", "premium", "steak"],
    origin: "Australia",
    isFeatured: true,
    isOnSale: true,
    salePrice: 42.99,
    images: [
      { url: "/images/products/scotch-fillet.jpg", alt: "Scotch fillet steak" },
    ],
  },
  {
    name: "Beef Mince",
    slug: "beef-mince",
    description:
      "Lean beef mince with a fat content of around 10%. Ideal for bolognese, shepherd's pie, burgers, and meatballs. Ground fresh daily from quality trim cuts.",
    categorySlug: "beef",
    pricePerKg: 16.99,
    weightOptions: STANDARD_WEIGHTS,
    allowCustomWeight: false,
    tags: ["lean", "everyday"],
    origin: "Local Farm",
    isFeatured: false,
    isOnSale: false,
    images: [
      { url: "/images/products/beef-mince.jpg", alt: "Fresh lean beef mince" },
    ],
  },
  {
    name: "T-Bone Steak",
    slug: "t-bone-steak",
    description:
      "Classic T-bone steak featuring both the strip loin and tenderloin separated by a T-shaped bone. A showpiece cut for the barbecue that delivers two textures in one steak. Season simply with salt and pepper.",
    categorySlug: "beef",
    pricePerKg: 44.99,
    weightOptions: STANDARD_WEIGHTS,
    allowCustomWeight: true,
    tags: ["grass-fed", "steak", "bone-in"],
    origin: "Australia",
    isFeatured: false,
    isOnSale: false,
    images: [
      { url: "/images/products/t-bone-steak.jpg", alt: "T-bone steak" },
    ],
  },
  {
    name: "Beef Chuck Roast",
    slug: "beef-chuck-roast",
    description:
      "Slow-cooking favourite cut from the shoulder. Rich in connective tissue that breaks down into gelatin during braising, yielding a melt-in-your-mouth texture. Perfect for pot roasts and stews.",
    categorySlug: "beef",
    pricePerKg: 22.99,
    weightOptions: LARGE_WEIGHTS,
    allowCustomWeight: true,
    tags: ["slow-cook", "roast", "grass-fed"],
    origin: "Australia",
    isFeatured: false,
    isOnSale: true,
    salePrice: 18.99,
    images: [
      { url: "/images/products/beef-chuck-roast.jpg", alt: "Beef chuck roast" },
    ],
  },

  // =========================================================================
  // CHICKEN (4 products)
  // =========================================================================
  {
    name: "Chicken Breast Fillet",
    slug: "chicken-breast-fillet",
    description:
      "Skinless, boneless chicken breast fillets from free-range birds. A lean, high-protein option that is incredibly versatile. Grill, bake, or stir-fry for a quick weeknight meal.",
    categorySlug: "chicken",
    pricePerKg: 14.99,
    weightOptions: STANDARD_WEIGHTS,
    allowCustomWeight: false,
    tags: ["free-range", "lean", "everyday"],
    origin: "Local Farm",
    isFeatured: true,
    isOnSale: false,
    images: [
      { url: "/images/products/chicken-breast.jpg", alt: "Chicken breast fillets" },
    ],
  },
  {
    name: "Whole Chicken",
    slug: "whole-chicken",
    description:
      "Whole free-range chicken, approximately 1.5-2kg. Perfect for a traditional Sunday roast. Stuff with lemon and herbs, roast at high heat for golden, crispy skin and juicy meat.",
    categorySlug: "chicken",
    pricePerKg: 9.99,
    weightOptions: [
      { label: "Small (~1.4kg)", grams: 1400 },
      { label: "Medium (~1.8kg)", grams: 1800 },
      { label: "Large (~2.2kg)", grams: 2200 },
    ],
    allowCustomWeight: false,
    tags: ["free-range", "whole-bird", "roast"],
    origin: "Local Farm",
    isFeatured: false,
    isOnSale: true,
    salePrice: 7.99,
    images: [
      { url: "/images/products/whole-chicken.jpg", alt: "Whole free-range chicken" },
    ],
  },
  {
    name: "Chicken Thigh Fillet",
    slug: "chicken-thigh-fillet",
    description:
      "Boneless, skinless chicken thigh fillets. More flavourful and forgiving than breast, with slightly higher fat content that keeps the meat moist during cooking. Excellent for curries, kebabs, and casseroles.",
    categorySlug: "chicken",
    pricePerKg: 12.99,
    weightOptions: STANDARD_WEIGHTS,
    allowCustomWeight: false,
    tags: ["free-range", "everyday"],
    origin: "Local Farm",
    isFeatured: false,
    isOnSale: false,
    images: [
      { url: "/images/products/chicken-thigh.jpg", alt: "Chicken thigh fillets" },
    ],
  },
  {
    name: "Chicken Wings",
    slug: "chicken-wings",
    description:
      "Fresh chicken wings, perfect for marinating and grilling, deep-frying, or baking until crispy. A crowd-pleasing option for game day, barbecues, or as a starter. Available in bulk quantities.",
    categorySlug: "chicken",
    pricePerKg: 8.99,
    weightOptions: STANDARD_WEIGHTS,
    allowCustomWeight: false,
    tags: ["free-range", "party", "bulk"],
    origin: "Local Farm",
    isFeatured: false,
    isOnSale: false,
    images: [
      { url: "/images/products/chicken-wings.jpg", alt: "Raw chicken wings" },
    ],
  },

  // =========================================================================
  // LAMB (4 products)
  // =========================================================================
  {
    name: "Lamb Rack",
    slug: "lamb-rack",
    description:
      "French-trimmed rack of lamb with eight ribs. An elegant centrepiece for dinner parties. Roast whole or slice into individual cutlets after cooking. Best cooked to medium-rare for maximum tenderness.",
    categorySlug: "lamb",
    pricePerKg: 59.99,
    weightOptions: SMALL_WEIGHTS,
    allowCustomWeight: true,
    tags: ["premium", "pasture-raised", "roast"],
    origin: "New Zealand",
    isFeatured: true,
    isOnSale: false,
    images: [
      { url: "/images/products/lamb-rack.jpg", alt: "French-trimmed lamb rack" },
      { url: "/images/products/lamb-rack-2.jpg", alt: "Cooked lamb rack sliced" },
    ],
  },
  {
    name: "Lamb Leg Roast",
    slug: "lamb-leg-roast",
    description:
      "Bone-in lamb leg, perfect for a slow roast. Stud with garlic and rosemary, cook low and slow until the meat falls off the bone. Feeds the whole family with leftovers for sandwiches.",
    categorySlug: "lamb",
    pricePerKg: 24.99,
    weightOptions: LARGE_WEIGHTS,
    allowCustomWeight: true,
    tags: ["pasture-raised", "roast", "bone-in"],
    origin: "New Zealand",
    isFeatured: false,
    isOnSale: true,
    salePrice: 21.99,
    images: [
      { url: "/images/products/lamb-leg.jpg", alt: "Bone-in lamb leg roast" },
    ],
  },
  {
    name: "Lamb Loin Chops",
    slug: "lamb-loin-chops",
    description:
      "Thick-cut lamb loin chops with a small T-bone. Quick to cook on a hot grill or pan. Season with cumin, coriander, and a squeeze of lemon for a Mediterranean-inspired meal.",
    categorySlug: "lamb",
    pricePerKg: 34.99,
    weightOptions: STANDARD_WEIGHTS,
    allowCustomWeight: false,
    tags: ["pasture-raised", "chops"],
    origin: "Australia",
    isFeatured: false,
    isOnSale: false,
    images: [
      { url: "/images/products/lamb-loin-chops.jpg", alt: "Lamb loin chops" },
    ],
  },
  {
    name: "Lamb Mince",
    slug: "lamb-mince",
    description:
      "Premium lamb mince made from shoulder and leg trim. Perfect for kofta, moussaka, shepherd's pie, and lamb burgers. Adds rich flavour compared to standard beef mince.",
    categorySlug: "lamb",
    pricePerKg: 19.99,
    weightOptions: STANDARD_WEIGHTS,
    allowCustomWeight: false,
    tags: ["pasture-raised", "everyday"],
    origin: "Australia",
    isFeatured: false,
    isOnSale: false,
    images: [
      { url: "/images/products/lamb-mince.jpg", alt: "Fresh lamb mince" },
    ],
  },

  // =========================================================================
  // PORK (4 products)
  // =========================================================================
  {
    name: "Pork Belly",
    slug: "pork-belly",
    description:
      "Skin-on pork belly with beautiful layers of meat and fat. Score the skin and rub with salt for perfect crackling. Slow-roast until the meat is tender and the skin is shatteringly crisp.",
    categorySlug: "pork",
    pricePerKg: 18.99,
    weightOptions: STANDARD_WEIGHTS,
    allowCustomWeight: true,
    tags: ["skin-on", "slow-cook", "roast"],
    origin: "Australia",
    isFeatured: true,
    isOnSale: false,
    images: [
      { url: "/images/products/pork-belly.jpg", alt: "Skin-on pork belly slab" },
    ],
  },
  {
    name: "Pork Loin Chops",
    slug: "pork-loin-chops",
    description:
      "Centre-cut pork loin chops, bone-in for extra flavour. A lean cut that cooks quickly on the grill or in a skillet. Brine for 30 minutes before cooking to ensure juicy results every time.",
    categorySlug: "pork",
    pricePerKg: 19.99,
    weightOptions: STANDARD_WEIGHTS,
    allowCustomWeight: false,
    tags: ["bone-in", "chops", "lean"],
    origin: "Local Farm",
    isFeatured: false,
    isOnSale: false,
    images: [
      { url: "/images/products/pork-loin-chops.jpg", alt: "Pork loin chops" },
    ],
  },
  {
    name: "Pork Shoulder",
    slug: "pork-shoulder",
    description:
      "Bone-in pork shoulder, the king of low-and-slow cooking. Ideal for pulled pork, carnitas, and braised dishes. The generous fat marbling bastes the meat from within as it cooks.",
    categorySlug: "pork",
    pricePerKg: 14.99,
    weightOptions: LARGE_WEIGHTS,
    allowCustomWeight: true,
    tags: ["slow-cook", "bone-in", "bulk"],
    origin: "Australia",
    isFeatured: false,
    isOnSale: true,
    salePrice: 12.49,
    images: [
      { url: "/images/products/pork-shoulder.jpg", alt: "Bone-in pork shoulder" },
    ],
  },
  {
    name: "Pork Ribs",
    slug: "pork-ribs",
    description:
      "Full rack of pork spare ribs, untrimmed for maximum flavour. Smoke low and slow with your favourite rub, or braise in the oven with barbecue sauce. Feeds 2-3 people per rack.",
    categorySlug: "pork",
    pricePerKg: 21.99,
    weightOptions: STANDARD_WEIGHTS,
    allowCustomWeight: false,
    tags: ["barbecue", "ribs", "slow-cook"],
    origin: "Australia",
    isFeatured: false,
    isOnSale: false,
    images: [
      { url: "/images/products/pork-ribs.jpg", alt: "Full rack of pork spare ribs" },
    ],
  },

  // =========================================================================
  // SEAFOOD (4 products)
  // =========================================================================
  {
    name: "Atlantic Salmon Fillet",
    slug: "atlantic-salmon-fillet",
    description:
      "Skin-on Atlantic salmon fillets, rich in omega-3 fatty acids. Pan-sear skin-side down for crispy skin and silky flesh. Also excellent baked, grilled, or used in poke bowls.",
    categorySlug: "seafood",
    pricePerKg: 34.99,
    weightOptions: SMALL_WEIGHTS,
    allowCustomWeight: true,
    tags: ["omega-3", "premium", "skin-on"],
    origin: "Tasmania",
    isFeatured: true,
    isOnSale: false,
    images: [
      { url: "/images/products/salmon-fillet.jpg", alt: "Atlantic salmon fillet skin-on" },
    ],
  },
  {
    name: "Tiger Prawns",
    slug: "tiger-prawns",
    description:
      "Large, fresh tiger prawns with shells on. Sweet, firm flesh that cooks in minutes. Perfect for garlic prawns, prawn cocktail, barbecuing, or adding to a seafood paella.",
    categorySlug: "seafood",
    pricePerKg: 39.99,
    weightOptions: SMALL_WEIGHTS,
    allowCustomWeight: false,
    tags: ["shell-on", "premium", "party"],
    origin: "Australia",
    isFeatured: false,
    isOnSale: true,
    salePrice: 34.99,
    images: [
      { url: "/images/products/tiger-prawns.jpg", alt: "Fresh tiger prawns" },
    ],
  },
  {
    name: "Barramundi Fillet",
    slug: "barramundi-fillet",
    description:
      "Boneless, skinless barramundi fillets with a mild, buttery flavour. A versatile Australian native fish that works well grilled, pan-fried, steamed, or baked. Pairs well with Asian-inspired sauces.",
    categorySlug: "seafood",
    pricePerKg: 29.99,
    weightOptions: SMALL_WEIGHTS,
    allowCustomWeight: true,
    tags: ["boneless", "australian", "mild"],
    origin: "Australia",
    isFeatured: false,
    isOnSale: false,
    images: [
      { url: "/images/products/barramundi-fillet.jpg", alt: "Barramundi fillet" },
    ],
  },
  {
    name: "Calamari Tubes",
    slug: "calamari-tubes",
    description:
      "Cleaned calamari tubes ready for stuffing, slicing into rings, or scoring and grilling. Cook very quickly over high heat or very slowly over low heat; anything in between will result in tough texture.",
    categorySlug: "seafood",
    pricePerKg: 24.99,
    weightOptions: SMALL_WEIGHTS,
    allowCustomWeight: false,
    tags: ["cleaned", "ready-to-cook"],
    origin: "Australia",
    isFeatured: false,
    isOnSale: false,
    images: [
      { url: "/images/products/calamari-tubes.jpg", alt: "Cleaned calamari tubes" },
    ],
  },

  // =========================================================================
  // SPECIALTY (5 products)
  // =========================================================================
  {
    name: "Beef & Herb Sausages",
    slug: "beef-herb-sausages",
    description:
      "Handmade beef sausages seasoned with rosemary, thyme, and cracked black pepper. Made in-house using premium beef trim and natural casings. Grill, pan-fry, or bake for a classic family meal.",
    categorySlug: "specialty",
    pricePerKg: 16.99,
    weightOptions: STANDARD_WEIGHTS,
    allowCustomWeight: false,
    tags: ["handmade", "sausages", "natural-casing"],
    origin: "Made In-House",
    isFeatured: false,
    isOnSale: false,
    images: [
      { url: "/images/products/beef-herb-sausages.jpg", alt: "Beef and herb sausages" },
    ],
  },
  {
    name: "Italian Pork & Fennel Sausages",
    slug: "italian-pork-fennel-sausages",
    description:
      "Traditional Italian-style pork sausages with fennel seeds, garlic, and chilli flakes. Perfect for pasta sauces, baked with peppers and onions, or simply grilled on a roll with mustard.",
    categorySlug: "specialty",
    pricePerKg: 18.99,
    weightOptions: STANDARD_WEIGHTS,
    allowCustomWeight: false,
    tags: ["handmade", "sausages", "italian"],
    origin: "Made In-House",
    isFeatured: false,
    isOnSale: true,
    salePrice: 15.99,
    images: [
      { url: "/images/products/italian-sausages.jpg", alt: "Italian pork and fennel sausages" },
    ],
  },
  {
    name: "Wagyu Beef Burgers",
    slug: "wagyu-beef-burgers",
    description:
      "Premium wagyu beef burger patties, hand-pressed with a coarse grind for the best texture. Seasoned simply with salt and pepper to let the wagyu flavour shine. 150g per patty, sold in packs.",
    categorySlug: "specialty",
    pricePerKg: 39.99,
    weightOptions: [
      { label: "4 Pack (600g)", grams: 600 },
      { label: "8 Pack (1.2kg)", grams: 1200 },
    ],
    allowCustomWeight: false,
    tags: ["wagyu", "premium", "burgers", "handmade"],
    origin: "Australia",
    isFeatured: true,
    isOnSale: false,
    images: [
      { url: "/images/products/wagyu-burgers.jpg", alt: "Wagyu beef burger patties" },
    ],
  },
  {
    name: "Smoked Ham off the Bone",
    slug: "smoked-ham-off-bone",
    description:
      "Double-smoked leg ham, sliced fresh to order. Rich, smoky flavour with a silky texture. Perfect for sandwiches, charcuterie boards, or diced into pasta and omelettes.",
    categorySlug: "specialty",
    pricePerKg: 22.99,
    weightOptions: SMALL_WEIGHTS,
    allowCustomWeight: true,
    tags: ["smoked", "deli", "sliced-to-order"],
    origin: "Australia",
    isFeatured: false,
    isOnSale: false,
    images: [
      { url: "/images/products/smoked-ham.jpg", alt: "Smoked ham sliced off the bone" },
    ],
  },
  {
    name: "Marinated Chicken Kebabs",
    slug: "marinated-chicken-kebabs",
    description:
      "Pre-skewered chicken breast pieces marinated in a lemon, garlic, and herb blend. Ready to throw straight on the barbecue or grill. Each skewer is approximately 120g. Sold by weight.",
    categorySlug: "specialty",
    pricePerKg: 19.99,
    weightOptions: SMALL_WEIGHTS,
    allowCustomWeight: false,
    tags: ["marinated", "ready-to-cook", "barbecue"],
    origin: "Made In-House",
    isFeatured: false,
    isOnSale: false,
    images: [
      { url: "/images/products/chicken-kebabs.jpg", alt: "Marinated chicken kebab skewers" },
    ],
  },
];

async function seedProducts(categoryMap: Record<string, string>) {
  let created = 0;

  for (const prod of PRODUCTS) {
    const categoryId = categoryMap[prod.categorySlug];
    if (!categoryId) {
      console.warn(`  WARNING: Category "${prod.categorySlug}" not found, skipping product "${prod.name}"`);
      continue;
    }

    const product = await prisma.product.upsert({
      where: { slug: prod.slug },
      update: {
        name: prod.name,
        description: prod.description,
        categoryId,
        pricePerKg: prod.pricePerKg,
        weightOptions: prod.weightOptions,
        allowCustomWeight: prod.allowCustomWeight,
        stockKg: randomStock(),
        tags: prod.tags,
        origin: prod.origin,
        isFeatured: prod.isFeatured,
        isOnSale: prod.isOnSale,
        salePrice: prod.salePrice ?? null,
        isActive: true,
      },
      create: {
        name: prod.name,
        slug: prod.slug,
        description: prod.description,
        categoryId,
        pricePerKg: prod.pricePerKg,
        weightOptions: prod.weightOptions,
        allowCustomWeight: prod.allowCustomWeight,
        stockKg: randomStock(),
        tags: prod.tags,
        origin: prod.origin,
        isFeatured: prod.isFeatured,
        isOnSale: prod.isOnSale,
        salePrice: prod.salePrice ?? null,
        isActive: true,
      },
    });

    // Upsert product images: delete existing and recreate to stay idempotent
    await prisma.productImage.deleteMany({ where: { productId: product.id } });

    if (prod.images.length > 0) {
      await prisma.productImage.createMany({
        data: prod.images.map((img, index) => ({
          productId: product.id,
          url: img.url,
          alt: img.alt,
          sortOrder: index,
        })),
      });
    }

    created++;
  }

  console.log(`  Products seeded: ${created} products with images`);
}

// -----------------------------------------------------------------------------
// Main seed runner
// -----------------------------------------------------------------------------
async function main() {
  console.log("Seeding meat shop database...\n");

  console.log("[1/3] Seeding admin user...");
  await seedAdminUser();

  console.log("[2/3] Seeding categories...");
  const categoryMap = await seedCategories();

  console.log("[3/3] Seeding products...");
  await seedProducts(categoryMap);

  console.log("\nSeed completed successfully.");
}

main()
  .catch((error) => {
    console.error("Seed failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

# Data Engineer - Agent Memory

## Project: Meat Shop E-Commerce (agentserenis)

### Database
- **Engine**: PostgreSQL (via Prisma ORM)
- **Prisma version**: ^5.20.0
- **Schema location**: `server/src/prisma/schema.prisma`
- **Seed location**: `server/src/prisma/seed.ts`
- **Migrations dir**: `server/src/prisma/migrations/`
- **Driver/Client**: `@prisma/client`

### Schema Overview (11 models)
- User, Address, Category, Product, ProductImage, Cart, CartItem, Order, OrderItem, Review, Favorite
- 3 enums: Role (CUSTOMER/ADMIN), OrderStatus (7 values), DeliveryMethod (DELIVERY/PICKUP)
- Table names use snake_case via `@@map()` (e.g., `users`, `cart_items`, `order_items`)
- IDs are cuid() strings throughout
- Decimal precision: prices (10,2), stockKg (10,3), averageRating (3,2)
- Json fields: Product.weightOptions, Product.nutritionInfo, Order.deliveryAddress
- PostgreSQL String[] used for Product.tags

### Naming Conventions
- Models: PascalCase
- Fields: camelCase
- Slugs: kebab-case (unique indexed)
- DB tables: snake_case via @@map

### Key Indexes
- Product: categoryId, slug, [isActive,isFeatured], [isActive,categoryId]
- Order: userId, status, orderNumber, createdAt
- Composite uniques: CartItem[cartId,productId,weightGrams], Review[userId,productId], Favorite[userId,productId]

### Cascade Behavior
- ProductImage, CartItem, OrderItem: CASCADE on parent delete
- Order->User: RESTRICT (preserve order history)
- Order->Address: SET NULL
- Product->Category: RESTRICT (prevent orphans)
- Review, Favorite: CASCADE on both user and product delete

### Seed Data
- 1 admin user (admin@meatshop.com, bcrypt 12 rounds)
- 6 categories (Beef, Chicken, Lamb, Pork, Seafood, Specialty)
- 26 products (5 beef, 4 chicken, 4 lamb, 4 pork, 4 seafood, 5 specialty)
- Uses upsert for idempotent re-runs

### Server Config
- Runtime: Node.js with ts-node (CommonJS modules)
- Password hashing: bcryptjs (12 rounds)
- Seed command: `npx ts-node server/src/prisma/seed.ts`
- Workspace: npm workspaces (root/client/server/shared)

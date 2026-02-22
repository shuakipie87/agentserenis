# Joey Backend Engineer - Agent Memory

## Project: Meat Shop E-Commerce (agentserenis)

### Architecture
- **Monorepo** with npm workspaces: `client/`, `server/`, `shared/`
- Root `tsconfig.base.json`: ES2022, ESNext modules, bundler moduleResolution
- Server overrides to CommonJS + node moduleResolution for ts-node-dev compatibility

### Server Stack
- Express 4 + TypeScript on port 4000 (default)
- Prisma ORM with PostgreSQL
- Pino structured logging (pino-pretty in dev)
- Zod for request validation
- JWT auth (Bearer token, access + refresh pattern)
- Rate limiting: 100 req / 15 min per IP

### Key File Paths
- Server entry: `server/src/server.ts`
- Express app: `server/src/app.ts`
- Prisma schema: `server/src/prisma/schema.prisma`
- Routes index: `server/src/routes/index.ts`
- Error middleware: `server/src/middleware/error.ts` (exports AppError class)
- Auth middleware: `server/src/middleware/auth.ts` (authenticate, requireAdmin)
- Validation: `server/src/middleware/validate.ts`
- Logger: `server/src/utils/logger.ts`
- Prisma client: `server/src/utils/prisma.ts`
- Helpers: `server/src/utils/helpers.ts`

### Database Models (Prisma)
User, Address, Category, Product, ProductImage, Cart, CartItem, Order, OrderItem, Review, Favorite

### Enums
Role (CUSTOMER, ADMIN), OrderStatus (PENDING..CANCELLED), DeliveryMethod (DELIVERY, PICKUP)

### Patterns
- AppError static factory methods: .badRequest(), .unauthorized(), .forbidden(), .notFound(), .conflict(), .internal()
- Health check at GET /api/health (before rate limiter)
- Request ID via X-Request-ID header (auto-generated UUID if missing)
- CORS_ORIGIN env var supports comma-separated origins
- Graceful shutdown on SIGTERM/SIGINT with 30s force timeout
- Sensitive fields redacted from logs: authorization, cookie, password, token, secret

### Environment Variables Expected
- DATABASE_URL, PORT (4000), HOST (0.0.0.0), NODE_ENV
- JWT_ACCESS_SECRET
- CORS_ORIGIN (comma-separated, defaults to http://localhost:3000)
- LOG_LEVEL (defaults to debug in dev, info in production)

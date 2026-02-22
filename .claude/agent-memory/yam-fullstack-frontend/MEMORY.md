# Yam Frontend Agent Memory

## Project: Meat Shop E-Commerce (Premium Meats)
- **Client path**: `C:\D-drive-94828\AIAGENT\agentserenis\client\`
- **Stack**: React 18 + Vite + TypeScript + Tailwind CSS 3 + React Router v6
- **State management**: Zustand (auth, cart, ui stores) + TanStack React Query (server state)
- **Forms**: react-hook-form + zod + @hookform/resolvers
- **Animation**: framer-motion
- **Icons**: lucide-react
- **Charts**: recharts (admin dashboard)
- **Styling utilities**: clsx + tailwind-merge via `cn()` helper

## Key Architecture Decisions
- Path alias: `@/` -> `src/` (configured in tsconfig.json + vite.config.ts)
- API proxy: `/api` -> `localhost:3001` (vite dev server proxy)
- Layouts: `PublicLayout` (header/footer) and `AdminLayout` (sidebar) wrap routes via `<Outlet />`
- All pages lazy-loaded with `React.lazy` + `Suspense` in `App.tsx`
- Auth token stored in `localStorage` keys: `auth-token`, `auth-refresh-token`
- Cart persisted to localStorage via zustand/middleware persist (key: `meatshop-cart`)

## Design Tokens (Tailwind)
- **Primary**: deep red `#8B1A1A` (50-950 scale)
- **Secondary**: brown `#5C3317` (50-950 scale)
- **Accent**: gold `#C4922A` (50-950 scale)
- **Neutrals**: cream `#FFF8F0`, bone `#F5E6D3`, charcoal `#2D2D2D`
- **Fonts**: heading = Playfair Display (serif), body = Inter (sans-serif)
- **Custom shadows**: soft, medium, strong, elevated, inner-soft
- **CSS components**: `.btn-primary`, `.btn-secondary`, `.btn-accent`, `.input-field`, `.card`, `.container-wide`, `.container-narrow`

## File Structure Pattern
- Pages: `src/pages/` (public), `src/pages/admin/` (admin)
- Stores: `src/stores/{authStore,cartStore,uiStore}.ts`
- Types: `src/types/index.ts` (all domain + API types)
- Libs: `src/lib/{axios,utils}.ts`
- Components: `src/components/{ui,layout,product,cart,admin}/`

## Routes
- Public: `/`, `/products`, `/products/:slug`, `/cart`, `/checkout`, `/login`, `/register`, `/about`, `/contact`, `/profile`
- Admin: `/admin`, `/admin/products`, `/admin/orders`, `/admin/customers`
- 404 catch-all with `NotFoundPage`

See [patterns.md](./patterns.md) for detailed code patterns.

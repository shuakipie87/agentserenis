import { Router } from 'express';

const router = Router();

// GET    /api/products          - list products (public, paginated)
// GET    /api/products/:slug    - get product by slug (public)
// POST   /api/products          - create product (admin)
// PUT    /api/products/:id      - update product (admin)
// DELETE /api/products/:id      - delete product (admin)

export default router;

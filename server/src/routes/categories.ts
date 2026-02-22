import { Router } from 'express';

const router = Router();

// GET    /api/categories        - list categories (public)
// GET    /api/categories/:slug  - get category by slug (public)
// POST   /api/categories        - create category (admin)
// PUT    /api/categories/:id    - update category (admin)
// DELETE /api/categories/:id    - delete category (admin)

export default router;

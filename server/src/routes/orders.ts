import { Router } from 'express';

const router = Router();

// GET    /api/orders            - list user orders (auth)
// GET    /api/orders/:id        - get order detail (auth)
// POST   /api/orders            - create order from cart (auth)
// PUT    /api/orders/:id/cancel - cancel order (auth)

export default router;

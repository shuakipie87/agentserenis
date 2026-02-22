import { Router } from 'express';

const router = Router();

// GET    /api/cart               - get user cart (auth)
// POST   /api/cart/items         - add item to cart (auth)
// PUT    /api/cart/items/:id     - update cart item quantity (auth)
// DELETE /api/cart/items/:id     - remove item from cart (auth)
// DELETE /api/cart               - clear cart (auth)

export default router;

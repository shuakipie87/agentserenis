import { Router } from 'express';

const router = Router();

// GET    /api/admin/dashboard   - dashboard stats (admin)
// GET    /api/admin/orders      - list all orders (admin)
// PUT    /api/admin/orders/:id/status - update order status (admin)
// GET    /api/admin/users       - list all users (admin)
// PUT    /api/admin/users/:id/role - update user role (admin)

export default router;

import { Router } from 'express';

const router = Router();

// GET    /api/users/me          - get current user profile (auth)
// PUT    /api/users/me          - update profile (auth)
// PUT    /api/users/me/password - change password (auth)
// GET    /api/users/me/addresses - list addresses (auth)
// POST   /api/users/me/addresses - add address (auth)
// PUT    /api/users/me/addresses/:id - update address (auth)
// DELETE /api/users/me/addresses/:id - delete address (auth)

export default router;

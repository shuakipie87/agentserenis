import { Router } from 'express';
import authRouter from './auth';
import productsRouter from './products';
import categoriesRouter from './categories';
import cartRouter from './cart';
import ordersRouter from './orders';
import usersRouter from './users';
import adminRouter from './admin';
import uploadRouter from './upload';
import contactRouter from './contact';

const router = Router();

router.use('/auth', authRouter);
router.use('/products', productsRouter);
router.use('/categories', categoriesRouter);
router.use('/cart', cartRouter);
router.use('/orders', ordersRouter);
router.use('/users', usersRouter);
router.use('/admin', adminRouter);
router.use('/upload', uploadRouter);
router.use('/contact', contactRouter);

export default router;

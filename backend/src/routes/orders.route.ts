import { Router } from 'express';
import * as ordersController from '../controllers/orders.controller';

const router = Router();

router.post('/', ordersController.createOrder);
router.get('/', ordersController.getOrders);

export default router;
import { Router } from 'express';
import * as ordersController from '../controllers/orders.controller';

const router = Router();

router.post('/', ordersController.createOrder);

export default router;
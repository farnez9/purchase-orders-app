import { Router } from 'express';
import { getBestPurchaseOption } from '../controllers/purchase.controller';

const router = Router();

router.get('/', getBestPurchaseOption);

export default router;

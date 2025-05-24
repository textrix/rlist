import { Router } from 'express';
import { getStoragesController } from '../controllers/storageController';

const router = Router();

router.get('/storages', getStoragesController);

export default router;

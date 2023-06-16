import express from 'express';
import { CowController } from './cow.controller';

const router = express.Router();

router.post('/create-cow', CowController.createCow);
router.get('/:id', CowController.getSingleCow);
router.delete('/:id', CowController.deleteCow);
router.patch('/:id', CowController.updateCow);
router.get('/', CowController.getAllCows);

export const CowRoutes = router;

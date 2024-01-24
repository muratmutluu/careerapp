import express from 'express';
import { calculateAhp } from '../controllers/ahp.controller.js';

const router = express.Router();

router.get('/:id', calculateAhp)

export default router;

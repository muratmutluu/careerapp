import express from 'express';
import { createCandidate, getCandidate, getCandidates } from '../controllers/candidate.controller.js';

const router = express.Router();

router.get('/', getCandidates);
router.get('/:id', getCandidate);

router.post('/:id', createCandidate);

export default router;

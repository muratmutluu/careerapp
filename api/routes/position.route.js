import express from 'express';
import {
  compareCriteriaGet,
  compareCriteriaPost,
  createPosition,
  deletePosition,
  getPosition,
  getPositionCriteria,
  getPositions,
} from '../controllers/position.controller.js';

const router = express.Router();

router.get('/:id', getPosition);
router.get('/', getPositions);
router.get('/criteria/:id', getPositionCriteria);
router.get('/compare-criteria/:id', compareCriteriaGet);

router.post('/', createPosition);
router.post('/compare-criteria/:id', compareCriteriaPost);

router.delete('/:id', deletePosition);

export default router;

import express from 'express';
import { protect, adminOnly } from '../middleware/authMiddleware.js';
import * as resourceController from '../controllers/resourceController.js';

const router = express.Router();

router.post('/', protect, adminOnly, resourceController.createResource);
router.get('/:subjectId', protect, resourceController.getResourcesBySubject);
router.delete('/:resourceId', protect, adminOnly, resourceController.deleteResource);

export default router;

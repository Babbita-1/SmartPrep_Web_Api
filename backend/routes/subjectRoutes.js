import express from 'express';
import { protect, adminOnly } from '../middleware/authMiddleware.js';
import * as subjectController from '../controllers/subjectController.js';

const router = express.Router();

// Public: Anyone (Logged in or not) can see all subjects
router.get('/all', subjectController.getAllSubjects);

// Students: Can only see subjects for their grade
router.get('/grade/:gradeLevel', protect, subjectController.getSubjectsByGrade);

// Admin Only: Create & Delete subjects
router.post('/', protect, adminOnly, subjectController.createSubject);
router.delete('/:id', protect, adminOnly, subjectController.deleteSubject);

export default router;

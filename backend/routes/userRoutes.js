import express from 'express';
import { protect, adminOnly } from '../middleware/authMiddleware.js';
import * as userController from '../controllers/userController.js';

const router = express.Router();

// Get all users (Admin Only)
router.get('/', protect, adminOnly, userController.getAllUsers);

// Get single user
router.get('/:id', protect, userController.getUserById);

// Update user profile
router.put('/:id', protect, userController.updateUserProfile);

// Delete user (Admin Only)
router.delete('/:id', protect, adminOnly, userController.deleteUser);

export default router;

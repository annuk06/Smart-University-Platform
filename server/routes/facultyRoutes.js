import express from 'express';
import { getFacultyDashboard, getAllFaculty } from '../controllers/facultyController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/dashboard', protect, authorize('faculty'), getFacultyDashboard);
router.get('/', protect, getAllFaculty);

export default router;

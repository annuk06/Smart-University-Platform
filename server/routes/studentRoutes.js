import express from 'express';
import { getStudentDashboard, getAllStudents } from '../controllers/studentController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/dashboard', protect, authorize('student'), getStudentDashboard);
router.get('/', protect, authorize('admin', 'faculty'), getAllStudents);

export default router;

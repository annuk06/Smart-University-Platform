import User from '../models/User.js';
import Student from '../models/Student.js';
import Faculty from '../models/Faculty.js';
import Course from '../models/Course.js';
import Department from '../models/Department.js';
import Announcement from '../models/Announcement.js';

// @desc    Get admin dashboard data
// @route   GET /api/admin/dashboard
// @access  Private (Admin)
export const getAdminDashboard = async (req, res, next) => {
  try {
    const [totalStudents, totalFaculty, totalCourses, totalDepartments] = await Promise.all([
      Student.countDocuments(),
      Faculty.countDocuments(),
      Course.countDocuments(),
      Department.countDocuments(),
    ]);

    // Recent registered students / applications
    const recentApplications = await Student.find()
      .populate('user', 'name email createdAt status')
      .populate('department', 'name code')
      .sort({ createdAt: -1 })
      .limit(6);

    // Recent announcements
    const recentAnnouncements = await Announcement.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .populate('author', 'name role')
      .populate('department', 'name');

    res.json({
      success: true,
      data: {
        adminName: req.user.name,
        stats: {
          totalStudents,
          totalFaculty,
          totalCourses,
          totalDepartments,
        },
        recentApplications,
        recentAnnouncements,
      },
    });
  } catch (error) {
    next(error);
  }
};

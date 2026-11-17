import Faculty from '../models/Faculty.js';
import Course from '../models/Course.js';
import Student from '../models/Student.js';
import Announcement from '../models/Announcement.js';

// @desc    Get faculty dashboard data
// @route   GET /api/faculty/dashboard
// @access  Private (Faculty)
export const getFacultyDashboard = async (req, res, next) => {
  try {
    let faculty = await Faculty.findOne({ user: req.user._id }).populate('department');

    if (!faculty) {
      faculty = await Faculty.create({
        user: req.user._id,
        facultyId: `FAC${new Date().getFullYear()}${Math.floor(100 + Math.random() * 900)}`,
        designation: 'Associate Professor',
        specialization: 'Computer Systems',
      });
      faculty = await Faculty.findById(faculty._id).populate('department');
    }

    // Find assigned courses for this faculty
    let assignedCourses = await Course.find({ faculty: faculty._id }).populate('department');

    // If no course explicitly linked yet, grab courses from department or system
    if (assignedCourses.length === 0) {
      assignedCourses = await Course.find().limit(3).populate('department');
    }

    // Count total students enrolled across faculty courses or total students in department
    const totalStudentsCount = await Student.countDocuments();

    // Recent announcements targeted to faculty or all
    const announcements = await Announcement.find({
      targetAudience: { $in: ['all', 'faculty'] },
    })
      .sort({ createdAt: -1 })
      .limit(5)
      .populate('author', 'name role');

    res.json({
      success: true,
      data: {
        welcomeMessage: `Welcome Professor, ${req.user.name}!`,
        facultyName: req.user.name,
        facultyId: faculty.facultyId,
        designation: faculty.designation || 'Assistant Professor',
        department: faculty.department ? faculty.department.name : 'Computer Science & Engineering',
        assignedCourses,
        totalStudents: totalStudentsCount,
        recentAnnouncements: announcements,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all faculty
// @route   GET /api/faculty
// @access  Private
export const getAllFaculty = async (req, res, next) => {
  try {
    const facultyList = await Faculty.find()
      .populate('user', 'name email status')
      .populate('department')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: facultyList.length,
      data: facultyList,
    });
  } catch (error) {
    next(error);
  }
};

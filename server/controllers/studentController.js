import Student from '../models/Student.js';
import Announcement from '../models/Announcement.js';
import Course from '../models/Course.js';

// @desc    Get student dashboard data
// @route   GET /api/students/dashboard
// @access  Private (Student)
export const getStudentDashboard = async (req, res, next) => {
  try {
    let student = await Student.findOne({ user: req.user._id })
      .populate('department')
      .populate({
        path: 'enrolledCourses',
        populate: { path: 'faculty', populate: { path: 'user', select: 'name email' } },
      });

    // If no specific student document exists yet, auto-generate a placeholder linked one
    if (!student) {
      student = await Student.create({
        user: req.user._id,
        studentId: `STU${new Date().getFullYear()}${Math.floor(1000 + Math.random() * 9000)}`,
        program: 'Bachelor of Technology (B.Tech)',
        semester: 4,
        attendancePercentage: 88,
      });
      student = await Student.findById(student._id).populate('department').populate('enrolledCourses');
    }

    // If student has no enrolled courses, grab a few sample courses to display
    let courses = student.enrolledCourses || [];
    if (courses.length === 0) {
      courses = await Course.find().limit(4).populate({
        path: 'faculty',
        populate: { path: 'user', select: 'name email' },
      }).populate('department');
    }

    // Get recent announcements targeted to student or all
    const announcements = await Announcement.find({
      targetAudience: { $in: ['all', 'student'] },
    })
      .sort({ createdAt: -1 })
      .limit(5)
      .populate('author', 'name role');

    res.json({
      success: true,
      data: {
        welcomeMessage: `Welcome back, ${req.user.name}!`,
        studentName: req.user.name,
        studentId: student.studentId,
        email: req.user.email,
        department: student.department ? student.department.name : 'Computer Science & Engineering',
        program: student.program || 'Bachelor of Technology (B.Tech)',
        semester: student.semester || 4,
        attendancePercentage: student.attendancePercentage || 88,
        currentCourses: courses,
        recentAnnouncements: announcements,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all students (Admin/Faculty)
// @route   GET /api/students
// @access  Private (Admin, Faculty)
export const getAllStudents = async (req, res, next) => {
  try {
    const students = await Student.find()
      .populate('user', 'name email status createdAt')
      .populate('department')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: students.length,
      data: students,
    });
  } catch (error) {
    next(error);
  }
};

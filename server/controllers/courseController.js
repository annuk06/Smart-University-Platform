import Course from '../models/Course.js';

// @desc    Get all courses
// @route   GET /api/courses
// @access  Public / Authenticated
export const getCourses = async (req, res, next) => {
  try {
    const courses = await Course.find()
      .populate('department', 'name code')
      .populate({
        path: 'faculty',
        populate: { path: 'user', select: 'name email' },
      })
      .sort({ code: 1 });

    res.json({
      success: true,
      count: courses.length,
      data: courses,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create a new course
// @route   POST /api/courses
// @access  Private (Admin, Faculty)
export const createCourse = async (req, res, next) => {
  try {
    const { code, title, department, credits, description, faculty, semester } = req.body;

    if (!code || !title || !department) {
      return res.status(400).json({
        success: false,
        message: 'Please provide course code, title, and department ID.',
      });
    }

    const course = await Course.create({
      code,
      title,
      department,
      credits: credits || 3,
      description,
      faculty,
      semester: semester || 1,
    });

    res.status(201).json({
      success: true,
      data: course,
    });
  } catch (error) {
    next(error);
  }
};

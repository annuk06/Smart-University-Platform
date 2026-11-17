import User from '../models/User.js';
import Student from '../models/Student.js';
import Faculty from '../models/Faculty.js';
import Department from '../models/Department.js';
import generateToken from '../utils/generateToken.js';

// @desc    Register a new student
// @route   POST /api/auth/register
// @access  Public
export const register = async (req, res, next) => {
  try {
    const { name, email, password, departmentId, program, semester } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide name, email, and password.',
      });
    }

    const userExists = await User.findOne({ email: email.toLowerCase() });
    if (userExists) {
      return res.status(400).json({
        success: false,
        message: 'A user with this email already exists.',
      });
    }

    // Default department if none provided
    let deptId = departmentId;
    if (!deptId) {
      const defaultDept = await Department.findOne();
      if (defaultDept) {
        deptId = defaultDept._id;
      }
    }

    const user = await User.create({
      name,
      email: email.toLowerCase(),
      password,
      role: 'student',
    });

    // Generate a student ID
    const studentCount = await Student.countDocuments();
    const studentId = `STU${new Date().getFullYear()}${String(studentCount + 1).padStart(4, '0')}`;

    const student = await Student.create({
      user: user._id,
      studentId,
      department: deptId,
      program: program || 'Bachelor of Technology (B.Tech)',
      semester: semester || 1,
      attendancePercentage: 85,
    });

    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      message: 'Student registered successfully',
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        studentProfile: student,
        token,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Authenticate user & get token
// @route   POST /api/auth/login
// @access  Public
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email and password.',
      });
    }

    const user = await User.findOne({ email: email.toLowerCase() }).select('+password');

    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password.',
      });
    }

    // Fetch role-specific profile
    let profile = null;
    if (user.role === 'student') {
      profile = await Student.findOne({ user: user._id }).populate('department').populate('enrolledCourses');
    } else if (user.role === 'faculty') {
      profile = await Faculty.findOne({ user: user._id }).populate('department');
    }

    const token = generateToken(user._id);

    res.json({
      success: true,
      message: 'Logged in successfully',
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        profile,
        token,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get current user profile
// @route   GET /api/auth/me
// @access  Private
export const getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    let profile = null;

    if (user.role === 'student') {
      profile = await Student.findOne({ user: user._id }).populate('department').populate('enrolledCourses');
    } else if (user.role === 'faculty') {
      profile = await Faculty.findOne({ user: user._id }).populate('department');
    }

    res.json({
      success: true,
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        status: user.status,
        profile,
      },
    });
  } catch (error) {
    next(error);
  }
};

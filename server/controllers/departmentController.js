import Department from '../models/Department.js';

// @desc    Get all departments
// @route   GET /api/departments
// @access  Public
export const getDepartments = async (req, res, next) => {
  try {
    const departments = await Department.find().sort({ name: 1 });
    res.json({
      success: true,
      count: departments.length,
      data: departments,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create a new department
// @route   POST /api/departments
// @access  Private (Admin)
export const createDepartment = async (req, res, next) => {
  try {
    const { name, code, description, headOfDepartment } = req.body;

    if (!name || !code) {
      return res.status(400).json({
        success: false,
        message: 'Please provide department name and code.',
      });
    }

    const department = await Department.create({
      name,
      code,
      description,
      headOfDepartment,
    });

    res.status(201).json({
      success: true,
      data: department,
    });
  } catch (error) {
    next(error);
  }
};

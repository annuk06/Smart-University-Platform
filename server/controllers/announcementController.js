import Announcement from '../models/Announcement.js';

// @desc    Get all announcements
// @route   GET /api/announcements
// @access  Public / Authenticated
export const getAnnouncements = async (req, res, next) => {
  try {
    const { targetAudience } = req.query;
    const filter = {};

    if (targetAudience) {
      filter.targetAudience = { $in: ['all', targetAudience] };
    }

    const announcements = await Announcement.find(filter)
      .populate('author', 'name role')
      .populate('department', 'name code')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: announcements.length,
      data: announcements,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create a new announcement
// @route   POST /api/announcements
// @access  Private (Admin, Faculty)
export const createAnnouncement = async (req, res, next) => {
  try {
    const { title, content, targetAudience, priority, department, category } = req.body;

    if (!title || !content) {
      return res.status(400).json({
        success: false,
        message: 'Please provide title and content for the announcement.',
      });
    }

    const announcement = await Announcement.create({
      title,
      content,
      targetAudience: targetAudience || 'all',
      priority: priority || 'medium',
      department,
      category: category || 'General',
      author: req.user._id,
    });

    const populated = await Announcement.findById(announcement._id).populate('author', 'name role');

    res.status(201).json({
      success: true,
      data: populated,
    });
  } catch (error) {
    next(error);
  }
};

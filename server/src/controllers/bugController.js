const Bug = require('../models/Bug.js');
const { validateBugData, sanitizeInput } = require('../utils/validation.js');

// @desc    Get all bugs
// @route   GET /api/bugs
// @access  Public
const getBugs = async (req, res, next) => {
  try {
    console.log('📊 Fetching bugs - Query params:', req.query);
    
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    
    const filter = {};
    
    // Apply filters
    if (req.query.status) filter.status = req.query.status;
    if (req.query.severity) filter.severity = req.query.severity;
    if (req.query.priority) filter.priority = req.query.priority;
    
    console.log('🔍 Applied filters:', filter);
    
    const bugs = await Bug.find(filter)
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(skip);
    
    const total = await Bug.countDocuments(filter);
    
    console.log(`✅ Found ${bugs.length} bugs out of ${total} total`);
    
    res.status(200).json({
      success: true,
      data: bugs,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('❌ Error in getBugs:', error);
    next(error);
  }
};

// @desc    Get single bug
// @route   GET /api/bugs/:id
// @access  Public
const getBug = async (req, res, next) => {
  try {
    console.log(`🔍 Fetching bug with ID: ${req.params.id}`);
    
    const bug = await Bug.findById(req.params.id);
    
    if (!bug) {
      console.log('❌ Bug not found');
      return res.status(404).json({
        success: false,
        message: 'Bug not found'
      });
    }
    
    console.log('✅ Bug found:', bug.title);
    
    res.status(200).json({
      success: true,
      data: bug
    });
  } catch (error) {
    console.error('❌ Error in getBug:', error);
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid bug ID format'
      });
    }
    next(error);
  }
};

// @desc    Create new bug
// @route   POST /api/bugs
// @access  Public
const createBug = async (req, res, next) => {
  try {
    console.log('📝 Creating new bug:', req.body);
    
    // Sanitize input data
    const sanitizedData = {
      ...req.body,
      title: sanitizeInput(req.body.title),
      description: sanitizeInput(req.body.description),
      reportedBy: sanitizeInput(req.body.reportedBy),
      assignedTo: sanitizeInput(req.body.assignedTo),
      environment: sanitizeInput(req.body.environment),
      stepsToReproduce: sanitizeInput(req.body.stepsToReproduce)
    };
    
    // Validate input
    const validation = validateBugData(sanitizedData);
    if (!validation.isValid) {
      console.log('❌ Validation failed:', validation.errors);
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: validation.errors
      });
    }
    
    const bug = await Bug.create(sanitizedData);
    console.log('✅ Bug created successfully:', bug._id);
    
    res.status(201).json({
      success: true,
      data: bug,
      message: 'Bug created successfully'
    });
  } catch (error) {
    console.error('❌ Error in createBug:', error);
    
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors
      });
    }
    
    next(error);
  }
};

// @desc    Update bug
// @route   PUT /api/bugs/:id
// @access  Public
const updateBug = async (req, res, next) => {
  try {
    console.log(`📝 Updating bug ${req.params.id}:`, req.body);
    
    // Sanitize input data
    const sanitizedData = {
      ...req.body,
      title: sanitizeInput(req.body.title),
      description: sanitizeInput(req.body.description),
      reportedBy: sanitizeInput(req.body.reportedBy),
      assignedTo: sanitizeInput(req.body.assignedTo),
      environment: sanitizeInput(req.body.environment),
      stepsToReproduce: sanitizeInput(req.body.stepsToReproduce)
    };
    
    // Validate input
    const validation = validateBugData(sanitizedData);
    if (!validation.isValid) {
      console.log('❌ Validation failed:', validation.errors);
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: validation.errors
      });
    }
    
    const bug = await Bug.findByIdAndUpdate(
      req.params.id,
      sanitizedData,
      {
        new: true,
        runValidators: true
      }
    );
    
    if (!bug) {
      console.log('❌ Bug not found for update');
      return res.status(404).json({
        success: false,
        message: 'Bug not found'
      });
    }
    
    console.log('✅ Bug updated successfully');
    
    res.status(200).json({
      success: true,
      data: bug,
      message: 'Bug updated successfully'
    });
  } catch (error) {
    console.error('❌ Error in updateBug:', error);
    
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid bug ID format'
      });
    }
    
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors
      });
    }
    
    next(error);
  }
};

// @desc    Delete bug
// @route   DELETE /api/bugs/:id
// @access  Public
const deleteBug = async (req, res, next) => {
  try {
    console.log(`🗑️ Deleting bug ${req.params.id}`);
    
    const bug = await Bug.findByIdAndDelete(req.params.id);
    
    if (!bug) {
      console.log('❌ Bug not found for deletion');
      return res.status(404).json({
        success: false,
        message: 'Bug not found'
      });
    }
    
    console.log('✅ Bug deleted successfully');
    
    res.status(200).json({
      success: true,
      message: 'Bug deleted successfully'
    });
  } catch (error) {
    console.error('❌ Error in deleteBug:', error);
    
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid bug ID format'
      });
    }
    
    next(error);
  }
};

module.exports = {
  getBugs,
  getBug,
  createBug,
  updateBug,
  deleteBug
};
const validateBugData = (bugData) => {
  const errors = [];
  
  // Title validation
  if (!bugData.title || bugData.title.trim().length === 0) {
    errors.push('Title is required');
  } else if (bugData.title.length > 100) {
    errors.push('Title cannot exceed 100 characters');
  }
  
  // Description validation
  if (!bugData.description || bugData.description.trim().length === 0) {
    errors.push('Description is required');
  } else if (bugData.description.length > 1000) {
    errors.push('Description cannot exceed 1000 characters');
  }
  
  // Severity validation
  const validSeverities = ['low', 'medium', 'high', 'critical'];
  if (bugData.severity && !validSeverities.includes(bugData.severity)) {
    errors.push('Severity must be: low, medium, high, or critical');
  }
  
  // Status validation
  const validStatuses = ['open', 'in-progress', 'resolved', 'closed'];
  if (bugData.status && !validStatuses.includes(bugData.status)) {
    errors.push('Status must be: open, in-progress, resolved, or closed');
  }
  
  // Priority validation
  const validPriorities = ['low', 'medium', 'high'];
  if (bugData.priority && !validPriorities.includes(bugData.priority)) {
    errors.push('Priority must be: low, medium, or high');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

function sanitizeInput(input) {
  if (typeof input !== 'string') return input;

  // Remove <script> tags
  let sanitized = input.replace(/<script.*?>.*?<\/script>/gi, '');

  // Remove event handler attributes like onclick="..."
  sanitized = sanitized.replace(/\s*on\w+="[^"]*"/gi, '');

  // Remove javascript: protocol
  sanitized = sanitized.replace(/javascript:/gi, '');

  // Trim whitespace
  return sanitized.trim();
};

module.exports = {
  validateBugData,
  sanitizeInput
};
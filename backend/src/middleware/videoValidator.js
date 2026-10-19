/**
 * CourseHub — Video Input Validation Middleware
 */

const ALLOWED_CATEGORIES = [
  'Cloud Computing',
  'Programming',
  'Web Development',
  'Data Science',
];

const ALLOWED_STATUSES = ['draft', 'transcoding', 'ready'];

export const validateVideoInput = (req, res, next) => {
  const { title, description, category, status } = req.body;
  const errors = [];

  // Title validation
  if (!title || typeof title !== 'string' || title.trim().length === 0) {
    errors.push({ field: 'title', message: 'Title is required and must be a string.' });
  } else if (title.trim().length < 5) {
    errors.push({ field: 'title', message: 'Title must be at least 5 characters long.' });
  } else if (title.trim().length > 150) {
    errors.push({ field: 'title', message: 'Title cannot exceed 150 characters.' });
  }

  // Description validation
  if (!description || typeof description !== 'string' || description.trim().length === 0) {
    errors.push({ field: 'description', message: 'Description is required and must be a string.' });
  } else if (description.trim().length < 15) {
    errors.push({ field: 'description', message: 'Description must be at least 15 characters long.' });
  } else if (description.trim().length > 3000) {
    errors.push({ field: 'description', message: 'Description cannot exceed 3000 characters.' });
  }

  // Category validation
  if (!category || typeof category !== 'string') {
    errors.push({
      field: 'category',
      message: `Category is required. Must be one of: ${ALLOWED_CATEGORIES.join(', ')}.`,
    });
  } else {
    const matchedCategory = ALLOWED_CATEGORIES.find(
      (c) => c.toLowerCase() === category.trim().toLowerCase()
    );
    if (!matchedCategory) {
      errors.push({
        field: 'category',
        message: `Invalid category '${category}'. Allowed categories: ${ALLOWED_CATEGORIES.join(', ')}.`,
      });
    } else {
      // Normalize category casing
      req.body.category = matchedCategory;
    }
  }

  // Status validation (optional)
  if (status && !ALLOWED_STATUSES.includes(status.toLowerCase())) {
    errors.push({
      field: 'status',
      message: `Invalid status '${status}'. Allowed statuses: ${ALLOWED_STATUSES.join(', ')}.`,
    });
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      error: 'Validation Error',
      message: 'One or more required fields failed validation.',
      errors,
    });
  }

  next();
};

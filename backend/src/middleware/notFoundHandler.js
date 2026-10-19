/**
 * CourseHub — 404 Not Found Middleware
 */

export const notFoundHandler = (req, res) => {
  res.status(404).json({
    success: false,
    error: 'Not Found',
    message: `The requested endpoint ${req.method} ${req.originalUrl} does not exist.`,
  });
};

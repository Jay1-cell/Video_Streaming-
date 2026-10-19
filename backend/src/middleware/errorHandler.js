/**
 * CourseHub — Centralized Error Handling Middleware
 * 
 * Securely handles errors without logging sensitive headers, tokens, or passwords.
 */

export const errorHandler = (err, req, res, next) => {
  // Sanitize log: log only method, url, and error message
  console.error(`[API Error] ${req.method} ${req.originalUrl} — ${err.name || 'Error'}: ${err.message}`);

  const statusCode = err.statusCode || err.status || 500;

  res.status(statusCode).json({
    success: false,
    error: err.name || 'Internal Server Error',
    message: err.message || 'An unexpected server error occurred.',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};

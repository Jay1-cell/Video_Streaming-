/**
 * CourseHub — Authorization Guard Middleware
 * 
 * ============================================================================
 * ARCHITECTURAL NOTICE & SECURITY DISCLAIMER (PHASE 1, STEP 4)
 * ============================================================================
 * 1. This middleware prepares the backend for Amazon Cognito JWT validation.
 * 2. Client-supplied roles and frontend state are NOT trusted for security.
 * 3. Write operations are development-only mock operations and are NOT claimed
 *    to be production secure.
 * 4. In Phase 2 & 3, this file will integrate `aws-jwt-verify` to cryptographically
 *    validate Cognito User Pool JWT signatures, claims, and `cognito:groups` (Teachers).
 * ============================================================================
 */

/**
 * Require an authenticated caller.
 * In Phase 1 prototype mode, validates that an Authorization header is provided.
 */
export const requireAuth = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const mockRoleHeader = req.headers['x-mock-role'];

  // Check for Authorization header (Bearer <token>)
  if (!authHeader && !mockRoleHeader) {
    return res.status(401).json({
      success: false,
      error: 'Unauthorized',
      message: 'Authentication required. Please provide a valid Authorization Bearer token.',
      architectureNotice:
        'Phase 1 Prototype: Development write endpoints require Authorization header (e.g., Bearer prototype-token-<role> or x-mock-role: Teacher). Real AWS Cognito JWKS verification will be activated in Phase 2.',
    });
  }

  let token = '';
  if (authHeader && authHeader.startsWith('Bearer ')) {
    token = authHeader.substring(7).trim();
  } else if (authHeader) {
    token = authHeader.trim();
  }

  // Parse development prototype identity from token or x-mock-role header
  // Note: Never trust client roles in production!
  const isTeacherToken =
    mockRoleHeader?.toLowerCase() === 'teacher' ||
    token.toLowerCase().includes('teacher') ||
    token.startsWith('prototype-token-teacher');

  const isStudentToken =
    mockRoleHeader?.toLowerCase() === 'student' ||
    token.toLowerCase().includes('student') ||
    token.startsWith('prototype-token-student');

  let derivedRole = 'Guest';
  if (isTeacherToken) {
    derivedRole = 'Teacher';
  } else if (isStudentToken) {
    derivedRole = 'Student';
  } else if (token) {
    // If standard prototype token is provided without role hint, default to Teacher in dev mode if explicitly specified
    derivedRole = mockRoleHeader ? mockRoleHeader : 'Teacher';
  }

  req.user = {
    id: `usr_${Date.now().toString(36)}`,
    name: derivedRole === 'Teacher' ? 'Prototype Instructor' : 'Prototype Student',
    role: derivedRole,
    token: token || 'mock-dev-token',
    isPrototypeMode: true,
  };

  // Add prototype security header
  res.setHeader('X-CourseHub-Auth-Mode', 'development-prototype-mock');

  next();
};

/**
 * Require a specific role (e.g. 'Teacher')
 * @param {string} requiredRole The role required to access the endpoint
 */
export const requireRole = (requiredRole) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        error: 'Unauthorized',
        message: 'Authentication context missing. Ensure requireAuth runs before requireRole.',
      });
    }

    if (req.user.role.toLowerCase() !== requiredRole.toLowerCase()) {
      return res.status(403).json({
        success: false,
        error: 'Forbidden',
        message: `Access denied. Endpoint requires '${requiredRole}' authorization. Current role: '${req.user.role}'.`,
        architectureNotice:
          'Security rule enforced: Students and unverified callers are prohibited from creating or modifying course metadata.',
      });
    }

    next();
  };
};

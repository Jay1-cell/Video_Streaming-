/**
 * CourseHub — Local Prototype Authentication Service
 * 
 * ============================================================================
 * ARCHITECTURAL NOTICE & SECURITY DISCLAIMER
 * ============================================================================
 * 1. This service is a CLIENT-SIDE PROTOTYPE for Phase 1 local UI testing only.
 * 2. It is NOT secure and NOT production-ready.
 * 3. Client-side route guards control interface visibility only; they DO NOT
 *    provide real security or authorization.
 * 4. Passwords are NEVER stored in plaintext in localStorage or sessionStorage.
 * 5. In production, this service will be replaced with Amazon Cognito User Pools
 *    (or Express backend JWT authentication). Protected backend endpoints must
 *    independently verify Cognito JWT tokens and role claims (Cognito Groups)
 *    before executing any upload, database, or management operations.
 * ============================================================================
 */

const SESSION_STORAGE_KEY = 'coursehub_prototype_user_session';
const REGISTERED_USERS_KEY = 'coursehub_prototype_registered_users';

/**
 * Retrieve the active session user (if any)
 * @returns {object|null}
 */
export const getCurrentUser = () => {
  try {
    const raw = localStorage.getItem(SESSION_STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (err) {
    console.error('Failed to parse prototype session:', err);
    return null;
  }
};

/**
 * Sign in user for prototype session
 * @param {object} credentials { email, password, role }
 * @returns {Promise<object>} User session object
 */
export const login = async ({ email, password, role = 'Student' }) => {
  // Simulate brief network latency for realistic UX
  await new Promise((resolve) => setTimeout(resolve, 250));

  if (!email || !password) {
    throw new Error('Please provide both email and password.');
  }

  // Check if user was registered in local prototype registry
  let existingUsers = [];
  try {
    existingUsers = JSON.parse(localStorage.getItem(REGISTERED_USERS_KEY) || '[]');
  } catch (e) {
    existingUsers = [];
  }

  const foundUser = existingUsers.find((u) => u.email.toLowerCase() === email.toLowerCase());

  let userSession;
  if (foundUser) {
    // If registered, use their chosen role and name
    userSession = {
      id: foundUser.id,
      name: foundUser.name,
      email: foundUser.email,
      role: foundUser.role,
      token: `prototype-token-${Date.now()}-${foundUser.id}`,
      loginTimestamp: new Date().toISOString(),
      isPrototype: true,
    };
  } else {
    // Prototype fallback: allow dynamic login with requested role
    const derivedName = email.split('@')[0].replace(/[._]/g, ' ');
    const formattedName = derivedName.charAt(0).toUpperCase() + derivedName.slice(1);

    userSession = {
      id: `usr_${Date.now()}`,
      name: formattedName || 'Prototype User',
      email: email.toLowerCase(),
      role: role || 'Student',
      token: `prototype-token-${Date.now()}`,
      loginTimestamp: new Date().toISOString(),
      isPrototype: true,
    };
  }

  // Save session (NO passwords stored!)
  localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(userSession));
  return userSession;
};

/**
 * Register a new user in the prototype registry
 * @param {object} userData { name, email, password, role }
 * @returns {Promise<object>} User session object
 */
export const signup = async ({ name, email, password, role }) => {
  await new Promise((resolve) => setTimeout(resolve, 300));

  if (!name || !email || !password || !role) {
    throw new Error('All registration fields are required.');
  }

  if (password.length < 6) {
    throw new Error('Password must be at least 6 characters.');
  }

  let existingUsers = [];
  try {
    existingUsers = JSON.parse(localStorage.getItem(REGISTERED_USERS_KEY) || '[]');
  } catch (e) {
    existingUsers = [];
  }

  const emailExists = existingUsers.some((u) => u.email.toLowerCase() === email.toLowerCase());
  if (emailExists) {
    throw new Error('An account with this email address already exists.');
  }

  // Save to registered list WITHOUT password (for security integrity even in prototype)
  const newUserRecord = {
    id: `usr_${Date.now()}`,
    name: name.trim(),
    email: email.toLowerCase().trim(),
    role: role,
    registeredAt: new Date().toISOString(),
  };

  existingUsers.push(newUserRecord);
  try {
    localStorage.setItem(REGISTERED_USERS_KEY, JSON.stringify(existingUsers));
  } catch (e) {
    console.warn('Could not persist prototype user registry:', e);
  }

  // Auto-login new user
  const userSession = {
    ...newUserRecord,
    token: `prototype-token-${Date.now()}-${newUserRecord.id}`,
    loginTimestamp: new Date().toISOString(),
    isPrototype: true,
  };

  localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(userSession));
  return userSession;
};

/**
 * Terminate active prototype session
 */
export const logout = async () => {
  localStorage.removeItem(SESSION_STORAGE_KEY);
  return true;
};

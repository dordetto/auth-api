import { registerUserService, loginUserService } from '../services/auth.service.js';
import { validatePassword } from '../utils/validation.js';

export async function registerUser(req, res) {
  try {
    const { username, password } = req.body || {};

    if (!username || !password) {
      return res.status(400).json({
        error: 'validation_failed',
        message: 'Username and password are required',
      });
    }

    if (!validatePassword(password)) {
      return res.status(400).json({
        error: 'invalid_password',
        message:
          'Password must be at least 5 characters, include an uppercase letter and a number',
      });
    }

    const result = await registerUserService(username, password);

    if (result.success) {
      return res.status(200).json({
        id: result.id,
        username: result.username,
      });
    } else {
      return res.status(409).json({
        error: 'username_taken',
        message: 'Username already exists',
      });
    }
  } catch (err) {
    console.error('Error in registerUser:', err);
    return res.status(500).json({
      error: 'server_error',
      message: 'Internal server error',
    });
  }
}

export async function loginUser(req, res) {
  try {
    const { username, password } = req.body || {};

    if (!req.is('application/json')) {
      return res.status(400).json({
        error: 'invalid_content_type',
        message: 'Content-Type must be application/json',
      });
    }

    if (!username || !password) {
      return res.status(400).json({
        error: 'validation_failed',
        message: 'Username and password are required',
      });
    }

    const result = await loginUserService(username, password);

    if (result.success) {
      return res.status(200).json({
        token: result.token,
        expires_in: result.expiresIn,
      });
    } else {
      return res.status(401).json({
        error: 'invalid_credentials',
        message: 'Invalid username or password',
      });
    }
  } catch (err) {
    console.error('Error in loginUser:', err);
    return res.status(500).json({
      error: 'server_error',
      message: 'Internal server error',
    });
  }
}

import jwt from 'jsonwebtoken';
import 'dotenv/config';

const JWT_SECRET = process.env.JWT_SECRET;

/**
 * Middleware to validate JWT token in Authorization header
 */
export function authenticateJWT(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      error: 'missing_token',
      message: 'Authorization token is required',
    });
  }

  // Expect header: "Bearer <token>"
  const token = authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({
      error: 'invalid_token',
      message: 'Authorization token malformed',
    });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // Attach user info to request
    next();
  } catch {
    return res.status(401).json({
      error: 'invalid_token',
      message: 'Token is invalid or expired',
    });
  }
}

import 'dotenv/config';
import { createClient } from 'redis';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Redis client setup
const redisClient = createClient({
  url: process.env.REDIS_URL,
});

redisClient.on('error', (err) => console.error('Redis Client Error', err));

await redisClient.connect();

const USER_CACHE_KEY = process.env.USER_CACHE_KEY;

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;

// Helper: Redis key for user
const userKey = (username) => `user:${username}`;

// Password hash settings
const SALT_ROUNDS = 12;

export async function registerUserService(username, password) {
  const key = userKey(username);

  const userExists = await redisClient.exists(key);
  if (userExists) {
    return { success: false }; // username already taken
  }

  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

  // Save user in Redis
  await redisClient.hSet(key, { password: hashedPassword });

  await redisClient.del(USER_CACHE_KEY);

  return {
    success: true,
    id: username,
    username,
  };
}

export async function loginUserService(username, password) {
  const key = userKey(username);

  const user = await redisClient.hGetAll(key);
  if (!user || !user.password) {
    return { success: false };
  }

  // Compare password
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    return { success: false };
  }

  // Generate JWT token
  const token = jwt.sign({ username }, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });

  return {
    success: true,
    token,
    expiresIn: JWT_EXPIRES_IN,
  };
}

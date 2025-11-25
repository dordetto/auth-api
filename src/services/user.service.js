import 'dotenv/config';
import redisClient from './redis.service.js';

const USER_CACHE_KEY = process.env.USER_CACHE_KEY;
const USER_CACHE_TTL = process.env.USER_CACHE_TTL;

export async function listUsersService() {
  // Try to read cache
  const cached = await redisClient.get(USER_CACHE_KEY);
  if (cached) {
    console.log('Users fetched from cache.');
    return JSON.parse(cached);
  }

  // No cache or expired - fetch keys from Redis
  console.log('Users fetched from Redis.');
  const keys = await redisClient.keys('user:*');

  const users = [];
  for (const key of keys) {
    const username = key.replace('user:', '');
    users.push({ username });
  }

  // Save to cache
  await redisClient.setEx(
    USER_CACHE_KEY,
    USER_CACHE_TTL,
    JSON.stringify(users)
  );

  return users;
}

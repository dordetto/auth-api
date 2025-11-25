import { createClient } from 'redis';
import bcrypt from 'bcrypt';
import 'dotenv/config';

export async function seedFirstUser() {
  const client = createClient({
    url: process.env.REDIS_URL,
  });

  client.on('error', (err) => console.error('Redis Client Error', err));

  await client.connect();

  try {
    console.log('Checking for existing users.');

    // Count all keys matching user:<username>, only to decide if we need to seed
    const userKeys = await client.keys('user:*');

    if (userKeys.length > 0) {
      console.log(
        `Redis already has ${userKeys.length} user(s). Seed skipped.`
      );
      return;
    }

    const firstUsername = 'admin';
    const firstPassword = 'Admin123';

    const hashedPassword = await bcrypt.hash(firstPassword, 12);

    await client.hSet(`user:${firstUsername}`, {
      password: hashedPassword,
    });

    console.log('First user created successfully!');
  } catch (err) {
    console.error('Error creating first user:', err);
  } finally {
    await client.quit();
  }
}

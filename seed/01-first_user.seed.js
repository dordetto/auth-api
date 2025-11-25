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

    // Count all keys matching user:<username>
    const userKeys = await client.keys('user:*');

    if (userKeys.length > 0) {
      console.log(
        `Redis already has ${userKeys.length} user(s). Seed skipped.`
      );
      return;
    }

    const adminUsername = 'admin';
    const adminPassword = 'Admin123';

    // Hash admin password
    const hashedPassword = await bcrypt.hash(adminPassword, 12);

    // Create Redis user at key: user:admin
    await client.hSet(`user:${adminUsername}`, {
      password: hashedPassword,
    });

    console.log('Admin user created successfully!');
  } catch (err) {
    console.error('Error creating admin user:', err);
  } finally {
    await client.quit();
  }
}

import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes.js';
import userRoutes from './routes/user.routes.js';

//Workaround that create first user because this solution need to be authenticated to create users
import { seedFirstUser } from '../seed/01-first_user.seed.js'; 
seedFirstUser(); //Run the seed function on server start

dotenv.config();

const app = express();
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/users', userRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Auth API running on port ${PORT}`);
});

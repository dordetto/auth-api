import express from 'express';
import { authenticateJWT } from '../middleware/auth.middleware.js';
import { listUsersController } from '../controllers/user.controller.js';

const router = express.Router();

router.get('/', authenticateJWT, listUsersController);

export default router;

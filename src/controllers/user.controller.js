import { listUsersService } from '../services/user.service.js';

export async function listUsersController(req, res) {
  try {
    const users = await listUsersService();
    return res.json({ users });
  } catch (err) {
    return res
      .status(500)
      .json({ error: 'server_error', message: err.message });
  }
}

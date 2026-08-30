import { beginLogin, endSession } from '../services/adminAuth.service.js';
import { readCookie } from '../middleware/adminSession.js';

const cookieOptions = (maxAge) => ({ httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'lax', path: '/', maxAge });

export class AdminAuthController {
  static async login(req, res, next) {
    try {
      const result = await beginLogin(req.body?.email, req.body?.password);
      res.cookie('mylotic_admin_session', result.rawToken, cookieOptions(8 * 60 * 60 * 1000));
      return res.json({ success: true, message: 'Admin sign-in complete.', admin: result.admin });
    } catch (error) { error.statusCode = error.statusCode || 401; return next(error); }
  }

  static async logout(req, res, next) {
    try {
      const token = readCookie(req, 'mylotic_admin_session');
      if (token) await endSession(token);
      res.clearCookie('mylotic_admin_session', { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'lax', path: '/' });
      return res.json({ success: true, message: 'Signed out.' });
    } catch (error) { return next(error); }
  }

  static async me(req, res) { return res.json({ success: true, admin: req.admin }); }
}

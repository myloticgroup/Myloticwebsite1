import { getSessionAdmin } from '../services/adminAuth.service.js';

function readCookie(request, name) {
  const header = request.headers.cookie || '';
  const pair = header.split(';').map((part) => part.trim()).find((part) => part.startsWith(`${name}=`));
  return pair ? decodeURIComponent(pair.slice(name.length + 1)) : null;
}

export async function requireAdminSession(req, res, next) {
  try {
    const current = await getSessionAdmin(readCookie(req, 'mylotic_admin_session'));
    if (!current) return res.status(401).json({ success: false, message: 'Admin authentication required.' });
    req.admin = current.admin;
    req.adminSession = current.session;
    return next();
  } catch (error) { return next(error); }
}

export { readCookie };

const API_URL = (import.meta.env.VITE_API_URL || (import.meta.env.DEV ? 'http://localhost:5000/api' : '/api')).replace(/\/$/, '');

async function request(path, options = {}) {
  let response;
  try {
    response = await fetch(`${API_URL}${path}`, { credentials: 'include', ...options });
  } catch (error) {
    const networkError = new Error('Unable to reach the admin API. Check that the backend is running and the CORS origin is configured correctly.');
    networkError.cause = error;
    throw networkError;
  }

  let result = {};
  const contentType = response.headers.get('content-type') || '';
  if (contentType.includes('application/json')) {
    result = await response.json().catch(() => ({}));
  } else if (response.status !== 204) {
    result = { message: await response.text().catch(() => 'Request failed.') };
  }

  if (!response.ok || result.success === false) {
    const error = new Error(result.message || 'Something went wrong. Please try again.');
    error.fields = result.errors || {};
    error.status = response.status;
    throw error;
  }

  return result;
}

export const adminLogin = (payload) => request('/admin/auth/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
export const adminMe = () => request('/admin/auth/me');
export const adminLogout = () => request('/admin/auth/logout', { method: 'POST' });
export const adminSummary = () => request('/admin/summary');
export const adminCollection = (name) => request(`/admin/${name}`);
export const adminDetail = (name, id) => request(`/admin/${name}/${id}`);
export const adminUpdate = (name, id, payload) => request(`/admin/${name}/${id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
export const adminResumeUrl = (id) => `${API_URL}/admin/applications/${id}/resume`;

export const submitContact = (payload) => request('/contact', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(payload),
});

export const submitConsultation = (payload) => request('/consultations', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(payload),
});

export const submitTalent = (payload) => request('/talent', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(payload),
});

export const submitCareerApplication = (payload) => request('/careers/apply', {
  method: 'POST',
  body: payload,
});

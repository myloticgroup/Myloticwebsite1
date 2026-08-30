import { useEffect, useMemo, useState } from 'react';
import { Link, Navigate, NavLink, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { adminCollection, adminDetail, adminLogin, adminLogout, adminMe, adminSummary, adminUpdate } from '../services/api';
import './admin.css';

const views = [
  { label: 'Overview', path: '/admin' },
  { label: 'Messages', path: '/admin/messages' },
  { label: 'Consultations', path: '/admin/consultations' },
  { label: 'Talent', path: '/admin/talent' },
  { label: 'Applications', path: '/admin/applications' },
  { label: 'Activity', path: '/admin/activity' },
  { label: 'Admins', path: '/admin/admins' },
];

function formatDisplayLabel(value) {
  const map = {
    fullName: 'Full Name',
    email: 'Email',
    phone: 'Phone',
    company: 'Company',
    service: 'Service',
    requirement: 'Requirement',
    jobTitle: 'Job Title',
    skills: 'Skills',
    location: 'Location',
    message: 'Message',
    coverNote: 'Cover Note',
    consentGiven: 'Consent Given',
    ipAddress: 'IP Address',
    userAgent: 'User Agent',
    submittedAt: 'Submitted At',
    createdAt: 'Created At',
    updatedAt: 'Updated At',
    status: 'Status',
    notes: 'Private Notes',
    internalNotes: 'Private Notes',
    lastLoginAt: 'Last Login',
    isActive: 'Active',
    role: 'Role',
    name: 'Name',
    preferredDate: 'Preferred Date',
    preferredTime: 'Preferred Time',
    linkedinUrl: 'LinkedIn URL',
    portfolioUrl: 'Portfolio URL',
    githubUrl: 'GitHub URL',
  };

  const normalized = String(value || '').replace(/([a-z])([A-Z])/g, '$1 $2').replace(/[_-]+/g, ' ');
  const label = map[value] || normalized;
  return label.replace(/\s+/g, ' ').trim();
}

function formatValue(value) {
  if (value === null || value === undefined || value === '') return '—';
  if (typeof value === 'boolean') return value ? 'Yes' : 'No';
  if (typeof value === 'string') {
    const trimmed = value.trim();
    if (/^\d{4}-\d{2}-\d{2}T/.test(trimmed)) {
      const date = new Date(trimmed);
      return Number.isNaN(date.getTime()) ? trimmed : date.toLocaleString();
    }
    return trimmed;
  }
  return String(value);
}

function getRecordId(record) {
  return record?.id ?? record?._id ?? null;
}

function getNotesValue(record) {
  return record?.notes ?? record?.internalNotes ?? '';
}

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const submit = async (event) => {
    event.preventDefault();
    setBusy(true);
    setError('');
    try {
      await adminLogin({ email, password });
      navigate('/admin', { replace: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <main className="admin-auth">
      <div className="admin-auth-mark">M</div>
      <p className="admin-kicker">Mylotic Group / Internal</p>
      <h1>Mylotic <em>Admin</em></h1>
      <p className="admin-muted">Sign in with your provisioned administrator account.</p>
      <form onSubmit={submit} className="admin-form">
        <label>
          Email
          <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} required autoComplete="username" />
        </label>
        <label>
          Password
          <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} required autoComplete="current-password" />
        </label>
        {error && <p className="admin-error" role="alert">{error}</p>}
        <button className="admin-button" disabled={busy}>{busy ? 'Checking...' : 'Sign in'}</button>
      </form>
      <Link className="admin-back" to="/">Return to website</Link>
    </main>
  );
}

function Protected({ children }) {
  const [state, setState] = useState({ loading: true, admin: null });

  useEffect(() => {
    let active = true;

    adminMe()
      .then((result) => {
        if (active) setState({ loading: false, admin: result?.admin ?? null });
      })
      .catch(() => {
        if (active) setState({ loading: false, admin: null });
      });

    return () => {
      active = false;
    };
  }, []);

  if (state.loading) return <div className="admin-loading">Checking session...</div>;
  return state.admin ? children(state.admin) : <Navigate to="/admin/login" replace />;
}

function Shell({ admin, children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const logout = async () => {
    try {
      await adminLogout();
    } catch (error) {
      console.warn('[Admin] Logout request failed:', error.message);
    }
    navigate('/admin/login', { replace: true });
  };

  const current = views.find((item) => location.pathname === item.path);

  return (
    <div className="admin-shell">
      <aside className={`admin-sidebar ${open ? 'is-open' : ''}`}>
        <div className="admin-brand"><span>M</span><strong>Mylotic<br />Admin</strong></div>
        <nav>
          {views.map((item) => (
            <NavLink end={item.path === '/admin'} key={item.path} to={item.path} onClick={() => setOpen(false)}>
              {item.label}
            </NavLink>
          ))}
        </nav>
        <Link className="admin-site-link" to="/">View website</Link>
      </aside>

      <div className="admin-main">
        <header className="admin-header">
          <button className="admin-menu" onClick={() => setOpen(!open)} aria-label="Toggle navigation">☰</button>
          <div>
            <p className="admin-kicker">Operations</p>
            <h2>{current?.label || 'Admin workspace'}</h2>
          </div>
          <div className="admin-profile">
            <span>{admin.name?.slice(0, 1) || 'A'}</span>
            <div>
              <b>{admin.name}</b>
              <small>{admin.email}</small>
            </div>
            <button onClick={logout} className="admin-text-button">Log out</button>
          </div>
        </header>

        <main className="admin-content">{children}</main>
      </div>
    </div>
  );
}

function Dashboard() {
  const [summary, setSummary] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    setError(false);
    try {
      const result = await adminSummary();
      setSummary(result?.data || {});
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const cards = [
    ['messages', 'New messages'],
    ['consultations', 'Consultations'],
    ['talent', 'Talent profiles'],
    ['applications', 'Applications'],
  ];

  return (
    <section>
      <div className="admin-intro">
        <div>
          <p className="admin-kicker">Today at a glance</p>
          <h1>Keep the signal clear.</h1>
        </div>
        <p>Live activity from your public forms and careers pipeline.</p>
      </div>

      {error && (
        <div className="admin-error-state">
          <p>Unable to load dashboard data.</p>
          <button className="admin-link-button" onClick={load}>Retry</button>
        </div>
      )}

      <div className="admin-cards">
        {cards.map(([key, label]) => (
          <div className="admin-card" key={key}>
            <span>{label}</span>
            <strong>{loading ? '—' : summary?.[key] ?? 0}</strong>
            <small>{loading ? 'Loading' : `${summary?.[`new${key[0].toUpperCase()}${key.slice(1)}`] ?? 0} new`}</small>
          </div>
        ))}
      </div>

      <div className="admin-empty">
        <p className="admin-kicker">Workspace status</p>
        <h3>One place for every conversation.</h3>
        <p>Review leads, update statuses, add private notes, and move candidates through the hiring process.</p>
      </div>
    </section>
  );
}

const config = {
  'contact-leads': { title: 'Messages', fields: ['fullName', 'email', 'company', 'service', 'status'], statuses: ['NEW', 'CONTACTED', 'QUALIFIED', 'CONVERTED', 'CLOSED'] },
  'consultation-leads': { title: 'Consultations', fields: ['fullName', 'email', 'company', 'requirement', 'status'], statuses: ['NEW', 'CONTACTED', 'QUALIFIED', 'CONVERTED', 'CLOSED'] },
  'talent-leads': { title: 'Talent', fields: ['fullName', 'email', 'skills', 'status'], statuses: ['NEW', 'CONTACTED', 'QUALIFIED', 'ARCHIVED'] },
  applications: { title: 'Applications', fields: ['fullName', 'email', 'jobTitle', 'status'], statuses: ['APPLIED', 'UNDER_REVIEW', 'SHORTLISTED', 'INTERVIEW', 'SELECTED', 'REJECTED'] },
};

function Records({ type }) {
  const itemConfig = config[type];
  const [records, setRecords] = useState([]);
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(null);
  const [notes, setNotes] = useState('');
  const [statusDraft, setStatusDraft] = useState(itemConfig?.statuses?.[0] ?? '');
  const [listError, setListError] = useState('');
  const [listLoading, setListLoading] = useState(true);
  const [detailLoading, setDetailLoading] = useState(false);
  const [detailError, setDetailError] = useState('');
  const [saving, setSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');

  const load = async () => {
    setListLoading(true);
    setListError('');

    try {
      const result = await adminCollection(type);
      const nextRecords = Array.isArray(result?.data) ? result.data : [];
      setRecords(nextRecords);

      if (selected && !nextRecords.some((record) => getRecordId(record) === getRecordId(selected))) {
        setSelected(null);
      }
    } catch (err) {
      setListError(err.message || 'Unable to load records.');
      setRecords([]);
    } finally {
      setListLoading(false);
    }
  };

  useEffect(() => {
    setSelected(null);
    setNotes('');
    setStatusDraft(itemConfig?.statuses?.[0] ?? '');
    setListError('');
    setDetailError('');
    setSaveMessage('');
    load();
  }, [type]);

  const filtered = useMemo(() => {
    const term = query.toLowerCase();
    return records.filter((record) => Object.values(record ?? {}).join(' ').toLowerCase().includes(term));
  }, [records, query]);

  const choose = async (record) => {
    const recordId = getRecordId(record);
    setSelected({ ...record, isDetailLoading: true });
    setNotes(getNotesValue(record));
    setStatusDraft(record?.status ?? itemConfig.statuses[0]);
    setDetailError('');
    setSaveMessage('');

    try {
      setDetailLoading(true);
      const result = await adminDetail(type, recordId);
      const nextRecord = result?.data ?? record;
      setSelected(nextRecord);
      setNotes(getNotesValue(nextRecord));
      setStatusDraft(nextRecord?.status ?? itemConfig.statuses[0]);
    } catch (err) {
      setDetailError(err.message || 'Unable to load this record.');
      setSelected(record);
    } finally {
      setDetailLoading(false);
    }
  };

  const saveRecord = async () => {
    if (!selected) return;

    const recordId = getRecordId(selected);
    if (!recordId) return;

    setSaving(true);
    setDetailError('');
    setSaveMessage('');

    try {
      const payload = type === 'applications' ? { status: statusDraft, internalNotes: notes } : { status: statusDraft, notes };
      const result = await adminUpdate(type, recordId, payload);
      const nextRecord = result?.data ?? { ...selected, status: statusDraft, ...(type === 'applications' ? { internalNotes: notes } : { notes }) };

      setSelected(nextRecord);
      setNotes(getNotesValue(nextRecord));
      setStatusDraft(nextRecord?.status ?? statusDraft);
      setRecords((current) => current.map((record) => (getRecordId(record) === recordId ? nextRecord : record)));
      setSaveMessage('Record updated.');
    } catch (err) {
      setDetailError(err.message || 'Unable to save this record.');
    } finally {
      setSaving(false);
    }
  };

  const closeRecord = () => {
    setSelected(null);
    setNotes('');
    setStatusDraft(itemConfig?.statuses?.[0] ?? '');
    setDetailError('');
    setSaveMessage('');
  };

  return (
    <section>
      <div className="admin-section-heading">
        <div>
          <p className="admin-kicker">Live records</p>
          <h1>{itemConfig.title}</h1>
        </div>
        <input className="admin-search" placeholder={`Search ${itemConfig.title.toLowerCase()}...`} value={query} onChange={(event) => setQuery(event.target.value)} />
      </div>

      {listError && <p className="admin-error" role="alert">{listError}</p>}

      <div className="admin-table-wrap">
        {listLoading ? (
          <div className="admin-table-empty">Loading {itemConfig.title.toLowerCase()}...</div>
        ) : (
          <>
            <table>
              <thead>
                <tr>
                  {itemConfig.fields.map((field) => <th key={field}>{formatDisplayLabel(field)}</th>)}
                  <th />
                </tr>
              </thead>
              <tbody>
                {filtered.map((record, index) => {
                  const recordId = getRecordId(record) || `record-${index}`;
                  return (
                    <tr key={recordId} onClick={() => choose(record)}>
                      {itemConfig.fields.map((field) => (
                        <td key={`${recordId}-${field}`}>
                          {field === 'status' ? <span className="admin-status">{record.status || '—'}</span> : formatValue(record[field])}
                        </td>
                      ))}
                      <td>
                        <button className="admin-link-button" onClick={(event) => { event.stopPropagation(); choose(record); }}>
                          View
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            {!filtered.length && <div className="admin-table-empty">No records match this search.</div>}
          </>
        )}
      </div>

      {selected && (
        <div className="admin-drawer">
          <div className="admin-drawer-header">
            <div>
              <p className="admin-kicker">Record details</p>
              <h3>{selected.fullName || selected.email || 'Record detail'}</h3>
            </div>
            <button className="admin-close" onClick={closeRecord}>Close</button>
          </div>

          {detailLoading && <div className="admin-table-empty">Loading record details...</div>}
          {detailError && <p className="admin-error" role="alert">{detailError}</p>}

          {!detailLoading && (
            <>
              <div className="admin-detail-grid">
                {['fullName', 'email', 'phone', 'company', 'service', 'requirement', 'jobTitle', 'skills', 'location', 'message', 'coverNote', 'consentGiven', 'ipAddress', 'userAgent', 'submittedAt', 'createdAt', 'updatedAt', 'status', 'notes', 'internalNotes'].filter((field) => selected[field] !== null && selected[field] !== undefined && selected[field] !== '').map((field) => (
                  <div key={field} className="admin-detail-item">
                    <span>{formatDisplayLabel(field)}</span>
                    <strong>{field === 'status' ? selected[field] : formatValue(selected[field])}</strong>
                  </div>
                ))}
              </div>

              <div className="admin-drawer-block">
                <label>
                  Status
                  <select value={statusDraft} onChange={(event) => setStatusDraft(event.target.value)} disabled={saving}>
                    {itemConfig.statuses.map((status) => <option key={status} value={status}>{status}</option>)}
                  </select>
                </label>

                <label>
                  Private Notes
                  <textarea value={notes} onChange={(event) => setNotes(event.target.value)} rows={6} disabled={saving} />
                </label>
              </div>

              {saveMessage && <p className="admin-feedback" role="status">{saveMessage}</p>}
              <button className="admin-button" onClick={saveRecord} disabled={saving}>{saving ? 'Saving...' : 'Save changes'}</button>
            </>
          )}
        </div>
      )}
    </section>
  );
}

function Activity() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const load = async () => {
    setLoading(true);
    setError(false);
    try {
      const result = await adminCollection('activity');
      setItems(Array.isArray(result?.data) ? result.data : []);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <section>
      <p className="admin-kicker">Audit trail</p>
      <h1>Activity</h1>
      {error && (
        <div className="admin-error-state">
          <p>Unable to load activity.</p>
          <button className="admin-link-button" onClick={load}>Retry</button>
        </div>
      )}

      <div className="admin-table-wrap">
        {loading ? (
          <div className="admin-table-empty">Loading activity...</div>
        ) : (
          <>
            <table>
              <thead>
                <tr>
                  <th>Action</th>
                  <th>Summary</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.id || item._id}>
                    <td><span className="admin-status">{item.action || '—'}</span></td>
                    <td>{item.summary || '—'}</td>
                    <td>{item.createdAt ? new Date(item.createdAt).toLocaleString() : '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {!items.length && <div className="admin-table-empty">No activity recorded yet.</div>}
          </>
        )}
      </div>
    </section>
  );
}

function Admins() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [feedback, setFeedback] = useState('');

  const load = async () => {
    setLoading(true);
    setError('');
    try {
      const result = await adminCollection('admins');
      setItems(Array.isArray(result?.data) ? result.data : []);
    } catch {
      setError('Unable to load administrators.');
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const toggle = async (item) => {
    const action = item.isActive ? 'deactivate' : 'reactivate';
    if (!window.confirm(`Are you sure you want to ${action} ${item.name || 'this administrator'}?`)) return;

    setError('');
    setFeedback('');

    try {
      await adminUpdate('admins', item._id || item.id, { isActive: !item.isActive });
      setFeedback(`Administrator ${item.isActive ? 'deactivated' : 'reactivated'}.`);
      await load();
    } catch {
      setError('Unable to update administrator status.');
    }
  };

  return (
    <section>
      <p className="admin-kicker">Access control</p>
      <h1>Admins</h1>
      {error && <p className="admin-error" role="alert">{error}</p>}
      {feedback && <p className="admin-feedback" role="status">{feedback}</p>}
      <div className="admin-table-wrap">
        {loading ? (
          <div className="admin-table-empty">Loading administrators...</div>
        ) : !items.length ? (
          <div className="admin-table-empty">No administrators found.</div>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
                <th>Created</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item._id || item.id}>
                  <td>{item.name || '—'}</td>
                  <td>{item.email || '—'}</td>
                  <td>{item.role || '—'}</td>
                  <td><span className="admin-status">{item.isActive ? 'ACTIVE' : 'INACTIVE'}</span></td>
                  <td>{item.createdAt ? new Date(item.createdAt).toLocaleDateString() : '—'}</td>
                  <td><button className="admin-link-button" onClick={() => toggle(item)}>{item.isActive ? 'Deactivate' : 'Reactivate'}</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </section>
  );
}

export default function AdminPanel() {
  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route path="*" element={
        <Protected>
          {(admin) => (
            <Shell admin={admin}>
              <Routes>
                <Route index element={<Dashboard />} />
                <Route path="messages" element={<Records type="contact-leads" />} />
                <Route path="consultations" element={<Records type="consultation-leads" />} />
                <Route path="talent" element={<Records type="talent-leads" />} />
                <Route path="applications" element={<Records type="applications" />} />
                <Route path="activity" element={<Activity />} />
                <Route path="admins" element={<Admins />} />
                <Route path="*" element={<Navigate to="/admin" replace />} />
              </Routes>
            </Shell>
          )}
        </Protected>
      } />
    </Routes>
  );
}

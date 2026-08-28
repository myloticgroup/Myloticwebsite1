import { useEffect, useMemo, useState } from 'react';
import { Link, Navigate, NavLink, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { adminCollection, adminDetail, adminLogin, adminLogout, adminMe, adminResumeUrl, adminSummary, adminUpdate } from '../services/api';
import './admin.css';

const views = [{ label: 'Overview', path: '/admin' }, { label: 'Messages', path: '/admin/messages' }, { label: 'Consultations', path: '/admin/consultations' }, { label: 'Talent', path: '/admin/talent' }, { label: 'Applications', path: '/admin/applications' }, { label: 'Activity', path: '/admin/activity' }, { label: 'Admins', path: '/admin/admins' }];

function Login() {
  const navigate = useNavigate(); const [email, setEmail] = useState(''); const [password, setPassword] = useState(''); const [error, setError] = useState(''); const [busy, setBusy] = useState(false);
  const submit = async (event) => { event.preventDefault(); setBusy(true); setError(''); try { await adminLogin({ email, password }); navigate('/admin'); } catch (err) { setError(err.message); } finally { setBusy(false); } };
  return <main className="admin-auth"><div className="admin-auth-mark">M</div><p className="admin-kicker">Mylotic Group / Internal</p><h1>Mylotic <em>Admin</em></h1><p className="admin-muted">Sign in with your provisioned administrator account.</p><form onSubmit={submit} className="admin-form"><label>Email<input type="email" value={email} onChange={(event) => setEmail(event.target.value)} required autoComplete="username" /></label><label>Password<input type="password" value={password} onChange={(event) => setPassword(event.target.value)} required autoComplete="current-password" /></label>{error && <p className="admin-error" role="alert">{error}</p>}<button className="admin-button" disabled={busy}>{busy ? 'Checking...' : 'Sign in'}</button></form><Link className="admin-back" to="/">Return to website</Link></main>;
}

function Protected({ children }) { const [state, setState] = useState({ loading: true, admin: null }); useEffect(() => { adminMe().then((result) => setState({ loading: false, admin: result.admin })).catch(() => setState({ loading: false, admin: null })); }, []); if (state.loading) return <div className="admin-loading">Checking session...</div>; return state.admin ? children(state.admin) : <Navigate to="/admin/login" replace />; }

function Shell({ admin, children }) { const navigate = useNavigate(); const location = useLocation(); const [open, setOpen] = useState(false); const logout = async () => { await adminLogout().catch(() => {}); navigate('/admin/login', { replace: true }); }; const current = views.find((item) => location.pathname === item.path);
  return <div className="admin-shell"><aside className={`admin-sidebar ${open ? 'is-open' : ''}`}><div className="admin-brand"><span>M</span><strong>Mylotic<br />Admin</strong></div><nav>{views.map((item) => <NavLink end={item.path === '/admin'} key={item.path} to={item.path} onClick={() => setOpen(false)}>{item.label}</NavLink>)}</nav><Link className="admin-site-link" to="/">View website</Link></aside><div className="admin-main"><header className="admin-header"><button className="admin-menu" onClick={() => setOpen(!open)} aria-label="Toggle navigation">☰</button><div><p className="admin-kicker">Operations</p><h2>{current?.label || 'Admin workspace'}</h2></div><div className="admin-profile"><span>{admin.name?.slice(0, 1) || 'A'}</span><div><b>{admin.name}</b><small>{admin.email}</small></div><button onClick={logout} className="admin-text-button">Log out</button></div></header><main className="admin-content">{children}</main></div></div>;
}

function Dashboard() {
  const [summary, setSummary] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const load = async () => {
    setLoading(true);
    setError(false);
    try { const result = await adminSummary(); setSummary(result?.data || {}); } catch { setError(true); } finally { setLoading(false); }
  };
  useEffect(() => { load(); }, []);
  const cards = [['messages', 'New messages'], ['consultations', 'Consultations'], ['talent', 'Talent profiles'], ['applications', 'Applications']];
  return <section><div className="admin-intro"><div><p className="admin-kicker">Today at a glance</p><h1>Keep the signal clear.</h1></div><p>Live activity from your public forms and careers pipeline.</p></div>{error && <div className="admin-error-state"><p>Unable to load dashboard data.</p><button className="admin-link-button" onClick={load}>Retry</button></div>}<div className="admin-cards">{cards.map(([key, label]) => <div className="admin-card" key={key}><span>{label}</span><strong>{loading ? '—' : summary?.[key] ?? 0}</strong><small>{loading ? 'Loading' : `${summary?.[`new${key[0].toUpperCase()}${key.slice(1)}`] || 0} new`}</small></div>)}</div><div className="admin-empty"><p className="admin-kicker">Workspace status</p><h3>One place for every conversation.</h3><p>Review leads, update statuses, add private notes, and move candidates through the hiring process.</p></div></section>;
}

const config = { 'contact-leads': { title: 'Messages', fields: ['fullName', 'email', 'company', 'service', 'status'], statuses: ['NEW', 'CONTACTED', 'QUALIFIED', 'CONVERTED', 'CLOSED'] }, 'consultation-leads': { title: 'Consultations', fields: ['fullName', 'email', 'company', 'requirement', 'status'], statuses: ['NEW', 'CONTACTED', 'QUALIFIED', 'CONVERTED', 'CLOSED'] }, 'talent-leads': { title: 'Talent', fields: ['fullName', 'email', 'skills', 'status'], statuses: ['NEW', 'CONTACTED', 'QUALIFIED', 'ARCHIVED'] }, applications: { title: 'Applications', fields: ['fullName', 'email', 'jobTitle', 'status'], statuses: ['APPLIED', 'UNDER_REVIEW', 'SHORTLISTED', 'INTERVIEW', 'SELECTED', 'REJECTED'] } };

function Records({ type }) { const itemConfig = config[type]; const [records, setRecords] = useState([]); const [query, setQuery] = useState(''); const [selected, setSelected] = useState(null); const [notes, setNotes] = useState(''); const [error, setError] = useState(''); const load = () => adminCollection(type).then((result) => setRecords(result.data || [])).catch((err) => setError(err.message)); useEffect(() => { load(); }, [type]); const filtered = useMemo(() => records.filter((record) => Object.values(record).join(' ').toLowerCase().includes(query.toLowerCase())), [records, query]); const choose = async (record) => { setSelected(record); setNotes(record.notes || record.internalNotes || ''); try { const result = await adminDetail(type, record.id || record._id); setSelected(result.data); setNotes(result.data.notes || result.data.internalNotes || ''); } catch (err) { setError(err.message); } }; const update = async (status) => { try { const result = await adminUpdate(type, selected.id || selected._id, type === 'applications' ? { status, internalNotes: notes } : { status, notes }); setSelected(result.data); setRecords(records.map((record) => (record.id || record._id) === (selected.id || selected._id) ? result.data : record)); } catch (err) { setError(err.message); } }; return <section><div className="admin-section-heading"><div><p className="admin-kicker">Live records</p><h1>{itemConfig.title}</h1></div><input className="admin-search" placeholder={`Search ${itemConfig.title.toLowerCase()}...`} value={query} onChange={(event) => setQuery(event.target.value)} /></div>{error && <p className="admin-error">{error}</p>}<div className="admin-table-wrap"><table><thead><tr>{itemConfig.fields.map((field) => <th key={field}>{field.replace(/([A-Z])/g, ' $1')}</th>)}<th /></tr></thead><tbody>{filtered.map((record) => <tr key={record.id || record._id} onClick={() => choose(record)}>{itemConfig.fields.map((field) => <td key={field}>{field === 'status' ? <span className="admin-status">{record[field]}</span> : String(record[field] || '—')}</td>)}<td><button className="admin-link-button">Open</button></td></tr>)}</tbody></table>{!filtered.length && <div className="admin-table-empty">No records match this search.</div>}</div>{selected && <div className="admin-drawer"><button className="admin-close" onClick={() => setSelected(null)}>Close</button><p className="admin-kicker">Record detail</p><h2>{selected.fullName || selected.jobTitle}</h2><p className="admin-muted">{selected.email} {selected.phone && `· ${selected.phone}`}</p><dl>{Object.entries(selected).filter(([key]) => !['_id', '__v', 'notes', 'internalNotes', 'status'].includes(key)).map(([key, value]) => <div key={key}><dt>{key}</dt><dd>{Array.isArray(value) ? value.join(', ') : String(value || '—')}</dd></div>)}</dl><label>Status<select value={selected.status} onChange={(event) => update(event.target.value)}>{itemConfig.statuses.map((status) => <option key={status}>{status}</option>)}</select></label><label>Private notes<textarea value={notes} onChange={(event) => setNotes(event.target.value)} rows="4" placeholder="Add an internal note" /></label><button className="admin-button" onClick={() => update(selected.status)}>Save notes</button>{type === 'applications' && (selected.id || selected._id) && <a className="admin-resume" href={adminResumeUrl(selected.id || selected._id)} target="_blank" rel="noreferrer">Download resume</a>}</div>}</section>; }

function Activity() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const load = async () => {
    setLoading(true);
    setError(false);
    try { const result = await adminCollection('activity'); setItems(Array.isArray(result?.data) ? result.data : []); } catch { setError(true); } finally { setLoading(false); }
  };
  useEffect(() => { load(); }, []);
  return <section><p className="admin-kicker">Audit trail</p><h1>Activity</h1>{error && <div className="admin-error-state"><p>Unable to load activity.</p><button className="admin-link-button" onClick={load}>Retry</button></div>}<div className="admin-table-wrap">{loading ? <div className="admin-table-empty">Loading activity...</div> : <><table><thead><tr><th>Action</th><th>Summary</th><th>Date</th></tr></thead><tbody>{items.map((item) => <tr key={item.id || item._id}><td><span className="admin-status">{item.action || '—'}</span></td><td>{item.summary || '—'}</td><td>{item.createdAt ? new Date(item.createdAt).toLocaleString() : '—'}</td></tr>)}</tbody></table>{!items.length && <div className="admin-table-empty">No activity recorded yet.</div>}</>}</div></section>;
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

  return <section>
    <p className="admin-kicker">Access control</p>
    <h1>Admins</h1>
    {error && <p className="admin-error" role="alert">{error}</p>}
    {feedback && <p className="admin-feedback" role="status">{feedback}</p>}
    <div className="admin-table-wrap">
      {loading ? <div className="admin-table-empty">Loading administrators...</div> : !items.length ? <div className="admin-table-empty">No administrators found.</div> : <table>
        <thead><tr><th>Name</th><th>Email</th><th>Role</th><th>Status</th><th>Created</th><th /></tr></thead>
        <tbody>{items.map((item) => <tr key={item._id || item.id}>
          <td>{item.name || '—'}</td>
          <td>{item.email || '—'}</td>
          <td>{item.role || '—'}</td>
          <td><span className="admin-status">{item.isActive ? 'ACTIVE' : 'INACTIVE'}</span></td>
          <td>{item.createdAt ? new Date(item.createdAt).toLocaleDateString() : '—'}</td>
          <td><button className="admin-link-button" onClick={() => toggle(item)}>{item.isActive ? 'Deactivate' : 'Reactivate'}</button></td>
        </tr>)}</tbody>
      </table>}
    </div>
  </section>;
}

export default function AdminPanel() { return <Routes><Route path="login" element={<Login />} /><Route path="*" element={<Protected>{(admin) => <Shell admin={admin}><Routes><Route index element={<Dashboard />} /><Route path="messages" element={<Records type="contact-leads" />} /><Route path="consultations" element={<Records type="consultation-leads" />} /><Route path="talent" element={<Records type="talent-leads" />} /><Route path="applications" element={<Records type="applications" />} /><Route path="activity" element={<Activity />} /><Route path="admins" element={<Admins />} /><Route path="*" element={<Navigate to="/admin" replace />} /></Routes></Shell>}</Protected>} /></Routes>; }
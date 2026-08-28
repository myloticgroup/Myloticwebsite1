import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { jobs } from '../data/siteData';
import { submitCareerApplication } from '../services/api';
import { ButtonLink, Eyebrow } from '../components/SiteShell';
import { Field } from '../components/forms/LeadForms';
import { Hero, NotFound } from '../components/common/PagePrimitives';

export default function CareerApplication() {
  const { slug } = useParams();
  const job = jobs.find((entry) => entry.slug === slug);
  const [form, setForm] = useState({});
  const [state, setState] = useState({});
  if (!job) return <NotFound />;
  const update = (event) => setForm({ ...form, [event.target.name]: event.target.type === 'file' ? event.target.files[0] : event.target.value });
  const submit = async (event) => {
    event.preventDefault();
    if (!form.resume) return setState({ error: 'Please attach your resume.' });
    const payload = new FormData();
    Object.entries({ ...form, jobId: job.slug, jobTitle: job.title, consentGiven: 'true' }).forEach(([key, value]) => payload.append(key, value));
    setState({ loading: true });
    try { const result = await submitCareerApplication(payload); setState({ status: result.message }); setForm({}); }
    catch (error) { setState({ error: error.message }); }
  };
  return <><Hero eyebrow="Careers / Role" title={job.title} text={job.description}><span className="job-meta">{job.type} · {job.location}</span></Hero><section className="band job-detail"><div><Eyebrow>What you'll bring</Eyebrow>{job.skills.map((skill) => <p className="skill" key={skill}>+ {skill}</p>)}</div><div>{state.status && <div className="form-status success" role="status">{state.status}</div>}{state.error && <div className="form-status error" role="alert">{state.error}</div>}<form className="lead-form" onSubmit={submit}><Field label="Full name" name="fullName" value={form.fullName || ''} onChange={update} required/><Field label="Email" name="email" type="email" value={form.email || ''} onChange={update} required/><Field label="Phone" name="phone" value={form.phone || ''} onChange={update} required/><Field label="Current location" name="location" value={form.location || ''} onChange={update} required/><label className="field file-field"><span>Resume (PDF, DOC, DOCX · max 10MB) *</span><input name="resume" type="file" accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document" onChange={update} required/></label><Field label="Cover note (optional)" name="coverNote" value={form.coverNote || ''} onChange={update} textarea/><button className="button form-submit" disabled={state.loading}>{state.loading ? 'Sending...' : 'Submit application'}<span aria-hidden="true">↗</span></button></form></div></section></>;
}

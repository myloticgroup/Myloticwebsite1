import { Link, Navigate, Route, Routes } from 'react-router-dom';
import { PageFrame } from './components/SiteShell';
import { ContactForm, ConsultationForm, TalentForm } from './components/forms/LeadForms';
import CareerApplication from './pages/CareerApplication';
import AdminPanel from './pages/AdminPanel';
import {
  Home, Company, Approach, Leadership, Solutions, SolutionDetail, Industries,
  IndustryDetail, Work, WorkDetail, Technology, Careers, Blog, BlogDetail, Legal,
} from './pages/SitePages';

export default function App() {
  return <Routes>
    <Route path="/admin/*" element={<AdminPanel />} />
    <Route path="*" element={<PageFrame><Routes>
    <Route path="/" element={<Home />} />
    <Route path="/company" element={<Company />} />
    <Route path="/company/approach" element={<Approach />} />
    <Route path="/company/leadership" element={<Leadership />} />
    <Route path="/solutions" element={<Solutions />} />
    <Route path="/solutions/:slug" element={<SolutionDetail />} />
    <Route path="/industries" element={<Industries />} />
    <Route path="/industries/:slug" element={<IndustryDetail />} />
    <Route path="/work" element={<Work />} />
    <Route path="/work/:slug" element={<WorkDetail />} />
    <Route path="/technology" element={<Technology />} />
    <Route path="/careers" element={<Careers />} />
    <Route path="/careers/talent" element={<TalentForm />} />
    <Route path="/careers/:slug" element={<CareerApplication />} />
    <Route path="/blog" element={<Blog />} />
    <Route path="/insights" element={<Navigate to="/blog" replace />} />
    <Route path="/blog/:slug" element={<BlogDetail />} />
    <Route path="/contact" element={<ContactForm />} />
    <Route path="/contact/education-consultation" element={<ConsultationForm />} />
    <Route path="/privacy" element={<Legal title="Privacy, plainly stated." label="Privacy" />} />
    <Route path="/terms" element={<Legal title="The terms of working together." label="Terms" />} />
    <Route path="/security" element={<Legal title="Security is a practice." label="Security" />} />
    <Route path="*" element={<section className="not-found"><p className="eyebrow">404 / Page not found</p><h1>That page took<br /><em>a different route.</em></h1><Link className="button" to="/">Return home</Link></section>} />
  </Routes></PageFrame>} />
  </Routes>;
}

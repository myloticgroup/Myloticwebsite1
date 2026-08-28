import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { company, navItems } from '../data/siteData';

export function Header() {
  const [open, setOpen] = useState(false);
  return <header className="site-header">
    <div className="header-inner">
      <Link className="brand" to="/" onClick={() => setOpen(false)}><span className="brand-mark">M</span><span>{company.name}</span></Link>
      <nav className={`main-nav ${open ? 'is-open' : ''}`} aria-label="Main navigation">
        {navItems.map((item) => <NavLink key={item.to} to={item.to} onClick={() => setOpen(false)}>{item.label}</NavLink>)}
        <Link className="nav-contact" to="/contact" onClick={() => setOpen(false)}>Start a conversation <span>↗</span></Link>
      </nav>
      <button className="menu-button" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} onClick={() => setOpen(!open)}><span></span><span></span></button>
    </div>
  </header>;
}

export function Footer() {
  return <footer className="site-footer"><div className="footer-grid">
    <div><Link className="brand footer-brand" to="/"><span className="brand-mark">M</span><span>{company.name}</span></Link><p>{company.summary}</p><a href={`mailto:${company.email}`} className="footer-email">{company.email}</a></div>
    <div><p className="footer-label">Explore</p><Link to="/company">Company</Link><Link to="/solutions">Solutions</Link><Link to="/work">Our work</Link><Link to="/blog">Insights</Link></div>
    <div><p className="footer-label">Connect</p><Link to="/contact">Contact us</Link><Link to="/contact/education-consultation">Education consultation</Link><Link to="/careers">Join the team</Link><Link to="/admin/login">Admin</Link></div>
  </div><div className="footer-bottom"><span>© {new Date().getFullYear()} Mylotic Group</span><span><Link to="/privacy">Privacy</Link><Link to="/terms">Terms</Link><Link to="/security">Security</Link></span></div></footer>;
}

export function PageFrame({ children }) { return <><a className="skip-link" href="#main-content">Skip to content</a><Header /><main id="main-content">{children}</main><Footer /></>; }
export function Eyebrow({ children }) { return <p className="eyebrow">{children}</p>; }
export function ButtonLink({ to, children, secondary = false }) { return <Link className={`button ${secondary ? 'button-secondary' : ''}`} to={to}>{children}<span>↗</span></Link>; }
export function SectionHeading({ eyebrow, title, text }) { return <div className="section-heading">{eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}<h2>{title}</h2>{text && <p>{text}</p>}</div>; }

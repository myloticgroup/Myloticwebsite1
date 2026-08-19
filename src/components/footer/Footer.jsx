import './footer.css';

function LinkedInIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function TwitterIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function LocationIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

const QUICK_LINKS = [
  { label: 'Home', href: '#' },
  { label: 'Services', href: '#' },
  { label: 'Industries', href: '#' },
  { label: 'Insights', href: '#' },
  { label: 'About Us', href: '#' },
  { label: 'Careers', href: '#' },
];

const SERVICES = [
  { label: 'Digital Transformation', href: '#' },
  { label: 'IT Consulting', href: '#' },
  { label: 'Software Development', href: '#' },
  { label: 'Cloud Solutions', href: '#' },
  { label: 'Data & Analytics', href: '#' },
];

const INDUSTRIES = [
  { label: 'Healthcare', href: '#' },
  { label: 'Finance', href: '#' },
  { label: 'Retail', href: '#' },
  { label: 'Manufacturing', href: '#' },
  { label: 'Education', href: '#' },
  { label: 'Logistics', href: '#' },
];

const SOCIAL_LINKS = [
  { label: 'LinkedIn', href: 'https://linkedin.com', icon: LinkedInIcon },
  { label: 'Twitter', href: 'https://twitter.com', icon: TwitterIcon },
  { label: 'Facebook', href: 'https://facebook.com', icon: FacebookIcon },
  { label: 'Instagram', href: 'https://instagram.com', icon: InstagramIcon },
];

function FooterLinkColumn({ title, links }) {
  return (
    <div className="footer-column">
      <h3 className="footer-column__title">{title}</h3>
      <ul className="footer-column__list">
        {links.map((link) => (
          <li key={link.label} className="footer-column__item">
            <a href={link.href} className="footer-column__link">
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

function FooterBrand() {
  return (
    <div className="footer-brand">
      <div className="footer-brand__logo-row">
        <span className="footer-brand__badge" aria-hidden="true">M</span>
        <span className="footer-brand__name">MYLOTIC GROUP</span>
      </div>

      <p className="footer-brand__tagline">
        A global IT solutions and consulting firm helping businesses thrive in the digital future.
      </p>

      <div className="footer-brand__socials">
        {SOCIAL_LINKS.map((social) => {
          const IconComponent = social.icon;
          return (
            <a
              key={social.label}
              href={social.href}
              className="footer-brand__social-link"
              aria-label={social.label}
              target="_blank"
              rel="noopener noreferrer"
            >
              <IconComponent />
            </a>
          );
        })}
      </div>
    </div>
  );
}

function FooterContact() {
  return (
    <div className="footer-column">
      <h3 className="footer-column__title">Contact Us</h3>
      <ul className="footer-contact__list">
        <li className="footer-contact__item">
          <span className="footer-contact__icon" aria-hidden="true">
            <MailIcon />
          </span>
          <a href="mailto:info@myloticgroup.com" className="footer-contact__link">
            info@myloticgroup.com
          </a>
        </li>
        <li className="footer-contact__item">
          <span className="footer-contact__icon" aria-hidden="true">
            <PhoneIcon />
          </span>
          <a href="tel:+15554867980" className="footer-contact__link">
            +1 (555) 486-7980
          </a>
        </li>
        <li className="footer-contact__item">
          <span className="footer-contact__icon" aria-hidden="true">
            <LocationIcon />
          </span>
          <address className="footer-contact__address">
            125 Innovation Drive, Suite 100<br />
            New York, NY 10025 USA
          </address>
        </li>
      </ul>
    </div>
  );
}

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer" id="footer">
      <div className="footer__container">
        <div className="footer__grid">
          <FooterBrand />
          <FooterLinkColumn title="Quick Links" links={QUICK_LINKS} />
          <FooterLinkColumn title="Services" links={SERVICES} />
          <FooterLinkColumn title="Industries" links={INDUSTRIES} />
          <FooterContact />
        </div>

        <hr className="footer__divider" />

        <div className="footer__bottom">
          <p className="footer__copyright">
            &copy; {currentYear} Mylotic Group. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

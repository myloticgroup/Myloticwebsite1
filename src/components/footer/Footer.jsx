import './footer.scss';
import { Link } from 'react-router-dom';
import {
  FaLinkedinIn,
  FaInstagram,
  FaXTwitter,
  FaEnvelope,
  FaPhone,
  FaLocationDot,
  FaArrowUp
} from 'react-icons/fa6';

const QUICK_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Training & Development', href: '/training' },
  { label: 'Contact Us', href: '/contact' },
];

const SERVICES = [
  { label: 'AI Solution & Automation', href: '/services' },
  { label: 'Staff Augmentation', href: '/services' },
  { label: 'Web & App Development', href: '/services' },
  { label: 'GCC Global Capability Centers', href: '/services' },
  { label: 'Digital Transformation', href: '/services' },
  { label: 'EdTech / E-Learning', href: '/services' },
  { label: 'Managed Services', href: '/services' },
];

const INDUSTRIES = [
  { label: 'AI Solutions & Emerging Technologies', href: '#' },
  { label: 'GCC(Global Capability Center)', href: '#' },
  { label: 'Information Technology(IT)', href: '#' },
  { label: 'Research and Development', href: '#' },
  { label: 'Non-IT', href: '#' },
  { label: 'BFSI / Fintech', href: '#' },
  { label: 'Edtech & E-learning', href: '#' },
  { label: 'Healthcare', href: '#' },
  { label: 'Media & Digitalmarketing', href: '#' },
  { label: 'OTT & Entertainment', href: '#' },
  { label: 'E-commerce', href: '#' },
  { label: 'Design', href: '#' },
  { label: 'Telecom', href: '#' },
  { label: 'HR & Recruitment', href: '#' },
  { label: 'Manufacturing', href: '#' },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer" id="footer">
      <div className="footer__container">
        <div className="footer__grid">

          <div className="footer-brand">
            <Link to="/" className="footer-brand__logo-link">
              <div className="footer-brand__logo-badge">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2L2 7L12 12L22 7L12 2Z" />
                  <path d="M2 17L12 22L22 17" />
                  <path d="M2 12L12 17L22 12" />
                </svg>
              </div>
              <div className="footer-brand__logo-text">
                <span className="footer-brand__logo-main">
                  <span>Mylotic</span>
                </span>
                <span className="footer-brand__logo-sub">Group</span>
              </div>
            </Link>

            <p className="footer-brand__tagline">
              Empowering businesses with innovative technology, AI solutions, cloud services, and world-class digital transformation.
            </p>

            <div className="footer-brand__socials">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-brand__social-btn footer-brand__social-btn--linkedin"
                aria-label="LinkedIn"
              >
                <FaLinkedinIn />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-brand__social-btn footer-brand__social-btn--instagram"
                aria-label="Instagram"
              >
                <FaInstagram />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-brand__social-btn footer-brand__social-btn--twitter"
                aria-label="Twitter / X"
              >
                <FaXTwitter />
              </a>
            </div>
          </div>

          <div className="footer-column">
            <h3 className="footer-column__title">Quick Links</h3>
            <ul className="footer-column__list">
              {QUICK_LINKS.map((link) => (
                <li key={link.label}>
                  <Link to={link.href} className="footer-column__link">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-column">
            <h3 className="footer-column__title">Services</h3>
            <ul className="footer-column__list">
              {SERVICES.map((item) => (
                <li key={item.label}>
                  <Link to={item.href} className="footer-column__link">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-column">
            <h3 className="footer-column__title">Industries</h3>
            <ul className="footer-column__list">
              {INDUSTRIES.map((item) => (
                <li key={item.label}>
                  <a href={item.href} className="footer-column__link">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-column">
            <h3 className="footer-column__title">Contact</h3>
            <div className="footer-contact__list">
              <a href="mailto:info@myloticgroup.com" className="footer-contact__card">
                <div className="footer-contact__icon-box">
                  <FaEnvelope />
                </div>
                <div className="footer-contact__details">
                  <span className="footer-contact__label">Email</span>
                  <span className="footer-contact__value">info@myloticgroup.com</span>
                </div>
              </a>

              <a href="tel:+919896484992" className="footer-contact__card">
                <div className="footer-contact__icon-box">
                  <FaPhone />
                </div>
                <div className="footer-contact__details">
                  <span className="footer-contact__label">Phone</span>
                  <span className="footer-contact__value">+91 9896484992</span>
                </div>
              </a>

              <div className="footer-contact__card">
                <div className="footer-contact__icon-box">
                  <FaLocationDot />
                </div>
                <div className="footer-contact__details">
                  <span className="footer-contact__label">Location</span>
                  <span className="footer-contact__value">India</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        <hr className="footer__divider" />

        <div className="footer__bottom">
          <p className="footer__copyright">
            &copy; {currentYear} Mylotic Group. All Rights Reserved.
          </p>

          <button className="footer__back-to-top" onClick={scrollToTop} aria-label="Back to Top">
            <span>Back to top</span>
            <FaArrowUp />
          </button>
        </div>
      </div>
    </footer>
  );
}

import { useState } from 'react';
import './contact.scss';

function MailIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function LocationIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function SendIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="22" y1="2" x2="11" y2="13" />
      <polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
  );
}

function CheckCircleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}

const CONTACT_DETAILS = [
  {
    id: 'email',
    icon: MailIcon,
    title: 'Email Us',
    value: 'info@myloticgroup.com',
    link: 'mailto:info@myloticgroup.com',
    subtext: 'Our team typically responds within 2 hours.'
  },
  {
    id: 'phone',
    icon: PhoneIcon,
    title: 'Call Us',
    value: '+1 (555) 486-7980',
    link: 'tel:+15554867980',
    subtext: 'Mon - Fri from 8:00 AM to 6:00 PM EST.'
  },
  {
    id: 'location',
    icon: LocationIcon,
    title: 'Visit Our HQ',
    value: '125 Innovation Drive, Suite 100, New York, NY 10025 USA',
    link: 'https://maps.google.com',
    subtext: 'Get directions to our global headquarters.'
  },
  {
    id: 'hours',
    icon: ClockIcon,
    title: 'Business Hours',
    value: 'Monday – Friday: 8am – 6pm',
    subtext: 'Weekend support available for enterprise SLAs.'
  }
];

const SERVICES_OPTIONS = [
  'Digital Transformation',
  'IT Consulting',
  'Software Development',
  'Cloud Solutions',
  'Data & Analytics',
  'Other Services'
];

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        service: '',
        message: ''
      });
    }, 800);
  };

  return (
    <section className="contact-section" id="contact">
      <div className="contact-container">
        <div className="contact-hero">
          <span className="contact-badge">GET IN TOUCH</span>
          <h1 className="contact-title">Let's Build Something Great Together</h1>
          <p className="contact-subtitle">
            Have a project in mind or want to learn how Mylotic Group can transform your enterprise? 
            Reach out to our team of experts today.
          </p>
        </div>

        <div className="contact-grid">
          <div className="contact-info">
            <h2 className="contact-info__heading">Contact Information</h2>
            <p className="contact-info__description">
              Fill out the form or contact us directly using the information below. We look forward to connecting.
            </p>

            <div className="contact-info__cards">
              {CONTACT_DETAILS.map((item) => {
                const IconComponent = item.icon;
                return (
                  <div key={item.id} className="contact-card">
                    <div className="contact-card__icon">
                      <IconComponent />
                    </div>
                    <div className="contact-card__content">
                      <h3 className="contact-card__title">{item.title}</h3>
                      {item.link ? (
                        <a href={item.link} className="contact-card__value" target={item.link.startsWith('http') ? '_blank' : '_self'} rel="noopener noreferrer">
                          {item.value}
                        </a>
                      ) : (
                        <span className="contact-card__value">{item.value}</span>
                      )}
                      <p className="contact-card__subtext">{item.subtext}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="contact-form-wrapper">
            <div className="contact-form-card">
              <h2 className="contact-form__heading">Send Us a Message</h2>
              <p className="contact-form__subheading">
                Provide a few details about your inquiry and we'll get back to you promptly.
              </p>

              {submitted ? (
                <div className="contact-form__success">
                  <div className="contact-form__success-icon">
                    <CheckCircleIcon />
                  </div>
                  <h3>Message Sent Successfully!</h3>
                  <p>Thank you for reaching out. One of our team members will contact you shortly.</p>
                  <button className="contact-form__reset-btn" onClick={() => setSubmitted(false)}>
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form className="contact-form" onSubmit={handleSubmit}>
                  <div className="contact-form__row">
                    <div className="contact-form__group">
                      <label htmlFor="name" className="contact-form__label">Full Name *</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={handleChange}
                        className="contact-form__input"
                      />
                    </div>

                    <div className="contact-form__group">
                      <label htmlFor="email" className="contact-form__label">Email Address *</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        placeholder="john@company.com"
                        value={formData.email}
                        onChange={handleChange}
                        className="contact-form__input"
                      />
                    </div>
                  </div>

                  <div className="contact-form__row">
                    <div className="contact-form__group">
                      <label htmlFor="phone" className="contact-form__label">Phone Number</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        placeholder="+1 (555) 000-0000"
                        value={formData.phone}
                        onChange={handleChange}
                        className="contact-form__input"
                      />
                    </div>

                    <div className="contact-form__group">
                      <label htmlFor="service" className="contact-form__label">Service Interested In</label>
                      <select
                        id="service"
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        className="contact-form__select"
                      >
                        <option value="">Select a service...</option>
                        {SERVICES_OPTIONS.map((service) => (
                          <option key={service} value={service}>
                            {service}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="contact-form__group">
                    <label htmlFor="message" className="contact-form__label">Message *</label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows="5"
                      placeholder="Tell us about your project requirements or inquiry..."
                      value={formData.message}
                      onChange={handleChange}
                      className="contact-form__textarea"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="contact-form__submit-btn"
                  >
                    {isSubmitting ? (
                      <span>Sending...</span>
                    ) : (
                      <>
                        <span>Send Message</span>
                        <SendIcon />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

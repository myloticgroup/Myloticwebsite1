import { Link } from 'react-router-dom';
import ServiceSection from '../../sections/services/Service';
import {
  FaArrowRight,
  FaBullseye,
  FaShieldHalved,
  FaClock,
  FaUserCheck,
} from 'react-icons/fa6';
import './service.css';

export default function Service() {
  return (
    <div className="services-page">
      <section className="services-hero">
        <div className="container hero-container">
          <span className="eyebrow">OUR CAPABILITIES</span>
          <h1>Engineered for Scalability &amp; Business Growth</h1>
          <p>
            Mylotic Group combines cutting-edge technology, artificial intelligence, and top global software talent to deliver custom software products and operational capabilities for ambitious businesses.
          </p>
          <div className="hero-buttons">
            <a href="#services-carousel" className="button">
              Explore All Services <FaArrowRight />
            </a>
            <Link to="/contact" className="button button-light">
              Talk to an Expert
            </Link>
          </div>
        </div>
      </section>

      <div id="services-carousel">
        <ServiceSection />
      </div>

      <section className="services-values section">
        <div className="container">
          <div className="section-heading">
            <span className="eyebrow">THE MYLOTIC ADVANTAGE</span>
            <h2>Why Partners Choose Our Services</h2>
            <p>We combine rigorous technology standards with deep business understanding to ensure maximum ROI.</p>
          </div>

          <div className="values-grid">
            <div className="value-card">
              <span className="value-icon"><FaBullseye /></span>
              <h3>Outcome-Focused Strategy</h3>
              <p>Every line of code and tech decision is aligned directly with your business goals and key revenue metrics.</p>
            </div>

            <div className="value-card">
              <span className="value-icon"><FaUserCheck /></span>
              <h3>Top 1% Vetted Talent</h3>
              <p>Work directly with experienced software engineers, cloud architects, and AI developers accustomed to fast-paced agile execution.</p>
            </div>

            <div className="value-card">
              <span className="value-icon"><FaShieldHalved /></span>
              <h3>Enterprise Security &amp; Compliance</h3>
              <p>Strict data protection, IP security, and enterprise compliance standards embedded into all software and cloud projects.</p>
            </div>

            <div className="value-card">
              <span className="value-icon"><FaClock /></span>
              <h3>Rapid Onboarding &amp; SLA</h3>
              <p>Deploy talent within days and experience continuous 24/7 support with guaranteed uptime and service level agreements.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="services-cta">
        <div className="container cta-container">
          <span className="eyebrow">GET STARTED TODAY</span>
          <h2>Have a Specific Technology Challenge?</h2>
          <p>Whether you need a dedicated engineering team, custom web application, or AI automation setup, we are here to help.</p>
          <Link to="/contact" className="button">
            Schedule a Free Consultation <FaArrowRight />
          </Link>
        </div>
      </section>
    </div>
  );
}

import { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
  FaRocket,
  FaPeopleGroup,
  FaCode,
  FaGlobe,
  FaChartLine,
  FaLayerGroup,
  FaCloud,
  FaArrowRight,
  FaChevronLeft,
  FaChevronRight,
  FaCheck,
  FaXmark,
  FaPause,
  FaPlay,
} from 'react-icons/fa6';
import './service.css';

const SERVICES_DATA = [
  {
    id: 'ai-solution',
    title: 'AI Solution',
    subtitle: 'Machine Learning & Predictive Intelligence',
    icon: FaRocket,
    badge: 'Trending',
    shortDesc: 'Harness enterprise-grade artificial intelligence and machine learning models to solve complex business challenges.',
    fullDesc: 'We develop custom AI models, neural networks, and computer vision systems that help companies automate decision-making, optimize logistics, and extract actionable insights from big data.',
    features: [
      'Custom Machine Learning Models',
      'Natural Language Processing (NLP)',
      'Predictive Analytics & Forecasting',
      'Computer Vision & OCR Systems',
    ],
    path: '/contact',
  },
  {
    id: 'mobile-app-development',
    title: 'Mobile App Development',
    subtitle: 'iOS & Android Native & Cross-Platform',
    icon: FaCode,
    badge: 'Popular',
    shortDesc: 'Build fluid, high-performing mobile applications with native capabilities and exceptional user experience.',
    fullDesc: 'From native Swift and Kotlin apps to modern React Native and Flutter cross-platform applications, we build secure, scalable mobile products with intuitive interfaces and seamless API integrations.',
    features: [
      'iOS & Android Native Development',
      'React Native & Flutter Cross-Platform',
      'Offline-First & Cloud Sync Apps',
      'App Store Optimization & Release',
    ],
    path: '/contact',
  },
  {
    id: 'gcc-capability-centre',
    title: 'GCC Global Capability Centre',
    subtitle: 'Offshore Tech Hubs & Operations',
    icon: FaGlobe,
    badge: 'Enterprise',
    shortDesc: 'Establish and scale dedicated Global Capability Centers with turnkey infrastructure, talent, and compliance.',
    fullDesc: 'We help global enterprises design, build, and operate dedicated offshore engineering and innovation centers with top-tier talent, enterprise governance, and guaranteed operational excellence.',
    features: [
      'Turnkey GCC Hub Setup & Entity Planning',
      'Infrastructure & High-Security Network Setup',
      'Global Talent Sourcing & HR Management',
      'Regulatory Compliance & Governance',
    ],
    path: '/contact',
  },
  {
    id: 'hr-services',
    title: 'HR Services',
    subtitle: 'Talent Acquisition & Staff Augmentation',
    icon: FaPeopleGroup,
    badge: 'High Demand',
    shortDesc: 'Access top 1% vetted engineering talent, technical recruiters, and agile team augmentation on demand.',
    fullDesc: 'Accelerate your hiring cycles and scale your internal bandwidth with thoroughly vetted software developers, cloud architects, project managers, and HR operational specialists.',
    features: [
      'Dedicated Developer Augmentation',
      'Executive & Tech Talent Sourcing',
      'Payroll, Onboarding & Compliance',
      'Flexible Contract & Full-Time Models',
    ],
    path: '/contact',
  },
  {
    id: 'ai-automation',
    title: 'AI Solutions & Automation',
    subtitle: 'Intelligent Workflows & Generative AI',
    icon: FaRocket,
    badge: 'Popular',
    shortDesc: 'Turn repetitive operations into intelligent, automated business capabilities with generative AI and RPA.',
    fullDesc: 'We help enterprise teams integrate LLM agents, intelligent robotic process automation (RPA), and automated data pipelines directly into their stack to reduce overhead and boost speed.',
    features: [
      'Generative AI & LLM Fine-Tuning',
      'Robotic Process Automation (RPA)',
      'Intelligent Customer Support Chatbots',
      'Automated Document Processing',
    ],
    path: '/contact',
  },
  {
    id: 'edtech',
    title: 'Edtech',
    subtitle: 'Next-Gen Learning Platforms & LMS',
    icon: FaLayerGroup,
    badge: 'Specialized',
    shortDesc: 'Create interactive LMS platforms, courseware portals, and virtual classroom ecosystems.',
    fullDesc: 'Empower schools, universities, and corporate training programs with modern Learning Management Systems featuring gamification, video streaming, assessment engines, and learner analytics.',
    features: [
      'Custom LMS & Course Portals',
      'Interactive Video & Live Classrooms',
      'Gamified Quizzes & Certifications',
      'Student Performance & Analytics',
    ],
    path: '/contact',
  },
  {
    id: 'digital-marketing',
    title: 'Digital Marketing',
    subtitle: 'Growth Hacking, SEO & Performance',
    icon: FaChartLine,
    badge: 'Growth',
    shortDesc: 'Drive qualified traffic, improve conversion funnels, and scale customer acquisition with data-driven marketing.',
    fullDesc: 'Maximize ROI across channels through advanced search engine optimization (SEO), performance marketing campaigns, conversion rate optimization (CRO), and content marketing strategies.',
    features: [
      'Search Engine Optimization (SEO)',
      'Performance Ads & PPC Campaigns',
      'Social Media Marketing & Brand Strategy',
      'Conversion Funnel Optimization',
    ],
    path: '/contact',
  },
  {
    id: 'it-consulting',
    title: 'IT Consulting',
    subtitle: 'Enterprise Architecture & Cloud Advisory',
    icon: FaCloud,
    badge: 'Strategic',
    shortDesc: 'Transform legacy systems, architect scalable cloud environments, and optimize IT strategy for growth.',
    fullDesc: 'Our senior technology consultants provide strategic guidance on cloud migrations, microservices architectures, cybersecurity frameworks, and enterprise digital roadmap planning.',
    features: [
      'Cloud Architecture (AWS / Azure / GCP)',
      'Legacy System Modernization',
      'Cybersecurity & Risk Audits',
      'DevOps & CI/CD Pipeline Automation',
    ],
    path: '/contact',
  },
];

function getVisibleCards() {
  if (window.innerWidth < 768) return 1;
  if (window.innerWidth < 1024) return 2;
  return 3;
}

export default function Service() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCards, setVisibleCards] = useState(getVisibleCards);
  const [isPaused, setIsPaused] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const updateVisibleCards = useCallback(() => {
    setVisibleCards(getVisibleCards());
  }, []);

  useEffect(() => {
    window.addEventListener('resize', updateVisibleCards);
    return () => window.removeEventListener('resize', updateVisibleCards);
  }, [updateVisibleCards]);

  const maxIndex = Math.max(0, SERVICES_DATA.length - visibleCards);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : maxIndex));
  }, [maxIndex]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev < maxIndex ? prev + 1 : 0));
  }, [maxIndex]);

  const goToSlide = (index) => {
    setCurrentIndex(Math.min(Math.max(0, index), maxIndex));
  };

  useEffect(() => {
    if (isPaused || selectedService !== null) return;

    const timer = setInterval(() => {
      handleNext();
    }, 4000);

    return () => clearInterval(timer);
  }, [handleNext, isPaused, selectedService]);

  const handleTouchStart = (e) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
  };

  return (
    <section className="services-section section" id="services">
      <div className="container">
        <div className="section-heading">
          <span className="eyebrow">OUR EXPERTISE</span>
          <h2>Solutions Built for Modern Business Growth</h2>
          <p>
            From intelligent AI automation to global engineering talent, discover how Mylotic Group empowers organizations to scale efficiently.
          </p>
        </div>

        <div
          className="services-slider-container"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="slider-controls-top">
            <div className="slider-status">
              <span className="live-badge">
                <span className={`pulse-dot ${isPaused ? 'paused' : ''}`} />
                {isPaused ? 'Paused (Hovered)' : 'Auto Sliding'}
              </span>
              <span className="counter-text">
                Showing <strong>{currentIndex + 1} - {Math.min(currentIndex + visibleCards, SERVICES_DATA.length)}</strong> of <strong>{SERVICES_DATA.length}</strong>
              </span>
            </div>

            <div className="slider-buttons">
              <button
                type="button"
                className="pause-toggle-btn"
                onClick={() => setIsPaused(!isPaused)}
                title={isPaused ? 'Resume Auto Slide' : 'Pause Auto Slide'}
                aria-label={isPaused ? 'Resume Auto Slide' : 'Pause Auto Slide'}
              >
                {isPaused ? <FaPlay /> : <FaPause />}
              </button>
              <button
                type="button"
                className="nav-btn prev-btn"
                onClick={handlePrev}
                aria-label="Previous Service"
              >
                <FaChevronLeft />
              </button>
              <button
                type="button"
                className="nav-btn next-btn"
                onClick={handleNext}
                aria-label="Next Service"
              >
                <FaChevronRight />
              </button>
            </div>
          </div>

          <div
            className="slider-viewport"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div
              className="slider-track"
              style={{
                transform: `translateX(-${currentIndex * (100 / visibleCards)}%)`,
              }}
            >
              {SERVICES_DATA.map((service) => {
                const IconComponent = service.icon;
                return (
                  <div
                    key={service.id}
                    className="slider-slide"
                    style={{ flex: `0 0 ${100 / visibleCards}%` }}
                  >
                    <div className="service-card-inner">
                      <div className="card-top">
                        <span className="service-icon-box">
                          <IconComponent />
                        </span>
                        <span className="card-badge">{service.badge}</span>
                      </div>

                      <h3>{service.title}</h3>
                      <span className="service-subtitle">{service.subtitle}</span>
                      <p>{service.shortDesc}</p>

                      <ul className="service-features-list">
                        {service.features.slice(0, 3).map((feat, idx) => (
                          <li key={idx}>
                            <FaCheck /> {feat}
                          </li>
                        ))}
                      </ul>

                      <div className="card-actions">
                        <button
                          type="button"
                          className="details-btn"
                          onClick={() => setSelectedService(service)}
                        >
                          Learn Details
                        </button>
                        <Link to={service.path} className="arrow-link" aria-label={`Contact about ${service.title}`}>
                          <FaArrowRight />
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="slider-dots">
            {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
              <button
                key={idx}
                type="button"
                className={`dot ${currentIndex === idx ? 'active' : ''}`}
                onClick={() => goToSlide(idx)}
                aria-label={`Go to slide group ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {selectedService && (
        <div className="service-modal-overlay" onClick={() => setSelectedService(null)}>
          <div className="service-modal-content" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="modal-close-btn"
              onClick={() => setSelectedService(null)}
              aria-label="Close details"
            >
              <FaXmark />
            </button>

            <div className="modal-header">
              <span className="modal-icon-box">
                {selectedService.icon && <selectedService.icon />}
              </span>
              <div>
                <span className="card-badge">{selectedService.badge}</span>
                <h2>{selectedService.title}</h2>
                <p className="modal-subtitle">{selectedService.subtitle}</p>
              </div>
            </div>

            <div className="modal-body">
              <p className="modal-description">{selectedService.fullDesc}</p>

              <h4>Key Capabilities &amp; Deliverables:</h4>
              <ul className="modal-features">
                {selectedService.features.map((feature, index) => (
                  <li key={index}>
                    <span className="check-icon"><FaCheck /></span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="button button-light"
                onClick={() => setSelectedService(null)}
              >
                Close
              </button>
              <Link to="/contact" className="button">
                Discuss Your Requirement <FaArrowRight />
              </Link>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

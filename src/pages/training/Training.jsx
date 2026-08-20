import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FaArrowRight,
  FaBrain,
  FaBriefcase,
  FaBullseye,
  FaCertificate,
  FaChartLine,
  FaCheck,
  FaCloud,
  FaCode,
  FaDatabase,
  FaGraduationCap,
  FaLaptopCode,
  FaMinus,
  FaPeopleGroup,
  FaPlus,
  FaPython,
  FaQuoteLeft,
  FaRocket,
  FaStar,
  FaUserTie,
} from 'react-icons/fa6';
import './training.scss';

const PROGRAMS = [
  {
    icon: FaLaptopCode,
    title: 'Information Technology',
    description: 'Empower your career with industry focused IT training programs designed to build technical expertise, practical experience and job-ready skills for the digital world.',
    features: ['Industry Expert Trainers', 'Hands-on Practical Learning', 'Professional Certification', 'Career Guidance & Mentorship'],
    duration: '4 to 24 Weeks',
    level: 'All skills level',
  },
  {
    icon: FaBrain,
    title: 'Data Science & AI',
    description: 'Advance your career with Data Science, AI, Machine Learning, Business Analytics and more through practical, career-oriented training programs.',
    features: ['Python', 'Machine Learning', 'Generative AI', 'Capstone Project'],
    duration: '4 to 24 Weeks',
    level: 'All skills level',
  },
  {
    icon: FaUserTie,
    title: 'Human Resource',
    description: 'Gain expertise in HR training covering Talent Acquisition, Operations, Compliance, leadership development and more with hands-on corporate HR training.',
    features: ['Human Resource', 'Talent Acquisition', 'HRMS', 'Leadership Trainings'],
    duration: '4 to 24 Weeks',
    level: 'Intermediate',
  },
  {
    icon: FaChartLine,
    title: 'Sales & Business Development',
    features: ['B2B, B2C Sales', 'Client Acquisition', 'Lead Generation', 'LinkedIn Sales'],
    duration: '4 to 24 Weeks',
    level: 'All skills level',
  },
  {
    icon: FaGraduationCap,
    title: 'University Programs',
    features: ['Campus to Corporate', 'Certification Courses', 'Internships & Mentorship', 'Skills Development'],
    duration: '4 to 24 Weeks',
    level: 'All skills level',
  },
  {
    icon: FaPeopleGroup,
    title: 'Soft Skills & Leadership',
    features: ['Communication Skills', 'Interview Cracking Skills', 'Personality Development', 'Corporate Etiquette'],
    duration: '4 to 24 Weeks',
    level: 'All skills level',
  },
];

const JOURNEY = [
  ['Career Counselling & Mentorship', 'Understand your interests, career goals, and choose the most suitable learning path with guidance from our experts.', FaBullseye],
  ['Choose Your Program', 'Select from industry-focused programs designed to build practical skills and prepare you for real-world opportunities.', FaGraduationCap],
  ['Live Expert Training', 'Learn from experienced mentors through interactive live sessions, practical demonstrations, and doubt-solving classes.', FaLaptopCode],
  ['Hands-on Projects', 'Work on real-world projects and case studies that strengthen your portfolio and improve your practical knowledge.', FaCode],
  ['Internship Experience', 'Gain professional exposure through internships that help you apply your skills in real business environments.', FaBriefcase],
  ['Placement Assistance', 'Receive resume reviews, mock interviews, career guidance, and placement support to confidently start your career.', FaRocket],
  ['Industry Certification', 'Earn a MYLOTIC Industry Certification after successfully completing the program, validating your practical skills and improving your career opportunities.', FaCertificate],
];

const TESTIMONIALS = [
  { quote: 'The mentors were extremely supportive and the hands-on projects helped me become industry ready. I landed my first job within weeks of completing the program.', name: 'Rahul Sharma', role: 'Software Engineer', company: 'TCS', initials: 'RS', avatar: 'https://i.pravatar.cc/80?img=53' },
  { quote: 'The learning experience was practical and engaging. Every module included real-world assignments that boosted my confidence.', name: 'Priya Verma', role: 'Frontend Developer', company: 'Infosys', initials: 'PV', avatar: 'https://i.pravatar.cc/80?img=44' },
  { quote: 'Excellent trainers, structured curriculum and amazing placement support. Highly recommended for anyone starting their tech career.', name: 'Amit Singh', role: 'Cloud Engineer', company: 'Accenture', initials: 'AS', avatar: 'https://i.pravatar.cc/80?img=12' },
  { quote: 'The AI program exceeded my expectations. Live mentoring sessions and capstone projects made learning enjoyable.', name: 'Neha Kapoor', role: 'AI Developer', company: 'Capgemini', initials: 'NK', avatar: 'https://i.pravatar.cc/80?img=47' },
  { quote: 'From resume preparation to mock interviews, everything was well organized. I gained both technical and soft skills.', name: 'Aditya Gupta', role: 'Full Stack Developer', company: 'Wipro', initials: 'AG', avatar: 'https://i.pravatar.cc/80?img=11' },
];

const FAQS = [
  ['Do I need prior coding knowledge?', 'No. We have beginner-friendly paths as well as intermediate programs, and our advisors can help you choose the right starting point.'],
  ['Are all classes live?', 'Our core mentor sessions are live and interactive, supported by practical resources and guided assignments.'],
  ['Will I receive a certificate?', 'Yes. Learners who successfully complete their program receive a MYLOTIC Industry Certification.'],
  ['Do you provide placement assistance?', 'Yes. Placement support includes resume reviews, mock interviews, career guidance, and opportunity preparation.'],
  ['How are projects evaluated?', 'Mentors review your work against practical requirements and provide feedback during project milestones.'],
  ['Can I switch my batch later?', 'Batch changes can be discussed with your training advisor based on availability and program progress.'],
  ['How long do I get mentor support?', 'Mentor support continues throughout your program, project work, and the agreed post-training support period.'],
  ['Will I work on real-world projects?', 'Yes. Programs use realistic briefs, case studies, and projects designed to mirror workplace expectations.'],
];

function Training() {
  const [openFaq, setOpenFaq] = useState(null);
  const [testimonialIndex, setTestimonialIndex] = useState(TESTIMONIALS.length);
  const [visibleTestimonials, setVisibleTestimonials] = useState(3);
  const [carouselWidth, setCarouselWidth] = useState(0);
  const [isCarouselAnimating, setIsCarouselAnimating] = useState(true);
  const carouselViewport = useRef(null);

  const loopedTestimonials = [...TESTIMONIALS, ...TESTIMONIALS, ...TESTIMONIALS];

  useEffect(() => {
    const updateVisibleTestimonials = () => {
      setVisibleTestimonials(window.innerWidth <= 520 ? 1 : window.innerWidth <= 1024 ? 2 : 3);
    };

    updateVisibleTestimonials();
    window.addEventListener('resize', updateVisibleTestimonials);
    return () => window.removeEventListener('resize', updateVisibleTestimonials);
  }, []);

  useEffect(() => {
    if (!carouselViewport.current) return undefined;

    const resizeObserver = new ResizeObserver(([entry]) => setCarouselWidth(entry.contentRect.width));
    resizeObserver.observe(carouselViewport.current);
    return () => resizeObserver.disconnect();
  }, []);

  useEffect(() => {
    const autoplay = window.setInterval(() => {
      setTestimonialIndex((index) => index + 1);
    }, 4000);

    return () => window.clearInterval(autoplay);
  }, []);

  const interactWithTestimonials = (nextIndex) => {
    setTestimonialIndex(nextIndex);
  };

  const slideWidth = carouselWidth ? (carouselWidth - (visibleTestimonials - 1) * 16) / visibleTestimonials : 0;
  const currentLogicalIndex = testimonialIndex % TESTIMONIALS.length;

  const handleTestimonialTransitionEnd = () => {
    if (testimonialIndex >= TESTIMONIALS.length * 2) {
      setIsCarouselAnimating(false);
      setTestimonialIndex(TESTIMONIALS.length);
      window.requestAnimationFrame(() => setIsCarouselAnimating(true));
    }

    if (testimonialIndex < TESTIMONIALS.length) {
      setIsCarouselAnimating(false);
      setTestimonialIndex(TESTIMONIALS.length * 2 - 1);
      window.requestAnimationFrame(() => setIsCarouselAnimating(true));
    }
  };

  const goToTestimonialDot = (index) => {
    const cycleStart = Math.floor(testimonialIndex / TESTIMONIALS.length) * TESTIMONIALS.length;
    const targetIndex = cycleStart + index < testimonialIndex ? cycleStart + index + TESTIMONIALS.length : cycleStart + index;
    interactWithTestimonials(targetIndex);
  };

  return (
    <div className="training-page">
      <section className="training-hero">
        <div className="training-container training-hero__inner">
          <div className="training-hero__copy">
            <span className="training-eyebrow">LEARN <b>•</b> BUILD <b>•</b> GROW</span>
            <h1>Become <span>Industry Ready</span> With Mylotic</h1>
            <p>Learn directly from industry experts through live sessions, real-world projects, internships and placement-focused programs designed for your future.</p>
            <div className="training-actions">
              <Link className="training-button" to="#programs">Explore Programs <FaArrowRight /></Link>
              <Link className="training-button training-button--light" to="/contact">Talk to Expert</Link>
            </div>
            <div className="training-stats">
              <div><strong>200+</strong><span>Training Programs</span></div>
              <div><strong>1000+</strong><span>Learners</span></div>
              <div><strong>24×7</strong><span>Mentor Support</span></div>
            </div>
          </div>
          <div className="training-hero__visual" aria-label="Connected learning technology visual">
            <div className="training-orbit training-orbit--one" />
            <div className="training-orbit training-orbit--two" />
            <div className="training-node training-node--ai"><FaBrain /><span>AI</span></div>
            <div className="training-node training-node--code"><FaCode /><span>React</span></div>
            <div className="training-node training-node--data"><FaDatabase /><span>Data</span></div>
            <div className="training-node training-node--cloud"><FaCloud /><span>Cloud</span></div>
            <div className="training-visual-core"><FaGraduationCap /><strong>Learn forward</strong><small>Skills / Practice / Growth</small></div>
          </div>
        </div>
      </section>

      <section className="training-section training-programs" id="programs">
        <div className="training-container">
          <div className="training-section-heading"><span className="training-eyebrow">PROGRAMS FOR MOMENTUM</span><h2>Choose Your <span>Learning Path</span></h2><p>Explore career-focused programs designed by industry professionals with live mentorship, hands-on projects, internship opportunities and placement support.</p></div>
          <div className="training-program-grid">
            {PROGRAMS.map(({ icon: Icon, title, description, features, duration, level }) => (
              <article className="training-program-card" key={title}>
                <div className="training-card-icon"><Icon /></div>
                <h3>{title}</h3>
                {description && <p>{description}</p>}
                <ul>{features.map((feature) => <li key={feature}><FaCheck />{feature}</li>)}</ul>
                <div className="training-card-meta"><span>{duration}</span><span>{level}</span></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="training-section training-journey">
        <div className="training-container">
          <div className="training-section-heading"><span className="training-eyebrow">HOW WE DEVELOP PEOPLE</span><h2>Your Journey To <span>Becoming Industry Ready</span></h2><p>Our structured learning process ensures that every learner gains practical skills, hands-on experience, and career guidance to confidently step into the industry.</p></div>
          <div className="training-journey-grid">
            {JOURNEY.map(([title, description, Icon], index) => <article className="training-journey-card" key={title}><span className="training-step">{String(index + 1).padStart(2, '0')}</span><div className="training-card-icon"><Icon /></div><div><h3>{title}</h3><p>{description}</p></div></article>)}
          </div>
        </div>
      </section>

      <section className="training-section training-stories">
        <div className="training-container">
          <div className="training-section-heading"><span className="training-eyebrow">SUCCESS STORIES</span><h2>Hear From Our <span>Successful Learners</span></h2><p>Hear directly from our learners who transformed their careers through industry-focused training, hands-on projects and expert mentorship.</p></div>
          <div className="training-testimonial-viewport" ref={carouselViewport} aria-live="polite">
            <div className="training-testimonial-track" onTransitionEnd={handleTestimonialTransitionEnd} style={{ gap: '16px', transform: `translate3d(-${testimonialIndex * (slideWidth + 16)}px, 0, 0)`, transition: isCarouselAnimating ? 'transform 3.8s linear' : 'none' }}>
              {loopedTestimonials.map(({ name, role, company, quote, initials, avatar }, index) => <article className="training-testimonial" style={{ flex: `0 0 ${slideWidth}px` }} key={`${name}-${index}`}><FaQuoteLeft className="training-quote" /><div className="training-stars">{[1, 2, 3, 4, 5].map((star) => <FaStar key={star} />)}</div><blockquote>{quote}</blockquote><div className="training-person"><span className="training-avatar"><img src={avatar} alt={`${name} profile`} onError={(event) => { event.currentTarget.style.display = 'none'; }} />{initials}</span><div><strong>{name}</strong><small>{role} · {company}</small></div><span className="training-company-badge">{company}</span></div><FaArrowRight className="training-testimonial-arrow" /></article>)}
            </div>
          </div>
          <div className="training-carousel-controls">
            <button type="button" aria-label="Previous success story" onClick={() => interactWithTestimonials(testimonialIndex - 1)}>← Previous</button>
            <div className="training-carousel-dots">{TESTIMONIALS.map((testimonial, index) => <button type="button" key={testimonial.name} className={currentLogicalIndex === index ? 'is-active' : ''} aria-label={`Show ${testimonial.name}'s success story`} aria-current={currentLogicalIndex === index ? 'true' : undefined} onClick={() => goToTestimonialDot(index)} />)}</div>
            <button type="button" aria-label="Next success story" onClick={() => interactWithTestimonials(testimonialIndex + 1)}>Next →</button>
          </div>
        </div>
      </section>

      <section className="training-section training-faq">
        <div className="training-container training-faq__inner">
          <div className="training-section-heading"><span className="training-eyebrow">YOUR QUESTIONS, ANSWERED</span><h2>Everything You Need <span>Before You Start</span></h2><p>Find answers to the most commonly asked questions about our training programs, mentorship and placement support.</p></div>
          <div className="training-faq-list">
            {FAQS.map(([question, answer], index) => <div className={`training-faq-item${openFaq === index ? ' is-open' : ''}`} key={question}><button onClick={() => setOpenFaq(openFaq === index ? null : index)} aria-expanded={openFaq === index}><span>{question}</span>{openFaq === index ? <FaMinus /> : <FaPlus />}</button><div className="training-faq-answer"><p>{answer}</p></div></div>)}
          </div>
        </div>
      </section>

      <section className="training-cta"><div className="training-cta__glow" /><div className="training-container"><span className="training-eyebrow">MAKE YOUR NEXT MOVE</span><h2>Still Have Questions?</h2><p>Our training advisors are happy to guide you in choosing the right learning path for your career goals.</p><Link className="training-button" to="/contact">Talk to Counselor <FaArrowRight /></Link></div></section>
    </div>
  );
}

export default Training;

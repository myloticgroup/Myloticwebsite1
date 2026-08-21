import { Link } from 'react-router-dom';
import { FaArrowRight, FaCheck, FaCloud, FaCode, FaCrown, FaLightbulb, FaPeopleGroup, FaShieldHalved, FaStar, FaWandMagicSparkles } from 'react-icons/fa6';
import './about.css';

const capabilities = ['AI', 'Cloud', 'Software Development', 'Staff Augmentation', 'Digital Transformation'];

const principles = [
  { icon: FaLightbulb, title: 'Innovation', text: 'We continuously explore new ideas, technologies and approaches to create better solutions for our clients.' },
  { icon: FaShieldHalved, title: 'Integrity', text: 'We believe in transparency, accountability and building relationships based on trust.' },
  { icon: FaStar, title: 'Excellence', text: 'We strive for quality and excellence in every solution, service and experience we deliver.' },
  { icon: FaPeopleGroup, title: 'Partnership', text: "We build long-term partnerships by understanding our clients' goals and helping them grow." }
];

const missionPoints = ['Innovation Driven', 'Customer Success', 'Quality Engineering', 'Continuous Improvement'];
const visionPoints = ['Global Impact', 'Future Ready Solutions', 'Technology Leadership', 'Long-Term Partnerships'];

function FocusList({ items }) {
  return <ul className="about-focus-list">{items.map((item) => <li key={item}><FaCheck />{item}</li>)}</ul>;
}

function About() {
  return (
    <div className="about-page">
      <section className="about-hero">
        <div className="about-container about-hero__grid">
          <div className="about-hero__copy about-reveal">
            <span className="about-badge">About Mylotic Group</span>
            <h1>Empowering Businesses Through <span>Innovation &amp; Technology</span></h1>
            <p>Mylotic Group is a technology-driven company helping startups, SMEs and enterprises move forward with AI, cloud, software development, staff augmentation and digital transformation.</p>
            <div className="about-actions"><Link className="about-button" to="/services">Explore Services <FaArrowRight /></Link><Link className="about-button about-button--quiet" to="/contact">Contact Us</Link></div>
          </div>
          <div className="about-tech-visual about-reveal" aria-label="Abstract connected technology visual">
            <div className="about-tech-visual__grid" /><div className="about-tech-visual__ring about-tech-visual__ring--one" /><div className="about-tech-visual__ring about-tech-visual__ring--two" />
            <div className="about-tech-visual__core"><FaWandMagicSparkles /><b>MYLOTIC</b><small>Technology in motion</small></div>
            <span className="about-tech-visual__node about-tech-visual__node--one"><FaCloud /></span><span className="about-tech-visual__node about-tech-visual__node--two"><FaCode /></span><span className="about-tech-visual__node about-tech-visual__node--three"><FaCrown /></span>
          </div>
        </div>
      </section>

      <section className="about-section about-intro"><div className="about-container about-intro__grid">
        <div><span className="about-eyebrow">Technology with purpose</span><h2>From Vision to <span>Digital Excellence</span></h2><p className="about-lead">We bring together deep technology expertise, exceptional talent and a clear understanding of business to turn ambitious ideas into lasting digital advantage.</p><p>From AI and cloud services to software development, staff augmentation and digital transformation, our approach is practical, human and built to scale.</p><div className="about-capabilities">{capabilities.map((item) => <span key={item}>{item}</span>)}</div></div>
        <div className="about-intro__visual"><div className="about-signal-card"><span>01 / CONNECT</span><strong>Ideas become<br /><em>momentum.</em></strong><div className="about-signal-line"><i /><i /><i /><i /><i /></div></div><div className="about-float about-float--top">Innovation <b>Future Ready</b></div><div className="about-float about-float--bottom">Smart Technology <b>AI Powered</b></div></div>
      </div><div className="about-container about-feature-grid">{['Innovation First', 'Customer-Centric Approach', 'Scalable Digital Solutions', 'Long-Term Partnership'].map((item, index) => <div className="about-feature" key={item}><span>0{index + 1}</span><h3>{item}</h3><p>Designed around outcomes that matter to your business.</p></div>)}</div></section>

      <section className="about-section about-mission"><div className="about-container"><div className="about-section-heading"><span className="about-eyebrow">Our direction</span><h2>Mission <span>&amp; Vision</span></h2></div><div className="about-mission-grid"><article className="about-purpose-card about-purpose-card--dark"><span>OUR MISSION</span><h3>Build progress that lasts.</h3><p>To empower startups, SMEs, and enterprises with innovative, scalable, and secure digital solutions that accelerate growth, improve operational efficiency, and create lasting business value.</p><FocusList items={missionPoints} /></article><article className="about-purpose-card"><span>OUR VISION</span><h3>Make technology a catalyst.</h3><p>To become one of the world's most trusted technology partners, recognized for AI-powered innovation, digital transformation, and helping businesses achieve sustainable growth.</p><FocusList items={visionPoints} /></article></div></div></section>

      <section className="about-section about-story"><div className="about-container about-story__grid"><div className="about-story__mark"><span>2019</span><strong>Ideas<br />into<br /><em>impact.</em></strong><div className="about-story__path" /></div><div><span className="about-eyebrow">Our Journey</span><h2>Our <span>Story</span></h2><p className="about-lead">Building intelligent technology solutions that help businesses innovate, grow, and lead in a digital-first world.</p><p>Mylotic Group was shaped by a simple belief: technology works best when it is grounded in context and delivered by people who care. Our journey is one of turning complex challenges into clear, useful solutions for the teams we serve.</p><p>Today, we continue to learn, build and partner with ambition, bringing emerging technologies into the real world with clarity, craft and commitment.</p></div></div></section>

      <section className="about-founder"><div className="about-container about-founder__grid"><div className="about-founder__portrait"><div className="about-founder__initials">MS</div><span>MYLOTIC GROUP</span></div><div><span className="about-badge about-badge--light">OUR FOUNDER</span><h2>Manjeet Sharma</h2><p className="about-founder__role">Founder &amp; Group CEO</p><blockquote>“At MYLOTIC GROUP, we believe that meaningful growth is built on the right people, the right technology, and the trust of our clients.”</blockquote><h3>Founder's Vision</h3><p>MYLOTIC GROUP was founded with a vision to create a company that brings together technology, talent, and business expertise to help organizations move forward with confidence. Our aim is not simply to deliver a service, but to understand the challenges our clients face and build solutions that create real, measurable and lasting value.</p><p>As we continue to grow, our focus remains firmly rooted in innovation, integrity, quality, and long-term relationships. We believe that every successful engagement begins with understanding, is strengthened by trust, and succeeds through consistent execution.</p><p>Our journey is driven by a commitment to building meaningful partnerships, empowering people, embracing emerging technologies, and creating solutions that help businesses adapt, scale, and succeed in a constantly changing world.</p></div></div></section>

      <section className="about-section about-principles"><div className="about-container"><div className="about-section-heading"><span className="about-eyebrow">What drives us</span><h2>Leadership <span>Principles</span></h2><p>Our approach is built around values that guide how we work, collaborate and create long-term value for our clients.</p></div><div className="about-principles-grid">{principles.map(({ icon: Icon, title, text }) => <article className="about-principle" key={title}><Icon /><h3>{title}</h3><p>{text}</p></article>)}</div></div></section>

      <section className="about-section about-recognition"><div className="about-container about-recognition__grid"><div><span className="about-eyebrow">Government Recognition</span><h2>Proud to be <span>DPIIT Recognized</span></h2><p className="about-lead">MYLOTIC GROUP Private Limited is officially recognized by the Department for Promotion of Industry and Internal Trade (DPIIT), Government of India under the Startup India initiative.</p><div className="about-recognition__items"><div><h3>DPIIT Recognized</h3><p>Officially recognized under the Startup India initiative.</p></div><div><h3>Private Limited Company</h3><p>Incorporated under the Companies Act, 2013.</p></div><div><h3>ISO 9001:2015 Certified</h3><p>Quality management built on consistency and continuous improvement.</p><small>Certificate: QMS26013729</small></div></div></div><div className="about-quality-card"><div className="about-quality-card__seal"><FaShieldHalved /><span>QMS<br /><b>9001</b></span></div><span className="about-eyebrow">Quality &amp; Recognition</span><h3>Built on standards.<br /><em>Known for trust.</em></h3><div className="about-badges"><span>Startup India</span><span>Government of India</span><span>DPIIT Certified</span></div><div className="about-stats"><div><b>DPIIT</b><span>Recognized</span></div><div><b>Pvt. Ltd.</b><span>Registered</span></div><div><b>2025</b><span>Startup India</span></div><div><b>ISO</b><span>Certified</span></div></div></div></div></section>
    </div>
  );
}

export default About;

import './home.scss';
import { Link } from 'react-router-dom';
import {
  FaArrowRight,
  FaBullseye,
  FaCheck,
  FaChartLine,
  FaCloud,
  FaCode,
  FaGlobe,
  FaLayerGroup,
  FaPeopleGroup,
  FaRocket,
  FaStar,
} from 'react-icons/fa6';

function Home() {
  return (
    <div className="home">
      <section className="hero">
        <div className="container hero-container">
          <div className="hero-left">
            <span className="eyebrow">GLOBAL BUSINESS SOLUTIONS</span>
            <h1>Empowering Businesses <span>Through Technology</span></h1>
            <p>Mylotic Group delivers innovative technology, talent, and digital solutions that help businesses scale faster, operate smarter, and build lasting competitive advantage.</p>
            <div className="hero-buttons">
              <Link className="button" to="/services">Explore Services <FaArrowRight /></Link>
              <Link className="button button-light" to="/contact">Contact Us</Link>
            </div>
            <div className="hero-trust"><span /> Technology <b>•</b> Talent <b>•</b> Innovation</div>
          </div>
          <div className="hero-right" aria-label="Abstract technology network illustration">
            <div className="hero-visual">
              <div className="hero-grid" /><div className="hero-orb hero-orb-one" /><div className="hero-orb hero-orb-two" />
              <div className="hero-ring hero-ring-one" /><div className="hero-ring hero-ring-two" />
              <div className="hero-cube hero-cube-one" /><div className="hero-cube hero-cube-two" /><div className="hero-cube hero-cube-three" />
              <div className="hero-core"><FaRocket /><strong>Ideas in motion</strong><small>Technology / Talent / Growth</small></div>
              <div className="floating-card floating-card-top"><FaChartLine /><span><b>Growth engine</b><small>+42% efficiency</small></span></div>
              <div className="floating-card floating-card-bottom"><span className="pulse" /><span><b>Connected globally</b><small>Always moving forward</small></span></div>
            </div>
          </div>
        </div>
      </section>

      <section className="stats">
        <div className="container stats-container">
          <div className="stat-card"><h2>70+</h2><p>Happy Clients</p></div>
          <div className="stat-card"><h2>120+</h2><p>Projects Delivered</p></div>
          <div className="stat-card"><h2>98%</h2><p>Client Satisfaction</p></div>
          <div className="stat-card"><h2>24/7</h2><p>Support</p></div>
        </div>
      </section>

      <section className="about section">
        <div className="container about-container">
          <div className="about-left"><span className="eyebrow">WHY CHOOSE MYLOTIC GROUP</span><h2>Empowering Businesses with Talent, Technology &amp; Global Capabilities</h2></div>
          <div className="about-right">
            <p>Mylotic Group brings together technology, skilled talent, innovation, and business strategy to help ambitious companies move from opportunity to outcome.</p>
            <ul>
              <li><span><FaCheck /></span>End-to-End Business &amp; IT Solutions</li>
              <li><span><FaCheck /></span>Access to Global Talent &amp; Advanced Technologies</li>
              <li><span><FaCheck /></span>Commitment to Quality, Innovation &amp; Excellence</li>
              <li><span><FaCheck /></span>Customer-Centric Approach</li>
              <li><span><FaCheck /></span>Faster Delivery &amp; Business Agility</li>
              <li><span><FaCheck /></span>Long-Term Business Partnership</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="services section" id="services">
        <div className="container"><div className="section-heading"><span className="eyebrow">WHAT WE DO</span><h2>Solutions Built for Modern Businesses</h2><p>From intelligent automation to digital transformation, we help organizations solve complex business challenges with technology.</p></div>
          <div className="service-container">
            <Link className="service-card" to="/services"><span className="service-icon"><FaRocket /></span><h3>AI Solutions &amp; Automation</h3><p>Turn repetitive work into intelligent, measurable business advantage.</p><FaArrowRight /></Link>
            <Link className="service-card" to="/services"><span className="service-icon"><FaPeopleGroup /></span><h3>Staff Augmentation</h3><p>Extend your team with skilled specialists aligned to your goals.</p><FaArrowRight /></Link>
            <Link className="service-card" to="/services"><span className="service-icon"><FaCode /></span><h3>Web &amp; App Development</h3><p>Build reliable digital products that customers love to use.</p><FaArrowRight /></Link>
            <Link className="service-card" to="/services"><span className="service-icon"><FaGlobe /></span><h3>GCC Enablement</h3><p>Establish and scale global capability centers with confidence.</p><FaArrowRight /></Link>
            <Link className="service-card" to="/services"><span className="service-icon"><FaChartLine /></span><h3>Digital Transformation</h3><p>Modernize operations with strategy, data, and purposeful technology.</p><FaArrowRight /></Link>
            <Link className="service-card" to="/services"><span className="service-icon"><FaLayerGroup /></span><h3>EdTech / E-Learning</h3><p>Create engaging learning experiences for the next generation.</p><FaArrowRight /></Link>
          </div>
        </div>
      </section>

      <section className="business section"><div className="container business-container"><div className="business-left"><span className="eyebrow">BUILT FOR MOMENTUM</span><h2>Technology That Moves Your Business Forward</h2><p>We combine technology, automation, and human expertise to turn complex challenges into clear, scalable progress.</p><Link className="button" to="/services">Explore Our Services <FaArrowRight /></Link></div><div className="business-right">
        <div className="business-card"><FaRocket /><div><h3>AI Solution &amp; Automation</h3><p>Make every process more intelligent.</p></div></div>
        <div className="business-card"><FaPeopleGroup /><div><h3>Staff Augmentation</h3><p>Add capability exactly when you need it.</p></div></div>
        <div className="business-card"><FaCode /><div><h3>Web &amp; App Development</h3><p>Products built for real-world growth.</p></div></div>
        <div className="business-card"><FaLayerGroup /><div><h3>Managed Services</h3><p>Reliable support that keeps you moving.</p></div></div>
      </div></div></section>

      <section className="technology section"><div className="container"><div className="section-heading"><span className="eyebrow">OUR TOOLKIT</span><h2>Technology Stack</h2><p>We leverage modern technologies to build scalable, secure, and high-performance digital solutions.</p></div><div className="technology-container">
        <div className="tech-card"><span>01</span><strong>React</strong></div><div className="tech-card"><span>02</span><strong>Node.js</strong></div><div className="tech-card"><span>03</span><strong>JavaScript</strong></div><div className="tech-card"><span>04</span><strong>MongoDB</strong></div><div className="tech-card"><span>05</span><strong>AWS</strong></div><div className="tech-card"><span>06</span><strong>Docker</strong></div><div className="tech-card"><span>07</span><strong>Git</strong></div><div className="tech-card"><span>08</span><strong>GitHub</strong></div><div className="tech-card"><span>09</span><strong>Firebase</strong></div>
      </div></div></section>

      <section className="process section"><div className="container"><div className="section-heading"><span className="eyebrow">HOW WE WORK</span><h2>Our Approach</h2><p>From strategy to deployment, we follow a structured workflow that ensures quality, performance, and long-term scalability.</p></div><div className="process-container">
        <div className="process-card"><span>01</span><i><FaBullseye /></i><div><h3>Discover</h3><p>Understand business goals, audience, and project requirements.</p></div><FaArrowRight /></div>
        <div className="process-card"><span>02</span><i><FaRocket /></i><div><h3>Design</h3><p>Create intuitive and user-focused digital experiences.</p></div><FaArrowRight /></div>
        <div className="process-card"><span>03</span><i><FaCode /></i><div><h3>Develop</h3><p>Build secure, scalable, and high-performance applications.</p></div><FaArrowRight /></div>
        <div className="process-card"><span>04</span><i><FaCloud /></i><div><h3>Deploy</h3><p>Launch, monitor, and continuously optimize the solution.</p></div><FaArrowRight /></div>
      </div></div></section>

      <section className="why section"><div className="container"><div className="section-heading"><span className="eyebrow">THE MYLOTIC DIFFERENCE</span><h2>Why Businesses Choose Mylotic</h2></div><div className="why-container">
        <div className="why-card"><FaBullseye /><h3>Strategic Business Partner</h3><p>We connect every technology decision to the outcome that matters.</p></div><div className="why-card"><FaPeopleGroup /><h3>Talent &amp; Technology Ecosystem</h3><p>The right people, expertise, and tools for every stage of growth.</p></div><div className="why-card"><FaRocket /><h3>Innovation-Driven Solutions</h3><p>Practical innovation that creates momentum, not complexity.</p></div><div className="why-card"><FaGlobe /><h3>Global Delivery</h3><p>Flexible collaboration and dependable delivery across borders.</p></div>
      </div></div></section>

      <section className="testimonials section"><div className="container"><div className="section-heading"><span className="eyebrow">CLIENT PERSPECTIVES</span><h2>What Our Clients Say</h2><p>Trusted by startups, enterprises, and growing businesses for delivering innovative digital solutions.</p></div><div className="testimonials-container">
        <div className="testimonial-card"><div className="stars"><FaStar /><FaStar /><FaStar /><FaStar /><FaStar /></div><blockquote>“Mylotic brought clarity to a complex transformation and delivered a platform our teams could actually adopt.”</blockquote><div className="person"><span>AR</span><div><strong>Alex Rivera</strong><small>COO, Growth-stage technology company</small></div></div></div>
        <div className="testimonial-card"><div className="stars"><FaStar /><FaStar /><FaStar /><FaStar /><FaStar /></div><blockquote>“The team felt like a true extension of ours. They moved quickly while keeping quality at the center.”</blockquote><div className="person"><span>SM</span><div><strong>Sarah Mitchell</strong><small>VP Product, Digital services company</small></div></div></div>
        <div className="testimonial-card"><div className="stars"><FaStar /><FaStar /><FaStar /><FaStar /><FaStar /></div><blockquote>“From the first workshop to launch, Mylotic combined thoughtful strategy with exceptional execution.”</blockquote><div className="person"><span>DK</span><div><strong>David Kim</strong><small>Founder, Learning platform</small></div></div></div>
      </div></div></section>

      <section className="home-cta"><div className="cta-glow" /><div className="container cta-content"><span className="eyebrow">START SOMETHING SIGNIFICANT</span><h2>Let's Build What's Next</h2><p>Have a business challenge, technology idea, or growth opportunity? Let's turn it into a scalable digital solution.</p><div className="hero-buttons"><Link className="button" to="/contact">Start a Conversation <FaArrowRight /></Link><Link className="button button-light" to="/services">Explore Services</Link></div></div></section>
    </div>
  );
}

export default Home;

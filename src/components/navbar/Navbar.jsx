import "./navbar.scss";
import { Link, NavLink } from "react-router-dom";
import { FaChevronDown } from "react-icons/fa6";

function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar__container">

        {/* Logo */}
        <Link to="/" className="navbar__logo">
          <div className="navbar__logo-mark">
            M
          </div>

          <div className="navbar__logo-text">
            <span className="navbar__logo-main">Mylotic</span>
            <span className="navbar__logo-sub">Group</span>
          </div>
        </Link>

        {/* Navigation */}
        <nav className="navbar__menu">

          <NavLink to="/" end className={({ isActive }) => `navbar__link${isActive ? " navbar__link--active" : ""}`}>
            Home
          </NavLink>

          <NavLink to="/about" className={({ isActive }) => `navbar__link${isActive ? " navbar__link--active" : ""}`}>
            About Us
          </NavLink>

          <div className="navbar__dropdown">
            <NavLink to="/services" className={({ isActive }) => `navbar__link${isActive ? " navbar__link--active" : ""}`}>
              Services
              <FaChevronDown className="navbar__arrow" />
            </NavLink>

            <div className="navbar__dropdown-menu">
              <Link to="/services">AI Solution</Link>
              <Link to="/services">Mobile App Development</Link>
              <Link to="/services">GCC Global Capability Centre</Link>
              <Link to="/services">HR Services</Link>
              <Link to="/services">AI Solutions &amp; Automation</Link>
              <Link to="/services">Edtech</Link>
              <Link to="/services">Digital Marketing</Link>
              <Link to="/services">IT Consulting</Link>
            </div>
          </div>

          <NavLink to="/training" className={({ isActive }) => `navbar__link${isActive ? " navbar__link--active" : ""}`}>
            Training & Development
          </NavLink>

          <NavLink to="/contact" className={({ isActive }) => `navbar__contact${isActive ? " navbar__contact--active" : ""}`}>
            Contact Us
          </NavLink>

        </nav>

        {/* Mobile Menu Button */}
        <button className="navbar__mobile-btn">
          <span></span>
          <span></span>
          <span></span>
        </button>

      </div>
    </header>
  );
}

export default Navbar;
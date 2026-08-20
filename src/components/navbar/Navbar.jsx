import "./navbar.scss";
import { Link, NavLink } from "react-router-dom";

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
              <span className="navbar__arrow">⌄</span>
            </NavLink>

            <div className="navbar__dropdown-menu">
              <Link to="/services/ai-automation">
                AI Solution & Automation
              </Link>

              <Link to="/services/web-development">
                Web & App Development
              </Link>

              <Link to="/services/staff-augmentation">
                Staff Augmentation
              </Link>
            </div>
          </div>

          <NavLink to="/training" className={({ isActive }) => `navbar__link${isActive ? " navbar__link--active" : ""}`}>
            Training & Development
          </NavLink>

          <NavLink to="/why-choose-us" className={({ isActive }) => `navbar__link${isActive ? " navbar__link--active" : ""}`}>
            Why Choose Us
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
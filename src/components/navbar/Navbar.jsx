import "./navbar.scss";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaChevronDown } from "react-icons/fa6";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  const closeMenu = () => {
    setMenuOpen(false);
    setServicesOpen(false);
  };

  return (
    <header className="navbar">
      <div className="navbar__container">

        <Link to="/" className="navbar__logo">
          <div className="navbar__logo-mark">
            M
          </div>

          <div className="navbar__logo-text">
            <span className="navbar__logo-main">Mylotic</span>
            <span className="navbar__logo-sub">Group</span>
          </div>
        </Link>

        <nav className={`navbar__menu${menuOpen ? " navbar__menu--open" : ""}`}>

          <NavLink to="/" end onClick={closeMenu} className={({ isActive }) => `navbar__link${isActive ? " navbar__link--active" : ""}`}>
            Home
          </NavLink>

          <NavLink to="/about" onClick={closeMenu} className={({ isActive }) => `navbar__link${isActive ? " navbar__link--active" : ""}`}>
            About Us
          </NavLink>

          <div className={`navbar__dropdown${servicesOpen ? " navbar__dropdown--open" : ""}`}>
            <NavLink
              to="/services"
              onClick={(event) => {
                if (window.innerWidth <= 900) {
                  event.preventDefault();
                  setServicesOpen((open) => !open);
                }
              }}
              className={({ isActive }) => `navbar__link${isActive ? " navbar__link--active" : ""}`}
              aria-expanded={servicesOpen}
            >
              Services
              <FaChevronDown className="navbar__arrow" />
            </NavLink>

            <div className="navbar__dropdown-menu">
              <Link to="/services" onClick={closeMenu}>AI Solution</Link>
              <Link to="/services" onClick={closeMenu}>Mobile App Development</Link>
              <Link to="/services" onClick={closeMenu}>GCC Global Capability Centre</Link>
              <Link to="/services" onClick={closeMenu}>HR Services</Link>
              <Link to="/services" onClick={closeMenu}>AI Solutions &amp; Automation</Link>
              <Link to="/services" onClick={closeMenu}>Edtech</Link>
              <Link to="/services" onClick={closeMenu}>Digital Marketing</Link>
              <Link to="/services" onClick={closeMenu}>IT Consulting</Link>
            </div>
          </div>

          <NavLink to="/training" onClick={closeMenu} className={({ isActive }) => `navbar__link${isActive ? " navbar__link--active" : ""}`}>
            Training & Development
          </NavLink>

          <NavLink to="/contact" onClick={closeMenu} className={({ isActive }) => `navbar__contact${isActive ? " navbar__contact--active" : ""}`}>
            Contact Us
          </NavLink>

        </nav>

        <button
          type="button"
          className={`navbar__mobile-btn${menuOpen ? " navbar__mobile-btn--open" : ""}`}
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

      </div>
    </header>
  );
}

export default Navbar;
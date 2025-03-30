import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaUserMd, FaBars, FaTimes } from "react-icons/fa"; // Import icons
import "./Navbar.css"; // Import external stylesheet

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav>
      {/* Navigation logo section */}
      <div className="nav__logo">
        {/* Link to the home page */}
        <Link to="/">
          StayHealthy
          <FaUserMd className="nav__icon-logo" /> {/* Doctor icon */}
        </Link>
        <span>.</span>
      </div>

      {/* Navigation icon section with an onClick event listener */}
      <div className="nav__icon" onClick={handleClick}>
        {isOpen ? <FaTimes className="menu-icon" /> : <FaBars className="menu-icon" />}
      </div>

      {/* Unordered list for navigation links */}
      <ul className={`nav__links ${isOpen ? "active" : ""}`}>
        <li className="link">
          <Link to="/">Home</Link>
        </li>
        <li className="link">
          <Link to="/appointments">Appointments</Link>
        </li>
        <li className="link">
          <Link to="/signup">
            <button className="btn1">Sign Up</button>
          </Link>
        </li>
        <li className="link">
          <Link to="/login">
            <button className="btn1">Login</button>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProfileCard from "../ProfileCard/ProfileCard"; // Import the ProfileCard component
import "./Navbar.css";

const Navbar = () => {
  const [click, setClick] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  const handleClick = () => setClick(!click);

  const handleLogout = () => {
    sessionStorage.removeItem("auth-token");
    sessionStorage.removeItem("name");
    sessionStorage.removeItem("email");
    sessionStorage.removeItem("phone");
    localStorage.removeItem("doctorData");
    setIsLoggedIn(false);
    setUsername("");
    window.location.reload();
  };

  useEffect(() => {
    // Check sessionStorage for login details
    const storedEmail = sessionStorage.getItem("email");
    if (storedEmail) {
      setIsLoggedIn(true);
      setUsername(storedEmail);
    }
  }, []);

  // Extract the name before the '@' in the email
  const displayName = username ? username.split("@")[0] : "";

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  // Mock user data for the ProfileCard
  const user = {
    name: displayName || "User",
    email: username || "user@example.com",
    role: "Member",
    avatar: "https://via.placeholder.com/100", // Placeholder avatar
  };

  return (
    <nav>
      <div className="nav__logo">
        <Link to="/" className="logo-link">
          StayHealthy <i style={{ color: "#2190FF" }} className="fa fa-user-md"></i>
        </Link>
        <span>.</span>
      </div>
      <div className="nav__icon" onClick={handleClick} role="button" tabIndex={0}>
        <i className={click ? "fa fa-times" : "fa fa-bars"}></i>
      </div>
      <ul className={click ? "nav__links active" : "nav__links"}>
        <li className="link">
          <Link to="/">Home</Link>
        </li>
        <li className="link">
          <Link to="/instant-consultation">Instant Consultation</Link>
        </li>
        <li className="link">
          <Link to="/search/doctors">Appointments</Link>
        </li>
        <li className="link">
          <Link to="/healthblog">Health Blog</Link>
        </li>
        <li className="link">
          <Link to="/reviews">Reviews</Link>
        </li>
        {isLoggedIn ? (
          <>
            <li className="link">
              <span className="welcome-message" onClick={toggleDropdown}>
                Welcome, {displayName} <i className="fa fa-caret-down"></i>
              </span>
              <div className={`dropdown-menu ${showDropdown ? "show" : ""}`}>
                <ProfileCard user={user} /> {/* Render ProfileCard in the dropdown */}
              </div>
            </li>
            <li className="link">
              <button className="btn1 logout-button" onClick={handleLogout}>
                Logout
              </button>
            </li>
          </>
        ) : (
          <>
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
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
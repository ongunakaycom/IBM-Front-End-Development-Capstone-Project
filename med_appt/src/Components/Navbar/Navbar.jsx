import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ProfileCard from "../ProfileCard/ProfileCard"; // Import ProfileCard component
import "./Navbar.css";

const Navbar = () => {
    const navigate = useNavigate();
    const [click, setClick] = useState(false);
    const [user, setUser] = useState(null);
    const [showDropdown, setShowDropdown] = useState(false);

    // Toggle mobile menu
    const handleClick = () => setClick(!click);

    // Toggle profile dropdown
    const toggleDropdown = () => setShowDropdown(!showDropdown);

    // Logout function
    const handleLogout = () => {
        sessionStorage.removeItem("auth-token");
        sessionStorage.removeItem("name");
        sessionStorage.removeItem("email");
        sessionStorage.removeItem("phone");
        localStorage.removeItem("doctorData");
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        setUser(null);
        navigate("/login");
        window.location.reload(); // Ensures navbar updates
    };

    // Load user from localStorage & sessionStorage
    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        const storedName = sessionStorage.getItem("name");
        const storedEmail = sessionStorage.getItem("email");

        if (storedUser) {
            setUser(storedUser);
        } else if (storedEmail && storedName) {
            setUser({ name: storedName, email: storedEmail });
        }
    }, []);

    // Extract name before '@' for display
    const displayName = user?.name ? user.name.split("@")[0] : "User";

    // Mock user data for ProfileCard
    const profileData = {
        name: displayName,
        email: user?.email || "user@example.com",
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
                <li className="link"><Link to="/">Home</Link></li>
                <li className="link"><Link to="/instant-consultation">Instant Consultation</Link></li>
                <li className="link"><Link to="/search/doctors">Appointments</Link></li>
                <li className="link"><Link to="/healthblog">Health Blog</Link></li>
                <li className="link"><Link to="/reviews">Reviews</Link></li>

                {user ? (
                    <>
                        <li className="link">
                            <span className="welcome-message" onClick={toggleDropdown}>
                                Welcome, {displayName} <i className="fa fa-caret-down"></i>
                            </span>
                            <div className={`dropdown-menu ${showDropdown ? "show" : ""}`}>
                                <ProfileCard user={profileData} />
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
                            <Link to="/signup"><button className="btn1">Sign Up</button></Link>
                        </li>
                        <li className="link">
                            <Link to="/login"><button className="btn1">Login</button></Link>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;

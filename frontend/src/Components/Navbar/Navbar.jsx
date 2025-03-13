import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const [activeLink, setActiveLink] = useState("Home");

  const handleNavClick = (link) => {
    setActiveLink(link);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="logo">Smart Learning</div>
        <ul className="nav-links">
          <li
            className={`nav-item ${activeLink === "Home" ? "active" : ""}`}
            onClick={() => handleNavClick("Home")}
          >
            <Link to="/Home">Home</Link>
          </li>
          <li
            className={`nav-item ${activeLink === "Aboutus" ? "active" : ""}`}
            onClick={() => handleNavClick("Aboutus")}
          >
            <Link to="/Aboutus">About Us</Link>
          </li>
          <li
            className={`nav-item ${activeLink === "Login" ? "active" : ""}`}
            onClick={() => handleNavClick("login")}
          >
            <Link to="/login">Login</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;

import React from "react";
import "./Foooter.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faFacebook,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { faPhone, faEnvelope } from "@fortawesome/free-solid-svg-icons";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-logo-section">
          <div className="logo">Logo</div>
          <div className="social-icons">
            <a href="/home" className="social-icon">
              <FontAwesomeIcon icon={faInstagram} />
            </a>
            <a href="/home" className="social-icon">
              <FontAwesomeIcon icon={faFacebook} />
            </a>
            <a href="/home" className="social-icon">
              <FontAwesomeIcon icon={faTwitter} />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="footer-links">
          <h4>Quick Link</h4>
          <ul>
            <li>
              <a href="#home">Home</a>
            </li>
            <li>
              <a href="#about">About</a>
            </li>
            <li>
              <a href="#contact">Contact</a>
            </li>
          </ul>
        </div>

        {/* About Us */}
        <div className="footer-about">
          <h4>About Us</h4>
          <p>We are here to help! Please feel free to connect with us.</p>
          <div className="contact-info">
            <p>
              <FontAwesomeIcon icon={faPhone} /> +977 9875678912
            </p>
            <p>
              <FontAwesomeIcon icon={faEnvelope} /> info3446@gmail.com
            </p>
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="footer-bottom">
        <p>Copyright © 2024. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;

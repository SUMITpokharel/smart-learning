import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faFacebook,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { faPhone, faEnvelope } from "@fortawesome/free-solid-svg-icons";

// Define CSS-in-JS styles
const footerStyles = {
  footer: {
    backgroundColor: "#00274d",
    color: "#fff",
    padding: "40px 20px",
  },
  footerContainer: {
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap",
    maxWidth: "1200px",
    margin: "0 auto",
  },
  footerLogoSection: {
    flex: 1,
    textAlign: "center",
  },
  logo: {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "20px",
  },
  socialIcons: {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
  },
  socialIcon: {
    color: "#fff",
    fontSize: "20px",
    textDecoration: "none",
    transition: "color 0.3s",
  },
  socialIconHover: {
    color: "#ff9800",
  },
  footerLinks: {
    flex: 1,
    textAlign: "center",
  },
  footerLinksH4: {
    fontSize: "18px",
    marginBottom: "15px",
  },
  footerLinksUl: {
    listStyle: "none",
    padding: 0,
    margin: 0,
  },
  footerLinksLi: {
    marginBottom: "10px",
  },
  footerLinksA: {
    color: "#fff",
    textDecoration: "none",
    transition: "color 0.3s",
  },
  footerLinksAHover: {
    color: "#ff9800",
  },
  footerAbout: {
    flex: 1,
    textAlign: "center",
  },
  footerAboutH4: {
    fontSize: "18px",
    marginBottom: "15px",
  },
  footerAboutP: {
    marginBottom: "15px",
    fontSize: "14px",
  },
  contactInfoP: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "5px",
    margin: "5px 0",
  },
  footerBottom: {
    textAlign: "center",
    marginTop: "20px",
    borderTop: "1px solid #ccc",
    paddingTop: "10px",
    fontSize: "14px",
  },
};

// Footer Component
const Footer = () => {
  return (
    <footer style={footerStyles.footer}>
      <div style={footerStyles.footerContainer}>
        {/* Logo Section */}
        <div style={footerStyles.footerLogoSection}>
          <div style={footerStyles.logo}>Smart Learning</div>
          <div style={footerStyles.socialIcons}>
            <a
              href="/home"
              style={footerStyles.socialIcon}
              onMouseOver={(e) => (e.target.style.color = "#ff9800")}
              onMouseOut={(e) => (e.target.style.color = "#fff")}
            >
              <FontAwesomeIcon icon={faInstagram} />
            </a>
            <a
              href="/home"
              style={footerStyles.socialIcon}
              onMouseOver={(e) => (e.target.style.color = "#ff9800")}
              onMouseOut={(e) => (e.target.style.color = "#fff")}
            >
              <FontAwesomeIcon icon={faFacebook} />
            </a>
            <a
              href="/home"
              style={footerStyles.socialIcon}
              onMouseOver={(e) => (e.target.style.color = "#ff9800")}
              onMouseOut={(e) => (e.target.style.color = "#fff")}
            >
              <FontAwesomeIcon icon={faTwitter} />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div style={footerStyles.footerLinks}>
          <h4 style={footerStyles.footerLinksH4}>Quick Link</h4>
          <ul style={footerStyles.footerLinksUl}>
            <li style={footerStyles.footerLinksLi}>
              <a
                href="#home"
                style={footerStyles.footerLinksA}
                onMouseOver={(e) => (e.target.style.color = "#ff9800")}
                onMouseOut={(e) => (e.target.style.color = "#fff")}
              >
                Home
              </a>
            </li>
            <li style={footerStyles.footerLinksLi}>
              <a
                href="/aboutus"
                style={footerStyles.footerLinksA}
                onMouseOver={(e) => (e.target.style.color = "#ff9800")}
                onMouseOut={(e) => (e.target.style.color = "#fff")}
              >
                About
              </a>
            </li>
            <li style={footerStyles.footerLinksLi}>
              <a
                href="#contact"
                style={footerStyles.footerLinksA}
                onMouseOver={(e) => (e.target.style.color = "#ff9800")}
                onMouseOut={(e) => (e.target.style.color = "#fff")}
              >
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* About Us */}
        <div style={footerStyles.footerAbout}>
          <h4 style={footerStyles.footerAboutH4}>About Us</h4>
          <p style={footerStyles.footerAboutP}>
            We are here to help! Please feel free to connect with us.
          </p>
          <div style={footerStyles.contactInfoP}>
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
      <div style={footerStyles.footerBottom}>
        <p>Copyright © 2024. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;

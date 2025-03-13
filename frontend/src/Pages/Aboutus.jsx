import React from "react";
import "./About.css";

const About = () => {
  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="hero">
        <h1>About us</h1>
      </section>

      {/* About Content */}
      <section className="about-content">
        <div className="about-main">
          <p>
            Smart Learning, we believe that education is the foundation of
            personal and professional success. Therefore, we are dedicated to
            providing students with a platform that will help them achieve their
            goals and aspirations.Our platform is designed to be simple and
            intuitive, so that even the most tech-challenged students can use it
            easily. We strive to make our platform accessible to everyone,
            regardless of their location or socio-economic background
          </p>
        </div>
        <p className="extra-text">
          We are constantly improving our platform, adding new features and
          functionalities to make it even more useful for our users. We welcome
          feedback and suggestions from our users, as we believe that this will
          help us make our platform even better.Education is highly important in
          everyone's life. It aids in the development of character, views, and
          intelligence. Regardless of how we are educated, each of us will have
          our ideas and methods of doing things,but proper study planning is
          most needed. It is a well-organized program that outlines study times
          and learning objectives. Assist in managing your college education and
          hold you accountable for your learning outcomes
        </p>
      </section>
    </div>
  );
};

export default About;

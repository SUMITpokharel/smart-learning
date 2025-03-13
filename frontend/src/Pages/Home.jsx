import React from "react";
import "./Home.css";

const Home = () => {
  return (
    <div className="landing-page">
      <section className="hero">
        <h1>
          "The great thing about learning is that it’s something no one can ever
          take away from you"
        </h1>
      </section>
      {/* About Section */}
      <section className="about">
        <h2>Smart Learning</h2>
        <div className="about-content">
          <div className="about-text">
            <p>
              Education is highly important in everyone's life. It aids in the
              development of character, views, and intelligence. Regardless of
              how we are educated, each of us will have our ideas and methods of
              doing things,but proper study planning is most needed. It is a
              well-organized program that outlines study times and learning
              objectives. Assist in managing your college education and hold you
              accountable for your learning outcomes
            </p>
            <button className="btn-learn-more">Learn More</button>
          </div>
        </div>
      </section>
      {/* Contact Section */}
      <section id="contact" className="contact">
        <h2>Contact Us</h2>
        <form>
          <div className="form-row">
            <input type="text" placeholder="Full Name" required />
            <input type="email" placeholder="Email Address" required />
          </div>
          <div className="form-row">
            <input type="text" placeholder="Phone" required />
            <input type="text" placeholder="Subject" required />
          </div>
          <textarea placeholder="Write a message" required></textarea>
          <button type="submit" className="btn-submit">
            Send us
          </button>
        </form>
      </section>
    </div>
  );
};

export default Home;

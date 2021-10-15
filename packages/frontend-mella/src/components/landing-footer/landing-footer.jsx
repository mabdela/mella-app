import React from 'react';
import './landing-footer.scss';

const LandingFooter = () => {
  const date = new Date();
  return (
    <div className="landing-footer-container">
      <h3 className="landing-footer-follow">Follow us </h3>
      <div className="landing-footer-icons">
        <a href="https://www.facebook.com">
          <img src="/images/facebook.svg" alt="Facebook" />
        </a>
        <a href="https://www.instagram.com">
          <img src="/images/instagram.svg" alt="Facebook" />
        </a>
        <a href="https://www.twitter.com">
          <img src="/images/twitter.svg" alt="Facebook" />
        </a>
        <a href="https://www.linkedin.com">
          <img src="/images/linkedin.svg" alt="Facebook" />
        </a>
      </div>
      <div className="copy-container">
        <i className="far fa-copyright"></i>
        <span className="footer-mella">MELLA</span>
        <span>{date.getFullYear()}</span>
      </div>
    </div>
  );
};

export default LandingFooter;

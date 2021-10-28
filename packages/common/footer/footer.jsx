import React from 'react';
import './footer.scss';
import Facebook from '../assets/images/facebook.svg';
import Instagram from '../assets/images/instagram.svg';
import Twitter from '../assets/images/twitter.svg';
import Linkedin from '../assets/images/linkedin.svg';

const Footer = () => {
  const date = new Date();
  return (
    <div className="landing-footer-container">
      <h3 className="landing-footer-follow">Follow us </h3>
      <div className="landing-footer-icons">
        <a href="https://www.facebook.com">
          <img src={Facebook} alt="Facebook" />
        </a>
        <a href="https://www.instagram.com">
          <img src={Instagram} alt="Instagram" />
        </a>
        <a href="https://www.twitter.com">
          <img src={Twitter} alt="Twitter" />
        </a>
        <a href="https://www.linkedin.com">
          <img src={Linkedin} alt="Linkedin" />
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

export default Footer;

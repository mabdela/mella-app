import React from 'react';
import { useLocation } from 'react-router';
import SignInPage from '../../pages/sign-in/sign-in';
import SignUpPage from '../../pages/sign-up/sign-up';
import './landing-home.scss';

const LandingHome = () => {
  const location = useLocation();
  return (
    <div className="landing-home-container">
      {location.pathname === '/home' || location.pathname === '/' ? (
        <SignInPage />
      ) : location.pathname === '/about' ? (
        <div className="landing-about-news">
          <h3>About</h3>{' '}
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.a type specimen book. It
            has survived not only five centuries, but also the leap into
            electronic typesetting, remaining essentially unchanged. It was
            popularised in the 1960s with the release of Letraset sheets
            containing Lorem Ipsum passages, and more recently with desktop
            publishing software like Aldus PageMaker including versions of Lorem
            Ipsum.
          </p>
        </div>
      ) : location.pathname === '/news' ? (
        <div className="landing-about-news">
          <h3>News</h3>{' '}
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.a type specimen book. It
            has survived not only five centuries, but also the leap into
            electronic typesetting, remaining essentially unchanged. It was
            popularised in the 1960s with the release of Letraset sheets
            containing Lorem Ipsum passages, and more recently with desktop
            publishing software like Aldus PageMaker including versions of Lorem
            Ipsum.
          </p>
        </div>
      ) : (
        location.pathname === '/signup' && <SignUpPage />
      )}

      {location.pathname === '/about' ||
      location.pathname === '/news' ? null : (
        <div className="landing-home-sidebar">
          <div className="landing-home-sidebar-item">
            <h3>Upcoming Event</h3>
          </div>
          <div className="landing-home-sidebar-item">
            <h3>More Services</h3>
            <div className="landing-home-subitem">
              <span>Educational News</span>
              <span>Languages</span>
              <span>Free Scholarship</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LandingHome;

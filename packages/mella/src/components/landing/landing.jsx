import React, { useState } from 'react';
import './landing.scss';

import { useMediaQuery } from 'react-responsive';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router';
import LandingHome from '../landing-home';
import LandingFooter from '../landing-footer/landing-footer';

const Landing = () => {
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const [show, setShow] = useState(false);

  const toggleShow = () => {
    setShow(!show);
  };
  const location = useLocation();
  return (
    <div style={{ height: '100vh', overflow: 'hidden' }}>
      <div className="landing-header-container">
        <div className="landing-header">
          <Link to="/">
            <img
              className="landing-image"
              src="/images/navlogo.png"
              alt="LOGO"
            />
          </Link>
          {!isMobile ? (
            <ul>
              <Link to="/" className="landing-links">
                <li
                  style={
                    location.pathname === '/'
                      ? {
                          fontWeight: 'bolder',
                          borderBottom: '1px solid',
                        }
                      : {}
                  }
                >
                  Home
                </li>
              </Link>
              <Link to="/about" className="landing-links">
                <li
                  style={
                    location.pathname === '/about'
                      ? {
                          fontWeight: 'bolder',
                          borderBottom: '1px solid',
                        }
                      : {}
                  }
                >
                  About
                </li>
              </Link>
              <Link to="/news" className="landing-links">
                <li
                  style={
                    location.pathname === '/news'
                      ? {
                          fontWeight: 'bolder',
                          borderBottom: '1px solid',
                        }
                      : {}
                  }
                >
                  News
                </li>
              </Link>
              <Link to="/signup" className="landing-links">
                <li
                  style={
                    location.pathname === '/signup'
                      ? {
                          fontWeight: 'bolder',
                          borderBottom: '1px solid',
                        }
                      : {}
                  }
                >
                  Sign up
                </li>
              </Link>
            </ul>
          ) : show ? (
            <i className="fas fa-times landing-icons" onClick={toggleShow}></i>
          ) : (
            <i className="fas fa-bars landing-icons" onClick={toggleShow}></i>
          )}
        </div>
      </div>
      <div className={show ? 'landing-sidebar' : 'landing-sidebar hide'}>
        <div className="list-container">
          <div>
            <Link to="/" className="landing-links" onClick={toggleShow}>
              <div
                className="landing-list"
                style={
                  location.pathname === '/'
                    ? {
                        backgroundColor: '#fff',
                      }
                    : {}
                }
              >
                Home
              </div>
            </Link>
            <Link to="/about" className="landing-links" onClick={toggleShow}>
              <div
                className="landing-list"
                style={
                  location.pathname === '/about'
                    ? {
                        backgroundColor: '#fff',
                      }
                    : {}
                }
              >
                About
              </div>
            </Link>
            <Link to="/news" className="landing-links" onClick={toggleShow}>
              <div
                className="landing-list"
                style={
                  location.pathname === '/news'
                    ? {
                        backgroundColor: '#fff',
                      }
                    : {}
                }
              >
                News
              </div>
            </Link>
          </div>
          <div>
            <Link to="/signup" className="landing-links" onClick={toggleShow}>
              <div
                className="landing-list list-auth"
                style={
                  location.pathname === '/signup'
                    ? {
                        backgroundColor: '#fff',
                      }
                    : {}
                }
              >
                Sign up
              </div>
            </Link>
          </div>
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          overflowY: 'scroll',
        }}
      >
        {/* main content */}
        {location.pathname === '/' ||
        location.pathname === '/about' ||
        location.pathname === '/news' ||
        location.pathname === '/signup' ? (
          <LandingHome />
        ) : null}

        {/* footer */}
        {location.pathname === '/' ||
        location.pathname === '/about' ||
        location.pathname === '/news' ||
        location.pathname === '/signup' ? (
          <LandingFooter />
        ) : null}
      </div>
    </div>
  );
};

export default Landing;

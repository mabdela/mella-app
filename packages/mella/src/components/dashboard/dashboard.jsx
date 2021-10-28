import React from 'react';
import './dashboard.scss';
import SideBar from '../side-bar';
import { useDispatch, useSelector } from 'react-redux';
import { togglePane } from '../../redux/side-bar/side-bar-actions';

// react-responsive
import { useMediaQuery } from 'react-responsive';

import { Button } from '@mui/material';
import { Link, Route, useRouteMatch } from 'react-router-dom';
import { logoutUserRequest } from '../../redux/user/user-action';
import Routes from '../routing/routes';

// common
import CommonAlert from '@mono-repo/common/alert/alert';
import { removeErrors } from 'src/redux/error/error-actions';

const Dashboard = () => {
  const dispatch = useDispatch();

  const hiddenState = useSelector(state => state.sidebar.hidden);
  const errorState = useSelector(state => state.error.message);

  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isLaptop = useMediaQuery({ minWidth: 1200 });

  const logout = () => {
    dispatch(logoutUserRequest());
  };

  const removeAlert = () => {
    dispatch(removeErrors());
  };

  let { url } = useRouteMatch();
  return (
    <div className="wrapper">
      {errorState && (
        <CommonAlert message={errorState} state="error" remove={removeAlert} />
      )}
      <SideBar />
      <div className="main-content">
        <div
          className="nav"
          style={
            !hiddenState && isLaptop
              ? { paddingLeft: '350px', paddingRight: '20px' }
              : isMobile
              ? { padding: '0 10px' }
              : { padding: '0 20px' }
          }
        >
          {/* <div className="brand">Mella</div> */}
          <div className="nav-contents">
            <Link to="/dashboard" style={{ textDecoration: 'none' }}>
              <img
                src="/images/navlogo.png"
                alt="MELLA"
                style={{ width: '50px' }}
              />
            </Link>
            {isMobile ? null : (
              <Button color="primary" onClick={logout}>
                LogOut
              </Button>
            )}
          </div>
          <div
            className={
              hiddenState ? 'icon-container move-icon' : 'icon-container '
            }
            onClick={() => {
              dispatch(togglePane());
            }}
          >
            {isMobile ? (
              hiddenState ? (
                <i className="fas fa-bars"></i>
              ) : (
                <i className="fas fa-times"></i>
              )
            ) : hiddenState ? (
              <i className="fas fa-chevron-right"></i>
            ) : (
              <i className="fas fa-chevron-left"></i>
            )}
          </div>
        </div>
        <div
          className="main-content-wrapper"
          style={
            !hiddenState && isLaptop ? { paddingLeft: '350px' } : { margin: 0 }
          }
        >
          <Route path={url} component={Routes} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

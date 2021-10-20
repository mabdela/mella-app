import React from 'react';
import { useSelector } from 'react-redux';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import DashboardPage from './pages/dashboard/dashboard';
import LandingPage from './pages/landing/landing';
import Resume from './pages/resume/resume';
import CommonNotFound from '@mono-repo/common/not-found/not-found';

const App = () => {
  const user = useSelector(state => state.auth.isAuthenticated);
  // let cookieValue = document.cookie.replace(
  //   /(?:(?:^|.*;\s*)jwt\s*\=\s*([^;]*).*$)|^.*$/,
  //   '$1'
  // );

  //https://stackoverflow.com/questions/8064318/how-to-read-a-httponly-cookie-using-javascript
  return (
    <Router>
      <Switch>
        <Route
          exact
          path="/"
          component={() => (user ? <Resume /> : <LandingPage />)}
        />

        <Route exact path="/about" component={LandingPage} />
        <Route exact path="/news" component={LandingPage} />
        <Route exact path="/signup" component={LandingPage} />
        <Route
          path="/dashboard"
          component={() => (!user ? <Redirect to="/" /> : <DashboardPage />)}
        />
        <Route component={CommonNotFound} />
      </Switch>
    </Router>
  );
};

export default App;

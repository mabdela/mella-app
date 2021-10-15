import React from 'react';
import { useSelector } from 'react-redux';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import NotFound from './components/not-found/not-found';
import DashboardPage from './pages/dashboard/dashboard';
import LandingPage from './pages/landing/landing';
import Resume from './pages/resume/resume';

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
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
};

export default App;

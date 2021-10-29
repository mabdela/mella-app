import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import DashboardPage from './pages/dashboard/dashboard';
import LandingPage from './pages/landing/landing';
import Resume from './pages/resume/resume';
import CommonNotFound from '@mono-repo/common/not-found/not-found';
import Course from './pages/course/course';
import PrivateRoute from '@mono-repo/common/private-route/private-route';

const App = () => {
  const user = useSelector(state => state.auth.isAuthenticated);
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
        <PrivateRoute user={user} path="/dashboard" component={DashboardPage} />
        <PrivateRoute user={user} path="/course-list" component={Course} />
        <Route component={CommonNotFound} />
      </Switch>
    </Router>
  );
};

export default App;

import { Box, Toolbar } from '@mui/material';
import { useSelector } from 'react-redux';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import Navigation from './component/navigation/navigation';
import PrivateRoute from '@mono-repo/common/private-route/private-route';
import CommentsList from './pages/comments/comments-list';
import QuizAddPage from './pages/quizzes/quiz-add/quiz-add';
import QuizzesList from './pages/quizzes/quiz-list/quizzes-list';
import SignIn from './pages/sign-in/sign-in';
import UserAdd from './pages/users/user-add/user-add';
import UsersListPage from './pages/users/user-list/users-list';
import UserSearchPage from './pages/users/user-search/user-search';
import UserUpdatePassword from './pages/users/user-update-password/user-update-password';

function App() {
  const user = useSelector(state => state.auth.isAuthenticated);
  return (
    <div style={{ display: 'flex' }}>
      <Router>
        <Route
          exact
          path="/"
          component={() =>
            !user ? <SignIn /> : <Redirect to="/users/search" />
          }
        />

        {user && <Navigation />}
        <Box
          component="main"
          sx={!user ? { display: 'none' } : { display: 'block', flexGrow: 1 }}
        >
          <Toolbar />
          <Switch>
            <PrivateRoute
              user={user}
              exact
              path="/users/users-list"
              component={UsersListPage}
            />
            <PrivateRoute
              user={user}
              exact
              path="/users/search"
              component={UserSearchPage}
            />
            <PrivateRoute
              user={user}
              exact
              path="/users/add"
              component={UserAdd}
            />
            <PrivateRoute
              user={user}
              exact
              path="/comments/comment-list"
              component={CommentsList}
            />
            <PrivateRoute
              user={user}
              exact
              path="/quizzes/quizzes-list"
              component={QuizzesList}
            />
            <PrivateRoute
              user={user}
              exact
              path="/quizzes/add"
              component={QuizAddPage}
            />
            <PrivateRoute
              user={user}
              exact
              path="/users/update-password"
              component={UserUpdatePassword}
            />
          </Switch>
        </Box>
      </Router>
    </div>
  );
}

export default App;

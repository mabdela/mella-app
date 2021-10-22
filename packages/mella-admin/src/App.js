import { Box, Toolbar } from '@mui/material';
import { useSelector } from 'react-redux';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import Navigation from './component/navigation/navigation';
import CommentsList from './pages/comments/comments-list';
import QuizAddPage from './pages/quizzes/quiz-add/quiz-add';
import QuizzesList from './pages/quizzes/quiz-list/quizzes-list';
import SignIn from './pages/sign-in/sign-in';
import UsersListPage from './pages/users/user-list/users-list';
import UserSearchPage from './pages/users/user-search/user-search';
import UserUpdatePassword from './pages/users/user-update-password/user-update-password';

function App() {
  const user = useSelector(state => state.users.isAuthenticated);
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
            <Route
              exact
              path="/users/users-list"
              component={() =>
                !user ? <Redirect to="/" /> : <UsersListPage />
              }
            />
            <Route
              exact
              path="/users/search"
              component={() =>
                !user ? <Redirect to="/" /> : <UserSearchPage />
              }
            />
            <Route
              exact
              path="/users/add"
              component={() =>
                !user ? <Redirect to="/" /> : <div>Users Add </div>
              }
            />
            <Route
              exact
              path="/comments/comment-list"
              component={() => (!user ? <Redirect to="/" /> : <CommentsList />)}
            />
            <Route
              exact
              path="/quizzes/quizzes-list"
              component={() => (!user ? <Redirect to="/" /> : <QuizzesList />)}
            />
            <Route
              exact
              path="/quizzes/add"
              component={() => (!user ? <Redirect to="/" /> : <QuizAddPage />)}
            />
            <Route
              exact
              path="/users/update-password"
              component={() =>
                !user ? <Redirect to="/" /> : <UserUpdatePassword />
              }
            />
          </Switch>
        </Box>
      </Router>
    </div>
  );
}

export default App;

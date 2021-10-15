import { Box, Toolbar } from '@mui/material';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navigation from './component/navigation/navigation';
import CommentsList from './pages/comments/comments-list';
import QuizAddPage from './pages/quizzes/quiz-add/quiz-add';
import QuizzesList from './pages/quizzes/quiz-list/quizzes-list';
import UsersListPage from './pages/users/user-list/users-list';
import UserSearchPage from './pages/users/user-search/user-search';

function App() {
  return (
    <div style={{ display: 'flex' }}>
      <Router>
        <Navigation />
        <Box component="main" sx={{ flexGrow: 1 }}>
          <Toolbar />
          <Switch>
            <Route exact path="/" render={() => <div>Home</div>} />
            <Route exact path="/users/users-list" component={UsersListPage} />
            <Route exact path="/users/search" component={UserSearchPage} />
            <Route
              exact
              path="/comments/comment-list"
              component={CommentsList}
            />
            <Route exact path="/quizzes/quizzes-list" component={QuizzesList} />
            <Route exact path="/quizzes/add" component={QuizAddPage} />
          </Switch>
        </Box>
      </Router>
    </div>
  );
}

export default App;

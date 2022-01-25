import { Box, Toolbar } from '@mui/material';
import { useSelector } from 'react-redux';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import Navigation from './component/navigation/navigation';
import AdminAdd from './pages/admin-page/admin-add/admin-add';
import AdminList from './pages/admin-page/admin-list/admin-list';
import AdminSearch from './pages/admin-page/admin-search/admin-search';
import ArticleAdd from './pages/article/article-add/article-add';
import ChapterAdd from './pages/chapter/chapter-add/chapter-add';
import ChapterList from './pages/chapter/chapter-list/chapter-list';
import CourseAdd from './pages/course/course-add/course-add';
import CourseList from './pages/course/course-list/course-list';
import SignIn from './pages/sign-in/sign-in';

function App() {
  const user = useSelector(state => state.auth.isAuthenticated);
  return (
    <div style={{ display: 'flex' }}>
      <Router>
        <Route
          exact
          path="/"
          component={() => (!user ? <SignIn /> : <Redirect to="/admin/add" />)}
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
              path="/admin/add"
              component={() => (!user ? <Redirect to="/" /> : <AdminAdd />)}
            />
            <Route
              exact
              path="/admin/add-course"
              component={() => (!user ? <Redirect to="/" /> : <CourseAdd />)}
            />
            <Route
              exact
              path="/admin/search"
              component={() => (!user ? <Redirect to="/" /> : <AdminSearch />)}
            />
            <Route
              exact
              path="/admin/admin-list"
              component={() => (!user ? <Redirect to="/" /> : <AdminList />)}
            />
            <Route
              exact
              path="/admin/course-list"
              component={() => (!user ? <Redirect to="/" /> : <CourseList />)}
            />
            <Route
              exact
              path="/admin/add-chapter"
              component={() => (!user ? <Redirect to="/" /> : <ChapterAdd />)}
            />

            <Route
              exact
              path="/admin/chapter-list"
              component={() => (!user ? <Redirect to="/" /> : <ChapterList />)}
            />
            <Route
              exact
              path="/admin/add-article"
              component={() => (!user ? <Redirect to="/" /> : <ArticleAdd />)}
            />
          </Switch>
        </Box>
      </Router>
    </div>
  );
}

export default App;

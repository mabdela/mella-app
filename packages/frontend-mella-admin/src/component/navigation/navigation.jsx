import React, { useState } from 'react';

import { makeStyles } from '@mui/styles';

import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
} from '@mui/material';
import {
  Search,
  Menu,
  AddCircleOutline,
  FormatListBulleted,
} from '@mui/icons-material';

import { NavLink } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  title: {
    margin: 'auto',
  },
  drawerPaper: {
    backgroundColor: '#5874ad',
    height: '100%',
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
  },
  link: {
    textDecoration: 'none',
    color: '#000',
  },
}));

const drawerWidth = 300;

const Navigation = props => {
  const { window } = props;
  const classes = useStyles();
  const [showDrawer, setShowDrawer] = useState(false);

  const toggleDrawer = () => {
    setShowDrawer(!showDrawer);
  };

  const drawer = (
    <div className={classes.drawerPaper}>
      <Toolbar />
      <Divider />
      <Typography variant="h6" sx={{ color: '#000', p: '15px', m: 0 }}>
        Users
      </Typography>
      <Divider />
      <List
      // sx={{ p: '10px' }}
      >
        {usersNavOptions.map(user => (
          <NavLink
            className={classes.link}
            to={`/users/${user.link}`}
            key={user.primary}
          >
            <ListItem
              button
              key={user.primary}
              // sx={{
              //   p: '8px',
              //   mb: '5px',
              //   cursor: 'pointer',
              //   backgroundColor: 'hsla(0,0%,100%,.7)',
              //   borderRadius: '3px',
              // }}
            >
              <ListItemIcon>{user.icon}</ListItemIcon>
              <ListItemText primary={user.primary} />
            </ListItem>
          </NavLink>
        ))}
      </List>
      <Divider />
      <Typography variant="h6" sx={{ p: '15px', m: 0 }}>
        Quizzes
      </Typography>
      <Divider />
      <List>
        {quizzesNavOptions.map(quiz => (
          <NavLink
            className={classes.link}
            to={`/quizzes/${quiz.link}`}
            key={quiz.primary}
          >
            <ListItem button key={quiz.primary}>
              <ListItemIcon>{quiz.icon}</ListItemIcon>
              <ListItemText primary={quiz.primary} />
            </ListItem>
          </NavLink>
        ))}
      </List>

      <Divider />
      <Typography variant="h6" sx={{ p: '15px', m: 0 }}>
        Comments
      </Typography>
      <Divider />
      <List>
        {commentNavOptions.map(comment => (
          <NavLink
            className={classes.link}
            to={`/comments/${comment.link}`}
            key={comment.primary}
          >
            <ListItem button key={comment.primary}>
              <ListItemIcon>{comment.icon}</ListItemIcon>
              <ListItemText primary={comment.primary} />
            </ListItem>
          </NavLink>
        ))}
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex', md: { width: drawerWidth } }}>
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: '#fff',
          boxShadow: '0 7px 29px 0 rgb(100 100 111 / 20%)',
          width: { md: `calc(100% - ${drawerWidth}px)` },
          ml: { md: `${drawerWidth}px` },
        }}
      >
        <Toolbar className={classes.toolbar}>
          <IconButton
            size="medium"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{
              mr: 2,
              display: { md: 'none', xs: 'block' },
              mt: '7px',
              color: '#5874ad',
            }}
            onClick={toggleDrawer}
          >
            <Menu />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, textAlign: 'center', color: '#5874ad' }}
            className={classes.title}
          >
            Mella Admin Panel
          </Typography>
        </Toolbar>
      </AppBar>

      <Box
        component="nav"
        sx={{
          width: { md: drawerWidth },
          flexShrink: { sm: 0 },
          height: '100vh',
        }}
        aria-label="mailbox folders"
      >
        <Drawer
          container={container}
          variant="temporary"
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
          anchor="left"
          open={showDrawer}
          onClose={toggleDrawer}
        >
          {drawer}
        </Drawer>
        {/*  */}
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', md: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
};

export default Navigation;

const usersNavOptions = [
  {
    link: 'search',
    primary: 'Search Users',
    icon: <Search />,
  },
  {
    link: 'add',
    primary: 'Add Users',
    icon: <AddCircleOutline />,
  },
  {
    link: 'users-list',
    primary: 'Users List',
    icon: <FormatListBulleted />,
  },
];

const commentNavOptions = [
  {
    link: 'comment-list',
    primary: 'Comment List',
    icon: <FormatListBulleted />,
  },
];

const quizzesNavOptions = [
  {
    link: 'search',
    primary: 'Search Quizzes',
    icon: <Search />,
  },
  {
    link: 'add',
    primary: 'Add Quizzes',
    icon: <AddCircleOutline />,
  },
  {
    link: 'quizzes-list',
    primary: 'Quizzes List',
    icon: <FormatListBulleted />,
  },
];

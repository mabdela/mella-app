import React from 'react';
import {
  Toolbar,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
} from '@mui/material';
import navdata from '../navigation/nav-data';
import { NavLink } from 'react-router-dom';

import { makeStyles } from '@mui/styles';
const useStyles = makeStyles(theme => ({
  title: {
    margin: 'auto',
  },
  drawerPaper: {
    backgroundColor: '#5874ad',
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

const NavDrawer = () => {
  const classes = useStyles();
  return (
    <Box
      className={classes.drawerPaper}
      sx={{ height: { md: '100% !important' } }}
    >
      <Toolbar />
      <Divider />
      <Typography variant="h6" sx={{ color: '#000', p: '15px', m: 0 }}>
        Users
      </Typography>
      <Divider />
      <List>
        {navdata.usersNavOptions.map(user => (
          <NavLink
            className={classes.link}
            to={`/users/${user.link}`}
            key={user.primary}
          >
            <ListItem button key={user.primary}>
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
        {navdata.quizzesNavOptions.map(quiz => (
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
        {navdata.commentNavOptions.map(comment => (
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
    </Box>
  );
};

export default NavDrawer;

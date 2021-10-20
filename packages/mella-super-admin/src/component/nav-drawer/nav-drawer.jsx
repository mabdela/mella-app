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
  drawerPaper: {
    backgroundColor: '#5874ad',
    height: '100vh',
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
        Admins
      </Typography>
      <Divider />
      <List>
        {navdata.adminNavOptions.map(admin => (
          <NavLink
            className={classes.link}
            to={`/admin/${admin.link}`}
            key={admin.primary}
          >
            <ListItem button key={admin.primary}>
              <ListItemIcon>{admin.icon}</ListItemIcon>
              <ListItemText primary={admin.primary} />
            </ListItem>
          </NavLink>
        ))}
      </List>
    </Box>
  );
};

export default NavDrawer;

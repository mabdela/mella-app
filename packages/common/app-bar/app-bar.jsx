import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Button } from '@mui/material';
import { Menu } from '@mui/icons-material';

import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(theme => ({
  title: {
    margin: 'auto',
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
  },
}));

const drawerWidth = 300;

const appbar = ({ click, text, handleLogout }) => {
  const classes = useStyles();
  return (
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
          onClick={click}
        >
          <Menu />
        </IconButton>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, color: '#5874ad' }}
          className={classes.title}
        >
          {text}
        </Typography>
        <Button sx={{ color: '#5874ad' }} onClick={() => handleLogout()}>
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default appbar;

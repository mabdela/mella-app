import React, { useEffect } from 'react';
import { Alert } from '@mui/material';

import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(theme => ({
  container: {
    position: 'fixed',
    top: '70px',
    right: 0,
    margin: 'auto',
  },
}));

const alert = ({ message, state, remove, admin }) => {
  const classes = useStyles();
  useEffect(() => {
    let timer = message && setTimeout(() => remove(), 2000);
    return () => {
      clearTimeout(timer);
    };
  }, [message]);

  return (
    <Alert
      variant="filled"
      severity={state}
      className={classes.container}
      sx={
        admin
          ? {
              left: { xs: 0, md: '299px' },
              width: { xs: '250px', sm: '330px' },
            }
          : { left: 0, width: { xs: '250px', sm: '330px' } }
      }
    >
      {message}
    </Alert>
  );
};

export default alert;

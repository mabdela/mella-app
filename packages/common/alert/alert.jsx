import React, { useEffect } from 'react';
import { Alert } from '@mui/material';
import './alert.scss';

const alert = ({ message, state, remove, name, admin }) => {
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
      className={name}
      sx={
        admin
          ? {
              position: 'fixed',
              top: '70px',
              width: '300px',
              left: 0,
              right: 0,
              m: 'auto',
            }
          : {}
      }
    >
      {message}
    </Alert>
  );
};

export default alert;

import React, { useEffect } from 'react';
import { Alert } from '@mui/material';
import './alert.scss';

const alert = ({ message, state, remove, name }) => {
  useEffect(() => {
    let timer = message && setTimeout(() => remove(), 2000);
    return () => {
      clearTimeout(timer);
    };
  }, [message]);

  return (
    <Alert variant="filled" severity={state} className={name}>
      {message}
    </Alert>
  );
};

export default alert;

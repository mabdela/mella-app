import React from 'react';
import { CircularProgress } from '@mui/material';

const Spinner = () => {
  return (
    <div
      style={{
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <CircularProgress style={{ color: '#5874ad' }} />
    </div>
  );
};

export default Spinner;

import React from 'react';
import { Backdrop, CircularProgress } from '@mui/material';

const Loading = () => {
  return (
    <Backdrop
      open={true}
      sx={{
        color: '#5874ad',
        zIndex: '1200',
        ml: { md: '299px' },
      }}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default Loading;

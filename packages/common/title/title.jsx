import React from 'react';
import { Typography } from '@mui/material';

const title = ({ text }) => {
  return (
    <Typography
      variant="h6"
      gutterBottom
      component="div"
      sx={{
        textAlign: { xs: 'start' },
        width: { sm: '500px', md: '550px' },
        m: '60px auto 20px',
      }}
    >
      {text}
    </Typography>
  );
};

export default title;

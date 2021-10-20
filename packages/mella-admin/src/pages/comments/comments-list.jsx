import React from 'react';
import { Box, Typography } from '@mui/material';
import Comment from '../../component/comment/comment';

const CommentsList = () => {
  return (
    <Box sx={{ p: { xs: 1, md: 2 } }}>
      <Typography
        variant="h6"
        gutterBottom
        component="div"
        sx={{
          textAlign: { xs: 'start' },
          width: { sm: '500px', md: '550px', xl: '800px' },
          m: '60px auto 20px',
        }}
      >
        Comments
      </Typography>
      <Comment />
    </Box>
  );
};

export default CommentsList;

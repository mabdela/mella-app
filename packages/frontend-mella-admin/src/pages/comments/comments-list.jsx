import React from 'react';
import { Box, Typography } from '@mui/material';
import Comment from '../../component/comment/comment';

const CommentsList = () => {
  return (
    <Box sx={{ p: { xs: 1, md: 3 } }}>
      <Typography
        variant="h6"
        gutterBottom
        component="div"
        sx={{
          textAlign: { xs: 'start' },
          width: { md: '800px' },
          m: '10px auto 20px',
        }}
      >
        Comments
      </Typography>
      <Comment />
    </Box>
  );
};

export default CommentsList;

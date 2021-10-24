import React from 'react';
import { Box } from '@mui/material';
import Comment from '../../component/comment/comment';
import CommonTitle from '@mono-repo/common/title/title';

const CommentsList = () => {
  return (
    <Box sx={{ p: { xs: 1, md: 2 } }}>
      <CommonTitle text="Comments" />
      <Comment />
    </Box>
  );
};

export default CommentsList;

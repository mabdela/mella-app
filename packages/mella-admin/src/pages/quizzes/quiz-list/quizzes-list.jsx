import React from 'react';
import { Box, Typography } from '@mui/material';
import Quizzes from '../../../component/quizzes/quiz-list/quizzes';

const QuizzesList = () => {
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
        Quizzes
      </Typography>
      {/* <Comment /> */}
      <Quizzes />
    </Box>
  );
};

export default QuizzesList;

import React from 'react';
import { Box, Typography } from '@mui/material';
import QuizAdd from '../../../component/quizzes/quiz-add/quiz-add';

const QuizAddPage = () => {
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
        Add Quizzes
      </Typography>
      <QuizAdd />
    </Box>
  );
};

export default QuizAddPage;

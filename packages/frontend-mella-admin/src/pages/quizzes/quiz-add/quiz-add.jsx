import React from 'react';
import { Box, Typography } from '@mui/material';
import QuizAdd from '../../../component/quizzes/quiz-add/quiz-add';

const QuizAddPage = () => {
  return (
    <Box sx={{ p: { xs: 1, md: 3 } }}>
      <Typography
        variant="h6"
        gutterBottom
        component="div"
        sx={{
          textAlign: { xs: 'start' },
          width: { md: '800px' },
          m: '30px auto 20px',
        }}
      >
        Add Quizzes
      </Typography>
      <QuizAdd />
    </Box>
  );
};

export default QuizAddPage;

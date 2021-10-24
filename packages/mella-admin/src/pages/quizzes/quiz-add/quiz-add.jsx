import React from 'react';
import { Box } from '@mui/material';
import QuizAdd from '../../../component/quizzes/quiz-add/quiz-add';
import CommonTitle from '@mono-repo/common/title/title';

const QuizAddPage = () => {
  return (
    <Box sx={{ p: { xs: 1, md: 2 } }}>
      <CommonTitle text="Add Quizzes" />
      <QuizAdd />
    </Box>
  );
};

export default QuizAddPage;

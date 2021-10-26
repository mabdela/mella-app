import React from 'react';
import { Box } from '@mui/material';
import Quizzes from '../../../component/quizzes/quiz-list/quizzes';
import CommonTitle from '@mono-repo/common/title/title';

const QuizzesList = () => {
  return (
    <Box sx={{ p: { xs: 1, md: 2 } }}>
      <CommonTitle text="Quizzes" />
      {/* <Comment /> */}
      <Quizzes />
    </Box>
  );
};

export default QuizzesList;

import React, { useState } from 'react';
import './edit.scss';
import {
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Box,
  Typography,
} from '@mui/material';
import CommonButton from '@mono-repo/common/button/button';
import CommonInput from '@mono-repo/common/text-field/text-field';
import { useDispatch } from 'react-redux';
import { updateQuizRequest } from 'src/redux/quizzes/quizzes-actions';

const EditQuiz = ({ data, handleClose, topic, open }) => {
  const dispatch = useDispatch();
  const [quizData, setQuizData] = useState({
    question: data.question ? data.question : '',
    choiceA: data.choice[0] ? data.choice[0] : '',
    choiceB: data.choice[1] ? data.choice[1] : '',
    choiceC: data.choice[2] ? data.choice[2] : '',
    choiceD: data.choice[3] ? data.choice[3] : '',
    answer: data.answer ? data.answer : '',
    explanation: data.explanation ? data.explanation : '',
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setQuizData({ ...quizData, [name]: value });
  };

  const closeModal = () => {
    handleClose();
  };

  const handleClick = () => {
    dispatch(
      updateQuizRequest({
        topic_id: topic,
        questionId: data.id,
        question: quizData.question,
        choice: [
          `${quizData.choiceA}`,
          `${quizData.choiceB}`,
          `${quizData.choiceC}`,
          `${quizData.choiceD}`,
        ],
        answer: quizData.answer.charCodeAt(0) - 65,
        explanation: quizData.explanation,
      })
    );
    handleClose();
  };
  const answers = ['A', 'B', 'C', 'D'];

  const { question, choiceA, choiceB, choiceC, choiceD, answer, explanation } =
    quizData;
  return (
    <Box
      className="edit-container"
      sx={{
        width: { sm: '400px' },
        transform: {
          xs: 'translate(-50%, -50%)',
          md: 'translate(-16%, -50%);',
        },
      }}
    >
      <Typography variant="h6" className="edit-title" sx={{ mb: 3 }}>
        Update Quiz
      </Typography>
      <CommonInput
        label="question"
        type="text"
        name="question"
        value={question}
        onChange={handleChange}
        needBoxMargin
      />

      <CommonInput
        label="A"
        type="text"
        name="choiceA"
        value={choiceA}
        onChange={handleChange}
        needBoxMargin
      />

      <CommonInput
        label="B"
        type="text"
        name="choiceB"
        value={choiceB}
        onChange={handleChange}
        needBoxMargin
      />

      <CommonInput
        label="C"
        type="text"
        name="choiceC"
        value={choiceC}
        onChange={handleChange}
        needBoxMargin
      />

      <CommonInput
        label="D"
        type="text"
        name="choiceD"
        value={choiceD}
        onChange={handleChange}
        needBoxMargin
      />
      <Box sx={{ mb: 2 }}>
        <FormControl required variant="outlined" fullWidth margin="normal">
          <InputLabel id="Answer">Answer</InputLabel>
          <Select
            name="answer"
            labelId="Answer"
            label="Answer"
            fullWidth
            value={answer}
            onChange={handleChange}
          >
            {answers.map((item, index) => (
              <MenuItem key={index} value={item}>
                {item}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <CommonInput
        label="Explanation"
        type="text"
        name="explanation"
        value={explanation}
        onChange={handleChange}
        needBoxMargin
      />

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
        <CommonButton
          text="Cancel"
          isFilled={false}
          click={closeModal}
          isTiny={true}
        />
        <CommonButton text="Update" isFilled click={handleClick} />
      </Box>
    </Box>
  );
};

export default EditQuiz;

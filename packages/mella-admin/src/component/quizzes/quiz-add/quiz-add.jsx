import React, { useEffect, useState } from 'react';
import Validation from '@mono-repo/common/input-validation/quiz-validation';
import { Select, MenuItem, InputLabel, FormControl, Box } from '@mui/material';
import { hashData } from '../../data/data';

import { makeStyles } from '@mui/styles';
import { useDispatch, useSelector } from 'react-redux';
import {
  addQuizRequest,
  removeMessage,
  removeQuiz,
  // removeMessage,
} from '../../../redux/quizzes/quizzes-actions';
import {
  deleteUsers,
  removeSearchUser,
} from '../../../redux/users/user-action';
import CommonAlert from '@mono-repo/common/alert/alert';
import CommonButton from '@mono-repo/common/button/button';
import CommonInput from '@mono-repo/common/text-field/text-field';
import { removeComment } from 'src/redux/comment/comment-action';
import { removeErrors } from 'src/redux/error/error-actions';

const useStyles = makeStyles(() => ({
  container: {
    marginLeft: 'auto',
    marginRight: 'auto',
    boxShadow: '0 7px 29px 0 rgb(100 100 111 / 20%)',
    backgroundColor: '#4267b2',
    borderRadius: '5px',
  },
  wrapper: {
    padding: '15px',
    backgroundColor: 'hsla(0,0%,100%,.6)',
  },
}));

const QuizAdd = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const successMessage = useSelector(state => state.quizzes.message);
  const error = useSelector(state => state.errors.message);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [quizData, setQuizData] = useState({
    question: '',
    choiceA: '',
    choiceB: '',
    choiceC: '',
    choiceD: '',
    answer: '',
    explanation: '',
    topic: '',
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    const postData = {
      topic_id: quizData.topic,
      question,
      choice: [
        `${quizData.choiceA}`,
        `${quizData.choiceB}`,
        `${quizData.choiceC}`,
        `${quizData.choiceD}`,
      ],
      answer: parseInt(quizData.answer.toUpperCase().charCodeAt(0) - 65),
      explanation: quizData.explanation,
      keywords: [],
    };
    if (Object.keys(errors).length === 0 && isSubmitted) {
      dispatch(addQuizRequest(postData));
      setQuizData({
        question: '',
        choiceA: '',
        choiceB: '',
        choiceC: '',
        choiceD: '',
        answer: '',
        explanation: '',
        topic: '',
      });
    }
  }, [dispatch, errors, isSubmitted]);

  useEffect(() => {
    dispatch(removeComment());
    dispatch(removeQuiz());
    dispatch(deleteUsers());
    dispatch(removeSearchUser());
  }, [dispatch]);

  const handleSubmit = e => {
    e.preventDefault();
    setErrors(Validation(quizData));
    setIsSubmitted(true);
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setQuizData({ ...quizData, [name]: value });
  };

  const remove = () => {
    dispatch(removeMessage());
  };

  const removeError = () => {
    dispatch(removeErrors());
  };
  const answers = ['A', 'B', 'C', 'D'];

  const {
    question,
    choiceA,
    choiceB,
    choiceC,
    choiceD,
    answer,
    explanation,
    topic,
  } = quizData;

  return (
    <Box
      className={classes.container}
      sx={{ width: { sm: '500px', md: '550px', xl: '800px' }, mb: 3 }}
    >
      {successMessage && (
        <CommonAlert
          message={successMessage}
          state="success"
          admin={true}
          remove={remove}
        />
      )}

      {error && (
        <CommonAlert
          message={error}
          state="error"
          admin={true}
          remove={removeError}
        />
      )}

      <div className={classes.wrapper}>
        <FormControl required variant="outlined" fullWidth margin="normal">
          <InputLabel id="Topic">Topic</InputLabel>
          <Select
            name="topic"
            labelId="Topic"
            label="Topic"
            fullWidth
            value={topic}
            onChange={handleChange}
          >
            <MenuItem disabled selected>
              Topics
            </MenuItem>
            {Object.keys(hashData).map((item, index) => (
              <MenuItem key={index} value={hashData[`${item}`]}>
                {item}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <CommonInput
          isError={errors.question ? true : false}
          label="question"
          type="text"
          name="question"
          value={question}
          onChange={handleChange}
          error={errors.question}
          needBoxMargin
        />
        <div>
          <CommonInput
            isError={errors.choiceA ? true : false}
            label="A"
            type="text"
            name="choiceA"
            value={choiceA}
            onChange={handleChange}
            error={errors.choiceA}
            needBoxMargin
          />

          <CommonInput
            isError={errors.choiceB ? true : false}
            label="B"
            type="text"
            name="choiceB"
            value={choiceB}
            onChange={handleChange}
            error={errors.choiceB}
            needBoxMargin
          />

          <CommonInput
            isError={errors.choiceC ? true : false}
            label="C"
            type="text"
            name="choiceC"
            value={choiceC}
            onChange={handleChange}
            error={errors.choiceC}
            needBoxMargin
          />

          <CommonInput
            isError={errors.choiceD ? true : false}
            label="D"
            type="text"
            name="choiceD"
            value={choiceD}
            onChange={handleChange}
            error={errors.choiceD}
            needBoxMargin
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
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
        </div>
        <CommonInput
          isError={errors.explanation ? true : false}
          label="Explanation"
          type="text"
          name="explanation"
          value={explanation}
          onChange={handleChange}
          error={errors.explanation}
          needBoxMargin
        />

        <CommonButton
          text="Add Quiz"
          isFilled={true}
          click={handleSubmit}
          center
        />
      </div>
    </Box>
  );
};

export default QuizAdd;

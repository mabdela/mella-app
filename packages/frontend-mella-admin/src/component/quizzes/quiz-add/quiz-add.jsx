import React, { useEffect, useState } from 'react';
import {
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Box,
  Alert,
} from '@mui/material';
import { hashData } from '../../data/data';

import { makeStyles } from '@mui/styles';
import { useDispatch, useSelector } from 'react-redux';
import {
  addQuizRequest,
  removeMessage,
} from '../../../redux/quizzes/quizzes-actions';
import { deleteUsers } from '../../../redux/users/user-action';

const useStyles = makeStyles(() => ({
  container: {
    margin: 'auto',
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

  useEffect(() => {
    dispatch(deleteUsers());
  }, [dispatch]);

  useEffect(() => {
    let timer =
      successMessage.message &&
      setTimeout(() => dispatch(removeMessage()), 2000);
    return () => {
      clearTimeout(timer);
    };
  }, [dispatch, successMessage.message]);

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

  // choice null value if its value is ''
  // like color

  const handleSubmit = async () => {
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
    const postData = {
      topic_id: topic,
      question,
      choice: [`${choiceA}`, `${choiceB}`, `${choiceC}`, `${choiceD}`],
      answer: parseInt(answer.toUpperCase().charCodeAt(0) - 65),
      explanation,
      keywords: [],
    };

    dispatch(addQuizRequest(postData));
    // await axios
    //   .post('http://localhost:5000/', postData)
    //   .then(res => console.log(res.data))
    //   .catch(error => console.log(error.message));

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
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setQuizData({ ...quizData, [name]: value });
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
    <Box className={classes.container} sx={{ width: { sm: '800px' }, mb: 3 }}>
      {successMessage.message && (
        <Alert
          variant="filled"
          severity="success"
          sx={{ position: 'fixed', top: '70px', width: '300px' }}
        >
          {successMessage.message}
        </Alert>
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

        <TextField
          name="question"
          label="Question"
          variant="outlined"
          fullWidth
          margin="normal"
          required
          value={question}
          onChange={handleChange}
        />
        <div>
          <TextField
            name="choiceA"
            label="A"
            variant="outlined"
            fullWidth
            required
            margin="normal"
            value={choiceA}
            onChange={handleChange}
          />

          <TextField
            name="choiceB"
            label="B"
            variant="outlined"
            fullWidth
            required
            margin="normal"
            value={choiceB}
            onChange={handleChange}
          />
          <TextField
            name="choiceC"
            label="C"
            variant="outlined"
            fullWidth
            required
            margin="normal"
            value={choiceC}
            onChange={handleChange}
          />
          <TextField
            name="choiceD"
            label="D"
            variant="outlined"
            fullWidth
            required
            margin="normal"
            value={choiceD}
            onChange={handleChange}
          />
        </div>
        <div>
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
        <TextField
          name="explanation"
          label="Explanation"
          variant="outlined"
          fullWidth
          required
          margin="normal"
          value={explanation}
          onChange={handleChange}
        />

        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          sx={{
            m: '10px auto auto auto',
            textAlign: 'center',
            display: 'flex',
          }}
        >
          Add Quiz
        </Button>
      </div>
    </Box>
  );
};

export default QuizAdd;

import React, { useEffect, useState } from 'react';
import { Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@mui/styles';
import { hashData } from '../../data/data';
import PopUp from '../../modal/pop-up';
import {
  getQuizRequest,
  removeQuizLoading,
} from '../../../redux/quizzes/quizzes-actions';
import { deleteUsers } from '../../../redux/users/user-action';
import CommonButton from '@mono-repo/common/button/button';
import { removeComment } from 'src/redux/comment/comment-action';
import CommonLoading from '@mono-repo/common/loading/loading';
import QuizData from '../../quiz-list-data/quiz-list-data';
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

const Quizzes = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const quizzes = useSelector(state => state.quizzes.quizzes);
  const loading = useSelector(state => state.quizzes.loading);
  const users = useSelector(state => state.users.users);
  const comments = useSelector(state => state.comments.comments);

  const [open, setOpen] = useState(false);
  const [id, setId] = useState('');
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    users.length > 0 && dispatch(deleteUsers());
    comments.length > 0 && dispatch(removeComment());
  }, [dispatch, users, comments]);

  useEffect(() => {
    let timer =
      isClicked &&
      setTimeout(
        () => dispatch(removeQuizLoading(), setIsClicked(false)),
        9000
      );

    return () => {
      clearTimeout(timer);
    };
  }, [dispatch, isClicked]);

  const handleOpen = (id, firstname, lastname) => {
    setOpen(true);
    setId(id);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleQuiz = () => {
    dispatch(getQuizRequest(topic));
    setIsClicked(true);
  };

  const [topic, setTopic] = useState('');
  return (
    <>
      <Box
        className={classes.container}
        sx={{ width: { sm: '500px', md: '550px', xl: '800px' }, mb: 3 }}
      >
        <div className={classes.wrapper}>
          <FormControl
            required
            variant="outlined"
            fullWidth
            sx={{ mb: 2, mt: 2 }}
          >
            <InputLabel id="Topic">Topic</InputLabel>
            <Select
              name="topic"
              labelId="Topic"
              label="Topic"
              fullWidth
              value={topic}
              onChange={e => setTopic(e.target.value)}
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

          <CommonButton
            click={handleQuiz}
            text="Search"
            isFilled={true}
            center
            isTiny
          />
        </div>
      </Box>
      <>
        {/*modal  */}
        {open && <PopUp open={open} handleClose={handleClose} id={id} />}
        {loading === true ? (
          <CommonLoading />
        ) : (
          quizzes.length > 0 &&
          quizzes.map((quiz, index) => (
            <QuizData
              key={quiz.id}
              quiz={quiz}
              index={index}
              handleDelete={handleOpen}
            />
          ))
        )}
      </>
    </>
  );
};

export default Quizzes;

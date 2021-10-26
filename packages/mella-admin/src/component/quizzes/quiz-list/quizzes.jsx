import React, { useEffect, useState } from 'react';
import { Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@mui/styles';
import { hashData } from '../../data/data';
import PopUp from '../../modal/pop-up';
import {
  getQuizRequest,
  removeMessage,
} from '../../../redux/quizzes/quizzes-actions';
import {
  deleteUsers,
  removeSearchUser,
} from '../../../redux/users/user-action';
import CommonButton from '@mono-repo/common/button/button';
import { removeComment } from 'src/redux/comment/comment-action';
import CommonLoading from '@mono-repo/common/loading/loading';
import QuizData from '../../quiz-list-data/quiz-list-data';
import EditQuiz from 'src/component/edit-modal/edit-quiz';
import CommonAlert from '@mono-repo/common/alert/alert';
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

const Quizzes = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const quizzes = useSelector(state => state.quizzes.quizzes);
  const loading = useSelector(state => state.quizzes.loading);
  const message = useSelector(state => state.quizzes.message);
  const error = useSelector(state => state.errors.message);

  const [open, setOpen] = useState(false);
  // const [id, setId] = useState('');
  const [topicId, setTopicId] = useState('');
  const [questionId, setQuestionId] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [currentId, setCurrentId] = useState('');

  useEffect(() => {
    dispatch(deleteUsers());
    dispatch(removeComment());
    dispatch(removeSearchUser());
  }, [dispatch]);

  const handleOpen = (topicId, questionId) => {
    setOpen(true);
    setTopicId(topicId);
    setQuestionId(questionId);
    // setId(id);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleModalOpen = quizId => {
    setShowModal(true);
    setCurrentId(quizId);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleQuiz = () => {
    dispatch(getQuizRequest(topic));
  };

  const remove = () => {
    dispatch(removeMessage());
  };

  const removeError = () => {
    dispatch(removeErrors());
  };

  const [topic, setTopic] = useState('');
  return (
    <>
      <Box
        className={classes.container}
        sx={{ width: { sm: '500px', md: '550px', xl: '800px' }, mb: 3 }}
      >
        {message && (
          <CommonAlert
            message={message}
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
        {open && (
          <PopUp
            open={open}
            handleClose={handleClose}
            topicId={topicId}
            questionId={questionId}
          />
        )}
        {/* update */}
        {showModal && (
          <EditQuiz
            handleClose={handleModalClose}
            data={quizzes.find(quiz => quiz.id === currentId)}
            topic={topic}
          />
        )}
        {loading === true ? (
          <CommonLoading />
        ) : (
          quizzes.length > 0 &&
          quizzes.map((quiz, index) => (
            <QuizData
              key={index}
              quiz={quiz}
              topic={topic}
              index={index}
              handleDelete={handleOpen}
              handleEdit={handleModalOpen}
            />
          ))
        )}
      </>
    </>
  );
};

export default Quizzes;

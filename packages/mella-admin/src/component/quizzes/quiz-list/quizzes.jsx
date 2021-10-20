import React, { useEffect, useState } from 'react';
import {
  Box,
  Backdrop,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
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
        {
          loading === true ? (
            <Backdrop
              open={true}
              sx={{
                color: '#5874ad',
                zIndex: '1200',
                ml: { sm: '299px' },
              }}
            >
              <CircularProgress color="inherit" />
            </Backdrop>
          ) : (
            quizzes.length > 0 &&
            quizzes.map((quiz, index) => (
              <Box
                className={classes.container}
                key={quiz.id}
                sx={{ width: { sm: '500px', md: '550px', xl: '800px' }, mb: 3 }}
              >
                <div
                  style={{
                    backgroundColor: 'hsla(0,0%,100%,.6)',
                    padding: '16px',
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        marginBottom: '10px',
                        fontSize: '20px',
                        fontWeight: '600',
                        width: '650px',
                      }}
                    >
                      {index + 1} {'. '} {quiz.question}
                    </Box>
                    <span>
                      <i
                        className="far fa-edit"
                        style={{
                          color: 'rgba(24,125,24,.7215686274509804)',
                          cursor: 'pointer',
                        }}
                      ></i>
                      <i
                        onClick={() => handleOpen(quiz.id)}
                        className="far fa-trash-alt"
                        style={{
                          marginLeft: '15px',
                          marginRight: '15px',
                          color: 'rgba(236,72,72,.9)',
                          cursor: 'pointer',
                        }}
                      ></i>
                    </span>
                  </Box>
                  <div>
                    {quiz.choice.map((choose, index) => (
                      <div key={index} style={{ marginBottom: '5px' }}>
                        <span>{String.fromCharCode(65 + index)}</span>
                        {'. '}
                        <span>{choose}</span>
                      </div>
                    ))}
                  </div>
                  <div style={{ marginBottom: '5px' }}>
                    Answer: {String.fromCharCode(65 + quiz.answer)}
                  </div>
                  <div>Explanation: {quiz.explanation}</div>
                  {/* format="DD/MM/YYYY" */}
                </div>
              </Box>
            ))
          )
          //  : (
          //   <Typography
          //     variant="h5"
          //     gutterBottom
          //     component="div"
          //     sx={{
          //       textAlign: { xs: 'start' },
          //       width: { sm: '500px', md: '550px', xl: '800px' },
          //       m: '10px auto 20px',
          //     }}
          //   >
          //     No Quiz found.
          //   </Typography>
          // )
        }
      </>
    </>
  );
};

export default Quizzes;
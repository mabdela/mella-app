import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Backdrop,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@mui/styles';
import { hashData } from '../data/data';
import { getCommentRequest } from '../../redux/comment/comment-action';
import { removeQuiz } from '../../redux/quizzes/quizzes-actions';
import { deleteUsers } from '../../redux/users/user-action';
import Moment from 'react-moment';
import PopUp from '../modal/pop-up';

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

const Comment = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const comments = useSelector(state => state.comments.comments);
  const loading = useSelector(state => state.comments.loading);

  const [open, setOpen] = useState(false);
  const [id, setId] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');

  const handleOpen = (id, firstname, lastname) => {
    setOpen(true);
    setId(id);
    setFirstname(firstname);
    setLastname(lastname);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    dispatch(removeQuiz());
    dispatch(deleteUsers());
  }, [dispatch]);

  const [topic, setTopic] = useState('');
  return (
    <>
      <Box className={classes.container} sx={{ width: { sm: '800px' }, mb: 3 }}>
        <div className={classes.wrapper}>
          <FormControl required variant="outlined" fullWidth margin="normal">
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
          <Button
            variant="contained"
            sx={{
              backgroundColor: 'hsla(0,0%,100%,.7)',
              color: '#000',
              textTransform: 'capitalize',
              mt: 2,
            }}
            onClick={() => dispatch(getCommentRequest(topic))}
          >
            {' '}
            Search
          </Button>
        </div>
      </Box>
      <>
        {/*modal  */}
        {open && (
          <PopUp
            open={open}
            handleClose={handleClose}
            id={id}
            firstname={firstname}
            lastname={lastname}
          />
        )}
        {
          loading ? (
            <Backdrop
              open={true}
              sx={{
                color: '#5874ad',
                zIndex: '1200',
              }}
            >
              <CircularProgress color="inherit" />
            </Backdrop>
          ) : (
            comments.length > 0 &&
            comments.map(comment => (
              <Box
                className={classes.container}
                key={comment.comment_id}
                sx={{ width: { md: '800px' }, mb: 3 }}
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
                      }}
                    >
                      {comment.firstname.charAt(0).toUpperCase() +
                        comment.firstname.slice(1)}{' '}
                      {comment.lastname.charAt(0).toUpperCase() +
                        comment.lastname.slice(1)}{' '}
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
                        onClick={() =>
                          handleOpen(
                            comment.comment_id,
                            comment.firstname,
                            comment.lastname
                          )
                        }
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
                  <div>Comment: {comment.content}</div>
                  <div>Likes: {comment.likes.length} likes</div>
                  {/* format="DD/MM/YYYY" */}
                  <div>
                    Posted date:{' '}
                    <Moment fromNow ago>
                      {comment.date}
                    </Moment>{' '}
                    ago
                  </div>
                </div>
              </Box>
            ))
          )
          //  (
          //   <Typography
          //     variant="h5"
          //     gutterBottom
          //     component="div"
          //     sx={{
          //       textAlign: { xs: 'start' },
          //       width: { md: '800px' },
          //       m: '10px auto 20px',
          //     }}
          //   >
          //     No comment found.
          //   </Typography>
          // )
        }
      </>
    </>
  );
};

export default Comment;

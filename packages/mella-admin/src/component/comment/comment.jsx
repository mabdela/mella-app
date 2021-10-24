import React, { useState, useEffect } from 'react';
import { Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@mui/styles';
import { hashData } from '../data/data';
import {
  getCommentRequest,
  removeLoading,
} from '../../redux/comment/comment-action';
import { removeQuiz } from '../../redux/quizzes/quizzes-actions';
import { deleteUsers } from '../../redux/users/user-action';
import PopUp from '../modal/pop-up';
import CommonButton from '@mono-repo/common/button/button';
import EditComment from '../edit-modal/edit-comment';
import CommonLoading from '@mono-repo/common/loading/loading';
import CommentList from '../comment-list-data/comment-list-data';

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

const Comment = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const comments = useSelector(state => state.comments.comments);
  const loading = useSelector(state => state.comments.loading);

  const [open, setOpen] = useState(false);
  const [id, setId] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [isClicked, setIsClicked] = useState(false);
  const [topic, setTopic] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [currentId, setCurrentId] = useState('');

  const handleOpen = (id, firstname, lastname) => {
    setOpen(true);
    setId(id);
    setFirstname(firstname);
    setLastname(lastname);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleComment = () => {
    dispatch(getCommentRequest(topic));
    setIsClicked(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleModalOpen = id => {
    setShowModal(true);
    setCurrentId(id);
  };
  useEffect(() => {
    dispatch(removeQuiz());
    dispatch(deleteUsers());
  }, [dispatch]);

  useEffect(() => {
    let timer =
      isClicked &&
      setTimeout(() => dispatch(removeLoading(), setIsClicked(false)), 9000);

    return () => {
      clearTimeout(timer);
    };
  }, [dispatch, isClicked]);

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
            sx={{ mt: 2, mb: 2 }}
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
            click={handleComment}
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
            id={id}
            firstname={firstname}
            lastname={lastname}
          />
        )}

        {/* update */}
        {showModal && (
          <EditComment
            handleClose={handleModalClose}
            data={comments.find(comment => comment.comment_id === currentId)}
          />
        )}
        {loading ? (
          <CommonLoading />
        ) : (
          comments.length > 0 &&
          comments.map(comment => (
            <CommentList
              key={comment.comment_id}
              comment={comment}
              handleEdit={handleModalOpen}
              handleDelete={handleOpen}
            />
          ))
        )}
      </>
    </>
  );
};

export default Comment;

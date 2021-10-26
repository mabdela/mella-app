import React, { useState, useEffect } from 'react';
import {
  Box,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  TextField,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteUsers,
  getUserByEmailRequest,
  getUserByIdRequest,
  removeMessage,
} from '../../../redux/users/user-action';

import PopUp from '../../modal/pop-up';
import CommonButton from '@mono-repo/common/button/button';
import CommonAlert from '@mono-repo/common/alert/alert';
import { removeComment } from 'src/redux/comment/comment-action';
import { removeQuiz } from 'src/redux/quizzes/quizzes-actions';
import EditUser from 'src/component/edit-modal/edit-user';
import CommonLoading from '@mono-repo/common/loading/loading';
import CommonList from '@mono-repo/common/list-data/list-data';
import { removeErrors } from 'src/redux/error/error-actions';

const useStyles = makeStyles(theme => ({
  container: {
    marginLeft: 'auto',
    marginRight: 'auto',
    boxShadow: '0 7px 29px 0 rgb(100 100 111 / 20%)',
    backgroundColor: '#4267b2ba',
    borderRadius: '5px',
  },
  wrapper: {
    padding: '15px',
    backgroundColor: 'hsla(0,0%,100%,.6)',
  },
}));

const UserSearch = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const users = useSelector(state => state.users.search);
  const loading = useSelector(state => state.users.loading);
  const errorMessage = useSelector(state => state.errors.message);
  const message = useSelector(state => state.users.message);

  const [value, setValue] = useState('User Id');
  const [text, setText] = useState('');
  const [id, setId] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [currentId, setCurrentId] = useState('');

  const [open, setOpen] = useState(false);

  useEffect(() => {
    dispatch(removeComment());
    dispatch(deleteUsers());
    dispatch(removeQuiz());
  }, [dispatch]);

  const handleChange = event => {
    setValue(event.target.value);
  };

  const handleOpen = (id, firstname, lastname) => {
    setOpen(true);
    setId(id);
    setFirstname(firstname);
    setLastname(lastname);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleModalOpen = id => {
    setShowModal(true);
    setCurrentId(id);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleRemove = () => {
    dispatch(removeErrors());
  };

  const handleRemoveMessage = () => {
    dispatch(removeMessage());
  };

  const searchUser = () => {
    value === 'Email'
      ? dispatch(getUserByEmailRequest(text))
      : dispatch(getUserByIdRequest(text));
  };

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
            remove={handleRemoveMessage}
          />
        )}
        {errorMessage && (
          <CommonAlert
            message={errorMessage}
            state="error"
            admin={true}
            remove={handleRemove}
          />
        )}
        <div className={classes.wrapper}>
          <FormControl component="fieldset">
            <FormLabel component="legend">Search By</FormLabel>
            <RadioGroup
              aria-label="Search By"
              defaultValue="User Id"
              name="radio-buttons-group"
              value={value}
              onChange={handleChange}
            >
              <FormControlLabel
                value="User Id"
                control={<Radio />}
                label="User Id"
              />
              <FormControlLabel
                value="Email"
                control={<Radio />}
                label="Email"
              />
            </RadioGroup>
          </FormControl>
          <Box sx={{ display: 'flex' }}>
            <TextField
              label={value}
              variant="standard"
              value={text}
              onChange={e => setText(e.target.value)}
              sx={{ mr: 2 }}
            />

            <CommonButton click={searchUser} text="Search" isFilled={true} />
          </Box>
        </div>
      </Box>

      {loading && errorMessage === null ? (
        <CommonLoading />
      ) : (
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
            <EditUser
              handleClose={handleModalClose}
              data={users.find(user => user._id === currentId)}
            />
          )}
          {users.length > 0 &&
            users.map(user => (
              <CommonList
                key={user._id}
                data={user}
                handleEdit={handleModalOpen}
                handleDelete={handleOpen}
              />
            ))}
        </>
      )}
    </>
  );
};

export default UserSearch;

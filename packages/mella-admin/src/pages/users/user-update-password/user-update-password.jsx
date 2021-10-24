import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import UpdateValidation from '@mono-repo/common/input-validation/update-validation';
import { makeStyles } from '@mui/styles';
import { useDispatch } from 'react-redux';
import { removeComment } from 'src/redux/comment/comment-action';
import {
  removeMessage,
  updatePasswordRequest,
} from 'src/redux/users/user-action';
import { useSelector } from 'react-redux';
import CommonInput from '@mono-repo/common/text-field/text-field';
import CommonButton from '@mono-repo/common/button/button';
import CommonAlert from '@mono-repo/common/alert/alert';
import { removeQuiz } from 'src/redux/quizzes/quizzes-actions';
import { removeErrors } from 'src/redux/error/error-actions';

const useStyles = makeStyles(theme => ({
  container: {
    margin: 'auto',
    boxShadow: '0 7px 29px 0 rgb(100 100 111 / 20%)',
    backgroundColor: '#4267b2ba',
    borderRadius: '5px',
  },
  wrapper: {
    padding: '15px',
    backgroundColor: 'hsla(0,0%,100%,.6)',
  },
}));

const UserUpdatePassword = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const message = useSelector(state => state.users.message);
  const error = useSelector(state => state.errors);
  const id = useSelector(state => state.auth.auth._id);

  const [errors, setErrors] = useState({});
  const [isSubmitted, setisSubmitted] = useState(false);
  const [showText, setShowText] = useState(false);
  const [userCredential, setUserCredential] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  useEffect(() => {
    const { currentPassword, newPassword } = userCredential;
    if (Object.keys(errors).length === 0 && isSubmitted) {
      dispatch(
        updatePasswordRequest({
          id: id,
          oldPassword: currentPassword,
          newPassword,
        })
      );
    }
  }, [errors, isSubmitted, userCredential, dispatch, id]);

  useEffect(() => {
    dispatch(removeComment());
    dispatch(removeQuiz());
  }, [dispatch]);

  const handleChange = e => {
    const { name, value } = e.target;

    setUserCredential({ ...userCredential, [name]: value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    setErrors(UpdateValidation(userCredential));
    setisSubmitted(true);
  };

  const handleIconClick = () => {
    setShowText(!showText);
  };

  const removeError = () => {
    dispatch(removeErrors());
  };

  const removeSuccess = () => {
    dispatch(removeMessage());
  };

  // when go to search user it has to delete all comments

  const { currentPassword, newPassword, confirmPassword } = userCredential;
  return (
    <Box sx={{ p: { xs: 1, md: 2 } }}>
      {message && (
        <CommonAlert
          message={message.message}
          state="success"
          admin={true}
          remove={removeSuccess}
        />
      )}

      {error.message && (
        <CommonAlert
          message={error.message}
          state="error"
          admin={true}
          remove={removeError}
        />
      )}
      <Typography
        variant="h6"
        gutterBottom
        component="div"
        sx={{
          textAlign: { xs: 'start' },
          width: { sm: '500px', md: '550px', xl: '800px' },
          m: '60px auto 20px',
        }}
      >
        Update Password
      </Typography>
      <Box
        className={classes.container}
        sx={{ width: { sm: '500px', md: '550px', xl: '800px' }, mb: 3 }}
      >
        <div className={classes.wrapper}>
          <form onSubmit={handleSubmit}>
            <CommonInput
              isError={errors.currentPassword ? true : false}
              label="Enter your current password"
              name="currentPassword"
              value={currentPassword}
              onChange={handleChange}
              error={errors.currentPassword}
              needBoxMargin
            />

            <CommonInput
              isError={errors.newPassword ? true : false}
              label="Enter your new password"
              type="password"
              name="newPassword"
              value={newPassword}
              onChange={handleChange}
              error={errors.newPassword}
              needBoxMargin
            />

            <CommonInput
              isError={errors.confirmPassword ? true : false}
              label="Confirm your password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleChange}
              error={errors.confirmPassword}
              inputProps={true}
              handleIcon={handleIconClick}
              showText={showText}
              needBoxMargin
            />
          </form>

          <CommonButton
            isFilled={true}
            isSuperTiny={true}
            center={true}
            click={handleSubmit}
            text="Change Password"
          />
        </div>
      </Box>
    </Box>
  );
};

export default UserUpdatePassword;

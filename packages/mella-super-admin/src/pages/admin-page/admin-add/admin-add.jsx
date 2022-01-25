import React, { useState, useEffect } from 'react';
import UserValidation from '@mono-repo/common/input-validation/user-validation';
import {
  //  Button,
  Box,
  // Alert,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useDispatch, useSelector } from 'react-redux';
import CommonInput from '@mono-repo/common/text-field/text-field';
import CommonButton from '@mono-repo/common/button/button';
import CommonAlert from '@mono-repo/common/alert/alert';
import CommonTitle from '@mono-repo/common/title/title';
import {
  addAdminRequest,
  removeAdmin,
  removeAdmins,
  removeMessage,
} from 'src/redux/users/user-action';
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

const AdminAdd = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const successMessage = useSelector(state => state.users.message);
  const errorMessage = useSelector(state => state.errors.message);

  const [showText, setHandleShowText] = useState(false);
  const [userCredential, setUserCredential] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    dispatch(removeAdmins());
    dispatch(removeAdmin());
  }, [dispatch]);

  useEffect(() => {
    const { firstname, lastname, email, password } = userCredential;
    if (Object.values(errors).length === 0 && isSubmitted) {
      dispatch(
        addAdminRequest({ firstname, lastname, email, password, Username: '' })
      );
      setUserCredential({
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        confirmPassword: '',
      });
    }
  }, [errors, isSubmitted, dispatch]);

  const handleChange = e => {
    const { name, value } = e.target;

    setUserCredential({ ...userCredential, [name]: value });
  };

  const handleIconClick = () => {
    setHandleShowText(!showText);
  };

  const handleSubmit = e => {
    e.preventDefault();
    setErrors(UserValidation(userCredential));
    setIsSubmitted(true);
  };

  const remove = () => {
    dispatch(removeMessage());
  };

  const removeError = () => {
    dispatch(removeErrors());
  };

  const { firstname, lastname, confirmPassword, email, password } =
    userCredential;
  return (
    <Box sx={{ p: { xs: 1, md: 2 } }}>
      <CommonTitle text="Add Admin" />
      {/* <UserList /> */}

      <Box
        className={classes.container}
        sx={{ width: { sm: '500px', md: '550px' }, mb: 3 }}
      >
        {successMessage && (
          <CommonAlert
            message={successMessage}
            state="success"
            remove={remove}
            admin={true}
          />
        )}
        {errorMessage && (
          <CommonAlert
            message={errorMessage}
            state="error"
            remove={removeError}
            admin={true}
          />
        )}
        <div className={classes.wrapper}>
          <form onSubmit={handleSubmit}>
            <CommonInput
              isError={errors.firstname ? true : false}
              label="First Name"
              type="text"
              name="firstname"
              value={firstname}
              onChange={handleChange}
              error={errors.firstname}
              needBoxMargin
            />
            <CommonInput
              isError={errors.lastname ? true : false}
              label="Last Name"
              type="text"
              name="lastname"
              value={lastname}
              onChange={handleChange}
              error={errors.lastname}
              needBoxMargin
            />

            <CommonInput
              isError={errors.email ? true : false}
              label="Email Address"
              type="email"
              name="email"
              value={email}
              onChange={handleChange}
              error={errors.email}
              needBoxMargin
            />

            <CommonInput
              isError={errors.password ? true : false}
              label="Password"
              showText={showText}
              name="password"
              value={password}
              onChange={handleChange}
              inputProps={true}
              error={errors.password}
              handleIcon={handleIconClick}
              needBoxMargin
            />

            <CommonInput
              isError={errors.confirmPassword ? true : false}
              label="Confirm Password"
              type="password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleChange}
              error={errors.confirmPassword}
              needBoxMargin
            />
          </form>
          <CommonButton
            text="Add Admin"
            isFilled={true}
            click={handleSubmit}
            center
          />
        </div>
      </Box>
    </Box>
  );
};

export default AdminAdd;

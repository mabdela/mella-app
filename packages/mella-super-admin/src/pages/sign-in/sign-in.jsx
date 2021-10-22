import React, { useState } from 'react';
// import  { Redirect } from 'react-router-dom'
// style
import './sign-in.scss';

import { useDispatch, useSelector } from 'react-redux';

// material-ui components
import { Checkbox, Button } from '@mui/material';
//routes
import { loginUserRequest } from 'src/redux/users/user-action';
import { removeErrors } from '../../redux/error/error-actions';
import CommonAlert from '@mono-repo/common/alert/alert';
import CommonInput from '@mono-repo/common/text-field/text-field';
import CommonButton from '@mono-repo/common/button/button';
import CommonLogo from '@mono-repo/common/logo/logo';

const SignIn = () => {
  const errorState = useSelector(state => state.errors);
  const dispatch = useDispatch();

  const [checked, setChecked] = useState(false);
  const [showText, setHandleShowText] = useState(false);
  const [userCredential, setUserCredential] = useState({
    email: '',
    password: '',
  });

  const handleCheck = event => {
    setChecked(event.target.checked);
  };
  const handleIconClick = () => {
    setHandleShowText(!showText);
  };

  const handleChange = e => {
    const { name, value } = e.target;

    setUserCredential({ ...userCredential, [name]: value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(loginUserRequest({ email, password }));
  };

  const removeAlert = () => {
    dispatch(removeErrors());
  };

  const { email, password } = userCredential;
  return (
    <div className="auth-content-container">
      <div className="container">
        {errorState.message && (
          <div className="alert-container">
            <CommonAlert
              message={errorState.message}
              state="error"
              remove={removeAlert}
              name="alert-error"
            />
          </div>
        )}

        <div className="wrapper">
          <CommonLogo />

          <form onSubmit={handleSubmit} style={{ marginTop: '50px' }}>
            <CommonInput
              label="Email Address"
              type="email"
              name="email"
              value={email}
              onChange={handleChange}
              needmargin={true}
            />

            <CommonInput
              label="Password"
              showText={showText}
              name="password"
              value={password}
              onChange={handleChange}
              inputProps={true}
              handleIcon={handleIconClick}
              needmargin={true}
            />
          </form>

          <div className="additional-info">
            <div className="remember">
              <Checkbox
                checked={checked}
                onChange={handleCheck}
                className="checkbox"
              />
              <span>Remember Me</span>
            </div>
            <Button className="forget">Forget Password?</Button>
          </div>

          <div className="buttons">
            <CommonButton
              classname="login"
              click={handleSubmit}
              text="Login Now"
              isFilled={true}
              isTiny={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;

import React, { useEffect, useState } from 'react';
// validation
import Validate from '../input-validation/Validation';

import { useDispatch, useSelector } from 'react-redux';

import { Link, useHistory } from 'react-router-dom';
import { registerUserRequest } from '../../redux/user/user-action';
import { removeErrors } from '../../redux/error/error-actions';
import CommonAlert from '@mono-repo/common/alert/alert';
import CommonInput from '@mono-repo/common/text-field/text-field';
import CommonButton from '@mono-repo/common/button/button';

const SignUp = () => {
  const dispatch = useDispatch();
  const errorState = useSelector(state => state.error);
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
  const history = useHistory();

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitted) {
      dispatch(registerUserRequest(userCredential, history));
    }
  }, [errors, history, isSubmitted, dispatch, userCredential]);

  const handleIconClick = () => {
    setHandleShowText(!showText);
  };

  const handleChange = e => {
    const { name, value } = e.target;

    setUserCredential({ ...userCredential, [name]: value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setErrors(Validate(userCredential));
    setIsSubmitted(true);
  };

  const removeAlert = () => {
    dispatch(removeErrors());
  };

  const { firstname, lastname, confirmPassword, email, password } =
    userCredential;
  return (
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
        <img
          src="/images/logo.png"
          alt="MELLA"
          style={{ width: '80px', margin: '0 auto' }}
        />

        <form
          onSubmit={handleSubmit}
          style={{ marginBottom: '15px', marginTop: '50px' }}
        >
          <div className="user-input-container">
            <div className="input-container firstname">
              <CommonInput
                isError={errors.firstname ? true : false}
                label="First Name"
                type="text"
                name="firstname"
                value={firstname}
                onChange={handleChange}
                error={errors.firstname}
              />
            </div>
            <div className="input-container">
              <CommonInput
                isError={errors.lastname ? true : false}
                label="Last Name"
                type="text"
                name="lastname"
                value={lastname}
                onChange={handleChange}
                error={errors.lastname}
              />
            </div>
          </div>

          <div className="input-container">
            <CommonInput
              isError={errors.email ? true : false}
              label="Email Address"
              type="email"
              name="email"
              value={email}
              onChange={handleChange}
              error={errors.email}
            />
          </div>

          <div className="input-container">
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
            />
          </div>

          <div className="input-container">
            <CommonInput
              isError={errors.confirmPassword ? true : false}
              label="Confirm Password"
              type="password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleChange}
              error={errors.confirmPassword}
            />
          </div>
        </form>

        <div className="buttons">
          <CommonButton
            text="Sign Up Now"
            isFilled={true}
            click={handleSubmit}
          />

          <Link to="/">
            <CommonButton text="Get Login" />
          </Link>
        </div>
        {/* 
        <div className="line-container">
          <div className="line"></div>
          <p className="line-text">OR</p>
          <div className="line"></div>
        </div>

        <div className="icons-container">
          <div className="icon-container google">
            <i className="fab fa-google"></i>
          </div>
          <div className="icon-container facebook">
            <i className="fab fa-facebook-f"></i>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default SignUp;

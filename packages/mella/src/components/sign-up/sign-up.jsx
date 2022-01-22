import React, { useEffect, useState } from 'react';
// validation
import Validation from '../input-validation/Validation';

import { useDispatch, useSelector } from 'react-redux';

import { Link, useHistory } from 'react-router-dom';
import { registerUserRequest } from '../../redux/user/user-action';
import { removeErrors } from '../../redux/error/error-actions';
import CommonAlert from '@mono-repo/common/alert/alert';
import CommonInput from '@mono-repo/common/text-field/text-field';
import CommonButton from '@mono-repo/common/button/button';
import CommonLogo from '@mono-repo/common/logo/logo';

const SignUp = () => {
  const dispatch = useDispatch();
  const errorState = useSelector(state => state.error.message);
  const [showText, setHandleShowText] = useState(false);
  const [userCredential, setUserCredential] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    confirm_password: '',
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

  const handleSubmit = e => {
    e.preventDefault();
    setErrors(Validation(userCredential));
    setIsSubmitted(true);
  };

  const removeAlert = () => {
    dispatch(removeErrors());
  };

  const { firstname, lastname, confirm_password, email, password } =
    userCredential;
  return (
    <div className="container">
      {errorState && (
        <CommonAlert message={errorState} state="error" remove={removeAlert} />
      )}
      <div className="wrapper">
        <CommonLogo />

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
              isError={errors.confirm_password ? true : false}
              label="Confirm Password"
              type="password"
              name="confirm_password"
              value={confirm_password}
              onChange={handleChange}
              error={errors.confirm_password}
            />
          </div>
        </form>

        <div className="buttons">
          <CommonButton
            text="Sign Up Now"
            isFilled={true}
            click={handleSubmit}
            isTiny={true}
          />

          <Link to="/">
            <CommonButton text="Get Login" isTiny={true} />
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

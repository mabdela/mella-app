import React, { useState, useEffect } from 'react';
import CourseValidation from '@mono-repo/common/input-validation/course-validation';
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
import { removeAdmin, removeAdmins } from 'src/redux/users/user-action';
import { removeErrors } from 'src/redux/error/error-actions';
import {
  createCourseRequest,
  removeMessage,
} from 'src/redux/course/course-action';

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

const CourseAdd = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const successMessage = useSelector(state => state.course.message);
  const user = useSelector(state => state.auth.auth.first_name);
  const errorMessage = useSelector(state => state.errors.message);
  const token = useSelector(state => state.auth.token);

  const [userCredential, setUserCredential] = useState({
    title: '',
    translated_title: '',
    imgurl: '',
    article_count: '',
    created_by: user,
  });
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    dispatch(removeAdmins());
    dispatch(removeAdmin());
  }, [dispatch]);

  useEffect(() => {
    const { title, translated_title, imgurl, article_count, created_by } =
      userCredential;
    const articles = parseInt(article_count);
    if (Object.values(errors).length === 0 && isSubmitted) {
      dispatch(
        createCourseRequest({
          data: {
            title,
            translated_title,
            imgurl,
            article_count: articles,
            created_by,
          },
          token: token,
        })
      );
      setUserCredential({
        title: '',
        translated_title: '',
        imgurl: '',
        article_count: '',
      });
    }
  }, [errors, isSubmitted, dispatch]);

  const handleChange = e => {
    const { name, value } = e.target;

    setUserCredential({ ...userCredential, [name]: value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    setErrors(CourseValidation(userCredential));
    setIsSubmitted(true);
  };

  const remove = () => {
    dispatch(removeMessage());
  };

  const removeError = () => {
    dispatch(removeErrors());
  };

  const { title, translated_title, imgurl, article_count } = userCredential;
  return (
    <Box sx={{ p: { xs: 1, md: 2 } }}>
      <CommonTitle text="Add Course" />
      {/* <UserList /> */}

      <Box
        className={classes.container}
        sx={{ width: { sm: '500px', md: '550px', xl: '800px' }, mb: 3 }}
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
              isError={errors.title ? true : false}
              label="Title"
              type="text"
              name="title"
              value={title}
              onChange={handleChange}
              error={errors.title}
              needBoxMargin
            />
            <CommonInput
              isError={errors.translated_title ? true : false}
              label="Translated Title"
              type="text"
              name="translated_title"
              value={translated_title}
              onChange={handleChange}
              error={errors.translated_title}
              needBoxMargin
            />

            <CommonInput
              isError={errors.imgurl ? true : false}
              label="Image URL"
              type="text"
              name="imgurl"
              value={imgurl}
              onChange={handleChange}
              error={errors.imgurl}
              needBoxMargin
            />
            <CommonInput
              isError={errors.article_count ? true : false}
              label="Article Count"
              type="text"
              name="article_count"
              value={article_count}
              onChange={handleChange}
              error={errors.article_count}
              needBoxMargin
            />
          </form>
          <CommonButton
            text="Add Course"
            isFilled={true}
            click={handleSubmit}
            center
          />
        </div>
      </Box>
    </Box>
  );
};

export default CourseAdd;

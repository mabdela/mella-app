import CommonAlert from '@mono-repo/common/alert/alert';
import CommonButton from '@mono-repo/common/button/button';
import ChapterValidation from '@mono-repo/common/input-validation/chapter-validation';
import CommonInput from '@mono-repo/common/text-field/text-field';
import CommonTitle from '@mono-repo/common/title/title';
import {
  //  Button,
  Box,
  MenuItem,
  TextField,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  createChapterRequest,
  removeChapter,
  removeMessage,
} from 'src/redux/chapter/chapter-action';
import { listCourseRequest } from 'src/redux/course/course-action';
import { removeErrors } from 'src/redux/error/error-actions';
import { removeAdmin, removeAdmins } from 'src/redux/users/user-action';

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

const ChapterAdd = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const successMessage = useSelector(state => state.chapter.message);
  const errorMessage = useSelector(state => state.errors.message);
  const courses = useSelector(state => state.course.courses);

  const [chapterData, setChapterData] = useState({
    title: '',
    course_id: '',
    articles_count: '',
  });
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    dispatch(listCourseRequest());
  }, [dispatch]);

  useEffect(() => {
    dispatch(removeAdmins());
    dispatch(removeAdmin());
    dispatch(removeChapter());
  }, [dispatch]);

  useEffect(() => {
    const { title, course_id, articles_count } = chapterData;
    if (Object.values(errors).length === 0 && isSubmitted) {
      dispatch(
        createChapterRequest({
          title,
          course_id,
          articles_count: parseInt(articles_count),
        })
      );
      setChapterData({
        title: '',
        course_id: '',
        articles_count: '',
      });
    }
  }, [errors, isSubmitted, dispatch]);

  const handleChange = e => {
    const { name, value } = e.target;

    setChapterData({ ...chapterData, [name]: value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    setErrors(ChapterValidation(chapterData));
    setIsSubmitted(true);
  };

  const remove = () => {
    dispatch(removeMessage());
  };

  const removeError = () => {
    dispatch(removeErrors());
  };

  const { title, articles_count, course_id } = chapterData;
  return (
    <Box sx={{ p: { xs: 1, md: 2 } }}>
      <CommonTitle text="Add Chapter" />

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
            <TextField
              select
              name="course_id"
              label="Select Course"
              value={course_id}
              onChange={handleChange}
              helperText="Please select Course"
              fullWidth
              margin="normal"
            >
              {courses.map(option => (
                <MenuItem key={option.id} value={option.id}>
                  {option.title}
                </MenuItem>
              ))}
            </TextField>

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
              isError={errors.articles_count ? true : false}
              label="Article Count"
              type="text"
              name="articles_count"
              value={articles_count}
              onChange={handleChange}
              error={errors.articles_count}
              needBoxMargin
            />
          </form>
          <CommonButton
            text="Add Chapter"
            isFilled={true}
            click={handleSubmit}
            center
          />
        </div>
      </Box>
    </Box>
  );
};

export default ChapterAdd;

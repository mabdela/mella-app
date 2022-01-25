import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PopUp from 'src/component/modal/pop-up';
import CommonTitle from '@mono-repo/common/title/title';
import CommonLoading from '@mono-repo/common/loading/loading';
import { getAdminRequest, removeAdmin } from 'src/redux/users/user-action';
import CommonList from '@mono-repo/common/list-data/list-data';
import CommonAlert from '@mono-repo/common/alert/alert';
import { removeErrors } from 'src/redux/error/error-actions';
import { listCourseRequest } from 'src/redux/course/course-action';
import { TextField, MenuItem, Box } from '@mui/material';
import {
  chapterListRequest,
  removeMessage,
} from 'src/redux/chapter/chapter-action';

const ChapterList = () => {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.users.loading);
  const message = useSelector(state => state.chapter.message);
  const error = useSelector(state => state.errors.message);
  const courses = useSelector(state => state.course.courses);
  const chapters = useSelector(state => state.chapter.chapters);

  const [open, setOpen] = useState(false);
  const [id, setId] = useState('');
  const [course_id, setCourseId] = useState('');

  const handleOpen = id => {
    setOpen(true);
    setId(id);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleRemoveMessage = () => {
    dispatch(removeMessage());
  };

  const removeError = () => {
    dispatch(removeErrors());
  };

  const handleChange = e => {
    const { value } = e.target;

    setCourseId(value);
  };

  useEffect(() => {
    dispatch(removeAdmin());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAdminRequest());
  }, [dispatch]);

  // course list
  useEffect(() => {
    dispatch(listCourseRequest());
  }, [dispatch]);

  // chapter list
  useEffect(() => {
    course_id !== '' && dispatch(chapterListRequest({ course_id }));
  }, [dispatch, course_id]);

  return (
    <Box sx={{ p: { xs: 1, md: 2 } }}>
      <CommonTitle text="Chapter List" />

      {message && (
        <CommonAlert
          message={message}
          state="success"
          remove={handleRemoveMessage}
          admin={true}
        />
      )}

      {error && (
        <CommonAlert
          message={error}
          state="error"
          remove={removeError}
          admin={true}
        />
      )}

      <Box
        sx={{
          width: { sm: '500px', md: '550px' },
          margin: '60px auto 20px',
        }}
      >
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
      </Box>

      {loading ? (
        <CommonLoading />
      ) : (
        <>
          {/*modal to delete  */}
          {open && <PopUp open={open} handleClose={handleClose} id={id} />}

          {chapters.map((chapter, index) => (
            <CommonList
              key={index}
              data={chapter}
              edit={false}
              handleDelete={handleOpen}
            />
          ))}
        </>
      )}
    </Box>
  );
};

export default ChapterList;

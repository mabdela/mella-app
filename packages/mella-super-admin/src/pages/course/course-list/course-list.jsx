import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import PopUp from 'src/component/modal/pop-up';
import CommonTitle from '@mono-repo/common/title/title';
import CommonLoading from '@mono-repo/common/loading/loading';
import { removeAdmin } from 'src/redux/users/user-action';
import CommonList from '@mono-repo/common/list-data/list-data';
import CommonAlert from '@mono-repo/common/alert/alert';
import { removeErrors } from 'src/redux/error/error-actions';
import {
  listCourseRequest,
  removeMessage,
} from 'src/redux/course/course-action';

const CourseList = () => {
  const dispatch = useDispatch();
  const courses = useSelector(state => state.course.courses);
  const loading = useSelector(state => state.users.loading);
  const message = useSelector(state => state.users.message);
  const error = useSelector(state => state.errors.message);

  const [open, setOpen] = useState(false);
  const [id, setId] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');

  const handleOpen = (id, firstname, lastname) => {
    setOpen(true);
    setId(id);
    setFirstname(firstname);
    setLastname(lastname);
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

  useEffect(() => {
    dispatch(removeAdmin());
  }, [dispatch]);

  useEffect(() => {
    dispatch(listCourseRequest());
  }, [dispatch]);

  return (
    <Box sx={{ p: { xs: 1, md: 2 } }}>
      <CommonTitle text="Course List" />

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

      {loading ? (
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

          {/* take a look at it */}

          {courses.map(course => (
            <CommonList
              key={course._id}
              data={course}
              // handleEdit={handleModalOpen}
              handleDelete={handleOpen}
            />
          ))}
        </>
      )}
    </Box>
  );
};

export default CourseList;

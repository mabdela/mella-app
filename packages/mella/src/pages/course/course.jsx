import React, { useState } from 'react';
import { Box, TextField, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import CommonFooter from '@mono-repo/common/footer/footer';

import './course.scss';

import { introdata } from 'src/components/data/intro-data';
import { useDispatch } from 'react-redux';
import { logoutUser } from 'src/redux/user/user-action';
import CourseList from 'src/components/course-list/course-list';

const Course = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState('');

  const filteredData = introdata.filter(data =>
    data.name.toLowerCase().includes(search.toLowerCase())
  );

  const logout = () => {
    dispatch(logoutUser());
  };
  return (
    <>
      <div className="landing-header-container">
        <div className="landing-header">
          <Link to="/course-list">
            <img
              className="landing-image"
              src="/images/navlogo.png"
              alt="LOGO"
            />
          </Link>
          <Button sx={{ color: '#4267b2' }} onClick={logout}>
            Logout
          </Button>
        </div>
      </div>
      <div className="course-container">
        <Box className="course-wrapper">
          <TextField
            className="course-text-field"
            variant="standard"
            label="Search Course"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <CourseList course={filteredData} />
        </Box>
        <CommonFooter />
      </div>
    </>
  );
};

export default Course;

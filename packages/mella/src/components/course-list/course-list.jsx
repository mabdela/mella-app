import React from 'react';
import { Box } from '@mui/material';
import { Link } from 'react-router-dom';
import './course-list.scss';

const CourseList = ({ course }) => {
  return (
    <Box sx={{ flexGrow: 1, textAlign: 'center', mt: 4 }}>
      <div className="course-card-list">
        {course &&
          course.map((data, index) => (
            <Link
              to={'/dashboard?course=' + data.id}
              className="link"
              key={index}
            >
              <div className="course-card-container">
                <img
                  src={data.imgurl}
                  alt={data.title}
                  className="course-card-image"
                />
                <h2 style={{ color: '#4267b2' }}>{data.title}</h2>
              </div>
            </Link>
          ))}
      </div>
    </Box>
  );
};

export default CourseList;

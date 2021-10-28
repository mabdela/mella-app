import React from 'react';
import { Box } from '@mui/material';
import { Link } from 'react-router-dom';
import './course-list.scss';

const CourseList = ({ course }) => {
  return (
    <Box sx={{ flexGrow: 1, textAlign: 'center', mt: 4 }}>
      <div className="course-card-list">
        {course.map((data, index) => (
          <Link to={data.link} className="link" key={index}>
            <div className="course-card-container">
              <img
                src={data.image}
                alt={data.name}
                style={{
                  width: '100%',
                  height: 'auto',
                  flexGrow: 1,
                  borderRadius: '4px',
                }}
              />
              <h2 style={{ color: '#4267b2' }}>{data.name}</h2>
            </div>
          </Link>
        ))}
      </div>
    </Box>
  );
};

export default CourseList;

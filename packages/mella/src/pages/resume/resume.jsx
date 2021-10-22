import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

const Resume = () => {
  const path = useSelector(state => state.sidebar.path);
  return path ? <Redirect to={`${path}`} /> : <Redirect to="/dashboard" />;
};

export default Resume;

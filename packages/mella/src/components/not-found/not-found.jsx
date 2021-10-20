import React from 'react';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import './not-found.scss';

const NotFound = () => {
  return (
    <div className="notfound-container">
      <img src="./images/404.jpg" alt="404" className="notfound-image" />
      <h2>No God, Please No!</h2>
      <span className="notfound-text">
        You are lost but don't worry! You can easily go back to the home page
      </span>
      <Link to="/" className="notfound-link">
        <Button className="notfound-button" variant="contained">
          Back to homepage
        </Button>
      </Link>
    </div>
  );
};

export default NotFound;

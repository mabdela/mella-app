import React from 'react';
import { Modal, Box, Typography } from '@mui/material';
import { useLocation } from 'react-router';
import './pop-up.scss';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  // bgcolor: 'background.paper',
  bgcolor: '#cfdae5',
  boxShadow:
    'rgba(50; 50; 93; 0.25) 0px 50px 100px -20px; rgba(0; 0; 0;  0.30) 0px 30px 60px -30px',
  borderRadius: '5px',
  // border: '2px solid #000',
  // boxShadow: 24,
  p: 4,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  outline: 'none',
};

const PopUp = ({
  open,
  handleClose,
  firstname,
  lastname,
  deleteComment,
  deleteUser,
  deleteAdmin,
  deleteQuiz,
  question,
}) => {
  const location = useLocation();

  return (
    <>
      <div>
        <Modal open={open} onClose={handleClose} keepMounted>
          <Box sx={style} className="modal">
            <i
              className="fas fa-exclamation-circle"
              style={{
                fontSize: '50px',
                color: 'rgba(236,72,72,.9)',
                marginBottom: '15px',
              }}
            ></i>
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              gutterBottom={true}
              sx={{ fontWeight: '600', fontSize: '25px' }}
            >
              Are you sure?
            </Typography>
            <Typography
              id="modal-modal-description"
              sx={{ mt: 2 }}
              gutterBottom={true}
            >
              {location.pathname === '/quizzes/quizzes-list'
                ? `Are you sure you want to delete question number ${question}`
                : location.pathname === '/comments/comment-list'
                ? `Are you sure you want to permanently delete ${
                    firstname.charAt(0).toUpperCase() + firstname.slice(1)
                  }
             ${lastname.charAt(0).toUpperCase() + lastname.slice(1)} comment?`
                : (location.pathname === '/users/users-list' ||
                    location.pathname === '/users/search' ||
                    location.pathname === '/admin/admin-list') &&
                  `Are you sure you want to permanently delete ${
                    firstname.charAt(0).toUpperCase() + firstname.slice(1)
                  }
             ${lastname.charAt(0).toUpperCase() + lastname.slice(1)}?`}
            </Typography>
            <Box mt={2}>
              <button
                // variant="contained"

                onClick={handleClose}
                className="editButton"
              >
                Cancel
              </button>
              <button
                onClick={
                  location.pathname === '/users/users-list' ||
                  location.pathname === '/users/search'
                    ? deleteUser
                    : location.pathname === '/comments/comment-list'
                    ? deleteComment
                    : location.pathname === '/admin/admin-list'
                    ? deleteAdmin
                    : location.pathname === '/quizzes/quizzes-list'
                    ? deleteQuiz
                    : undefined
                }
                // variant="contained"
                className="deleteButton"
              >
                Yes, delete it!
              </button>
            </Box>
          </Box>
        </Modal>
      </div>
    </>
  );
};

export default PopUp;

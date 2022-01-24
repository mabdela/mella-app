import { Box, Modal, Typography } from '@mui/material';
import React from 'react';
import { useLocation } from 'react-router';
import './pop-up.scss';

const PopUp = ({
  open,
  handleClose,
  firstname,
  lastname,
  deleteComment,
  deleteUser,
  deleteAdmin,
  deleteCourse,
  deleteQuiz,
  question,
}) => {
  const location = useLocation();

  return (
    <>
      <div>
        <Modal open={open} onClose={handleClose} keepMounted>
          <Box className="modal">
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
            <Typography id="modal-modal-description" mt={2} gutterBottom={true}>
              {/* {location.pathname === '/quizzes/quizzes-list'
                ? `Are you sure you want to delete question number ${question}`
                : location.pathname === '/comments/comment-list'
                ? `Are you sure you want to permanently delete ${
                    firstname.charAt(0).toUpperCase() + firstname.slice(1)
                  }
             ${lastname.charAt(0).toUpperCase() + lastname.slice(1)} comment?`
                : (location.pathname === '/users/users-list' ||
                    location.pathname === '/users/search' ||
                    location.pathname === '/admin/admin-list' ||
                    location.pathname === '/admin/search') &&
                  `Are you sure you want to permanently delete ${
                    firstname.charAt(0).toUpperCase() + firstname.slice(1)
                  }
             ${lastname.charAt(0).toUpperCase() + lastname.slice(1)}?`} */}
              Are you sure you want to permanently delete?
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
                    : location.pathname === '/admin/admin-list' ||
                      location.pathname === '/admin/search'
                    ? deleteAdmin
                    : location.pathname === '/quizzes/quizzes-list'
                    ? deleteQuiz
                    : location.pathname === '/admin/course-list'
                    ? deleteCourse
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

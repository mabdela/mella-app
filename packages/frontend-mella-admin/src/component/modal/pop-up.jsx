import React from 'react';
import { Modal, Box, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { removeUserRequest } from '../../redux/users/user-action';
import { useLocation } from 'react-router';
import { deleteCommentRequest } from '../../redux/comment/comment-action';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  // border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  outline: 'none',
};

const PopUp = ({ open, handleClose, id, firstname, lastname }) => {
  const dispatch = useDispatch();
  const location = useLocation();

  const deleteUser = () => {
    dispatch(removeUserRequest(id));
    handleClose();
  };

  const deleteComment = () => {
    dispatch(deleteCommentRequest(id));
    handleClose();
  };
  return (
    <>
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
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
              {location.pathname === '/comments/comment-list'
                ? `Are you sure you want to permanently delete ${
                    firstname.charAt(0).toUpperCase() + firstname.slice(1)
                  }
             ${lastname.charAt(0).toUpperCase() + lastname.slice(1)} comment?`
                : (location.pathname === '/users/users-list' ||
                    location.pathname === '/users/search') &&
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

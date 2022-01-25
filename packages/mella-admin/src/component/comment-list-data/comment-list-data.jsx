import React from 'react';
import { Box } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Moment from 'react-moment';

const useStyles = makeStyles(() => ({
  container: {
    marginLeft: 'auto',
    marginRight: 'auto',
    boxShadow: '0 7px 29px 0 rgb(100 100 111 / 20%)',
    backgroundColor: '#4267b2',
    borderRadius: '5px',
  },
}));

const CommentList = ({ comment, handleDelete }) => {
  const classes = useStyles();
  return (
    <Box
      className={classes.container}
      key={comment.comment_id}
      sx={{ mb: 2, width: { sm: '500px', md: '550px' } }}
    >
      <div
        style={{
          backgroundColor: 'hsla(0,0%,100%,.6)',
          padding: '16px',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              marginBottom: '10px',
              fontSize: '20px',
              fontWeight: '600',
            }}
          >
            {comment.firstname.charAt(0).toUpperCase() +
              comment.firstname.slice(1)}{' '}
            {comment.lastname.charAt(0).toUpperCase() +
              comment.lastname.slice(1)}{' '}
          </Box>
          <span>
            <i
              onClick={() =>
                handleDelete(
                  comment.comment_id,
                  comment.firstname,
                  comment.lastname
                )
              }
              className="far fa-trash-alt"
              style={{
                marginLeft: '15px',
                marginRight: '15px',
                color: 'rgba(236,72,72,.9)',
                cursor: 'pointer',
              }}
            ></i>
          </span>
        </Box>
        <div>Comment: {comment.content}</div>
        <div>Likes: {comment.likes.length} likes</div>
        {/* format="DD/MM/YYYY" */}
        <div>
          Posted date:{' '}
          <Moment fromNow ago>
            {comment.date}
          </Moment>{' '}
          ago
        </div>
      </div>
    </Box>
  );
};

export default CommentList;

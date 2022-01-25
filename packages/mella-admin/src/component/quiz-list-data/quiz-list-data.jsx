import React from 'react';
import { Box } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
  container: {
    marginLeft: 'auto',
    marginRight: 'auto',
    boxShadow: '0 7px 29px 0 rgb(100 100 111 / 20%)',
    backgroundColor: '#4267b2',
    borderRadius: '5px',
  },
}));

const QuizListData = ({ quiz, handleDelete, handleEdit, index, topic }) => {
  const classes = useStyles();
  return (
    <Box
      className={classes.container}
      sx={{ width: { sm: '500px', md: '550px' }, mb: 3 }}
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
            {index + 1} {'. '} {quiz.question}
          </Box>
          <span style={{ display: 'flex' }}>
            <i
              onClick={() => handleEdit(quiz.id)}
              className="far fa-edit"
              style={{
                color: 'rgba(24,125,24,.7215686274509804)',
                cursor: 'pointer',
                marginLeft: '15px',
              }}
            ></i>
            <i
              onClick={() => handleDelete(topic, quiz.id)}
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
        <div>
          {quiz.choice.map((choose, index) => (
            <div key={index} style={{ marginBottom: '5px' }}>
              <span>{String.fromCharCode(65 + index)}</span>
              {'. '}
              <span>{choose}</span>
            </div>
          ))}
        </div>
        <div style={{ marginBottom: '5px' }}>
          Answer: {String.fromCharCode(65 + quiz.answer)}
        </div>
        <div>Explanation: {quiz.explanation}</div>
        {/* format="DD/MM/YYYY" */}
      </div>
    </Box>
  );
};

export default QuizListData;

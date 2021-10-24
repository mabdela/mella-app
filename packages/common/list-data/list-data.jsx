import React from 'react';
import { Box } from '@mui/material';
import { makeStyles } from '@mui/styles';
import CommonAlert from '../alert/alert';
const useStyles = makeStyles(theme => ({
  container: {
    marginLeft: 'auto',
    marginRight: 'auto',
    boxShadow: '0 7px 29px 0 rgb(100 100 111 / 20%)',
    backgroundColor: '#4267b2',
    borderRadius: '5px',
  },
  wrapper: {
    padding: '15px',
    backgroundColor: 'hsla(0,0%,100%,.6)',
  },
}));

const ListData = ({ data, handleEdit, handleDelete, message, remove }) => {
  const classes = useStyles();
  console.log(message);
  return (
    <Box
      className={classes.container}
      sx={{ width: { sm: '500px', md: '550px', xl: '800px' }, mb: 3 }}
    >
      {message && (
        <CommonAlert
          message={message}
          state="success"
          admin={true}
          remove={remove}
        />
      )}
      <div className={classes.wrapper}>
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
            {data.firstname.charAt(0).toUpperCase() + data.firstname.slice(1)}{' '}
            {data.lastname.charAt(0).toUpperCase() + data.lastname.slice(1)}{' '}
          </Box>
          <span>
            <i
              className="far fa-edit"
              onClick={() => handleEdit && handleEdit(data._id)}
              style={{
                color: 'rgba(24,125,24,.7215686274509804)',
                cursor: 'pointer',
              }}
            ></i>
            <i
              onClick={() =>
                handleDelete &&
                handleDelete(data._id, data.firstname, data.lastname)
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
        <div>{data.email}</div>
      </div>
    </Box>
  );
};

export default ListData;

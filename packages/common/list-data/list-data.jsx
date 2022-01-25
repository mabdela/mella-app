import { Box } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react';
const useStyles = makeStyles(theme => ({
  container: {
    boxShadow: '0 7px 29px 0 rgb(100 100 111 / 20%)',
    backgroundColor: '#4267b2',
    borderRadius: '5px',
  },
  wrapper: {
    padding: '15px',
    backgroundColor: 'hsla(0,0%,100%,.6)',
  },
}));

const ListData = ({ data, handleEdit, handleDelete, edit }) => {
  const classes = useStyles();
  return (
    <Box
      ml={'auto'}
      mr={'auto'}
      mb={3}
      className={classes.container}
      sx={{ width: { sm: '500px', md: '550px' } }}
    >
      <div className={classes.wrapper}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Box display={'flex'} mb={2} fontSize={'20px'} fontWeight={600}>
            {data.title
              ? data.title
              : `${
                  data.first_name.charAt(0).toUpperCase() +
                  data.first_name.slice(1)
                } ${
                  data.last_name.charAt(0).toUpperCase() +
                  data.last_name.slice(1)
                }`}
          </Box>
          <span>
            {edit && (
              <i
                className="far fa-edit"
                onClick={() => handleEdit && handleEdit(data.id)}
                style={{
                  color: 'rgba(24,125,24,.7215686274509804)',
                  cursor: 'pointer',
                }}
              ></i>
            )}
            <i
              onClick={() => {
                // data.id
                //   ? handleDelete(data.id)
                //   : handleDelete(data._id, data.first_name, data.last_name);
                handleDelete(data.id, data.first_name, data.last_name);
              }}
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
        <div>{data.translated_title ? data.translated_title : data.email}</div>
      </div>
    </Box>
  );
};

export default ListData;

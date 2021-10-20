import React from 'react';

import { Button, Box } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
  fill: {
    padding: '10px !important',
    textTransform: 'capitalize !important',
    borderRadius: '35px !important',
    boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px !important',
    backgroundColor: '#4267b2 !important',
    color: '#fff !important',
    '&:hover': {
      boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px !important',
      backgroundColor: '#4267b2 !important',
    },
  },
  notfill: {
    padding: '10px !important',
    textTransform: 'capitalize !important',
    borderRadius: '35px !important',
    color: '#000 !important',
    backgroundColor: '#fff !important',
    boxShadow: 'none !important',
    border: '1px solid #4267b2 !important',
    boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px !important',
    '&:hover': {
      boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px !important',
      backgroundColor: '#fff !important',
    },
  },
}));

const button = ({
  isFilled,
  click,
  text,
  isDisable,
  type,
  submit,
  margintop,
  isTiny,
  center,
}) => {
  const classes = useStyles();
  return (
    <Box sx={center ? { textAlign: 'center' } : {}}>
      {' '}
      <Button
        variant="contained"
        className={isFilled ? classes.fill : classes.notfill}
        onClick={click}
        disabled={isDisable ? true : false}
        type={type}
        onSubmit={submit}
        sx={
          (margintop ? { mt: 2 } : {},
          isTiny
            ? { width: '120px !important' }
            : { width: '190px !important' })
        }
      >
        {text}
      </Button>
    </Box>
  );
};

export default button;

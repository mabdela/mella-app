import React from 'react';

import { Button } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
  fill: {
    padding: '10px',
    textTransform: 'capitalize',
    borderRadius: '35px',
    width: '120px',
    boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
    backgroundColor: '#4267b2',
    color: '#fff',
    '&:hover': {
      boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
      backgroundColor: '#4267b2',
    },
  },
  notfill: {
    padding: '10px',
    textTransform: 'capitalize',
    borderRadius: '35px',
    color: '#000',
    backgroundColor: '#fff',
    boxShadow: 'none',
    border: '1px solid #4267b2',
    boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
    '&:hover': {
      boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
      backgroundColor: '#fff',
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
}) => {
  const classes = useStyles();
  return (
    <Button
      variant="contained"
      className={isFilled ? classes.fill : classes.notfill}
      onClick={click}
      disabled={isDisable ? true : false}
      type={type}
      onSubmit={submit}
      sx={(margintop ? { mt: 2 } : { mt: 0 }, isTiny && { width: '120px' })}
    >
      {text}
    </Button>
  );
};

export default button;

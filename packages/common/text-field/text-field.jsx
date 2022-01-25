import React from 'react';
import { TextField, InputAdornment, IconButton, Box } from '@mui/material';
import { Lock, LockOpen } from '@mui/icons-material';
import './text-field.scss';
const textfield = ({
  label,
  showText,
  name,
  value,
  onChange,
  inputProps,
  type,
  handleIcon,
  isError,
  error,
  needmargin,
  needBoxMargin,
}) => {
  return (
    <Box sx={needBoxMargin ? { mb: 2 } : { mb: 0 }} width="100%">
      <TextField
        sx={needmargin ? { mb: 2 } : { mb: 0 }}
        error={isError}
        label={label}
        variant="outlined"
        type={type ? type : showText ? 'text' : 'password'}
        name={name}
        value={value}
        onChange={onChange}
        fullWidth
        required
        InputProps={
          inputProps
            ? {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleIcon} sx={{ color: '#4267b2' }}>
                      {showText ? <LockOpen /> : <Lock />}
                    </IconButton>
                  </InputAdornment>
                ),
              }
            : {}
        }
      />
      {isError && <span className="errors">{error}</span>}
    </Box>
  );
};

export default textfield;

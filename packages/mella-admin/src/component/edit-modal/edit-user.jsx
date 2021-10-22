import React, { useState } from 'react';
import './edit.scss';
import { Box, Typography } from '@mui/material';
import CommonButton from '@mono-repo/common/button/button';
import CommonInput from '@mono-repo/common/text-field/text-field';

const EditUser = ({ handleClose, data }) => {
  const [firstname, setFirstName] = useState(
    data.firstname ? data.firstname : ''
  );
  const [lastname, setLastName] = useState(data.lastname ? data.lastname : '');
  const [email, setEmail] = useState(data.email ? data.email : '');

  const handleClick = () => {
    handleClose();
  };
  const closeModal = () => {
    handleClose();
  };
  return (
    <Box
      className="edit-container"
      sx={{
        width: { sm: '400px' },
        ml: { xs: '10px !important', sm: 'auto !important' },
        mr: { xs: '10px !important', sm: 'auto !important' },
      }}
    >
      <Typography variant="h6" className="edit-title" sx={{ mb: 3 }}>
        Update User
      </Typography>
      <CommonInput
        value={firstname}
        needmargin
        label="firstname"
        type="text"
        name="firstname"
        onChange={e => setFirstName(e.target.value)}
      />
      <CommonInput
        value={lastname}
        needmargin
        label="lastname"
        type="text"
        name="lastname"
        onChange={e => setLastName(e.target.value)}
      />
      <CommonInput
        value={email}
        needmargin
        label="email"
        type="email"
        name="email"
        onChange={e => setEmail(e.target.value)}
      />
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
        <CommonButton
          text="Cancel"
          isFilled={false}
          click={closeModal}
          isTiny={true}
        />
        <CommonButton text="Update" isFilled click={handleClick} />
      </Box>
    </Box>
  );
};

export default EditUser;

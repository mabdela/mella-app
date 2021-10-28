import React, { useState } from 'react';
import './edit.scss';
import { Box, Typography } from '@mui/material';
import CommonButton from '@mono-repo/common/button/button';
import CommonInput from '@mono-repo/common/text-field/text-field';
import { useDispatch } from 'react-redux';
import { updateUserRequest } from 'src/redux/users/user-action';

const EditUser = ({ handleClose, data }) => {
  const dispatch = useDispatch();
  const [firstname, setFirstName] = useState(
    data.firstname ? data.firstname : ''
  );
  const [lastname, setLastName] = useState(data.lastname ? data.lastname : '');
  const [email, setEmail] = useState(data.email ? data.email : '');

  const handleClick = () => {
    // email should be sent too
    dispatch(updateUserRequest({ id: data._id, firstname, lastname, email }));
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
        transform: {
          xs: 'translate(-50%, -50%)',
          md: 'translate(-16%, -50%);',
        },
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

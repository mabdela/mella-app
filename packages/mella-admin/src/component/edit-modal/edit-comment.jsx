import React, { useState } from 'react';
import './edit.scss';
import { Box, Typography } from '@mui/material';
import CommonButton from '@mono-repo/common/button/button';
import CommonInput from '@mono-repo/common/text-field/text-field';

const EditComment = ({ handleClose, data }) => {
  const [comment, setComment] = useState(data.content ? data.content : '');

  const handleChange = e => {
    setComment(e.target.value);
  };

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
        Update Comment
      </Typography>
      <CommonInput
        value={comment}
        needmargin
        label="Comment"
        type="text"
        name="comment"
        onChange={handleChange}
      />
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
        <CommonButton
          text="Cancel"
          isFilled={false}
          click={closeModal}
          isTiny={true}
        />
        <CommonButton
          text="Update"
          isFilled
          click={handleClick}
          isTiny={true}
        />
      </Box>
    </Box>
  );
};

export default EditComment;

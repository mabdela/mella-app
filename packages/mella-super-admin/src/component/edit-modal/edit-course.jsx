import CommonButton from '@mono-repo/common/button/button';
import CommonInput from '@mono-repo/common/text-field/text-field';
import { Box, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateCourseRequest } from 'src/redux/course/course-action';
import './edit.scss';

const EditCourse = ({ handleClose, data }) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState(data.title ? data.title : '');
  const [translatedTitle, setTranslatedTitle] = useState(
    data.translated_title ? data.translated_title : ''
  );
  const [imageurl, setImageUrl] = useState(data.imageurl ? data.imageurl : '');
  const [articleCount, setArticleCount] = useState(
    data.article_count ? data.article_count : ''
  );

  const handleClick = () => {
    dispatch(
      updateCourseRequest({
        id: data.id,
        title,
        imgurl: imageurl,
        article_count: parseInt(articleCount),
        translated_title: translatedTitle,
      })
    );
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
        Update Course
      </Typography>
      <CommonInput
        value={title}
        needmargin
        label="title"
        type="text"
        name="title"
        onChange={e => setTitle(e.target.value)}
      />
      <CommonInput
        value={translatedTitle}
        needmargin
        label="translated_title"
        type="text"
        name="translated_title"
        onChange={e => setTranslatedTitle(e.target.value)}
      />
      <CommonInput
        value={imageurl}
        needmargin
        label="imageurl"
        type="text"
        name="imageurl"
        onChange={e => setImageUrl(e.target.value)}
      />
      <CommonInput
        value={articleCount}
        needmargin
        label="article_count"
        type="text"
        name="article_count"
        onChange={e => setArticleCount(e.target.value)}
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

export default EditCourse;

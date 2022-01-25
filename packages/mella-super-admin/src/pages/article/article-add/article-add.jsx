import CommonAlert from '@mono-repo/common/alert/alert';
import CommonButton from '@mono-repo/common/button/button';
import UserValidation from '@mono-repo/common/input-validation/chapter-validation';
import CommonInput from '@mono-repo/common/text-field/text-field';
import CommonTitle from '@mono-repo/common/title/title';
import {
  //  Button,
  Box,
  MenuItem,
  TextField,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listCourseRequest } from 'src/redux/course/course-action';
import { removeErrors } from 'src/redux/error/error-actions';
import {
  removeAdmin,
  removeAdmins,
  removeMessage,
} from 'src/redux/users/user-action';

import { AddCircleOutline, RemoveCircleOutline } from '@mui/icons-material';
import { Typography } from '@mui/material';
import {
  chapterListRequest,
  removeChapter,
} from 'src/redux/chapter/chapter-action';

const useStyles = makeStyles(() => ({
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

const ArticleAdd = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const successMessage = useSelector(state => state.users.message);
  const errorMessage = useSelector(state => state.errors.message);
  const chapters = useSelector(state => state.chapter.chapters);
  const courses = useSelector(state => state.course.courses);

  const [descCount, setDescCount] = useState(1);
  // const [datasCount, setdatasCount] = useState([{ index: 1, count: 1 }]);
  const [subArticleCount, setSubArticleCount] = useState(1);
  const [datas] = useState([]);
  const [course_id, setCourseId] = useState('');

  const [articleData, setArticleData] = useState({
    title: '',
    desc: [],
    chapter_id: '',
    figure_desc: '',
    sub_articles: [
      // {
      //   sub_title: '',
      //   sub_title_translation: '',
      //   figure_desc: '',
      //   datas: [],
      // },
    ],
  });
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    dispatch(listCourseRequest());
  }, [dispatch]);

  useEffect(() => {
    dispatch(removeAdmins());
    dispatch(removeAdmin());
    dispatch(removeChapter());
  }, [dispatch]);

  // chapter list
  useEffect(() => {
    dispatch(chapterListRequest({ course_id }));
  }, [dispatch, course_id]);
  useEffect(() => {
    const { title, desc, chapter_id, figure_desc, sub_articles } = articleData;
    if (Object.values(errors).length === 0 && isSubmitted) {
      //   dispatch(
      //     createChapterRequest({
      //       title,
      //       course_id,
      //       articles_count: parseInt(articles_count),
      //     })
      //   );
      //   setChapterData({
      //     title,
      //     course_id,
      //     articles_count,
      //   });
    }
  }, [errors, isSubmitted, dispatch]);

  const handleChange = e => {
    const { name, value } = e.target;

    setArticleData({ ...articleData, [name]: value });
  };

  const handleCourse = e => {
    const { value } = e.target;

    setCourseId(value);
  };

  const handleDesc = (index, e) => {
    const { desc } = articleData;
    const newDesc = desc.slice(0);
    newDesc[index] = e.target.value;
    setArticleData({ ...articleData, desc: newDesc });
  };

  const handleSubArticle = (index, e, datasIndex) => {
    const { sub_articles } = articleData;
    const newSubArticle = sub_articles.slice(0);

    const { name, value } = e.target;

    // for the datas array
    const articleDatas = datas;
    articleDatas[datasIndex] = value;

    console.log('datas: ', datas);

    newSubArticle[index ? index : 0] = datasIndex
      ? {
          ...newSubArticle[index],
          index: index ? index + 1 : 1,
          datas: datas,
        }
      : {
          ...newSubArticle[index],
          [name]: value,
          index: index ? index + 1 : 1,
          datas: datas,
        };
    setArticleData({ ...articleData, sub_articles: newSubArticle });
  };

  console.log('article data: ', articleData);

  const handleSubmit = e => {
    e.preventDefault();
    // setErrors(UserValidation(articleData));
    setIsSubmitted(true);
  };

  const remove = () => {
    dispatch(removeMessage());
  };

  const removeError = () => {
    dispatch(removeErrors());
  };

  // const findCount = index => {
  //   let count = 1;
  //   datasCount.forEach(data => {
  //     if (data.index === index) {
  //       return data.count;
  //     }
  //   });
  //   return count;
  // };

  // const addDatas = index => {
  //   datasCount.map(
  //     data =>
  //       data.index === index && { index: data.index, count: data.count + 1 }
  //   );
  // };

  // console.log('datas count: ', datasCount);

  const { title, chapter_id, desc, figure_desc, sub_articles } = articleData;
  return (
    <Box sx={{ p: { xs: 1, md: 2 } }}>
      <CommonTitle text="Add Article" />

      <Box
        className={classes.container}
        sx={{ width: { sm: '500px', md: '550px' }, mb: 3 }}
      >
        {successMessage && (
          <CommonAlert
            message={successMessage}
            state="success"
            remove={remove}
            admin={true}
          />
        )}
        {errorMessage && (
          <CommonAlert
            message={errorMessage}
            state="error"
            remove={removeError}
            admin={true}
          />
        )}
        <div className={classes.wrapper}>
          <form onSubmit={handleSubmit}>
            <TextField
              select
              name="course_id"
              label="Select Course"
              value={course_id}
              onChange={handleCourse}
              helperText="Please select Course"
              fullWidth
              margin="normal"
            >
              {courses.map(option => (
                <MenuItem key={option.id} value={option.id}>
                  {option.title}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              select
              name="chapter_id"
              label="Select Chapter"
              value={chapter_id}
              onChange={handleChange}
              helperText="Please select Chapter"
              fullWidth
              margin="normal"
            >
              {chapters.map(option => (
                <MenuItem key={option.id} value={option.id}>
                  {option.title}
                </MenuItem>
              ))}
            </TextField>

            <CommonInput
              isError={errors.title ? true : false}
              label="Title"
              type="text"
              name="title"
              value={title}
              onChange={handleChange}
              error={errors.title}
              needBoxMargin
            />

            <CommonInput
              isError={errors.figure_desc ? true : false}
              label="Figure description"
              type="text"
              name="figure_desc"
              value={figure_desc}
              onChange={handleChange}
              error={errors.figure_desc}
              needBoxMargin
            />

            {/* to add description */}
            {Array.from({ length: descCount }, (_, i) => (
              <Box
                display="flex"
                alignItems="center"
                mb={2}
                key={i}
                width="100%"
              >
                <TextField
                  fullWidth
                  label="Please add description"
                  type="text"
                  id={`desc[${i}]`}
                  onChange={e => handleDesc(i, e)}
                />
                {errors.desc && <span className="errors">{errors.desc}</span>}

                <AddCircleOutline
                  sx={{ ml: 2, cursor: 'pointer' }}
                  onClick={() => setDescCount(descCount + 1)}
                />
                {descCount !== 1 && i !== 0 && (
                  <RemoveCircleOutline
                    sx={{ ml: 2, cursor: 'pointer', color: 'red' }}
                    onClick={() => {
                      setDescCount(descCount - 1);
                      setArticleData({
                        ...articleData,
                        desc: desc.filter((_, index) => index !== i),
                      });
                    }}
                  />
                )}
              </Box>
            ))}

            {/* to add sub articles */}
            {Array.from({ length: subArticleCount }, (_, index) => (
              <>
                <Box display="flex" justifyContent="space-between" mb={2}>
                  <Typography>Sub Article {index + 1}</Typography>
                  <Box display="flex">
                    <AddCircleOutline
                      sx={{ ml: 2, cursor: 'pointer' }}
                      onClick={() => {
                        setSubArticleCount(subArticleCount + 1);
                        // setdatasCount({...datasCount, datasCount[index+1] :  {}});
                      }}
                    />
                    {subArticleCount !== 1 && index !== 0 && (
                      <RemoveCircleOutline
                        sx={{ ml: 2, cursor: 'pointer', color: 'red' }}
                        onClick={() => {
                          setSubArticleCount(subArticleCount - 1);
                          setArticleData({
                            ...articleData,
                            sub_articles: sub_articles.filter(
                              item => item.index !== index + 1
                            ),
                          });
                        }}
                      />
                    )}
                  </Box>
                </Box>

                <TextField
                  fullWidth
                  label="Please add figure description"
                  type="text"
                  name="figure_desc"
                  id={`figure_desc[${index}]`}
                  onChange={e => handleSubArticle(index, e)}
                  margin="normal"
                />
                {errors.figure_desc && (
                  <span className="errors">{errors.figure_desc}</span>
                )}
                <TextField
                  fullWidth
                  label="Please add figure sub-title"
                  type="text"
                  name="sub_title"
                  id={`sub_title[${index}]`}
                  onChange={e => handleSubArticle(index, e)}
                  margin="normal"
                />
                {errors.sub_title && (
                  <span className="errors">{errors.sub_title}</span>
                )}
                <TextField
                  fullWidth
                  label="Please add figure sub-title translation"
                  type="text"
                  name="sub_title_translation"
                  id={`sub_title_translation[${index}]`}
                  onChange={e => handleSubArticle(index, e)}
                  margin="normal"
                />
                {errors.sub_title_translation && (
                  <span className="errors">{errors.sub_title_translation}</span>
                )}

                {/* to add datas */}
                {/* {Array.from(
                  {
                    length: findCount(index + 1),
                  },
                  (_, i) => (
                    <Box
                      display="flex"
                      alignItems="center"
                      my={2}
                      key={i}
                      width="100%"
                    >
                      <TextField
                        fullWidth
                        label="Please add datas"
                        type="text"
                        name="datas"
                        id={`datas[${i}]`}
                        onChange={e => handleSubArticle(_, e, i)}
                      />
                      {errors.datas && (
                        <span className="errors">{errors.datas}</span>
                      )}

                      <AddCircleOutline
                        sx={{ ml: 2, cursor: 'pointer' }}
                        // onClick={() => setdatasCount(datasCount + 1)}
                        onClick={() => addDatas(index)}
                      />
                      {datasCount !== 1 && i !== 0 && (
                        <RemoveCircleOutline
                          sx={{ ml: 2, cursor: 'pointer', color: 'red' }}
                          onClick={() => {
                            setdatasCount(datasCount - 1);
                            setArticleData({
                              ...articleData,
                              datasCount: sub_articles.datasCount.filter(
                                (_, index) => index !== i
                              ),
                            });
                          }}
                        />
                      )}
                    </Box>
                  )
                )} */}
              </>
            ))}
          </form>
          <CommonButton
            text="Add Article"
            isFilled={true}
            click={handleSubmit}
            center
          />
        </div>
      </Box>
    </Box>
  );
};

export default ArticleAdd;

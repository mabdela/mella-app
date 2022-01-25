import React from 'react';
import { useDispatch } from 'react-redux';
import CommonPopUp from '@mono-repo/common/modal/pop-up';
import { deleteAdminRequest } from 'src/redux/users/user-action';
import { deleteCourseRequest } from 'src/redux/course/course-action';
import { deleteChapterRequest } from 'src/redux/chapter/chapter-action';

const PopUp = ({ open, handleClose, id, firstname, lastname }) => {
  const dispatch = useDispatch();

  const deleteAdmin = () => {
    dispatch(deleteAdminRequest(id));
    handleClose();
  };

  const deleteCourse = () => {
    // console.log('delete course id: ', id);
    dispatch(deleteCourseRequest(id));
    handleClose();
  };

  // delete chapter
  const deleteChapter = () => {
    dispatch(deleteChapterRequest(id));
    handleClose();
  };
  return (
    <>
      <CommonPopUp
        open={open}
        handleClose={handleClose}
        firstname={firstname}
        lastname={lastname}
        deleteAdmin={deleteAdmin}
        deleteCourse={deleteCourse}
        deleteChapter={deleteChapter}
      />
    </>
  );
};

export default PopUp;

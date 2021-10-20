import React from 'react';
import { useDispatch } from 'react-redux';
import CommonPopUp from '@mono-repo/common/modal/pop-up';
import { deleteAdminRequest } from 'src/redux/users/user-action';

const PopUp = ({ open, handleClose, id, firstname, lastname }) => {
  const dispatch = useDispatch();

  // take look at it
  // const deleteUser = () => {
  //   dispatch(removeUserRequest(id));
  //   handleClose();
  // };

  // const deleteComment = () => {
  //   dispatch(deleteCommentRequest(id));
  //   handleClose();
  // };

  const deleteAdmin = () => {
    dispatch(deleteAdminRequest(id));
    handleClose();
  };

  return (
    <>
      <CommonPopUp
        open={open}
        handleClose={handleClose}
        // id={id}
        firstname={firstname}
        lastname={lastname}
        // deleteComment={deleteComment}
        // deleteUser={deleteUser}
        deleteAdmin={deleteAdmin}
      />
    </>
  );
};

export default PopUp;

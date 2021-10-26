import React from 'react';
import { useDispatch } from 'react-redux';
import CommonPopUp from '@mono-repo/common/modal/pop-up';
import { deleteAdminRequest } from 'src/redux/users/user-action';

const PopUp = ({ open, handleClose, id, firstname, lastname }) => {
  const dispatch = useDispatch();

  const deleteAdmin = () => {
    dispatch(deleteAdminRequest(id));
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
      />
    </>
  );
};

export default PopUp;

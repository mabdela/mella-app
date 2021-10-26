import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  getUsersRequest,
  removeMessage,
} from '../../../redux/users/user-action';
import PopUp from '../../modal/pop-up';
import { removeComment } from '../../../redux/comment/comment-action';
import { removeQuiz } from '../../../redux/quizzes/quizzes-actions';
import EditUser from 'src/component/edit-modal/edit-user';
import CommonLoading from '@mono-repo/common/loading/loading';
import CommonList from '@mono-repo/common/list-data/list-data';
import CommonAlert from '@mono-repo/common/alert/alert';
import { removeErrors } from 'src/redux/error/error-actions';

const UserList = () => {
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [id, setId] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [currentId, setCurrentId] = useState('');

  const message = useSelector(state => state.users.message);
  const error = useSelector(state => state.errors.message);

  const handleOpen = (id, firstname, lastname) => {
    setOpen(true);
    setId(id);
    setFirstname(firstname);
    setLastname(lastname);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const users = useSelector(state => state.users.users);
  const loading = useSelector(state => state.users.loading);

  useEffect(() => {
    dispatch(getUsersRequest());
    dispatch(removeComment());
    dispatch(removeQuiz());
  }, [dispatch]);

  const handleModalOpen = id => {
    setShowModal(true);
    setCurrentId(id);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const remove = () => {
    dispatch(removeMessage());
  };

  const removeError = () => {
    dispatch(removeErrors());
  };

  return (
    <>
      {loading ? (
        <CommonLoading />
      ) : (
        <>
          {message && (
            <CommonAlert
              message={message}
              state="success"
              admin={true}
              remove={remove}
            />
          )}

          {error && (
            <CommonAlert
              message={error}
              state="error"
              admin={true}
              remove={removeError}
            />
          )}
          {/*modal  */}
          {open && (
            <PopUp
              open={open}
              handleClose={handleClose}
              id={id}
              firstname={firstname}
              lastname={lastname}
            />
          )}

          {/* update */}
          {showModal && (
            <EditUser
              handleClose={handleModalClose}
              data={users.find(user => user._id === currentId)}
            />
          )}

          {users.length > 0 &&
            users.map(user => (
              <CommonList
                key={user._id}
                data={user}
                handleEdit={handleModalOpen}
                handleDelete={handleOpen}
              />
            ))}
        </>
      )}
    </>
  );
};

export default UserList;

import { useEffect, useState } from 'react';
import { Box, Backdrop, CircularProgress } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';

import { makeStyles } from '@mui/styles';
import {
  getUsersRequest,
  removeUserLoading,
} from '../../../redux/users/user-action';
import PopUp from '../../modal/pop-up';
import { removeComment } from '../../../redux/comment/comment-action';
import { removeQuiz } from '../../../redux/quizzes/quizzes-actions';
import EditUser from 'src/component/edit-modal/edit-user';

const useStyles = makeStyles(theme => ({
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
  text: {
    marginBottom: '10px',
  },
}));

const UserList = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [id, setId] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [isClicked, setIsClicked] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [currentId, setCurrentId] = useState('');

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
    setIsClicked(false);
    dispatch(removeComment());
    dispatch(removeQuiz());
  }, [dispatch]);

  useEffect(() => {
    let timer =
      isClicked &&
      setTimeout(
        () => dispatch(removeUserLoading(), setIsClicked(false)),
        9000
      );

    return () => {
      clearTimeout(timer);
    };
  }, [dispatch, isClicked]);

  const handleModalOpen = id => {
    setShowModal(true);
    setCurrentId(id);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  return (
    <>
      {loading ? (
        <Backdrop
          open={true}
          sx={{
            color: '#5874ad',
            zIndex: '1200',
            ml: { sm: '299px' },
          }}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      ) : (
        <>
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

          {users.map(user => (
            <Box
              className={classes.container}
              key={user._id}
              sx={{ width: { sm: '500px', md: '550px', xl: '800px' }, mb: 3 }}
            >
              <div className={classes.wrapper}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      marginBottom: '10px',
                      fontSize: '20px',
                      fontWeight: '600',
                    }}
                  >
                    {user.firstname.charAt(0).toUpperCase() +
                      user.firstname.slice(1)}{' '}
                    {user.lastname.charAt(0).toUpperCase() +
                      user.lastname.slice(1)}{' '}
                  </Box>
                  <span>
                    <i
                      className="far fa-edit"
                      onClick={() => handleModalOpen(user._id)}
                      style={{
                        color: 'rgba(24,125,24,.7215686274509804)',
                        cursor: 'pointer',
                      }}
                    ></i>
                    <i
                      onClick={() =>
                        handleOpen(user._id, user.firstname, user.lastname)
                      }
                      className="far fa-trash-alt"
                      style={{
                        marginLeft: '15px',
                        marginRight: '15px',
                        color: 'rgba(236,72,72,.9)',
                        cursor: 'pointer',
                      }}
                    ></i>
                  </span>
                </Box>
                <div>{user.email}</div>
              </div>
            </Box>
          ))}
        </>
      )}
    </>
  );
};

export default UserList;

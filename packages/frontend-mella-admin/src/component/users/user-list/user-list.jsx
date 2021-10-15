import { useEffect, useState } from 'react';
import { Box, Backdrop, CircularProgress } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';

import { makeStyles } from '@mui/styles';
import { getUsersRequest } from '../../../redux/users/user-action';
import PopUp from '../../modal/pop-up';
import { removeComment } from '../../../redux/comment/comment-action';
import { removeQuiz } from '../../../redux/quizzes/quizzes-actions';

const useStyles = makeStyles(theme => ({
  container: {
    margin: 'auto',
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
  return (
    <>
      {loading ? (
        <Backdrop
          open={true}
          sx={{
            color: '#5874ad',
            zIndex: '1200',
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

          {users.map(user => (
            <Box
              className={classes.container}
              key={user._id}
              sx={{ width: { md: '800px' }, mb: 3 }}
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

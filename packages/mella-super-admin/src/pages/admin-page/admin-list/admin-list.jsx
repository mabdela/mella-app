import React, { useState, useEffect } from 'react';
import { Box, Backdrop, CircularProgress, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useSelector, useDispatch } from 'react-redux';
import PopUp from 'src/component/modal/pop-up';
import {
  getAdminRequest,
  removeAdminLoading,
} from 'src/redux/users/user-action';

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

const AdminList = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  // check this shit
  const users = useSelector(state => state.users.admins);
  const loading = useSelector(state => state.users.loading);

  const [open, setOpen] = useState(false);
  const [id, setId] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [isClicked, setIsClicked] = useState(false);

  const handleOpen = (id, firstname, lastname) => {
    setOpen(true);
    setId(id);
    setFirstname(firstname);
    setLastname(lastname);
  };
  const handleClose = () => {
    setOpen(false);
  };

  // check this out

  useEffect(() => {
    dispatch(getAdminRequest());
    setIsClicked(false);
  }, [dispatch]);

  // check this out

  useEffect(() => {
    let timer =
      isClicked &&
      setTimeout(
        () => dispatch(removeAdminLoading(), setIsClicked(false)),
        9000
      );

    return () => {
      clearTimeout(timer);
    };
  }, [dispatch, isClicked]);

  return (
    <Box sx={{ p: { xs: 1, md: 2 } }}>
      <Typography
        variant="h6"
        gutterBottom
        component="div"
        sx={{
          textAlign: { xs: 'start' },
          width: { sm: '500px', md: '550px', xl: '800px' },
          m: '60px auto 20px',
        }}
      >
        Admin List
      </Typography>

      {loading ? (
        <Backdrop
          open={true}
          sx={{
            color: '#5874ad',
            zIndex: '1200',
            ml: { md: '299px' },
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

          {/* take a look at it */}

          {users.map(user => (
            // refactor this block
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
    </Box>
  );
};

export default AdminList;

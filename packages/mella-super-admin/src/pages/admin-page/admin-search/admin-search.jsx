import React, { useState } from 'react';
import {
  Box,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  TextField,
  Backdrop,
  CircularProgress,
  Typography,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useDispatch, useSelector } from 'react-redux';
// import {
//   getUserByEmailRequest,
//   getUserByIdRequest,
// } from '../../../redux/users/user-action';

import PopUp from '../../../component/modal/pop-up';
import CommonButton from '@mono-repo/common/button/button';
import {
  searchAdminByEmailRequest,
  searchAdminByNameRequest,
} from 'src/redux/users/user-action';

const useStyles = makeStyles(theme => ({
  container: {
    marginLeft: 'auto',
    marginRight: 'auto',
    boxShadow: '0 7px 29px 0 rgb(100 100 111 / 20%)',
    backgroundColor: '#4267b2ba',
    borderRadius: '5px',
  },
  wrapper: {
    padding: '15px',
    backgroundColor: 'hsla(0,0%,100%,.6)',
  },
}));

const AdminSearch = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const users = useSelector(state => state.users.admin);
  const loading = useSelector(state => state.users.loading);
  const [id, setId] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');

  const [value, setValue] = useState('User');
  const [text, setText] = useState('');

  const [open, setOpen] = useState(false);

  const handleChange = event => {
    setValue(event.target.value);
  };

  const handleOpen = (email, firstname, lastname) => {
    setOpen(true);
    setId(id);
    setFirstname(firstname);
    setLastname(lastname);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // check this out

  const searchUser = () => {
    value === 'Email'
      ? dispatch(searchAdminByEmailRequest(text))
      : dispatch(searchAdminByNameRequest(text));
  };
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
        Search Admins
      </Typography>
      {/* <UserList /> */}
      <Box
        className={classes.container}
        sx={{ width: { sm: '500px', md: '550px', xl: '800px' }, mb: 3 }}
      >
        <div className={classes.wrapper}>
          <FormControl component="fieldset">
            <FormLabel component="legend">Search By</FormLabel>
            <RadioGroup
              aria-label="Search By"
              defaultValue="User"
              name="radio-buttons-group"
              value={value}
              onChange={handleChange}
            >
              <FormControlLabel value="User" control={<Radio />} label="User" />
              <FormControlLabel
                value="Email"
                control={<Radio />}
                label="Email"
              />
            </RadioGroup>
          </FormControl>
          <Box sx={{ display: 'flex' }}>
            <TextField
              label={value}
              variant="standard"
              value={text}
              onChange={e => setText(e.target.value)}
              sx={{ mr: 2 }}
            />

            <CommonButton
              click={searchUser}
              text="Search"
              isFilled={true}
              isTiny={true}
            />
          </Box>
        </div>
      </Box>

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
          {users.length > 0 &&
            users.map(user => (
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

export default AdminSearch;

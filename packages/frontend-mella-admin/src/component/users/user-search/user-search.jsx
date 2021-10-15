import React, { useState } from 'react';
import {
  Box,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  TextField,
  Button,
  Backdrop,
  CircularProgress,
  Typography,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useDispatch, useSelector } from 'react-redux';
import {
  getUserByEmailRequest,
  getUserByIdRequest,
} from '../../../redux/users/user-action';

import PopUp from '../../modal/pop-up';

const useStyles = makeStyles(theme => ({
  container: {
    margin: 'auto',
    boxShadow: '0 7px 29px 0 rgb(100 100 111 / 20%)',
    backgroundColor: '#4267b2ba',
    borderRadius: '5px',
  },
  wrapper: {
    padding: '15px',
    backgroundColor: 'hsla(0,0%,100%,.6)',
  },
}));

const UserSearch = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = useSelector(state => state.users.user);
  const loading = useSelector(state => state.users.loading);

  const [value, setValue] = useState('User Id');
  const [text, setText] = useState('');

  const [open, setOpen] = useState(false);

  const handleChange = event => {
    setValue(event.target.value);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const searchUser = () => {
    value === 'Email'
      ? dispatch(getUserByEmailRequest(text))
      : dispatch(getUserByIdRequest(text));
  };

  return (
    <>
      <Box className={classes.container} sx={{ width: { sm: '800px' }, mb: 3 }}>
        <div className={classes.wrapper}>
          <FormControl component="fieldset">
            <FormLabel component="legend">Search By</FormLabel>
            <RadioGroup
              aria-label="Search By"
              defaultValue="User Id"
              name="radio-buttons-group"
              value={value}
              onChange={handleChange}
            >
              <FormControlLabel
                value="User Id"
                control={<Radio />}
                label="User Id"
              />
              <FormControlLabel
                value="Email"
                control={<Radio />}
                label="Email"
              />
              {/* <FormControlLabel
                value="other"
                control={<Radio />}
                label="Other"
              /> */}
            </RadioGroup>
          </FormControl>
          <Box sx={{ display: 'flex' }}>
            <TextField
              label={value}
              variant="standard"
              value={text}
              onChange={e => setText(e.target.value)}
            />
            <Button
              variant="contained"
              sx={{ p: 1, ml: 2 }}
              onClick={searchUser}
            >
              Search
            </Button>
          </Box>
        </div>
      </Box>

      {
        loading ? (
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
          Object.values(user).length > 0 && (
            <>
              {/*modal  */}
              {open && (
                <PopUp
                  open={open}
                  handleClose={handleClose}
                  id={user._id}
                  firstname={user.firstname}
                  lastname={user.lastname}
                />
              )}
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
                        onClick={() => handleOpen()}
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
            </>
          )
        )
        // : (
        //   <Typography
        //     variant="h5"
        //     gutterBottom
        //     component="div"
        //     sx={{
        //       textAlign: { xs: 'start' },
        //       width: { md: '800px' },
        //       m: '10px auto 20px',
        //     }}
        //   >
        //     No User found.
        //   </Typography>
        // )
      }
    </>
  );
};

export default UserSearch;

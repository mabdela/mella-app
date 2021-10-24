import React, { useEffect, useState } from 'react';
import {
  Box,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  TextField,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useDispatch, useSelector } from 'react-redux';
import PopUp from '../../../component/modal/pop-up';
import CommonButton from '@mono-repo/common/button/button';
import CommonTitle from '@mono-repo/common/title/title';
import CommonLoading from '@mono-repo/common/loading/loading';
import {
  removeAdmins,
  removeMessage,
  searchAdminByEmailRequest,
  searchAdminByNameRequest,
} from 'src/redux/users/user-action';
import CommonList from '@mono-repo/common/list-data/list-data';
import CommonAlert from '@mono-repo/common/alert/alert';
import { removeErrors } from '../../../redux/error/error-actions';

const useStyles = makeStyles(() => ({
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
  const message = useSelector(state => state.users.message);
  const error = useSelector(state => state.errors);

  const [id, setId] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');

  const [value, setValue] = useState('User');
  const [text, setText] = useState('');

  const [open, setOpen] = useState(false);

  useEffect(() => {
    dispatch(removeAdmins());
  }, [dispatch]);

  const handleChange = event => {
    setValue(event.target.value);
  };

  const handleOpen = (id, firstname, lastname) => {
    setOpen(true);
    setId(id);
    setFirstname(firstname);
    setLastname(lastname);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const removeAlert = () => {
    dispatch(removeMessage());
  };

  const removeError = () => {
    dispatch(removeErrors());
  };

  const searchUser = () => {
    value === 'Email'
      ? dispatch(searchAdminByEmailRequest(text))
      : dispatch(searchAdminByNameRequest(text));
  };

  return (
    <Box sx={{ p: { xs: 1, md: 2 } }}>
      <CommonTitle text="Search Admins" />

      <Box
        className={classes.container}
        sx={{ width: { sm: '500px', md: '550px', xl: '800px' }, mb: 3 }}
      >
        {message && (
          <CommonAlert
            message={message}
            state="success"
            admin={true}
            remove={removeAlert}
          />
        )}
        {error.message && (
          <CommonAlert
            message={error.message}
            state="error"
            admin={true}
            remove={removeError}
          />
        )}
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
        <CommonLoading />
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
              <CommonList
                key={user._id}
                data={user}
                // handleEdit={handleModalOpen}
                handleDelete={handleOpen}
              />
            ))}
        </>
      )}
    </Box>
  );
};

export default AdminSearch;

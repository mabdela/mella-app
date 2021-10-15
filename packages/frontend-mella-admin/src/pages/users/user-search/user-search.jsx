import React from 'react';
import { Box, Typography } from '@mui/material';
import UserSearch from '../../../component/users/user-search/user-search';

const UserSearchPage = () => {
  return (
    <Box sx={{ p: { xs: 1, md: 3 } }}>
      <Typography
        variant="h6"
        gutterBottom
        component="div"
        sx={{
          textAlign: { xs: 'start' },
          width: { md: '800px' },
          m: '10px auto 20px',
        }}
      >
        Search Users
      </Typography>
      {/* <UserList /> */}
      <UserSearch />
    </Box>
  );
};

export default UserSearchPage;

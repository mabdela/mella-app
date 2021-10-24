import React from 'react';
import { Box } from '@mui/material';
import UserSearch from '../../../component/users/user-search/user-search';
import CommonTitle from '@mono-repo/common/title/title';

const UserSearchPage = () => {
  return (
    <Box sx={{ p: { xs: 1, md: 2 } }}>
      <CommonTitle text="Search Users" />
      {/* <UserList /> */}
      <UserSearch />
    </Box>
  );
};

export default UserSearchPage;

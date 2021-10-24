import { Box } from '@mui/material';
import UserList from '../../../component/users/user-list/user-list';
import CommonTitle from '@mono-repo/common/title/title';

const UsersListPage = () => {
  return (
    <Box sx={{ p: { xs: 1, md: 2 } }}>
      <CommonTitle text="All Users" />
      <UserList />
    </Box>
  );
};

export default UsersListPage;

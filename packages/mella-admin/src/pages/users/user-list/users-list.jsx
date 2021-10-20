import { Box, Typography } from '@mui/material';
import UserList from '../../../component/users/user-list/user-list';

const UsersListPage = () => {
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
        All Users
      </Typography>
      <UserList />
    </Box>
  );
};

export default UsersListPage;

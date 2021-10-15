import { Box, Typography } from '@mui/material';
import UserList from '../../../component/users/user-list/user-list';

const UsersListPage = () => {
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
        All Users
      </Typography>
      <UserList />
    </Box>
  );
};

export default UsersListPage;

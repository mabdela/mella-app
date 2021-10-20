import {
  Search,
  AddCircleOutline,
  FormatListBulleted,
} from '@mui/icons-material';

const navdata = {
  adminNavOptions: [
    {
      link: 'search',
      primary: 'Search Admins',
      icon: <Search />,
    },
    {
      link: 'add',
      primary: 'Add Admin',
      icon: <AddCircleOutline />,
    },
    {
      link: 'admin-list',
      primary: 'Admin List',
      icon: <FormatListBulleted />,
    },
  ],
};

export default navdata;

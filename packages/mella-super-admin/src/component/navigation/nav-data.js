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
  coursesNavOptions: [
    {
      link: 'add-course',
      primary: 'Add Course',
      icon: <AddCircleOutline />,
    },
    {
      link: 'course-list',
      primary: 'Course List',
      icon: <FormatListBulleted />,
    },
  ],
};

export default navdata;

import {
  Search,
  AddCircleOutline,
  FormatListBulleted,
  Password,
} from '@mui/icons-material';

const navdata = {
  usersNavOptions: [
    {
      link: 'search',
      primary: 'Search Users',
      icon: <Search />,
    },
    {
      link: 'add',
      primary: 'Add Users',
      icon: <AddCircleOutline />,
    },
    {
      link: 'users-list',
      primary: 'Users List',
      icon: <FormatListBulleted />,
    },
    {
      link: 'update-password',
      primary: 'Update Password',
      icon: <Password />,
    },
  ],

  commentNavOptions: [
    {
      link: 'comment-list',
      primary: 'Comment List',
      icon: <FormatListBulleted />,
    },
  ],

  quizzesNavOptions: [
    {
      link: 'search',
      primary: 'Search Quizzes',
      icon: <Search />,
    },
    {
      link: 'add',
      primary: 'Add Quizzes',
      icon: <AddCircleOutline />,
    },
    {
      link: 'quizzes-list',
      primary: 'Quizzes List',
      icon: <FormatListBulleted />,
    },
  ],
};

export default navdata;

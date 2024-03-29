import { userTypes } from './user-types';

const initialState = {
  isAuthenticated: false,
  user: {},
  comments: [],
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case userTypes.LOGIN_USER:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
      };
    case userTypes.GOOGLE_LOGIN:
      // case userTypes.FACEBOOK_LOGIN:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
      };

    case userTypes.REGISTER_USER:
      return {
        ...state,
        isAuthenticated: false,
      };
    case userTypes.LOGOUT_USER:
      return {
        ...state,
        isAuthenticated: false,
        token: null,
        user: {},
      };

    case userTypes.GET_COMMENTS:
      return {
        ...state,
        comments: action.payload || [],
      };

    case userTypes.ADD_COMMENT:
      return {
        ...state,
        comments: [...state.comments, action.payload],
      };
    case userTypes.DELETE_COMMENT:
      return {
        ...state,
        comments: state.comments.filter(
          comment => comment.comment_id !== action.payload.comment_id
        ),
      };

    case userTypes.UPDATE_LIKE:
      return {
        ...state,
        comments: state.comments.map(comment =>
          comment.comment_id === action.payload.commentId
            ? { ...comment, likes: action.payload.likes }
            : comment
        ),
      };

    default:
      return state;
  }
};

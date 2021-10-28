import { authActionType } from '../auth/auth-types';
import { commentActionType } from './comment-type';

const initialState = {
  comments: [],
  message: null,
  loading: false,
};

export const commentReducer = (state = initialState, action) => {
  switch (action.type) {
    case authActionType.LOGOUT_USER:
      return {
        ...state,
        comments: [],
      };
    case commentActionType.SET_COMMENT_LOADING:
      return {
        ...state,
        loading: true,
      };

    case commentActionType.REMOVE_COMMENT_LOADING:
      return {
        ...state,
        loading: false,
      };
    case commentActionType.GET_COMMENT:
      return {
        ...state,
        comments: action.payload.comment || [],
        message: action.payload.message,
        loading: false,
      };

    case commentActionType.DELETE_COMMENT:
      return {
        ...state,
        comments: state.comments.filter(
          comment => comment.comment_id !== action.payload.comment_id
        ),
        message: action.payload.message,
        loading: false,
      };

    case commentActionType.REMOVE_COMMENT:
      return {
        ...state,
        comments: [],
        loading: false,
      };

    case commentActionType.REMOVE_COMMENT_MESSAGE:
      return {
        ...state,
        message: null,
        loading: false,
      };
    default:
      return state;
  }
};

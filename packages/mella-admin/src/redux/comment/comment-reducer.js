import { commentActionType } from './comment-type';

const initialState = {
  comments: [],
  loading: false,
};

export const commentReducer = (state = initialState, action) => {
  switch (action.type) {
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
        comments: action.payload || [],
        loading: false,
      };

    case commentActionType.DELETE_COMMENT:
      return {
        ...state,
        comments: state.comments.filter(
          comment => comment.comment_id !== action.payload.comment_id
        ),
        loading: false,
      };

    case commentActionType.REMOVE_COMMENT:
      return {
        ...state,
        comments: [],
        loading: false,
      };

    default:
      return state;
  }
};

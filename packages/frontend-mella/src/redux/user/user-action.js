import { userTypes } from './user-types';

export const registerUser = userData => ({
  type: userTypes.REGISTER_USER,
  payload: userData,
});

export const loginUser = userData => ({
  type: userTypes.LOGIN_USER,
  payload: userData,
});

export const logoutUser = () => ({
  type: userTypes.LOGOUT_USER,
});

export const addComment = addedComment => ({
  type: userTypes.ADD_COMMENT,
  payload: addedComment,
});

export const deleteComment = comment => ({
  type: userTypes.DELETE_COMMENT,
  payload: comment,
});

export const updateLike = likeData => ({
  type: userTypes.UPDATE_LIKE,
  payload: likeData,
});

export const getComments = comments => ({
  type: userTypes.GET_COMMENTS,
  payload: comments,
});

// action creator
export const registerUserRequest = (formData, history) => ({
  type: userTypes.REGISTERING_USER,
  payload: { formData, history },
});

export const loginUserRequest = formData => ({
  type: userTypes.LOGINING_USER,
  payload: formData,
});

export const logoutUserRequest = () => ({
  type: userTypes.LOGINGOUT_USER,
});

export const addCommentRequest = commentData => ({
  type: userTypes.ADDING_COMMENT,
  payload: commentData,
});

export const getCommentsRequest = commentId => ({
  type: userTypes.GETING_COMMENTS,
  payload: commentId,
});

export const deleteCommentRequest = commentId => ({
  type: userTypes.DELETING_COMMENT,
  payload: commentId,
});

export const updateLikeRequest = likeData => ({
  type: userTypes.UPDATING_LIKE,
  payload: likeData,
});

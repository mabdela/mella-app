import { commentActionType } from './comment-type';
export const setLoading = () => ({
  type: commentActionType.SET_COMMENT_LOADING,
});
export const removeLoading = () => ({
  type: commentActionType.REMOVE_COMMENT_LOADING,
});

export const getComment = comment => ({
  type: commentActionType.GET_COMMENT,
  payload: comment,
});

export const deleteComment = commentId => ({
  type: commentActionType.DELETE_COMMENT,
  payload: commentId,
});

export const removeComment = () => ({
  type: commentActionType.REMOVE_COMMENT,
});

//

export const getCommentRequest = topicId => ({
  type: commentActionType.GETING_COMMENT,
  payload: topicId,
});

export const deleteCommentRequest = commentId => ({
  type: commentActionType.DELETING_COMMENT,
  payload: commentId,
});

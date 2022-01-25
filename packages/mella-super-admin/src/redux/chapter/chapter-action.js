import { chapterTypes } from './chapter-types';

export const setLoading = () => ({
  type: chapterTypes.SET_LOADING,
});

export const removeMessage = () => ({
  type: chapterTypes.REMOVE_MESSAGE,
});

export const removeChapter = () => ({
  type: chapterTypes.REMOVE_CHAPTER,
});

export const createChapter = chapter => ({
  type: chapterTypes.CREATE_CHAPTER,
  payload: chapter,
});

export const chapterList = chapter => ({
  type: chapterTypes.LIST_CHAPTER,
  payload: chapter,
});

export const deleteChapter = chapter => ({
  type: chapterTypes.DELETE_CHAPTER,
  payload: chapter,
});

// action creators

export const createChapterRequest = chapter => ({
  type: chapterTypes.CREATING_CHAPTER,
  payload: chapter,
});
export const chapterListRequest = chapter => ({
  type: chapterTypes.LISTING_CHAPTER,
  payload: chapter,
});

export const deleteChapterRequest = id => ({
  type: chapterTypes.DELETING_CHAPTER,
  payload: id,
});

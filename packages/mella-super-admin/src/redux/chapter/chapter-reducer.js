import { chapterTypes } from './chapter-types';

const initialState = {
  chapters: [],
  message: null,
  loading: false,
};
const chapterReducer = (state = initialState, action) => {
  switch (action.type) {
    case chapterTypes.SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    case chapterTypes.REMOVE_MESSAGE:
      return {
        ...state,
        message: null,
        loading: false,
      };

    case chapterTypes.REMOVE_CHAPTER:
      return {
        ...state,
        chapters: [],
        loading: false,
      };
    case chapterTypes.CREATE_CHAPTER:
      return {
        ...state,
        message: action.payload,
        loading: false,
      };
    case chapterTypes.LIST_CHAPTER:
      return {
        ...state,
        chapters: action.payload,
        loading: false,
      };

    case chapterTypes.DELETE_CHAPTER:
      return {
        ...state,
        chapters: state.chapters.filter(
          chapter => chapter.id !== action.payload.id
        ),
        message: action.payload.msg,
        loading: false,
      };

    default:
      return state;
  }
};

export default chapterReducer;

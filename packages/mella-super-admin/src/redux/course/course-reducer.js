import { adminCourseTypes } from './course-types';

const initialState = {
  courses: [],
  message: null,
  loading: false,
};
const courseReducer = (state = initialState, action) => {
  switch (action.type) {
    case adminCourseTypes.SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    case adminCourseTypes.CREATE_COURSE:
      return {
        ...state,
        message: action.payload,
        loading: false,
      };
    case adminCourseTypes.LIST_COURSE:
      return {
        ...state,
        courses: action.payload,
        loading: false,
      };
    case adminCourseTypes.DELETE_COURSE:
      return {
        ...state,
        courses: state.courses.filter(
          course => course.id !== action.payload.id
        ),
        message: action.payload.msg,
        loading: false,
      };

    case adminCourseTypes.UPDATE_COURSE:
      const indexToUpdate = state.courses.findIndex(
        course => course.id === action.payload.course.id
      );
      return {
        ...state,
        courses: [
          ...state.courses.slice(0, indexToUpdate),
          action.payload.course,
          ...state.courses.slice(indexToUpdate + 1),
        ],
        message: action.payload.msg,
        loading: false,
      };

    case adminCourseTypes.REMOVE_MESSAGE:
      return {
        ...state,
        message: null,
      };
    default:
      return state;
  }
};

export default courseReducer;

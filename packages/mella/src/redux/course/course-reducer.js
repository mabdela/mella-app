import { courseTypes } from './course-tyes';

const initialState = {
  courses: [],
};

export const courseReducer = (state = initialState, action) => {
  switch (action.type) {
    case courseTypes.LIST_COURSES:
      return {
        ...state,
        courses: action.payload,
      };

    default:
      return state;
  }
};

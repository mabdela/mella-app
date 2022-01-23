import { adminCourseTypes } from './course-types';

export const setLoading = () => ({
  type: adminCourseTypes.SET_LOADING,
});

export const removeMessage = () => ({
  type: adminCourseTypes.REMOVE_MESSAGE,
});

export const createCourse = course => ({
  type: adminCourseTypes.CREATE_COURSE,
  payload: course,
});

export const updateCourse = course => ({
  type: adminCourseTypes.UPDATE_COURSE,
  payload: course,
});

export const deleteCourse = course => ({
  type: adminCourseTypes.DELETE_COURSE,
  payload: course,
});

export const listCourse = course => ({
  type: adminCourseTypes.LIST_COURSE,
  payload: course,
});

// action creators

export const createCourseRequest = course => ({
  type: adminCourseTypes.CREATING_COURSE,
  payload: course,
});

export const updateCourseRequest = course => ({
  type: adminCourseTypes.UPDATING_COURSE,
  payload: course,
});

export const deleteCourseRequest = course => ({
  type: adminCourseTypes.DELETING_COURSE,
  payload: course,
});

export const listCourseRequest = () => ({
  type: adminCourseTypes.LISTING_COURSE,
});

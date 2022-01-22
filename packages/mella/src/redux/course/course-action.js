import { courseTypes } from './course-tyes';

export const listCorses = courses => ({
  type: courseTypes.LIST_COURSES,
  payload: courses,
});

// action creator

export const listCorsesRequest = () => ({
  type: courseTypes.LISTING_COURSES,
});

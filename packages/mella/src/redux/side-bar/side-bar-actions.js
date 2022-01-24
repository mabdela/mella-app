import { sidebarTypes } from './side-bar-types';

// toggle side bar
export const togglePane = () => ({
  type: sidebarTypes.TOGGLE_PANE,
});

export const fetchHighPrioritySidebar = () => ({
  type: sidebarTypes.FETCH_HIGH_PRIORITY,
});

export const fetchSecondPrioritySidebar = () => ({
  type: sidebarTypes.FETCH_SECOND_PRIORITY,
});

export const fetchAllPriority = () => ({
  type: sidebarTypes.FETCH_ALL_PRIORITY,
});

export const hidePane = () => ({
  type: sidebarTypes.HIDE_PANE,
});

export const openPane = () => ({
  type: sidebarTypes.OPEN_PANE,
});

export const showActiveItem = activeId => ({
  type: sidebarTypes.SHOW_ACTIVE_ITEM,
  payload: activeId,
});

export const showSubNav = itemId => ({
  type: sidebarTypes.SHOW_SUB_NAV,
  payload: itemId,
});

export const newUpdateSubNav = subnav => ({
  type: sidebarTypes.UPDATE_SUB_NAV,
  payload: subnav,
});

export const setLocation = location => ({
  type: sidebarTypes.SET_LOCATION,
  payload: location,
});
//

export const getItems = items => ({
  type: sidebarTypes.GET_ITEMS,
  payload: items,
});

// action creators

export const getItemsRequest = courseId => ({
  type: sidebarTypes.GETING_ITEMS,
  id: courseId,
});

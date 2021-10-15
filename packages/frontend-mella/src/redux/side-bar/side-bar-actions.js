import { sidebarTypes } from './side-bar-types';

// toggle side bar
export const togglePane = () => ({
  type: sidebarTypes.TOGGLE_PANE,
});

// export const fetchContent = index => ({
//   type: sidebarTypes.FETCH_CONTENT,
//   payload: index,
// });

// export const fetchInitialSelectedQuestions = () => ({
//   type: sidebarTypes.FETCH_INITIAL_SELECTED_QUESTIONS,
// });

export const fetchHighPrioritySidebar = () => ({
  type: sidebarTypes.FETCH_HIGH_PRIORITY,
});

export const fetchSecondPrioritySidebar = () => ({
  type: sidebarTypes.FETCH_SECOND_PRIORITY,
});

export const fetchAllPriority = () => ({
  type: sidebarTypes.FETCH_ALL_PRIORITY,
});

// export const fetchHtmlData = htmlData => ({
//   type: sidebarTypes.FETCH_HTML_DATA,
//   payload: htmlData,
// });

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

export const getItems = ({ items, newMap }) => ({
  type: sidebarTypes.GET_ITEMS,
  payload: { items, newMap },
});

// action creators

export const getItemsRequest = () => ({
  type: sidebarTypes.GETING_ITEMS,
});

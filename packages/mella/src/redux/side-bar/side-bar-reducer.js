import { userTypes } from '../user/user-types';
import { sidebarTypes } from './side-bar-types';

const initialState = {
  hidden: false,
  items: [],
  subNavs: {},
  mapObjects: {},
  path: '',
  active: -1,
};

export const sidebarReducer = (state = initialState, action) => {
  switch (action.type) {
    case userTypes.LOGOUT_USER:
      return {
        ...state,
        items: [],
        mapObjects: {},
      };
    case sidebarTypes.TOGGLE_PANE:
      return {
        ...state,
        hidden: !state.hidden,
      };

    case sidebarTypes.FETCH_HIGH_PRIORITY:
      return {
        ...state,
        items: state.items.filter(data => data.priority === 1),
      };
    case sidebarTypes.FETCH_SECOND_PRIORITY:
      return {
        ...state,
        items: state.items.filter(data => data.priority === 2),
      };
    case sidebarTypes.FETCH_ALL_PRIORITY:
      return {
        ...state,
        items: state.items,
      };

    case sidebarTypes.HIDE_PANE:
      return {
        ...state,
        hidden: true,
      };

    case sidebarTypes.OPEN_PANE:
      return {
        ...state,
        hidden: false,
      };

    case sidebarTypes.SHOW_ACTIVE_ITEM:
      return {
        ...state,
        active: action.payload,
      };
    case sidebarTypes.SHOW_SUB_NAV:
      return {
        ...state,
        subNavs: {
          ...state.subNavs,
          [action.payload]: state.subNavs[action.payload]
            ? false
            : !state.subNavs[action.payload],
        },
      };

    case sidebarTypes.UPDATE_SUB_NAV:
      return {
        ...state,
        subNavs: action.payload,
      };

    case sidebarTypes.SET_LOCATION:
      return {
        ...state,
        path: action.payload,
      };
    //

    case sidebarTypes.GET_ITEMS:
      return {
        ...state,
        items: action.payload,
        // mapObjects: action.payload.newMap,
      };
    default:
      return state;
  }
};

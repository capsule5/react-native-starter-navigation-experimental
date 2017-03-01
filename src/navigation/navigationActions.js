
// *** Action Types ***
export const NAVIGATE = 'NAVIGATE';
export const NAV_PUSH = 'NAV_PUSH';
export const NAV_POP = 'NAV_POP';
export const NAV_JUMP_TO_KEY = 'NAV_JUMP_TO_KEY';
export const NAV_JUMP_TO_INDEX = 'NAV_JUMP_TO_INDEX';
export const NAV_RESET = 'NAV_RESET';
export const SWIPE_LEFT = 'SWIPE_LEFT';
export const SWIPE_RIGHT = 'SWIPE_RIGHT';


// *** Action Creators ***
// The following action creators were derived from NavigationStackReducer

export const swipeLeft = () => {
  return {
    type: SWIPE_LEFT
  };
};

export const swipeRight = () => {
  return {
    type: SWIPE_RIGHT
  };
};

export const navigatePush = (state) => {
  state = typeof state === 'string' ? { key: state, title: state } : state;
  return {
    type: NAV_PUSH,
    state
  };
};

export const navigatePop = () => {
  return {
    type: NAV_POP
  };
};

export const navigateJumpToKey = (key) => {
  return {
    type: NAV_JUMP_TO_KEY,
    key
  };
};

export const navigateJumpToIndex = (index) => {
  return {
    type: NAV_JUMP_TO_INDEX,
    index
  };
};

export const navigateReset = (routes, index) => {
  return {
    type: NAV_RESET,
    index,
    routes
  };
};

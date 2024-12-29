// csrfReducer.js
import { SET_CSRF_TOKEN } from './../actions/csrfActions';

const initialState = {
  csrfToken: '',
};

const csrfReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CSRF_TOKEN:
      return {
        ...state,
        csrfToken: action.payload,
      };
    default:
      return state;
  }
};

export default csrfReducer;
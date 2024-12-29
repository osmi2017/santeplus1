import { combineReducers } from 'redux';
import csrfReducer from './csrfReducer'; // Your existing csrf reducer
import userReducer from './userReducer'; // Import the user reducer

const rootReducer = combineReducers({
  csrf: csrfReducer,
  user: userReducer,
});

export default rootReducer;
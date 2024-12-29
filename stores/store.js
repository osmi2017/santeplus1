// store.js
import { createStore, combineReducers } from 'redux';
import csrfReducer from './../reducers/csrfReducer';
import userReducer from './../reducers/userReducer';

const rootReducer = combineReducers({
  csrf: csrfReducer,
  user: userReducer,
});

const store = createStore(rootReducer);

export default store;
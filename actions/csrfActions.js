// csrfActions.js
export const SET_CSRF_TOKEN = 'SET_CSRF_TOKEN';

export const setCsrfToken = (token) => ({
  type: SET_CSRF_TOKEN,
  payload: token,
});
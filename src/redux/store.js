import { applyMiddleware, compose, createStore, combineReducers } from 'redux';
import { LOCATION_CHANGE } from 'react-router-redux';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import * as ga from "../ga/initializeGoogleAnalytics";


// Single sign-on action types
const LOGIN_ACTION = 'LOGIN';
const LOGOUT_ACTION = 'LOGOUT';
const ERROR = 'ERROR';
const CLEAR_ERROR = 'CLEAR_ERROR';

const initialState = {
  showError: false,
  user: false,
  pageview_total: 0,
  hasTrackedPageview: false
};

function logPageview(state, action) {
  console.log("pageview for: ", action.user.id_token);

  let data = { pageview_total: state.pageview_total + 1, hasTrackedPageview: true};
  if (action) {
    data.user = action.user;
  }
  return Object.assign({}, state, data);
}

function handleLogin(state, action) {
  if (!state.hasTrackedPageview) {
    return logPageview(state, action);
  } else {
    return Object.assign({}, { user: action.user });
  }
}

function analytics_reducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_ACTION:
      return handleLogin(state, action);
    case LOGOUT_ACTION:
      return Object.assign({}, { user: false });
    case ERROR:
      return Object.assign({}, state, { showError: action.error });
    case CLEAR_ERROR:
      return Object.assign({}, state, { showError: false });
    case LOCATION_CHANGE:
      if (state.user)
        logPageview(state);
      else
        return Object.assign({}, state);
      break;
    default:
      return state;
  }
}

function createRootReducer(history) {
  return(
    combineReducers({
      router: connectRouter(history),
      analytics: analytics_reducer
    })
  );
}

export const history = createBrowserHistory();

const store = createStore(
  createRootReducer(history),
  compose(
    applyMiddleware(
      routerMiddleware(history)
    )
  )
);

// Single sign on actions
export const loginAction = user => ({ type: LOGIN_ACTION, user });
export const logoutAction = () => ({ type: LOGOUT_ACTION });

export const errorAction = error => ({ type: ERROR, error });
export const clearErrorAction = () => ({ type: CLEAR_ERROR });


export default store;
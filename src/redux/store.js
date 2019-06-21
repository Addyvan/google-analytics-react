import { applyMiddleware, compose, createStore, combineReducers } from 'redux';
import { LOCATION_CHANGE } from 'react-router-redux';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import * as ga from "../ga/initializeGoogleAnalytics";
import saveState from "./saveState";
import loadState from "./loadState";

// Single sign-on action types
const LOGIN_ACTION = 'LOGIN';
const LOGOUT_ACTION = 'LOGOUT';
const ERROR = 'ERROR';
const CLEAR_ERROR = 'CLEAR_ERROR';

// onboarding action types
const EDIT_NAME = "EDIT_NAME";
const EDIT_COUNTRY = "EDIT_COUNTRY";
const EDIT_PHONE = "EDIT_PHONE";
const EDIT_TEAM = "EDIT_TEAM";
const ADD_STORY = "ADD_STORY";

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

function addOnboardingStory(state, action) {

  console.log("state", state);

  state.story.push({
    time: new Date(),
    action: {
      type: action.story_type,
      step: action.step
    },
    stateSnapshot: {
      name: state.name,
      country: state.country,
      phone: state.phone,
      team: state.team
    }
  });

  return Object.assign({}, state, { story: state.story });
}

const oldState = loadState();

let onboardInitialState = {
  name: (oldState.onboarding.name) ? oldState.onboarding.name : null,
  country: (oldState.onboarding.country) ? oldState.onboarding.country : null,
  phone: (oldState.onboarding.phone) ? oldState.onboarding.phone : null,
  team: (oldState.onboarding.team) ? oldState.onboarding.team : null,
  story: (oldState.onboarding.story) ? oldState.onboarding.story : []
}

function onboarding_reducer(state = onboardInitialState, action) {
  
  switch (action.type) {
    case EDIT_NAME:
      return Object.assign({}, state, { name: action.name });
    case EDIT_COUNTRY:
      return Object.assign({}, state, { country: action.country });
    case EDIT_PHONE:
      return Object.assign({}, state, { phone: action.phone });
    case EDIT_TEAM:
      return Object.assign({}, state, { team: action.team });
    case ADD_STORY:
      return addOnboardingStory(state, action);
    default:
      return state;
  }
}

function createRootReducer(history) {
  return(
    combineReducers({
      router: connectRouter(history),
      analytics: analytics_reducer,
      onboarding: onboarding_reducer
    })
  );
}

export const history = createBrowserHistory();

const store = createStore(
  createRootReducer(history),
  //oldState,
  compose(
    applyMiddleware(
      routerMiddleware(history)
    )
  )
);

store.subscribe(() => {
  saveState(store.getState());
});

// Single sign on actions
export const loginAction = user => ({ type: LOGIN_ACTION, user });
export const logoutAction = () => ({ type: LOGOUT_ACTION });
export const errorAction = error => ({ type: ERROR, error });
export const clearErrorAction = () => ({ type: CLEAR_ERROR });

// Onboarding actions
export const editName = name => ({type: EDIT_NAME, name});
export const editCountry = country => ({type: EDIT_COUNTRY, country});
export const editPhone = phone => ({type: EDIT_PHONE, phone});
export const editTeam = team => ({type: EDIT_TEAM, team});
export const addStory = (story_type, step) => ({type: ADD_STORY, story_type, step});

export default store;
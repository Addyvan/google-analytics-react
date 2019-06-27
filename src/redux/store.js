import { applyMiddleware, compose, createStore, combineReducers } from 'redux';
import { LOCATION_CHANGE } from 'react-router-redux';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
//import gtag from "../ga/initializeGoogleAnalytics";
import saveState from "./utils/saveState";
import loadState from "./utils/loadState";

import {
  LOGIN_ACTION,
  LOGOUT_ACTION,
  ERROR,
  CLEAR_ERROR,
  EDIT_NAME,
  EDIT_COUNTRY,
  EDIT_PHONE,
  EDIT_TEAM,
  ADD_STORY,
  RESET_STATE
} from "./actions/types";


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

/*
function trackSearch(state, query, result) {
  gtag('event', 'search', {query: query, result: result});
  return Object.assign({}, state);
}
*/

function analytics_reducer(state = initialState, action) {
  //console.log(action);
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
  name: (oldState) ? oldState.onboarding.name : null,
  country: (oldState) ? oldState.onboarding.country : null,
  phone: (oldState) ? oldState.onboarding.phone : null,
  team: (oldState) ? oldState.onboarding.team : null,
  story: (oldState) ? oldState.onboarding.story : []
}

let emptyOnboardState = {
  name: null,
  country: null,
  phone: null,
  team: null,
  story: []
};

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
    case RESET_STATE:
      return Object.assign({}, emptyOnboardState);
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
  compose(
    applyMiddleware(
      routerMiddleware(history)
    )
  )
);

store.subscribe(() => {
  saveState(store.getState());
});

export default store;
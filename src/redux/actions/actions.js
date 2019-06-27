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
} from "./types";

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
export const resetState = () => ({type: RESET_STATE});
export const trackSearch = (query, result) => ({type: RESET_STATE, query, result});
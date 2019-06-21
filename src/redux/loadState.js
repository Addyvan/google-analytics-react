const loadState = () => {
  try {
      // Load the data saved in localStorage, against the key 'app_state'
      const serialisedState = window.localStorage.getItem('app_state');

      // Passing undefined to createStore will result in our app getting the default state
      // If no data is saved, return undefined
      if (!serialisedState) return undefined;

      // De-serialise the saved state, and return it.
      return JSON.parse(serialisedState);
  } catch (err) {
      // Return undefined if localStorage is not available, 
      // or data could not be de-serialised, 
      // or there was some other error
      return undefined;
  }
};

export default loadState;
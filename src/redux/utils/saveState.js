const saveState = (state) => {
  try {
      // Convert the state to a JSON string 
      const serialisedState = JSON.stringify(state);

      // Save the serialised state to localStorage against the key 'app_state'
      window.localStorage.setItem('app_state', serialisedState);
  } catch (err) {
      // Log errors here, or ignore
  }
};

export default saveState;
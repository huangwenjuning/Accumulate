export const createStore = (reducer, enhancer) => {
  let state;
  let listeners = [];

  if (enhancer) {
    return enhancer(createStore)(reducer);
  }

  const getState = () => {
    return state;
  };

  const subscribe = (listener) => {
    listeners.push(listener);
    return () => {
      listeners.filter((item) => item !== listener);
    }
  };

  const dispatch = (action) => {
    state = reducer(state, action);
    listeners.forEach((listener) => listener());
    return action;
  };

  dispatch({});

  return {
    getState,
    subscribe,
    dispatch,
  }
}
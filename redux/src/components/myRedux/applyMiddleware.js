export const applyMiddleware = (...middlewares) => {
  return createStore => reducer => {
    const store = createStore(reducer);
    let dispatch = store.dispatch;
    const midApi = {
      getState: store.getState,
      dispatch: (...arg) => dispatch(...arg),
    }
    const middlewareChain = middlewares.map((mid) => mid(midApi));
    dispatch = compose(...middlewareChain)(dispatch);
    console.log(dispatch, 'dispatch');
    console.log(JSON.stringify(dispatch, null, 2), 'dispatch');
    return {
      ...store,
      dispatch,
    }
  }
};

var compose = (...mid) => {
  if (mid.length === 0) {
    return arg => arg;
  }

  if (mid.length === 1) {
    return mid[0]
  }
  return mid.reduce((l, r) => (...args) => l(r(...args)));
}
export const combineReducers = (reducers) => {
  return (state = {}, action) => {
    const reducerKeys = Object.keys(reducers);
    // 新的 state
    const newState = {};
    // 判断 state 是否发生变化
    let hasChanged = false;
    for (let i = 0; i < reducerKeys.length; i++) {
      const key = reducerKeys[i];
      const reducer = reducers[key];
      // 获取当前 key 旧的 state
      const preStateForKey = state[key];
      // 得到当前 key 新的 state
      const nextStateForKey = reducer(preStateForKey, action);

      if (typeof nextStateForKey !== 'undefined') {
        newState[key] = nextStateForKey;
        hasChanged = hasChanged || nextStateForKey !== preStateForKey;
      }
    }
    hasChanged = hasChanged || Object.keys(reducers).length !== Object.keys(state).length;
    return hasChanged ? newState : state;
  }
};
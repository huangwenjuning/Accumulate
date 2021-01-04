import { createStore, applyMiddleware, combineReducers } from './components/myRedux/index.js';
import { thunk } from './components/middleware/thunk.js';
import { logger } from './components/middleware/logger.js';
// import  { applyMiddleware } from 'redux';
// import thunkMiddleware from 'redux-thunk';
// import loggerMiddleware from 'redux-logger';
// import { combineReducers } from 'redux';

const reducer = (state = 0, action) => {
  console.log(state, 'state')
  switch(action.type) {
    case 'ADD':
      return state+1;
    case 'MINUS':
      return state-1;
    case 'AsyncAdd':
      return state+1;
    default:
      return state;
  }
};

export const store = createStore(combineReducers({ count: reducer }), applyMiddleware(thunk, logger));
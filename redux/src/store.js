import { createStore, applyMiddleware } from './components/myRedux/index.js';
import { thunk } from './components/middleware/thunk.js';
import { logger } from './components/middleware/logger.js';
// import  { applyMiddleware } from 'redux';
// import thunkMiddleware from 'redux-thunk';
// import loggerMiddleware from 'redux-logger';

const reducer = ({ state, action }) => {
  switch(action.type) {
    case 'ADD':
      return state+1;
    case 'MINUS':
      return state-1;
    case 'AsyncAdd':
      return state+1;
    default:
      return 0;
  }
};

export const store = createStore(reducer, applyMiddleware(thunk, logger));
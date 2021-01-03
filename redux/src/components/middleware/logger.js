export const logger = ({ getState }) => {
  return (next) => (action) => {
      const state = getState();
      console.log('=====');
      console.log('preState', state);
      console.log('action', action);
      next(action);
      const curState = getState();
      console.log('curState', curState);
      console.log('=====');
    }
}
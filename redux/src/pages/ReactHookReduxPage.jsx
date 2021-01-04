import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

export const ReactHookReduxPage = () => {
  const { count } = useSelector((state) => state);
  const dispatch = useDispatch();
  const onAdd = useCallback(
    () => {
      dispatch({ type: 'ADD' })
    },
    [dispatch],
  );

  const onMinus = useCallback(
    () => {
      dispatch({ type: 'MINUS' })
    },
    [dispatch],
  );

  const onAsyncAdd = useCallback(
    () => {
      dispatch((dispatch) => {
        setTimeout(() => {
          dispatch({ type: 'AsyncAdd' })
        })
      });
    },
    [dispatch],
  );
  return (
    <div>
      <h1>React Hook Redux</h1>
      <h2>{count}</h2>
      <div style={{ margin: 8 }}>
        <button onClick={() => { onAdd() }}>增加:</button>
      </div>
      <div style={{ margin: 8 }}>
        <button onClick={() => { onMinus() }}>减少:</button>
      </div>
      <div style={{ margin: 8 }}>
        <button onClick={() => { onAsyncAdd() }}>异步增加:</button>
      </div>
    </div>
  )
}
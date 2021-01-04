import React, { Component } from 'react';
import { store } from '../store.js';

export default class ReduxPage extends Component {
  onAdd = () => {
    store.dispatch({type: 'ADD'});
  }
  onAsyncAdd = () => {
    store.dispatch((dispatch) => {
      setTimeout(() => {
        dispatch({type: 'AsyncAdd'});
      }, 3000);
    });
  }
  onMinus = () => {
    store.dispatch({type: 'MINUS'});
  }

  componentDidMount() {
    this.unsubscribe = store.subscribe(() => {
      this.forceUpdate();
    });
  }

  componentWillUnmount() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }

  render() {
    return (
      <div>
        <h1>Redux</h1>
        <h2>{store.getState().count}</h2>
        <div style={{ margin: 8 }}>
          <button onClick={() => { this.onAdd() }}>增加:</button>
        </div>
        <div style={{ margin: 8 }}>
          <button onClick={() => { this.onMinus() }}>减少:</button>
        </div>
        <div style={{ margin: 8 }}>
          <button onClick={() => { this.onAsyncAdd() }}>异步增加:</button>
        </div>
      </div>
    )
  }
}
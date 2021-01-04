import React, { Component } from 'react';
import { connect } from 'react-redux';

@connect(
  // mapStateToProps
  (state) => ({ state }),
  // mapDispatchToProps
  {
    add: () => ({
      type: 'ADD',
    })
  }
)
class ReactReduxPage extends Component {
  onAdd = () => {
    this.props.add();
  }

  render() {
    return (
      <div>
        <h1>React Redux</h1>
        <h2>{this.props.state.count}</h2>
        <div style={{ margin: 8 }}>
          <button onClick={() => { this.onAdd() }}>增加:</button>
        </div>
        <div style={{ margin: 8 }}>
          {/* <button onClick={() => { this.onMinus() }}>减少:</button> */}
        </div>
        <div style={{ margin: 8 }}>
          {/* <button onClick={() => { this.onAsyncAdd() }}>异步增加:</button> */}
        </div>
      </div>
    )
  }
}

export default ReactReduxPage;
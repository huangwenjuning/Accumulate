import React, {Component} from "react";
import ReduxPage from './pages/ReduxPage.jsx';
import ReactReduxPage from './pages/ReactReduxPage.jsx';
import { ReactHookReduxPage } from './pages/ReactHookReduxPage.jsx';
import { Provider } from 'react-redux';
import { store } from './store.js';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <ReduxPage />
          <ReactReduxPage />
          <ReactHookReduxPage />
        </div>
      </Provider>
    );
  }
}

export default App;

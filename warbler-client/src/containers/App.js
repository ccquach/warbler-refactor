import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '../store';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './Navbar';
import Main from './Main';
import { setAuthorizationToken, setCurrentUser } from '../store/actions/auth';
import jwtDecode from 'jwt-decode';

const store = configureStore();

if (localStorage.jwtToken) {
  setAuthorizationToken(localStorage.jwtToken);
  try {
    store.dispatch(setCurrentUser(jwtDecode(localStorage.jwtToken)));
  } catch (err) {
    store.dispatch(setCurrentUser({}));
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { panelOpen: false };
  }

  closePanel = () => {
    this.setState({ panelOpen: false });
  };

  togglePanel = e => {
    this.setState({ panelOpen: !this.state.panelOpen });
  };

  render() {
    const { panelOpen } = this.state;
    return (
      <Provider store={store}>
        <Router>
          <div className="onboarding">
            <Navbar
              panelOpen={panelOpen}
              closePanel={this.closePanel}
              togglePanel={this.togglePanel}
            />
            <Main
              mainStyle={{
                opacity: panelOpen ? 0.5 : 1,
                pointerEvents: panelOpen ? 'none' : 'auto'
              }}
            />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;

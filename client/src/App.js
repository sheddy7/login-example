import React, { Component } from 'react';

import AppHeader from './containers/AppHeader';
import LoginForm from './containers/LoginForm';

export class App extends Component {
  render() {
    return (
      <div className="App">
        <AppHeader />
        <LoginForm />
      </div>
    );
  }
}

export default App;

import React from 'react';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';

const AppHeaderComponent = props => {

  const buttonText = props.authenticated ? "Logout" : "Login",
    handleLogout = props.handleLogout;

  return (
    <MuiThemeProvider>
      <AppBar
        title="Example login app"
        iconElementRight={
          <FlatButton
            className="menuButton"
            label={buttonText}
          />}
        onRightIconButtonClick={handleLogout}
      />
    </MuiThemeProvider>
  );
};

export default AppHeaderComponent;

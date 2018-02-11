import React from 'react';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import '../assets/LoginForm.css';

const paperStyle = {
  height: 350,
  width: 300,
  margin: 20,
  textAlign: 'center',
  display: 'inline-block',
};

const buttonStyle = {
  margin: 30
}

const LoginFormComponent = props => {

  const {
    email,
    password,
    text,
    error,
    handleSubmit,
    handleFieldChange
  } = props;

  const testClasses = error ? 'message error' : 'message';

  return (
    <form name="loginForm" onSubmit={handleSubmit}>
      <MuiThemeProvider>
        <Paper style={paperStyle} zDepth={1}>

            <TextField
              type="email"
              name="email"
              floatingLabelText="email address"
              onChange={handleFieldChange}
              value={email}
            />


            <TextField
              type="password"
              name="password"
              floatingLabelText="password"
              onChange={handleFieldChange}
              value={password}
            />

          <RaisedButton
            style={buttonStyle}
            primary={true}
            label="Login"
            labelPosition="before"
            containerElement="label"
          >
            <input id="submitButton" type="submit" value="Login" />
          </RaisedButton>

          <div className={testClasses}>
            {text}
          </div>

        </Paper>
      </MuiThemeProvider>
    </form>
  );
};

export default LoginFormComponent;

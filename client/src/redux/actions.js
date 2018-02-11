export const SET_LOGIN_PENDING = 'SET_LOGIN_PENDING';
export const SET_LOGIN_SUCCESS = 'SET_LOGIN_SUCCESS';
export const SET_LOGIN_ERROR = 'SET_LOGIN_ERROR';
export const SET_LOGOUT = 'SET_LOGOUT';

export const setLoginPending = isLoginPending => ({
  type: SET_LOGIN_PENDING,
  isLoginPending
});

export const setLoginSuccess = isLoginSuccess => ({
  type: SET_LOGIN_SUCCESS,
  isLoginSuccess
});

export const setLoginError = loginError => ({
  type: SET_LOGIN_ERROR,
  loginError
});

export const setLogout = () => ({
  type: SET_LOGOUT
});

export const logout = () => {
  return dispatch => {
    return dispatch(setLogout());
  }
}

export const login = values => {
  return dispatch => {

    dispatch(setLoginPending(true));

    return fakeLoginApi(values)
      .then((response) => {
        dispatch(setLoginPending(false));

        response.success ? dispatch(setLoginSuccess(true)) : dispatch(setLoginError(new Error(response.message)));
      })
      .catch(error => {
        dispatch(setLoginPending(false));
        dispatch(setLoginError(error));
      });
  };
};

const fakeLoginApi = values => {
  return new Promise((resolve, reject) => {
    fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: values.email,
        password: values.password
      })
    })
    .then(response => {
      return response.json();
    }).then(parsedJson => {
      return resolve(parsedJson)
    })
    .catch(() => {
      return reject(new Error('Could not contact login server'));
    });
  });
};

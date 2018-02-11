import { loginStatus, initalState } from '../../redux/reducer';
import { SET_LOGIN_PENDING, SET_LOGIN_SUCCESS, SET_LOGIN_ERROR, SET_LOGOUT } from '../../redux/actions';

describe('login reducer', () => {

  it('should return the initial state', () => {
    expect(loginStatus(undefined, {})).toEqual(initalState);
  });

  it('should handle SET_LOGIN_PENDING', () => {
    const fakePendingAction = {
      type: SET_LOGIN_PENDING,
      isLoginPending: true
    };

    expect(loginStatus({}, fakePendingAction)).toEqual({
      requestPending: true,
      text: 'Please wait...',
      error: false,
      authenticated: false
    });
  });

  it('should handle SET_LOGIN_SUCCESS', () => {
    const fakeSuccessAction = {
      type: SET_LOGIN_SUCCESS,
      isLoginSuccess: true
    };

    expect(loginStatus({}, fakeSuccessAction)).toEqual({
      requestPending: false,
      text: 'Success',
      error: false,
      authenticated: true
    });
  })

  it('should handle SET_LOGIN_ERROR', () => {
    const fakeErrorAction = {
      type: SET_LOGIN_ERROR,
      loginError: {
        message: "An error occured"
      }
    };

    expect(loginStatus({}, fakeErrorAction)).toEqual({
      requestPending: false,
      text: "An error occured",
      error: true,
      authenticated: false
    });
  });

  it('should handle SET_LOGOUT', () => {
    const fakeLogoutAction = {
      type: SET_LOGOUT
    };

    expect(loginStatus({}, fakeLogoutAction)).toEqual({
      text: '',
      authenticated: false
    });
  });
});

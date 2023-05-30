const {
  AUTHENTICATE_USER,

  LOGIN_START,
  LOGIN_SUCCESS,
  LOGIN_FAILED,

  SIGN_UP_START,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILED,

  LOGOUT_SUCCESS,
  LOGOUT_FAILED,

  PROFILE_START,
  PROFILE_SUCCESS,
  PROFILE_FAILED,

  UPDATE_PROFILE_START,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAILED,
} = require("../actions/actionTypes");

let initial_auth_state = {
  user: {},
  error: false,
  isLoggedIn: false,
  inProgress: false,
};

export default function auth(state = initial_auth_state, action) {
  let { data } = action;

  switch (action.type) {
    case LOGIN_START:
    case SIGN_UP_START:
    case UPDATE_PROFILE_START:
      return {
        ...state,
        inProgress: true,
      };

    case AUTHENTICATE_USER:
      return {
        ...state,
        user: {
          name: data.data.name,
          email: data.data.email,
          type: data.type,
        },
        isLoggedIn: true,
      };

    case LOGIN_SUCCESS:
      return {
        ...state,
        user: {
          name: data.name,
          email: data.email,
          type: data.type,
        },
        error: false,
        isLoggedIn: true,
        inProgress: false,
      };

    case LOGIN_FAILED:
      return {
        ...state,
        user: {},
        error: true,
        isLoggedIn: false,
        inProgress: false,
      };

    case SIGN_UP_SUCCESS:
      return {
        ...state,
        error: false,
        inProgress: false,
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        user: {},
        error: false,
        inProgress: false,
        isLoggedIn: false,
      };

    case SIGN_UP_FAILED:
    case LOGOUT_FAILED:
    case UPDATE_PROFILE_FAILED:
      return {
        ...state,
        error: true,
        inProgress: false,
      };

    case UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        user: {
          name: data.name,
          email: data.email,
          type: data.type,
        },
        error: false,
        inProgress: false,
      };

    default:
      return state;
  }
}

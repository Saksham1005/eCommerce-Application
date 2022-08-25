const {
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

  GET_PRODUCTS_START,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_FAILED,
} = require("./actionTypes");

const {
  getAuthTokenFromLocalStorage,
  getFormBody,
} = require("../helpers/utils");

let {
  getProductURL,
  loginURL,
  logoutURL,
  signUpURL,
  updateProfileURL,
} = require("../helpers/urls");

// SIGN ACTIONS
function start_signUp() {
  return {
    type: SIGN_UP_START,
  };
}

function signUp_success(data) {
  return {
    type: SIGN_UP_SUCCESS,
    data,
  };
}

function signUp_failed(data) {
  return {
    type: SIGN_UP_FAILED,
    data,
  };
}

export function signUp(name, email, password, confirm_password, type) {
  return function (dispatch) {
    dispatch(start_signUp());

    fetch(signUpURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: getFormBody({ name, email, password, confirm_password, type }),
      mode: "cors",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          dispatch(signUp_success(data));

          return;
        }
        return dispatch(signUp_failed(data));
      });
  };
}

// lOGIN ACTIONS
function start_login() {
  return {
    type: LOGIN_START,
  };
}

function login_success(data) {
  return {
    type: LOGIN_SUCCESS,
    data,
  };
}

function login_failed() {
  return {
    type: LOGIN_FAILED,
  };
}

export function login(email, password, type) {
  return function (dispatch) {
    dispatch(start_login());

    fetch(loginURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: getFormBody({ email, password, type }),
      mode: "cors",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          dispatch(login_success(data.data));

          // Storing accessToken in local storage
          localStorage.setItem("accessToken", data.accessToken);
          return;
        }
        return dispatch(login_failed());
      });
  };
}

// LOGOUT
function logout_success() {
  return {
    type: LOGOUT_SUCCESS,
  };
}

function logout_failed() {
  return {
    type: LOGOUT_FAILED,
  };
}

export function logout() {
  return function (dispatch) {
    fetch(logoutURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${getAuthTokenFromLocalStorage()}`,
      },
      mode: "cors",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          dispatch(logout_success());

          // Removing the accessToken from local storage
          localStorage.removeItem("accessToken");
          return;
        }
        return dispatch(logout_failed());
      });
  };
}

// GET PRODUCTS FOR USER
// Sort parameter will be accepted

function getProductStart() {
  return {
    type: GET_PRODUCTS_START,
  };
}

function getProductSuccess(products) {
  return {
    type: GET_PRODUCTS_SUCCESS,
    data: products,
  };
}

function getProductFailed(error) {
  return {
    type: GET_PRODUCTS_FAILED,
    data: error,
  };
}

export function getProducts(sortMaxRatingProduct, sortProductsMaxSales) {
  return function (dispatch) {
    // dispatch(getProductStart());

    let params = new URLSearchParams({
      sortMaxRatingProduct: sortMaxRatingProduct,
      sortProductsMaxSales: sortProductsMaxSales,
    }).toString();

    // console.log(params);
    getProductURL += "?" + params;

    fetch(getProductURL, {
      method: "GET",
      mode: "cors",
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.success) {
          dispatch(getProductSuccess(data.data));
          return;
        } else {
          dispatch(getProductFailed(data.message));
          return;
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
}

// UPDATE PROFILE ACTIONS
function update_profile_start() {
  return {
    type: UPDATE_PROFILE_START,
  };
}

function update_profile_success(data) {
  return {
    type: UPDATE_PROFILE_SUCCESS,
    data,
  };
}

function update_profile_failed() {
  return {
    type: UPDATE_PROFILE_FAILED,
  };
}

export function updateProfile(name, password, confirm_password) {
  return function (dispatch) {
    dispatch(update_profile_start());

    fetch(updateProfileURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${getAuthTokenFromLocalStorage()}`,
      },
      body: getFormBody({ name, password, confirm_password }),
      mode: "cors",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          dispatch(update_profile_success(data.data));

          // Storing accessToken in local storage
          localStorage.setItem("accessToken", data.accessToken);
          return;
        }
        return dispatch(update_profile_failed());
      });
  };
}

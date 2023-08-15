const {
  GET_CART_START,
  GET_CART_SUCCESS,
  GET_CART_FAILED,

  GET_ORDER_START,
  GET_ORDER_SUCCESS,
  GET_ORDER_FAILED,

  GET_SAVED_PRODUCTS_START,
  GET_SAVED_PRODUCTS_SUCCESS,
  GET_SAVED_PRODUCTS_FAILED,

  TOGGLE_PRODUCT_CART_START,
  ADD_PRODUCT_CART_SUCCESS,
  DELETE_PRODUCT_CART_SUCCESS,
  TOGGLE_PRODUCT_CART_FAILED,

  BUY_PRODUCT_START,
  BUY_PRODUCT_SUCCESS,
  BUY_PRODUCT_FAILED,

  RATE_PRODUCT_START,
  RATE_PRODUCT_SUCCESS,
  RATE_PRODUCT_FAILED,

  SAVE_PRODUCT_START,
  SAVE_PRODUCT_SUCCESS,
  SAVE_PRODUCT_FAILED,
} = require("./actionTypes");

const {
  getAuthTokenFromLocalStorage,
  getFormBody,
} = require("../helpers/utils");

const {
  saveProductURL,
  getSavedProductsURL,
  getOrdersURL,
  getCartURL,
  toggleProductInCartURL,
  rateProductURL,
  buyProductURL,
} = require("../helpers/urls");

// GET CART
function getCart_start() {
  return {
    type: GET_CART_START,
  };
}

function getCart_success(products) {
  return {
    type: GET_CART_SUCCESS,
    data: products,
  };
}

function getCart_failed(error) {
  return {
    type: GET_CART_FAILED,
    data: error,
  };
}

export function getCart() {
  return function (dispatch) {
    dispatch(getCart_start());

    fetch(getCartURL, {
      method: "GET",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${getAuthTokenFromLocalStorage()}`,
      },
      mode: "cors",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          return dispatch(getCart_success(data.data));
        } else {
          return dispatch(getCart_failed(data.message));
        }
      });
  };
}

// GET ORDERs
function getOrders_start() {
  return {
    type: GET_ORDER_START,
  };
}

function getOrders_success(products) {
  return {
    type: GET_ORDER_SUCCESS,
    data: products,
  };
}

function getOrders_failed(error) {
  return {
    type: GET_ORDER_FAILED,
    data: error,
  };
}

export function getOrders() {
  return function (dispatch) {
    dispatch(getOrders_start());

    fetch(getOrdersURL, {
      method: "GET",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${getAuthTokenFromLocalStorage()}`,
      },
      mode: "cors",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          return dispatch(getOrders_success(data.data));
        } else {
          return dispatch(getOrders_failed(data.message));
        }
      });
  };
}

// GET SAVED PRODUCTS
function getSavedProducts_start() {
  return {
    type: GET_SAVED_PRODUCTS_START,
  };
}

function getSavedProducts_success(products) {
  return {
    type: GET_SAVED_PRODUCTS_SUCCESS,
    data: products,
  };
}

function getSavedProducts_failed(error) {
  return {
    type: GET_SAVED_PRODUCTS_FAILED,
    data: error,
  };
}

export function getSavedProducts() {
  return function (dispatch) {
    dispatch(getSavedProducts_start());

    fetch(getSavedProductsURL, {
      method: "GET",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${getAuthTokenFromLocalStorage()}`,
      },
      mode: "cors",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          return dispatch(getSavedProducts_success(data.data));
        } else {
          return dispatch(getSavedProducts_failed(data.message));
        }
      });
  };
}

// TOGGLE PRODUCT IN CART
function toggleProductInCart_start() {
  return {
    type: TOGGLE_PRODUCT_CART_START,
  };
}

function addProductInCart_success(data) {
  return {
    type: ADD_PRODUCT_CART_SUCCESS,
    data,
  };
}

function deleteProductInCart_success(data) {
  return {
    type: DELETE_PRODUCT_CART_SUCCESS,
    data,
  };
}

function toggleProductInCart_failed(message) {
  return {
    type: TOGGLE_PRODUCT_CART_FAILED,
    data: message,
  };
}

export function toggleProductInCart(productId, qty) {
  return function (dispatch) {
    dispatch(toggleProductInCart_start());

    fetch(toggleProductInCartURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${getAuthTokenFromLocalStorage()}`,
      },
      body: getFormBody({ productId, qty }),
      mode: "cors",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          if (data.removed === true) {
            dispatch(deleteProductInCart_success(data.data));
          } else {
            dispatch(addProductInCart_success(data.data));
          }

          return;
        }
        return dispatch(toggleProductInCart_failed(data.message));
      });
  };
}

// BUY PRODUCT IN CART
function buyProduct_success(data) {
  return {
    type: BUY_PRODUCT_SUCCESS,
    data,
  };
}

function buyProduct_failed(message) {
  return {
    type: BUY_PRODUCT_FAILED,
    data: message,
  };
}

export function buyProduct(productId, qty) {
  return function (dispatch) {
    fetch(buyProductURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${getAuthTokenFromLocalStorage()}`,
      },
      body: getFormBody({ productId, qty }),
      mode: "cors",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          dispatch(buyProduct_success(data.data));

          return;
        }
        return dispatch(buyProduct_failed(data.message));
      });
  };
}

// RATE PRODUCT
function rateProduct_success(data) {
  return {
    type: RATE_PRODUCT_SUCCESS,
    data,
  };
}

function rateProduct_failed(message) {
  return {
    type: RATE_PRODUCT_FAILED,
    data: message,
  };
}

export function rateProduct(productId, rating) {
  return function (dispatch) {
    fetch(rateProductURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${getAuthTokenFromLocalStorage()}`,
      },
      body: getFormBody({ productId, rating }),
      mode: "cors",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          dispatch(rateProduct_success(rating));

          return;
        }
        return dispatch(rateProduct_failed(data.message));
      });
  };
}

// SAVE PRODUCT
function saveProduct_success(productId, isSaved) {
  return {
    type: SAVE_PRODUCT_SUCCESS,
    data: {
      productId,
      isSaved,
    },
  };
}

function saveProduct_failed(message) {
  return {
    type: SAVE_PRODUCT_FAILED,
    data: message,
  };
}

export function saveProduct(productId, isSaved) {
  return function (dispatch) {
    fetch(saveProductURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${getAuthTokenFromLocalStorage()}`,
      },
      body: getFormBody({ productId }),
      mode: "cors",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          dispatch(saveProduct_success(productId, isSaved));

          return;
        }
        return dispatch(saveProduct_failed(data.message));
      });
  };
}

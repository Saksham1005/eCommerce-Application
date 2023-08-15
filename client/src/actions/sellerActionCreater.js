const {
  ADD_PRODUCT_START,
  ADD_PRODUCT_SUCCESS,
  ADD_PRODUCT_FAILED,

  DELETE_PRODUCT_START,
  DELETE_PRODUCT_SUCCESS,
  OUTOFSTOCK_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAILED,
} = require("./actionTypes");

const { addProductURL, deleteProductURL } = require("../helpers/urls");

const {
  getAuthTokenFromLocalStorage,
  getFormBody,
} = require("../helpers/utils");

// ADD PRODUCT ACTIONS
function addProduct_start() {
  return {
    type: ADD_PRODUCT_START,
  };
}

function addProduct_success(data) {
  return {
    type: ADD_PRODUCT_SUCCESS,
    data,
  };
}

function addProduct_failed(data) {
  return {
    type: ADD_PRODUCT_FAILED,
    data,
  };
}

export function addProduct(formData) {
  return function (dispatch) {
    dispatch(addProduct_start());

    fetch(addProductURL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${getAuthTokenFromLocalStorage()}`,
      },
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          dispatch(addProduct_success(data.data));
          return;
        }

        return dispatch(addProduct_failed(data.message));
      });
  };
}

// DELETE PRODUCT ACTIONS
function deleteProduct_start() {
  return {
    type: DELETE_PRODUCT_START,
  };
}

function deleteProduct_success(data) {
  return {
    type: DELETE_PRODUCT_SUCCESS,
    data,
  };
}
function outOfStockProduct_success(data) {
  return {
    type: OUTOFSTOCK_PRODUCT_SUCCESS,
    data,
  };
}

function deleteProduct_failed(data) {
  return {
    type: DELETE_PRODUCT_FAILED,
    data,
  };
}

export function deleteProduct(_id) {
  return function (dispatch) {
    dispatch(deleteProduct_start());

    fetch(deleteProductURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${getAuthTokenFromLocalStorage()}`,
      },
      body: getFormBody({ _id }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          // Deleting the product or marking it as out of stock
          if (data.data) {
            dispatch(deleteProduct_success(data.data));
          } else {
            dispatch(outOfStockProduct_success(data.message));
          }

          return;
        }

        return dispatch(deleteProduct_failed(data.message));
      });
  };
}

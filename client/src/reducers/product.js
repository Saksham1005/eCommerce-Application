const {
  GET_PRODUCTS_START,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_FAILED,

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

  ADD_PRODUCT_START,
  ADD_PRODUCT_SUCCESS,
  ADD_PRODUCT_FAILED,

  DELETE_PRODUCT_START,
  DELETE_PRODUCT_SUCCESS,
  OUTOFSTOCK_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAILED,
} = require("../actions/actionTypes");

let initital_products_state = {
  error: {
    value: false,
    message: "",
  },
  products: [],
  orders: [],
  inProgress: false,
};

export default function products(state = initital_products_state, action) {
  switch (action.type) {
    case GET_PRODUCTS_START:
    case GET_CART_START:
    case GET_ORDER_START:
    case GET_SAVED_PRODUCTS_START:
    case ADD_PRODUCT_START:
    case DELETE_PRODUCT_START:
    case SAVE_PRODUCT_START:
      // case TOGGLE_PRODUCT_CART_START:
      // case BUY_PRODUCT_START:
      return {
        ...state,
        error: {
          value: false,
          message: "",
        },
        products: [],
        orders: [],
        inProgress: true,
      };

    case GET_PRODUCTS_SUCCESS:
    case GET_SAVED_PRODUCTS_SUCCESS:
      return {
        ...state,
        error: {
          value: false,
          message: "",
        },
        products: action.data,
        inProgress: false,
      };

    case GET_CART_SUCCESS:
    case GET_ORDER_SUCCESS:
      return {
        ...state,
        error: {
          value: false,
          message: "",
        },
        orders: action.data,
        inProgress: false,
      };

    case GET_PRODUCTS_FAILED:
    case GET_SAVED_PRODUCTS_FAILED:
      return {
        ...state,
        error: {
          value: true,
          message: action.data,
        },
        products: [],
        inProgress: false,
      };

    case GET_CART_FAILED:
    case GET_ORDER_FAILED:
      return {
        ...state,
        error: {
          value: true,
          message: action.data,
        },
        orders: [],
        inProgress: false,
      };

    case ADD_PRODUCT_SUCCESS:
    case ADD_PRODUCT_CART_SUCCESS:
    case BUY_PRODUCT_SUCCESS:
      return {
        ...state,
        error: {
          value: false,
          message: "",
        },
        products: [...state.products],
        inProgress: false,
      };

    case RATE_PRODUCT_SUCCESS:
      return {
        ...state,
        error: {
          value: false,
          message: "",
        },
        inProgress: false,
      };

    case DELETE_PRODUCT_SUCCESS:
      return {
        ...state,
        error: {
          value: false,
          message: "",
        },
        products: state.products.filter((product) => {
          return product._id !== action.data;
        }),
        inProgress: false,
      };
    case SAVE_PRODUCT_SUCCESS:
      return {
        ...state,
        error: {
          value: false,
          message: "",
        },
        products: state.products.map((product) => {
          if (product._id === action.data.productId) {
            product["isSaved"] = !action.data.isSaved;
          }
          return product;
        }),
        inProgress: false,
      };
    case DELETE_PRODUCT_CART_SUCCESS:
      return {
        ...state,
        error: {
          value: false,
          message: "",
        },
        orders: state.orders.filter((order) => {
          return order.product._id !== action.data.productId;
        }),
        inProgress: false,
      };

    case OUTOFSTOCK_PRODUCT_SUCCESS:
      return {
        ...state,
        error: {
          value: false,
          message: action.data,
        },
        inProgress: false,
      };

    case ADD_PRODUCT_FAILED:
    case DELETE_PRODUCT_FAILED:
    case TOGGLE_PRODUCT_CART_FAILED:
    case BUY_PRODUCT_FAILED:
      return {
        ...state,
        error: {
          value: true,
          message: action.data,
        },
        products: [],
        inProgress: false,
      };
    case RATE_PRODUCT_FAILED:
      return {
        ...state,
        error: {
          value: true,
          message: action.data,
        },
        inProgress: false,
      };
    case SAVE_PRODUCT_FAILED:
      return {
        ...state,
        error: {
          value: true,
          message: action.data,
        },
        inProgress: false,
      };

    default:
      return state;
  }
}

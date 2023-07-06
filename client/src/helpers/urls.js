const rootURL = "https://e-commerce-application-d31u.onrender.com";

// Common Action URLs
const loginURL = rootURL + "/login";
const logoutURL = rootURL + "/logout";
const signUpURL = rootURL + "/signUp";
const updateProfileURL = rootURL + "/updateProfile";

// User Action URLs
const saveProductURL = rootURL + "/user/product/save";
const rateProductURL = rootURL + "/user/product/rate";
const getSavedProductsURL = rootURL + "/user/savedProducts";
const getCartURL = rootURL + "/user/cart";
const getOrdersURL = rootURL + "/user/orders";
const toggleProductInCartURL = rootURL + "/user/product/cart";

// Seller Action URLs
const getProductURL = rootURL;
const addProductURL = rootURL + "/seller/addProduct";
const deleteProductURL = rootURL + "/seller/deleteProduct";

export {
  addProductURL,
  deleteProductURL,
  getProductURL,
  loginURL,
  logoutURL,
  signUpURL,
  updateProfileURL,
  saveProductURL,
  getSavedProductsURL,
  getCartURL,
  getOrdersURL,
  toggleProductInCartURL,
  rateProductURL,
};

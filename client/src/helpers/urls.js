const rootURL = "http://localhost:5000";

const loginURL = rootURL + "/login";
const logoutURL = rootURL + "/logout";
const signUpURL = rootURL + "/signUp";
const updateProfileURL = rootURL + "/updateProfile";

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
};

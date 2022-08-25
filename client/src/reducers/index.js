import { combineReducers } from "redux";

import products from "./product";
import auth from "./auth";
import profile from "./profile";

export default combineReducers({ products, auth, profile });

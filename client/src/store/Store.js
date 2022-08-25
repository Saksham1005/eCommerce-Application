import thunk from "redux-thunk";
import logger from "redux-logger";
import { createStore, applyMiddleware } from "redux";

import rootReducer from "../reducers/index";

export function configureStore() {
  let store = createStore(rootReducer, applyMiddleware(thunk, logger));
  return store;
}

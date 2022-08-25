import React from "react";
import ReactDOM from "react-dom";

import "./index.css";
import App from "./components/App";
import { configureStore } from "./store/Store";

import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

let store = configureStore();

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

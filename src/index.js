import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.css";
import App from "./App";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { createStore } from "./store/createStore";
import { Provider } from "react-redux";
import { Router } from "react-router-dom";
import history from "./utils/history";

const store = createStore();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router history={history}>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();

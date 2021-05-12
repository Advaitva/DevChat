import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import Honeybadger from "@honeybadger-io/js";
import ErrorBoundary from "@honeybadger-io/react";

Honeybadger.configure({
  apiKey: "99603a69",
  environment: "production",
});
window.onerror((e) => {
  console.log("Error: " + e);
});
ReactDOM.render(
  <ErrorBoundary honeybadger={Honeybadger}>
    <App />
  </ErrorBoundary>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

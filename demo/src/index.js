import "bootstrap/dist/css/bootstrap.css"; //Bootstrap
import "./index.css"; //NWB Styles
import "./theme.css"; //Cayman Theme
import "../../node_modules/highlight.js/styles/tomorrow-night.css";

import React from "react";
import { render } from "react-dom";
import { BrowserRouter as Browser } from "react-router-dom";

import App from "./App";

render(
  <Browser>
    <App />
  </Browser>,
  document.querySelector("#app")
);

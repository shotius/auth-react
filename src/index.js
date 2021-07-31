import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import './index.css'
import { Auth0Provider } from "@auth0/auth0-react";

ReactDOM.render(
  <Auth0Provider
    domain="saseburg.eu.auth0.com"
    clientId="r2cf6XArQSmRMv46gFa4WwjVizIvZlXJ"
    redirectUri={window.location.origin}
    audience="http://localhost:4000"
    scope="openid profile email"
  >
    <App />
  </Auth0Provider>,
  document.getElementById("root")
);
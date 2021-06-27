import React from "react";
import { hydrate, render } from "react-dom";
import { InitialData } from "../types";
import App from "./App";

declare global {
  interface Window {
    __INITIAL_DATA__: InitialData;
  }
}

const initialData =
  process.env.NODE_ENV === "production"
    ? window.__INITIAL_DATA__
    : { page: location.pathname.substr(1) };
const renderOrHydrate =
  process.env.NODE_ENV === "production" ? hydrate : render;
renderOrHydrate(
  <App page={initialData.page} />,
  document.getElementById("root")
);

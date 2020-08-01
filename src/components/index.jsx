import React from "react";
import ReactDOM from "react-dom";

import App from "./app";
import footer from "./footer";

const rootElement = document.getElementById("root");
ReactDOM.render(
 <div>
    <App />
    {footer}
 </div>,
  rootElement
);

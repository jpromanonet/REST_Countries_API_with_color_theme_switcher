import React from "react";
import ReactDOM from "react-dom";
import App from "./component/App";
import * as serviceworker from "./serviceworker";

ReactDOM.render(<App />, document.getElementById("root"));

serviceworker.register();
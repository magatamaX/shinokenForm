import React from "react";
import ReactDOM from "react-dom";
import App from "./app";

const target = document.getElementById("seminarScheduleTable");
const jsonPath = target.getAttribute("data-json-path");
ReactDOM.render(<App jsonPath={jsonPath} />, target);

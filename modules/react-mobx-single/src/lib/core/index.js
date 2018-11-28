import React from "react";
import ReactDOM from "react-dom";
import { configure } from "mobx";
import { Provider } from "mobx-react";
import App from "./app/App";
import stores from "./app/store";

configure({ enforceActions: "observed" }); // 不允许在动作之外进行状态修改

ReactDOM.render(
    <Provider store={stores}>
        <App />
    </Provider>,
    window.document.getElementById("react_root")
);

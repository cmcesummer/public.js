import React, { Component } from "react";
import active from "./../../../lib/core/app/Action";
import store from "./store";
import inject from "./../../../lib/core/app/inject";

@active("First")
@inject(store)
export default class First extends Component {
    onClick = () => {
        this.props.store.First.change(5555);
    };
    onClickAjax = () => {
        this.props.store.First.ajaxFn();
    };
    render() {
        const { ajaxFn, a, ajax } = this.props.store.First;
        return (
            <div>
                <div onClick={this.onClick}>55555 ===>>>> {a}</div>
                <br />
                <div onClick={this.onClickAjax}>send ajax</div>
                <br />
                <div>ajax context: {ajax}</div>
            </div>
        );
    }
}

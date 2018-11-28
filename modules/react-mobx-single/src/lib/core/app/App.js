import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import Html from "../html/Html";

const getUrlParams = (name, tolower = true) => {
    const reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    let len = window.location.href.lastIndexOf("?"),
        r = window.location.href.substr(len + 1);
    if (tolower) r = r.toLowerCase();
    r = r.match(reg); //匹配目标参数
    if (r != null) return unescape(r[2]);
    return null; //返回参数值
};

@inject("store")
@observer
export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        const html = getUrlParams("page", false);
        const { addPageName } = props.store.detailStore;
        addPageName({ name: html });
    }

    render() {
        const { pageName, pageComp } = this.props.store.detailStore;
        return (
            <div>
                {pageName.map((item, index) => {
                    return (
                        <Html
                            comp={pageComp[item.name]}
                            name={item.name}
                            key={item.name}
                            last={index === pageName.length - 1}
                        />
                    );
                })}
            </div>
        );
    }
}

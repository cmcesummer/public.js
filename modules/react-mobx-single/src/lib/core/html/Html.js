import React, { Component } from "react";
import $ from "jquery";
import Loading from "./HtmlLoading";

export default class Html extends Component {
    state = {
        load: false
    };
    componentDidMount() {
        const { name } = this.props;
        const startTime = new Date().valueOf();
        $.ajax({
            url: `${name}.js?ver=${window.LIB_Version}`,
            dataType: "script",
            cache: true
        }).done((data, data2) => {
            //成功添加样式
            this.setState({ load: true });
            $("body>.spinner").remove();
        });
    }

    render() {
        const { comp, intent, last, name, index } = this.props;
        const HtmlComp = comp ? comp : Loading;
        return (
            <div className={"html"} style={{ display: last ? "block" : "none" }}>
                <div
                    className="code"
                    ref={ref => {
                        this.code = ref;
                    }}
                />
                <HtmlComp index={index} intent={intent} name={name} />
            </div>
        );
    }
}

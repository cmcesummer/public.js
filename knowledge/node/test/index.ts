import express, { Router } from "express";

const CheckMiddleWare = require("../../middleWare/CheckMiddleWare");
const LoggerMiddleWare = require("../../middleWare/LoggerMiddleWare");
const RouteMiddleWare = require("../../middleWare/RouteMiddleWare");

interface Routers extends Router {
    [method: string]: any;
}

interface CompMapInterface {
    // -- 这里 Function 可换成别的吗
    [key: string]: Function;
}

class Controller {
    private _methodArray_: string[];

    private path: string;

    // 没有这个会报错
    [method: string]: Function | string | string[];

    /**
     * 把所有中间件挂载到该类的静态方法上， 方便调用
     */
    static middleWare() {
        return { ...CheckMiddleWare, ...LoggerMiddleWare, ...RouteMiddleWare };
    }

    /**
     * Controller 转换成 路由
     * @param {Object} CompMap
     */
    static transform(CompMap: CompMapInterface) {
        const router = express.Router();
        const keys = Object.keys(CompMap);
        for (let key of keys) {
            // 没有这个 <any> 还不太理解
            new (<any>CompMap)[key]()._init_(router, key);
        }
        return router;
    }

    constructor(path: string) {
        /**
         * 常用 method , 后期如果用到别的再拓展
         */
        this._methodArray_ = ["get", "post", "put", "delete", "patch", "options", "head"];

        /**
         * 如果传 path 实例化后的路由路径为 path, 否则为该类的类名
         */
        this.path = path;
    }

    /**
     * 中间件
     */
    middleWare(_?: string): any[] {
        return [];
    }

    /**
     * 拓展 method list 方法
     * @param {Array | String}
     */
    _addMethodArray_() {
        this._methodArray_ = [...new Set(this._methodArray_.concat(...arguments))];
    }

    /**
     * 路由初始化
     */
    _init_(router: Routers): Routers {
        const FIRST_AZ = /^[A-Z]/;
        const pathName = this.path;
        const routeName = pathName ? pathName : `/${this.constructor.name.replace(FIRST_AZ, v => v.toLowerCase())}`;
        const middleWare = this.middleWare;

        for (let method of this._methodArray_) {
            // 这里用了ts后感觉 定义方法不那么自由了
            this[method] && router[method](routeName, middleWare(method), this[method]);
        }

        return router;
    }
}

export default Controller;

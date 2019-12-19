const fs = require("fs");
const path = require("path");
// babylon 已经被 @babel/parser 取代，用来生成AST
const babelParser = require("@babel/parser");
// 遍历AST
const traverse = require("@babel/traverse").default;
// 用来判断类型或生成指定节点类型
const t = require("@babel/types");
// 将AST生成代码
const generator = require("@babel/generator").default;

const render = require("./main");

module.exports = class Compiler {
    constructor(config) {
        // 初始化配置
        this.config = config;
        // 入口文件名称
        this.entryId = null;
        // 模块依赖对象
        this.modules = {};
        // 形成最后打包文件传入立即执行函数中的参数
        this.assets = {};
        // 获取配置文件中的entry
        this.entry = config.entry;
        // 当前的工作目录
        this.root = process.cwd();
    }

    run() {
        // 构建模块的依赖关系并生成代码
        this.buildModule(path.resolve(this.root, this.entry), true);
        // 将构建好的代码生成放入指定的输入目录中
        this.emitFile();
    }

    /*
     ** @param modulePath {string} 传入的模块路径名称
     ** @param isEntry {boolean} 当前路径是否是入口文件
     */
    buildModule(modulePath, isEntry) {
        // 获取模块的内容，也就是代码
        const source = this.getSource(modulePath);
        // 获取模块的相对路径
        const moduleName = `./ ${path.relative(this.root, modulePath)}`;
        if (isEntry) {
            this.entryId = moduleName;
        }
        // 需要利用模块的内容以及模块的路径进行ast解析生成我们想要的源码以及模块的依赖
        const { sourceCode, dependencies } = this.parse(source, path.dirname(moduleName));
        this.modules[moduleName] = sourceCode;
        // 如果模块中有依赖的话，则递归遍历模块
        dependencies.forEach(dep => {
            this.buildModule(path.join(this.root, dep), false);
        });
    }

    parse(source, parentPath) {
        // 生成AST
        let ast = babelParser.parse(source);
        // 记录依赖数组
        let dependencies = [];
        // 遍历AST
        traverse(ast, {
            // 函数调用节点
            CallExpression(p) {
                const node = p.node;
                // 找到调用的方法名 require
                if (node.callee.name === "require") {
                    // 修改我们指定的变量名
                    node.callee.name = "__webpack_require__";
                    // 获取 require 方法的参数
                    let moduleName = node.arguments[0].value;
                    // 利用路径拼成我们需要的形式，形如 ./src/index.js
                    moduleName = moduleName + (path.extname(moduleName) ? "" : ".js");
                    moduleName = `./${path.join(parentPath, moduleName)}`;
                    // 将require的模块加入依赖数组中
                    dependencies.push(moduleName);
                    // 根据我们生成的新的moduleName，将AST中的argments修改为moduleName
                    // t.stringLiteral 生成字符串节点
                    node.arguments = [t.stringLiteral(moduleName)];
                }
            }
        });
        // 生成源码
        const sourceCode = generator(ast).code;
        return { sourceCode, dependencies };
    }

    emitFile() {
        // 根据配置文件获取我们的打包文件的路径
        const main = path.join(this.config.output.path, this.config.output.filename);
        // 渲染之后返回我们的 bundle 文件的源码
        const code = render({ entryId: this.entryId, modules: this.modules });
        // 当打包多个文件时，把文件存入assets中
        this.assets[main] = code;
        // 将源码写入文件中
        fs.writeFileSync(main, code);
    }

    getSource(filepath) {
        let code = fs.readFileSync(filepath, "utf8");
        const rules = this.config.module.rules;
        rules.forEach(rule => {
            const { test, use } = rule;
            if (test.test(filepath)) {
                while (use.length) {
                    const loader = require(use.pop());
                    code = loader(code);
                }
            }
        });
        return code;
    }
};

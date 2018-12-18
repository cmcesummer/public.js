import babel from "rollup-plugin-babel";
import uglify from "rollup-plugin-uglify";
import json from "rollup-plugin-json";

const path = require("path");

const ROOT_PATH = path.resolve(__dirname);

const PRODUCTION_PATH = path.resolve(__dirname, "./dist/");

export default {
    input: path.resolve(ROOT_PATH, "./src/index.js"),
    output: {
        file: path.resolve(PRODUCTION_PATH, "./loading_page.js"),
        format: "umd",
        name: "loading_page"
    },
    plugins: [
        json(),
        babel({
            exclude: "node_modules/**",
            runtimeHelpers: true
        }),
        uglify()
    ],
    watch: {
        include: ROOT_PATH + "/**"
    }
};

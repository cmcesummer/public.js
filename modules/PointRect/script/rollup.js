const babel = require("rollup-plugin-babel");
const filesize = require("rollup-plugin-filesize");
const cleanup = require("rollup-plugin-cleanup");
const path = require("path");

const license = require("rollup-plugin-license");
//const importAlias = require('rollup-plugin-import-alias');
module.exports = {
    input: path.join(__dirname, "./../index.js"),
    output: {
        strict: false,
        format: "umd",
        exports: "default",
        file: "./pointRect.js",
        name: "pointRect"
    },
    plugins: [
        babel(),

        license({
            banner: `by cmce Copyright ${JSON.stringify(new Date()).replace(/T.*|"/g, "")}`
        }),
        cleanup(),

        filesize()
    ]
};

const path = require("path");

const config = {
    entry: path.join(__dirname, "./demo/index.js"),
    output: {
        path: path.join(__dirname, "./demo"),
        filename: "dist.js"
    },
    module: {
        rules: [
            {
                test: ""
            }
        ]
    }
};

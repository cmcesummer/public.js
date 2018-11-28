var webpack = require("webpack");
const glob = require("glob");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

const extractSass = new ExtractTextPlugin({
    filename: "[name].css",
    disable: false //process.env.NODE_ENV === "development"
});

const findEntries = function(entry, path) {
    if (!path) path = "./src/page/**/*/index.js";
    var files = glob.sync(path);
    const newEntries = files.reduce(function(memo, file) {
        var name = /.*\/(.*?)\/index\.js/.exec(file)[1];
        memo[name] = file;
        return memo;
    }, {});
    return Object.assign({}, entry, newEntries);
};

module.exports = {
    //公共模块
    entry: findEntries({
        vendor: ["jquery", "babel-polyfill", "react", "react-dom", "./src/lib/core/index.js"]
    }),
    output: {
        path: __dirname + "/dist/",
        filename: "[name].js"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test: /\.scss$/,
                use: extractSass.extract({
                    use: [
                        {
                            loader: "css-loader",
                            options: {
                                minimize: true //css压缩
                            }
                        },
                        {
                            loader: "postcss-loader"
                        },
                        {
                            loader: "sass-loader"
                        }
                    ]
                })
            },
            {
                test: /\.(png|jpg|gif)$/,
                loader: "url-loader?limit=1024&name=images/[hash:5].[name].[ext]"
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify("production")
            }
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: "vendor",
            filename: "jreact.js"
        }),
        extractSass,
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            mangle: {
                // 跳过这些
                except: ["export default"]
            }
        }),
        new HtmlWebpackPlugin({
            title: "",
            // 文件名以及文件将要存放的位置
            filename: "index.html",
            // html模板的路径
            template: "./src/html/index.html",
            // js插入的位置，true/'head'  false/'body'
            inject: false,
            hash: true,
            chunks: ["vendor"]
        }),
        new webpack.HashedModuleIdsPlugin()
        // new BundleAnalyzerPlugin()
    ]
};

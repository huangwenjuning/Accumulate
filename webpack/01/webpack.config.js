const path = require('path');
const htmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
    // 执行构建的入口文件
    entry: './src/index.js',
    // 多页应用入口
    // entry: {
    //     index: './src/index.js',
    //     list: './src/list.js',
    //     about: './src/about.js'
    // },
    output: {
        path: path.resolve(__dirname, "./dist"),
        // filename: 'index.js', // 可指定导出文件命名
        filename: "[name].js", // 可自动根据name生成导出文件名，多个时会与配置的属性一一对应
    },
    module: {
        rules: [
            {
                // 正则表达式，标识应该被处理的文件
                test: /\.css$/,
                // 使用什么 loader 去处理匹配到的文件
                use: ['style-loader', 'css-loader'],
            }
        ]
    },
    plugins: [
        new htmlWebpackPlugin({
            template: "./src/index.html",
            filename: "index.html",
        }),
    ],
    mode: "development"
}
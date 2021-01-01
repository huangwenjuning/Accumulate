const path = require('path');
const htmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, "./dist"),
        filename: "[name].js",
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['w-style-loader', 'w-css-loader'],
            },
            {
                test: /\.(png|jpe?g|gif)$/,
                use: [
                  {
                    loader: "file-loader",
                    options: {
                      name: "[name].[ext]",
                      outputPath: "images/",
                    },
                  },
                ],
              },
        ]
    },
    plugins: [
        new htmlWebpackPlugin({
            template: "./src/index.html",
            filename: "index.html",
        }),
    ],
    resolveLoader: {
        modules: ['./node_modules/', './wLoaders/'],
    },
    mode: "development"
}
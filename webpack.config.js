const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const CleanWebpackPlugin = require('clean-webpack-plugin');

const port = 5000;

const devServer = {
    port,
    contentBase: path.join(__dirname, '../', 'dist'),
    compress: true,
    host: 'localhost',
    hot: true,
};

module.exports = {
    mode: 'development',
    entry: [
        `webpack-dev-server/client?http://localhost:${port}/`,
        'webpack/hot/only-dev-server',
        path.resolve(__dirname, 'src/main.ts'),
    ],
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    devtool: 'inline-source-map',
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
    },
    plugins: [
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        // new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
             title: 'Development',
             template: 'index.html'
        }),
    ],
    module: {
        rules: [
            {
                test: /\.ts$/,
                enforce: 'pre',
                loader: 'tslint-loader',
                options: { /* Loader options go here */ },
            },
            {
                test: /\.tsx?$/,
                loader: 'awesome-typescript-loader',
            },
        ],
    },
    devServer,
    watch: true
};

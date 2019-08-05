const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin');
// const CleanWebpackPlugin = require('clean-webpack-plugin');

const port = 5000;

const devServer = {
    port,
    contentBase: path.join(__dirname, '../', 'dist'),
    compress: true,
    host: 'localhost',
    hot: true,
};

// Webpack config
var publicUrl = path.resolve(__dirname, 'dist');
module.exports = {
    mode: 'development',
    entry: [
        `webpack-dev-server/client?http://localhost:${port}/`,
        'webpack/hot/only-dev-server',
        path.resolve(__dirname, 'index.tsx'),
    ],
    output: {
        filename: 'bundle.js',
        path: publicUrl,
    },
    devtool: 'inline-source-map',
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
    },
    plugins: [
        new webpack.EnvironmentPlugin({
            NODE_ENV: 'development', // use 'development' unless process.env.NODE_ENV is defined
            DEBUG: true
        }),
        // new webpack.DefinePlugin({
        //     'process.env.NODE_ENV': 'development',
        //     'process.env.BABEL_ENV': 'development'
        // }),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        // new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            inject: true,
            title: 'Development',
            template: 'index.html'
        }),
        new InterpolateHtmlPlugin(HtmlWebpackPlugin, {
            PUBLIC_URL: publicUrl,
            // You can pass any key-value pairs, this was just an example.
            // WHATEVER: 42 will replace %WHATEVER% with 42 in index.html.
        }),
    ],
    module: {
        rules: [{
                test: /\.ts$/,
                enforce: 'pre',
                loader: 'tslint-loader',
                options: {
                    /* Loader options go here */
                },
            },
            {
                test: /\.m?[jt]sx?$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader'
                }
            }
        ],
    },
    devServer,
    watch: true
};
const webpack = require('webpack');
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    entry: {
        primeSpiral: path.resolve(__dirname, 'src', 'primeSpiral.js'),
        ulamSpiral: path.resolve(__dirname, 'src', 'ulamSpiral.js')
    },
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'),
        port: 8080,
        open: true,
        openPage: '',
        stats: 'errors-only'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle_[name].[chunkhash].js'
    },
    resolve: {
        extensions: [
            '.js'
        ]
    },
    module: {
        rules: [
            {
                test: /\.js/,
                exclude: /(node_modules|bower_components)/,
                use: [{
                    loader: 'babel-loader'
                }]
            },
            {
                test: /\.(scss)$/,
                use: [
                    {
                        // Adds CSS to the DOM by injecting a <style> tag
                        loader: 'style-loader'
                    },
                    {
                        // Interprets @import and url() like import/require() and will resolve them
                        loader: 'css-loader'
                    },
                    {
                        // Loader for webpack to process CSS with PostCSS
                        loader: 'postcss-loader',
                        options: {
                            plugins: function() {
                                return [
                                    require('autoprefixer')
                                ];
                            }
                        }
                    },
                    {
                        // Loads a SASS/SCSS file and compiles it to CSS
                        loader: 'sass-loader'
                    }
                ]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            hash: true,
            template: path.resolve(__dirname, 'src', '_template.html'),
            inject: 'body',
            title: 'Prime Spiral',
            chunks: ['primeSpiral'],
            filename: path.resolve(__dirname, 'dist', 'primeSpiral.html')
        }),
        new HtmlWebpackPlugin({
            hash: true,
            template: path.resolve(__dirname, 'src', '_template.html'),
            inject: 'body',
            title: 'Ulam Spiral',
            chunks: ['ulamSpiral'],
            filename: path.resolve(__dirname, 'dist', 'ulamSpiral.html')
        }),
        new CopyWebpackPlugin([
            {
                from: path.resolve(__dirname, 'assets'),
                to: path.resolve(__dirname, 'dist', 'assets'),
            }
        ])
    ],
    devtool: 'source-map'
};

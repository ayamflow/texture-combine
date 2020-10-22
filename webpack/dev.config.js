const webpack = require('webpack')
const merge = require('webpack-merge')
const common = require('./common.config.js')
const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = function(options = {}) {
    return merge(common(options), {
        mode: 'development',
        devtool: 'cheap-module-eval-source-map',
        devServer: {
            hot: true,
            open: false,
            overlay: true,
            stats: {
                chunks: false,
                errors: false,
                errorDetails: false,
                hash: false,
                version: false,
                timings: false,
                // assets: false,
                modules: false,
                reasons: false,
                children: false,
                source: false,
                publicPath: false,
            },
            contentBase: 'static',
            publicPath: '/',
            historyApiFallback: true,
            clientLogLevel: 'error',
        },
        plugins: [new webpack.HotModuleReplacementPlugin()],
        module: {
            rules: [
                {
                    test: /\.css$/,
                    use: [
                        'css-hot-loader',
                        MiniCssExtractPlugin.loader,
                        {
                            loader: 'css-loader',
                            options: {sourceMap: true, modules: false},
                        },
                    ],
                },
            ],
        },
        optimization: {
            usedExports: true,
        },
    })
}
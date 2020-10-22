const webpack = require('webpack')
const merge = require('webpack-merge')
const common = require('./common.config.js')
const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')

module.exports = function (options = {}) {
    return merge(common(options), {
        mode: 'production',
        devtool: 'source-map',
        output: {
            filename: 'main.js',
        },
        module: {
            rules: [
                {
                    test: /\.css$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        {
                            loader: 'css-loader',
                            options: {sourceMap: true, modules: false},
                        },
                    ],
                },
            ],
        },
        plugins: [
            new BundleAnalyzerPlugin.BundleAnalyzerPlugin()
        ]
    })
}

/*
module.exports = [
    merge(common({dev: false}), {
        mode: 'production',
        devtool: 'source-map',
        output: {
            filename: 'main.js',
        },
        module: {
            rules: [
                {
                    test: /\.m?js$/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                [
                                    '@babel/preset-env',
                                    {
                                        modules: false,
                                        useBuiltIns: 'usage',
                                        targets: {
                                            browsers: [
                                                'Chrome >= 60',
                                                'Safari >= 10.1',
                                                'iOS >= 10.3',
                                                'Firefox >= 54',
                                                'Edge >= 15',
                                            ],
                                        },
                                    },
                                ],
                            ],
                        },
                    },
                },
                {
                    test: /\.css$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        {
                            loader: 'css-loader',
                            options: { sourceMap: false, modules: false }
                        },
                    ],
                },
            ],
        },
    }),
    // merge(common({dev: false}), {
    //     mode: 'production',
    //     devtool: 'source-map',
    //     output: {
    //         filename: 'main.es5.js',
    //     },
    //     module: {
    //         rules: [
    //             {
    //               test: /\.m?js$/,
    //               use: {
    //                 loader: 'babel-loader',
    //                 options: {
    //                     presets: [
    //                         [
    //                             '@babel/preset-env', {
    //                                 modules: false,
    //                                 useBuiltIns: 'usage',
    //                                 targets: {
    //                                     browsers: [
    //                                         '> 1%',
    //                                         'last 2 versions',
    //                                         'Firefox ESR',
    //                                     ]
    //                                 }
    //                             }]
    //                         ]
    //                     }
    //                 }
    //             },
    //             {
    //                 test: /\.css$/,
    //                 use: [
    //                     MiniCssExtractPlugin.loader, {
    //                     loader: 'css-loader',
    //                     options: {
    //                         sourceMap: false,
    //                     },
    //                 }],
    //             }
    //         ],
    //     },
    // })
]
*/

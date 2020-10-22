const webpack = require('webpack')
const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const project = require('../project.json')
const destination = path.resolve(__dirname, '../static')

module.exports = function(options = {}) {
    let env = options.env || (options.development ? 'dev' : 'prod')
    let ENV = require(path.resolve(__dirname, '../env.config.js'))[env]
    ENV.env = env

    return {
        entry: './src/index.js',
        output: {
            filename: 'main.js',
            publicPath: ENV.baseURL,
            path: destination,
        },
        plugins: [
            new CleanWebpackPlugin(['static'], {
                root: path.join(destination, '../'),
            }),
            new webpack.DefinePlugin({
                ENV: JSON.stringify(ENV)
            }),
            new MiniCssExtractPlugin({
                filename: 'styles.css',
            }),
            new HtmlWebpackPlugin(
                Object.assign(
                    {
                        hash: true,
                        template: path.resolve(__dirname, '../src/index.html'),
                        filename: destination + '/index.html',
                    },
                    project.meta
                )
            ),
            new CopyPlugin([
                {
                    from: path.resolve(__dirname, '../assets/**/*'),
                    to: destination,
                    ignore: ['*.woff', '*.woff2'],
                },
            ])
        ],
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules\/(?!(lit-html|lit-element)\/).*/,
                    use: [
                        {loader: 'babel-loader'},
                        {
                            loader: 'linaria/loader',
                            options: {sourceMap: options.dev},
                        },
                    ],
                },
                {
                    test: /\.(html)$/,
                    exclude: /src\/index\.html/,
                    use: {loader: 'html-loader'},
                },
                {
                    test: /\.(woff|woff2|mp4|jpeg|jpg|png|gif)$/,
                    use: {
                        loader: 'file-loader',
                        options: {
                            emitFile: true,
                            outputPath: './',
                        },
                    },
                },
                {
                    test: /\.js$/,
                    exclude: /(node_modules)/,
                    enforce: 'post',
                    use: {
                        loader: 'ify-loader',
                    },
                },
                {
                    test: /\.(glsl|frag|vert)$/,
                    exclude: /(node_modules)/,
                    use: {
                        loader: 'raw-loader',
                    },
                },
            ],
        },
        resolve: {
            alias: {
                sections: path.resolve(__dirname, '../src/sections/'),
                components: path.resolve(__dirname, '../src/components/'),
                lib: path.resolve(__dirname, '../src/lib/'),
                style: path.resolve(__dirname, '../src/style/'),
                assets: path.resolve(__dirname, '../assets/'),
                'gl-tools': path.resolve(
                    __dirname,
                    '../src/components/gl-tools/'
                ),
            },
        },
    }
}

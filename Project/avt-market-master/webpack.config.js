const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const webpack = require('webpack');
const dotenv = require('dotenv').config();

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

module.exports = {
    entry: path.resolve(__dirname, './src/index.tsx'),
    mode: isDev ? 'development' : 'production',
    output: {
        filename: '[name].[contenthash].js',
        path: path.resolve(__dirname, './dist'),
        publicPath: '/',
        clean: true,
    },
    plugins: addPlugins(),
    optimization: optimization(),
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
    },
    devServer: {
        port: 8080,
        hot: true,
        open: true,
        historyApiFallback: true,
        client: {
            overlay: true,
        },
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            modules: {
                                auto: /\.module\.css$/,
                                localIdentName: '[name]__[local]___[hash:base64:5]',
                            },
                        },
                    },
                    'postcss-loader',
                ],
            },
            {
                test: /\.s[ac]ss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            modules: {
                                auto: /\.module\.s[ac]ss$/,
                                localIdentName: '[name]__[local]--[hash:base64:5]',
                            },
                        },
                    },
                    'postcss-loader',
                    'sass-loader',
                ],
            },
            {
                test: /\.(png|jpg|jpeg|svg|avif|webp|ico)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.(mp3|wav|ogg)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.(ttf|woff|woff2)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.(ts|tsx)$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
};

function optimization() {
    const config = {
        splitChunks: {
            chunks: 'all',
        },
    };

    if (isProd) {
        config.minimizer = [new TerserWebpackPlugin(), new CssMinimizerWebpackPlugin()];
    }

    return config;
}

function addPlugins() {
    const plugins = [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './src/index.html'),
            filename: 'index.html',
        }),
        new FaviconsWebpackPlugin({
            logo: './favicon.ico',
            mode: 'light',
            cache: true,
            inject: true,
            favicons: {
                background: 'transparent',
                icons: {
                    android: true,
                    appleIcon: true,
                    favicons: true,
                    windows: false,
                    yandex: false,
                    firefox: false,
                    coast: false,
                    appleStartup: false,
                },
            },
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({ filename: '[name].[contenthash].css' }),
        new webpack.DefinePlugin(
            Object.keys(process.env).reduce((prev, next) => {
                prev[`process.env.${next}`] = JSON.stringify(process.env[next]);
                return prev;
            }, {}),
        ),
    ];

    if (isDev) {
        plugins.push(new ESLintPlugin({ extensions: ['.ts', '.tsx'] }));
    }

    return plugins;
}

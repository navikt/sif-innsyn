const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

const webpackConfig = {
    entry: {
        bundle: ['babel-polyfill', `${__dirname}/../../app/App.tsx`],
    },
    output: {
        path: path.resolve(__dirname, './../../../dist'),
        filename: 'js/[name].js',
        publicPath: `/familie/sykdom-i-familien/soknad/innsyn/dist`,
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json', '.jsx'],
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                include: [path.resolve(__dirname, './../../app'), path.resolve(__dirname, './../../common')],
                use: [
                    {
                        loader: 'ts-loader',
                        options: {
                            experimentalFileCaching: false,
                        },
                    },
                ],
            },
            {
                test: /\.less$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: 'less-loader',
                        options: {
                            lessOptions: {
                                math: 'always',
                            },
                        },
                    },
                ],
            },
        ],
    },
    plugins: [
        new CaseSensitivePathsPlugin(),
        new MiniCssExtractPlugin({
            filename: 'css/[name].css?[fullhash]-[chunkhash]-[name]',
            linkType: 'text/css',
        }),
        new ESLintPlugin({
            extensions: ['ts', 'tsx'],
            failOnWarning: false,
        }),
    ],
};

module.exports = webpackConfig;

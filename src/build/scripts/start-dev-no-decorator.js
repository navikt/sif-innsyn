const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const webpackConfig = require('../webpack/webpack.config.dev');
const configureDevServer = require('../webpack/devserver.config');

require('dotenv').config();

const compiler = webpack(webpackConfig);
const server = new WebpackDevServer(compiler, configureDevServer({}));

const PORT = process.env.PORT;
const HOST_NAME = process.env.HOST_NAME;
server.listen(PORT, HOST_NAME, () => console.log(`Started server on http://localhost:${PORT}`));

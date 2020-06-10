const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const webpackConfig = require('../webpack/webpack.config.dev');
const configureDevServer = require('../webpack/devserver.config');
const getDecorator = require('./decorator');
const path = require('path');
const createEnvSettingsFile = require('./envSettings');

require('dotenv').config();

createEnvSettingsFile(path.resolve(`${__dirname}/../../../dist/js/settings.js`));

getDecorator().then((decoratorData) => {
    const compiler = webpack(webpackConfig);
    const server = new WebpackDevServer(compiler, configureDevServer(decoratorData));

    const PORT = process.env.PORT;
    const HOST_NAME = process.env.HOST_NAME;
    server.listen(PORT, HOST_NAME, (HOST_NAME) => console.log(`Started server on http://localhost:${PORT}`));
});

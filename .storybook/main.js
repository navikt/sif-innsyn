module.exports = {
    stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
    addons: [
        '@storybook/addon-links',
        '@storybook/addon-essentials',
        {
            name: '@storybook/preset-create-react-app',
            options: {
                craOverrides: {
                    fileLoaderExcludes: ['less'],
                },
            },
        },
    ],
    webpackFinal: async (config) => {
        config.module.rules.push({
            test: /\.(less)$/,
            use: [
                { loader: require.resolve('style-loader') },
                { loader: require.resolve('css-loader') },
                { loader: require.resolve('less-loader') },
            ],
        });
        config.resolve.extensions.push('.less');
        return config;
    },
};

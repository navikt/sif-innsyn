module.exports = {
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
    },
    setupFilesAfterEnv: ['./jest/setup.ts'],
    testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$',
    moduleNameMapper: {
        '\\.(css|jpg|png|svg|less)$': '<rootDir>/node_modules/jest-css-modules',
        'nav-(.*)-style': '<rootDir>/node_modules/jest-css-modules',
        '^app/(.*)': '<rootDir>/src/app/$1',
        '^common/(.*)': '<rootDir>/node_modules/@navikt/sif-common-core/lib/$1',
    },
    testEnvironment: 'jsdom',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    transformIgnorePatterns: ['node_modules/(?!(nav-frontend-spinner-style)/)'],
    globals: {
        'ts-jest': {
            tsconfig: './tsconfig.json',
            babelConfig: {
                plugins: ['@babel/plugin-proposal-object-rest-spread'],
                presets: ['@babel/preset-env', '@babel/preset-react'],
                env: {
                    test: {
                        plugins: ['@babel/plugin-transform-modules-commonjs'],
                    },
                },
            },
        },
    },
    modulePathIgnorePatterns: ['cypress'],
    rootDir: '../',
    testPathIgnorePatterns: ['node_modules', 'fixLater'],
};

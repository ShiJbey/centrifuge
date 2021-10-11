const rules = require('./webpack.rules');
const plugins = [...require('./webpack.plugins')];

const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
    entry: './src/index.ts',
    module: {
        rules,
    },
    plugins: plugins,
    resolve: {
        extensions: ['.js', '.ts', '.jsx', '.tsx', '.json'],
        plugins: [new TsconfigPathsPlugin({ configFile: './tsconfig.json' })],
    },
};

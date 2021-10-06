const WebWorkerPlugin = require('worker-plugin');
const rules = require('./webpack.rules');
const plugins = [...require('./webpack.plugins')];

const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

plugins.push(new WebWorkerPlugin());

const rendererRules = [
    {
        test: /\.module\.scss$/i,
        use: [
            { loader: 'style-loader' },
            {
                loader: 'css-loader',
                options: { modules: true },
            },
            { loader: 'sass-loader' },
        ],
    },
    {
        test: /\.s[ac]ss$/i,
        exclude: /\.module\.scss$/i,
        use: ['style-loader', 'css-loader', 'sass-loader'],
    },
    {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
    },
    // {
    //   test: /\.worker\.ts$/,
    //   use: [
    //     {
    //       loader: "worker-loader",
    //       options: {
    //         esModule: true,
    //       }
    //     },
    //   ],
    // },
    ...rules,
];

module.exports = {
    module: {
        rules: rendererRules,
    },
    plugins: plugins,
    resolve: {
        extensions: ['.js', '.ts', '.jsx', '.tsx', '.css', '.scss', '.sass'],
        plugins: [new TsconfigPathsPlugin({ configFile: './tsconfig.json' })],
    },
};

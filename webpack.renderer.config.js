const WebWorkerPlugin = require("worker-plugin");
const rules = require("./webpack.rules");
const plugins = require("./webpack.plugins");

plugins.push(new WebWorkerPlugin());

const rendererRules = [
  {
    test: /\.module.scss/,
    use: [
      {
        loader: "style-loader",
      },
      {
        loader: "css-loader",
        options: { modules: { localIdentName: "[local]_[hash:base64:5]" } },
      },
      {
        loader: "sass-loader",
      },
    ],
  },
  {
    test: /\.css$/,
    use: [
      {
        loader: "style-loader",
      },
      {
        loader: "css-loader",
      }
    ],
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
  //     {
  //       loader: "babel-loader",
  //       options: {
  //         presets: ["@babel/preset-env"],
  //       },
  //     },
  //   ],
  // },
  ...rules
]


module.exports = {
  module: {
    rules: rendererRules,
  },
  plugins: plugins,
  resolve: {
    extensions: [".js", ".ts", ".jsx", ".tsx", ".css", ".scss", ".sass"],
  },
};

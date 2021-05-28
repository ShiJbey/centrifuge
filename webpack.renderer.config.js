const WebWorkerPlugin = require("worker-plugin");
const rules = require("./webpack.rules");
const plugins = require("./webpack.plugins");

plugins.push(new WebWorkerPlugin());

rules.push({
  test: /\.css$/,
  use: [
    {
      loader: "style-loader",
    },
    {
      loader: "css-loader",
    }
  ],
});

rules.push({
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
});

module.exports = {
  module: {
    rules,
  },
  plugins: plugins,
  resolve: {
    extensions: [".js", ".ts", ".jsx", ".tsx", ".css", ".scss", ".sass"],
  },
};

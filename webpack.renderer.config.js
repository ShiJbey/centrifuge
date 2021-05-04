const rules = require('./webpack.rules');
const plugins = require('./webpack.plugins');

rules.push({
  test: /\.css/,
  use: [
    {
      loader: "style-loader"
    },
    {
      loader: "css-loader",
      options: { modules: true }
    },
  ],
});

rules.push({
  test: /\.scss/,
  use: [
    {
      loader: "style-loader"
    },
    {
      loader: "css-loader",
      options: { modules: true }
    },
    {
      loader: "sass-loader"
    },
  ],
});

module.exports = {
  module: {
    rules,
  },
  plugins: plugins,
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css', '.scss', '.sass']
  },
};

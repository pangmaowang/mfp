const { merge } = require("webpack-merge");

const moduleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const common = require("./webpack.common.js");
const packageJson = require("../package.json");

const devConfig = {
  mode: "development",
  devServer: {
    port: 8080,
    historyApiFallback: {
      index: "index.html",
    },
  },
  plugins: [
    new moduleFederationPlugin({
      name: "container",
      remotes: {
        marketing: "marketing@http://localhost:8081/remoteEntry.js",
      },
      shared: packageJson.dependencies,
    })
  ],
};

module.exports = merge(common, devConfig);

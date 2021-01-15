let path = require("path");
let HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

module.exports = {
  context: __dirname,
  mode: "development",
  entry: "./index.js",
  output: {
    path: path.resolve(__dirname, './dist'),
  },
  devServer: {
    port: 8000,
    publicPath: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-react"],
          },
        },
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html",
    }),
    new ModuleFederationPlugin({
      name: "host",
      filename: "remoteEntry.js",
      remotes: {
        remote: 'remote@http://localhost:3000/remoteEntry.js'
      },
      // shares: ['react', 'react-dom']
      shares: {
        react: {
          singleton: true
        },
        "react-dom": { singleton: true }
      },
    })
  ],
};

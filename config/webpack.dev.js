const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ESLintWebpackPlugin = require("eslint-webpack-plugin");

module.exports = {
  // 相对路径
  entry: "./src/main.js",
  // 绝对路径
  output: {
    filename: "static/js/main.js",
  },
  module: {
    rules: [
      // loader配置
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.(png|jpe?g|gif|webp|svf)$/,
        type: "asset",
        parser: {
          dataUrlCondition: {
            maxSize: 100 * 1024,
          },
        },
        generator: {
          filename: "static/images/[name].[hash:6][ext]",
        },
      },
      {
        test: /\.js$/,
        exclude: /modules/,
        use: ["babel-loader"],
      },
      {
        test: /\.html$/,
        loader: "html-loader",
      },
    ],
  },
  plugins: [
    // 插件配置
    new MiniCssExtractPlugin({
      filename: "static/css/index.css",
    }),
    // 插件配置
    new HtmlWebpackPlugin({
      filename: "static/index.html",
      template: path.resolve(__dirname, "../public/index.html"),
    }),
    new ESLintWebpackPlugin({
      context: path.resolve(__dirname, "../src"),
    }),
  ],
  devServer: {
    // html-webpack-plugin修改了filename时候 这里需要同时配置
    static: {
      directory: path.join(__dirname, "../dist"),
    },
    host: "localhost",
    port: "3000",
    open: ["static"],
    hot: true,
  },
  devtool: "cheap-module-source-map",
  mode: "development",
};

const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ESLintWebpackPlugin = require("eslint-webpack-plugin");

module.exports = {
  // 相对路径
  entry: "./src/main.js",
  // 绝对路径
  output: {
    path: path.resolve(__dirname, "../dist"),
    filename: "static/js/main.js",
    clean: true,
  },
  module: {
    rules: [
      // loader配置
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.less$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "less-loader"],
      },
      {
        test: /\.s[ac]ss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
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
      // {
      //   test: /\.html$/,
      //   use: ["html-loader"],
      // },
      {
        test: /\.js$/,
        exclude: /modules/,
        use: ["babel-loader"],
      },
    ],
  },
  plugins: [
    // 插件配置
    new MiniCssExtractPlugin({
      filename: "static/css/index.css",
    }),
    new HtmlWebpackPlugin({
      filename: "static/index.html",
      template: path.resolve(__dirname, "../public/index.html"),
    }),
    new ESLintWebpackPlugin({
      context: path.resolve(__dirname, "../src"),
    }),
  ],
  devtool: "source-map",
  mode: "production",
};

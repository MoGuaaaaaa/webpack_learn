const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ESLintWebpackPlugin = require("eslint-webpack-plugin");

module.exports = {
  // ���·��
  entry: "./src/main.js",
  // ����·��
  output: {
    filename: "static/js/main.js",
  },
  module: {
    rules: [
      // loader����
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
    // �������
    new MiniCssExtractPlugin({
      filename: "static/css/index.css",
    }),
    // �������
    new HtmlWebpackPlugin({
      filename: "static/index.html",
      template: path.resolve(__dirname, "../public/index.html"),
    }),
    new ESLintWebpackPlugin({
      context: path.resolve(__dirname, "../src"),
    }),
  ],
  devServer: {
    // html-webpack-plugin�޸���filenameʱ�� ������Ҫͬʱ����
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

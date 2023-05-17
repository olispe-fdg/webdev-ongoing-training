const path = require("path");
const { globSync } = require("glob");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const allHtmlFiles = globSync("src/**/*.html");
const htmlPluginInstances = allHtmlFiles.map(
	(htmlFile) =>
		new HtmlWebpackPlugin({
			template: htmlFile,
			filename: path.basename(htmlFile),
		})
);

module.exports = {
	entry: "./src/index.js",
	output: {
		path: path.resolve(__dirname, "dist"),
	},
	module: {
		rules: [
			{
				test: /\.s[ac]ss$/i,
				use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
			},
			{
				test: /\.(png|svg|jpg|jpeg|gif)$/i,
				type: "asset/resource",
			},
			{
				test: /\.html$/i,
				use: "html-loader",
			},
		],
	},
	plugins: [
		...htmlPluginInstances,
		new MiniCssExtractPlugin({
			filename: "main.css",
		}),
	],
};

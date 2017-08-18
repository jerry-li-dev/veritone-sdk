// const path = require('path');
const webpack = require('webpack');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const MinifyPlugin = require('babili-webpack-plugin');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
	entry: ['babel-polyfill', './index.js'],
	output: {
		filename: process.env.BUILD_ENV === 'browser'
		 ? 'dist/bundle-browser.js'
		 : 'dist/bundle-node.js'
	},
	plugins: [
		new webpack.DefinePlugin({
			__BROWSER__: process.env.BUILD_ENV === 'browser'
		}),
		new CaseSensitivePathsPlugin(),
		new MinifyPlugin(),
		// new BundleAnalyzerPlugin()
	],
	module: {
		noParse: /\.min\.js$/,
		rules: [
			// JavaScript / ES6
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader'
				}
			}
		]
	}
};

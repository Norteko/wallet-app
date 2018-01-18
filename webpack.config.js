const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: {
			index: './source/client/index.js'
		},
		module: {
			rules: [
				{
					test: /\.js$/,
					exclude: /node_modules/,
					loader: 'babel-loader'
				},
				{
					test: /\.css$/,
					loader: ExtractTextPlugin.extract({
						fallback: 'style-loader',
						use: 'css-loader'
					})
				}
			]
		},
		output: {
			filename: '[name].js',
			path: path.resolve(__dirname, 'public')
		},
		plugins: [
			new ExtractTextPlugin('[name].css')
		],
    watch: true,
};

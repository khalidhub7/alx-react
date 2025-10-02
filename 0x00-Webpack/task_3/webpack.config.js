const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
	mode: 'development',
	entry: {
		header: {
			import: './modules/header/header.js',
			dependOn: 'shared',
		},
		body: {
			import: './modules/body/body.js',
			dependOn: 'shared',
		},
		footer: {
			import: './modules/footer/footer.js',
			dependOn: 'shared',
		},
		shared: ['jquery', 'lodash'],
	},
	output: {
		filename: '[name].bundle.js',
		chunkFilename: '[name].chunk.js',
		path: path.resolve(__dirname, 'public'),
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader'],
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env'],
					},
				},
			},
			{
				test: /\.jpg$/,
				use: [
					'file-loader',
					{
						loader: 'image-webpack-loader',
						options: {
							mozpeg: {
								progressive: true,
								quality: 75,
							},
						},
					},
				],
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './modules/template.html',
			filename: 'index.html',
			chunks: ['header','body','footer'],
		}),
		new CleanWebpackPlugin(),
	],
	optimization: {
		runtimeChunk: 'single',
	},
	devServer: {
		static: {
			directory: path.resolve(__dirname, 'public'),
		},
		port: 8564,
	},
	devtool: 'inline-source-map',
};

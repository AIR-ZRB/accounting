const [webpack, path] = [require("webpack"), require("path")];
const VueLoaderPlugin = require('vue-loader/lib/plugin');
module.exports = {
	mode: "development",
	entry: path.join(__dirname, "src/index.js"),
	output: {
		path: path.join(__dirname, "dist"),
		publicPath: "/",
		filename: "bundle.js"
	},
	plugins: [
		new VueLoaderPlugin()
	],
	module: {
		rules: [
			{ test: /\.vue$/, use: ["vue-loader"] },
			{ test: /\.scss$/, use: ["style-loader", "css-loader", "sass-loader"] },
			{ test: /\.css$/, use: ["style-loader", "css-loader"] },
			// {test:/\.(jpg | png | gif)$/,use:[
			{
				test: /\.(png|jpe?g|gif|svg)(\?.*)?$/, use: [
					{
						loader: "url-loader?limit=1000",
						options: {
							esModule: false,
							// outputPath: "/",
							publicPath: 'dist/',
						}
					}
				]
			},
			{
				test: /\.(woff|eot|ttf)\??.*$/,
				loader: "url-loader?name=fonts/[name].[md5:hash:hex:6].[ext]"
			}
		]
	}


}	
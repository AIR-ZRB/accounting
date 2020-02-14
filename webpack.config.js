const [webpack,path] = [require("webpack"),require("path")];
const VueLoaderPlugin = require('vue-loader/lib/plugin');
module.exports = {
	entry: path.join(__dirname,"src/index.js"),
	output: {
		path: path.join(__dirname,"dist"),
		publicPath: "/",
		filename: "bundle.js"
	},
	plugins:[
		new VueLoaderPlugin()
	],
	module: {
		rules:[
			{test:/\.vue$/,use:["vue-loader"]},
			{test:/\.scss$/,use:["style-loader","css-loader","sass-loader"]},
			// {test:/\.(jpg | png | gif)$/,use:[
			{test:/\.png$/,use:[
				{
					loader:"url-loader?limit=1024",
					options:{
						esModule: false,
						// outputPath: "/",
              			publicPath:'dist/',
					}
				}
			]}
		]
	}
	

}	
const [webpack,path] = [require("webpack"),require("path")];

module.exports = {
	entry: path.join(__dirname,"src/index.js"),
	output: {
		path: path.join(__dirname,"dist"),
		filename: "bundle.js"
	},
	

}	
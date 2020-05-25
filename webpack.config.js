const EsmWebpackPlugin = require("@purtuga/esm-webpack-plugin");
module.exports = {
    mode: "production",
    entry: "./index.js",
    output: {
      library: 'csbiginteger',
      libraryTarget: 'var',
      filename: './csbiginteger.js',
      auxiliaryComment: 'csBigInteger.js library'
    },
    //...
    plugins: [
        new EsmWebpackPlugin()
    ]
}
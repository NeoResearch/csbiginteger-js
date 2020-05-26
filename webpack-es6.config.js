const EsmWebpackPlugin = require("@purtuga/esm-webpack-plugin");
module.exports = {
  mode: "production",
  entry: "./index.js",
  output: {
    library: 'csbiginteger',
    libraryTarget: 'var',
    filename: './csbiginteger-es6.mjs',
    auxiliaryComment: 'csBigInteger.js library (es6 module format)'
  },
  plugins: [
    new EsmWebpackPlugin()
  ]
}
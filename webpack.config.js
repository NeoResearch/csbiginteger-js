module.exports = {
  mode: "production",
  entry: "./index.js",
  output: {
    library: 'csbiginteger',
    libraryTarget: 'umd',
    filename: './csbiginteger.js',
    auxiliaryComment: 'csBigInteger.js library'
  }
}
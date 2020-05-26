module.exports = {
    mode: "production",
    entry: "./index.js",
    output: {
      library: 'csbiginteger',
      libraryTarget: 'var',
      filename: './csbiginteger.mjs',
      auxiliaryComment: 'csBigInteger.js library'
    }
}
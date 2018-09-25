module.exports = {
  mode : 'production',
  entry : './index.js',
  output: {
    library: 'csbiginteger',
    libraryTarget: 'umd',
    filename: './bundle.js',
    auxiliaryComment: 'Test Comment'
  }
};

'use strict';

var _csBigInteger = require('./csBigInteger');

var _csBigInteger2 = _interopRequireDefault(_csBigInteger);

var _csFixed = require('./csFixed8');

var _csFixed2 = _interopRequireDefault(_csFixed);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// C# Big Integer implementation on javascript
// Igor M. Coelho, Copyleft 2018 - MIT License

(function (exports) {
  "use strict";

  //const csBigInteger = require('./csBigInteger').csBigInteger;
  //const csFixed8 = require('./csFixed8').csFixed8;

  exports.csBigInteger = _csBigInteger2.default;
  exports.csFixed8 = _csFixed2.default;
})(typeof exports !== 'undefined' ? exports : undefined);

//module.exports = csBigInteger;
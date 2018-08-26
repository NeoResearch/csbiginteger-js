// C# Big Integer implementation on javascript
// Igor M. Coelho, Copyleft 2018 - MIT License

(function(exports) {
"use strict";

var CONSTRUCT = {};

function csBigInteger(a, b) {
  return a + b;
}

csBigInteger._construct = function(n, s) {
	return new csBigInteger(n, s, CONSTRUCT);
};

csBigInteger.prototype.toString = function(base) {
  return "";
}

csBigInteger.prototype.valueOf = function() {
	return 3;
};

exports.csBigInteger = csBigInteger;
})(typeof exports !== 'undefined' ? exports : this);

//module.exports = csBigInteger;

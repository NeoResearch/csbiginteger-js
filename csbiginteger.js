(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

// C# Big Integer implementation on javascript
// Igor M. Coelho, Copyleft 2018 - MIT License
// This class sketch was heavily inspired by http://silentmatt.com/biginteger
// Although the objective is not to provide top performance (C# compatibility comes first),
// it's important to inherit a good design ;)

(function (exports) {
  "use strict";

  /*
  	Constructor: csBigInteger()
  	Convert a value to a <csBigInteger>.
  
  	Although <csBigInteger()> is the constructor for <csBigInteger> objects, it is
  	best not to call it as a constructor. If *n* is a <csBigInteger> object, it is
  	simply returned as-is. Otherwise, <csBigInteger()> is equivalent to <parse>
  	without a radix argument.
  
  	> var n0 = csBigInteger();      // Same as <csBigInteger.ZERO>
  	> var n1 = csBigInteger("123"); // Create a new <csBigInteger> with value 123
  	> var n2 = csBigInteger(123);   // Create a new <csBigInteger> with value 123
    > var n2 = csBigInteger(127);   // Create a new <csBigInteger> with value 127
    > var n2 = csBigInteger(128);   // Create a new <csBigInteger> with value 128
    > var n2 = csBigInteger(-1);   // Create a new <csBigInteger> with value -1
  	> var n3 = csBigInteger(n2);    // Return n2, unchanged (immutable)
  
  	The constructor form only takes a value *n* that must be a number, string or
  	bytearray of numbers (0..255) in big-endian order.
    The array is *not copied and
  	may be modified*. If the array contains only zeros, the sign parameter
  	is ignored and is forced to zero.
  
    > new csBigInteger([5]): create a new csBigInteger with value 5
    > var n2 = csBigInteger([127]);   // Create a new <csBigInteger> with value 127
    > var n2 = csBigInteger([128]);   // Create a new <csBigInteger> with value -128
    > new csBigInteger([251]): create a new csBigInteger with value -5 (fb)
    > new csBigInteger([251, 0]): create a new csBigInteger with value 251 (fb00)
  
  	Parameters:
  
  		n - Value to convert to a <csBigInteger>.
  
  	Returns:
  
  		A <csBigInteger> value.
  
  	See Also:
  
  		<parse>, <csBigInteger>
  */

  function csBigInteger(n) {
    var base = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 10;

    //console.log("n="+n);
    //console.log("typeof n="+(typeof n));
    //console.log(Object.prototype.toString.call(n));
    if (n instanceof csBigInteger) return n;else if (typeof n === "undefined") return ZERO;
    //else if (typeof n === "number")
    //	this._data = n;
    else if (typeof n === "string" || Object.prototype.toString.call(n) === '[object Array]') return csBigInteger.parse(n, base);

    //console.log("default assign n="+n);
    this._data = Math.round(n); // assign anyway (should be 'number'). ensure it's really integer, not fractional
  }

  csBigInteger._construct = function (n) {
    return new csBigInteger(n);
  };

  var ZERO = new csBigInteger(0);
  // Constant: ZERO
  // <csBigInteger> 0.
  csBigInteger.ZERO = ZERO;

  var ONE = new csBigInteger(1);
  // Constant: ONE
  // <csBigInteger> 1.
  csBigInteger.ONE = ONE;

  var M_ONE = new csBigInteger(-1);
  // Constant: M_ONE
  // <csBigInteger> -1.
  csBigInteger.M_ONE = M_ONE;

  // Constant: _0
  // Shortcut for <ZERO>.
  csBigInteger._0 = ZERO;

  // Constant: _1
  // Shortcut for <ONE>.
  csBigInteger._1 = ONE;

  /*
  	Method: toString
  	Convert a <csBigInteger> to a string.
  
  	When *base* is greater than 10, letters are upper case.
  
  	Parameters:
  
  		base - Optional base to represent the number in (default is base 10).
  		       Must be between 2 and 36 inclusive, or an Error will be thrown.
  
  	Returns:
  
  		The string representation of the <csBigInteger>.
  */
  csBigInteger.prototype.toString = function () {
    var base = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 10;

    // allowing bases 2, 10 and 16
    if (!(base == 2 || base == 10 || base == 16)) {
      throw new Error("illegal radix " + base + ".");
    }

    if (base === 10) return this._data.toString();

    var shex = "";
    for (var i = this._data.length - 1; i >= 0; i--) {
      var sbyte = this._data[i].toString(16);
      if (sbyte.length < 2) sbyte = "0" + sbyte;
      shex += sbyte;
    }

    if (base === 16) {
      // hexstring
      return shex;
    } else {
      // binary
      return shex; // TODO
    }
  };

  /*
  	Function: parse
  	Parse a string or big-endian byte array into a <csBigInteger>.
  
  	- "0x" or "0X": *base* = 16
  	- "0b": *base* = 2 (?)
  	- else: *base* = 10
  
  	Parameters:
  
  		s - The string to parse.
      base - Optional (default is 10)
  
  	Returns:
  
  		a <csBigInteger> instance.
  */
  csBigInteger.parse = function (n) {
    var base = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 10;

    if (Object.prototype.toString.call(n) === '[object Array]') {
      if (n.length == 0) return ZERO;
      //s = "0x";
      s = "";
      for (var i = 0; i < n.length; i++) {
        var dig = n[i].toString(16);
        if (dig.length == 1) dig = "0" + dig;
        s = s + dig;
      }
      return csBigInteger.parse(s, 16);
    }

    var s = n.toString();

    if (base == 10) return new csBigInteger(parseInt(s, 10));

    // console.log("base 16 conv:"+s);

    // base 16
    return new csBigInteger(csBigInteger.behex2bigint(s));
  };

  csBigInteger.revertHexString = function (hex) {
    var reverthex = "";
    for (var i = 0; i < hex.length - 1; i += 2) {
      reverthex = "" + hex.substr(i, 2) + reverthex;
    }return reverthex;
  };

  csBigInteger.checkNegativeBit = function (x) {
    // check negative bit
    var y = x.slice(x.length - 2, x.length + 2);
    //console.log("base="+y);
    // detect negative values
    var bitnum = parseInt(y, 16).toString(2);
    //console.log("bitnum="+bitnum);
    // -1389293829382
    return bitnum.length == 8 && bitnum[0] == "1";
  };

  csBigInteger.behex2bigint = function (behex) {
    var x = behex;
    // if needs padding
    if (x.length % 2 == 1) x = '0' + x;
    // verify if number is negative
    if (csBigInteger.checkNegativeBit(x)) {
      // negative number
      //console.log("negative!");
      //console.log(behex);
      var rbitnum = parseInt(csBigInteger.revertHexString(behex), 16).toString(2);
      // negate bits
      var y2 = "";
      for (var i = 0; i < rbitnum.length; i++) {
        y2 += rbitnum[i] == '0' ? '1' : '0';
      }var finalnum = -1 * (parseInt(y2, 2) + 1);
      return finalnum;
    } else {
      // positive number: positive is easy, just revert and convert to int (TODO: beware javascript natural precision loss)
      return parseInt(csBigInteger.revertHexString(behex), 16);
    }
  };

  /*
  	Function: toByteArray
  	Converts the biginteger value to big-endian byte array
  
  	Returns:
  
  		a big-endian byte array instance.
  */
  csBigInteger.prototype.toByteArray = function () {
    //console.log("toByteArray = "+this._data);
    var hval = this.toHexString();
    var array = [];
    for (var i = 0; i < hval.length - 1; i += 2) {
      array.push(parseInt(hval.substr(i, 2), 16));
    }return array;
  };

  /*
  	Function: tohexString
  	Converts the biginteger value to big-endian hexstring
  
  	Returns:
  
  		a big-endian hex string
  */
  csBigInteger.prototype.toHexString = function () {
    var bigint = this._data;
    if (bigint >= 0) {
      var bihex = bigint.toString(16);
      if (bihex.length % 2 == 1) bihex = "0" + bihex;
      bihex = csBigInteger.revertHexString(bihex); // to big-endian
      if (csBigInteger.checkNegativeBit(bihex)) bihex = bihex + "00";
      return bihex;
    } else return csBigInteger.negbigint2behex(bigint);
  };

  // negative big integers returned as (big-endian) hex
  csBigInteger.negbigint2behex = function (intvalue) {
    if (intvalue >= 0) // ONLY NEGATIVE!
      return null;
    var x = intvalue;
    /*
    // https://msdn.microsoft.com/en-us/library/system.numerics.biginteger(v=vs.110).aspx
    The BigInteger structure assumes that negative values are stored by using two's complement representation. Because the BigInteger structure represents a numeric value with no fixed length, the BigInteger(Byte[]) constructor always interprets the most significant bit of the last byte in the array as a sign bit. To prevent the BigInteger(Byte[]) constructor from confusing the two's complement representation of a negative value with the sign and magnitude representation of a positive value, positive values in which the most significant bit of the last byte in the byte array would ordinarily be set should include an additional byte whose value is 0. For example, 0xC0 0xBD 0xF0 0xFF is the little-endian hexadecimal representation of either -1,000,000 or 4,293,967,296. Because the most significant bit of the last byte in this array is on, the value of the byte array would be interpreted by the BigInteger(Byte[]) constructor as -1,000,000. To instantiate a BigInteger whose value is positive, a byte array whose elements are 0xC0 0xBD 0xF0 0xFF 0x00 must be passed to the constructor.
    */
    //x=-1000000; // must become (big endian) "f0bdc0" => little endian C0 BD F0  (careful with positive 4,293,967,296 that may become negative, need to be C0 BD F0 FF 00)
    // ASSERT (x < 0) !!! x==0 is problematic! equals to 256...
    //x=-1; // ff
    //x=-2; // fe
    //x=-127; // 81
    //x=-255; // "ff01" => 01 ff
    //x=-256; // "ff00" => 00 ff
    //x=-257; // "feff" => ff fe
    //x=-128; // "ff80" => 80 ff
    // only for negative integers
    x *= -1; // turn into positive
    // ========================
    // perform two's complement
    // ========================
    // convert to binary
    var y = x.toString(2);
    //console.log("FIRST BINARY: "+y);
    // extra padding for limit cases (avoid overflow)
    y = "0" + y;
    //guarantee length must be at least 8, or add padding!
    while (y.length < 8 || y.length % 8 != 0) {
      //console.log("ADDING PADDING 1!");
      y = "0" + y;
    }
    // invert bits
    var y2 = "";
    for (var i = 0; i < y.length; i++) {
      y2 += y[i] == '0' ? '1' : '0';
    } //console.log("SECOND BINARY: "+y2);
    // go back to int
    var y3 = parseInt(y2, 2);
    //console.log("INT is "+y3);
    // sum 1
    y3 += 1;
    //console.log("INT is after sum "+y3);
    // convert to binary again
    var y4 = y3.toString(2);
    //guarantee length must be at least 8, or add padding!
    while (y4.length < 8) {
      //console.log("ADDING PADDING!");
      y4 = "0" + y4;
    }
    ///// verify if most important bit in LAST byte would is already set... (NO NEED.. ONLY FOR POSITIVE INTEGERS)
    //index = y4.length-8;
    //if(y4[index]=='0') {
    //console.log("CREATING EXTRA BYTE! BUT HOW?");
    // must create an extra byte just to inform sign...
    //y4="10000000"+y4; // could be 1xxxxxxx I guess, but everyone is just using f0 (which is 11110000)...
    //}

    //console.log("final binary:"+y4);

    // convert to hex
    var y5 = parseInt(y4, 2).toString(16);
    // adjust padding

    return csBigInteger.revertHexString(y5); // big endian
  };

  /*
  	Function: valueOf
  	Convert a <csBigInteger> to a native JavaScript integer.
  
  	This is called automatically by JavaScript to convert a <BigInteger> to a
  	native value.
  
  	Returns:
  
  		> parseInt(this.toString(), 10)
  
  	See Also:
  
  		<toString>, <toJSValue>
  */
  csBigInteger.prototype.valueOf = function () {
    return parseInt(this.toString(), 10);
  };

  exports.csBigInteger = csBigInteger;
})(typeof exports !== 'undefined' ? exports : undefined);

//module.exports = csBigInteger;
},{}],2:[function(require,module,exports){
"use strict";

// csFixed8 implementation based on csbiginteger class, and C# big-endian format
// csFixed8 considers 8 decimal digits.
// Positive numbers are represented as exactly 8 bytes (64 bits), but negative numbers can have less.
//  1.0 -> 0000000005f5e100  (little-endian)
// -1.0 -> ff (little-endian)

(function (exports) {
  "use strict";

  var csBigInteger = require('./csBigInteger').csBigInteger;

  // csFixed8 allows biginteger and decimal number as input

  function csFixed8(n) {
    if (n instanceof csFixed8) this._data = n._data;else if (n instanceof csBigInteger) this._data = n;else if (typeof n === "number") {
      this._data = new csBigInteger(D * n);
      //console.log("data: "+this._data);
    } else this._data = new csBigInteger(parseInt(n, 10)); // assign anyway (should be some kind of 'number')
  }

  csFixed8._construct = function (n) {
    return new csFixed8(n);
  };

  var D = new csBigInteger(100000000); // 10^8

  // for now, limited to javascript precision (~10^58), not 64 bits
  var MaxValue = new csFixed8(new csBigInteger(Number.MAX_SAFE_INTEGER));

  // for now, limited to javascript precision (~10^58), not 64 bits
  var MinValue = new csFixed8(new csBigInteger(Number.MIN_SAFE_INTEGER));

  var One = new csFixed8(D);

  var Satoshi = new csFixed8(new csBigInteger(1));

  var Zero = new csFixed8(new csBigInteger(0));

  csFixed8.Zero = Zero;

  csFixed8.One = One;

  csFixed8.MaxValue = MaxValue;

  csFixed8.MinValue = MinValue;

  csFixed8.Satoshi = Satoshi;

  // hexstring in big-endian format. If wanting little endian, use toString() method.
  // non-negative (positive and zero) display exactly 8 bytes. Negative can have less than 8 bytes (but most significant bit will always be set)
  csFixed8.prototype.toHexString = function () {
    var hs = this._data.toHexString();
    if (this._data >= 0) // padding for positive
      while (hs.length < 16) {
        // exactly 8 bytes
        hs = hs + '0';
      }return hs;
  };

  // toString presents hex in little-endian format. If big-endian is wanted, use toHexString() function
  // non-negative (positive and zero) display exactly 8 bytes. Negative can have less than 8 bytes (but most significant bit will always be set)
  csFixed8.prototype.toString = function () {
    var base = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 10;

    // allowing bases 2, 10 and 16
    if (!(base == 10 || base == 16)) {
      throw new Error("illegal radix " + base + ".");
    }

    if (base == 10) return (this._data / D).toString(); // decimal format

    if (base == 16) // little-endian hexstring
      return csBigInteger.revertHexString(this.toHexString());

    return "?";
  };

  csFixed8.prototype.valueOf = function () {
    return this._data;
  };

  exports.csFixed8 = csFixed8;
})(typeof exports !== 'undefined' ? exports : undefined);
},{"./csBigInteger":1}],3:[function(require,module,exports){
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
},{"./csBigInteger":1,"./csFixed8":2}]},{},[3]);

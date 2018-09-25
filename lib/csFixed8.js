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
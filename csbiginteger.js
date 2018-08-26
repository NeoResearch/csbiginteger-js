// C# Big Integer implementation on javascript
// Igor M. Coelho, Copyleft 2018 - MIT License
// This class sketch was heavily inspired by http://silentmatt.com/biginteger
// Although the objective is not to provide top performance (C# compatibility comes first),
// it's important to inherit a good design ;)

(function(exports) {
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

	The constructor form only takes a value and a sign. *n* must be a number, string or
	bytearray of numbers (0..255) in big-endian order.
  The second parameter sets the sign: -1 for
	negative, +1 for positive, or 0 for zero. The array is *not copied and
	may be modified*. If the array contains only zeros, the sign parameter
	is ignored and is forced to zero.

  > new csBigInteger([5]): create a new csBigInteger with value 5
	> new csBigInteger([5], -1): create a new csBigInteger with value -5
  > var n2 = csBigInteger([127]);   // Create a new <csBigInteger> with value 127
  > var n2 = csBigInteger([128]);   // Create a new <csBigInteger> with value -128
  > new csBigInteger([251]): create a new csBigInteger with value -5 (fb)
  > new csBigInteger([251, 0]): create a new csBigInteger with value 251 (fb00)
  > new csBigInteger([251, 0], -1): create a new csBigInteger with value -251 (fb00)

	Parameters:

		n - Value to convert to a <csBigInteger>.

	Returns:

		A <csBigInteger> value.

	See Also:

		<parse>, <csBigInteger>
*/
function csBigInteger(n, sign = 1) {
    //console.log("n="+n);
		if (n instanceof csBigInteger)
			return n;
		else if (typeof n === "undefined")
			return ZERO;
    else if (typeof n === "number") {
      if(n >= 0)
        return csBigInteger.parsePositiveInt10(n);
      else
        return csBigInteger.parseNegativeInt10(n);
    }
    else if (typeof n === "string") {
      console.log("string:"+n);
      return csBigInteger.parseStr(n);
    }
  // internal _data indicates byte array
	this._data = n;
	this._sign = sign;
}

csBigInteger._construct = function(n, sign) {
	return new csBigInteger(n, sign);
};

var ZERO = new csBigInteger([], 0);
// Constant: ZERO
// <csBigInteger> 0.
csBigInteger.ZERO = ZERO;

var ONE = new csBigInteger([1], 1);
// Constant: ONE
// <csBigInteger> 1.
csBigInteger.ONE = ONE;

var M_ONE = new csBigInteger(ONE._data, -1);
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
	Constant: byte
	Array of <csBigIntegers> from 0 to 255.

	Very useful when you need a "byte" <csBigInteger>.

	See Also:

		<ZERO>, <ONE>, <_0>, <_1>
*/
csBigInteger.byte = [
	ZERO,
	ONE,
	/* Assuming csBigInteger_base > 36 */
	new csBigInteger( [2], 1),
	new csBigInteger( [3], 1),
	new csBigInteger( [4], 1),
	new csBigInteger( [5], 1),
	new csBigInteger( [6], 1),
	new csBigInteger( [7], 1),
	new csBigInteger( [8], 1),
	new csBigInteger( [9], 1),
	new csBigInteger([10], 1),
	new csBigInteger([11], 1),
	new csBigInteger([12], 1),
	new csBigInteger([13], 1),
	new csBigInteger([14], 1),
	new csBigInteger([15], 1),
	new csBigInteger([16], 1),
	new csBigInteger([17], 1),
	new csBigInteger([18], 1),
	new csBigInteger([19], 1),
	new csBigInteger([20], 1),
	new csBigInteger([21], 1),
	new csBigInteger([22], 1),
	new csBigInteger([23], 1),
	new csBigInteger([24], 1),
	new csBigInteger([25], 1),
	new csBigInteger([26], 1),
	new csBigInteger([27], 1),
	new csBigInteger([28], 1),
	new csBigInteger([29], 1),
	new csBigInteger([30], 1),
	new csBigInteger([31], 1),
	new csBigInteger([32], 1),
	new csBigInteger([33], 1),
	new csBigInteger([34], 1),
	new csBigInteger([35], 1),
	new csBigInteger([36], 1)
  // TODO: continue until 255: ff00
];


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
csBigInteger.prototype.toString = function(base=10) {
  // allowing bases 2, 10 and 16
  if (!((base == 2) || (base == 10) || (base == 16))) {
		throw new Error("illegal radix " + base + ".");
	}
	if (this._sign === 0) {
		return "0";
	}

  var shex = "";
  for (var i = this._data.length - 1; i >= 0; i--) {
    var sbyte = this._data[i].toString(16);
    if(sbyte.length < 2)
      sbyte = "0"+sbyte;
    shex += sbyte;
  }

	if (base === 10) {
    // decimal
		var str = this._sign < 0 ? "-" : "";
    str += parseInt(shex, 16).toString();
		return str;
	}
  else if(base === 16) {
    // hexstring
    return shex;
  }
	else {
    // binary
		return shex; // TODO
	}
};


/*
	Function: parseStr
	Parse a string into a <csBigInteger>.

	- "0x" or "0X": *base* = 16
	- "0_": *base* = 2
	- else: *base* = 10

	Parameters:

		s - The string to parse.
    base - Optional (default is 10)

	Returns:

		a <csBigInteger> instance.
*/
csBigInteger.parseStr = function(s, base = 10) {
	s = s.toString();

	var prefixRE;
  if (base == 16) {
		prefixRE = '0x';
	}
	else if (base == 2) {
		prefixRE = '0_';
	}
	else {
		prefixRE = '';
	}

  //var sign = (s[0] == "-")? -1 : 1;

  // default is 10
  var num = parseInt(s, 10);

  return new csBigInteger(num, 1);
};

/*
	Function: parsePositiveInt10
	Parse a positive (or zero) base-10 number into a <csBigInteger>.

	Parameters:

		n - The base-10 number to parse.

	Returns:

		a <csBigInteger> instance.
*/
csBigInteger.parsePositiveInt10 = function(intvalue) {
  // big-endian byte array
  var data = [];
  // guarantee value is non-negative
  if(intvalue < 0)
     intvalue = 0;
  console.log("intvalue="+intvalue);
  // int to hexstring
  var hval = intvalue.toString(16);
  // padding
  if(hval.length % 2 == 1)
     hval = "0"+hval;
  // hexstring to big-endian byte array
  for (var i = 0; i < hval.length - 1; i += 2)
      data.push(parseInt(hval.substr(i, 2), 16));

  return new csBigInteger(data, 1);
};


/*
	Function: parseNegativeInt10
	Parse a negative base-10 number into a <csBigInteger>.

	Parameters:

		n - The base-10 number to parse.

	Returns:

		a <csBigInteger> instance.
*/
csBigInteger.parseNegativeInt10 = function(intvalue) {
  // big-endian byte array
  var data = [];
  // guarantee value is non-negative
  if(intvalue >= 0)
     return ZERO;
     
  console.log("intvalue="+intvalue);
  // int to hexstring
  var hval = intvalue.toString(16);
  // padding
  if(hval.length % 2 == 1)
     hval = "0"+hval;
  // hexstring to big-endian byte array
  for (var i = 0; i < hval.length - 1; i += 2)
      data.push(parseInt(hval.substr(i, 2), 16));

  return new csBigInteger(data, 1);
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
csBigInteger.prototype.valueOf = function() {
  return parseInt(this.toString(), 10);
};

exports.csBigInteger = csBigInteger;
})(typeof exports !== 'undefined' ? exports : this);

//module.exports = csBigInteger;

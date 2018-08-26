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
function csBigInteger(n, base = 10) {
    //console.log("n="+n);
		//console.log("typeof n="+(typeof n));
		//console.log(Object.prototype.toString.call(n));
		if (n instanceof csBigInteger)
			return n;
		else if (typeof n === "undefined")
			return ZERO;
    //else if (typeof n === "number")
		//	this._data = n;
    else if ((typeof n === "string") || (Object.prototype.toString.call(n) === '[object Array]'))
      return csBigInteger.parse(n, base);

  //console.log("default assign n="+n);
	this._data = n; // assign anyway (should be 'number')
}

csBigInteger._construct = function(n) {
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
csBigInteger.prototype.toString = function(base=10) {
  // allowing bases 2, 10 and 16
  if (!((base == 2) || (base == 10) || (base == 16))) {
		throw new Error("illegal radix " + base + ".");
	}

	if (base === 10)
	  return this._data.toString();

	var shex = "";
	for (var i = this._data.length - 1; i >= 0; i--) {
		var sbyte = this._data[i].toString(16);
		if(sbyte.length < 2)
			sbyte = "0"+sbyte;
		shex += sbyte;
	}

  if(base === 16) {
    // hexstring
    return shex;
  }
	else {
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
csBigInteger.parse = function(n, base = 10) {
	if(Object.prototype.toString.call(n) === '[object Array]') {
	  //s = "0x";
		s = "";
		for(var i=0;i<n.length;i++) {
			var dig = n[i].toString(16);
			if(dig.length==1)
				dig = "0"+dig;
			s = s + dig;
		}
		return csBigInteger.parse(s, 16);
	}

	var s = n.toString();

  if(base == 10)
    return new csBigInteger(parseInt(s, 10));

	//console.log("base 16 conv:"+s);

  // base 16
	return new csBigInteger(csBigInteger.behex2bigint(s));
};

csBigInteger.revertHexString = function (hex) {
    var reverthex = "";
    for (var i = 0; i < hex.length - 1; i += 2)
        reverthex = "" + hex.substr(i, 2) + reverthex;
    return reverthex;
};

csBigInteger.behex2bigint = function (behex) {
  var x = behex;
  // if needs padding
  if(x.length % 2 == 1)
    x = '0'+x;
  // check negative bit
  var y = x.slice(x.length-2,x.length+2);
  //console.log("base="+y);
  // detect negative values
  var bitnum = parseInt(y, 16).toString(2);
  //console.log("bitnum="+bitnum);
  // -1389293829382
  if((bitnum.length == 8) && (bitnum[0]=="1")) {
    // negative number
      //console.log("negative!");
      //console.log(behex);
      var rbitnum = parseInt(csBigInteger.revertHexString(behex),16).toString(2);
      // negate bits
      var y2 = "";
      for(var i = 0; i<rbitnum.length; i++)
         y2 += rbitnum[i]=='0'?'1':'0';
      var finalnum = -1*(parseInt(y2, 2) + 1);
      return finalnum;
  }
  else {
    // positive number: positive is easy, just revert and convert to int (TODO: beware javascript natural precision loss)
    return parseInt(csBigInteger.revertHexString(behex), 16);
  }
}


/*
	Function: toByteArray
	Converts the biginteger value to big-endian byte array

	Returns:

		a big-endian byte array instance.
*/
csBigInteger.toByteArray = function() {
	//console.log("toByteArray = "+this._data);
	if(this._data >= 0)
		return this.positiveToByteArray();
	else
		return this.negativeToByteArray();
};


/*
	Function: positiveToByteArray
	Parse a positive (or zero) base-10 number into a <csBigInteger>.

	Returns:

    a big-endian byte array
*/
csBigInteger.positiveToByteArray = function() {
	var intvalue = this._data;
  // big-endian byte array
  var data = [];
  // guarantee value is non-negative
  if(intvalue < 0)
     intvalue = 0;
  //console.log("intvalue="+intvalue);
  // int to hexstring
  var hval = intvalue.toString(16);
  // padding
  if(hval.length % 2 == 1)
     hval = "0"+hval;
  // hexstring to big-endian byte array
  for (var i = 0; i < hval.length - 1; i += 2)
      data.push(parseInt(hval.substr(i, 2), 16));

  return data;
};


/*
	Function: negativeToByteArray
	Parse a negative base-10 number into a <csBigInteger>.

	Returns:

		a big-endian byte array.
*/
csBigInteger.negativeToByteArray = function() {
	var intvalue = this._data;
  // big-endian byte array
  var data = [];
  // guarantee value is non-negative
  if(intvalue >= 0)
     return ZERO;

  //console.log("intvalue="+intvalue);
  // int to hexstring
  var hval = intvalue.toString(16);
  // padding
  if(hval.length % 2 == 1)
     hval = "0"+hval;
  // hexstring to big-endian byte array
  for (var i = 0; i < hval.length - 1; i += 2)
      data.push(parseInt(hval.substr(i, 2), 16));

  return data;
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

// C# Big Integer implementation on javascript
// Igor M. Coelho, Copyleft 2018 - MIT License

//import {csBigInteger} from './csBigInteger';
//import {csFixed8} from './csFixed8';

//(function(exports) {
//"use strict";

const csBigInteger = require('./csBigInteger').csBigInteger;
const csFixed8 = require('./csFixed8').csFixed8;

//exports.csBigInteger = csBigInteger;
//exports.csFixed8 = csFixed8;

export {
  csBigInteger,
  csFixed8
}

//export default csBigInteger;
//export class csFixed8;
//})(typeof exports !== 'undefined' ? exports : this);

//module.exports = csBigInteger;

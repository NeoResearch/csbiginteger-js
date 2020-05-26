# csBigInteger.js

This is **csBigInteger.js** project, a C# BigInteger implementation on JavaScript.
The idea is to provide full compatibility with C# Numerics implementation, regarding hexstring format and little-endness.
Some auxiliar functions are also provided, regarding Fixed8 format.

Since version 3.0, it is using `bn.js` library (https://github.com/indutny/bn.js) to handle big internals.

## How to use it

### Example
```js
// get library as 'csbiginteger', e.g., CommonJS: "let csbiginteger = require('csbiginteger')"
var x1 = new csbiginteger.csBigInteger("0xff", 16); // -1 in csBigInteger
var bx1 = x1.asBN(); // get BN.js internals
var x2 = new csbiginteger.csBigInteger(5);
var bx2 = x2.asBN(); // get BN.js internals
var bx3 = bx2.add(bx1); // performs '-1' + '5'
bx3.toString(10); // outputs '4'
```

### Install on web browser

Classic JS:
```html
<script src="https://unpkg.com/csbiginteger/dist/csbiginteger"></script>
```

If you want as ES6 module (remember to put `.mjs` extension):
```html
<script type="module">
import csbiginteger from "https://unpkg.com/csbiginteger/dist/csbiginteger-es6.mjs";
</script>
```

```js
csBigInteger = csbiginteger.csBigInteger;
csFixed8 = csbiginteger.csFixed8;
x = new csBigInteger(1000);
y = new csFixed8(1000);
```

### Install on npm

`npm install csbiginteger`

```js
const csBigInteger = require('csbiginteger').csBigInteger;
var x = new csBigInteger(255);
x.toHexString();
// "ff00"
var y = x + 1;
// 256 (JS unsafe number)
const BN = require('bn.js');
var z = x.asBN().add(new BN(1));
z.toString(10);
// "256" (BN safe number)
```

## For Developers

### Tests

`npm test`

### Build Webpack

`npm run build`

### New minor version

`npm version minor`

### Push and Publish

`git push origin master --tags`

`npm publish`

## Final remarks


Main maintainer is @igormcoelho.  Thanks a lot to @snowypowers for the good advices and @ixje on endianess discussions.

MIT License

Copyleft 2018

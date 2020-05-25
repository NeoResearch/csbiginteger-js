# csBigInteger.js

This is **csBigInteger.js** project, a C# BigInteger implementation on JavaScript.
The idea is to provide full compatibility with C# Numerics implementation, regarding hexstring format and little-endness.
Some auxiliar functions are also provided, regarding Fixed8 format.

Since version 3.0, it is using `bn.js` library (https://github.com/indutny/bn.js) to handle big internals.

## How to use it

### Install on web browser

```html
<script src="https://unpkg.com/csbiginteger/dist/csbiginteger"></script>
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

Originally...
`npm install --save-dev babel-core babel-loader babel-preset-env webpack@next webpack-cli`

Now...
https://paultavares.wordpress.com/2018/07/02/webpack-how-to-generate-an-es-module-bundle/

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

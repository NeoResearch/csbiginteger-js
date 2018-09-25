# csBigInteger.js

This is **csBigInteger.js** project, a C# BigInteger implementation on JavaScript.
The idea is to provide full compatibility with C# Numerics implementation, regarding hexstring format and big-endness.
Some auxiliar functions are also provided, regarding Fixed8 format.

## How to use it

### Install on web browser

```html
<script src="https://unpkg.com/csbiginteger/dist/bundle.js"></script>
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


Main maintainer is @igormcoelho.  Thanks a lot to @snowypowers for the good advices!

MIT License

Copyleft 2018

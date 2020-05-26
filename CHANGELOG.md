# csbiginteger-js

## version 4.x

- In order to enforce standard with C#, C++ and other related projects, we will adopt string base16 constructor ALWAYS as BigEndian. This removes the "strange" difference between building "0001" and "0x0001" (the former was not usually ONE... now it will be). In basic words `0x` prefix will be optional for string base16. Unfortunately, this may break compatibility with someone out there, so we will increase a MAJOR.
- `npm run build` now puts two files in `dist/`: classic `csbiginteger.js` and `csbiginteger.mjs` (es6 module)

## version 3.x

Many internal changes, specially:

- Adopted `bn.js` library in `asBN()` method, in order to avoid reimplementation of all biginteger operations (we only care about serialization here)

## version 2.x

Some internal changes, specially:

- Organized packages to publish on web (`webpack`)

## version 1.x

- First working version.

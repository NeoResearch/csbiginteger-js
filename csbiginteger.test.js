const csBigInteger = require('./csbiginteger').csBigInteger;

test('constructor csBigInteger() equals zero', () => {
  expect(new csBigInteger().valueOf()).toBe(0);
});

test('constructor csBigInteger("123") equals 123', () => {
  expect(new csBigInteger("123").valueOf()).toBe(123);
});

test('constructor csBigInteger(123) equals 123', () => {
  expect(new csBigInteger(123).valueOf()).toBe(123);
});

test('constructor csBigInteger(127) equals 127', () => {
  expect(new csBigInteger(127).valueOf()).toBe(127);
});

test('constructor csBigInteger(128) equals 128', () => {
  expect(new csBigInteger(128).valueOf()).toBe(128);
});

test('constructor csBigInteger(-1) equals -1', () => {
  expect(new csBigInteger(-1).valueOf()).toBe(-1);
});

//test('adds 1 + 2 to equal 3', () => {
//  expect(new csBigInteger(1, 2).valueOf()).toBe(3);
//});

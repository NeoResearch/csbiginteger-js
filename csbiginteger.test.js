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

test('constructor csBigInteger(csBigInteger(10)) equals 10', () => {
  var b = new csBigInteger(10);
  expect(new csBigInteger(b).valueOf()).toBe(10);
});

test('constructor csBigInteger([5]) equals 5', () => {
  expect(new csBigInteger([5]).valueOf()).toBe(5);
});

test('constructor csBigInteger([127]) equals 127', () => {
  expect(new csBigInteger([127]).valueOf()).toBe(127);
});

test('constructor csBigInteger([128]) equals -128', () => {
  expect(new csBigInteger([128]).valueOf()).toBe(-128);
});

test('constructor csBigInteger([251]) equals -5', () => {
  expect(new csBigInteger([251]).valueOf()).toBe(-5);
});

test('constructor csBigInteger("fb", 16) equals -5', () => {
  expect(new csBigInteger("fb", 16).valueOf()).toBe(-5);
});

test('constructor csBigInteger([251, 0]) equals 251', () => {
  expect(new csBigInteger([251, 0]).valueOf()).toBe(251);
});

test('constructor csBigInteger("fb00", 16) equals 251', () => {
  expect(new csBigInteger("fb00", 16).valueOf()).toBe(251);
});

test('constructor csBigInteger("251", 10) equals 251', () => {
  expect(new csBigInteger("251", 10).valueOf()).toBe(251);
});

test('constructor csBigInteger("255", 10) equals 255', () => {
  expect(new csBigInteger("255", 10).valueOf()).toBe(255);
});

test('constructor csBigInteger("256", 10) equals 256', () => {
  expect(new csBigInteger("256", 10).valueOf()).toBe(256);
});

test('constructor csBigInteger("-256", 10) equals -256', () => {
  expect(new csBigInteger("-256", 10).valueOf()).toBe(-256);
});

test('constructor csBigInteger("1", 10) equals 1', () => {
  expect(new csBigInteger("1", 10).valueOf()).toBe(1);
});

test('constructor csBigInteger("-1", 10) equals -1', () => {
  expect(new csBigInteger("-1", 10).valueOf()).toBe(-1);
});

test('constructor csBigInteger("0", 10) equals 0', () => {
  expect(new csBigInteger("0", 10).valueOf()).toBe(0);
});

test('constructor csBigInteger("-0", 10) equals 0', () => {
  expect(new csBigInteger("-0", 10).valueOf()).toBe(0);
});

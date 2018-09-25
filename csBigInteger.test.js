const csBigInteger = require('./csBigInteger').csBigInteger;
//import {csBigInteger} from './csBigInteger';

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

test('constructor csBigInteger(5).toHexString() equals "05"', () => {
  var b = new csBigInteger(5);
  expect(b.toHexString()).toBe("05");
});


test('constructor csBigInteger(1).toHexString() equals "01"', () => {
  expect(new csBigInteger(1).toHexString()).toBe("01");
});

test('constructor csBigInteger([]).toHexString() equals "00"', () => {
  expect(new csBigInteger([]).toHexString()).toBe("00");
});

test('constructor csBigInteger(0).toHexString() equals "00"', () => {
  expect(new csBigInteger(0).toHexString()).toBe("00");
});

test('constructor csBigInteger(255).toHexString() equals "ff00"', () => {
  expect(new csBigInteger(255).toHexString()).toBe("ff00");
});

test('constructor csBigInteger(254).toHexString() equals "fe00"', () => {
  expect(new csBigInteger(254).toHexString()).toBe("fe00");
});

test('constructor csBigInteger(256).toHexString() equals "0001"', () => {
  expect(new csBigInteger(256).toHexString()).toBe("0001");
});

test('constructor csBigInteger(127).toHexString() equals "7f"', () => {
  expect(new csBigInteger(127).toHexString()).toBe("7f");
});

test('constructor csBigInteger(128).toHexString() equals "8000"', () => {
  expect(new csBigInteger(128).toHexString()).toBe("8000");
});

test('constructor csBigInteger(129).toHexString() equals "8100"', () => {
  expect(new csBigInteger(129).toHexString()).toBe("8100");
});

test('constructor csBigInteger(-1).toHexString() equals "ff"', () => {
  expect(new csBigInteger(-1).toHexString()).toBe("ff");
});

test('constructor csBigInteger(-2).toHexString() equals "fe"', () => {
  expect(new csBigInteger(-2).toHexString()).toBe("fe");
});

test('constructor csBigInteger(-80).toHexString() equals "b0"', () => {
  expect(new csBigInteger(-80).toHexString()).toBe("b0");
});

test('constructor csBigInteger(-80).toHexString() equals "b0"', () => {
  expect(new csBigInteger(-80).toHexString()).toBe("b0");
});

test('constructor csBigInteger(-127).toHexString() equals "81"', () => {
  expect(new csBigInteger(-127).toHexString()).toBe("81");
});

test('constructor csBigInteger(-128).toHexString() equals "80ff"', () => {
  expect(new csBigInteger(-128).toHexString()).toBe("80ff");
});

test('constructor csBigInteger(-129).toHexString() equals "7fff"', () => {
  expect(new csBigInteger(-129).toHexString()).toBe("7fff");
});

test('constructor csBigInteger(-254).toHexString() equals "02ff"', () => {
  expect(new csBigInteger(-254).toHexString()).toBe("02ff");
});

test('constructor csBigInteger(-255).toHexString() equals "01ff"', () => {
  expect(new csBigInteger(-255).toHexString()).toBe("01ff");
});

test('constructor csBigInteger(-256).toHexString() equals "00ff"', () => {
  expect(new csBigInteger(-256).toHexString()).toBe("00ff");
});

test('constructor csBigInteger(-257).toHexString() equals "fffe"', () => {
  expect(new csBigInteger(-257).toHexString()).toBe("fffe");
});

test('constructor csBigInteger(-258).toHexString() equals "fefe"', () => {
  expect(new csBigInteger(-258).toHexString()).toBe("fefe");
});

test('constructor csBigInteger(-259).toHexString() equals "fdfe"', () => {
  expect(new csBigInteger(-259).toHexString()).toBe("fdfe");
});

test('constructor csBigInteger(-1000000).toHexString() equals "c0bdf0"', () => {
  expect(new csBigInteger(-1000000).toHexString()).toBe("c0bdf0");
});

test('constructor csBigInteger(1000000).toHexString() equals "40420f"', () => {
  expect(new csBigInteger(1000000).toHexString()).toBe("40420f");
});

test('constructor csBigInteger(4293967296).toHexString() equals "c0bdf0ff00"', () => {
  expect(new csBigInteger(4293967296).toHexString()).toBe("c0bdf0ff00");
});

test('constructor csBigInteger(10).toHexString() equals [10]', () => {
  expect(new csBigInteger(10).toByteArray()).toEqual([10]);
});

test('constructor csBigInteger(-1).toHexString() equals [255]', () => {
  expect(new csBigInteger(-1).toByteArray()).toEqual([255]);
});

test('constructor csBigInteger(0).toHexString() equals [0]', () => {
  expect(new csBigInteger(0).toByteArray()).toEqual([0]);
});

test('csBigInteger(100000000).toHexString() equals "00e1f505"', () => {
  expect(new csBigInteger(100000000).toHexString()).toEqual("00e1f505");
});

test('test 255: csBigInteger(0.00000255*100000000).toHexString() equals "ff00"', () => {
  expect(new csBigInteger(0.00000255*100000000).toHexString()).toEqual("ff00");
});

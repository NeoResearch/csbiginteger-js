const csFixed8 = require('./csFixed8').csFixed8;

test('constructor csFixed8(0.0) equals big-endian "0000000000000000"', () => {
  expect(new csFixed8(0.0).toHexString()).toBe("0000000000000000");
});

test('constructor csFixed8(0.00000001) equals little-endian "0000000000000001"', () => {
  expect(new csFixed8(0.00000001).toString(16)).toBe("0000000000000001");
});

test('constructor csFixed8(1.0) equals little-endian "0000000005f5e100"', () => {
  expect(new csFixed8(1.0).toString(16)).toBe("0000000005f5e100");
});

test('constructor csFixed8(0.00000001) equals big-endian "0100000000000000"', () => {
  expect(new csFixed8(0.00000001).toHexString()).toBe("0100000000000000");
});

test('constructor csFixed8(1.0) equals big-endian "00e1f50500000000"', () => {
  expect(new csFixed8(1.0).toHexString()).toBe("00e1f50500000000");
});

test('constructor csFixed8(-0.00000001) equals big-endian "ff"', () => {
  expect(new csFixed8(-0.00000001).toHexString()).toBe("ff");
});

test('constructor csFixed8(0.00000255) equals big-endian "ff00000000000000"', () => {
  expect(new csFixed8(0.00000255).toHexString()).toBe("ff00000000000000");
});

const CSBigInteger = require('./csbiginteger');

test('adds 1 + 2 to equal 3', () => {
  expect(CSBigInteger(1, 2)).toBe(3);
});

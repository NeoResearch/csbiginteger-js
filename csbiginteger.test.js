const csBigInteger = require('./csbiginteger').csBigInteger;

test('adds 1 + 2 to equal 3', () => {
  expect(new csBigInteger(1, 2).valueOf()).toBe(3);
});

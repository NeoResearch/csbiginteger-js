const csbiginteger = require('./csbiginteger');

test('adds 1 + 2 to equal 3', () => {
  expect(csbiginteger(1, 2)).toBe(3);
});

// написать тест для functions.parseStringToValue
const assert = require('assert');
const { expect } = require('chai');
const { mapStringToValues } = require('./../utils/functions');

describe('testing mapStringToValue function', () => {
  it('expected true', () => {
    assert.equal(mapStringToValues('true'), true);
  });

  it('expected false', () => {
    assert.equal(mapStringToValues('false'), false);
  });

  it('expected undefined', () => {
    assert.equal(mapStringToValues('undefined'), undefined);
  });

  it('expected string', () => {
    const testString = 'test';
    assert.equal(mapStringToValues(testString), testString);
  });

  it('expected null', () => {
    expect(mapStringToValues('null')).to.be.null;
  });
});

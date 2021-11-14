const assert = require('assert');
const { expect } = require('chai');

const sum = (a, b) => Number(a) + Number(b);

describe('Testing sum', () => {
  it('2:number + 3:number should return 5:number', () => {
    const expected = 5;
    const result = sum(2, 3);
    assert.equal(result, expected);
  });

  it('2:string + 3:string should return 5:number', () => {
    const expected = 5;
    const result = sum('2', '3');
    assert.equal(result, expected);
  });

  it('3:number + 3:number should return 5:number', () => {
    expect(sum(3, 3)).to.equal(6);
  });

  it('NaN + any should return NaN', () => {
    expect(sum(NaN, 3)).to.be.NaN;
    expect(sum(NaN, null)).to.be.NaN;
    expect(sum(NaN, 'null')).to.be.NaN;
    expect(sum(NaN, NaN)).to.be.NaN;
    expect(sum(NaN, undefined)).to.be.NaN;
    expect(sum(NaN, true)).to.be.NaN;
  });

  it('Number.MAX_VALUE + Number.MAX_VALUE should return Infinity', () => {
    expect(sum(Number.MAX_VALUE, Number.MAX_VALUE)).to.equal(Infinity);
  });

  it('Number.MAX_VALUE + Number.MAX_VALUE should not return finite', () => {
    expect(sum(Number.MAX_VALUE, Number.MAX_VALUE)).to.not.be.finite;
  });
});

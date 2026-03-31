require('./index');

describe('myReduce', () => {
  it('just array', () => {
    expect([1, 2, 3, 4, 5].myReduce((acc, e) => acc + e)).toBe(15);
  });

  it('array with initial', () => {
    expect([1, 2, 3, 4, 5].myReduce((acc, e) => acc + e, 42)).toBe(57);
  });

  it('string', () => {
    expect(Array.prototype.myReduce.call('qwerty', (acc, e) => acc + ' ' + e)).toBe('q w e r t y');
  });

  it('must return initial or only one', () => {
    expect([].myReduce((acc, e) => acc + e, 42)).toBe(42);
    expect([42].myReduce((acc, e) => acc + e)).toBe(42);
  });

  it('all args in cb', () => {
    let steps = [];
    expect([1, 2, 3].myReduce((acc, e, i, arr) => {
      steps.push([acc, e, i, arr]);
      return acc + e;
    })).toBe(6);
    expect(steps).toEqual([
      [1, 2, 1, [1, 2, 3]],
      [3, 3, 2, [1, 2, 3]]
    ]);
  });

  it('empty value in array', () => {
    expect([1, 2, , 4, 5].myReduce((acc, e) => acc + e)).toBe(12);
    expect([,  , 3,  , 5].myReduce((acc, e) => acc + e)).toBe(8);
  });

  it('application errors', () => {
    expect(() => [].myReduce((acc, e) => acc + e)).toThrow();
    expect([].myReduce((acc, e) => acc + e, undefined)).toBe(undefined);
    expect(() => [1, 2, 3, 4, 5].myReduce('qwerty')).toThrow();
  });
});
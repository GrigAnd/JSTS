const myPromiseAll = require('./myPromiseAll');

describe('myPromiseAll', () => {
  it('return order', () => {
    let p1 = new Promise((resolve) => setTimeout(() => resolve(1), 100));
    let p2 = new Promise((resolve) => setTimeout(() => resolve(2), 50));
    let p3 = new Promise((resolve) => setTimeout(() => resolve(3), 200));

    return expect(myPromiseAll([p1, p2, p3])).resolves.toEqual([1, 2, 3]);
  });

  it('reject', () => {
    let p1 = new Promise((resolve) => setTimeout(() => resolve(1), 100));
    let p2 = new Promise((_, reject) => setTimeout(() => reject(new Error('fail')), 50));
    let p3 = new Promise((resolve) => setTimeout(() => resolve(3), 200));

    return expect(myPromiseAll([p1, p2, p3])).rejects.toThrow('fail');
   });
   
   it('empty array', () => {
    return expect(myPromiseAll([])).resolves.toEqual([]);
   });

   it('non promise values', () => {
    let p1 = new Promise((resolve) => setTimeout(() => resolve(1), 100));
    let p2 = 42;
    let p3 = new Promise((resolve) => setTimeout(() => resolve(3), 200));

    return expect(myPromiseAll([p1, p2, p3])).resolves.toEqual([1, 42, 3]);
   });
});


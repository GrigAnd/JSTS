const { deepEqual } = require('./deepEqual');

describe("deepEqual", () => {
  it("primitives", () => {
    expect(deepEqual(1, 1)).toBe(true);
    expect(deepEqual("a", "a")).toBe(true);
    expect(deepEqual(true, true)).toBe(true);
  });
  it("edge cases", () => {
    expect(deepEqual(null, null)).toBe(true);
    expect(deepEqual(undefined, undefined)).toBe(true);
    expect(deepEqual(null, undefined)).toBe(false);
    expect(deepEqual(NaN, NaN)).toBe(false);
  });
  it("objects", () => {
    expect(deepEqual({ a: 1 }, { a: 1 })).toBe(true);
    expect(deepEqual({ a: 1 }, { a: 2 })).toBe(false);
    expect(deepEqual({ a: 1 }, { b: 1 })).toBe(false);
    expect(deepEqual({ a: 1, b: 2 }, { b: 2, a: 1 })).toBe(true);
  });
  it("nested objects", () => {
    expect(deepEqual({ a: { b: 1 } }, { a: { b: 1 } })).toBe(true);
    expect(deepEqual({ a: { b: 1 } }, { a: { b: 2 } })).toBe(false);
  });
  it("arrays", () => {
    expect(deepEqual([1, 2, 3], [1, 2, 3])).toBe(true);
    expect(deepEqual([1, 2, 3], [1, 2, 4])).toBe(false);
    expect(deepEqual([1, 2, 3], [1, 2])).toBe(false);
  });
  it("complex objects", () => {
    const obj1 = { a: 1, b: { c: 2 }, d: [1, 2, 3] };
    const obj2 = { a: 1, b: { c: 2 }, d: [1, 2, 3] };
    const obj3 = { a: 1, b: { c: 3 }, d: [1, 2, 3] };
    expect(deepEqual(obj1, obj2)).toBe(true);
    expect(deepEqual(obj1, obj3)).toBe(false);
  });
  it("different types", () => {
    expect(deepEqual(1, "1")).toBe(false);
    expect(deepEqual(true, "true")).toBe(false);
    expect(deepEqual({}, [])).toBe(false);
  });
  it("functions", () => {
    const func1 = () => { };
    const func2 = () => { };
    expect(deepEqual(func1, func1)).toBe(true);
    expect(deepEqual(func1, func2)).toBe(false);
  });
  it("dates", () => {
    const date1 = new Date(2025, 1, 1);
    const date2 = new Date(2025, 1, 1);
    const date3 = new Date(2026, 1, 1);
    expect(deepEqual(date1, date2)).toBe(true);
    expect(deepEqual(date1, date3)).toBe(false);
  });
  it("maps and sets", () => {
    const map1 = new Map([["a", 1], ["b", 2]]);
    const map2 = new Map([["a", 1], ["b", 2]]);
    const map3 = new Map([["a", 1], ["b", 3]]);
    expect(deepEqual(map1, map2)).toBe(true);
    expect(deepEqual(map1, map3)).toBe(false);
    const set1 = new Set([1, 2, 3]);
    const set2 = new Set([1, 2, 3]);
    const set3 = new Set([1, 2, 4]);
    expect(deepEqual(set1, set2)).toBe(true);
    expect(deepEqual(set1, set3)).toBe(false);
  });
});
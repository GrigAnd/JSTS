import { describe, it, expect, vi } from 'vitest';
import { debounce, clone, deepEqual } from '../utils/helpers.js';

describe('utils', () => {
  it('debounce', async () => {
    vi.useFakeTimers();
    const fn = vi.fn();
    const debouncedFn = debounce(fn, 100);

    debouncedFn();
    debouncedFn();
    debouncedFn();

    vi.advanceTimersByTime(200);

    expect(fn).toHaveBeenCalledTimes(1);
    vi.useRealTimers();
  });

  it('clone', () => {
    const original = {
      a: 1,
      b: [2, 3],
      c: { d: 4 }
    };
    const makeCopy = clone(original);

    expect(makeCopy).toEqual(original);
    expect(makeCopy).not.toBe(original);
    expect(makeCopy.b).not.toBe(original.b);
    expect(makeCopy.c).not.toBe(original.c);
    
    makeCopy.c.d = 5;
    expect(original.c.d).toBe(4);
  });

  it('deepEqual', () => {
    const obj1 = { a: 1, b: { c: 2 } };
    const obj2 = { a: 1, b: { c: 2 } };
    const obj3 = { a: 1, b: { c: 3 } };

    expect(deepEqual(obj1, obj2)).toBe(true);
    expect(deepEqual(obj1, obj3)).toBe(false);
    expect(deepEqual(obj1, null)).toBe(false);
  });
});

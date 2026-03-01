function deepEqual(o1, o2) {
  if (o1 === o2) {
    return true;
  }

  if (typeof o1 !== 'object' || typeof o2 !== 'object' || o1 === null || o2 === null) {
    return false;
  }

  if (Object.getPrototypeOf(o1) !== Object.getPrototypeOf(o2)) {
    return false;
  }

  if (o1 instanceof Date) {
    return o1.getTime() === o2.getTime();
  }

  if (o1 instanceof Map) {
    if (o1.size !== o2.size) {
      return false;
    }
    for (const [key, value] of o1) {
      if (!o2.has(key) || !deepEqual(value, o2.get(key))) {
        return false;
      }
    }
    return true;
  }

  if (o1 instanceof Set) {
    if (o1.size !== o2.size) {
      return false;
    }
    for (const value of o1) {
      if (!o2.has(value)) {
        return false;
      }
    }
    return true;
  }

  const k1 = Object.keys(o1);
  const k2 = Object.keys(o2);

  if (k1.length !== k2.length) {
    return false;
  }

  for (const key of k1) {
    if (!k2.includes(key) || !deepEqual(o1[key], o2[key])) {
      return false;
    }
  }

  return true;
}

module.exports = { deepEqual };